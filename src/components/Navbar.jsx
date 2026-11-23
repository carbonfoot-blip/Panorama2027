import React, { useState, useEffect } from 'react';
import { Mountain, LayoutDashboard, Gift, Scale, Camera, Clock } from 'lucide-react';
import { TRIP_METADATA } from '../data/tripData';

export default function Navbar({ activeTab, setActiveTab }) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, mins: 0 });

  useEffect(() => {
    const calculateTime = () => {
      const target = new Date(TRIP_METADATA.startDate).getTime();
      const now = new Date().getTime();
      const diff = target - now;

      if (diff > 0) {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        setTimeLeft({ days, hours, mins });
      }
    };

    calculateTime();
    const interval = setInterval(calculateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="main-header">
      <div className="header-inner">
        {/* Logo / Brand */}
        <button className="brand-badge" onClick={() => setActiveTab('home')}>
          <div className="brand-icon-wrapper">
            <Mountain size={24} />
          </div>
          <div>
            <div className="brand-title">PANORAMA 2027</div>
            <div className="brand-subtitle">Voyage de Ski • Rocheuses BC</div>
          </div>
        </button>

        {/* Navigation Tabs */}
        <nav className="nav-tabs">
          <button
            className={`nav-tab-btn ${activeTab === 'home' ? 'active' : ''}`}
            onClick={() => setActiveTab('home')}
          >
            <Mountain size={17} />
            <span>Accueil</span>
          </button>

          <button
            className={`nav-tab-btn ${activeTab === 'budget' ? 'active' : ''}`}
            onClick={() => setActiveTab('budget')}
          >
            <LayoutDashboard size={17} />
            <span>Sommaire & Réservations</span>
          </button>

          <button
            className={`nav-tab-btn surprise-btn ${activeTab === 'surprise' ? 'active' : ''}`}
            onClick={() => setActiveTab('surprise')}
          >
            <Gift size={17} className={activeTab === 'surprise' ? '' : 'surprise-sparkle'} />
            <span>Surprise Noël 🎁</span>
          </button>

          <button
            className={`nav-tab-btn ${activeTab === 'expenses' ? 'active' : ''}`}
            onClick={() => setActiveTab('expenses')}
          >
            <Scale size={17} />
            <span>Suivi Dépenses (Splitwise)</span>
          </button>

          <button
            className={`nav-tab-btn ${activeTab === 'photos' ? 'active' : ''}`}
            onClick={() => setActiveTab('photos')}
          >
            <Camera size={17} />
            <span>Photos & Montage</span>
          </button>
        </nav>

        {/* Header Countdown Pill */}
        <div className="header-countdown" title="Départ le 2 mars 2027">
          <Clock size={15} />
          <span>J - {timeLeft.days} jours</span>
        </div>
      </div>
    </header>
  );
}
