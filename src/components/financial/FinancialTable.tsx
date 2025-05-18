import React, { useState } from 'react';
import { Table, TableHead, TableBody, TableRow, TableHeader, TableCell } from '../ui/Table';
import Badge from '../ui/Badge';
import Button from '../ui/Button';
import { Edit, Trash2, Plus } from 'lucide-react';
import { FinancialTransaction } from '../../types';
import FinancialForm from './FinancialForm';
import Modal from '../ui/Modal';
import { formatRupiah, formatDate } from '../../data/dummyData';

interface FinancialTableProps {
  transactions: FinancialTransaction[];
  onAddTransaction: (transaction: FinancialTransaction) => void;
  onUpdateTransaction: (transaction: FinancialTransaction) => void;
  onDeleteTransaction: (id: string) => void;
}

const FinancialTable: React.FC<FinancialTableProps> = ({
  transactions,
  onAddTransaction,
  onUpdateTransaction,
  onDeleteTransaction
}) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentTransaction, setCurrentTransaction] = useState<FinancialTransaction | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<'all' | 'income' | 'expense'>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'completed' | 'pending' | 'cancelled'>('all');

  const handleAddTransaction = (transaction: FinancialTransaction) => {
    onAddTransaction(transaction);
    setIsAddModalOpen(false);
  };

  const handleUpdateTransaction = (transaction: FinancialTransaction) => {
    onUpdateTransaction(transaction);
    setIsEditModalOpen(false);
  };

  const handleDeleteConfirm = () => {
    if (currentTransaction) {
      onDeleteTransaction(currentTransaction.id);
      setIsDeleteModalOpen(false);
    }
  };

  const openEditModal = (transaction: FinancialTransaction) => {
    setCurrentTransaction(transaction);
    setIsEditModalOpen(true);
  };

  const openDeleteModal = (transaction: FinancialTransaction) => {
    setCurrentTransaction(transaction);
    setIsDeleteModalOpen(true);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge variant="success">Selesai</Badge>;
      case 'pending':
        return <Badge variant="warning">Pending</Badge>;
      case 'cancelled':
        return <Badge variant="danger">Dibatalkan</Badge>;
      default:
        return <Badge variant="gray">Unknown</Badge>;
    }
  };

  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = 
      transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) || 
      transaction.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.paymentMethod.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = 
      typeFilter === 'all' || 
      transaction.type === typeFilter;
    
    const matchesStatus = 
      statusFilter === 'all' || 
      transaction.status === statusFilter;
    
    return matchesSearch && matchesType && matchesStatus;
  });

  // Calculate totals for filtered transactions
  const totalIncome = filteredTransactions
    .filter(tx => tx.type === 'income')
    .reduce((sum, tx) => sum + tx.amount, 0);
  
  const totalExpense = filteredTransactions
    .filter(tx => tx.type === 'expense')
    .reduce((sum, tx) => sum + tx.amount, 0);
  
  const balance = totalIncome - totalExpense;

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <p className="text-sm text-gray-500">Total Pemasukan</p>
          <p className="text-xl font-bold text-green-600">{formatRupiah(totalIncome)}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <p className="text-sm text-gray-500">Total Pengeluaran</p>
          <p className="text-xl font-bold text-red-600">{formatRupiah(totalExpense)}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <p className="text-sm text-gray-500">Saldo</p>
          <p className={`text-xl font-bold ${balance >= 0 ? 'text-blue-600' : 'text-red-600'}`}>
            {formatRupiah(balance)}
          </p>
        </div>
      </div>

      <div className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
          <input
            type="text"
            placeholder="Cari transaksi..."
            className="border border-gray-300 rounded-md px-4 py-2 w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            className="border border-gray-300 rounded-md px-4 py-2 w-full md:w-40 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value as 'all' | 'income' | 'expense')}
          >
            <option value="all">Semua Tipe</option>
            <option value="income">Pemasukan</option>
            <option value="expense">Pengeluaran</option>
          </select>
          <select
            className="border border-gray-300 rounded-md px-4 py-2 w-full md:w-40 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as 'all' | 'completed' | 'pending' | 'cancelled')}
          >
            <option value="all">Semua Status</option>
            <option value="completed">Selesai</option>
            <option value="pending">Pending</option>
            <option value="cancelled">Dibatalkan</option>
          </select>
        </div>
        <Button
          variant="primary"
          className="flex items-center"
          onClick={() => setIsAddModalOpen(true)}
        >
          <Plus size={16} className="mr-1" />
          Tambah Transaksi
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <Table>
          <TableHead>
            <TableRow>
              <TableHeader>Deskripsi</TableHeader>
              <TableHeader>Kategori</TableHeader>
              <TableHeader>Tanggal</TableHeader>
              <TableHeader>Metode Pembayaran</TableHeader>
              <TableHeader>Jumlah</TableHeader>
              <TableHeader>Status</TableHeader>
              <TableHeader>Aksi</TableHeader>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredTransactions.length > 0 ? (
              filteredTransactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell>{transaction.description}</TableCell>
                  <TableCell>{transaction.category}</TableCell>
                  <TableCell>{formatDate(transaction.date)}</TableCell>
                  <TableCell>{transaction.paymentMethod}</TableCell>
                  <TableCell className={transaction.type === 'income' ? 'text-green-600 font-medium' : 'text-red-600 font-medium'}>
                    {transaction.type === 'income' ? '+' : '-'} {formatRupiah(transaction.amount)}
                  </TableCell>
                  <TableCell>{getStatusBadge(transaction.status)}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => openEditModal(transaction)}
                      >
                        <Edit size={16} />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => openDeleteModal(transaction)}
                      >
                        <Trash2 size={16} className="text-red-500" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-6 text-gray-500">
                  Tidak ada data transaksi yang ditemukan
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Add Transaction Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Tambah Transaksi Baru"
        size="lg"
      >
        <FinancialForm onSubmit={handleAddTransaction} />
      </Modal>

      {/* Edit Transaction Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Edit Transaksi"
        size="lg"
      >
        {currentTransaction && (
          <FinancialForm transaction={currentTransaction} onSubmit={handleUpdateTransaction} />
        )}
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Konfirmasi Hapus"
        size="sm"
      >
        <div>
          <p className="mb-4">Apakah Anda yakin ingin menghapus transaksi ini?</p>
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setIsDeleteModalOpen(false)}>
              Batal
            </Button>
            <Button variant="danger" onClick={handleDeleteConfirm}>
              Hapus
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default FinancialTable;