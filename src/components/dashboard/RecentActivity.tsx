import React from 'react';
import { Card, CardHeader, CardContent } from '../ui/Card';
import { TableRow, TableCell } from '../ui/Table';
import Badge from '../ui/Badge';
import { formatDate, formatRupiah } from '../../data/dummyData';
import { FinancialTransaction } from '../../types';

interface RecentActivityProps {
  transactions: FinancialTransaction[];
}

const RecentActivity: React.FC<RecentActivityProps> = ({ transactions }) => {
  return (
    <Card className="h-full">
      <CardHeader>
        <h2 className="text-lg font-semibold text-gray-900">Aktivitas Terbaru</h2>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y divide-gray-200">
          {transactions.map((transaction) => (
            <TableRow key={transaction.id} className="flex px-6 py-4 hover:bg-gray-50">
              <div className="mr-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center 
                  ${transaction.type === 'income' ? 'bg-green-100' : 'bg-red-100'}`}>
                  <span className={transaction.type === 'income' ? 'text-green-600' : 'text-red-600'}>
                    {transaction.type === 'income' ? '↑' : '↓'}
                  </span>
                </div>
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">{transaction.description}</p>
                <p className="text-xs text-gray-500">{formatDate(transaction.date)}</p>
              </div>
              <div className="flex flex-col items-end">
                <p className={`text-sm font-semibold ${transaction.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                  {transaction.type === 'income' ? '+' : '-'} {formatRupiah(transaction.amount)}
                </p>
                <Badge 
                  variant={transaction.status === 'completed' ? 'success' : transaction.status === 'pending' ? 'warning' : 'danger'}
                  className="mt-1"
                >
                  {transaction.status === 'completed' ? 'Selesai' : transaction.status === 'pending' ? 'Pending' : 'Dibatalkan'}
                </Badge>
              </div>
            </TableRow>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentActivity;