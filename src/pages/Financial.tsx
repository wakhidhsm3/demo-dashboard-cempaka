import React, { useState } from 'react';
import { financialTransactions } from '../data/dummyData';
import FinancialTable from '../components/financial/FinancialTable';
import { FinancialTransaction } from '../types';

const Financial: React.FC = () => {
  const [transactionsList, setTransactionsList] = useState<FinancialTransaction[]>(financialTransactions);

  const handleAddTransaction = (transaction: FinancialTransaction) => {
    setTransactionsList([...transactionsList, transaction]);
  };

  const handleUpdateTransaction = (updatedTransaction: FinancialTransaction) => {
    setTransactionsList(
      transactionsList.map(transaction => 
        transaction.id === updatedTransaction.id ? updatedTransaction : transaction
      )
    );
  };

  const handleDeleteTransaction = (id: string) => {
    setTransactionsList(transactionsList.filter(transaction => transaction.id !== id));
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Manajemen Keuangan</h1>
        <p className="text-gray-500 mt-1">Kelola transaksi keuangan organisasi</p>
      </div>
      
      <FinancialTable 
        transactions={transactionsList}
        onAddTransaction={handleAddTransaction}
        onUpdateTransaction={handleUpdateTransaction}
        onDeleteTransaction={handleDeleteTransaction}
      />
    </div>
  );
};

export default Financial;