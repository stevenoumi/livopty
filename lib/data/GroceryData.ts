export type GroceryList = {
  id: string;
  title: string;
  folderId?: string; 
  createdAt: string;
  updatedAt: string;
  content: string;
};

export type GroceryFolder = {
  id: string;
  name: string;
  icon?: string;
  createdAt: string;
};

// Mock data
export const groceryFolders: GroceryFolder[] = [
    {
    id: 'folder1',
    name: 'Listes rapides',
    icon: '📋',
    createdAt: '2025-06-10T12:00:00Z',
  },
  {
    id: 'folder2',
    name: 'Maison',
    icon: '🏠',
    createdAt: '2025-06-10T12:00:00Z',
  },
  {
    id: 'folder3',
    name: 'Courses',
    icon: '🛒',
    createdAt: '2025-06-10T12:00:00Z',
  },
  {
    id: 'folder4',
    name: 'Voyages',
    icon: '✈️',
    createdAt: '2025-06-10T12:00:00Z',
  },
  {
    id: 'folder5',
    name: 'Ameublement',
    icon: '🪑',
    createdAt: '2025-06-10T12:00:00Z',
  },
  {
    id: 'folder6',
    name: 'Rentrée scolaire',
    icon: '🎒',
    createdAt: '2025-06-01T10:00:00Z',
  },


];

export const groceryLists: GroceryList[] = [
  {
    id: 'list1',
    title: 'Fournitures',
    folderId: 'folder1',
    createdAt: '2025-06-01T10:05:00Z',
    updatedAt: '2025-06-01T10:06:00Z',
    content: `- [x] Cahier
- [ ] Stylos
- [ ] Trousse
    `,
  },
    {
    id: 'list10',
    title: 'Fournitures',
    folderId: 'folder1',
    createdAt: '2025-06-01T10:05:00Z',
    updatedAt: '2025-06-01T10:06:00Z',
    content: `- [x] Cahier
- [ ] Stylos
- [ ] Trousse
    `,
  },
    {
    id: 'list11',
    title: 'Fournitures',
    folderId: 'folder1',
    createdAt: '2025-06-01T10:05:00Z',
    updatedAt: '2025-06-01T10:06:00Z',
    content: `- [x] Cahier
- [ ] Stylos
- [ ] Trousse
    `,
  },
  {
    id: 'list2',
    title: 'Tâches maison',
    folderId: 'folder2',
    createdAt: '2025-06-10T12:30:00Z',
    updatedAt: '2025-06-10T13:00:00Z',
    content: `- [x] Aspirer
- [ ] Nettoyer cuisine
- [ ] Prendre rdv plombier
    `,
  },
  {
    id: 'list3',
    title: 'Courses du soir',
    createdAt: '2025-06-25T18:00:00Z',
    updatedAt: '2025-06-25T18:05:00Z',
    content: `
- [ ] Pâtes
- [x] Yaourts
- [ ] Pommes
    `,
  },
  {
    id: 'list4',
    title: 'Courses du week-end',
    folderId: 'folder3',
    createdAt: '2025-06-20T09:00:00Z',
    updatedAt: '2025-06-20T09:05:00Z',
    content: `- [ ] Lait
- [ ] Pain  
- [ ] Oeufs
- [ ] Fruits
- [ ] Légumes
- [ ] Viande
- [ ] Poisson
- [ ] Produits laitiers`,
  },
  {
    id: 'list5',
    title: 'Voyage à Paris',
    folderId: 'folder4',
    createdAt: '2025-06-15T14:00:00Z',
    updatedAt: '2025-06-15T14:05:00Z',
    content: `- [ ] Billets de train
- [ ] Réserver hôtel
- [ ] Itinéraire
- [ ] Visites à planifier
- [ ] Restaurants à essayer
    `,
  },
  {
    id: 'list6',
    title: 'Ameublement salon',
    folderId: 'folder5',
    createdAt: '2025-06-05T11:00:00Z',
    updatedAt: '2025-06-05T11:05:00Z',
    content: `- [ ] Canapé
- [ ] Table basse
- [ ] Meuble TV
- [ ] Lampes
- [ ] Tapis
- [ ] Rideaux
    `,
  },
  {
    id: 'list7',
    title: 'Rentrée scolaire',
    folderId: 'folder6',
    createdAt: '2025-06-01T10:00:00Z',
    updatedAt: '2025-06-01T10:05:00Z',
    content: `- [ ] Cartable
- [ ] Cahiers
- [ ] Stylos
- [ ] Règle
- [ ] Gomme
- [ ] Crayons de couleur
- [ ] Feutres
- [ ] Trousse
- [ ] Agenda
- [ ] Livres scolaires
- [ ] Fournitures d'art
- [ ] Boîte à lunch
`,
  },
];
