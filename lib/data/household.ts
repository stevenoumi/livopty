/**
 * Demo data for the "Martin" household, used by every screen until the
 * Supabase tables exist. Shapes are the ones the screens consume.
 */
import {
  Apple,
  Armchair,
  Backpack,
  Baby,
  Banknote,
  Building2,
  Car,
  Clapperboard,
  DoorOpen,
  Ellipsis,
  Gamepad2,
  Gift,
  HeartPulse,
  House,
  Milk,
  Pill,
  Plane,
  ShoppingBasket,
  ShoppingCart,
  Siren,
  SprayCan,
  TrainFront,
  Utensils,
  Wheat,
  Wifi,
  Bike,
  Zap,
  type LucideIcon,
} from "lucide-react-native";
import type { CategoryColor } from "~/lib/constants";

// ---------- Members ----------
export type MemberId =
  "alex" | "camille" | "jade" | "mamie" | "papa" | "ines" | "nathan" | "lucas";

export interface Member {
  id: MemberId;
  name: string;
  role: string;
  avatarBg: string;
}

export const members: Record<MemberId, Member> = {
  alex: {
    id: "alex",
    name: "Alex",
    role: "Administrateur",
    avatarBg: "ffd7b5",
  },
  camille: {
    id: "camille",
    name: "Camille",
    role: "Administratrice",
    avatarBg: "e9e0ff",
  },
  jade: {
    id: "jade",
    name: "Jade",
    role: "Enfant · accès limité",
    avatarBg: "cfe3fb",
  },
  mamie: {
    id: "mamie",
    name: "Mamie",
    role: "Invitée · agenda seulement",
    avatarBg: "fde2d3",
  },
  papa: { id: "papa", name: "Papa", role: "", avatarBg: "d7efdb" },
  ines: { id: "ines", name: "Inès", role: "", avatarBg: "fde2d3" },
  nathan: { id: "nathan", name: "Nathan", role: "", avatarBg: "fff1b8" },
  lucas: { id: "lucas", name: "Lucas", role: "", avatarBg: "dfe7ff" },
};

export const ME: MemberId = "alex";
export const householdMembers: MemberId[] = [
  "alex",
  "camille",
  "jade",
  "mamie",
];

export const household = {
  name: "Foyer Martin",
  since: "mars 2026",
};

/** Illustrated demo avatar, no real person. */
export function avatarUrl(id: MemberId) {
  const m = members[id];
  return `https://api.dicebear.com/9.x/notionists/png?seed=${encodeURIComponent(m.name + "lv")}&backgroundColor=${m.avatarBg}&size=128`;
}

// ---------- Agenda ----------
export interface AgendaEvent {
  id: string;
  date: string; // YYYY-MM-DD
  time?: string; // HH:mm, none for all-day
  duration?: string;
  title: string;
  detail: string;
  color: CategoryColor;
  with: MemberId[];
}

export const TODAY = "2026-10-14";

