import React, { useState } from 'react';
import { Search, Bell, MessageSquare, LogOut } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import Badge from '../ui/Badge';

const TopBar: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { signOut } = useAuth();
  
  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };
  
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left side - Search */}
          <div className="flex-1 flex items-center max-w-md">
            <div className="w-full relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={18} className="text-gray-400" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-gray-50 
                          placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:bg-white 
                          focus:border-blue-500 focus:ring-1 focus:ring-blue-500 sm:text-sm transition duration-150 ease-in-out"
              />
            </div>
          </div>
          
          {/* Right side - Notifications, Messages, etc. */}
          <div className="flex items-center ml-4 space-x-4">
            {/* Notifications */}
            <button className="relative p-1 text-gray-500 hover:text-gray-700 focus:outline-none">
              <Bell size={20} />
              <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white"></span>
            </button>
            
            {/* Messages */}
            <button className="relative p-1 text-gray-500 hover:text-gray-700 focus:outline-none">
              <MessageSquare size={20} />
              <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-blue-500 ring-2 ring-white"></span>
            </button>
            
            {/* Sign Out */}
            <button
              onClick={handleSignOut}
              className="p-1 text-gray-500 hover:text-gray-700 focus:outline-none"
            >
              <LogOut size={20} />
            </button>
            
            {/* User Profile */}
            <div className="flex items-center">
              <div className="relative">
                <button className="flex text-sm border-2 border-transparent rounded-full focus:outline-none focus:border-gray-300 transition duration-150 ease-in-out">
                  <img
                    className="h-8 w-8 rounded-full object-cover"
                    src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                    alt="Profile"
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default TopBar;