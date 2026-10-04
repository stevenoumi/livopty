import { View } from "react-native";
import ExpenseCategoryList from "~/components/custom/budget/BudgetCategoryList";
export default function Home() {
  return (
    <View className="flex-1 justify-center items-center bg-white dark:bg-black">
      <ExpenseCategoryList />
    </View>
  );
}
