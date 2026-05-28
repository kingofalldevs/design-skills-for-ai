import React, { useState, useEffect } from 'react';
import { db, storage, collection, doc, setDoc, ref, uploadBytes, getDownloadURL, deleteDoc, query, onSnapshot } from '../firebase';
import Navigation from './Navigation.jsx';

export default function AdminDashboard({ user, onLogout, navigate }) {
  const [skillId, setSkillId] = useState('');
  const [category, setCategory] = useState('landing');
  const [mdContent, setMdContent] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [status, setStatus] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState('light');

  const [skillsList, setSkillsList] = useState([]);
  const [loadingSkills, setLoadingSkills] = useState(true);
  const [editingSkillId, setEditingSkillId] = useState(null);
  const [existingImageUrl, setExistingImageUrl] = useState(null);

  useEffect(() => {
    const body = document.body;
    if (selectedTheme === 'light') {
      body.classList.add('theme-light');
    } else {
      body.classList.remove('theme-light');
    }
  }, [selectedTheme]);

  // Real-time listener for skills list
  useEffect(() => {
    if (!db) {
      setLoadingSkills(false);
      return;
    }
    const q = query(collection(db, 'skills'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const skills = [];
      snapshot.forEach((doc) => {
        const id = doc.id;
        // Exclude default landing skills from editor panel list
        if (id !== 'landing-writings' && id !== 'landing-firecrawl') {
          skills.push({ id, ...doc.data() });
        }
      });
      setSkillsList(skills);
      setLoadingSkills(false);
    }, (error) => {
      console.error("Error listening to skills in admin:", error);
      setLoadingSkills(false);
    });

    return () => unsubscribe();
  }, []);

  const handleCancelEdit = () => {
    setSkillId('');
    setCategory('landing');
    setMdContent('');
    setImageFile(null);
    setExistingImageUrl(null);
    setEditingSkillId(null);
    setStatus('');
  };

  const handleDelete = async (id) => {
    if (!window.confirm(`Are you sure you want to delete the skill "${id}"?`)) {
      return;
    }
    try {
      setStatus(`Deleting ${id}...`);
      const skillsCollection = collection(db, 'skills');
      const docRef = doc(skillsCollection, id);
      await deleteDoc(docRef);
      setStatus('Success! Skill deleted from registry.');
      if (editingSkillId === id) {
        handleCancelEdit();
      }
    } catch (error) {
      console.error(error);
      setStatus(`Error deleting skill: ${error.message}`);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!skillId || !category || !mdContent) {
      setStatus('Error: Please fill in all text fields.');
      return;
    }
    if (!db || !storage) {
      setStatus('Error: Firebase is not fully initialized. Check your .env file.');
      return;
    }

    setIsSubmitting(true);
    setStatus('Processing...');

    try {
      let imageUrl = existingImageUrl;
      if (imageFile) {
        setStatus('Uploading image to Storage...');
        const imageRef = ref(storage, `screenshots/${skillId}_${Date.now()}_${imageFile.name}`);
        await uploadBytes(imageRef, imageFile);
        imageUrl = await getDownloadURL(imageRef);
      }

      setStatus('Saving skill to Firestore...');
      const skillsCollection = collection(db, 'skills');
      const docRef = doc(skillsCollection, skillId);
      
      const dataToSave = {
        id: skillId,
        category,
        mdContent,
        createdAt: new Date().toISOString()
      };
      
      if (imageUrl) {
        dataToSave.imageUrl = imageUrl;
      }

      await setDoc(docRef, dataToSave);
      
      setStatus(editingSkillId ? 'Success! Skill updated in registry.' : 'Success! New skill published.');
      handleCancelEdit();
      e.target.reset();
    } catch (error) {
      console.error(error);
      setStatus(`Error: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="app-viewport">
      <Navigation 
        activeCategory={category} 
        setActiveCategory={() => {}} 
        user={user}
        onAuthClick={() => {}} 
        onLogout={onLogout}
        onAdminClick={() => navigate('/dashboard')}
        isAdminView={true}
      />
      
      <main className="main-content">
        <div className="admin-split-container">
          {/* Left Column: Form Card */}
          <div className="admin-column form-panel" style={{ flex: 1.2, background: 'var(--bg-color)', border: 'none', borderRadius: '8px', padding: '32px' }}>
            <h2 style={{ fontFamily: 'var(--font-mono)', marginBottom: '24px' }}>
              {editingSkillId ? `Edit Skill: ${editingSkillId}` : 'Admin Panel: Add New Skill'}
            </h2>
            
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontFamily: 'var(--font-mono)', fontSize: '13px' }}>Skill ID (must be unique, e.g. "landing-test")</label>
                <input 
                  type="text" 
                  value={skillId} 
                  onChange={(e) => setSkillId(e.target.value)} 
                  disabled={editingSkillId !== null}
                  style={{ padding: '10px', background: 'transparent', border: '1px solid var(--border-color)', color: 'var(--text-color)', fontFamily: 'var(--font-mono)', opacity: editingSkillId ? 0.6 : 1 }}
                  placeholder="landing-new-component"
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontFamily: 'var(--font-mono)', fontSize: '13px' }}>Category</label>
                <select 
                  value={category} 
                  onChange={(e) => setCategory(e.target.value)}
                  style={{ padding: '10px', background: 'transparent', border: '1px solid var(--border-color)', color: 'var(--text-color)', fontFamily: 'var(--font-mono)' }}
                >
                  <option value="landing">Landing</option>
                  <option value="hero">Hero</option>
                  <option value="nav">Navigation</option>
                  <option value="footer">Footer</option>
                  <option value="pricing">Pricing</option>
                  <option value="faq">FAQ</option>
                </select>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontFamily: 'var(--font-mono)', fontSize: '13px' }}>Markdown Content (Tokens/Prompt)</label>
                <textarea 
                  value={mdContent} 
                  onChange={(e) => setMdContent(e.target.value)} 
                  rows="8"
                  style={{ padding: '10px', background: 'transparent', border: '1px solid var(--border-color)', color: 'var(--text-color)', fontFamily: 'var(--font-mono)' }}
                  placeholder="## LAYER 1: THE PROMPT..."
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontFamily: 'var(--font-mono)', fontSize: '13px' }}>
                  Image Preview (Optional) {existingImageUrl && <span style={{ opacity: 0.5 }}>(currently has image)</span>}
                </label>
                <input 
                  type="file" 
                  accept="image/*"
                  onChange={(e) => setImageFile(e.target.files[0])} 
                  style={{ fontFamily: 'var(--font-mono)' }}
                />
              </div>

              <div style={{ display: 'flex', gap: '12px' }}>
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="cta-btn" 
                  style={{ opacity: isSubmitting ? 0.6 : 1 }}
                >
                  {isSubmitting ? 'Uploading...' : (editingSkillId ? 'Save Changes' : 'Publish to Dashboard')}
                </button>
                {editingSkillId && (
                  <button 
                    type="button" 
                    onClick={handleCancelEdit}
                    className="cta-btn" 
                    style={{ background: 'transparent', color: 'var(--text-color)', border: '1px solid var(--border-color)' }}
                  >
                    Cancel Edit
                  </button>
                )}
              </div>

              {status && (
                <div style={{ marginTop: '16px', padding: '12px', border: '1px solid var(--border-color)', fontFamily: 'var(--font-mono)', fontSize: '12px' }}>
                  {status}
                </div>
              )}
            </form>
          </div>

          {/* Right Column: List Card */}
          <div className="admin-column list-panel" style={{ flex: 1.0, background: 'var(--bg-color)', border: 'none', borderRadius: '8px', padding: '32px', display: 'flex', flexDirection: 'column' }}>
            <h2 style={{ fontFamily: 'var(--font-mono)', marginBottom: '24px' }}>Published Skills ({skillsList.length})</h2>
            
            {loadingSkills ? (
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', opacity: 0.5 }}>Loading published skills...</div>
            ) : skillsList.length === 0 ? (
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', opacity: 0.5 }}>No skills published yet. Publish one on the left!</div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0', overflowY: 'auto', maxHeight: '550px' }}>
                {skillsList.map((skill) => (
                  <div key={skill.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(128, 128, 128, 0.15)', padding: '16px 0', background: 'transparent' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontWeight: 'var(--fw-regular)', fontFamily: 'var(--font-mono)', fontSize: '13px' }}>{skill.id}</span>
                        <span style={{ fontSize: '10px', padding: '2px 6px', border: '1px solid var(--border-color)', borderRadius: '3px', opacity: 0.8 }}>{skill.category}</span>
                      </div>
                      {skill.imageUrl && (
                        <span style={{ fontSize: '11px', opacity: 0.5 }}>✓ Has preview image</span>
                      )}
                    </div>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button 
                        onClick={() => {
                          setSkillId(skill.id);
                          setCategory(skill.category);
                          setMdContent(skill.mdContent);
                          setExistingImageUrl(skill.imageUrl || null);
                          setEditingSkillId(skill.id);
                          setStatus(`Editing skill "${skill.id}"`);
                        }}
                        className="cta-btn" 
                        style={{ padding: '6px 12px', fontSize: '11px', border: '1px solid var(--border-color)' }}
                      >
                        edit
                      </button>
                      <button 
                        onClick={() => handleDelete(skill.id)}
                        className="cta-btn" 
                        style={{ padding: '6px 12px', fontSize: '11px', borderColor: '#ff4d4d', color: '#ff4d4d' }}
                      >
                        delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
