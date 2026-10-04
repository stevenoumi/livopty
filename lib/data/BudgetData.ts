import {
  ShoppingCart,
  Utensils,
  Car,
  Home,
  Smartphone,
  Heart,
  Gamepad2,
  GraduationCap,
  type LucideIcon,
} from "lucide-react-native";

export interface BudgetItem {
  id: string;
  title: string;
  category: string;
  budget: number;
  spent: number;
  period: string;
  icon: LucideIcon;
}

const budgetList: BudgetItem[] = [
  {
    id: "1",
    title: "Food & Dining",
    category: "food",
    budget: 500,
    spent: 50,
    period: "Monthly Budget",
    icon: Utensils,
  },
  {
    id: "2",
    title: "Transportation",
    category: "transport",
    budget: 300,
    spent: 80,
    period: "Monthly Budget",
    icon: Car,
  },
  {
    id: "3",
    title: "Entertainment",
    category: "entertainment",
    budget: 200,
    spent: 220,
    period: "Monthly Budget",
    icon: Gamepad2,
  },
  {
    id: "4",
    title: "Shopping",
    category: "shopping",
    budget: 600,
    spent: 350,
    period: "Monthly Budget",
    icon: ShoppingCart,
  },
  {
    id: "5",
    title: "Housing",
    category: "housing",
    budget: 1200,
    spent: 1200,
    period: "Monthly Budget",
    icon: Home,
  },
  {
    id: "6",
    title: "Healthcare",
    category: "health",
    budget: 150,
    spent: 80,
    period: "Monthly Budget",
    icon: Heart,
  },
  {
    id: "7",
    title: "Technology",
    category: "tech",
    budget: 250,
    spent: 180,
    period: "Monthly Budget",
    icon: Smartphone,
  },
  {
    id: "8",
    title: "Education",
    category: "education",
    budget: 400,
    spent: 400,
    period: "Monthly Budget",
    icon: GraduationCap,
  },
];

export default budgetList;
