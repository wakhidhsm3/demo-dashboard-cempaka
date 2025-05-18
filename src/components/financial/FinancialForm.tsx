import React, { useState, useEffect } from 'react';
import Input from '../ui/Input';
import Button from '../ui/Button';
import { FinancialTransaction } from '../../types';

interface FinancialFormProps {
  transaction?: FinancialTransaction;
  onSubmit: (transaction: FinancialTransaction) => void;
}

const defaultTransaction: FinancialTransaction = {
  id: '',
  type: 'income',
  amount: 0,
  category: '',
  date: new Date().toISOString().split('T')[0],
  description: '',
  paymentMethod: '',
  status: 'completed'
};

const FinancialForm: React.FC<FinancialFormProps> = ({ 
  transaction, 
  onSubmit 
}) => {
  const [formData, setFormData] = useState<FinancialTransaction>(
    transaction || { ...defaultTransaction, id: crypto.randomUUID() }
  );
  const [errors, setErrors] = useState<Partial<Record<keyof FinancialTransaction, string>>>({});

  useEffect(() => {
    if (transaction) {
      setFormData(transaction);
    }
  }, [transaction]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    if (name === 'amount') {
      setFormData({ ...formData, [name]: parseInt(value) || 0 });
    } else {
      setFormData({ ...formData, [name]: value });
    }
    
    // Clear error when field is changed
    if (errors[name as keyof FinancialTransaction]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof FinancialTransaction, string>> = {};
    
    if (formData.amount <= 0) {
      newErrors.amount = 'Jumlah harus lebih dari 0';
    }
    
    if (!formData.category.trim()) {
      newErrors.category = 'Kategori tidak boleh kosong';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Deskripsi tidak boleh kosong';
    }
    
    if (!formData.date) {
      newErrors.date = 'Tanggal tidak boleh kosong';
    }
    
    if (!formData.paymentMethod.trim()) {
      newErrors.paymentMethod = 'Metode pembayaran tidak boleh kosong';
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

  // Predefined categories
  const incomeCategories = [
    'Iuran Anggota',
    'Donasi',
    'Pendapatan Proyek',
    'Pendapatan Acara',
    'Pendapatan Lainnya'
  ];
  
  const expenseCategories = [
    'Perlengkapan Kantor',
    'Pemeliharaan',
    'Konsumsi',
    'Transportasi',
    'Gaji',
    'Sewa',
    'Pengeluaran Lainnya'
  ];
  
  const paymentMethods = [
    'Transfer Bank',
    'Tunai',
    'Kartu Debit',
    'Kartu Kredit',
    'E-wallet',
    'Lainnya'
  ];

  const categories = formData.type === 'income' ? incomeCategories : expenseCategories;

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
            <option value="income">Pemasukan</option>
            <option value="expense">Pengeluaran</option>
          </select>
        </div>
        
        <Input
          id="amount"
          name="amount"
          type="number"
          label="Jumlah (Rp)"
          value={formData.amount}
          onChange={handleChange}
          error={errors.amount}
          min="1"
          required
        />
        
        <div className="mb-4">
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
            Kategori
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className={`
              appearance-none block w-full px-3 py-2 border border-gray-300 
              rounded-md shadow-sm placeholder-gray-400 
              focus:outline-none focus:ring-blue-500 focus:border-blue-500 
              sm:text-sm
              ${errors.category ? 'border-red-500' : ''}
            `}
            required
          >
            <option value="" disabled>Pilih Kategori</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
          {errors.category && <p className="mt-1 text-sm text-red-600">{errors.category}</p>}
        </div>
        
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
        
        <div className="mb-4">
          <label htmlFor="paymentMethod" className="block text-sm font-medium text-gray-700 mb-1">
            Metode Pembayaran
          </label>
          <select
            id="paymentMethod"
            name="paymentMethod"
            value={formData.paymentMethod}
            onChange={handleChange}
            className={`
              appearance-none block w-full px-3 py-2 border border-gray-300 
              rounded-md shadow-sm placeholder-gray-400 
              focus:outline-none focus:ring-blue-500 focus:border-blue-500 
              sm:text-sm
              ${errors.paymentMethod ? 'border-red-500' : ''}
            `}
            required
          >
            <option value="" disabled>Pilih Metode Pembayaran</option>
            {paymentMethods.map(method => (
              <option key={method} value={method}>{method}</option>
            ))}
          </select>
          {errors.paymentMethod && <p className="mt-1 text-sm text-red-600">{errors.paymentMethod}</p>}
        </div>
        
        <div className="mb-4">
          <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
            Status
          </label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            required
          >
            <option value="completed">Selesai</option>
            <option value="pending">Pending</option>
            <option value="cancelled">Dibatalkan</option>
          </select>
        </div>
        
        <div className="mb-4 md:col-span-2">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            Deskripsi
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={3}
            className={`
              appearance-none block w-full px-3 py-2 border border-gray-300 
              rounded-md shadow-sm placeholder-gray-400 
              focus:outline-none focus:ring-blue-500 focus:border-blue-500 
              sm:text-sm
              ${errors.description ? 'border-red-500' : ''}
            `}
            placeholder="Masukkan deskripsi transaksi..."
            required
          ></textarea>
          {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
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

export default FinancialForm;