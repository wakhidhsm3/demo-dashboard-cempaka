import React, { useState } from 'react';
import { Table, TableHead, TableBody, TableRow, TableHeader, TableCell } from '../ui/Table';
import Badge from '../ui/Badge';
import Button from '../ui/Button';
import { Edit, Trash2, Plus } from 'lucide-react';
import { Member } from '../../types';
import MemberForm from './MemberForm';
import Modal from '../ui/Modal';
import { formatDate } from '../../data/dummyData';

interface MemberTableProps {
  members: Member[];
  onAddMember: (member: Member) => void;
  onUpdateMember: (member: Member) => void;
  onDeleteMember: (id: string) => void;
}

const MemberTable: React.FC<MemberTableProps> = ({
  members,
  onAddMember,
  onUpdateMember,
  onDeleteMember
}) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentMember, setCurrentMember] = useState<Member | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all');

  const handleAddMember = (member: Member) => {
    onAddMember(member);
    setIsAddModalOpen(false);
  };

  const handleUpdateMember = (member: Member) => {
    onUpdateMember(member);
    setIsEditModalOpen(false);
  };

  const handleDeleteConfirm = () => {
    if (currentMember) {
      onDeleteMember(currentMember.id);
      setIsDeleteModalOpen(false);
    }
  };

  const openEditModal = (member: Member) => {
    setCurrentMember(member);
    setIsEditModalOpen(true);
  };

  const openDeleteModal = (member: Member) => {
    setCurrentMember(member);
    setIsDeleteModalOpen(true);
  };

  const filteredMembers = members.filter(member => {
    const matchesSearch = 
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.role.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = 
      statusFilter === 'all' || 
      (statusFilter === 'active' && member.status === 'active') ||
      (statusFilter === 'inactive' && member.status === 'inactive');
    
    return matchesSearch && matchesStatus;
  });

  return (
    <div>
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <input
            type="text"
            placeholder="Cari anggota..."
            className="border border-gray-300 rounded-md px-4 py-2 w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            className="border border-gray-300 rounded-md px-4 py-2 w-full sm:w-40 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as 'all' | 'active' | 'inactive')}
          >
            <option value="all">Semua Status</option>
            <option value="active">Aktif</option>
            <option value="inactive">Tidak Aktif</option>
          </select>
        </div>
        <Button
          variant="primary"
          className="flex items-center"
          onClick={() => setIsAddModalOpen(true)}
        >
          <Plus size={16} className="mr-1" />
          Tambah Anggota
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <Table>
          <TableHead>
            <TableRow>
              <TableHeader>Anggota</TableHeader>
              <TableHeader>Email</TableHeader>
              <TableHeader>Telepon</TableHeader>
              <TableHeader>Jabatan</TableHeader>
              <TableHeader>Tanggal Bergabung</TableHeader>
              <TableHeader>Status</TableHeader>
              <TableHeader>Aksi</TableHeader>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredMembers.length > 0 ? (
              filteredMembers.map((member) => (
                <TableRow key={member.id}>
                  <TableCell>
                    <div className="flex items-center">
                      <div className="h-10 w-10 flex-shrink-0">
                        <img
                          className="h-10 w-10 rounded-full object-cover"
                          src={member.avatar}
                          alt={member.name}
                        />
                      </div>
                      <div className="ml-4">
                        <div className="font-medium text-gray-900">{member.name}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{member.email}</TableCell>
                  <TableCell>{member.phone}</TableCell>
                  <TableCell>{member.role}</TableCell>
                  <TableCell>{formatDate(member.joinDate)}</TableCell>
                  <TableCell>
                    <Badge
                      variant={member.status === 'active' ? 'success' : 'gray'}
                    >
                      {member.status === 'active' ? 'Aktif' : 'Tidak Aktif'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => openEditModal(member)}
                      >
                        <Edit size={16} />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => openDeleteModal(member)}
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
                  Tidak ada data anggota yang ditemukan
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Add Member Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Tambah Anggota Baru"
        size="lg"
      >
        <MemberForm onSubmit={handleAddMember} />
      </Modal>

      {/* Edit Member Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Edit Anggota"
        size="lg"
      >
        {currentMember && (
          <MemberForm member={currentMember} onSubmit={handleUpdateMember} />
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
          <p className="mb-4">Apakah Anda yakin ingin menghapus anggota ini?</p>
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

export default MemberTable;