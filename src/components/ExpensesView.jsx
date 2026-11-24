import React, { useState } from 'react';
import { 
  Scale, Plus, Trash2, DollarSign, 
  Receipt, ShoppingBag, Fuel, Utensils, Snowflake, Home, 
  Calendar, Check, AlertCircle, RefreshCw, X, Tag
} from 'lucide-react';
import { INITIAL_EXPENSES } from '../data/tripData';
import { useSyncedData } from '../services/db';

export default function ExpensesView() {
  const [expenses, setExpenses, isLive] = useSyncedData('expenses', INITIAL_EXPENSES);

  const [categoryFilter, setCategoryFilter] = useState('ALL');
  const [showAddForm, setShowAddForm] = useState(false);

  // Form State
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [paidBy, setPaidBy] = useState('Legaults'); // 'Legaults' | 'Synettes'
  const [splitRule, setSplitRule] = useState('50-50'); // '50-50' | '100-legaults' | '100-synettes' | 'custom'
  const [customLegaultsShare, setCustomLegaultsShare] = useState('');
  const [customSynettesShare, setCustomSynettesShare] = useState('');
  const [category, setCategory] = useState('Épicerie');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [note, setNote] = useState('');

  // Calculations
  let totalSpent = 0;
  let totalPaidLegaults = 0;
  let totalPaidSynettes = 0;
  let totalShareLegaults = 0;
  let totalShareSynettes = 0;

  expenses.forEach(exp => {
    const amt = Number(exp.amount) || 0;
    totalSpent += amt;

    if (exp.paidBy === 'Legaults') {
      totalPaidLegaults += amt;
    } else {
      totalPaidSynettes += amt;
    }

    totalShareLegaults += Number(exp.legaultsShare) || 0;
    totalShareSynettes += Number(exp.synettesShare) || 0;
  });

  // Net Balance:
  // Net owed by Synettes to Legaults = totalPaidLegaults - totalShareLegaults
  const netBalance = totalPaidLegaults - totalShareLegaults;

  const handleAddExpense = (e) => {
    e.preventDefault();
    const parsedAmount = parseFloat(amount);
    if (!title || isNaN(parsedAmount) || parsedAmount <= 0) return;

    let legShare = 0;
    let synShare = 0;

    if (splitRule === '50-50') {
      legShare = parsedAmount / 2;
      synShare = parsedAmount / 2;
    } else if (splitRule === '100-legaults') {
      legShare = parsedAmount;
      synShare = 0;
    } else if (splitRule === '100-synettes') {
      legShare = 0;
      synShare = parsedAmount;
    } else if (splitRule === 'custom') {
      legShare = parseFloat(customLegaultsShare) || 0;
      synShare = parseFloat(customSynettesShare) || 0;
    }

    const newExpense = {
      id: `exp-${Date.now()}`,
      title,
      amount: parsedAmount,
      paidBy,
      splitRule,
      legaultsShare: legShare,
      synettesShare: synShare,
      category,
      date,
      note
    };

    setExpenses([newExpense, ...expenses]);
    setTitle('');
    setAmount('');
    setNote('');
    setSplitRule('50-50');
    setShowAddForm(false);
  };

  const handleDeleteExpense = (id) => {
    if (window.confirm("Supprimer cette dépense ?")) {
      setExpenses(expenses.filter(e => e.id !== id));
    }
  };

  const handleSettleUp = () => {
    if (Math.abs(netBalance) < 0.01) {
      alert("Tout le monde est déjà à égalité !");
      return;
    }

    const debtor = netBalance > 0 ? "Synettes" : "Legaults";
    const creditor = netBalance > 0 ? "Legaults" : "Synettes";
    const settleAmount = Math.abs(netBalance);

    if (window.confirm(`Confirmer le règlement de ${formatCurrency(settleAmount)} payé par les ${debtor} aux ${creditor} ?`)) {
      const settlementExpense = {
        id: `settle-${Date.now()}`,
        title: `🤝 Règlement (${debtor} -> ${creditor})`,
        amount: settleAmount,
        paidBy: debtor,
        splitRule: debtor === 'Legaults' ? '100-synettes' : '100-legaults',
        legaultsShare: debtor === 'Legaults' ? 0 : settleAmount,
        synettesShare: debtor === 'Synettes' ? 0 : settleAmount,
        category: 'Règlement',
        date: new Date().toISOString().split('T')[0],
        note: `Remboursement pour équilibrer les comptes.`
      };

      setExpenses([settlementExpense, ...expenses]);
    }
  };

  const filteredExpenses = expenses.filter(exp => {
    if (categoryFilter === 'ALL') return true;
    return exp.category === categoryFilter;
  });

  const formatCurrency = (val) => {
    return `$${Number(val || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const getCategoryIcon = (cat) => {
    switch (cat) {
      case 'Épicerie': return <ShoppingBag size={14} className="text-amber-400" />;
      case 'Essence & Transport': return <Fuel size={14} className="text-sky-400" />;
      case 'Restaurant & Bar': return <Utensils size={14} className="text-rose-400" />;
      case 'Activités & Ski': return <Snowflake size={14} className="text-cyan-400" />;
      case 'Hébergement': return <Home size={14} className="text-purple-400" />;
      default: return <Tag size={14} className="text-slate-400" />;
    }
  };

  return (
    <div className="expenses-view">
      {/* View Header */}
      <div className="view-header-bar">
        <div>
          <div className="section-badge">
            <Scale size={14} />
            <span>Gestion de Dépenses Familiales</span>
          </div>
          <h1 className="section-title">Splitwise du Voyage</h1>
          <p className="section-desc">
            Ajoutez les factures d'épicerie, essence, restos et activités sur place. Le solde entre les Legaults et les Synettes est calculé automatiquement.
          </p>
        </div>

        <div className="header-actions-group">
          {Math.abs(netBalance) >= 0.01 && (
            <button className="btn-secondary" onClick={handleSettleUp}>
              <RefreshCw size={16} />
              <span>Régler les comptes</span>
            </button>
          )}
          <button className="btn-primary" onClick={() => setShowAddForm(true)}>
            <Plus size={18} />
            <span>Ajouter une dépense</span>
          </button>
        </div>
      </div>

      {/* Splitwise Banner */}
      <div className="glass-card splitwise-banner-card">
        <div className="splitwise-grid">
          {/* Main Verdict Box */}
          <div className="splitwise-verdict-box">
            <span className="verdict-tag">ÉTAT DES COMPTES ACTUEL</span>
            {Math.abs(netBalance) < 0.01 ? (
              <div className="verdict-balanced">
                <div className="verdict-amount-row text-emerald-400">$0.00</div>
                <div className="verdict-main-text text-emerald-400">
                  Tout le monde est quitte !
                </div>
                <p className="verdict-sub-text">
                  Les dépenses sont parfaitement équilibrées entre les Legaults et les Synettes.
                </p>
              </div>
            ) : netBalance > 0 ? (
              <div className="verdict-debt">
                <div className="verdict-amount-row text-emerald-400">
                  {formatCurrency(netBalance)}
                </div>
                <div className="verdict-main-text">
                  Les <strong className="text-emerald-300">Synettes</strong> doivent aux <strong className="text-sky-300">Legaults</strong>
                </div>
                <p className="verdict-sub-text">
                  Les Legaults ont avancé plus de frais partagés durant le séjour.
                </p>
              </div>
            ) : (
              <div className="verdict-debt">
                <div className="verdict-amount-row text-sky-400">
                  {formatCurrency(Math.abs(netBalance))}
                </div>
                <div className="verdict-main-text">
                  Les <strong className="text-sky-300">Legaults</strong> doivent aux <strong className="text-emerald-300">Synettes</strong>
                </div>
                <p className="verdict-sub-text">
                  Les Synettes ont avancé plus de frais partagés durant le séjour.
                </p>
              </div>
            )}
          </div>

          {/* Quick Metrics Breakdown */}
          <div className="splitwise-metrics-col">
            <div className="metric-pill-item">
              <span className="m-label">Total Dépensé Voyage</span>
              <span className="m-val text-white">{formatCurrency(totalSpent)}</span>
            </div>

            <div className="metric-pill-item">
              <div className="flex items-center gap-2">
                <span className="dot sky"></span>
                <span className="m-label">Payé par les Legaults</span>
              </div>
              <span className="m-val text-sky-400">{formatCurrency(totalPaidLegaults)}</span>
            </div>

            <div className="metric-pill-item">
              <div className="flex items-center gap-2">
                <span className="dot emerald"></span>
                <span className="m-label">Payé par les Synettes</span>
              </div>
              <span className="m-val text-emerald-400">{formatCurrency(totalPaidSynettes)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Add Expense Form */}
      {showAddForm && (
        <div className="glass-card add-expense-form-card mb-6">
          <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-700">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <Plus size={20} className="text-sky-400" />
              <span>Nouvelle dépense sur place</span>
            </h3>
            <button className="btn-action-icon" onClick={() => setShowAddForm(false)}>
              <X size={18} />
            </button>
          </div>

          <form onSubmit={handleAddExpense} className="expense-form-grid">
            <div className="form-group col-span-2">
              <label>Description de la dépense *</label>
              <input 
                type="text" 
                required 
                placeholder="Ex: Épicerie No Frills, Plein d'essence, Resto au village..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Montant total ($ CAD) *</label>
              <input 
                type="number" 
                step="0.01" 
                required 
                placeholder="0.00"
                value={amount}
                onChange={(e) => {
                  const val = e.target.value;
                  setAmount(val);
                  if (splitRule === 'custom' && val) {
                    const half = (parseFloat(val) / 2).toFixed(2);
                    setCustomLegaultsShare(half);
                    setCustomSynettesShare(half);
                  }
                }}
              />
            </div>

            <div className="form-group">
              <label>Qui a payé ? *</label>
              <select value={paidBy} onChange={(e) => setPaidBy(e.target.value)}>
                <option value="Legaults">Les Legaults</option>
                <option value="Synettes">Les Synettes</option>
              </select>
            </div>

            <div className="form-group">
              <label>Comment partager cette facture ?</label>
              <select value={splitRule} onChange={(e) => setSplitRule(e.target.value)}>
                <option value="50-50">50% / 50% Égal (recommandé)</option>
                <option value="100-legaults">100% à la charge des Legaults</option>
                <option value="100-synettes">100% à la charge des Synettes</option>
                <option value="custom">Montants personnalisés</option>
              </select>
            </div>

            <div className="form-group">
              <label>Catégorie</label>
              <select value={category} onChange={(e) => setCategory(e.target.value)}>
                <option value="Épicerie">🛒 Épicerie &amp; Aliments</option>
                <option value="Essence &amp; Transport">⛽ Essence &amp; Transport</option>
                <option value="Restaurant &amp; Bar">🍔 Restaurant &amp; Après-Ski</option>
                <option value="Activités &amp; Ski">🎿 Activités &amp; Ski</option>
                <option value="Hébergement">🏠 Logement &amp; Extra</option>
                <option value="Autre">🧾 Autre</option>
              </select>
            </div>

            {splitRule === 'custom' && (
              <div className="form-row col-span-2 bg-slate-900/60 p-3 rounded-xl border border-slate-700">
                <div className="form-group">
                  <label className="text-sky-300">Part Legaults ($)</label>
                  <input 
                    type="number" 
                    step="0.01" 
                    value={customLegaultsShare} 
                    onChange={(e) => setCustomLegaultsShare(e.target.value)} 
                  />
                </div>
                <div className="form-group">
                  <label className="text-emerald-300">Part Synettes ($)</label>
                  <input 
                    type="number" 
                    step="0.01" 
                    value={customSynettesShare} 
                    onChange={(e) => setCustomSynettesShare(e.target.value)} 
                  />
                </div>
              </div>
            )}

            <div className="form-group">
              <label>Date</label>
              <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
            </div>

            <div className="form-group">
              <label>Note additionnelle (optionnel)</label>
              <input 
                type="text" 
                placeholder="Ex: Facture gardée dans le condo..."
                value={note}
                onChange={(e) => setNote(e.target.value)}
              />
            </div>

            <div className="form-actions col-span-2 flex justify-end gap-3 mt-2 pt-2 border-t border-slate-700">
              <button type="button" className="btn-secondary" onClick={() => setShowAddForm(false)}>
                Annuler
              </button>
              <button type="submit" className="btn-primary">
                Enregistrer la dépense
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Expenses History */}
      <div className="glass-card expenses-list-card">
        <div className="list-top-bar">
          <div className="flex items-center gap-2">
            <Receipt size={20} className="text-sky-400" />
            <h3 className="text-lg font-bold text-white">Historique des Dépenses ({filteredExpenses.length})</h3>
          </div>

          <div className="category-filter-pills">
            {['ALL', 'Épicerie', 'Essence & Transport', 'Restaurant & Bar', 'Activités & Ski'].map((cat) => (
              <button
                key={cat}
                className={`cat-pill ${categoryFilter === cat ? 'active' : ''}`}
                onClick={() => setCategoryFilter(cat)}
              >
                {cat === 'ALL' ? 'Toutes' : cat}
              </button>
            ))}
          </div>
        </div>

        {filteredExpenses.length === 0 ? (
          <div className="empty-expenses-state p-8 text-center">
            <Receipt size={40} className="text-slate-600 mx-auto mb-2" />
            <p className="text-slate-400">Aucune dépense enregistrée dans cette catégorie.</p>
          </div>
        ) : (
          <>
            {/* 1. MOBILE CARDS VIEW (Clean, touch-friendly, no squished columns) */}
            <div className="expenses-mobile-cards-list">
              {filteredExpenses.map((exp) => (
                <div key={exp.id} className="expense-mobile-card">
                  <div className="expense-card-top-row">
                    <div className="cat-badge">
                      {getCategoryIcon(exp.category)}
                      <span>{exp.category}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-slate-400">{exp.date}</span>
                      <button
                        className="btn-action-icon hover:text-rose-400"
                        title="Supprimer la dépense"
                        onClick={() => handleDeleteExpense(exp.id)}
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>

                  <div className="expense-card-main-info">
                    <h4 className="expense-card-title">{exp.title}</h4>
                    {exp.note && <p className="expense-card-note">{exp.note}</p>}
                  </div>

                  <div className="expense-card-bottom-row">
                    <div className="expense-card-amount">
                      {formatCurrency(exp.amount)}
                    </div>
                    <div className="expense-card-tags">
                      <span className={`family-tag ${exp.paidBy.toLowerCase()}`}>
                        Payé par {exp.paidBy}
                      </span>
                      <span className="expense-split-badge">
                        {exp.splitRule === '50-50' && `50% (${formatCurrency(exp.legaultsShare)}) ch.`}
                        {exp.splitRule === '100-legaults' && '100% Legaults'}
                        {exp.splitRule === '100-synettes' && '100% Synettes'}
                        {exp.splitRule === 'custom' && `L: ${formatCurrency(exp.legaultsShare)} | S: ${formatCurrency(exp.synettesShare)}`}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* 2. DESKTOP SPREADSHEET TABLE (Visible on tablets and desktops > 768px) */}
            <div className="expenses-desktop-table expenses-table-wrapper">
              <table className="expenses-table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Dépense</th>
                    <th>Catégorie</th>
                    <th>Montant</th>
                    <th>Payé par</th>
                    <th>Partage</th>
                    <th className="text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredExpenses.map((exp) => (
                    <tr key={exp.id} className="expense-row">
                      <td className="text-slate-400 whitespace-nowrap text-sm">
                        {exp.date}
                      </td>

                      <td>
                        <div className="font-semibold text-white">{exp.title}</div>
                        {exp.note && <div className="text-xs text-slate-400">{exp.note}</div>}
                      </td>

                      <td>
                        <div className="cat-badge">
                          {getCategoryIcon(exp.category)}
                          <span>{exp.category}</span>
                        </div>
                      </td>

                      <td className="font-bold text-white text-base">
                        {formatCurrency(exp.amount)}
                      </td>

                      <td>
                        <span className={`family-tag ${exp.paidBy.toLowerCase()}`}>
                          {exp.paidBy}
                        </span>
                      </td>

                      <td>
                        <div className="text-xs text-slate-300">
                          {exp.splitRule === '50-50' && (
                            <span>50% ({formatCurrency(exp.legaultsShare)}) ch.</span>
                          )}
                          {exp.splitRule === '100-legaults' && (
                            <span className="text-sky-300">100% Legaults</span>
                          )}
                          {exp.splitRule === '100-synettes' && (
                            <span className="text-emerald-300">100% Synettes</span>
                          )}
                          {exp.splitRule === 'custom' && (
                            <span>L: {formatCurrency(exp.legaultsShare)} | S: {formatCurrency(exp.synettesShare)}</span>
                          )}
                        </div>
                      </td>

                      <td className="text-right">
                        <button
                          className="btn-action-icon hover:text-rose-400"
                          title="Supprimer la dépense"
                          onClick={() => handleDeleteExpense(exp.id)}
                        >
                          <Trash2 size={15} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
