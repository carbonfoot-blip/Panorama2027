import { useState, useEffect } from 'react';
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore, doc, onSnapshot, setDoc } from 'firebase/firestore';
import { DEFAULT_FIREBASE_CONFIG } from '../firebaseConfig';

const CONFIG_STORAGE_KEY = 'panorama2027_firebase_config_v1';

let firestoreInstance = null;
let currentConfig = null;
const statusListeners = new Set();

function notifyStatusListeners(status) {
  statusListeners.forEach(listener => {
    try {
      listener(status);
    } catch (_e) {}
  });
}

export function getSavedFirebaseConfig() {
  try {
    const raw = localStorage.getItem(CONFIG_STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch (_e) {}
  return DEFAULT_FIREBASE_CONFIG || null;
}

export function initFirebase(config) {
  if (!config || !config.apiKey || !config.projectId) {
    firestoreInstance = null;
    currentConfig = null;
    notifyStatusListeners({ connected: false, error: null, mode: 'local' });
    return null;
  }

  try {
    let app;
    if (getApps().length > 0) {
      app = getApp();
    } else {
      app = initializeApp(config);
    }
    const db = getFirestore(app);
    firestoreInstance = db;
    currentConfig = config;
    notifyStatusListeners({ connected: true, error: null, mode: 'cloud', projectId: config.projectId });
    return db;
  } catch (err) {
    console.warn("Erreur d'initialisation Firebase:", err);
    firestoreInstance = null;
    notifyStatusListeners({ connected: false, error: err.message, mode: 'error' });
    return null;
  }
}

// Auto-initialize from default or saved config
const initialConfig = getSavedFirebaseConfig();
if (initialConfig) {
  initFirebase(initialConfig);
}

export function saveFirebaseConfig(configInput) {
  let parsed = null;
  if (typeof configInput === 'string') {
    // If user pasted a code snippet like "const firebaseConfig = { ... };"
    const cleaned = configInput
      .replace(/const\s+firebaseConfig\s*=\s*/i, '')
      .replace(/var\s+firebaseConfig\s*=\s*/i, '')
      .replace(/let\s+firebaseConfig\s*=\s*/i, '')
      .replace(/;\s*$/, '')
      .trim();
    try {
      // Try JSON first
      parsed = JSON.parse(cleaned);
    } catch (_e) {
      try {
        // Fallback for JS object syntax: apiKey: "...", authDomain: "..."
        const jsonString = cleaned
          .replace(/([{,]\s*)([a-zA-Z0-9_]+)\s*:/g, '$1"$2":')
          .replace(/'/g, '"');
        parsed = JSON.parse(jsonString);
      } catch (err2) {
        throw new Error("Format invalide. Veuillez coller un objet JSON ou la configuration Firebase valide.");
      }
    }
  } else if (typeof configInput === 'object') {
    parsed = configInput;
  }

  if (!parsed?.apiKey || !parsed?.projectId) {
    throw new Error("Clés manquantes: la configuration doit contenir au minimum 'apiKey' et 'projectId'.");
  }

  localStorage.setItem(CONFIG_STORAGE_KEY, JSON.stringify(parsed));
  const db = initFirebase(parsed);
  return { success: !!db, config: parsed };
}

export function removeFirebaseConfig() {
  localStorage.removeItem(CONFIG_STORAGE_KEY);
  if (DEFAULT_FIREBASE_CONFIG) {
    initFirebase(DEFAULT_FIREBASE_CONFIG);
  } else {
    firestoreInstance = null;
    currentConfig = null;
    notifyStatusListeners({ connected: false, error: null, mode: 'local' });
  }
}

export function subscribeDbStatus(callback) {
  statusListeners.add(callback);
  callback(getDbStatus());
  return () => statusListeners.delete(callback);
}

export function getDbStatus() {
  if (firestoreInstance && currentConfig) {
    return { connected: true, mode: 'cloud', projectId: currentConfig.projectId, error: null };
  }
  return { connected: false, mode: 'local', projectId: null, error: null };
}

/**
 * Hook to synchronize data with Firestore in real-time with automatic localStorage cache
 */
export function useSyncedData(collectionKey, defaultData) {
  const localStorageKey = `panorama2027_${collectionKey}_cache_v1`;

  const [data, setData] = useState(() => {
    try {
      const cached = localStorage.getItem(localStorageKey);
      if (cached) return JSON.parse(cached);
    } catch (_e) {}
    return defaultData;
  });

  const [isLive, setIsLive] = useState(!!firestoreInstance);

  useEffect(() => {
    if (!firestoreInstance) {
      setIsLive(false);
      return;
    }

    setIsLive(true);
    const docRef = doc(firestoreInstance, 'panorama2027', collectionKey);

    // Set up real-time onSnapshot listener
    const unsubscribe = onSnapshot(
      docRef,
      (docSnap) => {
        if (docSnap.exists()) {
          const cloudData = docSnap.data().items;
          if (cloudData !== undefined) {
            setData(cloudData);
            try {
              localStorage.setItem(localStorageKey, JSON.stringify(cloudData));
            } catch (_e) {}
          }
        } else {
          // Document does not exist yet: initialize it in cloud
          setDoc(docRef, { items: defaultData, updatedAt: new Date().toISOString() }).catch((err) => {
            console.warn(`Initialisation cloud [${collectionKey}] échouée:`, err);
          });
        }
      },
      (err) => {
        console.warn(`Erreur de synchronisation [${collectionKey}]:`, err);
        setIsLive(false);
      }
    );

    return () => unsubscribe();
  }, [collectionKey]);

  // Update function that writes to Cloud (if connected) and local cache
  const updateData = async (updater) => {
    const nextVal = typeof updater === 'function' ? updater(data) : updater;
    setData(nextVal);

    try {
      localStorage.setItem(localStorageKey, JSON.stringify(nextVal));
    } catch (_e) {}

    if (firestoreInstance) {
      try {
        const docRef = doc(firestoreInstance, 'panorama2027', collectionKey);
        await setDoc(docRef, { items: nextVal, updatedAt: new Date().toISOString() });
      } catch (err) {
        console.warn(`Erreur d'écriture dans le cloud [${collectionKey}]:`, err);
      }
    }
  };

  return [data, updateData, isLive];
}
