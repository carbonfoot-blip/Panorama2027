/**
 * Données initiales pour Panorama 2027
 * Basé sur le classeur de voyage officiel et les réservations réelles
 */

export const TRIP_METADATA = {
  title: "PANORAMA 2027",
  subtitle: "Voyage de Ski dans les Rocheuses canadiennes",
  destination: "Panorama Mountain Resort, Colombie-Britannique (BC)",
  googlePhotosAlbumUrl: "https://photos.app.goo.gl/Kd56KBaJLfL7yuW8A",
  trailMapUrl: "https://issuu.com/panoramamountainvillage/docs/panorama_w2024-25_trail_map?fr=xIAEoAT3_MzMz",
  villageMapUrl: "https://www.panoramaresort.com/assets/Maps/2025_Maps_VilliageMap_Winter_Horizontal_WEB.jpg",
  dates: "2 mars au 9 mars 2027",
  duration: "7 nuits / 8 jours",
  startDate: "2027-03-02T09:00:00",
  endDate: "2027-03-09T18:00:00",
  families: [
    { id: "legaults", name: "Les Legaults", color: "#0284c7" },
    { id: "synettes", name: "Les Synettes", color: "#10b981" }
  ],
  lodging: {
    name: "Aisling Baile - Condo 130",
    address: "2035 Panorama Drive #130, Panorama, BC V0A 1T0",
    reservationId: "71859146",
    website: "https://www.aislingbaile.com/",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=2035+Panorama+Drive+Panorama+BC+Canada"
  },
  mountainStats: {
    verticalDrop: "1,300 m (4,265 ft)",
    terrain: "2,975 acres",
    runsCount: "135+ pistes",
    bowls: "Taynton Bowl & Monster X Cat-Skiing",
    pools: "Panorama Springs Pools (Inclus)",
    snowfall: "500+ cm annuels"
  }
};

export const INITIAL_BUDGET_ITEMS = [
  {
    id: "item-1",
    item: "Vols",
    prixTotal: 1628.00,
    legaults: 1628.00,
    synettes: 0.00,
    statut: "Payé",
    category: "Vols",
    note: "# confirmation: GFVTXR (felixantoinelegault@gmail.com)",
    confirmation: "GFVTXR",
    email: "felixantoinelegault@gmail.com",
    links: []
  },
  {
    id: "item-2",
    item: "Vols",
    prixTotal: 814.00,
    legaults: 0.00,
    synettes: 814.00,
    statut: "Payé",
    category: "Vols",
    note: "(sylvie.lescuisinistes@gmail.com)",
    confirmation: "",
    email: "sylvie.lescuisinistes@gmail.com",
    links: []
  },
  {
    id: "item-3",
    item: "Lodging 2mar-9mar",
    prixTotal: 3355.75,
    legaults: 1677.88,
    synettes: 1677.88,
    statut: "Booké, pas payé",
    category: "Hébergement",
    note: "Reservation ID: 71859146 | 2035 Panorama Drive 130",
    confirmation: "71859146",
    address: "2035 Panorama Drive 130",
    links: [
      { label: "Site Aisling Baile", url: "https://www.aislingbaile.com/" },
      { label: "Google Maps", url: "https://www.google.com/maps/search/?api=1&query=2035+Panorama+Drive+Panorama+BC+Canada" }
    ]
  },
  {
    id: "item-4",
    item: "Ski tickets Adultes (5 jours)",
    prixTotal: 942.90,
    legaults: 942.90,
    synettes: 0.00,
    statut: "Payé",
    category: "Billets de Ski",
    note: "Your order number is PR262369",
    confirmation: "PR262369",
    links: [
      { label: "Site Panorama Ski", url: "https://www.panoramaresort.com/" }
    ]
  },
  {
    id: "item-5",
    item: "Ski tickets Enfants (5 jours)",
    prixTotal: 480.90,
    legaults: 480.90,
    synettes: 0.00,
    statut: "Payé",
    category: "Billets de Ski",
    note: "Your order number is PR262369",
    confirmation: "PR262369",
    links: [
      { label: "Site Panorama Ski", url: "https://www.panoramaresort.com/" }
    ]
  },
  {
    id: "item-6",
    item: "Ski tickets Seniors (5 jours)",
    prixTotal: 795.90,
    legaults: 0.00,
    synettes: 795.90,
    statut: "À acheter",
    category: "Billets de Ski",
    note: "Panorama SnowCard 2026/27 on sale now | Panorama Mountain Resort",
    confirmation: "",
    links: [
      { label: "Panorama SnowCard 2026/27", url: "https://www.panoramaresort.com/" }
    ]
  },
  {
    id: "item-7",
    item: "Location Voiture #1",
    prixTotal: 272.00,
    legaults: 0.00,
    synettes: 272.00,
    statut: "Booké, pas payé",
    category: "Transport",
    note: "Hertz (Rav4) - L781E8F4020 (felixantoinelegault@gmail.com)",
    confirmation: "L781E8F4020",
    email: "felixantoinelegault@gmail.com",
    vehicle: "Hertz (Rav4)",
    links: []
  },
  {
    id: "item-8",
    item: "Location Voiture #2",
    prixTotal: 272.00,
    legaults: 272.00,
    synettes: 0.00,
    statut: "Booké, pas payé",
    category: "Transport",
    note: "(claude.lescuisinistes@gmail.com)",
    confirmation: "",
    email: "claude.lescuisinistes@gmail.com",
    links: []
  }
];

