import React, { useState, useEffect } from 'react';
import Input from '../ui/Input';
import Button from '../ui/Button';
import { Member } from '../../types';

interface MemberFormProps {
  member?: Member;
  onSubmit: (member: Member) => void;
}

const defaultMember: Member = {
  id: '',
  name: '',
  email: '',
  phone: '',
  role: '',
  joinDate: new Date().toISOString().split('T')[0],
  status: 'active',
  avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
};

const MemberForm: React.FC<MemberFormProps> = ({ member, onSubmit }) => {
  const [formData, setFormData] = useState<Member>(member || { ...defaultMember, id: crypto.randomUUID() });
  const [errors, setErrors] = useState<Partial<Record<keyof Member, string>>>({});

  useEffect(() => {
    if (member) {
      setFormData(member);
    }
  }, [member]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Clear error when field is changed
    if (errors[name as keyof Member]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof Member, string>> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Nama tidak boleh kosong';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email tidak boleh kosong';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Format email tidak valid';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Nomor telepon tidak boleh kosong';
    } else if (!/^[0-9]{10,13}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Nomor telepon tidak valid';
    }
    
    if (!formData.role.trim()) {
      newErrors.role = 'Jabatan tidak boleh kosong';
    }
    
    if (!formData.joinDate) {
      newErrors.joinDate = 'Tanggal bergabung tidak boleh kosong';
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
        <Input
          id="name"
          name="name"
          label="Nama Lengkap"
          value={formData.name}
          onChange={handleChange}
          error={errors.name}
          required
        />
        
        <Input
          id="email"
          name="email"
          type="email"
          label="Email"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
          required
        />
        
        <Input
          id="phone"
          name="phone"
          label="Nomor Telepon"
          value={formData.phone}
          onChange={handleChange}
          error={errors.phone}
          required
        />
        
        <div className="mb-4">
          <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
            Jabatan
          </label>
          <select
            id="role"
            name="role"
            value={formData.role}
            onChange={handleChange}
            className={`
              appearance-none block w-full px-3 py-2 border border-gray-300 
              rounded-md shadow-sm placeholder-gray-400 
              focus:outline-none focus:ring-blue-500 focus:border-blue-500 
              sm:text-sm
              ${errors.role ? 'border-red-500' : ''}
            `}
            required
          >
            <option value="" disabled>Pilih Jabatan</option>
            <option value="Ketua">Ketua</option>
            <option value="Wakil Ketua">Wakil Ketua</option>
            <option value="Sekretaris">Sekretaris</option>
            <option value="Bendahara">Bendahara</option>
            <option value="Anggota">Anggota</option>
          </select>
          {errors.role && <p className="mt-1 text-sm text-red-600">{errors.role}</p>}
        </div>
        
        <Input
          id="joinDate"
          name="joinDate"
          type="date"
          label="Tanggal Bergabung"
          value={formData.joinDate}
          onChange={handleChange}
          error={errors.joinDate}
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
            <option value="active">Aktif</option>
            <option value="inactive">Tidak Aktif</option>
          </select>
        </div>
        
        <Input
          id="avatar"
          name="avatar"
          label="URL Avatar"
          value={formData.avatar}
          onChange={handleChange}
          error={errors.avatar}
        />
      </div>
      
      <div className="mt-6 flex justify-end space-x-3">
        <Button type="button" variant="outline" onClick={() => onSubmit(member || defaultMember)}>
          Batal
        </Button>
        <Button type="submit" variant="primary">
          {member ? 'Update' : 'Simpan'}
        </Button>
      </div>
    </form>
  );
};

export default MemberForm;