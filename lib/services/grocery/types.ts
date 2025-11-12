// /lib/service/grocery/types.ts

export interface Product {
  code: string;
  product_name: string;
  brands: string;
  quantity: string;
  image_url: string;
  // ajoute d’autres champs utiles
}

export interface SearchResponse {
  products: Product[];
  count: number;
  page: number;
  page_count: number;
}
