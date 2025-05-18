import React, { useState, useEffect } from 'react';
import Input from '../ui/Input';
import Button from '../ui/Button';
import { InventoryItem } from '../../types';

interface InventoryFormProps {
  item?: InventoryItem;
  onSubmit: (item: InventoryItem) => void;
}

const defaultItem: InventoryItem = {
  id: '',
  name: '',
  category: '',
  quantity: 0,
  status: 'available',
  lastUpdated: new Date().toISOString().split('T')[0],
  image: ''
};

const InventoryForm: React.FC<InventoryFormProps> = ({ item, onSubmit }) => {
  const [formData, setFormData] = useState<InventoryItem>(item || { ...defaultItem, id: crypto.randomUUID() });
  const [errors, setErrors] = useState<Partial<Record<keyof InventoryItem, string>>>({});

  useEffect(() => {
    if (item) {
      setFormData(item);
    }
  }, [item]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    // Handle number inputs
    if (name === 'quantity') {
      setFormData({ ...formData, [name]: parseInt(value) || 0 });
    } else {
      setFormData({ ...formData, [name]: value });
    }
    
    // Clear error when field is changed
    if (errors[name as keyof InventoryItem]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof InventoryItem, string>> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Nama tidak boleh kosong';
    }
    
    if (!formData.category.trim()) {
      newErrors.category = 'Kategori tidak boleh kosong';
    }
    
    if (formData.quantity < 0) {
      newErrors.quantity = 'Jumlah tidak boleh negatif';
    }
    
    if (!formData.lastUpdated) {
      newErrors.lastUpdated = 'Tanggal pembaruan tidak boleh kosong';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validate()) {
      // Always update the lastUpdated field to the current date
      const updatedFormData = {
        ...formData,
        lastUpdated: new Date().toISOString().split('T')[0]
      };
      onSubmit(updatedFormData);
    }
  };

  // Predefined categories for selection
  const categories = [
    'Elektronik',
    'Furnitur',
    'Alat Tulis',
    'Peralatan',
    'Lainnya'
  ];

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          id="name"
          name="name"
          label="Nama Item"
          value={formData.name}
          onChange={handleChange}
          error={errors.name}
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
          id="quantity"
          name="quantity"
          type="number"
          label="Jumlah"
          value={formData.quantity}
          onChange={handleChange}
          error={errors.quantity}
          min="0"
          required
        />
        
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
            <option value="available">Tersedia</option>
            <option value="low">Stok Rendah</option>
            <option value="lent">Dipinjam</option>
            <option value="maintenance">Pemeliharaan</option>
          </select>
        </div>
        
        <Input
          id="image"
          name="image"
          label="URL Gambar"
          value={formData.image}
          onChange={handleChange}
          error={errors.image}
          placeholder="https://example.com/image.jpg"
        />
      </div>
      
      <div className="mt-6 flex justify-end space-x-3">
        <Button type="button" variant="outline" onClick={() => onSubmit(item || defaultItem)}>
          Batal
        </Button>
        <Button type="submit" variant="primary">
          {item ? 'Update' : 'Simpan'}
        </Button>
      </div>
    </form>
  );
};

export default InventoryForm;