export const INITIAL_EXPENSES = [
  {
    id: "exp-1",
    title: "Grosse épicerie de base (Invermere)",
    amount: 345.50,
    paidBy: "Legaults",
    splitRule: "50-50",
    legaultsShare: 172.75,
    synettesShare: 172.75,
    category: "Épicerie",
    date: "2027-03-02",
    note: "Aliments pour déjeuners, collations de pistes et soupers au condo"
  },
  {
    id: "exp-2",
    title: "Plein d'essence Calgary -> Panorama (Rav4 #1)",
    amount: 78.40,
    paidBy: "Synettes",
    splitRule: "50-50",
    legaultsShare: 39.20,
    synettesShare: 39.20,
    category: "Essence & Transport",
    date: "2027-03-02",
    note: "Trajet aéroport de Calgary à la station"
  },
  {
    id: "exp-3",
    title: "Apéro & nachos au T-Bar & Grill",
    amount: 112.00,
    paidBy: "Legaults",
    splitRule: "50-50",
    legaultsShare: 56.00,
    synettesShare: 56.00,
    category: "Restaurant & Bar",
    date: "2027-03-03",
    note: "Après-ski au pied des pistes"
  }
];

export const INITIAL_PHOTOS = [
  {
    id: "photo-1",
    title: "Vue panoramique du sommet de Panorama",
    category: "Montagne",
    url: "https://images.unsplash.com/photo-1551524559-8af4e6624178?auto=format&fit=crop&w=1200&q=80",
    caption: "Le majestueux Taynton Bowl sous un ciel bleu éclatant des Rocheuses",
    author: "Panorama Resort"
  },
  {
    id: "photo-2",
    title: "Le village de Panorama au crépuscule",
    category: "Village",
    url: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1200&q=80",
    caption: "Les chalets illuminés et les pistes éclairées en soirée",
    author: "Panorama Resort"
  },
  {
    id: "photo-3",
    title: "Poudreuse fraîche dans les sous-bois",
    category: "Ski",
    url: "https://images.unsplash.com/photo-1565992441121-4367c2967103?auto=format&fit=crop&w=1200&q=80",
    caption: "Des virages parfaits dans la neige sèche de Colombie-Britannique",
    author: "Ski BC"
  },
  {
    id: "photo-4",
    title: "Piscines chaudes Panorama Springs Pools",
    category: "Chalet & Détente",
    url: "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=1200&q=80",
    caption: "Bain chaud extérieur avec vue sur la montagne enneigée après une grosse journée de ski",
    author: "Panorama Springs"
  },
  {
    id: "photo-5",
    title: "Ambiance chaleureuse au condo",
    category: "Chalet & Détente",
    url: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80",
    caption: "Soirée au coin du feu à Aisling Baile",
    author: "Famille"
  },
  {
    id: "photo-6",
    title: "Descente en famille sous le soleil",
    category: "Ski",
    url: "https://images.unsplash.com/photo-1605540436563-5bca919ae766?auto=format&fit=crop&w=1200&q=80",
    caption: "Pistes larges damées à la perfection pour carver en gang",
    author: "Ski BC"
  }
];

