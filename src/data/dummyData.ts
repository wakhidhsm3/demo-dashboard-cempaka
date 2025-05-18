import { 
  Member, 
  InventoryItem, 
  InventoryTransaction, 
  FinancialTransaction,
  DashboardSummary
} from '../types';

// Indonesian names for dummy data
export const members: Member[] = [
  {
    id: '1',
    name: 'Budi Santoso',
    email: 'budi.santoso@example.com',
    phone: '081234567890',
    role: 'Ketua',
    joinDate: '2023-01-15',
    status: 'active',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: '2',
    name: 'Siti Nurhaliza',
    email: 'siti.nurhaliza@example.com',
    phone: '081298765432',
    role: 'Bendahara',
    joinDate: '2023-02-10',
    status: 'active',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: '3',
    name: 'Ahmad Wijaya',
    email: 'ahmad.wijaya@example.com',
    phone: '081345678901',
    role: 'Sekretaris',
    joinDate: '2023-03-05',
    status: 'active',
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: '4',
    name: 'Dewi Kartika',
    email: 'dewi.kartika@example.com',
    phone: '081456789012',
    role: 'Anggota',
    joinDate: '2023-04-20',
    status: 'inactive',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: '5',
    name: 'Eko Prasetyo',
    email: 'eko.prasetyo@example.com',
    phone: '081567890123',
    role: 'Anggota',
    joinDate: '2023-05-12',
    status: 'active',
    avatar: 'https://images.pexels.com/photos/532220/pexels-photo-532220.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: '6',
    name: 'Ratna Sari',
    email: 'ratna.sari@example.com',
    phone: '081678901234',
    role: 'Anggota',
    joinDate: '2023-06-25',
    status: 'active',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  }
];

export const inventoryItems: InventoryItem[] = [
  {
    id: '1',
    name: 'Laptop Asus',
    category: 'Elektronik',
    quantity: 5,
    status: 'available',
    lastUpdated: '2023-09-05',
    image: 'https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: '2',
    name: 'Proyektor Epson',
    category: 'Elektronik',
    quantity: 2,
    status: 'lent',
    lastUpdated: '2023-10-12',
    image: 'https://images.pexels.com/photos/1447264/pexels-photo-1447264.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: '3',
    name: 'Meja Kantor',
    category: 'Furnitur',
    quantity: 10,
    status: 'available',
    lastUpdated: '2023-08-20',
    image: 'https://images.pexels.com/photos/667838/pexels-photo-667838.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: '4',
    name: 'Kursi Ergonomis',
    category: 'Furnitur',
    quantity: 15,
    status: 'available',
    lastUpdated: '2023-08-20',
    image: 'https://images.pexels.com/photos/116915/pexels-photo-116915.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: '5',
    name: 'Papan Tulis',
    category: 'Alat Tulis',
    quantity: 3,
    status: 'low',
    lastUpdated: '2023-11-05',
    image: 'https://images.pexels.com/photos/5905555/pexels-photo-5905555.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: '6',
    name: 'Printer HP',
    category: 'Elektronik',
    quantity: 2,
    status: 'maintenance',
    lastUpdated: '2023-11-10',
    image: 'https://images.pexels.com/photos/6419/wood-hand-apple-desk.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  }
];

export const inventoryTransactions: InventoryTransaction[] = [
  {
    id: '1',
    inventoryId: '2',
    memberId: '3',
    type: 'lending',
    quantity: 1,
    date: '2023-10-12',
    notes: 'Dipinjam untuk rapat',
    inventoryName: 'Proyektor Epson',
    memberName: 'Ahmad Wijaya'
  },
  {
    id: '2',
    inventoryId: '1',
    memberId: '6',
    type: 'lending',
    quantity: 1,
    date: '2023-11-02',
    notes: 'Dipinjam untuk presentasi',
    inventoryName: 'Laptop Asus',
    memberName: 'Ratna Sari'
  },
  {
    id: '3',
    inventoryId: '1',
    memberId: '6',
    type: 'return',
    quantity: 1,
    date: '2023-11-05',
    notes: 'Dikembalikan dalam keadaan baik',
    inventoryName: 'Laptop Asus',
    memberName: 'Ratna Sari'
  },
  {
    id: '4',
    inventoryId: '5',
    memberId: '4',
    type: 'lending',
    quantity: 1,
    date: '2023-11-10',
    notes: 'Dipinjam untuk pelatihan',
    inventoryName: 'Papan Tulis',
    memberName: 'Dewi Kartika'
  }
];

export const financialTransactions: FinancialTransaction[] = [
  {
    id: '1',
    type: 'income',
    amount: 5000000,
    category: 'Iuran Anggota',
    date: '2023-11-05',
    description: 'Pembayaran iuran bulan November',
    paymentMethod: 'Transfer Bank',
    status: 'completed'
  },
  {
    id: '2',
    type: 'expense',
    amount: 1500000,
    category: 'Perlengkapan Kantor',
    date: '2023-11-07',
    description: 'Pembelian ATK',
    paymentMethod: 'Kartu Debit',
    status: 'completed'
  },
  {
    id: '3',
    type: 'income',
    amount: 10000000,
    category: 'Donasi',
    date: '2023-11-10',
    description: 'Donasi dari PT Maju Bersama',
    paymentMethod: 'Transfer Bank',
    status: 'completed'
  },
  {
    id: '4',
    type: 'expense',
    amount: 3000000,
    category: 'Pemeliharaan',
    date: '2023-11-12',
    description: 'Service AC kantor',
    paymentMethod: 'Tunai',
    status: 'pending'
  },
  {
    id: '5',
    type: 'expense',
    amount: 2500000,
    category: 'Konsumsi',
    date: '2023-11-15',
    description: 'Konsumsi rapat anggota',
    paymentMethod: 'Tunai',
    status: 'completed'
  },
  {
    id: '6',
    type: 'income',
    amount: 7500000,
    category: 'Pendapatan Proyek',
    date: '2023-11-18',
    description: 'Pembayaran proyek pelatihan',
    paymentMethod: 'Transfer Bank',
    status: 'pending'
  }
];

export const dashboardSummary: DashboardSummary = {
  totalMembers: members.length,
  activeMembers: members.filter(member => member.status === 'active').length,
  totalInventory: inventoryItems.reduce((sum, item) => sum + item.quantity, 0),
  lentItems: inventoryItems.filter(item => item.status === 'lent').length,
  thisMonthIncome: financialTransactions
    .filter(tx => tx.type === 'income' && tx.date.startsWith('2023-11'))
    .reduce((sum, tx) => sum + tx.amount, 0),
  thisMonthExpense: financialTransactions
    .filter(tx => tx.type === 'expense' && tx.date.startsWith('2023-11'))
    .reduce((sum, tx) => sum + tx.amount, 0),
  inventoryByCategory: [
    { category: 'Elektronik', count: 9 },
    { category: 'Furnitur', count: 25 },
    { category: 'Alat Tulis', count: 3 }
  ],
  recentTransactions: financialTransactions.slice(0, 3)
};

// Helper functions to work with the dummy data
export const formatRupiah = (amount: number): string => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(amount);
};

export const formatDate = (dateString: string): string => {
  const options: Intl.DateTimeFormatOptions = { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  };
  return new Date(dateString).toLocaleDateString('id-ID', options);
};