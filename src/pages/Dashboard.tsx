import React from 'react';
import { Users, Package, Repeat, BanknoteIcon } from 'lucide-react';
import StatCard from '../components/dashboard/StatCard';
import RecentActivity from '../components/dashboard/RecentActivity';
import { dashboardSummary, formatRupiah } from '../data/dummyData';
import { Card, CardHeader, CardContent } from '../components/ui/Card';

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500 mt-1">Ringkasan dan aktivitas terbaru organisasi</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Anggota"
          value={dashboardSummary.totalMembers}
          icon={<Users size={24} />}
          change={{ value: '+2 bulan ini', positive: true }}
        />
        <StatCard
          title="Total Inventaris"
          value={dashboardSummary.totalInventory}
          icon={<Package size={24} />}
          change={{ value: '+5 bulan ini', positive: true }}
        />
        <StatCard
          title="Item Dipinjam"
          value={dashboardSummary.lentItems}
          icon={<Repeat size={24} />}
        />
        <StatCard
          title="Saldo Bulan Ini"
          value={formatRupiah(dashboardSummary.thisMonthIncome - dashboardSummary.thisMonthExpense)}
          icon={<BanknoteIcon size={24} />}
          change={{ 
            value: '10% dari bulan lalu', 
            positive: dashboardSummary.thisMonthIncome > dashboardSummary.thisMonthExpense 
          }}
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="lg:col-span-2">
          <RecentActivity transactions={dashboardSummary.recentTransactions} />
        </div>
        
        {/* Inventory by Category */}
        <div>
          <Card className="h-full">
            <CardHeader>
              <h2 className="text-lg font-semibold text-gray-900">Inventaris berdasarkan Kategori</h2>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {dashboardSummary.inventoryByCategory.map((item, index) => (
                  <div key={index}>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-gray-700">{item.category}</span>
                      <span className="text-sm font-medium text-gray-700">{item.count} item</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div 
                        className="bg-blue-800 h-2.5 rounded-full" 
                        style={{ 
                          width: `${(item.count / dashboardSummary.totalInventory) * 100}%` 
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6">
                <h3 className="text-sm font-medium text-gray-700 mb-3">Ringkasan Keuangan Bulan Ini</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Total Pemasukan</span>
                    <span className="text-sm font-medium text-green-600">
                      {formatRupiah(dashboardSummary.thisMonthIncome)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Total Pengeluaran</span>
                    <span className="text-sm font-medium text-red-600">
                      {formatRupiah(dashboardSummary.thisMonthExpense)}
                    </span>
                  </div>
                  <div className="pt-2 border-t border-gray-200">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium text-gray-700">Saldo</span>
                      <span className="text-sm font-medium text-blue-800">
                        {formatRupiah(dashboardSummary.thisMonthIncome - dashboardSummary.thisMonthExpense)}
                      </span>
                    </div>
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

export default Dashboard;