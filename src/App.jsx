import React, { useState } from 'react';
import Navbar from './components/Navbar';
import HomeView from './components/HomeView';
import BudgetView from './components/BudgetView';
import TeasersView from './components/TeasersView';
import GroceryView from './components/GroceryView';
import PhotosView from './components/PhotosView';
import ExpensesView from './components/ExpensesView';
import SurpriseView from './components/SurpriseView';
import { Mountain, Heart, Snowflake } from 'lucide-react';
import './App.css';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');

  return (
    <div className="app-container">
      {/* Background ambient lighting */}
      <div className="bg-ambient-orb-1"></div>
      <div className="bg-ambient-orb-2"></div>

      {/* Top Sticky Navigation */}
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content Area */}
      <main className="main-content">
        {activeTab === 'home' && <HomeView setActiveTab={setActiveTab} />}
        {activeTab === 'budget' && <BudgetView />}
        {activeTab === 'teasers' && <TeasersView />}
        {activeTab === 'grocery' && <GroceryView />}
        {activeTab === 'photos' && <PhotosView />}
        {activeTab === 'expenses' && <ExpensesView />}
        {activeTab === 'surprise' && <SurpriseView />}
      </main>

      {/* Footer */}
      <footer className="main-footer">
        <div className="footer-inner">
          <div className="footer-brand">
            <div className="flex items-center gap-2">
              <Mountain size={18} className="text-sky-400" />
              <span className="font-bold text-white tracking-wide">PANORAMA 2027</span>
            </div>
            <p className="footer-sub">
              Voyage de Ski familial dans les Rocheuses • 2 au 9 mars 2027
            </p>
          </div>

          <div className="footer-families">
            <span className="family-tag legaults">Les Legaults</span>
            <span className="text-slate-500 font-bold">&amp;</span>
            <span className="family-tag synettes">Les Synettes</span>
          </div>

          <div className="footer-credit">
            <span>Fait pour la gang avec</span>
            <Heart size={13} className="text-rose-400 mx-1 inline" fill="#f43f5e" />
            <span>&amp;</span>
            <Snowflake size={13} className="text-sky-400 mx-1 inline" />
          </div>
        </div>
      </footer>
    </div>
  );
}
