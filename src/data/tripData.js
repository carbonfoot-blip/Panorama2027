/**
 * Données initiales pour Panorama 2027
 * Basé sur le classeur de voyage officiel et les réservations réelles
 */

export const TRIP_METADATA = {
  title: "PANORAMA 2027",
  subtitle: "Voyage de Ski dans les Rocheuses canadiennes",
  destination: "Panorama Mountain Resort, Colombie-Britannique (BC)",
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
    hostawayPortal: "https://guest-portal.hostaway.com/71859146/buixnwc-",
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
      { label: "Portail Invité Hostaway", url: "https://guest-portal.hostaway.com/71859146/buixnwc-" },
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
