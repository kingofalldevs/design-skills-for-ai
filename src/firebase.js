import { initializeApp, getApps } from "firebase/app";
import { 
  getFirestore, 
  collection as fbCollection, 
  doc as fbDoc, 
  setDoc as fbSetDoc, 
  query as fbQuery, 
  onSnapshot as fbOnSnapshot,
  deleteDoc as fbDeleteDoc
} from "firebase/firestore";
import { 
  getStorage, 
  ref as fbRef, 
  uploadBytes as fbUploadBytes, 
  getDownloadURL as fbGetDownloadURL 
} from "firebase/storage";
import { 
  getAuth, 
  signInWithEmailAndPassword as fbSignIn,
  createUserWithEmailAndPassword as fbCreateUser,
  signOut as fbSignOut,
  onAuthStateChanged as fbOnAuthStateChanged
} from "firebase/auth";
import { SKILLS_DATA } from './data/skillsData.js';

// Check if variables are provided in Vite environment
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

const useMockAuth = import.meta.env.VITE_USE_MOCK_AUTH === "true" || import.meta.env.VITE_USE_MOCK_AUTH === true;
const isConfigValid = !useMockAuth && firebaseConfig.apiKey && firebaseConfig.apiKey !== "" && firebaseConfig.apiKey !== "your_api_key";

let authInstance;
let dbInstance = null;
let storageInstance = null;
let isMock = false;

// Mock Authentication Driver for local-only testing
const mockAuth = {
  currentUser: JSON.parse(localStorage.getItem("mock_auth_user")) || null,
  listeners: [],
  
  notify() {
    this.listeners.forEach(cb => cb(this.currentUser));
  }
};

if (isConfigValid) {
  try {
    const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
    authInstance = getAuth(app);
    dbInstance = getFirestore(app);
    storageInstance = getStorage(app);
    console.log("Firebase initialized successfully in production/development mode.");
  } catch (error) {
    console.error("Firebase failed to initialize, reverting to mock mode:", error);
    isMock = true;
  }
} else {
  console.warn("VITE_FIREBASE_API_KEY is not defined or invalid. App is running in Mock Auth/Database Mode.");
  isMock = true;
}

export const auth = isMock ? mockAuth : authInstance;
export const db = isMock ? { type: 'mock-db' } : dbInstance;
export const storage = isMock ? { type: 'mock-storage' } : storageInstance;

// Mock Firestore data persistence
function getMockSkills() {
  const local = localStorage.getItem("mock_firestore_skills_v2");
  if (!local) {
    localStorage.setItem("mock_firestore_skills_v2", JSON.stringify([]));
    return [];
  }
  let skills = [];
  try {
    skills = JSON.parse(local);
  } catch (e) {
    skills = [];
  }
  const filtered = skills.filter(s => 
    !s.id.toLowerCase().includes('deepseek') &&
    !s.id.toLowerCase().includes('kukumba') &&
    !(s.mdContent && s.mdContent.toLowerCase().includes('kukumba')) &&
    !(s.mdContent && s.mdContent.toLowerCase().includes('deepseek'))
  );
  if (filtered.length !== skills.length) {
    localStorage.setItem("mock_firestore_skills_v2", JSON.stringify(filtered));
  }
  return filtered;
}

let firestoreListeners = [];

function notifyFirestoreListeners() {
  firestoreListeners.forEach(listener => listener());
}

function saveMockSkill(id, data) {
  const skills = getMockSkills();
  const index = skills.findIndex(s => s.id === id);
  const updatedSkill = { ...skills[index], ...data, id };
  if (index !== -1) {
    skills[index] = updatedSkill;
  } else {
    skills.push(updatedSkill);
  }
  localStorage.setItem("mock_firestore_skills_v2", JSON.stringify(skills));
  notifyFirestoreListeners();
}

// Mock Storage data store
const mockStorageData = {};

// Firestore wrapper exports
export function collection(dbRef, name) {
  if (isMock) {
    return { type: 'collection', name };
  }
  return fbCollection(dbRef, name);
}

export function doc(collRef, id) {
  if (isMock) {
    return { type: 'doc', collection: collRef, id };
  }
  return fbDoc(collRef, id);
}

export function query(collRef, ...queryConstraints) {
  if (isMock) {
    return { type: 'query', collection: collRef };
  }
  return fbQuery(collRef, ...queryConstraints);
}

