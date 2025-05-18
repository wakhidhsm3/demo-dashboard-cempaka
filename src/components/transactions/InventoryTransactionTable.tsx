import React, { useState } from 'react';
import { Table, TableHead, TableBody, TableRow, TableHeader, TableCell } from '../ui/Table';
import Badge from '../ui/Badge';
import Button from '../ui/Button';
import { Edit, Trash2, Plus } from 'lucide-react';
import { InventoryTransaction } from '../../types';
import InventoryTransactionForm from './InventoryTransactionForm';
import Modal from '../ui/Modal';
import { formatDate } from '../../data/dummyData';

interface InventoryTransactionTableProps {
  transactions: InventoryTransaction[];
  onAddTransaction: (transaction: InventoryTransaction) => void;
  onUpdateTransaction: (transaction: InventoryTransaction) => void;
  onDeleteTransaction: (id: string) => void;
}

const InventoryTransactionTable: React.FC<InventoryTransactionTableProps> = ({
  transactions,
  onAddTransaction,
  onUpdateTransaction,
  onDeleteTransaction
}) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentTransaction, setCurrentTransaction] = useState<InventoryTransaction | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<'all' | 'lending' | 'return'>('all');

  const handleAddTransaction = (transaction: InventoryTransaction) => {
    onAddTransaction(transaction);
    setIsAddModalOpen(false);
  };

  const handleUpdateTransaction = (transaction: InventoryTransaction) => {
    onUpdateTransaction(transaction);
    setIsEditModalOpen(false);
  };

  const handleDeleteConfirm = () => {
    if (currentTransaction) {
      onDeleteTransaction(currentTransaction.id);
      setIsDeleteModalOpen(false);
    }
  };

  const openEditModal = (transaction: InventoryTransaction) => {
    setCurrentTransaction(transaction);
    setIsEditModalOpen(true);
  };

  const openDeleteModal = (transaction: InventoryTransaction) => {
    setCurrentTransaction(transaction);
    setIsDeleteModalOpen(true);
  };

  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = 
      (transaction.inventoryName?.toLowerCase().includes(searchTerm.toLowerCase()) || '') ||
      (transaction.memberName?.toLowerCase().includes(searchTerm.toLowerCase()) || '') ||
      (transaction.notes?.toLowerCase().includes(searchTerm.toLowerCase()) || '');
    
    const matchesType = 
      typeFilter === 'all' || 
      transaction.type === typeFilter;
    
    return matchesSearch && matchesType;
  });

  return (
    <div>
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <input
            type="text"
            placeholder="Cari transaksi..."
            className="border border-gray-300 rounded-md px-4 py-2 w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            className="border border-gray-300 rounded-md px-4 py-2 w-full sm:w-40 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value as 'all' | 'lending' | 'return')}
          >
            <option value="all">Semua Tipe</option>
            <option value="lending">Peminjaman</option>
            <option value="return">Pengembalian</option>
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
              <TableHeader>Nama Item</TableHeader>
              <TableHeader>Nama Anggota</TableHeader>
              <TableHeader>Tipe</TableHeader>
              <TableHeader>Jumlah</TableHeader>
              <TableHeader>Tanggal</TableHeader>
              <TableHeader>Catatan</TableHeader>
              <TableHeader>Aksi</TableHeader>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredTransactions.length > 0 ? (
              filteredTransactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell>{transaction.inventoryName}</TableCell>
                  <TableCell>{transaction.memberName}</TableCell>
                  <TableCell>
                    <Badge
                      variant={transaction.type === 'lending' ? 'warning' : 'success'}
                    >
                      {transaction.type === 'lending' ? 'Peminjaman' : 'Pengembalian'}
                    </Badge>
                  </TableCell>
                  <TableCell>{transaction.quantity}</TableCell>
                  <TableCell>{formatDate(transaction.date)}</TableCell>
                  <TableCell>
                    <div className="max-w-xs truncate">{transaction.notes || '-'}</div>
                  </TableCell>
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
        <InventoryTransactionForm onSubmit={handleAddTransaction} />
      </Modal>

      {/* Edit Transaction Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Edit Transaksi"
        size="lg"
      >
        {currentTransaction && (
          <InventoryTransactionForm transaction={currentTransaction} onSubmit={handleUpdateTransaction} />
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

export default InventoryTransactionTable;