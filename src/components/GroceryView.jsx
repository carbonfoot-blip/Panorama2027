import React, { useState } from 'react';
import { 
  ShoppingBag, UtensilsCrossed, Plus, Trash2, Edit2, Check, 
  X, Filter, CheckCircle2, Apple, Beef, Package, Snowflake, Wine, Coffee
} from 'lucide-react';
import { INITIAL_MEALS, INITIAL_GROCERY_ITEMS } from '../data/tripData';
import { useSyncedData } from '../services/db';

export default function GroceryView() {
  const [meals, setMeals] = useSyncedData('meals', INITIAL_MEALS);
  const [groceryItems, setGroceryItems] = useSyncedData('grocery', INITIAL_GROCERY_ITEMS);

  const [activeMealTab, setActiveMealTab] = useState('soupers'); // 'dejeuners' | 'diners' | 'soupers'
  const [sectionFilter, setSectionFilter] = useState('ALL');
  const [onlyUnchecked, setOnlyUnchecked] = useState(false);

  // Modals state
  const [showAddMealModal, setShowAddMealModal] = useState(false);
  const [newMeal, setNewMeal] = useState({ title: '', notes: '', category: 'soupers' });

  const [showAddGroceryModal, setShowAddGroceryModal] = useState(false);
  const [newGroceryItem, setNewGroceryItem] = useState({
    section: 'Fruits & Légumes',
    item: '',
    quantity: '1',
    meal: ''
  });

  const [editingItem, setEditingItem] = useState(null);

  // Meal Handlers
  const handleAddMeal = (e) => {
    e.preventDefault();
    if (!newMeal.title) return;

    const mealObj = {
      id: `meal-${Date.now()}`,
      title: newMeal.title,
      notes: newMeal.notes
    };

    const targetCat = newMeal.category || activeMealTab;
    setMeals({
      ...meals,
      [targetCat]: [...(meals[targetCat] || []), mealObj]
    });

    setNewMeal({ title: '', notes: '', category: 'soupers' });
    setShowAddMealModal(false);
  };

  const handleDeleteMeal = (cat, id) => {
    if (window.confirm("Supprimer cette idée de repas ?")) {
      setMeals({
        ...meals,
        [cat]: meals[cat].filter(m => m.id !== id)
      });
    }
  };

  // Grocery Handlers
  const handleToggleCheck = (id) => {
    setGroceryItems(groceryItems.map(item => {
      if (item.id === id) {
        return { ...item, checked: !item.checked };
      }
      return item;
    }));
  };

  const handleAddGroceryItem = (e) => {
    e.preventDefault();
    if (!newGroceryItem.item) return;

    const created = {
      id: `g-${Date.now()}`,
      section: newGroceryItem.section,
      item: newGroceryItem.item,
      quantity: newGroceryItem.quantity || '1',
      meal: newGroceryItem.meal || 'Général',
      checked: false
    };

    setGroceryItems([...groceryItems, created]);
    setNewGroceryItem({
      section: 'Fruits & Légumes',
      item: '',
      quantity: '1',
      meal: ''
    });
    setShowAddGroceryModal(false);
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    if (!editingItem || !editingItem.item) return;

    setGroceryItems(groceryItems.map(item => {
      if (item.id === editingItem.id) {
        return editingItem;
      }
      return item;
    }));

    setEditingItem(null);
  };

  const handleDeleteGroceryItem = (id) => {
    if (window.confirm("Supprimer cet article de la liste ?")) {
      setGroceryItems(groceryItems.filter(i => i.id !== id));
      if (editingItem?.id === id) setEditingItem(null);
    }
  };

  // Filtered Grocery list
  const filteredItems = groceryItems.filter(item => {
    if (sectionFilter !== 'ALL' && item.section !== sectionFilter) return false;
    if (onlyUnchecked && item.checked) return false;
    return true;
  });

  const totalItems = groceryItems.length;
  const checkedCount = groceryItems.filter(i => i.checked).length;
  const progressPercent = Math.round((checkedCount / (totalItems || 1)) * 100);

  const getSectionIcon = (sec) => {
    switch (sec) {
      case 'Fruits & Légumes': return <Apple size={14} className="text-emerald-400" />;
      case 'Viandes & Poissons': return <Beef size={14} className="text-rose-400" />;
      case 'Allées': return <Package size={14} className="text-amber-400" />;
      case 'Congelé': return <Snowflake size={14} className="text-sky-400" />;
      case 'Alcool': return <Wine size={14} className="text-purple-400" />;
      default: return <ShoppingBag size={14} className="text-slate-400" />;
    }
  };

  return (
    <div className="grocery-view">
      {/* View Header */}
      <div className="view-header-bar">
        <div>
          <div className="section-badge">
            <UtensilsCrossed size={14} />
            <span>Organisation Pré-Voyage</span>
          </div>
          <h1 className="section-title">Menu &amp; Liste d'Épicerie</h1>
          <p className="section-desc">
            Planifiez les déjeuners, lunchs et soupers au condo, puis bâtissez la liste d'épicerie pour arriver prêts au supermarché avant de monter à la station !
          </p>
        </div>

        <div className="header-actions-group">
          <button className="btn-secondary" onClick={() => setShowAddMealModal(true)}>
            <Plus size={16} />
            <span>Ajouter une idée repas</span>
          </button>
          <button className="btn-primary" onClick={() => setShowAddGroceryModal(true)}>
            <ShoppingBag size={18} />
            <span>Ajouter un article épicerie</span>
          </button>
        </div>
      </div>

      {/* ======================================================================= */}
      {/* 1. SECTION IDÉES DE REPAS (MENU DU SÉJOUR)                               */}
      {/* ======================================================================= */}
      <div className="glass-card meals-section-card mb-8">
        <div className="meals-section-header">
          <div className="flex items-center gap-2.5">
            <div className="meal-icon-wrapper">
              <UtensilsCrossed size={22} className="text-amber-400" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">Idées de Repas au Condo</h3>
              <p className="text-xs text-slate-400">Ce qu'on mange pour recharger les batteries après une journée de ski !</p>
            </div>
          </div>

          {/* Meal Category Tabs */}
          <div className="meal-tab-buttons">
            <button 
              className={`meal-tab-btn ${activeMealTab === 'dejeuners' ? 'active' : ''}`}
              onClick={() => setActiveMealTab('dejeuners')}
            >
              <span>🍳 Déjeuners ({meals?.dejeuners?.length || 0})</span>
            </button>
            <button 
              className={`meal-tab-btn ${activeMealTab === 'diners' ? 'active' : ''}`}
              onClick={() => setActiveMealTab('diners')}
            >
              <span>🥪 Dîners &amp; Pistes ({meals?.diners?.length || 0})</span>
            </button>
            <button 
              className={`meal-tab-btn ${activeMealTab === 'soupers' ? 'active' : ''}`}
              onClick={() => setActiveMealTab('soupers')}
            >
              <span>🍲 Soupers ({meals?.soupers?.length || 0})</span>
            </button>
          </div>
        </div>

        {/* Meal Cards Grid */}
        <div className="meals-grid mt-4">
          {(meals?.[activeMealTab] || []).map((meal) => (
            <div key={meal.id} className="meal-card">
              <div className="meal-card-content">
                <h4 className="meal-title">{meal.title}</h4>
                {meal.notes && <p className="meal-notes">{meal.notes}</p>}
              </div>
              <button 
                className="meal-delete-btn" 
                onClick={() => handleDeleteMeal(activeMealTab, meal.id)}
                title="Supprimer ce repas"
              >
                <Trash2 size={14} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* ======================================================================= */}
      {/* 2. SECTION LISTE D'ÉPICERIE (COLLABORATIVE)                               */}
      {/* ======================================================================= */}
      <div className="glass-card grocery-list-card">
        {/* Top Control Bar */}
        <div className="grocery-top-bar">
          <div className="flex items-center gap-3">
            <div className="grocery-icon-badge">
              <ShoppingBag size={22} className="text-sky-400" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">
                Liste d'Épicerie Commune ({filteredItems.length})
              </h3>
              <p className="text-xs text-slate-400">
                {checkedCount} sur {totalItems} articles achetés ({progressPercent}%)
              </p>
            </div>
          </div>

          <div className="grocery-quick-actions">
            <label className="toggle-unchecked-label">
              <input 
                type="checkbox" 
                checked={onlyUnchecked} 
                onChange={(e) => setOnlyUnchecked(e.target.checked)}
              />
              <span>À acheter seulement</span>
            </label>
            <button className="btn-primary btn-sm" onClick={() => setShowAddGroceryModal(true)}>
              <Plus size={16} />
              <span>Ajouter un item</span>
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="grocery-progress-track">
          <div 
            className="grocery-progress-fill" 
            style={{ width: `${progressPercent}%` }}
          ></div>
        </div>

        {/* Section Filters */}
        <div className="grocery-filter-pills-bar">
          <div className="filter-pill-list">
            {[
              { id: 'ALL', label: 'Toutes les sections' },
              { id: 'Fruits & Légumes', label: '🍎 Fruits & Légumes' },
              { id: 'Viandes & Poissons', label: '🥩 Viandes & Poissons' },
              { id: 'Allées', label: '🥫 Allées & Garde-Manger' },
              { id: 'Congelé', label: '🧊 Congelé' },
              { id: 'Alcool', label: '🍺 Alcool & Boissons' }
            ].map((sec) => (
              <button
                key={sec.id}
                className={`cat-pill ${sectionFilter === sec.id ? 'active' : ''}`}
                onClick={() => setSectionFilter(sec.id)}
              >
                <span>{sec.label}</span>
                <span className="count-tag">
                  ({sec.id === 'ALL' ? groceryItems.length : groceryItems.filter(i => i.section === sec.id).length})
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Desktop Table View (Hidden on mobile) */}
        <div className="grocery-desktop-table-wrapper">
          <table className="grocery-table">
            <thead>
              <tr>
                <th className="w-12 text-center">Fait</th>
                <th>Section</th>
                <th>Item / Article</th>
                <th>Quantité</th>
                <th>Repas associé</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.map((item) => (
                <tr key={item.id} className={`grocery-row ${item.checked ? 'row-checked' : ''}`}>
                  <td className="text-center">
                    <button 
                      className={`grocery-checkbox ${item.checked ? 'checked' : ''}`}
                      onClick={() => handleToggleCheck(item.id)}
                      title={item.checked ? "Marquer à acheter" : "Marquer comme acheté"}
                    >
                      {item.checked && <Check size={14} className="text-white" />}
                    </button>
                  </td>

                  <td>
                    <span className="grocery-section-badge">
                      {getSectionIcon(item.section)}
                      <span>{item.section}</span>
                    </span>
                  </td>

                  <td>
                    <span className={`grocery-item-name ${item.checked ? 'item-struck' : ''}`}>
                      {item.item}
                    </span>
                  </td>

                  <td className="grocery-quantity-cell">
                    <span className="quantity-pill">{item.quantity}</span>
                  </td>

                  <td>
                    <span className="grocery-meal-tag">
                      {item.meal || '—'}
                    </span>
                  </td>

                  <td className="text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button 
                        className="btn-action-icon hover:text-sky-400"
                        onClick={() => setEditingItem(item)}
                        title="Modifier l'article"
                      >
                        <Edit2 size={14} />
                      </button>
                      <button 
                        className="btn-action-icon hover:text-rose-400"
                        onClick={() => handleDeleteGroceryItem(item.id)}
                        title="Supprimer l'article"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards View (Exclusively optimized for iPhone) */}
        <div className="grocery-mobile-cards-list">
          {filteredItems.map((item) => (
            <div key={item.id} className={`grocery-mobile-card ${item.checked ? 'card-checked' : ''}`}>
              <div className="flex items-start gap-3">
                <button 
                  className={`grocery-checkbox mobile-check ${item.checked ? 'checked' : ''}`}
                  onClick={() => handleToggleCheck(item.id)}
                >
                  {item.checked && <Check size={16} className="text-white" />}
                </button>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="grocery-section-badge">
                      {getSectionIcon(item.section)}
                      <span>{item.section}</span>
                    </span>
                    <span className="quantity-pill">{item.quantity}</span>
                  </div>

                  <h4 className={`grocery-mobile-item-title ${item.checked ? 'item-struck' : ''}`}>
                    {item.item}
                  </h4>

                  {item.meal && (
                    <span className="grocery-meal-tag mt-1 inline-block">
                      🍽️ {item.meal}
                    </span>
                  )}
                </div>
              </div>

              <div className="grocery-mobile-card-actions">
                <button 
                  className="btn-secondary btn-sm flex-1 flex items-center justify-center gap-1"
                  onClick={() => setEditingItem(item)}
                >
                  <Edit2 size={13} />
                  <span>Modifier</span>
                </button>
                <button 
                  className="btn-action-icon hover:text-rose-400"
                  onClick={() => handleDeleteGroceryItem(item.id)}
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Meal Modal */}
      {showAddMealModal && (
        <div className="modal-overlay" onClick={() => setShowAddMealModal(false)}>
          <div className="modal-box glass-card" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-700">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <UtensilsCrossed size={20} className="text-amber-400" />
                <span>Ajouter une idée de repas</span>
              </h3>
              <button className="btn-action-icon" onClick={() => setShowAddMealModal(false)}>
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleAddMeal} className="space-y-4">
              <div className="form-group">
                <label>Moment du repas</label>
                <select 
                  value={newMeal.category} 
                  onChange={(e) => setNewMeal({ ...newMeal, category: e.target.value })}
                >
                  <option value="dejeuners">🍳 Déjeuners</option>
                  <option value="diners">🥪 Dîners &amp; Pistes</option>
                  <option value="soupers">🍲 Soupers au condo</option>
                </select>
              </div>

              <div className="form-group">
                <label>Nom du repas / Idée *</label>
                <input 
                  type="text" 
                  required
                  placeholder="Ex: Soirée Fondue chinoise / Pâtes carbonara..."
                  value={newMeal.title}
                  onChange={(e) => setNewMeal({ ...newMeal, title: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>Notes ou ingrédients clés</label>
                <input 
                  type="text" 
                  placeholder="Ex: Penser au bouillon, vin rouge et pain frais..."
                  value={newMeal.notes}
                  onChange={(e) => setNewMeal({ ...newMeal, notes: e.target.value })}
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-700">
                <button type="button" className="btn-secondary" onClick={() => setShowAddMealModal(false)}>
                  Annuler
                </button>
                <button type="submit" className="btn-primary">
                  Ajouter au menu
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Grocery Item Modal */}
      {showAddGroceryModal && (
        <div className="modal-overlay" onClick={() => setShowAddGroceryModal(false)}>
          <div className="modal-box glass-card" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-700">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <ShoppingBag size={20} className="text-sky-400" />
                <span>Ajouter à l'épicerie</span>
              </h3>
              <button className="btn-action-icon" onClick={() => setShowAddGroceryModal(false)}>
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleAddGroceryItem} className="space-y-4">
              <div className="form-grid grid grid-cols-2 gap-3">
                <div className="form-group">
                  <label>Section dans l'épicerie *</label>
                  <select 
                    value={newGroceryItem.section} 
                    onChange={(e) => setNewGroceryItem({ ...newGroceryItem, section: e.target.value })}
                  >
                    <option value="Fruits & Légumes">🍎 Fruits &amp; Légumes</option>
                    <option value="Viandes & Poissons">🥩 Viandes &amp; Poissons</option>
                    <option value="Allées">🥫 Allées &amp; Garde-manger</option>
                    <option value="Congelé">🧊 Congelé</option>
                    <option value="Alcool">🍺 Alcool &amp; Breuvages</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Quantité *</label>
                  <input 
                    type="text" 
                    required
                    placeholder="Ex: 2 sacs, 1 kg, 3 boîtes..."
                    value={newGroceryItem.quantity}
                    onChange={(e) => setNewGroceryItem({ ...newGroceryItem, quantity: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Nom de l'article / Item *</label>
                <input 
                  type="text" 
                  required
                  placeholder="Ex: Beurre, Lait 2%, Saumon fumé, Bières..."
                  value={newGroceryItem.item}
                  onChange={(e) => setNewGroceryItem({ ...newGroceryItem, item: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>Repas associé (optionnel)</label>
                <input 
                  type="text" 
                  placeholder="Ex: Déjeuners, Soirée Raclette, Après-ski..."
                  value={newGroceryItem.meal}
                  onChange={(e) => setNewGroceryItem({ ...newGroceryItem, meal: e.target.value })}
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-700">
                <button type="button" className="btn-secondary" onClick={() => setShowAddGroceryModal(false)}>
                  Annuler
                </button>
                <button type="submit" className="btn-primary">
                  Ajouter à la liste
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Grocery Item Modal */}
      {editingItem && (
        <div className="modal-overlay" onClick={() => setEditingItem(null)}>
          <div className="modal-box glass-card" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-700">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Edit2 size={20} className="text-sky-400" />
                <span>Modifier l'article</span>
              </h3>
              <button className="btn-action-icon" onClick={() => setEditingItem(null)}>
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="space-y-4">
              <div className="form-grid grid grid-cols-2 gap-3">
                <div className="form-group">
                  <label>Section</label>
                  <select 
                    value={editingItem.section} 
                    onChange={(e) => setEditingItem({ ...editingItem, section: e.target.value })}
                  >
                    <option value="Fruits & Légumes">🍎 Fruits &amp; Légumes</option>
                    <option value="Viandes & Poissons">🥩 Viandes &amp; Poissons</option>
                    <option value="Allées">🥫 Allées</option>
                    <option value="Congelé">🧊 Congelé</option>
                    <option value="Alcool">🍺 Alcool</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Quantité</label>
                  <input 
                    type="text" 
                    value={editingItem.quantity}
                    onChange={(e) => setEditingItem({ ...editingItem, quantity: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Nom de l'item</label>
                <input 
                  type="text" 
                  required
                  value={editingItem.item}
                  onChange={(e) => setEditingItem({ ...editingItem, item: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>Repas associé</label>
                <input 
                  type="text" 
                  value={editingItem.meal}
                  onChange={(e) => setEditingItem({ ...editingItem, meal: e.target.value })}
                />
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-slate-700">
                <button 
                  type="button" 
                  className="btn-secondary text-rose-400 hover:text-rose-300"
                  onClick={() => handleDeleteGroceryItem(editingItem.id)}
                >
                  <Trash2 size={16} />
                  <span>Supprimer</span>
                </button>

                <div className="flex items-center gap-2">
                  <button type="button" className="btn-secondary" onClick={() => setEditingItem(null)}>
                    Annuler
                  </button>
                  <button type="submit" className="btn-primary">
                    Enregistrer
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