export const events: AgendaEvent[] = [
  {
    id: "e1",
    date: "2026-10-14",
    time: "12:30",
    duration: "1 h",
    title: "Déjeuner avec Paul",
    detail: "Le Comptoir",
    color: "orange",
    with: ["alex"],
  },
  {
    id: "e2",
    date: "2026-10-14",
    time: "17:30",
    duration: "45 min",
    title: "Rendez-vous pédiatre",
    detail: "Camille et Jade",
    color: "brand",
    with: ["camille", "jade"],
  },
  {
    id: "e3",
    date: "2026-10-14",
    time: "20:00",
    duration: "1 h",
    title: "Réunion de parents",
    detail: "En visio",
    color: "green",
    with: ["alex"],
  },
  {
    id: "e4",
    date: "2026-10-15",
    time: "09:00",
    duration: "1 h",
    title: "Piscine",
    detail: "Jade · apporter le bonnet",
    color: "blue",
    with: ["jade"],
  },
  {
    id: "e5",
    date: "2026-10-15",
    time: "18:45",
    duration: "30 min",
    title: "Courses du jeudi",
    detail: "Liste « Courses de la semaine »",
    color: "orange",
    with: ["alex"],
  },
  {
    id: "e6",
    date: "2026-10-17",
    time: "14:00",
    duration: "4 h",
    title: "Anniversaire de Jade",
    detail: "À la maison",
    color: "brand",
    with: ["alex", "camille", "jade", "mamie"],
  },
  {
    id: "e7",
    date: "2026-10-12",
    time: "19:00",
    title: "Dîner chez Mamie",
    detail: "Toute la famille",
    color: "orange",
    with: ["alex", "camille", "jade"],
  },
  {
    id: "e8",
    date: "2026-10-01",
    time: "08:30",
    title: "Rentrée du club de foot",
    detail: "Jade",
    color: "blue",
    with: ["jade"],
  },
  {
    id: "e9",
    date: "2026-10-03",
    time: "10:00",
    title: "Marché",
    detail: "Camille",
    color: "green",
    with: ["camille"],
  },
  {
    id: "e10",
    date: "2026-10-06",
    time: "18:00",
    title: "Contrôle technique",
    detail: "Alex",
    color: "orange",
    with: ["alex"],
  },
  {
    id: "e11",
    date: "2026-10-08",
    time: "16:30",
    title: "Dentiste",
    detail: "Jade",
    color: "brand",
    with: ["camille", "jade"],
  },
  {
    id: "e12",
    date: "2026-10-08",
    time: "20:30",
    title: "Cinéma",
    detail: "Alex et Camille",
    color: "blue",
    with: ["alex", "camille"],
  },
  {
    id: "e13",
    date: "2026-10-10",
    time: "11:00",
    title: "Brunch avec Inès",
    detail: "Camille",
    color: "green",
    with: ["camille"],
  },
  {
    id: "e14",
    date: "2026-10-20",
    time: "09:00",
    title: "Vaccin de Jade",
    detail: "Cabinet Pasteur",
    color: "brand",
    with: ["camille", "jade"],
  },
  {
    id: "e15",
    date: "2026-10-22",
    time: "17:00",
    title: "Kermesse de l’école",
    detail: "Jade",
    color: "blue",
    with: ["jade"],
  },
  {
    id: "e16",
    date: "2026-10-25",
    time: "12:00",
    title: "Déjeuner chez Papa",
    detail: "Toute la famille",
    color: "orange",
    with: ["alex", "camille", "jade"],
  },
  {
    id: "e17",
    date: "2026-10-28",
    time: "19:30",
    title: "Soirée jeux",
    detail: "Avec Nathan et Inès",
    color: "brand",
    with: ["alex", "camille"],
  },
  {
    id: "e18",
    date: "2026-10-31",
    time: "18:00",
    title: "Halloween",
    detail: "Jade et ses amis",
    color: "green",
    with: ["jade"],
  },
];

// ---------- Lists and groceries ----------
export interface ListFolder {
  id: string;
  name: string;
  icon: LucideIcon;
  color: CategoryColor;
  count: number;
  shared?: boolean;
}

export const folders: ListFolder[] = [
  { id: "quick", name: "Listes rapides", icon: Zap, color: "brand", count: 4 },
  {
    id: "groceries",
    name: "Courses",
    icon: ShoppingCart,
    color: "blue",
    count: 6,
    shared: true,
  },
  { id: "home", name: "Maison", icon: House, color: "orange", count: 5 },
  { id: "travel", name: "Voyages", icon: Plane, color: "green", count: 2 },
  {
    id: "furniture",
    name: "Ameublement",
    icon: Armchair,
    color: "grey",
    count: 3,
  },
  {
    id: "school",
    name: "Rentrée scolaire",
    icon: Backpack,
    color: "brand",
    count: 1,
  },
  { id: "gifts", name: "Idées cadeaux", icon: Gift, color: "blue", count: 2 },
];

export interface GroceryItem {
  id: string;
  name: string;
  note?: string;
  qty?: string;
  price: number;
  by?: MemberId;
  done: boolean;
  urgent?: boolean;
}

export interface Aisle {
  id: string;
  name: string;
  short: string;
  icon: LucideIcon;
  color: CategoryColor;
  items: GroceryItem[];
}

