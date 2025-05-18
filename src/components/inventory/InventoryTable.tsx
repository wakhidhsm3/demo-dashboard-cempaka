import React, { useState } from 'react';
import { Table, TableHead, TableBody, TableRow, TableHeader, TableCell } from '../ui/Table';
import Badge from '../ui/Badge';
import Button from '../ui/Button';
import { Edit, Trash2, Plus, Package } from 'lucide-react';
import { InventoryItem } from '../../types';
import InventoryForm from './InventoryForm';
import Modal from '../ui/Modal';

interface InventoryTableProps {
  items: InventoryItem[];
  onAddItem: (item: InventoryItem) => void;
  onUpdateItem: (item: InventoryItem) => void;
  onDeleteItem: (id: string) => void;
}

const InventoryTable: React.FC<InventoryTableProps> = ({
  items,
  onAddItem,
  onUpdateItem,
  onDeleteItem
}) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState<InventoryItem | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const handleAddItem = (item: InventoryItem) => {
    onAddItem(item);
    setIsAddModalOpen(false);
  };

  const handleUpdateItem = (item: InventoryItem) => {
    onUpdateItem(item);
    setIsEditModalOpen(false);
  };

  const handleDeleteConfirm = () => {
    if (currentItem) {
      onDeleteItem(currentItem.id);
      setIsDeleteModalOpen(false);
    }
  };

  const openEditModal = (item: InventoryItem) => {
    setCurrentItem(item);
    setIsEditModalOpen(true);
  };

  const openDeleteModal = (item: InventoryItem) => {
    setCurrentItem(item);
    setIsDeleteModalOpen(true);
  };

  // Get unique categories for filter
  const categories = ['all', ...new Set(items.map(item => item.category))];
  const statuses = ['all', 'available', 'low', 'lent', 'maintenance'];

  const statusLabels: Record<string, string> = {
    'all': 'Semua Status',
    'available': 'Tersedia',
    'low': 'Stok Rendah',
    'lent': 'Dipinjam',
    'maintenance': 'Pemeliharaan'
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'available':
        return <Badge variant="success">Tersedia</Badge>;
      case 'low':
        return <Badge variant="warning">Stok Rendah</Badge>;
      case 'lent':
        return <Badge variant="info">Dipinjam</Badge>;
      case 'maintenance':
        return <Badge variant="danger">Pemeliharaan</Badge>;
      default:
        return <Badge variant="gray">Unknown</Badge>;
    }
  };

  const filteredItems = items.filter(item => {
    const matchesSearch = 
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      item.category.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter;
    const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  return (
    <div>
      <div className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
          <input
            type="text"
            placeholder="Cari inventaris..."
            className="border border-gray-300 rounded-md px-4 py-2 w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            className="border border-gray-300 rounded-md px-4 py-2 w-full md:w-40 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category === 'all' ? 'Semua Kategori' : category}
              </option>
            ))}
          </select>
          <select
            className="border border-gray-300 rounded-md px-4 py-2 w-full md:w-40 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            {statuses.map((status) => (
              <option key={status} value={status}>
                {statusLabels[status]}
              </option>
            ))}
          </select>
        </div>
        <Button
          variant="primary"
          className="flex items-center"
          onClick={() => setIsAddModalOpen(true)}
        >
          <Plus size={16} className="mr-1" />
          Tambah Item
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <Table>
          <TableHead>
            <TableRow>
              <TableHeader>Item</TableHeader>
              <TableHeader>Kategori</TableHeader>
              <TableHeader>Jumlah</TableHeader>
              <TableHeader>Status</TableHeader>
              <TableHeader>Terakhir Diperbarui</TableHeader>
              <TableHeader>Aksi</TableHeader>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredItems.length > 0 ? (
              filteredItems.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <div className="flex items-center">
                      {item.image ? (
                        <img
                          className="h-10 w-10 rounded object-cover"
                          src={item.image}
                          alt={item.name}
                        />
                      ) : (
                        <div className="h-10 w-10 rounded bg-gray-200 flex items-center justify-center">
                          <Package size={20} className="text-gray-500" />
                        </div>
                      )}
                      <div className="ml-4">
                        <div className="font-medium text-gray-900">{item.name}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{item.category}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>{getStatusBadge(item.status)}</TableCell>
                  <TableCell>{new Date(item.lastUpdated).toLocaleDateString('id-ID')}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => openEditModal(item)}
                      >
                        <Edit size={16} />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => openDeleteModal(item)}
                      >
                        <Trash2 size={16} className="text-red-500" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-6 text-gray-500">
                  Tidak ada data inventaris yang ditemukan
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Add Item Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Tambah Item Baru"
        size="lg"
      >
        <InventoryForm onSubmit={handleAddItem} />
      </Modal>

      {/* Edit Item Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Edit Item"
        size="lg"
      >
        {currentItem && (
          <InventoryForm item={currentItem} onSubmit={handleUpdateItem} />
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
          <p className="mb-4">Apakah Anda yakin ingin menghapus item ini?</p>
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

export default InventoryTable;