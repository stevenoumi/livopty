import { ArrowDownLeft, ArrowUpRight } from "lucide-react-native";
import { View } from "react-native";
import { Text } from "~/components/ui/text";
import { CURRENCY } from "~/lib/constants";
import BalanceOverviewGraph from "./BalanceOverviewGraph";

interface BudgetHeroProps {
  expenses?: number;
  income?: number;
  balance?: number;
  balanceChange?: number;
  selectedYear?: string;
  showGraph?: boolean;
  graphData?: number[];
  onChartPress?: () => void;
  onWalletPress?: () => void;
}

export function BugetHero({
  expenses = 622.0,
  income = 5500.0,
  balance = 7524.75,
  balanceChange = 54.09,
  selectedYear = "2025",
  showGraph = true,
  graphData,
  onChartPress,
  onWalletPress,
}: BudgetHeroProps) {
  return (
    <View className="flex-col w-full gap-4">
      {/* Overview Graph Section */}
      {showGraph && (
        <BalanceOverviewGraph
          balance={balance}
          balanceChange={balanceChange}
          selectedYear={selectedYear}
          graphData={graphData}
          onChartPress={onChartPress}
          onWalletPress={onWalletPress}
        />
      )}

      {/* Expenses and Income Cards */}
      <View className="flex-row justify-between w-full gap-3">
        <View className="flex-1 bg-rose-50 dark:bg-rose-900/20 rounded-3xl p-5">
          <View className="flex-row items-center gap-3 mb-3">
            <View className="bg-rose-100 dark:bg-rose-800/40 p-3 rounded-2xl">
              <ArrowDownLeft
                size={20}
                className="text-rose-600 dark:text-rose-400"
              />
            </View>
            <Text className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Expenses
            </Text>
          </View>
          <Text className="text-2xl font-bold text-gray-900 dark:text-white">
            - {expenses.toLocaleString("fr-FR", { minimumFractionDigits: 2 })}{" "}
            {CURRENCY}
          </Text>
        </View>

        <View className="flex-1 bg-indigo-50 dark:bg-indigo-900/20 rounded-3xl p-5">
          <View className="flex-row items-center gap-3 mb-3">
            <View className="bg-indigo-100 dark:bg-indigo-800/40 p-3 rounded-2xl">
              <ArrowUpRight
                size={20}
                className="text-indigo-600 dark:text-indigo-400"
              />
            </View>
            <Text className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Income
            </Text>
          </View>
          <Text className="text-2xl font-bold text-gray-900 dark:text-white">
            + {income.toLocaleString("fr-FR", { minimumFractionDigits: 2 })}{" "}
            {CURRENCY}
          </Text>
        </View>
      </View>
    </View>
  );
}
