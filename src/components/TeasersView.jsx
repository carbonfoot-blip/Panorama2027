import React, { useState } from 'react';
import { 
  Flame, Sparkles, Plus, Trash2, X, Image as ImageIcon, 
  Send, MessageSquare, ThumbsUp, Snowflake, Trophy, Compass, Camera
} from 'lucide-react';
import { INITIAL_TEASERS } from '../data/tripData';
import { useSyncedData } from '../services/db';

export default function TeasersView() {
  const [teasers, setTeasers, isLive] = useSyncedData('teasers', INITIAL_TEASERS);
  const [showAddModal, setShowAddModal] = useState(false);

  // New post form state
  const [author, setAuthor] = useState('Félix');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('Poudreuse fraîche ❄️');
  const [imageUrl, setImageUrl] = useState('');
  const [imageFilePreview, setImageFilePreview] = useState(null);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        // Auto compress before saving
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
          setImageFilePreview(canvas.toDataURL('image/jpeg', 0.75));
        };
        img.src = reader.result;
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCreatePost = (e) => {
    e.preventDefault();
    if (!title || !content) return;

    const newPost = {
      id: `teaser-${Date.now()}`,
      author: author || 'Famille',
      authorRole: author === 'Félix' ? 'Organisateur' : 'Membre VIP',
      title,
      content,
      category,
      date: 'À l’instant',
      imageUrl: imageFilePreview || imageUrl || '',
      likes: { fire: 1, snow: 1, ski: 1, heart: 1 }
    };

    setTeasers([newPost, ...teasers]);
    setShowAddModal(false);
    setTitle('');
    setContent('');
    setImageUrl('');
    setImageFilePreview(null);
  };

  const handleReaction = (teaserId, reactionType) => {
    setTeasers(teasers.map(item => {
      if (item.id === teaserId) {
        const currentLikes = item.likes || { fire: 0, snow: 0, ski: 0, heart: 0 };
        return {
          ...item,
          likes: {
            ...currentLikes,
            [reactionType]: (currentLikes[reactionType] || 0) + 1
          }
        };
      }
      return item;
    }));
  };

  const handleDeletePost = (id) => {
    if (window.confirm("Supprimer cette publication du fil Teasers ?")) {
      setTeasers(teasers.filter(t => t.id !== id));
    }
  };

  return (
    <div className="teasers-view">
      {/* Header */}
      <div className="view-header-bar">
        <div>
          <div className="section-badge">
            <Flame size={14} className="text-amber-400" />
            <span>Le Fil d'Ambiance de la Montagne</span>
          </div>
          <h1 className="section-title">Teasers &amp; Annonces Panorama</h1>
          <p className="section-desc">
            Publications, tempêtes de neige en direct, trouvailles vidéo et annonces officielles pour faire saliver toute la famille avant le départ !
          </p>
        </div>

        <div className="header-actions-group">
          <button className="btn-primary" onClick={() => setShowAddModal(true)}>
            <Plus size={18} />
            <span>Publier un teaser</span>
          </button>
        </div>
      </div>

      {/* Feed list */}
      <div className="teasers-feed-container">
        {teasers.map((post) => (
          <div key={post.id} className="teaser-card glass-card">
            {/* Card Top */}
            <div className="teaser-card-top">
              <div className="teaser-author-block">
                <div className="teaser-avatar">
                  {post.author ? post.author.charAt(0).toUpperCase() : 'P'}
                </div>
                <div>
                  <div className="teaser-author-name">
                    <span>{post.author}</span>
                    {post.authorRole && <span className="teaser-role-badge">{post.authorRole}</span>}
                  </div>
                  <span className="teaser-date">{post.date}</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="teaser-category-pill">{post.category}</span>
                <button 
                  className="btn-action-icon hover:text-rose-400"
                  onClick={() => handleDeletePost(post.id)}
                  title="Supprimer la publication"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>

            {/* Card Content */}
            <div className="teaser-card-body">
              <h3 className="teaser-post-title">{post.title}</h3>
              <p className="teaser-post-text">{post.content}</p>
            </div>

            {/* Optional Image */}
            {post.imageUrl && (
              <div className="teaser-image-wrapper">
                <img src={post.imageUrl} alt={post.title} loading="lazy" />
              </div>
            )}

            {/* Reactions Bar */}
            <div className="teaser-card-reactions">
              <span className="text-xs font-semibold text-slate-400 mr-1">Réactions :</span>
              <button 
                className="reaction-btn" 
                onClick={() => handleReaction(post.id, 'fire')}
                title="Trop chaud !"
              >
                <span>🔥</span>
                <span className="count">{post.likes?.fire || 0}</span>
              </button>

              <button 
                className="reaction-btn" 
                onClick={() => handleReaction(post.id, 'snow')}
                title="Poudreuse pure"
              >
                <span>❄️</span>
                <span className="count">{post.likes?.snow || 0}</span>
              </button>

              <button 
                className="reaction-btn" 
                onClick={() => handleReaction(post.id, 'ski')}
                title="Hâte de skier !"
              >
                <span>🎿</span>
                <span className="count">{post.likes?.ski || 0}</span>
              </button>

              <button 
                className="reaction-btn" 
                onClick={() => handleReaction(post.id, 'heart')}
                title="J'adore"
              >
                <span>❤️</span>
                <span className="count">{post.likes?.heart || 0}</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Teaser Modal */}
      {showAddModal && (
        <div className="modal-overlay" onClick={() => setShowAddModal(false)}>
          <div className="modal-box glass-card" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-700">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Flame size={20} className="text-amber-400" />
                <span>Nouveau teaser pour la gang</span>
              </h3>
              <button className="btn-action-icon" onClick={() => setShowAddModal(false)}>
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleCreatePost} className="space-y-4">
              <div className="form-grid grid grid-cols-2 gap-3">
                <div className="form-group">
                  <label>Qui publie ? *</label>
                  <select value={author} onChange={(e) => setAuthor(e.target.value)}>
                    <option value="Félix">Félix</option>
                    <option value="Sylvie">Sylvie</option>
                    <option value="Claude">Claude</option>
                    <option value="Papa">Papa</option>
                    <option value="La Famille">La Famille</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Type de publication</label>
                  <select value={category} onChange={(e) => setCategory(e.target.value)}>
                    <option value="Poudreuse fraîche ❄️">Poudreuse fraîche ❄️</option>
                    <option value="Aventure Ski 🎿">Aventure Ski 🎿</option>
                    <option value="Détente & Chalet 🍻">Détente &amp; Chalet 🍻</option>
                    <option value="Annonce Importante 📢">Annonce Importante 📢</option>
                    <option value="Météo / Webcam ☀️">Météo / Webcam ☀️</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>Titre accrocheur *</label>
                <input 
                  type="text" 
                  required
                  placeholder="Ex: Alerte tempête au sommet ! / Neige folle aujourd'hui !"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Message / Détails *</label>
                <textarea 
                  rows="4"
                  required
                  placeholder="Écrivez ce qui se passe ou décrivez la photo..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
              </div>

              {/* Photo Upload or URL */}
              <div className="form-group">
                <label>Ajouter une photo (depuis votre appareil) :</label>
                <input 
                  type="file" 
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="file-upload-input"
                />
              </div>

              <div className="form-group">
                <label>Ou par lien web d'image (optionnel) :</label>
                <input 
                  type="url" 
                  placeholder="https://..."
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                />
              </div>

              {imageFilePreview && (
                <div className="image-preview-box">
                  <img src={imageFilePreview} alt="Aperçu" className="w-full h-40 object-cover rounded-xl" />
                </div>
              )}

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-700">
                <button type="button" className="btn-secondary" onClick={() => setShowAddModal(false)}>
                  Annuler
                </button>
                <button type="submit" className="btn-primary">
                  <Send size={15} />
                  <span>Publier sur le fil</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
