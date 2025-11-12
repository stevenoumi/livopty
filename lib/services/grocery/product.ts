// /lib/service/grocery/product.ts

import { fetchFromOFF } from './offService';
import type { Product, SearchResponse } from './types';

/**
 * Recherche des produits par nom
 * @param query texte à chercher
 * @param page numéro de page (pagination)
 */
export async function searchProducts(query: string, page = 1): Promise<SearchResponse> {
  // endpoint API OFF pour la recherche : /cgi/search.pl
  // params: search_terms, json=1, page
  const endpoint = `/cgi/search.pl?search_terms=${encodeURIComponent(query)}&search_simple=1&action=process&json=1&page=${page}`;

  const data = await fetchFromOFF(endpoint);

  // Mapping de la réponse pour retourner le format défini
  const products: Product[] = data.products.map((p: any) => ({
    code: p.code,
    product_name: p.product_name,
    brands: p.brands,
    quantity: p.quantity,
    image_url: p.image_url,
  }));

  return {
    products,
    count: data.count,
    page: data.page,
    page_count: data.page_count,
  };
}

/**
 * Récupérer les détails d’un produit par code-barres
 * @param code barre
 */
export async function getProductByCode(code: string): Promise<Product | null> {
  const endpoint = `/api/v0/product/${code}.json`;

  const data = await fetchFromOFF(endpoint);

  if (data.status === 1) {
    const p = data.product;
    return {
      code: p.code,
      product_name: p.product_name,
      brands: p.brands,
      quantity: p.quantity,
      image_url: p.image_url,
    };
  }

  return null;
}
