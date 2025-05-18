import React, { useState } from 'react';
import { Card, CardHeader, CardContent } from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';

const Settings: React.FC = () => {
  const [organizationInfo, setOrganizationInfo] = useState({
    name: 'Organisasi XYZ',
    email: 'info@organisasixyz.com',
    phone: '021-1234567',
    address: 'Jl. Contoh No. 123, Jakarta Selatan',
    website: 'www.organisasixyz.com',
    logo: 'https://images.pexels.com/photos/2559941/pexels-photo-2559941.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  });

  const [generalSettings, setGeneralSettings] = useState({
    language: 'id',
    dateFormat: 'DD-MM-YYYY',
    currencySymbol: 'Rp',
    timezone: 'Asia/Jakarta'
  });

  const [userSettings, setUserSettings] = useState({
    name: 'Admin',
    email: 'admin@example.com',
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleOrganizationChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setOrganizationInfo({ ...organizationInfo, [name]: value });
  };

  const handleGeneralSettingsChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setGeneralSettings({ ...generalSettings, [name]: value });
  };

  const handleUserSettingsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserSettings({ ...userSettings, [name]: value });
    
    // Clear error when field is changed
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const validatePasswordChange = () => {
    const newErrors: Record<string, string> = {};
    
    if (userSettings.newPassword && !userSettings.oldPassword) {
      newErrors.oldPassword = 'Password lama diperlukan';
    }
    
    if (userSettings.newPassword && userSettings.newPassword.length < 8) {
      newErrors.newPassword = 'Password baru harus minimal 8 karakter';
    }
    
    if (userSettings.newPassword !== userSettings.confirmPassword) {
      newErrors.confirmPassword = 'Password tidak cocok';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSaveOrganizationInfo = (e: React.FormEvent) => {
    e.preventDefault();
    // Save logic would go here
    alert('Informasi organisasi berhasil disimpan');
  };

  const handleSaveGeneralSettings = (e: React.FormEvent) => {
    e.preventDefault();
    // Save logic would go here
    alert('Pengaturan umum berhasil disimpan');
  };

  const handleSaveUserSettings = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validatePasswordChange()) {
      // Save logic would go here
      alert('Pengaturan pengguna berhasil disimpan');
      
      // Reset password fields
      setUserSettings({
        ...userSettings,
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Pengaturan</h1>
        <p className="text-gray-500 mt-1">Konfigurasi sistem dan preferensi pengguna</p>
      </div>
      
      <div className="grid grid-cols-1 gap-6">
        {/* Organization Info */}
        <Card>
          <CardHeader>
            <h2 className="text-lg font-semibold text-gray-900">Informasi Organisasi</h2>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSaveOrganizationInfo}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  id="name"
                  name="name"
                  label="Nama Organisasi"
                  value={organizationInfo.name}
                  onChange={handleOrganizationChange}
                  required
                />
                
                <Input
                  id="email"
                  name="email"
                  type="email"
                  label="Email"
                  value={organizationInfo.email}
                  onChange={handleOrganizationChange}
                  required
                />
                
                <Input
                  id="phone"
                  name="phone"
                  label="Telepon"
                  value={organizationInfo.phone}
                  onChange={handleOrganizationChange}
                />
                
                <Input
                  id="website"
                  name="website"
                  label="Website"
                  value={organizationInfo.website}
                  onChange={handleOrganizationChange}
                />
                
                <div className="mb-4 md:col-span-2">
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                    Alamat
                  </label>
                  <textarea
                    id="address"
                    name="address"
                    rows={3}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    value={organizationInfo.address}
                    onChange={handleOrganizationChange}
                  ></textarea>
                </div>
                
                <Input
                  id="logo"
                  name="logo"
                  label="URL Logo"
                  value={organizationInfo.logo}
                  onChange={handleOrganizationChange}
                />
                
                <div className="flex items-center mb-4">
                  {organizationInfo.logo && (
                    <img
                      src={organizationInfo.logo}
                      alt="Logo Preview"
                      className="h-16 w-16 object-cover rounded"
                    />
                  )}
                </div>
              </div>
              
              <div className="mt-6 flex justify-end">
                <Button type="submit" variant="primary">
                  Simpan Perubahan
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
        
        {/* General Settings */}
        <Card>
          <CardHeader>
            <h2 className="text-lg font-semibold text-gray-900">Pengaturan Umum</h2>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSaveGeneralSettings}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="mb-4">
                  <label htmlFor="language" className="block text-sm font-medium text-gray-700 mb-1">
                    Bahasa
                  </label>
                  <select
                    id="language"
                    name="language"
                    value={generalSettings.language}
                    onChange={handleGeneralSettingsChange}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  >
                    <option value="id">Bahasa Indonesia</option>
                    <option value="en">English</option>
                  </select>
                </div>
                
                <div className="mb-4">
                  <label htmlFor="dateFormat" className="block text-sm font-medium text-gray-700 mb-1">
                    Format Tanggal
                  </label>
                  <select
                    id="dateFormat"
                    name="dateFormat"
                    value={generalSettings.dateFormat}
                    onChange={handleGeneralSettingsChange}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  >
                    <option value="DD-MM-YYYY">DD-MM-YYYY</option>
                    <option value="MM-DD-YYYY">MM-DD-YYYY</option>
                    <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                  </select>
                </div>
                
                <div className="mb-4">
                  <label htmlFor="currencySymbol" className="block text-sm font-medium text-gray-700 mb-1">
                    Simbol Mata Uang
                  </label>
                  <select
                    id="currencySymbol"
                    name="currencySymbol"
                    value={generalSettings.currencySymbol}
                    onChange={handleGeneralSettingsChange}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  >
                    <option value="Rp">Rupiah (Rp)</option>
                    <option value="$">Dollar ($)</option>
                    <option value="€">Euro (€)</option>
                  </select>
                </div>
                
                <div className="mb-4">
                  <label htmlFor="timezone" className="block text-sm font-medium text-gray-700 mb-1">
                    Zona Waktu
                  </label>
                  <select
                    id="timezone"
                    name="timezone"
                    value={generalSettings.timezone}
                    onChange={handleGeneralSettingsChange}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  >
                    <option value="Asia/Jakarta">Asia/Jakarta (WIB)</option>
                    <option value="Asia/Makassar">Asia/Makassar (WITA)</option>
                    <option value="Asia/Jayapura">Asia/Jayapura (WIT)</option>
                  </select>
                </div>
              </div>
              
              <div className="mt-6 flex justify-end">
                <Button type="submit" variant="primary">
                  Simpan Perubahan
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
        
        {/* User Settings */}
        <Card>
          <CardHeader>
            <h2 className="text-lg font-semibold text-gray-900">Pengaturan Pengguna</h2>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSaveUserSettings}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  id="user-name"
                  name="name"
                  label="Nama"
                  value={userSettings.name}
                  onChange={handleUserSettingsChange}
                  required
                />
                
                <Input
                  id="user-email"
                  name="email"
                  type="email"
                  label="Email"
                  value={userSettings.email}
                  onChange={handleUserSettingsChange}
                  required
                />
                
                <div className="md:col-span-2">
                  <h3 className="text-md font-medium text-gray-900 mb-2">Ubah Password</h3>
                </div>
                
                <Input
                  id="oldPassword"
                  name="oldPassword"
                  type="password"
                  label="Password Lama"
                  value={userSettings.oldPassword}
                  onChange={handleUserSettingsChange}
                  error={errors.oldPassword}
                />
                
                <div className="mb-4">
                  {/* Empty div for grid alignment */}
                </div>
                
                <Input
                  id="newPassword"
                  name="newPassword"
                  type="password"
                  label="Password Baru"
                  value={userSettings.newPassword}
                  onChange={handleUserSettingsChange}
                  error={errors.newPassword}
                />
                
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  label="Konfirmasi Password Baru"
                  value={userSettings.confirmPassword}
                  onChange={handleUserSettingsChange}
                  error={errors.confirmPassword}
                />
              </div>
              
              <div className="mt-6 flex justify-end">
                <Button type="submit" variant="primary">
                  Simpan Perubahan
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Settings;