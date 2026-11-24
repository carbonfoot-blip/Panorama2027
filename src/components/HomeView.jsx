import React, { useState, useEffect } from 'react';
import { 
  Calendar, MapPin, Snowflake, Waves, Compass, 
  ExternalLink, ChevronRight, Gift, LayoutDashboard, 
  Scale, Camera, Wind, Sparkles
} from 'lucide-react';
import { TRIP_METADATA } from '../data/tripData';

export default function HomeView({ setActiveTab }) {
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const target = new Date(TRIP_METADATA.startDate).getTime();
      const now = new Date().getTime();
      const diff = target - now;

      if (diff > 0) {
        setCountdown({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((diff % (1000 * 60)) / 1000)
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="home-view">
      {/* Hero Banner Section */}
      <section className="hero-section glass-card">
        <div className="hero-image-overlay"></div>
        <img 
          src="https://www.panoramaresort.com/assets/Uploads/Home-Taynton-2.jpg" 
          alt="Panorama Mountain Resort - Taynton Bowl" 
          className="hero-bg-img"
        />

        <div className="hero-content">
          <div className="hero-badge">
            <Snowflake size={16} />
            <span>Colombie-Britannique • Purcell Mountains</span>
          </div>

          <h1 className="hero-title">
            PANORAMA 2027
          </h1>

          <p className="hero-dates">
            <Calendar size={20} className="text-sky-400" />
            <span>2 mars au 9 mars 2027 • 7 nuits en condo au pied des pistes</span>
          </p>

          <p className="hero-description">
            Le voyage de ski ultime réunissant les <strong>Legaults</strong> et les <strong>Synettes</strong> ! 
            1 300 mètres de dénivelé vertical, de la vraie neige sèche des Rocheuses, le légendaire 
            Taynton Bowl et les piscines thermales extérieures pour relaxer après les pistes.
          </p>

          {/* Live Countdown Box */}
          <div className="countdown-container">
            <div className="countdown-title">
              <Sparkles size={16} className="text-amber-400" />
              <span>COMPTE À REBOURS AVANT LE DÉCOLLAGE</span>
            </div>
            <div className="countdown-grid">
              <div className="countdown-unit">
                <span className="unit-number">{countdown.days}</span>
                <span className="unit-label">Jours</span>
              </div>
              <div className="countdown-sep">:</div>
              <div className="countdown-unit">
                <span className="unit-number">{String(countdown.hours).padStart(2, '0')}</span>
                <span className="unit-label">Heures</span>
              </div>
              <div className="countdown-sep">:</div>
              <div className="countdown-unit">
                <span className="unit-number">{String(countdown.minutes).padStart(2, '0')}</span>
                <span className="unit-label">Minutes</span>
              </div>
              <div className="countdown-sep">:</div>
              <div className="countdown-unit">
                <span className="unit-number">{String(countdown.seconds).padStart(2, '0')}</span>
                <span className="unit-label">Secondes</span>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="hero-actions">
            <button className="btn-primary" onClick={() => setActiveTab('budget')}>
              <LayoutDashboard size={18} />
              <span>Voir le Sommaire & Réservations</span>
              <ChevronRight size={16} />
            </button>

            <button className="btn-surprise" onClick={() => setActiveTab('surprise')}>
              <Gift size={18} />
              <span>🎁 Découvrir la Surprise Noël</span>
            </button>
          </div>
        </div>
      </section>

      {/* Mountain Highlights Grid */}
      <section className="mountain-stats-section">
        <div className="stats-header">
          <div className="section-badge">
            <Compass size={14} />
            <span>La Montagne en Chiffres</span>
          </div>
          <h2 className="section-title">Pourquoi Panorama Mountain Resort ?</h2>
        </div>

        <div className="stats-grid">
          <div className="glass-card stat-card">
            <div className="stat-icon-wrapper sky">
              <Wind size={26} />
            </div>
            <div className="stat-value">1 300 m</div>
            <div className="stat-title">Dénivelé Vertical Continu</div>
            <p className="stat-detail">
              4 265 pieds de dénivelé ! L'un des plus grands et vertigineux d'Amérique du Nord, pour des descentes interminables sans arrêt.
            </p>
          </div>

          <div className="glass-card stat-card">
            <div className="stat-icon-wrapper emerald">
              <Snowflake size={26} />
            </div>
            <div className="stat-value">2 975 Acres</div>
            <div className="stat-title">135+ Pistes & Bowls</div>
            <p className="stat-detail">
              Des boulevards damés impeccables jusqu'aux immenses bols de poudreuse sauvage du célèbre Taynton Bowl.
            </p>
          </div>

          <div className="glass-card stat-card">
            <div className="stat-icon-wrapper amber">
              <MapPin size={26} />
            </div>
            <div className="stat-value">Condo 130</div>
            <div className="stat-title">Aisling Baile (Ski-in / Ski-out)</div>
            <p className="stat-detail">
              2035 Panorama Drive. Chaussez vos skis directement à la sortie de la porte, village piétonnier et accès immédiat aux télésièges.
            </p>
          </div>

          <div className="glass-card stat-card">
            <div className="stat-icon-wrapper rose">
              <Waves size={26} />
            </div>
            <div className="stat-value">Eaux Chaudes</div>
            <div className="stat-title">Panorama Springs Pools</div>
            <p className="stat-detail">
              Accès inclus aux immenses piscines et jacuzzis extérieurs d'eau chaude au pied de la montagne, parfait pour l'après-ski.
            </p>
          </div>
        </div>
      </section>

      {/* Quick Navigation Cards */}
      <section className="portal-links-section">
        <div className="section-header">
          <div className="section-badge">
            <Compass size={14} />
            <span>Navigation Rapide</span>
          </div>
          <h2 className="section-title">Tout votre voyage en un coup d'œil</h2>
          <p className="section-desc">
            Accédez facilement aux outils de planification, aux réservations et à l'espace cadeau.
          </p>
        </div>

        <div className="portal-grid">
          <div className="glass-card portal-card" onClick={() => setActiveTab('budget')}>
            <div className="portal-card-top">
              <div className="portal-icon blue">
                <LayoutDashboard size={24} />
              </div>
              <ChevronRight size={20} className="portal-arrow" />
            </div>
            <h3 className="portal-card-title">Sommaire & Réservations</h3>
            <p className="portal-card-desc">
              Tous les chiffres de votre tableau Excel : vols, hébergement, billets de ski 5 jours et locations de voitures Hertz.
            </p>
            <div className="portal-card-meta">
              <span>8 items enregistrés</span>
              <span className="dot">•</span>
              <span className="text-emerald-400 font-semibold">Total : 8 561,45 $</span>
            </div>
          </div>

          <div className="glass-card portal-card surprise-accent" onClick={() => setActiveTab('surprise')}>
            <div className="portal-card-top">
              <div className="portal-icon red">
                <Gift size={24} />
              </div>
              <ChevronRight size={20} className="portal-arrow" />
            </div>
            <h3 className="portal-card-title">Cadeau Surprise Noël 🎄</h3>
            <p className="portal-card-desc">
              Le montage interactif secret pour dévoiler le voyage aux garçons le matin de Noël avec billet VIP et vidéo teaser !
            </p>
            <div className="portal-card-meta">
              <span className="text-rose-400 font-semibold">✨ Prêt pour le sapin</span>
            </div>
          </div>

          <div className="glass-card portal-card" onClick={() => setActiveTab('expenses')}>
            <div className="portal-card-top">
              <div className="portal-icon green">
                <Scale size={24} />
              </div>
              <ChevronRight size={20} className="portal-arrow" />
            </div>
            <h3 className="portal-card-title">Suivi des Dépenses (Splitwise)</h3>
            <p className="portal-card-desc">
              Entrez vos factures durant le voyage (épiceries, restos, essence). Calcul automatique en temps réel de qui doit à qui !
            </p>
            <div className="portal-card-meta">
              <span>Legaults vs Synettes</span>
              <span className="dot">•</span>
              <span className="text-sky-400 font-semibold">Partage 50/50</span>
            </div>
          </div>

          <div className="glass-card portal-card" onClick={() => setActiveTab('photos')}>
            <div className="portal-card-top">
              <div className="portal-icon purple">
                <Camera size={24} />
              </div>
              <ChevronRight size={20} className="portal-arrow" />
            </div>
            <h3 className="portal-card-title">Photos, Vidéos & Montage</h3>
            <p className="portal-card-desc">
              Galerie partagée pour téléverser vos clichés du voyage et préparer le montage photo/vidéo souvenir de l'aventure.
            </p>
            <div className="portal-card-meta">
              <span>Téléversement direct</span>
              <span className="dot">•</span>
              <span className="text-purple-400 font-semibold">Studio Souvenirs</span>
            </div>
          </div>
        </div>
      </section>

      {/* External Resources Bar */}
      <section className="resort-links-section glass-card">
        <div className="resort-links-content">
          <div>
            <h3 className="resort-links-title">Liens Officiels & Outils en Direct</h3>
            <p className="resort-links-sub">Consultez les webcams, la météo et le plan des pistes de Panorama</p>
          </div>
          <div className="resort-links-buttons">
            <a 
              href={TRIP_METADATA.googlePhotosAlbumUrl}
              target="_blank" 
              rel="noreferrer"
              className="btn-google-photos-sm"
              title="Ouvrir l'album familial partagé"
            >
              <span>📸 Album Partagé Google Photos</span>
              <ExternalLink size={14} />
            </a>
            <a 
              href="https://www.panoramaresort.com/mountain-conditions/webcams/" 
              target="_blank" 
              rel="noreferrer"
              className="btn-secondary"
            >
              <span>Webcams en direct</span>
              <ExternalLink size={15} />
            </a>
            <a 
              href="https://www.panoramaresort.com/trail-map/" 
              target="_blank" 
              rel="noreferrer"
              className="btn-secondary"
            >
              <span>Plan des pistes HD</span>
              <ExternalLink size={15} />
            </a>
            <a 
              href={TRIP_METADATA.lodging.hostawayPortal} 
              target="_blank" 
              rel="noreferrer"
              className="btn-secondary"
            >
              <span>Portail Hébergement Aisling Baile</span>
              <ExternalLink size={15} />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
