import React, { useState } from 'react';
import { inventoryTransactions } from '../data/dummyData';
import InventoryTransactionTable from '../components/transactions/InventoryTransactionTable';
import { InventoryTransaction } from '../types';

const InventoryTransactions: React.FC = () => {
  const [transactionsList, setTransactionsList] = useState<InventoryTransaction[]>(inventoryTransactions);

  const handleAddTransaction = (transaction: InventoryTransaction) => {
    setTransactionsList([...transactionsList, transaction]);
  };

  const handleUpdateTransaction = (updatedTransaction: InventoryTransaction) => {
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
        <h1 className="text-2xl font-bold text-gray-900">Transaksi Inventaris</h1>
        <p className="text-gray-500 mt-1">Kelola peminjaman dan pengembalian inventaris</p>
      </div>
      
      <InventoryTransactionTable 
        transactions={transactionsList}
        onAddTransaction={handleAddTransaction}
        onUpdateTransaction={handleUpdateTransaction}
        onDeleteTransaction={handleDeleteTransaction}
      />
    </div>
  );
};

export default InventoryTransactions;