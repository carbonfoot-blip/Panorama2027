import React, { useState } from 'react';
import { 
  Gift, Sparkles, Plane, Mountain, Snowflake, 
  Calendar, CheckCircle2, RotateCcw, Edit3, Save, Flame, Play
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { CHRISTMAS_SURPRISE_DATA } from '../data/tripData';

const LOCAL_STORAGE_KEY_SURPRISE_MSG = 'panorama2027_surprise_letter';

export default function SurpriseView() {
  const [isRevealed, setIsRevealed] = useState(false);
  const [isEditingMessage, setIsEditingMessage] = useState(false);
  const [letterText, setLetterText] = useState(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY_SURPRISE_MSG);
      if (saved) return saved;
    } catch (_e) {}
    return CHRISTMAS_SURPRISE_DATA.defaultLetter;
  });

  const triggerReveal = () => {
    setIsRevealed(true);

    // Launch celebratory confetti burst
    const count = 250;
    const defaults = {
      origin: { y: 0.7 }
    };

    function fire(particleRatio, opts) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio)
      });
    }

    fire(0.25, {
      spread: 26,
      startVelocity: 55,
      colors: ['#38bdf8', '#f59e0b', '#10b981', '#f43f5e']
    });
    fire(0.2, {
      spread: 60,
      colors: ['#ffffff', '#fbbf24', '#0284c7']
    });
    fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 45
    });
  };

  const handleSaveMessage = () => {
    setIsEditingMessage(false);
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY_SURPRISE_MSG, letterText);
    } catch (_e) {}
  };

  return (
    <div className="surprise-view">
      {/* If Not Revealed: The Mysterious Christmas Gift Box */}
      {!isRevealed ? (
        <div className="mystery-gift-wrapper glass-card">
          <div className="christmas-snow-bg">
            <span className="floating-snowflake s1">❄️</span>
            <span className="floating-snowflake s2">✨</span>
            <span className="floating-snowflake s3">❄️</span>
            <span className="floating-snowflake s4">⭐</span>
          </div>

          <div className="mystery-content">
            <div className="holiday-badge">
              <Sparkles size={16} className="text-amber-400" />
              <span>SPÉCIAL NOËL • CADEAU SECRET</span>
            </div>

            <h1 className="mystery-title">
              Un Cadeau Très Spécial Vous Attend...
            </h1>
            <p className="mystery-subtitle">
              Réservé aux garçons de la famille ! Êtes-vous prêts à découvrir ce que le père Noël vous réserve cette année ?
            </p>

            {/* Interactive Shaking Gift Box */}
            <div className="gift-box-interactive" onClick={triggerReveal} title="Cliquez pour déballer !">
              <div className="gift-icon-container">
                <Gift size={96} className="gift-icon-svg" />
                <div className="gift-ribbon-shine"></div>
              </div>
              <div className="gift-tag-label">
                <span>À : Les Garçons ⛷️</span>
              </div>
            </div>

            <button className="btn-unveil-gift" onClick={triggerReveal}>
              <Sparkles size={20} />
              <span>OUVRIR LE CADEAU DE NOËL !</span>
            </button>
            <p className="text-xs text-slate-400 mt-3">
              Astuce : Cliquez sur le bouton ou sur la boîte pour lancer les confettis et dévoiler la surprise !
            </p>
          </div>
        </div>
      ) : (
        /* Revealed Stage: The Epic VIP Golden Ski Boarding Pass & Video Teaser */
        <div className="revealed-container">
          <div className="reveal-top-bar">
            <div className="reveal-tag">
              <Sparkles size={16} className="text-amber-400" />
              <span>CADEAU OFFICIEL NOËL 2026</span>
            </div>

            <button 
              className="btn-secondary btn-sm"
              onClick={() => setIsRevealed(false)}
              title="Re-fermer la boîte pour répéter la surprise plus tard"
            >
              <RotateCcw size={15} />
              <span>Re-fermer le cadeau</span>
            </button>
          </div>

          <h1 className="celebration-title">
            {CHRISTMAS_SURPRISE_DATA.revealTitle}
          </h1>

          {/* Golden VIP Boarding Pass Card */}
          <div className="vip-boarding-pass">
            <div className="pass-left-main">
              <div className="pass-header">
                <div className="pass-brand">
                  <Mountain size={28} className="text-amber-400" />
                  <div>
                    <span className="pass-brand-name">PANORAMA SKI EXPEDITION</span>
                    <span className="pass-brand-sub">BILLET VIP OR • ROCHEUSES CANADIENNES</span>
                  </div>
                </div>
                <div className="pass-category-chip">ALL-INCLUSIVE</div>
              </div>

              <div className="pass-flight-row">
                <div className="flight-endpoint">
                  <span className="airport-code">YUL</span>
                  <span className="airport-city">Montréal</span>
                </div>

                <div className="flight-path">
                  <Plane size={24} className="flight-plane-icon" />
                  <div className="flight-line"></div>
                  <span className="flight-duration">Mars 2027</span>
                </div>

                <div className="flight-endpoint">
                  <span className="airport-code text-amber-400">PANORAMA</span>
                  <span className="airport-city">Colombie-Britannique</span>
                </div>
              </div>

              <div className="pass-meta-grid">
                <div className="pass-meta-item">
                  <span className="meta-lbl">PASSAGERS</span>
                  <span className="meta-val">{CHRISTMAS_SURPRISE_DATA.passengers}</span>
                </div>

                <div className="pass-meta-item">
                  <span className="meta-lbl">DATES DU SÉJOUR</span>
                  <span className="meta-val">2 au 9 Mars 2027 (7 nuits)</span>
                </div>

                <div className="pass-meta-item">
                  <span className="meta-lbl">HÉBERGEMENT</span>
                  <span className="meta-val">Condo Aisling Baile #130 (Ski-in / Ski-out)</span>
                </div>

                <div className="pass-meta-item">
                  <span className="meta-lbl">FORFAIT SKI</span>
                  <span className="meta-val text-amber-400">5 Jours de Ski Illimité</span>
                </div>
              </div>

              {/* Highlights Chips */}
              <div className="pass-features-list">
                {CHRISTMAS_SURPRISE_DATA.highlights.map((h, i) => (
                  <div key={i} className="pass-feature-pill">
                    <CheckCircle2 size={14} className="text-emerald-400" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Stub on Right */}
            <div className="pass-right-stub">
              <div className="stub-notch top"></div>
              <div className="stub-notch bottom"></div>
              <div className="stub-content">
                <span className="stub-rotated-text">BOARDING PASS • SKI 2027</span>
                <div className="stub-barcode">
                  <div className="barcode-lines"></div>
                  <span className="barcode-number"># PANO-2027-BOYS</span>
                </div>
                <div className="stub-seal">
                  <Snowflake size={32} className="text-amber-400" />
                </div>
              </div>
            </div>
          </div>

          {/* Video / Visual Teaser Showcase */}
          <div className="glass-card video-teaser-card mt-6">
            <div className="video-card-header">
              <div>
                <div className="section-badge">
                  <Play size={13} />
                  <span>Teaser de la Montagne</span>
                </div>
                <h3 className="text-2xl font-bold text-white">Ce qui vous attend à Panorama BC</h3>
              </div>
              <a 
                href="https://www.youtube.com/results?search_query=panorama+mountain+resort+skiing" 
                target="_blank" 
                rel="noreferrer"
                className="btn-secondary btn-sm"
              >
                Voir plus de vidéos
              </a>
            </div>

            <div className="video-container-wrapper">
              <iframe
                title="Panorama Mountain Resort Skiing Teaser"
                src="https://www.youtube-nocookie.com/embed/fD307j55ZkQ?autoplay=0&controls=1&rel=0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="teaser-iframe"
              ></iframe>
            </div>
          </div>

          {/* Letter / Personal Parent Message */}
          <div className="glass-card secret-letter-card mt-6">
            <div className="letter-header">
              <div className="flex items-center gap-2">
                <Flame size={20} className="text-amber-400" />
                <h3 className="text-xl font-bold text-white">Le mot des parents sous le sapin</h3>
              </div>

              {!isEditingMessage ? (
                <button className="btn-secondary btn-sm" onClick={() => setIsEditingMessage(true)}>
                  <Edit3 size={15} />
                  <span>Personnaliser le texte</span>
                </button>
              ) : (
                <button className="btn-primary btn-sm" onClick={handleSaveMessage}>
                  <Save size={15} />
                  <span>Sauvegarder</span>
                </button>
              )}
            </div>

            {!isEditingMessage ? (
              <div className="letter-body">
                {letterText.split('\n\n').map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            ) : (
              <div className="letter-edit-box">
                <textarea
                  rows="6"
                  className="letter-textarea"
                  value={letterText}
                  onChange={(e) => setLetterText(e.target.value)}
                  placeholder="Écrivez votre message personnalisé pour les garçons..."
                />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
