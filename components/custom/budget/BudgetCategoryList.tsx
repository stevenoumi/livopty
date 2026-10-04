import { ChevronRight } from "lucide-react-native";
import React, { useCallback } from "react";
import { FlatList, ListRenderItem, TouchableOpacity, View } from "react-native";
import { Text } from "~/components/ui/text";
import budgetList, { type BudgetItem } from "~/lib/data/BudgetData";
import ExpenseCategory from "./BudgetCategory";

interface ExpenseCategoryListProps {
  onSeeAll?: () => void;
  maxItems?: number;
}

export default function ExpenseCategoryList({
  onSeeAll,
  maxItems,
}: ExpenseCategoryListProps = {}) {
  const displayData = maxItems ? budgetList.slice(0, maxItems) : budgetList;

  const handleSeeAll = useCallback(() => {
    if (onSeeAll) {
      onSeeAll();
    } else {
      console.log("Navigate to all budgets");
    }
  }, [onSeeAll]);

  const renderItem: ListRenderItem<BudgetItem> = useCallback(
    ({ item }) => (
      <ExpenseCategory
        title={item.title}
        period={item.period}
        budget={item.budget}
        spent={item.spent}
        icon={item.icon}
        onPress={() => console.log(`Pressed ${item.title}`)}
      />
    ),
    []
  );

  return (
    <View className="w-full ">
      <View className="flex-row justify-between items-center mb-3">
        <Text className="text-xl font-bold text-gray-900 dark:text-white">
          Budget Categories
        </Text>
        <TouchableOpacity
          onPress={handleSeeAll}
          className="flex-row items-center gap-1 active:opacity-70"
          activeOpacity={0.7}
        >
          <Text className="text-sm font-medium text-purple-600 dark:text-purple-400">
            See All
          </Text>
          <ChevronRight
            size={16}
            className="text-purple-600 dark:text-purple-400"
          />
        </TouchableOpacity>
      </View>
      <FlatList
        data={displayData}
        horizontal
        contentContainerStyle={{
          paddingHorizontal: 4,
          paddingVertical: 4,
        }}
        ItemSeparatorComponent={() => <View style={{ width: 12 }} />}
        showsHorizontalScrollIndicator={false}
        bounces={true}
        snapToInterval={320}
        decelerationRate="fast"
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}
