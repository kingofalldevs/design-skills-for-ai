import React, { useState, useEffect } from 'react';
import { db, storage, collection, doc, setDoc, ref, uploadBytes, getDownloadURL, deleteDoc, query, onSnapshot } from '../firebase';
import Navigation from './Navigation.jsx';

export default function AdminDashboard({ user, onLogout, navigate }) {
  const [skillId, setSkillId] = useState('');
  const [category, setCategory] = useState('landing');
  const [promptContent, setPromptContent] = useState('');
  const [useCaseContent, setUseCaseContent] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [status, setStatus] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState('light');

  const [skillsList, setSkillsList] = useState([]);
  const [loadingSkills, setLoadingSkills] = useState(true);
  const [editingSkillId, setEditingSkillId] = useState(null);
  const [existingImageUrl, setExistingImageUrl] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null);

  useEffect(() => {
    if (!imageFile) {
      setImagePreviewUrl(null);
      return;
    }
    const objectUrl = URL.createObjectURL(imageFile);
    setImagePreviewUrl(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [imageFile]);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith('image/')) {
        setImageFile(file);
      } else {
        setStatus('Error: Dropped file must be an image.');
      }
    }
  };

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
    setPromptContent('');
    setUseCaseContent('');
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
    if (!skillId || !category || !promptContent || !useCaseContent) {
      setStatus('Error: Please fill in all text fields (Skill ID, Category, Prompt, and Use Case).');
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

      // Automatically prepend standard Layer headers if not already present
      let formattedPrompt = promptContent.trim();
      if (!formattedPrompt.match(/^##\s*LAYER\s*1/i)) {
        formattedPrompt = `## LAYER 1: THE PROMPT (The "What" – Structural Blueprint)\n${formattedPrompt}`;
      }

      let formattedUseCase = useCaseContent.trim();
      if (!formattedUseCase.match(/^##\s*LAYER\s*2/i)) {
        formattedUseCase = `## LAYER 2: THE SKILL (The "How" – Abstract Design Tokens)\n${formattedUseCase}`;
      }

      const combinedMd = `${formattedPrompt}\n\n${formattedUseCase}`;

      setStatus('Saving skill to Firestore...');
      const skillsCollection = collection(db, 'skills');
      const docRef = doc(skillsCollection, skillId);
      
      const dataToSave = {
        id: skillId,
        category,
        mdContent: combinedMd,
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
                <label style={{ fontFamily: 'var(--font-mono)', fontSize: '13px' }}>Prompt (Layer 1)</label>
                <textarea 
                  value={promptContent} 
                  onChange={(e) => setPromptContent(e.target.value)} 
                  rows="6"
                  style={{ padding: '10px', background: 'transparent', border: '1px solid var(--border-color)', color: 'var(--text-color)', fontFamily: 'var(--font-mono)' }}
                  placeholder="The 'What' – Structural Blueprint. Describe the page layout rules..."
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontFamily: 'var(--font-mono)', fontSize: '13px' }}>Use Case (Layer 2)</label>
                <textarea 
                  value={useCaseContent} 
                  onChange={(e) => setUseCaseContent(e.target.value)} 
                  rows="6"
                  style={{ padding: '10px', background: 'transparent', border: '1px solid var(--border-color)', color: 'var(--text-color)', fontFamily: 'var(--font-mono)' }}
                  placeholder="The 'How' – Abstract Design Tokens. Describe the color styles and tokens..."
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontFamily: 'var(--font-mono)', fontSize: '13px' }}>
                  Image Preview (Optional)
                </label>
                
                <div
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={() => document.getElementById('image-file-input').click()}
                  style={{
                    border: isDragging ? '1px dashed var(--text-color)' : '1px dashed var(--border-color)',
                    background: isDragging ? 'rgba(0,0,0,0.03)' : 'transparent',
                    padding: '24px',
                    textAlign: 'center',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    borderRadius: '4px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '12px',
                    minHeight: '120px'
                  }}
                >
                  <input 
                    id="image-file-input"
                    type="file" 
                    accept="image/*"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        setImageFile(e.target.files[0]);
                      }
                    }} 
                    style={{ display: 'none' }}
                  />
                  
                  {imagePreviewUrl ? (
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                      <img 
                        src={imagePreviewUrl} 
                        alt="Preview" 
                        style={{ maxWidth: '120px', maxHeight: '80px', objectFit: 'contain', borderRadius: '2px', border: '1px solid var(--border-color)' }} 
                      />
                      <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', opacity: 0.8 }}>✓ {imageFile ? imageFile.name : ''}</span>
                      <span style={{ fontSize: '9px', opacity: 0.5, textDecoration: 'underline' }}>Click or drop to replace</span>
                    </div>
                  ) : existingImageUrl ? (
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                      <img 
                        src={existingImageUrl} 
                        alt="Existing Preview" 
                        style={{ maxWidth: '120px', maxHeight: '80px', objectFit: 'contain', borderRadius: '2px', border: '1px solid var(--border-color)' }} 
                      />
                      <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', opacity: 0.8 }}>Existing image loaded</span>
                      <span style={{ fontSize: '9px', opacity: 0.5, textDecoration: 'underline' }}>Click or drop to replace</span>
                    </div>
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                      <span style={{ fontSize: '12px', fontFamily: 'var(--font-mono)' }}>Drag & drop image here or click to browse</span>
                      <span style={{ fontSize: '10px', opacity: 0.4 }}>Supports JPG, PNG, GIF, WEBP</span>
                    </div>
                  )}
                </div>
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
                {skillsList.map((skill) => {
                  // Split content to retrieve Layer 2 (use case)
                  const layer2Index = skill.mdContent ? skill.mdContent.search(/##\s*LAYER\s*2/i) : -1;
                  const useCase = layer2Index !== -1 ? skill.mdContent.substring(layer2Index).trim() : '';
                  const cleanUseCase = useCase 
                    ? useCase.replace(/##\s*LAYER\s*2:[^\n]*/i, '').replace(/##\s*LAYER\s*2[^\n]*/i, '').trim() 
                    : '';

                  return (
                    <div key={skill.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(128, 128, 128, 0.15)', padding: '16px 0', background: 'transparent', gap: '16px' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', flex: 1.2, minWidth: 0 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                          <span style={{ fontWeight: 'var(--fw-regular)', fontFamily: 'var(--font-mono)', fontSize: '13px', wordBreak: 'break-all' }}>{skill.id}</span>
                          <span style={{ fontSize: '10px', padding: '2px 6px', border: '1px solid var(--border-color)', borderRadius: '3px', opacity: 0.8 }}>{skill.category}</span>
                        </div>
                        {skill.imageUrl && (
                          <span style={{ fontSize: '11px', opacity: 0.5 }}>✓ Has preview image</span>
                        )}
                      </div>

                      {/* Centered Use Case snippet */}
                      <div 
                        style={{ 
                          flex: 1.5, 
                          textAlign: 'center', 
                          fontSize: '11px', 
                          opacity: 0.6, 
                          fontFamily: 'var(--font-mono)',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          lineHeight: '1.4',
                          maxHeight: '38px',
                          cursor: 'help'
                        }} 
                        title={cleanUseCase}
                      >
                        {cleanUseCase || 'no use case'}
                      </div>

                      <div style={{ display: 'flex', gap: '8px', flexShrink: 0 }}>
                        <button 
                          onClick={() => {
                            setSkillId(skill.id);
                            setCategory(skill.category);
                            
                            const layer2Index = skill.mdContent ? skill.mdContent.search(/##\s*LAYER\s*2/i) : -1;
                            if (layer2Index !== -1) {
                              setPromptContent(skill.mdContent.substring(0, layer2Index).trim());
                              setUseCaseContent(skill.mdContent.substring(layer2Index).trim());
                            } else {
                              setPromptContent(skill.mdContent || '');
                              setUseCaseContent('');
                            }
                            
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
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
