// Types pour les listes de courses
export interface GroceryList {
  id: string;
  title: string;
  content: string;
  folderId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface GroceryFolder {
  id: string;
  name: string;
  emoji: string;
  listCount?: number;
}

export interface GroceryItem {
  id: string;
  name: string;
  quantity?: number;
  unit?: string;
  checked: boolean;
  listId: string;
}
