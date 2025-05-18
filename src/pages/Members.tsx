import React, { useState } from 'react';
import { members } from '../data/dummyData';
import MemberTable from '../components/members/MemberTable';
import { Member } from '../types';

const Members: React.FC = () => {
  const [membersList, setMembersList] = useState<Member[]>(members);

  const handleAddMember = (member: Member) => {
    setMembersList([...membersList, member]);
  };

  const handleUpdateMember = (updatedMember: Member) => {
    setMembersList(
      membersList.map(member => 
        member.id === updatedMember.id ? updatedMember : member
      )
    );
  };

  const handleDeleteMember = (id: string) => {
    setMembersList(membersList.filter(member => member.id !== id));
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Manajemen Anggota</h1>
        <p className="text-gray-500 mt-1">Kelola data anggota organisasi</p>
      </div>
      
      <MemberTable 
        members={membersList}
        onAddMember={handleAddMember}
        onUpdateMember={handleUpdateMember}
        onDeleteMember={handleDeleteMember}
      />
    </div>
  );
};

export default Members;