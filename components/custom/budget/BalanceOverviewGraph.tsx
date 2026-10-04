import { BarChart3, TrendingUp, Wallet } from "lucide-react-native";
import { TouchableOpacity, View } from "react-native";
import { Text } from "~/components/ui/text";
import { CURRENCY } from "~/lib/constants";

interface BalanceOverviewGraphProps {
  balance?: number;
  balanceChange?: number;
  selectedYear?: string;
  graphData?: number[];
  onChartPress?: () => void;
  onWalletPress?: () => void;
}

export default function BalanceOverviewGraph({
  balance = 7524.75,
  balanceChange = 54.09,
  selectedYear = "2025",
  graphData = [20, 15, 25, 30, 45, 60, 55, 70, 65, 75, 85, 80],
  onChartPress,
  onWalletPress,
}: BalanceOverviewGraphProps) {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
  const isPositiveChange = balanceChange >= 0;

  return (
    <View className="bg-slate-50 dark:bg-slate-900 rounded-3xl p-6 border border-slate-100 dark:border-slate-800">
      {/* Header */}
      <View className="flex-row justify-between items-center mb-6">
        <View className="flex-row items-baseline gap-2">
          <Text className="text-3xl font-bold text-gray-900 dark:text-white">
            Overview
          </Text>
          <Text className="text-lg text-gray-400">{selectedYear}</Text>
        </View>
        <View className="flex-row gap-2">
          <TouchableOpacity
            className="p-2 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700"
            activeOpacity={0.7}
            onPress={onChartPress}
          >
            <BarChart3
              size={20}
              className="text-indigo-600 dark:text-indigo-400"
            />
          </TouchableOpacity>
          <TouchableOpacity
            className="p-2 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700"
            activeOpacity={0.7}
            onPress={onWalletPress}
          >
            <Wallet
              size={20}
              className="text-indigo-600 dark:text-indigo-400"
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Balance Info */}
      <View className="mb-4">
        <Text className="text-sm text-gray-500 dark:text-gray-400 mb-1">
          Account Balances
        </Text>
        <View className="flex-row items-baseline gap-2">
          <Text className="text-3xl font-bold text-gray-900 dark:text-white">
            {CURRENCY}{" "}
            {balance.toLocaleString("fr-FR", { minimumFractionDigits: 2 })}
          </Text>
          <View
            className={`flex-row items-center gap-1 ${
              isPositiveChange
                ? "bg-emerald-100 dark:bg-emerald-900/30"
                : "bg-rose-100 dark:bg-rose-900/30"
            } px-2 py-1 rounded-lg`}
          >
            <TrendingUp
              size={12}
              className={
                isPositiveChange
                  ? "text-emerald-600 dark:text-emerald-400"
                  : "text-rose-600 dark:text-rose-400"
              }
            />
            <Text
              className={`text-xs font-semibold ${
                isPositiveChange
                  ? "text-emerald-600 dark:text-emerald-400"
                  : "text-rose-600 dark:text-rose-400"
              }`}
            >
              {Math.abs(balanceChange)}%
            </Text>
          </View>
        </View>
      </View>

      {/* Graph */}
      <View className="h-32 flex-row items-end justify-between gap-1 mb-2">
        {graphData.map((height, index) => (
          <View
            key={index}
            className="flex-1 bg-indigo-600 dark:bg-indigo-500 rounded-t-lg"
            style={{ height: `${height}%`, minHeight: 4 }}
          />
        ))}
      </View>

      {/* Month Labels */}
      <View className="flex-row justify-between px-1">
        {months.map((month, index) => (
          <Text
            key={index}
            className="text-xs text-gray-400 dark:text-gray-500"
          >
            {month}
          </Text>
        ))}
      </View>
    </View>
  );
}