export const CHRISTMAS_SURPRISE_DATA = {
  revealTitle: "JOYEUX NOËL LES GARS ! 🎄⛷️",
  secretDestination: "PANORAMA MOUNTAIN RESORT",
  datesText: "Du 2 au 9 mars 2027",
  passengers: "Les Frères Legaults & la Famille",
  flightDetails: "Montréal (YUL) ✈️ Calgary (YYC) + Traversée des Rocheuses",
  highlights: [
    "7 Nuits au condo de rêve Aisling Baile au pied des pistes (Ski-in / Ski-out)",
    "5 Jours de ski illimité sur l'un des plus grands dénivelés d'Amérique du Nord (1,300 m)",
    "Piscines thermales d'eau chaude Panorama Springs extérieures en plein hiver",
    "Poudreuse des Rocheuses, Taynton Bowl & sous-bois épiques",
    "Grosse virée en famille avec les Legaults & les Synettes !"
  ],
  defaultLetter: `Les gars,\n\nCette année, pas de gabelle ordinaire sous le sapin : on vous amène vivre la grande aventure des Rocheuses canadiennes !\n\nPréparez vos skis, vos casques et votre esprit de gang. En mars 2027, direction Panorama en Colombie-Britannique pour 8 jours de descentes légendaires, de bains chauds dans la neige et de pur plaisir ensemble.\n\nBon ski et Joyeux Noël ! 🏔️❄️`
};

export const INITIAL_TEASERS = [
  {
    id: "teaser-1",
    author: "Félix",
    authorRole: "Organisateur",
    title: "Tempête de 35 cm au Taynton Bowl ce matin !",
    content: "Regardez les conditions actuelles au sommet du Summit Quad ! La neige est tellement légère qu'on flotte littéralement dedans. Préparez vos cuisses pour mars 2027, on va se régaler en gang !",
    category: "Poudreuse fraîche ❄️",
    date: "Aujourd'hui",
    imageUrl: "https://images.unsplash.com/photo-1551524559-8af4e6624178?auto=format&fit=crop&w=1200&q=80",
    likes: { fire: 8, snow: 12, ski: 6, heart: 9 }
  },
  {
    id: "teaser-2",
    author: "Papa",
    authorRole: "Chef Après-Ski",
    title: "Après-ski officiel : Panorama Springs Pools sous la neige",
    content: "Le condo Aisling Baile nous donne un accès direct à pied aux immenses bassins d'eau thermale chaude extérieure. Bière à la main, vapeur d'eau et vue sur les pistes illuminées le soir !",
    category: "Détente & Chalet 🍻",
    date: "Hier",
    imageUrl: "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=1200&q=80",
    likes: { fire: 15, snow: 4, ski: 3, heart: 11 }
  },
  {
    id: "teaser-3",
    author: "Félix",
    authorRole: "Organisateur",
    title: "Monster X : Le Cat-Skiing directement sur la montagne !",
    content: "Pour ceux qui veulent vivre l'expérience ultime, Panorama offre maintenant le Monster X Snowcat pour aller chercher des lignes vierges au fond des cuves sans avoir à marcher. Une folie pure !",
    category: "Aventure Ski 🎿",
    date: "Il y a 3 jours",
    imageUrl: "https://images.unsplash.com/photo-1565992441121-4367c2967103?auto=format&fit=crop&w=1200&q=80",
    likes: { fire: 10, snow: 7, ski: 14, heart: 5 }
  }
];

