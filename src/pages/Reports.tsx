import React, { useState } from 'react';
import { Card, CardHeader, CardContent } from '../components/ui/Card';
import Button from '../components/ui/Button';
import { 
  financialTransactions, 
  members, 
  inventoryItems, 
  inventoryTransactions,
  formatRupiah,
  formatDate
} from '../data/dummyData';

const Reports: React.FC = () => {
  const [dateRange, setDateRange] = useState({
    start: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 30 days ago
    end: new Date().toISOString().split('T')[0] // today
  });

  // Financial summary
  const filteredFinancialTransactions = financialTransactions.filter(transaction => {
    const transactionDate = new Date(transaction.date).getTime();
    return transactionDate >= new Date(dateRange.start).getTime() && 
           transactionDate <= new Date(dateRange.end).getTime();
  });

  const totalIncome = filteredFinancialTransactions
    .filter(tx => tx.type === 'income')
    .reduce((sum, tx) => sum + tx.amount, 0);
  
  const totalExpense = filteredFinancialTransactions
    .filter(tx => tx.type === 'expense')
    .reduce((sum, tx) => sum + tx.amount, 0);
  
  const balance = totalIncome - totalExpense;

  // Income by category
  const incomeByCategory = filteredFinancialTransactions
    .filter(tx => tx.type === 'income')
    .reduce((acc, tx) => {
      acc[tx.category] = (acc[tx.category] || 0) + tx.amount;
      return acc;
    }, {} as Record<string, number>);

  // Expense by category
  const expenseByCategory = filteredFinancialTransactions
    .filter(tx => tx.type === 'expense')
    .reduce((acc, tx) => {
      acc[tx.category] = (acc[tx.category] || 0) + tx.amount;
      return acc;
    }, {} as Record<string, number>);

  // Inventory summary
  const inventorySummary = {
    totalItems: inventoryItems.reduce((sum, item) => sum + item.quantity, 0),
    availableItems: inventoryItems
      .filter(item => item.status === 'available')
      .reduce((sum, item) => sum + item.quantity, 0),
    lentItems: inventoryItems
      .filter(item => item.status === 'lent')
      .reduce((sum, item) => sum + item.quantity, 0),
    maintenanceItems: inventoryItems
      .filter(item => item.status === 'maintenance')
      .reduce((sum, item) => sum + item.quantity, 0),
    lowStockItems: inventoryItems
      .filter(item => item.status === 'low')
      .reduce((sum, item) => sum + item.quantity, 0)
  };

  // Member summary
  const memberSummary = {
    totalMembers: members.length,
    activeMembers: members.filter(member => member.status === 'active').length,
    inactiveMembers: members.filter(member => member.status === 'inactive').length
  };

  // Inventory transaction summary
  const inventoryTransactionSummary = {
    totalTransactions: inventoryTransactions.length,
    lendingTransactions: inventoryTransactions.filter(tx => tx.type === 'lending').length,
    returnTransactions: inventoryTransactions.filter(tx => tx.type === 'return').length
  };

  const handleDateRangeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDateRange({
      ...dateRange,
      [e.target.name]: e.target.value
    });
  };

  const handlePrintReport = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Laporan</h1>
          <p className="text-gray-500 mt-1">Laporan dan analisis data organisasi</p>
        </div>
        
        <div className="mt-4 sm:mt-0 flex flex-col sm:flex-row gap-4">
          <div className="flex items-center space-x-2">
            <div>
              <label htmlFor="start" className="block text-sm font-medium text-gray-700">Dari</label>
              <input
                type="date"
                id="start"
                name="start"
                value={dateRange.start}
                onChange={handleDateRangeChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="end" className="block text-sm font-medium text-gray-700">Sampai</label>
              <input
                type="date"
                id="end"
                name="end"
                value={dateRange.end}
                onChange={handleDateRangeChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
            </div>
          </div>
          <Button 
            variant="primary"
            className="print:hidden"
            onClick={handlePrintReport}
          >
            Cetak Laporan
          </Button>
        </div>
      </div>
      
      <div id="printableReport">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Pemasukan</h3>
              <p className="text-2xl font-bold text-green-600">{formatRupiah(totalIncome)}</p>
              <p className="text-sm text-gray-500 mt-1">
                {formatDate(dateRange.start)} - {formatDate(dateRange.end)}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Pengeluaran</h3>
              <p className="text-2xl font-bold text-red-600">{formatRupiah(totalExpense)}</p>
              <p className="text-sm text-gray-500 mt-1">
                {formatDate(dateRange.start)} - {formatDate(dateRange.end)}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Saldo</h3>
              <p className={`text-2xl font-bold ${balance >= 0 ? 'text-blue-600' : 'text-red-600'}`}>
                {formatRupiah(balance)}
              </p>
              <p className="text-sm text-gray-500 mt-1">
                {formatDate(dateRange.start)} - {formatDate(dateRange.end)}
              </p>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <Card>
            <CardHeader>
              <h2 className="text-lg font-semibold text-gray-900">Pemasukan berdasarkan Kategori</h2>
            </CardHeader>
            <CardContent className="p-6">
              {Object.entries(incomeByCategory).length > 0 ? (
                <div className="space-y-4">
                  {Object.entries(incomeByCategory).map(([category, amount], index) => (
                    <div key={index}>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium text-gray-700">{category}</span>
                        <span className="text-sm font-medium text-green-600">{formatRupiah(amount)}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div 
                          className="bg-green-600 h-2.5 rounded-full" 
                          style={{ 
                            width: `${(amount / totalIncome) * 100}%` 
                          }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">Tidak ada data pemasukan untuk periode ini.</p>
              )}
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <h2 className="text-lg font-semibold text-gray-900">Pengeluaran berdasarkan Kategori</h2>
            </CardHeader>
            <CardContent className="p-6">
              {Object.entries(expenseByCategory).length > 0 ? (
                <div className="space-y-4">
                  {Object.entries(expenseByCategory).map(([category, amount], index) => (
                    <div key={index}>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium text-gray-700">{category}</span>
                        <span className="text-sm font-medium text-red-600">{formatRupiah(amount)}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div 
                          className="bg-red-600 h-2.5 rounded-full" 
                          style={{ 
                            width: `${(amount / totalExpense) * 100}%` 
                          }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">Tidak ada data pengeluaran untuk periode ini.</p>
              )}
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <Card>
            <CardHeader>
              <h2 className="text-lg font-semibold text-gray-900">Ringkasan Anggota</h2>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700">Total Anggota</span>
                    <span className="text-sm font-medium text-gray-900">{memberSummary.totalMembers}</span>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700">Anggota Aktif</span>
                    <span className="text-sm font-medium text-green-600">{memberSummary.activeMembers}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className="bg-green-600 h-2.5 rounded-full" 
                      style={{ 
                        width: `${(memberSummary.activeMembers / memberSummary.totalMembers) * 100}%` 
                      }}
                    ></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700">Anggota Tidak Aktif</span>
                    <span className="text-sm font-medium text-gray-500">{memberSummary.inactiveMembers}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className="bg-gray-500 h-2.5 rounded-full" 
                      style={{ 
                        width: `${(memberSummary.inactiveMembers / memberSummary.totalMembers) * 100}%` 
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <h2 className="text-lg font-semibold text-gray-900">Ringkasan Inventaris</h2>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700">Total Inventaris</span>
                    <span className="text-sm font-medium text-gray-900">{inventorySummary.totalItems} item</span>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700">Tersedia</span>
                    <span className="text-sm font-medium text-green-600">{inventorySummary.availableItems} item</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className="bg-green-600 h-2.5 rounded-full" 
                      style={{ 
                        width: `${(inventorySummary.availableItems / inventorySummary.totalItems) * 100}%` 
                      }}
                    ></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700">Dipinjam</span>
                    <span className="text-sm font-medium text-blue-600">{inventorySummary.lentItems} item</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className="bg-blue-600 h-2.5 rounded-full" 
                      style={{ 
                        width: `${(inventorySummary.lentItems / inventorySummary.totalItems) * 100}%` 
                      }}
                    ></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700">Pemeliharaan</span>
                    <span className="text-sm font-medium text-red-600">{inventorySummary.maintenanceItems} item</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className="bg-red-600 h-2.5 rounded-full" 
                      style={{ 
                        width: `${(inventorySummary.maintenanceItems / inventorySummary.totalItems) * 100}%` 
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <h2 className="text-lg font-semibold text-gray-900">Ringkasan Transaksi Inventaris</h2>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700">Total Transaksi</span>
                    <span className="text-sm font-medium text-gray-900">{inventoryTransactionSummary.totalTransactions} transaksi</span>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700">Peminjaman</span>
                    <span className="text-sm font-medium text-amber-600">{inventoryTransactionSummary.lendingTransactions} transaksi</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className="bg-amber-600 h-2.5 rounded-full" 
                      style={{ 
                        width: `${(inventoryTransactionSummary.lendingTransactions / inventoryTransactionSummary.totalTransactions) * 100}%` 
                      }}
                    ></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700">Pengembalian</span>
                    <span className="text-sm font-medium text-emerald-600">{inventoryTransactionSummary.returnTransactions} transaksi</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className="bg-emerald-600 h-2.5 rounded-full" 
                      style={{ 
                        width: `${(inventoryTransactionSummary.returnTransactions / inventoryTransactionSummary.totalTransactions) * 100}%` 
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Reports;