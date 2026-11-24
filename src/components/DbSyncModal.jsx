import React, { useState, useEffect } from 'react';
import { Database, Check, AlertCircle, RefreshCw, X, ExternalLink, ShieldCheck, Key, Trash2 } from 'lucide-react';
import { 
  getDbStatus, 
  getSavedFirebaseConfig, 
  saveFirebaseConfig, 
  removeFirebaseConfig, 
  subscribeDbStatus 
} from '../services/db';

export default function DbSyncModal({ isOpen, onClose }) {
  const [status, setStatus] = useState(getDbStatus());
  const [configInput, setConfigInput] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  useEffect(() => {
    const unsubscribe = subscribeDbStatus((st) => setStatus(st));
    return () => unsubscribe();
  }, []);

  if (!isOpen) return null;

  const handleSave = (e) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      const result = saveFirebaseConfig(configInput);
      if (result.success) {
        setSuccessMessage(`Connecté avec succès au projet "${result.config.projectId}" ! La synchronisation est active.`);
        setConfigInput('');
      }
    } catch (err) {
      setErrorMessage(err.message || "Impossible de parser ou connecter cette configuration.");
    }
  };

  const handleDisconnect = () => {
    if (window.confirm("Voulez-vous déconnecter la base de données cloud ? Vos modifications resteront stockées uniquement en local sur cet appareil.")) {
      removeFirebaseConfig();
      setSuccessMessage(null);
      setErrorMessage(null);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box glass-card db-sync-modal-box" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-700">
          <div className="flex items-center gap-2.5">
            <div className={`db-status-bubble ${status.connected ? 'active' : ''}`}>
              <Database size={20} className={status.connected ? 'text-emerald-400' : 'text-amber-400'} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white leading-tight">Base de Données Partagée</h3>
              <p className="text-xs text-slate-400">Synchronisation en temps réel (Legaults & Synettes)</p>
            </div>
          </div>
          <button className="btn-action-icon" onClick={onClose} title="Fermer">
            <X size={18} />
          </button>
        </div>

        {/* Status Card */}
        <div className={`db-status-banner ${status.connected ? 'banner-connected' : 'banner-local'}`}>
          <div className="flex items-start gap-3">
            {status.connected ? (
              <ShieldCheck size={22} className="text-emerald-400 flex-shrink-0 mt-0.5" />
            ) : (
              <AlertCircle size={22} className="text-amber-400 flex-shrink-0 mt-0.5" />
            )}
            <div>
              <div className="font-bold text-sm text-white mb-0.5">
                {status.connected ? (
                  <span>🟢 Connecté en direct au Cloud</span>
                ) : (
                  <span>🟡 Mode Local (Non synchronisé entre téléphones)</span>
                )}
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {status.connected ? (
                  <>Projet Firebase : <strong className="text-emerald-300 font-mono">{status.projectId}</strong>. Toutes les dépenses, statuts et modifications sont synchronisés en direct sur chaque appareil connecté !</>
                ) : (
                  <>Pour que tout le monde (Legaults et Synettes) voie instantanément les mêmes chiffres sur son iPhone ou ordinateur dès qu'une modification est faite, connectez une base de données gratuite Firebase ci-dessous.</>
                )}
              </p>
            </div>
          </div>
        </div>

        {successMessage && (
          <div className="db-alert-success mt-3">
            <Check size={16} />
            <span>{successMessage}</span>
          </div>
        )}

        {errorMessage && (
          <div className="db-alert-error mt-3">
            <AlertCircle size={16} />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* If Not Connected: Step by step guide */}
        {!status.connected ? (
          <div className="mt-4">
            <h4 className="text-sm font-bold text-sky-300 mb-2 flex items-center gap-1.5">
              <span>Comment activer la BD en 2 minutes (100% Gratuit) :</span>
            </h4>

            <ol className="db-setup-steps text-xs text-slate-300 space-y-2 mb-4 pl-4 list-decimal">
              <li>
                Ouvrez la console Google Firebase :{' '}
                <a 
                  href="https://console.firebase.google.com/" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="text-sky-400 font-bold underline inline-flex items-center gap-1"
                >
                  <span>Firebase Console</span>
                  <ExternalLink size={11} />
                </a>{' '}
                (gratuit avec votre compte Gmail).
              </li>
              <li>
                Cliquez <strong>Ajouter un projet</strong> (ex: <code className="text-sky-300 bg-slate-800 px-1 py-0.5 rounded">panorama-2027</code>), puis allez dans le menu <strong>Firestore Database</strong> et cliquez <em>Créer une base de données</em> (choisir <strong>Mode test</strong>).
              </li>
              <li>
                Dans les Paramètres du projet ⚙️, ajoutez une application Web (l'icône <code className="text-amber-300 bg-slate-800 px-1 py-0.5 rounded">&lt;/&gt;</code>) et copiez l'objet <code className="text-amber-300">firebaseConfig</code>.
              </li>
              <li>Collez-le ci-dessous et cliquez <strong>Enregistrer & Connecter</strong>.</li>
            </ol>

            <form onSubmit={handleSave} className="space-y-3">
              <div className="form-group">
                <label className="flex items-center justify-between text-xs font-bold text-slate-200">
                  <span>Configuration Firebase (JSON ou code JS) :</span>
                  <Key size={13} className="text-sky-400" />
                </label>
                <textarea
                  className="db-config-textarea font-mono text-xs"
                  placeholder={`const firebaseConfig = {\n  apiKey: "AIzaSy...",\n  authDomain: "panorama-2027.firebaseapp.com",\n  projectId: "panorama-2027",\n  storageBucket: "panorama-2027.firebasestorage.app",\n  messagingSenderId: "...",\n  appId: "..."\n};`}
                  value={configInput}
                  onChange={(e) => setConfigInput(e.target.value)}
                  rows={6}
                  required
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button type="button" className="btn-secondary" onClick={onClose}>
                  Fermer
                </button>
                <button type="submit" className="btn-primary">
                  <RefreshCw size={16} />
                  <span>Enregistrer &amp; Connecter</span>
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="mt-5 space-y-4">
            <div className="bg-slate-900/60 p-3.5 rounded-xl border border-slate-700/60 flex items-center justify-between">
              <div>
                <div className="text-xs text-slate-400 font-semibold uppercase tracking-wider">État de la connexion</div>
                <div className="text-emerald-400 font-bold text-sm mt-0.5">🟢 En direct (Modifications temps réel actives)</div>
              </div>
              <button 
                className="btn-secondary btn-sm text-rose-400 hover:text-rose-300 hover:bg-rose-950/40"
                onClick={handleDisconnect}
                title="Déconnecter Firebase"
              >
                <Trash2 size={14} className="inline mr-1" />
                <span>Déconnecter</span>
              </button>
            </div>

            <div className="flex justify-end pt-2">
              <button type="button" className="btn-primary" onClick={onClose}>
                Terminé
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