export const INITIAL_MEALS = {
  dejeuners: [
    { id: "m-dej-1", title: "Omelettes complètes, bacon croustillant & rôties", notes: "Le classique des matins de poudreuse" },
    { id: "m-dej-2", title: "Bagels au saumon fumé & fromage à la crème", notes: "Rapide avant la première remontée mécanique à 9h" },
    { id: "m-dej-3", title: "Grosse pile de crêpes & vrai sirop d'érable", notes: "Déjeuner réconfortant du dimanche" },
    { id: "m-dej-4", title: "Yogourt grec, granola, bananes & petits fruits", notes: "Option énergie légère" }
  ],
  diners: [
    { id: "m-din-1", title: "Lunchs sur les pistes (Sandwiches jambon/fromage & crudités)", notes: "Dans les sacs à dos pour maximiser le ski" },
    { id: "m-din-2", title: "Gros chili réconfortant réchauffé au condo", notes: "Parfait pour un retour au chaud à midi" },
    { id: "m-din-3", title: "Soupe repas fumante & Grilled Cheese gourmets", notes: "Simple, chaud et rapide" },
    { id: "m-din-4", title: "Dîner au chalet du sommet (Hutte Summit Quad)", notes: "Un midi sur la montagne !" }
  ],
  soupers: [
    { id: "m-soup-1", title: "Soirée Raclette montagnarde & charcuteries", notes: "Patates grelots, cornichons, fromage fondu & vin rouge" },
    { id: "m-soup-2", title: "Spaghetti bolognaise maison de la mama & pain à l'ail", notes: "Plein de glucides pour recharger les jambes" },
    { id: "m-soup-3", title: "Steaks sur le grill & grosses patates au four", notes: "Souper festif de milieu de semaine" },
    { id: "m-soup-4", title: "Burgers gourmets au condo avec frites croustillantes", notes: "Tout le monde monte son burger à son goût" },
    { id: "m-soup-5", title: "Fiesta Tacos, salsa fraîche & guacamole", notes: "Soirée conviviale et colorée" },
    { id: "m-soup-6", title: "Soirée Restaurant au village (T-Bar & Grill)", notes: "Congé de vaisselle pour tout le monde !" }
  ]
};

