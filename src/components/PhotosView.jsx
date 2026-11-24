import React, { useState } from 'react';
import { 
  Camera, Upload, Plus, Film, Image as ImageIcon, 
  ExternalLink, Trash2, X, Sparkles, Check, Clapperboard, Music, Eye,
  Edit2, Save, Share2, Video
} from 'lucide-react';
import { INITIAL_PHOTOS, TRIP_METADATA } from '../data/tripData';
import { useSyncedData } from '../services/db';

export default function PhotosView() {
  const [photos, setPhotos, isLive] = useSyncedData('photos', INITIAL_PHOTOS);
  const [albumSettings, setAlbumSettings] = useSyncedData('album_settings', {
    url: TRIP_METADATA.googlePhotosAlbumUrl
  });

  const [filter, setFilter] = useState('ALL');
  const [lightboxPhoto, setLightboxPhoto] = useState(null);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [isEditingAlbumUrl, setIsEditingAlbumUrl] = useState(false);
  const [tempAlbumUrl, setTempAlbumUrl] = useState(albumSettings?.url || TRIP_METADATA.googlePhotosAlbumUrl);

  // New photo state
  const [newTitle, setNewTitle] = useState('');
  const [newCaption, setNewCaption] = useState('');
  const [newCategory, setNewCategory] = useState('Montagne');
  const [newAuthor, setNewAuthor] = useState('Famille');
  const [imageUrl, setImageUrl] = useState('');
  const [imageFilePreview, setImageFilePreview] = useState(null);

  const activeAlbumUrl = albumSettings?.url || TRIP_METADATA.googlePhotosAlbumUrl;

  const handleSaveAlbumUrl = (e) => {
    e.preventDefault();
    if (!tempAlbumUrl) return;
    setAlbumSettings({ ...albumSettings, url: tempAlbumUrl });
    setIsEditingAlbumUrl(false);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        // Compress image via canvas before storing
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const maxDim = 1200;
          let w = img.width;
          let h = img.height;
          if (w > maxDim || h > maxDim) {
            if (w > h) {
              h = Math.round((h * maxDim) / w);
              w = maxDim;
            } else {
              w = Math.round((w * maxDim) / h);
              h = maxDim;
            }
          }
          canvas.width = w;
          canvas.height = h;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, w, h);
          const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.75);
          setImageFilePreview(compressedDataUrl);
          if (!newTitle) {
            setNewTitle(file.name.replace(/\.[^/.]+$/, ""));
          }
        };
        img.src = reader.result;
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddPhotoSubmit = (e) => {
    e.preventDefault();
    const finalUrl = imageFilePreview || imageUrl;
    if (!finalUrl) {
      alert("Veuillez sélectionner un fichier ou entrer un lien d'image.");
      return;
    }

    const newPhoto = {
      id: `photo-${Date.now()}`,
      title: newTitle || 'Photo souvenir Panorama',
      caption: newCaption || 'Moment inoubliable sur les pentes',
      category: newCategory,
      author: newAuthor,
      url: finalUrl
    };

    setPhotos([newPhoto, ...photos]);
    setShowUploadModal(false);
    setNewTitle('');
    setNewCaption('');
    setImageUrl('');
    setImageFilePreview(null);
  };

  const handleDeletePhoto = (id, e) => {
    e.stopPropagation();
    if (window.confirm("Supprimer cette photo de la galerie ?")) {
      setPhotos(photos.filter(p => p.id !== id));
      if (lightboxPhoto?.id === id) setLightboxPhoto(null);
    }
  };

  const filteredPhotos = photos.filter(p => {
    if (filter === 'ALL') return true;
    return p.category === filter;
  });

  return (
    <div className="photos-view">
      {/* Header */}
      <div className="view-header-bar">
        <div>
          <div className="section-badge">
            <Camera size={14} />
            <span>Galerie &amp; Montage Souvenir</span>
          </div>
          <h1 className="section-title">Photos &amp; Vidéos du Voyage</h1>
          <p className="section-desc">
            Consultez les clichés de la montagne, téléversez vos coups de cœur et accédez à l'album partagé Google Photos pour toutes vos vidéos 4K !
          </p>
        </div>

        <div className="header-actions-group">
          <a 
            href={activeAlbumUrl}
            target="_blank"
            rel="noreferrer"
            className="btn-google-photos-sm"
          >
            <Camera size={16} />
            <span>Album Google Photos</span>
            <ExternalLink size={13} />
          </a>
          <button className="btn-primary" onClick={() => setShowUploadModal(true)}>
            <Upload size={18} />
            <span>Ajouter un cliché</span>
          </button>
        </div>
      </div>

      {/* Google Photos Shared Album Highlight Card */}
      <div className="glass-card google-photos-banner mb-6">
        <div className="google-photos-content">
          <div className="google-photos-icon-wrapper">
            <svg className="google-photos-pinwheel" viewBox="0 0 24 24" width="34" height="34">
              <path fill="#EA4335" d="M12 12V3a9 9 0 0 0-9 9h9z"/>
              <path fill="#4285F4" d="M12 12h9a9 9 0 0 0-9-9v9z"/>
              <path fill="#FBBC05" d="M12 12v9a9 9 0 0 0 9-9h-9z"/>
              <path fill="#34A853" d="M12 12H3a9 9 0 0 0 9 9v-9z"/>
            </svg>
          </div>
          <div className="google-photos-text">
            <div className="section-badge mb-1 text-emerald-300 bg-emerald-500/10 border-emerald-500/30">
              <Sparkles size={12} className="inline mr-1" />
              <span>Stockage Illimité Vidéos &amp; Photos</span>
            </div>
            <h3 className="google-photos-title">Album Partagé Officiel Google Photos</h3>
            <p className="google-photos-desc">
              Déposez vos vidéos 4K de descentes, vos ralentis dans la poudreuse et toutes vos photos de famille en pleine résolution. Tout le monde (Legaults &amp; Synettes) peut y ajouter des fichiers en direct depuis l'application Google Photos de son iPhone !
            </p>

            {isEditingAlbumUrl ? (
              <form onSubmit={handleSaveAlbumUrl} className="mt-3 flex items-center gap-2 flex-wrap">
                <input 
                  type="url" 
                  required
                  className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white flex-1 min-w-[240px]"
                  value={tempAlbumUrl}
                  onChange={(e) => setTempAlbumUrl(e.target.value)}
                  placeholder="https://photos.app.goo.gl/..."
                />
                <button type="submit" className="btn-primary btn-sm flex items-center gap-1">
                  <Save size={13} />
                  <span>Enregistrer</span>
                </button>
                <button 
                  type="button" 
                  className="btn-secondary btn-sm"
                  onClick={() => setIsEditingAlbumUrl(false)}
                >
                  Annuler
                </button>
              </form>
            ) : null}
          </div>
        </div>

        <div className="google-photos-actions">
          <a 
            href={activeAlbumUrl}
            target="_blank"
            rel="noreferrer"
            className="btn-google-photos"
          >
            <Camera size={18} />
            <span>Ouvrir l'Album Google Photos</span>
            <ExternalLink size={15} />
          </a>
          <button 
            className="btn-secondary btn-sm"
            onClick={() => {
              setTempAlbumUrl(activeAlbumUrl);
              setIsEditingAlbumUrl(!isEditingAlbumUrl);
            }}
            title="Modifier le lien de l'album"
          >
            <Edit2 size={13} />
            <span>Modifier le lien</span>
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="photos-filter-bar glass-card">
        <div className="filter-pill-list">
          {['ALL', 'Montagne', 'Ski', 'Village', 'Chalet & Détente'].map((cat) => (
            <button
              key={cat}
              className={`cat-pill ${filter === cat ? 'active' : ''}`}
              onClick={() => setFilter(cat)}
            >
              {cat === 'ALL' ? 'Tous les clichés' : cat} ({photos.filter(p => cat === 'ALL' ? true : p.category === cat).length})
            </button>
          ))}
        </div>
      </div>

      {/* Photo Grid */}
      <div className="photos-masonry-grid">
        {filteredPhotos.map((photo) => (
          <div 
            key={photo.id} 
            className="photo-card glass-card"
            onClick={() => setLightboxPhoto(photo)}
          >
            <div className="photo-img-wrapper">
              <img src={photo.url} alt={photo.title} loading="lazy" />
              <div className="photo-card-hover-overlay">
                <Eye size={28} className="text-white drop-shadow" />
                <span className="text-white text-xs font-semibold mt-1">Agrandir</span>
              </div>
              <button 
                className="photo-delete-btn" 
                onClick={(e) => handleDeletePhoto(photo.id, e)}
                title="Supprimer la photo"
              >
                <Trash2 size={14} />
              </button>
            </div>

            <div className="photo-card-meta">
              <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                <span className="photo-category-pill">{photo.category}</span>
                <span>{photo.author}</span>
              </div>
              <h4 className="photo-card-title">{photo.title}</h4>
              {photo.caption && <p className="photo-card-caption">{photo.caption}</p>}
            </div>
          </div>
        ))}
      </div>

      {/* Montage Video & Storyboard Studio Section */}
      <div className="glass-card montage-studio-card mt-8">
        <div className="montage-header">
          <div className="flex items-center gap-3">
            <div className="montage-icon-box">
              <Clapperboard size={28} className="text-amber-400" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white">Studio Montage Vidéo &amp; Photos</h3>
              <p className="text-slate-400 text-sm">
                Espace dédié à la préparation du montage souvenir d'après-voyage (shot list, musique, idées de scènes).
              </p>
            </div>
          </div>
        </div>

        <div className="montage-content-grid">
          {/* Shot list / Must-Haves */}
          <div className="montage-subcard">
            <h4 className="montage-subcard-title">
              <Sparkles size={16} className="text-sky-400" />
              <span>Prises de vue à ne pas oublier (Shot List) :</span>
            </h4>
            <ul className="montage-checklist">
              <li>
                <Check size={14} className="text-emerald-400 mt-1 flex-shrink-0" />
                <span>La réaction des garçons le matin de Noël lors du déballage de la surprise !</span>
              </li>
              <li>
                <Check size={14} className="text-emerald-400 mt-1 flex-shrink-0" />
                <span>Le trajet en Rav4 traversant le col enneigé entre Banff et Panorama.</span>
              </li>
              <li>
                <Check size={14} className="text-emerald-400 mt-1 flex-shrink-0" />
                <span>Vue panoramique à 360° au sommet du télésiège Summit Quad.</span>
              </li>
              <li>
                <Check size={14} className="text-emerald-400 mt-1 flex-shrink-0" />
                <span>Descente dans la poudreuse du Taynton Bowl avec la caméra d'action.</span>
              </li>
              <li>
                <Check size={14} className="text-emerald-400 mt-1 flex-shrink-0" />
                <span>Plongeon dans les bassins chauds extérieurs Panorama Springs sous la neige !</span>
              </li>
              <li>
                <Check size={14} className="text-emerald-400 mt-1 flex-shrink-0" />
                <span>Apéro, rires et soupers familiaux dans le condo Aisling Baile.</span>
              </li>
            </ul>
          </div>

          {/* Soundtrack Ideas & Notes */}
          <div className="montage-subcard">
            <h4 className="montage-subcard-title">
              <Music size={16} className="text-rose-400" />
              <span>Idées de Trame Sonore &amp; Style :</span>
            </h4>
            <div className="montage-notes-box">
              <p className="text-sm text-slate-300 mb-2">
                <strong>Style suggéré :</strong> Énergique, épique et festif (rythme indie-folk / rock montagnard comme Vance Joy, The Lumineers ou électronique douce style ODESZA pour les plans au ralenti sur la neige).
              </p>
              <div className="text-xs text-slate-400 bg-slate-900/60 p-3 rounded-lg border border-slate-700/60">
                💡 <em>Astuce : Vous pourrez glisser ici le lien de votre montage final (YouTube non-répertorié ou Vimeo) pour qu'il soit visionnable directement dans l'application en famille !</em>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxPhoto && (
        <div className="lightbox-overlay" onClick={() => setLightboxPhoto(null)}>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <button className="lightbox-close-btn" onClick={() => setLightboxPhoto(null)}>
              <X size={24} />
            </button>
            <img src={lightboxPhoto.url} alt={lightboxPhoto.title} className="lightbox-img" />
            <div className="lightbox-caption-bar">
              <div>
                <h3 className="text-lg font-bold text-white">{lightboxPhoto.title}</h3>
                <p className="text-slate-300 text-sm">{lightboxPhoto.caption}</p>
              </div>
              <span className="photo-category-pill">{lightboxPhoto.category}</span>
            </div>
          </div>
        </div>
      )}

      {/* Upload Photo Modal */}
      {showUploadModal && (
        <div className="modal-overlay" onClick={() => setShowUploadModal(false)}>
          <div className="modal-box glass-card" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-700">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Upload size={20} className="text-sky-400" />
                <span>Ajouter un cliché favori</span>
              </h3>
              <button className="btn-action-icon" onClick={() => setShowUploadModal(false)}>
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleAddPhotoSubmit} className="space-y-4">
              <div className="form-group">
                <label>Titre de la photo *</label>
                <input 
                  type="text" 
                  required
                  placeholder="Ex: Première descente du Summit Quad"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Description / Légende</label>
                <input 
                  type="text" 
                  placeholder="Ex: Les gars tout sourire avec leurs nouveaux skis !"
                  value={newCaption}
                  onChange={(e) => setNewCaption(e.target.value)}
                />
              </div>

              <div className="form-grid grid grid-cols-2 gap-3">
                <div className="form-group">
                  <label>Catégorie</label>
                  <select value={newCategory} onChange={(e) => setNewCategory(e.target.value)}>
                    <option value="Montagne">🏔️ Montagne</option>
                    <option value="Ski">🎿 Ski &amp; Poudreuse</option>
                    <option value="Village">🏘️ Village</option>
                    <option value="Chalet &amp; Détente">🔥 Chalet &amp; Détente</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Auteur / Pris par</label>
                  <select value={newAuthor} onChange={(e) => setNewAuthor(e.target.value)}>
                    <option value="Famille">Famille</option>
                    <option value="Les Legaults">Les Legaults</option>
                    <option value="Les Synettes">Les Synettes</option>
                    <option value="Panorama Resort">Panorama Resort</option>
                  </select>
                </div>
              </div>

              {/* Upload file or URL */}
              <div className="form-group">
                <label>Choisir une photo depuis votre iPhone / PC :</label>
                <input 
                  type="file" 
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="file-upload-input"
                />
                <span className="text-[11px] text-slate-400 mt-1">
                  (Optimisée et compressée automatiquement pour s'enregistrer dans votre base de données sans ralentir)
                </span>
              </div>

              <div className="text-center text-xs text-slate-400 uppercase tracking-widest my-1">
                — OU PAR LIEN DIRECT —
              </div>

              <div className="form-group">
                <label>Lien direct vers l'image (URL) :</label>
                <input 
                  type="url" 
                  placeholder="https://..."
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                />
              </div>

              {imageFilePreview && (
                <div className="image-preview-box mt-2">
                  <img src={imageFilePreview} alt="Aperçu" className="w-full h-44 object-cover rounded-xl" />
                </div>
              )}

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-700">
                <button type="button" className="btn-secondary" onClick={() => setShowUploadModal(false)}>
                  Annuler
                </button>
                <button type="submit" className="btn-primary">
                  Publier dans la galerie
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