export const weeklyGroceries = {
  id: "weekly",
  title: "Courses de la semaine",
  store: "Carrefour Market · samedi matin",
  editing: "camille" as MemberId,
  aisles: [
    {
      id: "fruits",
      name: "Fruits et légumes",
      short: "Fruits",
      icon: Apple,
      color: "green",
      items: [
        {
          id: "g1",
          name: "Bananes plantain",
          note: "Pour le dîner de samedi",
          qty: "1 kg",
          price: 3.2,
          by: "alex",
          done: false,
        },
        {
          id: "g2",
          name: "Avocats",
          qty: "×4",
          price: 3.96,
          by: "camille",
          done: false,
        },
        {
          id: "g3",
          name: "Oignons rouges",
          qty: "×3",
          price: 1.5,
          done: false,
        },
        { id: "g4", name: "Tomates cerises", price: 2.49, done: true },
        { id: "g5", name: "Citrons verts", price: 1.2, done: true },
      ],
    },
    {
      id: "fresh",
      name: "Frais",
      short: "Frais",
      icon: Milk,
      color: "blue",
      items: [
        {
          id: "g6",
          name: "Lait demi-écrémé",
          qty: "×2",
          price: 2.3,
          by: "camille",
          done: false,
        },
        {
          id: "g7",
          name: "Bar entier",
          note: "Rayon poissonnerie",
          price: 14,
          by: "alex",
          done: false,
        },
        {
          id: "g8",
          name: "Yaourts nature",
          qty: "×8",
          price: 2.1,
          by: "jade",
          done: false,
        },
        {
          id: "g9",
          name: "Glaces vanille",
          note: "Promis à Jade",
          price: 4.5,
          by: "jade",
          done: false,
        },
        { id: "g10", name: "Beurre doux", price: 2.4, done: true },
      ],
    },
    {
      id: "grocery",
      name: "Épicerie",
      short: "Épicerie",
      icon: Wheat,
      color: "orange",
      items: [
        {
          id: "g11",
          name: "Riz basmati",
          qty: "2 kg",
          price: 4.9,
          by: "alex",
          done: false,
        },
        {
          id: "g12",
          name: "Pâtes complètes",
          qty: "×2",
          price: 1.6,
          by: "camille",
          done: false,
        },
        { id: "g13", name: "Huile d’olive", price: 7.8, done: true },
      ],
    },
    {
      id: "home",
      name: "Maison et bébé",
      short: "Maison",
      icon: SprayCan,
      color: "brand",
      items: [
        {
          id: "g14",
          name: "Couches taille 4",
          note: "Urgent",
          price: 12.9,
          by: "camille",
          done: false,
          urgent: true,
        },
        { id: "g15", name: "Liquide vaisselle", price: 3.1, done: true },
      ],
    },
  ] as Aisle[],
  frequent: ["Pain", "Œufs ×12", "Café", "Eau gazeuse"],
};

// ---------- Budget ----------
export interface Envelope {
  id: string;
  name: string;
  note: string;
  icon: LucideIcon;
  color: CategoryColor;
  spent: number;
  budget: number;
}

export const budgetMonth = {
  label: "Octobre 2026",
  spent: 1765.4,
  budget: 2850,
  income: 5500,
};

export const envelopes: Envelope[] = [
  {
    id: "housing",
    name: "Logement",
    note: "Loyer et charges",
    icon: House,
    color: "brand",
    spent: 950,
    budget: 950,
  },
  {
    id: "groceries",
    name: "Courses",
    note: "",
    icon: ShoppingCart,
    color: "blue",
    spent: 486.2,
    budget: 600,
  },
  {
    id: "transport",
    name: "Transport",
    note: "",
    icon: Car,
    color: "green",
    spent: 214,
    budget: 250,
  },
  {
    id: "leisure",
    name: "Loisirs",
    note: "",
    icon: Gamepad2,
    color: "orange",
    spent: 115,
    budget: 100,
  },
];

export interface Operation {
  id: string;
  label: string;
  category: string;
  icon: LucideIcon;
  color: CategoryColor;
  by: MemberId;
  when: string;
  amount: number;
}

export const operations: Operation[] = [
  {
    id: "o1",
    label: "Marché",
    category: "Courses",
    icon: ShoppingBasket,
    color: "blue",
    by: "camille",
    when: "aujourd’hui",
    amount: -14,
  },
  {
    id: "o2",
    label: "Carrefour Market",
    category: "Courses",
    icon: ShoppingCart,
    color: "blue",
    by: "camille",
    when: "aujourd’hui",
    amount: -62.18,
  },
  {
    id: "o3",
    label: "Pass Navigo",
    category: "Transport",
    icon: TrainFront,
    color: "green",
    by: "alex",
    when: "hier",
    amount: -86.4,
  },
  {
    id: "o4",
    label: "Salaire",
    category: "Revenus",
    icon: Banknote,
    color: "brand",
    by: "alex",
    when: "hier",
    amount: 2150,
  },
  {
    id: "o5",
    label: "Cinéma",
    category: "Loisirs",
    icon: Clapperboard,
    color: "orange",
    by: "camille",
    when: "12 oct.",
    amount: -38,
  },
  {
    id: "o6",
    label: "Pharmacie",
    category: "Santé",
    icon: Pill,
    color: "red",
    by: "camille",
    when: "12 oct.",
    amount: -17.6,
  },
  {
    id: "o7",
    label: "Loyer",
    category: "Logement",
    icon: House,
    color: "brand",
    by: "alex",
    when: "5 oct.",
    amount: -950,
  },
];

export interface ExpenseCategory {
  id: string;
  name: string;
  icon: LucideIcon;
  color: CategoryColor;
}

export const expenseCategories: ExpenseCategory[] = [
  { id: "groceries", name: "Courses", icon: ShoppingCart, color: "blue" },
  { id: "housing", name: "Logement", icon: House, color: "brand" },
  { id: "transport", name: "Transport", icon: Car, color: "green" },
  { id: "leisure", name: "Loisirs", icon: Gamepad2, color: "orange" },
  { id: "health", name: "Santé", icon: HeartPulse, color: "red" },
  { id: "kids", name: "Enfants", icon: Baby, color: "teal" },
  { id: "food", name: "Restos", icon: Utensils, color: "yellow" },
  { id: "other", name: "Autre", icon: Ellipsis, color: "grey" },
];