export const INITIAL_GROCERY_ITEMS = [
  // Fruits & Légumes
  { id: "g-1", section: "Fruits & Légumes", item: "Bananes", quantity: "2 gros régimes", meal: "Déjeuners & Collations", checked: false },
  { id: "g-2", section: "Fruits & Légumes", item: "Pommes Honeycrisp", quantity: "1 sac (3 lbs)", meal: "Collations pistes", checked: false },
  { id: "g-3", section: "Fruits & Légumes", item: "Avocats mûrs", quantity: "6", meal: "Fiesta Tacos", checked: false },
  { id: "g-4", section: "Fruits & Légumes", item: "Patates grelots", quantity: "2 sacs", meal: "Raclette montagnarde", checked: false },
  { id: "g-5", section: "Fruits & Légumes", item: "Oignons jaunes & rouges", quantity: "1 filet", meal: "Tous les soupers", checked: false },
  { id: "g-6", section: "Fruits & Légumes", item: "Poivrons de couleur (trio)", quantity: "2 paquets", meal: "Tacos & Omelettes", checked: false },
  { id: "g-7", section: "Fruits & Légumes", item: "Salade romaine & épinards", quantity: "3 cœurs", meal: "Accompagnements", checked: false },

  // Viandes & Poissons
  { id: "g-8", section: "Viandes & Poissons", item: "Bacon de porc fumé", quantity: "3 paquets (375g)", meal: "Déjeuners", checked: false },
  { id: "g-9", section: "Viandes & Poissons", item: "Boeuf haché mi-maigre", quantity: "2 kg", meal: "Spaghetti & Tacos", checked: false },
  { id: "g-10", section: "Viandes & Poissons", item: "Assortiment charcuteries (Prosciutto, saucisson)", quantity: "3 paquets", meal: "Raclette montagnarde", checked: false },
  { id: "g-11", section: "Viandes & Poissons", item: "Poitrines ou pilons de poulet", quantity: "1.5 kg", meal: "Soupers", checked: false },
  { id: "g-12", section: "Viandes & Poissons", item: "Saumon fumé", quantity: "2 paquets (300g)", meal: "Bagels matin", checked: false },
  { id: "g-13", section: "Viandes & Poissons", item: "Viande à fondue / Raclette", quantity: "1 kg", meal: "Raclette", checked: false },

  // Allées (Épicerie sèche & Garde-manger)
  { id: "g-14", section: "Allées", item: "Oeufs extra gros", quantity: "2 douzaines (30)", meal: "Déjeuners & Crêpes", checked: false },
  { id: "g-15", section: "Allées", item: "Pain tranché pour rôties & sandwiches", quantity: "3 miches", meal: "Déjeuners & Dîners", checked: false },
  { id: "g-16", section: "Allées", item: "Bagels frais", quantity: "2 sacs (12)", meal: "Déjeuners", checked: false },
  { id: "g-17", section: "Allées", item: "Pâtes spaghetti / penne", quantity: "3 boîtes (900g)", meal: "Soirée Spaghetti", checked: false },
  { id: "g-18", section: "Allées", item: "Sauce tomate / marinara de qualité", quantity: "3 gros pots", meal: "Soirée Spaghetti", checked: false },
  { id: "g-19", section: "Allées", item: "Café moulu pour cafetière condo", quantity: "2 sacs", meal: "Café matinal", checked: false },
  { id: "g-20", section: "Allées", item: "Sirop d'érable pur", quantity: "1 conserve / pot", meal: "Crêpes", checked: false },
  { id: "g-21", section: "Allées", item: "Fromage à Raclette tranché", quantity: "3 paquets (800g)", meal: "Raclette montagnarde", checked: false },
  { id: "g-22", section: "Allées", item: "Beurre de pinotte & Confiture", quantity: "1 pot ch.", meal: "Déjeuners", checked: false },
  { id: "g-23", section: "Allées", item: "Chips, bretzels, salsa & trempette", quantity: "4 sacs", meal: "Après-ski condo", checked: false },
  { id: "g-24", section: "Allées", item: "Barres tendres & noix mélangées", quantity: "2 grosses boîtes", meal: "Poches de manteau (ski)", checked: false },

  // Congelé
  { id: "g-25", section: "Congelé", item: "Pizza surgelée de secours", quantity: "2", meal: "Soir d'arrivée / dépannage", checked: false },
  { id: "g-26", section: "Congelé", item: "Fruits congelés (bleuets, fraises)", quantity: "1 gros sac", meal: "Smoothies & crêpes", checked: false },
  { id: "g-27", section: "Congelé", item: "Frites pour burgers", quantity: "1 gros sac", meal: "Burgers gourmets", checked: false },

  // Alcool & Breuvages
  { id: "g-28", section: "Alcool", item: "Caisses de bière locale BC / microbrasserie", quantity: "2 caisses de 24", meal: "Après-ski condo", checked: false },
  { id: "g-29", section: "Alcool", item: "Bouteilles de vin rouge (Cabernet / Pinot)", quantity: "4 bouteilles", meal: "Soupers Raclette & Steaks", checked: false },
  { id: "g-30", section: "Alcool", item: "Bouteilles de vin blanc (Sauvignon / Pinot Gris)", quantity: "3 bouteilles", meal: "Apéros & soupers", checked: false },
  { id: "g-31", section: "Alcool", item: "Eau pétillante (Bubly / Perrier)", quantity: "2 caisses (24 cannettes)", meal: "Hydratation", checked: false },
  { id: "g-32", section: "Alcool", item: "Jus d'orange pur sans pulpe", quantity: "2 contenants (1.75L)", meal: "Déjeuners", checked: false }
];
