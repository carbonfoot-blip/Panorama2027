import React, { useState } from 'react';
import { 
  Gift, Sparkles, Plane, Mountain, Snowflake, 
  Calendar, CheckCircle2, RotateCcw, Edit3, Save, Flame, Play
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { CHRISTMAS_SURPRISE_DATA } from '../data/tripData';
import { useSyncedData } from '../services/db';

export default function SurpriseView() {
  const [isRevealed, setIsRevealed] = useState(false);
  const [isEditingMessage, setIsEditingMessage] = useState(false);
  const [surpriseData, setSurpriseData] = useSyncedData('surprise', { 
    letter: CHRISTMAS_SURPRISE_DATA.defaultLetter 
  });
  const [localLetter, setLocalLetter] = useState(surpriseData?.letter || CHRISTMAS_SURPRISE_DATA.defaultLetter);

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
    setSurpriseData({ ...surpriseData, letter: localLetter });
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
              </div>
            </div>

            <div>
              <button className="btn-unveil-gift" onClick={triggerReveal}>
                <Sparkles size={20} />
                <span>Ouvrir la surprise de Noël !</span>
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* Revealed: The Big Experience Montage & VIP Golden Ticket */
        <div className="surprise-revealed-container animate-fade-in">
          {/* Header Celebration */}
          <div className="celebration-header text-center mb-8">
            <div className="holiday-badge mb-2">
              <Sparkles size={16} className="text-amber-400" />
              <span>DESTINATION DÉVOILÉE</span>
            </div>
            <h1 className="celebration-title">
              {CHRISTMAS_SURPRISE_DATA.revealTitle}
            </h1>
            <p className="celebration-subtitle">
              Cet hiver, on part tous ensemble skier au <strong>{CHRISTMAS_SURPRISE_DATA.secretDestination}</strong> !
            </p>
          </div>

          {/* VIP Golden Boarding Pass */}
          <div className="vip-boarding-pass mb-8">
            <div className="pass-left-main">
              <div className="pass-header">
                <div className="pass-brand">
                  <Mountain size={28} className="text-amber-400" />
                  <div>
                    <span className="pass-brand-name">PANORAMA MOUNTAIN AIRWAYS</span>
                    <span className="pass-brand-sub">BILLET VIP ÉDITION NOËL</span>
                  </div>
                </div>
                <div className="pass-badge">CLASSE EXPÉDITION ROCHEUSES</div>
              </div>

              <div className="pass-flight-row">
                <div className="flight-col">
                  <span className="airport-code">YUL</span>
                  <span className="airport-city">Montréal, QC</span>
                </div>

                <div className="flight-path">
                  <div className="flight-line"></div>
                  <Plane size={24} className="text-amber-400 my-1 transform rotate-90" />
                  <span className="flight-duration">~4h30 de vol</span>
                </div>

                <div className="flight-col">
                  <span className="airport-code">YYC</span>
                  <span className="airport-city">Calgary, AB</span>
                </div>
              </div>

              <div className="pass-meta-grid">
                <div>
                  <span className="meta-lbl">PASSAGERS</span>
                  <span className="meta-val">{CHRISTMAS_SURPRISE_DATA.passengers}</span>
                </div>
                <div>
                  <span className="meta-lbl">DATES DU VOYAGE</span>
                  <span className="meta-val text-amber-300 font-bold">{CHRISTMAS_SURPRISE_DATA.datesText}</span>
                </div>
                <div>
                  <span className="meta-lbl">HÉBERGEMENT</span>
                  <span className="meta-val">Aisling Baile • Ski-in / Ski-out</span>
                </div>
                <div>
                  <span className="meta-lbl">TRANSPORT SUR PLACE</span>
                  <span className="meta-val">2x VUS Rav4 4x4 Hertz</span>
                </div>
              </div>

              <div className="pass-features-list">
                <div className="pass-feature-pill">
                  <CheckCircle2 size={14} className="text-emerald-400" />
                  <span>5 Jours de ski de calibre mondial</span>
                </div>
                <div className="pass-feature-pill">
                  <CheckCircle2 size={14} className="text-emerald-400" />
                  <span>1,300 mètres de dénivelé vertical</span>
                </div>
                <div className="pass-feature-pill">
                  <CheckCircle2 size={14} className="text-emerald-400" />
                  <span>Piscines thermales chaudes extérieures</span>
                </div>
              </div>
            </div>

            <div className="pass-right-stub">
              <div className="stub-notch top"></div>
              <div className="stub-notch bottom"></div>
              <div className="stub-content">
                <div className="text-xs uppercase tracking-widest text-slate-400 font-bold mb-2">SIÈGE</div>
                <div className="text-3xl font-black text-amber-400 font-display">01A</div>
                <div className="text-xs text-slate-400 mt-2 font-mono">PAN-2027-NOEL</div>
                <div className="mt-4 text-center">
                  <span className="inline-block px-3 py-1 bg-amber-500/20 text-amber-300 rounded-full text-xs font-bold border border-amber-500/40">
                    CONFIRMÉ
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* YouTube Video Teaser / Atmosphere */}
          <div className="glass-card video-teaser-card mb-8">
            <div className="video-card-header">
              <div className="flex items-center gap-2">
                <Play size={20} className="text-rose-500 fill-rose-500" />
                <h3 className="text-xl font-bold text-white">Aperçu vidéo officiel de la montagne</h3>
              </div>
              <span className="text-xs text-slate-400">Pour donner le goût à toute la famille</span>
            </div>

            <div className="video-container-wrapper">
              <iframe
                className="teaser-iframe"
                src="https://www.youtube-nocookie.com/embed/bX_jQ423d6g?autoplay=0&rel=0"
                title="Panorama Mountain Resort Official"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>

          {/* Secret Christmas Message / Letter from Parents */}
          <div className="glass-card secret-letter-card mb-8">
            <div className="letter-header">
              <div className="flex items-center gap-2">
                <Sparkles size={18} className="text-amber-400" />
                <h3 className="text-lg font-bold text-white">Le Message du Père Noël aux Garçons</h3>
              </div>
              <button 
                className="btn-secondary btn-sm"
                onClick={() => {
                  if (isEditingMessage) {
                    handleSaveMessage();
                  } else {
                    setLocalLetter(surpriseData?.letter || CHRISTMAS_SURPRISE_DATA.defaultLetter);
                    setIsEditingMessage(true);
                  }
                }}
              >
                {isEditingMessage ? (
                  <>
                    <Save size={14} className="text-emerald-400" />
                    <span>Sauvegarder</span>
                  </>
                ) : (
                  <>
                    <Edit3 size={14} />
                    <span>Modifier le message</span>
                  </>
                )}
              </button>
            </div>

            <div className="letter-body">
              {isEditingMessage ? (
                <div className="letter-edit-box">
                  <textarea 
                    rows={8}
                    className="w-full bg-slate-900/80 border border-slate-700 rounded-xl p-4 text-white text-sm font-sans leading-relaxed focus:outline-none focus:border-amber-400"
                    value={localLetter}
                    onChange={(e) => setLocalLetter(e.target.value)}
                  />
                  <div className="flex justify-end gap-2 mt-2">
                    <button 
                      className="btn-secondary btn-sm" 
                      onClick={() => setIsEditingMessage(false)}
                    >
                      Annuler
                    </button>
                    <button 
                      className="btn-primary btn-sm" 
                      onClick={handleSaveMessage}
                    >
                      Sauvegarder
                    </button>
                  </div>
                </div>
              ) : (
                <div className="letter-display-box">
                  {(surpriseData?.letter || CHRISTMAS_SURPRISE_DATA.defaultLetter)
                    .split('\n\n')
                    .map((paragraph, idx) => (
                      <p key={idx} className="text-slate-200 leading-relaxed text-base mb-3">
                        {paragraph}
                      </p>
                    ))}
                </div>
              )}
            </div>
          </div>

          {/* Action to re-wrap */}
          <div className="text-center pt-4">
            <button 
              className="btn-secondary btn-sm inline-flex items-center gap-1.5 opacity-60 hover:opacity-100"
              onClick={() => setIsRevealed(false)}
            >
              <RotateCcw size={14} />
              <span>Ré-emballer le cadeau (pour le re-montrer le matin de Noël !)</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