// ---------- Vault ----------
export interface SharedAccount {
  id: string;
  name: string;
  letter: string;
  tint: string;
  login: string;
  sharedWith: MemberId[];
  site: string;
  note: string;
}

export const sharedAccounts: SharedAccount[] = [
  {
    id: "netflix",
    name: "Netflix",
    letter: "N",
    tint: "#E50914",
    login: "famille.martin@gmail.com",
    sharedWith: ["alex", "camille", "jade"],
    site: "netflix.com",
    note: "Forfait Standard, 13,49 €/mois, prélevé le 8. Profil « Jade » en mode enfant.",
  },
  {
    id: "spotify",
    name: "Spotify Famille",
    letter: "S",
    tint: "#1ED760",
    login: "alex.martin",
    sharedWith: ["alex", "camille"],
    site: "spotify.com",
    note: "Forfait Famille, 6 comptes.",
  },
  {
    id: "disney",
    name: "Disney+",
    letter: "D",
    tint: "#113CCF",
    login: "famille.martin@gmail.com",
    sharedWith: ["camille", "jade"],
    site: "disneyplus.com",
    note: "",
  },
  {
    id: "prime",
    name: "Prime Video",
    letter: "P",
    tint: "#00A8E1",
    login: "camille.m@outlook.fr",
    sharedWith: ["camille", "alex"],
    site: "primevideo.com",
    note: "",
  },
];

export interface HomeCode {
  id: string;
  name: string;
  icon: LucideIcon;
  color: CategoryColor;
  code: string;
  hint?: string;
  qr?: boolean;
}

export const homeCodes: HomeCode[] = [
  {
    id: "gate",
    name: "Portail",
    icon: DoorOpen,
    color: "orange",
    code: "4827",
  },
  {
    id: "building",
    name: "Digicode immeuble",
    icon: Building2,
    color: "brand",
    code: "B3961",
  },
  { id: "alarm", name: "Alarme", icon: Siren, color: "red", code: "275130" },
  {
    id: "wifi",
    name: "Wi-Fi Maison",
    icon: Wifi,
    color: "blue",
    code: "Livebox-7A3F",
    hint: "Livebox-7A3F",
    qr: true,
  },
  {
    id: "bike",
    name: "Cadenas du vélo",
    icon: Bike,
    color: "green",
    code: "381",
  },
];

export const driveFolders = [
  {
    id: "papers",
    name: "Papiers de la famille",
    files: 48,
    sync: "il y a 2 min",
  },
  { id: "bills", name: "Factures 2026", files: 36, sync: "à jour" },
  { id: "school", name: "École de Jade", files: 21, sync: "à jour" },
  { id: "photos", name: "Photos de famille", files: 27, sync: "3 en attente" },
];

export const vaultCounts = { accounts: 24, codes: 9, wifi: 3, files: 132 };

// ---------- Activity ----------
export const activity = [
  {
    id: "a1",
    who: "camille" as MemberId,
    text: "a coché 3 articles",
    context: "Courses de la semaine · il y a 5 min",
    icon: ShoppingCart,
  },
  {
    id: "a2",
    who: "jade" as MemberId,
    text: "a ajouté 2 idées cadeaux",
    context: "Anniversaire de Jade · hier",
    icon: Gift,
  },
  {
    id: "a3",
    who: "alex" as MemberId,
    text: "avez ajouté une dépense de 86,40 €",
    context: "Transport · hier",
    icon: TrainFront,
  },
];

// ---------- Pinned lists ----------
export const pinnedLists = [
  {
    id: "weekly",
    title: "Courses de la semaine",
    detail: "8 sur 14 · env. 74 €",
    progress: 0.57,
    icon: ShoppingCart,
    color: "brand" as CategoryColor,
    with: ["camille", "alex"] as MemberId[],
  },
  {
    id: "birthday",
    title: "Anniversaire de Jade",
    detail: "6 idées · samedi",
    progress: 0.33,
    icon: Gift,
    color: "blue" as CategoryColor,
    with: ["jade"] as MemberId[],
  },
];

export const euro = (
  n: number,
  opts: { sign?: boolean; decimals?: boolean } = {},
) => {
  const { sign = false, decimals = true } = opts;
  const s = Math.abs(n).toLocaleString("fr-FR", {
    minimumFractionDigits: decimals ? 2 : 0,
    maximumFractionDigits: decimals ? 2 : 0,
  });
  const prefix = sign ? (n < 0 ? "−" : "+") : n < 0 ? "−" : "";
  return `${prefix}${s} €`;
};
