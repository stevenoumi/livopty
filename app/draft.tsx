import React, { useState } from "react";
import { View, TextInput, FlatList, Text, Image } from "react-native";
import { searchProducts } from "~/lib/services/grocery/product";
import type { Product } from "~/lib/services/grocery/types";

export default function GrocerySearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Product[]>([]);

  const onChangeText = async (text: string) => {
    setQuery(text);
    if (text.length < 3) {
      setResults([]);
      return;
    }
    try {
      const res = await searchProducts(text);
      setResults(res.products);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <View>
      <TextInput
        placeholder="Chercher un produit"
        value={query}
        onChangeText={onChangeText}
        style={{ height: 40, borderColor: "gray", borderWidth: 1, margin: 10 }}
      />
      <FlatList
        data={results}
        keyExtractor={(item) => item.code}
        renderItem={({ item }) => (
          <View style={{ flexDirection: "row", padding: 10 }}>
            {item.image_url ? (
              <Image
                source={{ uri: item.image_url }}
                style={{ width: 50, height: 50, marginRight: 10 }}
              />
            ) : null}
            <Text>{item.product_name}</Text>
          </View>
        )}
      />
    </View>
  );
}
