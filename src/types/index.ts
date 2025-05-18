// Define TypeScript interfaces for our data models

export interface Member {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  joinDate: string;
  status: 'active' | 'inactive';
  avatar: string;
}

export interface InventoryItem {
  id: string;
  name: string;
  category: string;
  quantity: number;
  status: 'available' | 'low' | 'lent' | 'maintenance';
  lastUpdated: string;
  image?: string;
}

export interface InventoryTransaction {
  id: string;
  inventoryId: string;
  memberId: string;
  type: 'lending' | 'return';
  quantity: number;
  date: string;
  notes?: string;
  inventoryName?: string;
  memberName?: string;
}

export interface FinancialTransaction {
  id: string;
  type: 'income' | 'expense';
  amount: number;
  category: string;
  date: string;
  description: string;
  paymentMethod: string;
  status: 'completed' | 'pending' | 'cancelled';
}

export interface DashboardSummary {
  totalMembers: number;
  activeMembers: number;
  totalInventory: number;
  lentItems: number;
  thisMonthIncome: number;
  thisMonthExpense: number;
  inventoryByCategory: {
    category: string;
    count: number;
  }[];
  recentTransactions: FinancialTransaction[];
}