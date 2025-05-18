import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import TopBar from './TopBar';

const Layout: React.FC = () => {
  return (
    <div className="h-screen flex flex-col">
      <Sidebar />
      <main className="lg:pl-64 flex-1 flex flex-col min-h-screen">
        <TopBar />
        <div className="flex-1 bg-gray-50 p-4 md:p-8 overflow-y-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;