export function setDoc(docRef, data) {
  if (isMock) {
    return new Promise((resolve) => {
      saveMockSkill(docRef.id, data);
      resolve();
    });
  }
  return fbSetDoc(docRef, data);
}

export function deleteDoc(docRef) {
  if (isMock) {
    return new Promise((resolve) => {
      const skills = getMockSkills();
      const updatedSkills = skills.filter(s => s.id !== docRef.id);
      localStorage.setItem("mock_firestore_skills_v2", JSON.stringify(updatedSkills));
      notifyFirestoreListeners();
      resolve();
    });
  }
  return fbDeleteDoc(docRef);
}

export function onSnapshot(queryRef, callback, errorCallback) {
  if (isMock) {
    const listener = () => {
      const skills = getMockSkills();
      const snapshot = {
        forEach(cb) {
          skills.forEach(s => {
            cb({
              id: s.id,
              data: () => s
            });
          });
        }
      };
      callback(snapshot);
    };
    
    firestoreListeners.push(listener);
    // Trigger immediately
    listener();
    
    return () => {
      firestoreListeners = firestoreListeners.filter(l => l !== listener);
    };
  }
  return fbOnSnapshot(queryRef, callback, errorCallback);
}

// Storage wrapper exports
export function ref(storageRef, path) {
  if (isMock) {
    return { type: 'storage-ref', path };
  }
  return fbRef(storageRef, path);
}

export function uploadBytes(refInstance, file) {
  if (isMock) {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        mockStorageData[refInstance.path] = reader.result;
        resolve();
      };
      reader.readAsDataURL(file);
    });
  }
  return fbUploadBytes(refInstance, file);
}

export function getDownloadURL(refInstance) {
  if (isMock) {
    return Promise.resolve(mockStorageData[refInstance.path] || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe");
  }
  return fbGetDownloadURL(refInstance);
}


export function signInWithEmailAndPassword(authRef, email, password) {
  if (isMock) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simple client-side mock verification
        const users = JSON.parse(localStorage.getItem("mock_auth_users") || "[]");
        const match = users.find(u => u.email === email && u.password === password);
        if (match) {
          const user = { uid: match.uid, email: match.email, displayName: email.split('@')[0] };
          mockAuth.currentUser = user;
          localStorage.setItem("mock_auth_user", JSON.stringify(user));
          mockAuth.notify();
          resolve({ user });
        } else {
          reject(new Error("auth/invalid-credential: User not found or incorrect credentials."));
        }
      }, 500);
    });
  }
  return fbSignIn(authRef, email, password);
}

export function createUserWithEmailAndPassword(authRef, email, password) {
  if (isMock) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const users = JSON.parse(localStorage.getItem("mock_auth_users") || "[]");
        if (users.some(u => u.email === email)) {
          reject(new Error("auth/email-already-in-use: An account with this email already exists."));
          return;
        }
        if (password.length < 6) {
          reject(new Error("auth/weak-password: Password must be at least 6 characters."));
          return;
        }
        const newUser = { uid: "mock-uid-" + Math.random().toString(36).substr(2, 9), email, password };
        users.push(newUser);
        localStorage.setItem("mock_auth_users", JSON.stringify(users));
        
        const user = { uid: newUser.uid, email: newUser.email, displayName: email.split('@')[0] };
        mockAuth.currentUser = user;
        localStorage.setItem("mock_auth_user", JSON.stringify(user));
        mockAuth.notify();
        resolve({ user });
      }, 500);
    });
  }
  return fbCreateUser(authRef, email, password);
}

export function signOut(authRef) {
  if (isMock) {
    return new Promise((resolve) => {
      setTimeout(() => {
        mockAuth.currentUser = null;
        localStorage.removeItem("mock_auth_user");
        mockAuth.notify();
        resolve();
      }, 300);
    });
  }
  return fbSignOut(authRef);
}

export function onAuthStateChanged(authRef, callback) {
  if (isMock) {
    mockAuth.listeners.push(callback);
    // Initial call
    callback(mockAuth.currentUser);
    return () => {
      mockAuth.listeners = mockAuth.listeners.filter(cb => cb !== callback);
    };
  }
  return fbOnAuthStateChanged(authRef, callback);
}

export { isMock };
