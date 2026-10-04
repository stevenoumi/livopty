// /lib/service/grocery/offService.ts

const BASE_URL = "https://world.openfoodfacts.org";

async function fetchFromOFF(endpoint: string): Promise<any> {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`);
    if (!response.ok) {
      throw new Error(`OFF API error: ${response.status}`);
    }
    return response.json();
  } catch (error) {
    console.error("Fetch OFF failed:", error);
    throw error;
  }
}

export { fetchFromOFF };
