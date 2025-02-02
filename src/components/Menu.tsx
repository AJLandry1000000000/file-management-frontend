import React from 'react';
import { MenuData } from './MenuOptions';


interface MenuProps {
  menuData: MenuData[];
  onMenuChange: (location: string) => void;
}

const MenuProps: React.FC<MenuProps> = ({ menuData, onMenuChange }) => {
  const handleMenuChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onMenuChange(event.target.value);
  };

  return (
    <select onChange={handleMenuChange}>
      <option value="">Select a location</option>
      {menuData.map((menu: MenuData) => (
        <option key={menu.name + '_' + menu.id} value={menu.name}>
          {menu.name}
        </option>
      ))}
    </select>
  );
};

export default MenuProps;