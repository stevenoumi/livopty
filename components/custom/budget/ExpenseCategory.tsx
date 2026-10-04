import React from "react";
import { LucideIcon } from "lucide-react-native";
import { TouchableOpacity, View } from "react-native";
import { Text } from "~/components/ui/text";
import { CURRENCY } from "~/lib/constants";

interface ExpenseCategoryProps {
  title: string;
  period: string;
  budget: number;
  spent: number;
  icon: LucideIcon;
  onPress?: () => void;
}

export default function ExpenseCategory({
  title,
  period,
  budget,
  spent,
  icon: Icon,
  onPress,
}: ExpenseCategoryProps) {
  const percentageSpent = Math.min((spent / budget) * 100, 100);
  const remaining = Math.max(budget - spent, 0);
  const isOverBudget = spent > budget;

  const getPercentageColor = () => {
    if (percentageSpent >= 90) return "bg-rose-200 dark:bg-rose-900/40";
    if (percentageSpent >= 70) return "bg-amber-200 dark:bg-amber-900/40";
    return "bg-emerald-200 dark:bg-emerald-900/40";
  };

  const getProgressColor = () => {
    if (percentageSpent >= 90) return "bg-rose-500 dark:bg-rose-400";
    if (percentageSpent >= 70) return "bg-amber-500 dark:bg-amber-400";
    return "bg-emerald-500 dark:bg-emerald-400";
  };

  return (
    <View className="flex-col p-5 bg-white dark:bg-slate-900 rounded-3xl shadow-sm w-80 gap-3 border border-slate-100 dark:border-slate-800">
      <View className="flex-row w-full items-center">
        <View className="flex-row items-center gap-3 flex-1">
          <TouchableOpacity
            className={`${getPercentageColor()} p-3 rounded-2xl`}
            onPress={onPress}
            activeOpacity={0.7}
          >
            <Icon size={22} className="text-gray-700 dark:text-gray-300" />
          </TouchableOpacity>
          <View className="flex-col flex-1">
            <Text
              className="font-bold text-base dark:text-white"
              numberOfLines={1}
            >
              {title}
            </Text>
            <Text className="text-xs text-gray-500 dark:text-gray-400">
              {period}
            </Text>
          </View>
        </View>
        <View className={`${getPercentageColor()} px-2.5 py-1 rounded-xl`}>
          <Text className="font-bold text-sm text-gray-700 dark:text-gray-300">
            {percentageSpent.toFixed(0)}%
          </Text>
        </View>
      </View>
      <View className="w-full flex-row justify-between items-center">
        <View className="flex-col">
          <Text className="text-xs text-gray-400 dark:text-gray-500">
            Spent
          </Text>
          <Text className="text-base font-bold text-gray-900 dark:text-white">
            {spent.toLocaleString()} {CURRENCY}
          </Text>
        </View>
        <View className="flex-col items-end">
          <Text className="text-xs text-gray-400 dark:text-gray-500">
            Budget
          </Text>
          <Text className="text-base font-bold text-gray-900 dark:text-white">
            {budget.toLocaleString()} {CURRENCY}
          </Text>
        </View>
      </View>
      <View className="w-full">
        <View className="w-full h-2.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <View
            className={`h-2.5 ${getProgressColor()} rounded-full`}
            style={{ width: `${percentageSpent}%` }}
          />
        </View>
        <View className="flex-row justify-between items-center mt-1.5">
          <Text
            className={`text-xs font-medium ${isOverBudget ? "text-rose-600 dark:text-rose-400" : "text-emerald-600 dark:text-emerald-400"}`}
          >
            {isOverBudget
              ? `${Math.abs(remaining).toLocaleString()} ${CURRENCY} over`
              : `${remaining.toLocaleString()} ${CURRENCY} left`}
          </Text>
          <Text className="text-xs text-gray-400 dark:text-gray-500">
            {budget - spent > 0
              ? Math.floor(((budget - spent) / budget) * 100)
              : 0}
            % left
          </Text>
        </View>
      </View>
    </View>
  );
}
