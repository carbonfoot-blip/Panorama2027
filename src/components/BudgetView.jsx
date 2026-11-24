import React, { useState } from 'react';
import { 
  DollarSign, CheckCircle2, Clock, AlertCircle, Copy, 
  ExternalLink, Plus, Filter, Download, Check, Sparkles, MapPin, X,
  Edit2, Trash2, SplitSquareVertical, RefreshCw
} from 'lucide-react';
import { INITIAL_BUDGET_ITEMS } from '../data/tripData';
import { useSyncedData } from '../services/db';

export default function BudgetView() {
  const [items, setItems, isLive] = useSyncedData('budget', INITIAL_BUDGET_ITEMS);

  const [statusFilter, setStatusFilter] = useState('ALL');
  const [copiedId, setCopiedId] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const [newItem, setNewItem] = useState({
    item: '',
    prixTotal: '',
    legaults: '',
    synettes: '',
    statut: 'Booké, pas payé',
    note: '',
    confirmation: ''
  });

  const copyToClipboard = (text, id) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const updateItemStatus = (itemId, newStatut) => {
    setItems(items.map(item => {
      if (item.id === itemId) {
        return { ...item, statut: newStatut };
      }
      return item;
    }));
  };

  const handleStartEdit = (row) => {
    setEditingItem({
      ...row,
      prixTotal: row.prixTotal !== undefined ? String(row.prixTotal) : '',
      legaults: row.legaults !== undefined ? String(row.legaults) : '',
      synettes: row.synettes !== undefined ? String(row.synettes) : '',
      confirmation: row.confirmation || '',
      note: row.note || ''
    });
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    if (!editingItem || !editingItem.item) return;

    const total = parseFloat(editingItem.prixTotal) || 0;
    const leg = parseFloat(editingItem.legaults) || 0;
    const syn = parseFloat(editingItem.synettes) || 0;

    setItems(items.map(item => {
      if (item.id === editingItem.id) {
        return {
          ...item,
          item: editingItem.item,
          prixTotal: total,
          legaults: leg,
          synettes: syn,
          statut: editingItem.statut,
          confirmation: editingItem.confirmation,
          note: editingItem.note
        };
      }
      return item;
    }));

    setEditingItem(null);
  };

  const handleDeleteItem = (id) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cette ligne du tableau ?")) {
      setItems(items.filter(i => i.id !== id));
      if (editingItem?.id === id) setEditingItem(null);
    }
  };

  const handleAddItem = (e) => {
    e.preventDefault();
    if (!newItem.item || !newItem.prixTotal) return;

    const total = parseFloat(newItem.prixTotal) || 0;
    const leg = parseFloat(newItem.legaults) || 0;
    const syn = parseFloat(newItem.synettes) || 0;

    const created = {
      id: `item-${Date.now()}`,
      item: newItem.item,
      prixTotal: total,
      legaults: leg,
      synettes: syn,
      statut: newItem.statut,
      note: newItem.note,
      confirmation: newItem.confirmation,
      links: []
    };

    setItems([...items, created]);
    setShowAddModal(false);
    setNewItem({
      item: '',
      prixTotal: '',
      legaults: '',
      synettes: '',
      statut: 'Booké, pas payé',
      note: '',
      confirmation: ''
    });
  };

  const resetToDefault = () => {
    if (window.confirm("Voulez-vous réinitialiser le tableau aux valeurs officielles de départ ?")) {
      setItems(INITIAL_BUDGET_ITEMS);
    }
  };

  // Calculations
  const totalAmount = items.reduce((acc, curr) => acc + (Number(curr.prixTotal) || 0), 0);
  const totalLegaults = items.reduce((acc, curr) => acc + (Number(curr.legaults) || 0), 0);
  const totalSynettes = items.reduce((acc, curr) => acc + (Number(curr.synettes) || 0), 0);

  const totalPaid = items
    .filter(i => i.statut === 'Payé')
    .reduce((acc, curr) => acc + (Number(curr.prixTotal) || 0), 0);

  const totalBooked = items
    .filter(i => i.statut === 'Booké, pas payé')
    .reduce((acc, curr) => acc + (Number(curr.prixTotal) || 0), 0);

  const totalToBuy = items
    .filter(i => i.statut === 'À acheter')
    .reduce((acc, curr) => acc + (Number(curr.prixTotal) || 0), 0);

  const filteredItems = items.filter(item => {
    if (statusFilter === 'ALL') return true;
    return item.statut === statusFilter;
  });

  const formatCurrency = (val) => {
    if (val === undefined || val === null || val === '') return '$0.00';
    return `$${Number(val).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  return (
    <div className="budget-view">
      {/* Page Header */}
      <div className="view-header-bar">
        <div>
          <div className="section-badge">
            <DollarSign size={14} />
            <span>Classeur Officiel de Voyage</span>
          </div>
          <h1 className="section-title">Sommaire &amp; Réservations</h1>
          <p className="section-desc">
            Toutes les dépenses pré-voyage, billets de ski, hébergement et confirmations officielles pour les Legaults et les Synettes.
          </p>
        </div>

        <div className="header-actions-group">
          <button className="btn-secondary btn-sm" onClick={resetToDefault} title="Rétablir données initiales">
            Rétablir défaut
          </button>
          <button className="btn-primary" onClick={() => setShowAddModal(true)}>
            <Plus size={18} />
            <span>Ajouter une ligne</span>
          </button>
        </div>
      </div>

      {/* KPI Summary Cards */}
      <div className="budget-kpi-grid">
        <div className="glass-card kpi-card total-kpi">
          <div className="kpi-top">
            <span className="kpi-label">Budget Total Estimé</span>
            <div className="kpi-icon-badge blue">
              <DollarSign size={18} />
            </div>
          </div>
          <div className="kpi-amount">{formatCurrency(totalAmount)}</div>
          <div className="kpi-sub-breakdown">
            <div className="sub-stat">
              <span className="dot emerald"></span>
              <span>Payé : {formatCurrency(totalPaid)}</span>
            </div>
            <div className="sub-stat">
              <span className="dot amber"></span>
              <span>Booké : {formatCurrency(totalBooked)}</span>
            </div>
            <div className="sub-stat">
              <span className="dot rose"></span>
              <span>À acheter : {formatCurrency(totalToBuy)}</span>
            </div>
          </div>
        </div>

        <div className="glass-card kpi-card legaults-kpi">
          <div className="kpi-top">
            <div>
              <span className="family-tag legaults">Les Legaults</span>
              <span className="kpi-label block mt-1">Part Totale</span>
            </div>
            <div className="kpi-percentage">
              {Math.round((totalLegaults / (totalAmount || 1)) * 100)}%
            </div>
          </div>
          <div className="kpi-amount text-sky-400">{formatCurrency(totalLegaults)}</div>
          <p className="kpi-note">
            Vols, 50% condo Aisling Baile, ski adultes &amp; enfants, Rav4 #2.
          </p>
        </div>

        <div className="glass-card kpi-card synettes-kpi">
          <div className="kpi-top">
            <div>
              <span className="family-tag synettes">Les Synettes</span>
              <span className="kpi-label block mt-1">Part Totale</span>
            </div>
            <div className="kpi-percentage">
              {Math.round((totalSynettes / (totalAmount || 1)) * 100)}%
            </div>
          </div>
          <div className="kpi-amount text-emerald-400">{formatCurrency(totalSynettes)}</div>
          <p className="kpi-note">
            Vol, 50% condo Aisling Baile, ski seniors, Rav4 #1.
          </p>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="table-controls-bar glass-card mb-4">
        <div className="filter-group">
          <Filter size={16} className="text-slate-400" />
          <span className="filter-label">Filtre :</span>
          <div className="filter-pills">
            <button 
              className={`filter-pill ${statusFilter === 'ALL' ? 'active' : ''}`}
              onClick={() => setStatusFilter('ALL')}
            >
              Tous ({items.length})
            </button>
            <button 
              className={`filter-pill paye ${statusFilter === 'Payé' ? 'active' : ''}`}
              onClick={() => setStatusFilter('Payé')}
            >
              Payé ({items.filter(i => i.statut === 'Payé').length})
            </button>
            <button 
              className={`filter-pill booke ${statusFilter === 'Booké, pas payé' ? 'active' : ''}`}
              onClick={() => setStatusFilter('Booké, pas payé')}
            >
              Booké ({items.filter(i => i.statut === 'Booké, pas payé').length})
            </button>
            <button 
              className={`filter-pill acheter ${statusFilter === 'À acheter' ? 'active' : ''}`}
              onClick={() => setStatusFilter('À acheter')}
            >
              À acheter ({items.filter(i => i.statut === 'À acheter').length})
            </button>
          </div>
        </div>
      </div>

      {/* ======================================================================= */}
      {/* 1. MOBILE CARDS VIEW (Clean, vertical, perfectly readable on iPhone)     */}
      {/* ======================================================================= */}
      <div className="budget-mobile-cards-list">
        {filteredItems.map((row) => (
          <div key={row.id} className="budget-mobile-card glass-card">
            {/* Header: Title and Status */}
            <div className="mobile-card-header">
              <div className="mobile-item-title-col">
                <h3 className="mobile-item-title">{row.item}</h3>
                {row.vehicle && <span className="item-sub-tag">{row.vehicle}</span>}
              </div>

              <select
                className={`status-select ${
                  row.statut === 'Payé' ? 'paye' : row.statut === 'Booké, pas payé' ? 'booke' : 'acheter'
                }`}
                value={row.statut}
                onChange={(e) => updateItemStatus(row.id, e.target.value)}
              >
                <option value="Payé">Payé</option>
                <option value="Booké, pas payé">Booké, pas payé</option>
                <option value="À acheter">À acheter</option>
              </select>
            </div>

            {/* Total Price & Breakdown */}
            <div className="mobile-card-amounts-box">
              <div className="mobile-total-price">
                <span className="mobile-amt-lbl">Prix total :</span>
                <span className="mobile-amt-val">{formatCurrency(row.prixTotal)}</span>
              </div>

              <div className="mobile-family-shares">
                <div className="mobile-share-pill legaults">
                  <span className="lbl">Legaults :</span>
                  <span className="val">{row.legaults ? formatCurrency(row.legaults) : '0,00 $'}</span>
                </div>
                <div className="mobile-share-pill synettes">
                  <span className="lbl">Synettes :</span>
                  <span className="val">{row.synettes ? formatCurrency(row.synettes) : '0,00 $'}</span>
                </div>
              </div>
            </div>

            {/* Notes & Confirmations */}
            {row.note && (
              <div className="mobile-card-note">
                {row.note}
              </div>
            )}

            {/* Confirmation Copy Chip */}
            {row.confirmation && (
              <div className="mobile-copy-row">
                <button 
                  className="mobile-copy-chip"
                  onClick={() => copyToClipboard(row.confirmation, row.id)}
                >
                  {copiedId === row.id ? (
                    <>
                      <Check size={14} className="text-emerald-400 flex-shrink-0" />
                      <span className="text-emerald-300 font-bold">Copié dans le presse-papier !</span>
                    </>
                  ) : (
                    <>
                      <Copy size={14} className="flex-shrink-0" />
                      <span>Copier confirmation : <strong>#{row.confirmation}</strong></span>
                    </>
                  )}
                </button>
              </div>
            )}

            {/* Links */}
            {row.links && row.links.length > 0 && (
              <div className="mobile-links-row">
                {row.links.map((link, idx) => (
                  <a 
                    key={idx}
                    href={link.url}
                    target="_blank"
                    rel="noreferrer"
                    className="note-link-pill"
                  >
                    <span>{link.label}</span>
                    <ExternalLink size={12} />
                  </a>
                ))}
              </div>
            )}

            {/* Action Buttons */}
            <div className="mobile-card-actions">
              <button 
                className="btn-secondary btn-sm flex-1 flex items-center justify-center gap-1.5"
                onClick={() => handleStartEdit(row)}
              >
                <Edit2 size={14} />
                <span>Modifier</span>
              </button>
              <button 
                className="btn-action-icon hover:text-rose-400"
                onClick={() => handleDeleteItem(row.id)}
                title="Supprimer la ligne"
              >
                <Trash2 size={15} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ======================================================================= */}
      {/* 2. DESKTOP SPREADSHEET TABLE (Visible on tablets & desktops > 768px)    */}
      {/* ======================================================================= */}
      <div className="glass-card table-card-container desktop-table-container">
        <div className="table-responsive-wrapper">
          <table className="custom-travel-table">
            <thead>
              <tr>
                <th className="col-item">Item</th>
                <th className="col-price">Prix total</th>
                <th className="col-family text-sky-300">Legaults</th>
                <th className="col-family text-emerald-300">Synettes</th>
                <th className="col-status">Statut</th>
                <th className="col-note">Notes &amp; Confirmations</th>
                <th className="col-actions text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.map((row) => (
                <tr key={row.id} className="table-row">
                  <td className="col-item">
                    <div 
                      className="item-title-text hover:text-sky-400 cursor-pointer flex items-center gap-1.5"
                      onClick={() => handleStartEdit(row)}
                      title="Cliquer pour modifier"
                    >
                      <span>{row.item}</span>
                      <Edit2 size={12} className="text-slate-500 opacity-60 hover:opacity-100" />
                    </div>
                    {row.vehicle && (
                      <span className="item-sub-tag">{row.vehicle}</span>
                    )}
                  </td>

                  <td className="col-price font-semibold text-white">
                    {formatCurrency(row.prixTotal)}
                  </td>

                  <td className="col-family text-sky-400 font-medium">
                    {row.legaults ? formatCurrency(row.legaults) : <span className="empty-dash">—</span>}
                  </td>

                  <td className="col-family text-emerald-400 font-medium">
                    {row.synettes ? formatCurrency(row.synettes) : <span className="empty-dash">—</span>}
                  </td>

                  <td className="col-status">
                    <select
                      className={`status-select ${
                        row.statut === 'Payé' ? 'paye' : row.statut === 'Booké, pas payé' ? 'booke' : 'acheter'
                      }`}
                      value={row.statut}
                      onChange={(e) => updateItemStatus(row.id, e.target.value)}
                    >
                      <option value="Payé">Payé</option>
                      <option value="Booké, pas payé">Booké, pas payé</option>
                      <option value="À acheter">À acheter</option>
                    </select>
                  </td>

                  <td className="col-note">
                    <div className="note-cell-content">
                      <div className="note-text-main">{row.note}</div>

                      {row.confirmation && (
                        <div className="confirmation-badge-row">
                          <button 
                            className="copy-chip"
                            onClick={() => copyToClipboard(row.confirmation, row.id)}
                            title="Cliquer pour copier le numéro"
                          >
                            {copiedId === row.id ? (
                              <>
                                <Check size={12} className="text-emerald-400" />
                                <span className="text-emerald-300 font-bold">Copié !</span>
                              </>
                            ) : (
                              <>
                                <Copy size={12} />
                                <span># {row.confirmation}</span>
                              </>
                            )}
                          </button>
                        </div>
                      )}

                      {row.links && row.links.length > 0 && (
                        <div className="links-row">
                          {row.links.map((link, idx) => (
                            <a 
                              key={idx}
                              href={link.url}
                              target="_blank"
                              rel="noreferrer"
                              className="note-link-pill"
                            >
                              <span>{link.label}</span>
                              <ExternalLink size={11} />
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  </td>

                  <td className="col-actions text-right">
                    <div className="row-actions-group">
                      <button 
                        className="btn-action-icon hover:text-sky-400"
                        onClick={() => handleStartEdit(row)}
                        title="Modifier cette ligne"
                      >
                        <Edit2 size={15} />
                      </button>
                      <button 
                        className="btn-action-icon hover:text-rose-400"
                        onClick={() => handleDeleteItem(row.id)}
                        title="Supprimer cette ligne"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="table-footer-row">
                <td className="font-bold text-white uppercase tracking-wider">Total</td>
                <td className="font-bold text-white text-lg">{formatCurrency(totalAmount)}</td>
                <td className="font-bold text-sky-400">{formatCurrency(totalLegaults)}</td>
                <td className="font-bold text-emerald-400">{formatCurrency(totalSynettes)}</td>
                <td colSpan="3" className="text-xs text-slate-400 text-right">
                  {items.length} éléments comptabilisés
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      {/* Lodging Spotlight Card */}
      <div className="glass-card lodging-highlight-card mt-6">
        <div className="lodging-card-inner">
          <div className="flex items-start gap-4">
            <div className="lodging-icon-box">
              <MapPin size={26} className="text-sky-400" />
            </div>
            <div>
              <div className="section-badge mb-1">
                <span>Hébergement Officiel</span>
              </div>
              <h3 className="lodging-title">Aisling Baile — Condo 130</h3>
              <p className="lodging-address">2035 Panorama Drive #130, Panorama, BC</p>
              <p className="lodging-notes">
                Condo 3 chambres spacieux • Ski-in / Ski-out • Accès direct aux piscines chaudes Panorama Springs • ID Réservation: <strong>71859146</strong>
              </p>
            </div>
          </div>

          <div className="lodging-buttons">
            <a 
              href="https://www.aislingbaile.com/" 
              target="_blank" 
              rel="noreferrer"
              className="btn-primary btn-sm"
            >
              <span>Site Web Aisling Baile</span>
              <ExternalLink size={14} />
            </a>
            <a 
              href="https://www.google.com/maps/search/?api=1&query=2035+Panorama+Drive+Panorama+BC+Canada" 
              target="_blank" 
              rel="noreferrer"
              className="btn-secondary btn-sm"
            >
              <span>Itinéraire Google Maps</span>
              <ExternalLink size={14} />
            </a>
          </div>
        </div>
      </div>

      {/* Add Item Modal */}
      {showAddModal && (
        <div className="modal-overlay" onClick={() => setShowAddModal(false)}>
          <div className="modal-box glass-card" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-700">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Plus size={20} className="text-sky-400" />
                <span>Ajouter un élément au budget</span>
              </h3>
              <button className="btn-action-icon" onClick={() => setShowAddModal(false)}>
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleAddItem} className="space-y-4">
              <div className="form-group">
                <label>Nom de l'item / réservation *</label>
                <input 
                  type="text" 
                  required
                  placeholder="Ex: Épicerie Costco Calgary, Cours de ski..."
                  value={newItem.item}
                  onChange={(e) => setNewItem({ ...newItem, item: e.target.value })}
                />
              </div>

              <div className="form-grid grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="form-group">
                  <label>Prix Total ($) *</label>
                  <input 
                    type="number" 
                    step="0.01" 
                    required
                    placeholder="0.00"
                    value={newItem.prixTotal}
                    onChange={(e) => {
                      const val = e.target.value;
                      const num = parseFloat(val) || 0;
                      const half = (num / 2).toFixed(2);
                      setNewItem({ 
                        ...newItem, 
                        prixTotal: val,
                        legaults: half,
                        synettes: half
                      });
                    }}
                  />
                </div>

                <div className="form-group">
                  <label>Part Legaults ($)</label>
                  <input 
                    type="number" 
                    step="0.01" 
                    value={newItem.legaults}
                    onChange={(e) => setNewItem({ ...newItem, legaults: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label>Part Synettes ($)</label>
                  <input 
                    type="number" 
                    step="0.01" 
                    value={newItem.synettes}
                    onChange={(e) => setNewItem({ ...newItem, synettes: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Statut</label>
                <select 
                  value={newItem.statut}
                  onChange={(e) => setNewItem({ ...newItem, statut: e.target.value })}
                >
                  <option value="Payé">Payé</option>
                  <option value="Booké, pas payé">Booké, pas payé</option>
                  <option value="À acheter">À acheter</option>
                </select>
              </div>

              <div className="form-group">
                <label>Numéro de confirmation / Référence</label>
                <input 
                  type="text" 
                  placeholder="Ex: PR262369, GFVTXR..."
                  value={newItem.confirmation}
                  onChange={(e) => setNewItem({ ...newItem, confirmation: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>Notes ou détails</label>
                <textarea 
                  rows="2"
                  placeholder="Courriel utilisé, instructions de récupération, etc."
                  value={newItem.note}
                  onChange={(e) => setNewItem({ ...newItem, note: e.target.value })}
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-700">
                <button type="button" className="btn-secondary" onClick={() => setShowAddModal(false)}>
                  Annuler
                </button>
                <button type="submit" className="btn-primary">
                  Ajouter au tableau
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Item Modal */}
      {editingItem && (
        <div className="modal-overlay" onClick={() => setEditingItem(null)}>
          <div className="modal-box glass-card" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-700">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Edit2 size={20} className="text-sky-400" />
                <span>Modifier la réservation</span>
              </h3>
              <button className="btn-action-icon" onClick={() => setEditingItem(null)}>
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="space-y-4">
              <div className="form-group">
                <label>Nom de l'item *</label>
                <input 
                  type="text" 
                  required
                  value={editingItem.item}
                  onChange={(e) => setEditingItem({ ...editingItem, item: e.target.value })}
                />
              </div>

              <div className="form-grid grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="form-group">
                  <label>Prix Total ($) *</label>
                  <input 
                    type="number" 
                    step="0.01" 
                    required
                    value={editingItem.prixTotal}
                    onChange={(e) => {
                      const val = e.target.value;
                      const num = parseFloat(val) || 0;
                      const half = (num / 2).toFixed(2);
                      setEditingItem({ 
                        ...editingItem, 
                        prixTotal: val,
                        legaults: half,
                        synettes: half
                      });
                    }}
                  />
                </div>

                <div className="form-group">
                  <label className="text-sky-300">Part Legaults ($)</label>
                  <input 
                    type="number" 
                    step="0.01" 
                    value={editingItem.legaults}
                    onChange={(e) => setEditingItem({ ...editingItem, legaults: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="text-emerald-300">Part Synettes ($)</label>
                  <input 
                    type="number" 
                    step="0.01" 
                    value={editingItem.synettes}
                    onChange={(e) => setEditingItem({ ...editingItem, synettes: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Statut</label>
                <select 
                  value={editingItem.statut}
                  onChange={(e) => setEditingItem({ ...editingItem, statut: e.target.value })}
                >
                  <option value="Payé">Payé</option>
                  <option value="Booké, pas payé">Booké, pas payé</option>
                  <option value="À acheter">À acheter</option>
                </select>
              </div>

              <div className="form-group">
                <label>Numéro de confirmation</label>
                <input 
                  type="text" 
                  value={editingItem.confirmation}
                  onChange={(e) => setEditingItem({ ...editingItem, confirmation: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>Notes &amp; Détails</label>
                <textarea 
                  rows="3"
                  value={editingItem.note}
                  onChange={(e) => setEditingItem({ ...editingItem, note: e.target.value })}
                />
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-slate-700">
                <button 
                  type="button" 
                  className="btn-secondary text-rose-400 hover:text-rose-300" 
                  onClick={() => handleDeleteItem(editingItem.id)}
                >
                  <Trash2 size={16} />
                  <span>Supprimer</span>
                </button>

                <div className="flex items-center gap-2">
                  <button type="button" className="btn-secondary" onClick={() => setEditingItem(null)}>
                    Annuler
                  </button>
                  <button type="submit" className="btn-primary">
                    Enregistrer modifications
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
