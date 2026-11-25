import React, { useState, useEffect } from 'react';
import { 
  Calendar, MapPin, Snowflake, Compass, 
  ExternalLink, ChevronRight, Gift, LayoutDashboard, 
  Scale, Camera, Sparkles, Map, Flame, UtensilsCrossed, ShoppingBag
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
      {/* Centered Hero Banner Section */}
      <section className="hero-section glass-card hero-centered-banner">
        <div className="hero-image-overlay"></div>
        <img 
          src="https://www.panoramaresort.com/assets/Uploads/Home-Taynton-2.jpg" 
          alt="Panorama Mountain Resort - Taynton Bowl" 
          className="hero-bg-img"
        />

        <div className="hero-content hero-content-centered">
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

          <p className="hero-description hero-desc-centered">
            Le voyage de ski ultime réunissant les <strong>Legaults</strong> et les <strong>Synettes</strong> ! 
            1 300 mètres de dénivelé vertical, de la vraie neige sèche des Rocheuses, le légendaire 
            Taynton Bowl et les piscines thermales extérieures pour relaxer après les pistes.
          </p>

          {/* Centered Live Countdown Box */}
          <div className="countdown-container countdown-centered-box">
            <div className="countdown-title justify-center">
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
        </div>
      </section>

      {/* ======================================================================= */}
      {/* LES 8 GRANDES TUILES PRINCIPALES                                        */}
      {/* ======================================================================= */}
      <section className="grand-tiles-section mb-12">
        <div className="text-center mb-8">
          <div className="section-badge inline-flex items-center gap-1.5 mb-2">
            <Compass size={14} className="text-sky-400" />
            <span>Portail du Voyage</span>
          </div>
          <h2 className="section-title">Espaces &amp; Outils Principaux</h2>
          <p className="section-desc max-w-xl mx-auto">
            Accédez rapidement à tous les détails du séjour, aux cartes officielles, au fil de nouvelles et à l'épicerie.
          </p>
        </div>

        <div className="grand-tiles-grid">
          {/* Tuile 1 : Sommaire */}
          <div 
            className="grand-tile-card glass-card tile-blue" 
            onClick={() => setActiveTab('budget')}
          >
            <div className="tile-glow-orb blue"></div>
            <div className="tile-top-row">
              <div className="tile-icon-box blue">
                <LayoutDashboard size={28} />
              </div>
              <span className="tile-pill-tag">Classeur Officiel</span>
            </div>
            <h3 className="tile-title">1. Sommaire &amp; Réservations</h3>
            <p className="tile-desc">
              Tous les chiffres officiels : vols Air Canada, condo Aisling Baile, ski 5 jours et locations de voitures Hertz.
            </p>
            <div className="tile-footer">
              <span className="text-sky-300 font-bold text-sm">Voir le classeur complet</span>
              <ChevronRight size={18} className="tile-arrow" />
            </div>
          </div>

          {/* Tuile 2 : Carte des pistes */}
          <a 
            href={TRIP_METADATA.trailMapUrl} 
            target="_blank" 
            rel="noreferrer" 
            className="grand-tile-card glass-card tile-cyan"
          >
            <div className="tile-glow-orb cyan"></div>
            <div className="tile-top-row">
              <div className="tile-icon-box cyan">
                <Map size={28} />
              </div>
              <span className="tile-pill-tag">Lien Interactif HD</span>
            </div>
            <h3 className="tile-title">2. Carte des Pistes (26/27)</h3>
            <p className="tile-desc">
              Explorez les 135+ pistes, le dénivelé vertical de 1 300 m, les sous-bois et le vaste Taynton Bowl sur le plan officiel.
            </p>
            <div className="tile-footer">
              <span className="text-cyan-300 font-bold text-sm">Ouvrir la carte des pistes</span>
              <ExternalLink size={16} className="tile-arrow" />
            </div>
          </a>

          {/* Tuile 3 : Carte du village */}
          <a 
            href={TRIP_METADATA.villageMapUrl} 
            target="_blank" 
            rel="noreferrer" 
            className="grand-tile-card glass-card tile-amber"
          >
            <div className="tile-glow-orb amber"></div>
            <div className="tile-top-row">
              <div className="tile-icon-box amber">
                <MapPin size={28} />
              </div>
              <span className="tile-pill-tag">Station &amp; Chalets</span>
            </div>
            <h3 className="tile-title">3. Carte du Village</h3>
            <p className="tile-desc">
              Repérez l'emplacement du condo Aisling Baile, les piscines Panorama Springs, les télésièges et les restaurants.
            </p>
            <div className="tile-footer">
              <span className="text-amber-300 font-bold text-sm">Voir le plan du village</span>
              <ExternalLink size={16} className="tile-arrow" />
            </div>
          </a>

          {/* Tuile 4 : Teasers */}
          <div 
            className="grand-tile-card glass-card tile-orange" 
            onClick={() => setActiveTab('teasers')}
          >
            <div className="tile-glow-orb orange"></div>
            <div className="tile-top-row">
              <div className="tile-icon-box orange">
                <Flame size={28} />
              </div>
              <span className="tile-pill-tag">Fil d'Ambiance 🔥</span>
            </div>
            <h3 className="tile-title">4. Teasers de la Montagne</h3>
            <p className="tile-desc">
              Publications, alertes tempête, photos de neige fraîche et annonces pour faire saliver toute la gang avant le départ !
            </p>
            <div className="tile-footer">
              <span className="text-orange-300 font-bold text-sm">Découvrir les teasers</span>
              <ChevronRight size={18} className="tile-arrow" />
            </div>
          </div>

          {/* Tuile 5 : Photos */}
          <div 
            className="grand-tile-card glass-card tile-purple" 
            onClick={() => setActiveTab('photos')}
          >
            <div className="tile-glow-orb purple"></div>
            <div className="tile-top-row">
              <div className="tile-icon-box purple">
                <Camera size={28} />
              </div>
              <span className="tile-pill-tag">Google Photos 4K</span>
            </div>
            <h3 className="tile-title">5. Photos &amp; Vidéos</h3>
            <p className="tile-desc">
              Accès direct à l'album Google Photos partagé pour vos vidéos 4K illimitées et galerie des meilleurs clichés de famille.
            </p>
            <div className="tile-footer">
              <span className="text-purple-300 font-bold text-sm">Voir l'album partagé</span>
              <ChevronRight size={18} className="tile-arrow" />
            </div>
          </div>

          {/* Tuile 6 : Épicerie */}
          <div 
            className="grand-tile-card glass-card tile-emerald" 
            onClick={() => setActiveTab('grocery')}
          >
            <div className="tile-glow-orb emerald"></div>
            <div className="tile-top-row">
              <div className="tile-icon-box emerald">
                <UtensilsCrossed size={28} />
              </div>
              <span className="tile-pill-tag">Menu &amp; Épicerie</span>
            </div>
            <h3 className="tile-title">6. Épicerie &amp; Repas</h3>
            <p className="tile-desc">
              Idées de déjeuners, dîners et soupers au condo + liste d'épicerie collaborative pré-voyage à bâtir ensemble.
            </p>
            <div className="tile-footer">
              <span className="text-emerald-300 font-bold text-sm">Planifier les repas</span>
              <ChevronRight size={18} className="tile-arrow" />
            </div>
          </div>

          {/* Tuile 7 : Splitwise */}
          <div 
            className="grand-tile-card glass-card tile-green" 
            onClick={() => setActiveTab('expenses')}
          >
            <div className="tile-glow-orb green"></div>
            <div className="tile-top-row">
              <div className="tile-icon-box green">
                <Scale size={28} />
              </div>
              <span className="tile-pill-tag">Dépenses Sur Place</span>
            </div>
            <h3 className="tile-title">7. Suivi Splitwise</h3>
            <p className="tile-desc">
              Inscrivez les factures payées sur place durant le voyage. Calcul automatique en direct de la balance entre les deux familles.
            </p>
            <div className="tile-footer">
              <span className="text-emerald-300 font-bold text-sm">Gérer les dépenses</span>
              <ChevronRight size={18} className="tile-arrow" />
            </div>
          </div>

          {/* Tuile 8 : Surprise de Noël */}
          <div 
            className="grand-tile-card glass-card tile-rose" 
            onClick={() => setActiveTab('surprise')}
          >
            <div className="tile-glow-orb rose"></div>
            <div className="tile-top-row">
              <div className="tile-icon-box rose">
                <Gift size={28} />
              </div>
              <span className="tile-pill-tag">Cadeau Secret 🎁</span>
            </div>
            <h3 className="tile-title">8. Surprise de Noël</h3>
            <p className="tile-desc">
              Le montage interactif secret pour dévoiler le voyage aux garçons le matin de Noël avec billet VIP et vidéo teaser !
            </p>
            <div className="tile-footer">
              <span className="text-rose-300 font-bold text-sm">Dévoiler la surprise</span>
              <ChevronRight size={18} className="tile-arrow" />
            </div>
          </div>
        </div>
      </section>

      {/* External Resources Bar */}
      <section className="resort-links-section glass-card">
        <div className="resort-links-content">
          <div>
            <h3 className="resort-links-title">Outils &amp; Liens Rapides en Direct</h3>
            <p className="resort-links-sub">Webcams de la montagne, météo en direct et itinéraire</p>
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
              href="https://www.google.com/maps/search/?api=1&query=2035+Panorama+Drive+Panorama+BC+Canada" 
              target="_blank" 
              rel="noreferrer"
              className="btn-secondary"
            >
              <span>Itinéraire Google Maps</span>
              <ExternalLink size={15} />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
