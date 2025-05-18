import React, { useState } from 'react';
import { inventoryItems } from '../data/dummyData';
import InventoryTable from '../components/inventory/InventoryTable';
import { InventoryItem } from '../types';

const Inventory: React.FC = () => {
  const [itemsList, setItemsList] = useState<InventoryItem[]>(inventoryItems);

  const handleAddItem = (item: InventoryItem) => {
    setItemsList([...itemsList, item]);
  };

  const handleUpdateItem = (updatedItem: InventoryItem) => {
    setItemsList(
      itemsList.map(item => 
        item.id === updatedItem.id ? updatedItem : item
      )
    );
  };

  const handleDeleteItem = (id: string) => {
    setItemsList(itemsList.filter(item => item.id !== id));
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Manajemen Inventaris</h1>
        <p className="text-gray-500 mt-1">Kelola data inventaris organisasi</p>
      </div>
      
      <InventoryTable 
        items={itemsList}
        onAddItem={handleAddItem}
        onUpdateItem={handleUpdateItem}
        onDeleteItem={handleDeleteItem}
      />
    </div>
  );
};

export default Inventory;