import React, { useState, useEffect } from 'react';
import { 
  Mountain, LayoutDashboard, Gift, Scale, Camera, Clock, 
  Flame, UtensilsCrossed 
} from 'lucide-react';
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
    <>
      {/* Top Header */}
      <header className="main-header">
        <div className="header-inner">
          {/* Logo / Brand */}
          <button className="brand-badge" onClick={() => setActiveTab('home')}>
            <div className="brand-icon-wrapper">
              <Mountain size={22} />
            </div>
            <div>
              <div className="brand-title">PANORAMA 2027</div>
              <div className="brand-subtitle">Voyage de Ski • Rocheuses</div>
            </div>
          </button>

          {/* Desktop Navigation Tabs (Hidden on mobile) */}
          <nav className="nav-tabs desktop-only-nav">
            <button
              className={`nav-tab-btn ${activeTab === 'home' ? 'active' : ''}`}
              onClick={() => setActiveTab('home')}
            >
              <Mountain size={16} />
              <span>Accueil</span>
            </button>

            <button
              className={`nav-tab-btn ${activeTab === 'budget' ? 'active' : ''}`}
              onClick={() => setActiveTab('budget')}
            >
              <LayoutDashboard size={16} />
              <span>Sommaire</span>
            </button>

            <button
              className={`nav-tab-btn ${activeTab === 'teasers' ? 'active' : ''}`}
              onClick={() => setActiveTab('teasers')}
            >
              <Flame size={16} className="text-amber-400" />
              <span>Teasers 🔥</span>
            </button>

            <button
              className={`nav-tab-btn ${activeTab === 'grocery' ? 'active' : ''}`}
              onClick={() => setActiveTab('grocery')}
            >
              <UtensilsCrossed size={16} />
              <span>Épicerie</span>
            </button>

            <button
              className={`nav-tab-btn ${activeTab === 'photos' ? 'active' : ''}`}
              onClick={() => setActiveTab('photos')}
            >
              <Camera size={16} />
              <span>Photos</span>
            </button>

            <button
              className={`nav-tab-btn ${activeTab === 'expenses' ? 'active' : ''}`}
              onClick={() => setActiveTab('expenses')}
            >
              <Scale size={16} />
              <span>Splitwise</span>
            </button>

            <button
              className={`nav-tab-btn surprise-btn ${activeTab === 'surprise' ? 'active' : ''}`}
              onClick={() => setActiveTab('surprise')}
            >
              <Gift size={16} className={activeTab === 'surprise' ? '' : 'surprise-sparkle'} />
              <span>Surprise 🎁</span>
            </button>
          </nav>

          {/* Header Right Items: Countdown */}
          <div className="header-right-group">
            <div className="header-countdown" title="Départ le 2 mars 2027">
              <Clock size={14} />
              <span>J - {timeLeft.days}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Bottom Navigation Bar (iOS / iPhone Style) */}
      <nav className="mobile-bottom-nav">
        <div className="mobile-nav-inner mobile-nav-scrollable">
          <button
            className={`mobile-nav-item ${activeTab === 'home' ? 'active' : ''}`}
            onClick={() => {
              setActiveTab('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            <Mountain size={18} />
            <span>Accueil</span>
          </button>

          <button
            className={`mobile-nav-item ${activeTab === 'budget' ? 'active' : ''}`}
            onClick={() => {
              setActiveTab('budget');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            <LayoutDashboard size={18} />
            <span>Sommaire</span>
          </button>

          <button
            className={`mobile-nav-item ${activeTab === 'teasers' ? 'active' : ''}`}
            onClick={() => {
              setActiveTab('teasers');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            <Flame size={18} className="text-amber-400" />
            <span>Teasers</span>
          </button>

          <button
            className={`mobile-nav-item ${activeTab === 'grocery' ? 'active' : ''}`}
            onClick={() => {
              setActiveTab('grocery');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            <UtensilsCrossed size={18} />
            <span>Épicerie</span>
          </button>

          <button
            className={`mobile-nav-item ${activeTab === 'photos' ? 'active' : ''}`}
            onClick={() => {
              setActiveTab('photos');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            <Camera size={18} />
            <span>Photos</span>
          </button>

          <button
            className={`mobile-nav-item ${activeTab === 'expenses' ? 'active' : ''}`}
            onClick={() => {
              setActiveTab('expenses');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            <Scale size={18} />
            <span>Splitwise</span>
          </button>

          <button
            className={`mobile-nav-item surprise-item ${activeTab === 'surprise' ? 'active' : ''}`}
            onClick={() => {
              setActiveTab('surprise');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            <div className="mobile-surprise-circle">
              <Gift size={16} />
            </div>
            <span>Surprise</span>
          </button>
        </div>
      </nav>
    </>
  );
}
