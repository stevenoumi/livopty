import { View } from "react-native";
import { BugetHero } from "~/components/custom/budget/BugetHero";
import ExpenseCategoryList from "~/components/custom/budget/BudgetCategoryList";
export default function Home() {
  return (
    <View className="flex-1 flex-col justify-center items-center bg-white dark:bg-black gap-4 px-4">
      <BugetHero />
      <ExpenseCategoryList />
    </View>
  );
}
