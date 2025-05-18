import React, { useState, useEffect } from 'react';
import Input from '../ui/Input';
import Button from '../ui/Button';
import { InventoryTransaction } from '../../types';
import { inventoryItems, members } from '../../data/dummyData';

interface InventoryTransactionFormProps {
  transaction?: InventoryTransaction;
  onSubmit: (transaction: InventoryTransaction) => void;
}

const defaultTransaction: InventoryTransaction = {
  id: '',
  inventoryId: '',
  memberId: '',
  type: 'lending',
  quantity: 1,
  date: new Date().toISOString().split('T')[0],
  notes: '',
  inventoryName: '',
  memberName: ''
};

const InventoryTransactionForm: React.FC<InventoryTransactionFormProps> = ({ 
  transaction, 
  onSubmit 
}) => {
  const [formData, setFormData] = useState<InventoryTransaction>(
    transaction || { ...defaultTransaction, id: crypto.randomUUID() }
  );
  const [errors, setErrors] = useState<Partial<Record<keyof InventoryTransaction, string>>>({});

  useEffect(() => {
    if (transaction) {
      setFormData(transaction);
    }
  }, [transaction]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    if (name === 'quantity') {
      setFormData({ ...formData, [name]: parseInt(value) || 1 });
    } else if (name === 'inventoryId') {
      const selectedItem = inventoryItems.find(item => item.id === value);
      setFormData({ 
        ...formData, 
        inventoryId: value,
        inventoryName: selectedItem ? selectedItem.name : ''
      });
    } else if (name === 'memberId') {
      const selectedMember = members.find(member => member.id === value);
      setFormData({ 
        ...formData, 
        memberId: value,
        memberName: selectedMember ? selectedMember.name : ''
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
    
    // Clear error when field is changed
    if (errors[name as keyof InventoryTransaction]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof InventoryTransaction, string>> = {};
    
    if (!formData.inventoryId) {
      newErrors.inventoryId = 'Item inventaris harus dipilih';
    }
    
    if (!formData.memberId) {
      newErrors.memberId = 'Anggota harus dipilih';
    }
    
    if (formData.quantity <= 0) {
      newErrors.quantity = 'Jumlah harus lebih dari 0';
    }
    
    if (!formData.date) {
      newErrors.date = 'Tanggal tidak boleh kosong';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validate()) {
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="mb-4">
          <label htmlFor="inventoryId" className="block text-sm font-medium text-gray-700 mb-1">
            Item Inventaris
          </label>
          <select
            id="inventoryId"
            name="inventoryId"
            value={formData.inventoryId}
            onChange={handleChange}
            className={`
              appearance-none block w-full px-3 py-2 border border-gray-300 
              rounded-md shadow-sm placeholder-gray-400 
              focus:outline-none focus:ring-blue-500 focus:border-blue-500 
              sm:text-sm
              ${errors.inventoryId ? 'border-red-500' : ''}
            `}
            required
          >
            <option value="" disabled>Pilih Item Inventaris</option>
            {inventoryItems.map(item => (
              <option key={item.id} value={item.id}>{item.name}</option>
            ))}
          </select>
          {errors.inventoryId && <p className="mt-1 text-sm text-red-600">{errors.inventoryId}</p>}
        </div>
        
        <div className="mb-4">
          <label htmlFor="memberId" className="block text-sm font-medium text-gray-700 mb-1">
            Anggota
          </label>
          <select
            id="memberId"
            name="memberId"
            value={formData.memberId}
            onChange={handleChange}
            className={`
              appearance-none block w-full px-3 py-2 border border-gray-300 
              rounded-md shadow-sm placeholder-gray-400 
              focus:outline-none focus:ring-blue-500 focus:border-blue-500 
              sm:text-sm
              ${errors.memberId ? 'border-red-500' : ''}
            `}
            required
          >
            <option value="" disabled>Pilih Anggota</option>
            {members.map(member => (
              <option key={member.id} value={member.id}>{member.name}</option>
            ))}
          </select>
          {errors.memberId && <p className="mt-1 text-sm text-red-600">{errors.memberId}</p>}
        </div>
        
        <div className="mb-4">
          <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
            Tipe Transaksi
          </label>
          <select
            id="type"
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            required
          >
            <option value="lending">Peminjaman</option>
            <option value="return">Pengembalian</option>
          </select>
        </div>
        
        <Input
          id="quantity"
          name="quantity"
          type="number"
          label="Jumlah"
          value={formData.quantity}
          onChange={handleChange}
          error={errors.quantity}
          min="1"
          required
        />
        
        <Input
          id="date"
          name="date"
          type="date"
          label="Tanggal"
          value={formData.date}
          onChange={handleChange}
          error={errors.date}
          required
        />
        
        <div className="mb-4 md:col-span-2">
          <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
            Catatan
          </label>
          <textarea
            id="notes"
            name="notes"
            value={formData.notes || ''}
            onChange={handleChange}
            rows={3}
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Tambahkan catatan tentang transaksi ini..."
          ></textarea>
        </div>
      </div>
      
      <div className="mt-6 flex justify-end space-x-3">
        <Button type="button" variant="outline" onClick={() => onSubmit(transaction || defaultTransaction)}>
          Batal
        </Button>
        <Button type="submit" variant="primary">
          {transaction ? 'Update' : 'Simpan'}
        </Button>
      </div>
    </form>
  );
};

export default InventoryTransactionForm;