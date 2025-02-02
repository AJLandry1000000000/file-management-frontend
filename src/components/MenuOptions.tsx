import React from 'react';
import Menu from './Menu';

export interface MenuData {
	id: number;
	name: string;
}

interface MenuOptionsProps {
	locationData: MenuData[];
	affiliationData: MenuData[];
	onLocationChange: (location: string) => void;
	onAffiliationChange: (affiliation: string) => void;
}

const MenuOptions: React.FC<MenuOptionsProps> = ({ locationData, affiliationData, onLocationChange, onAffiliationChange }) => {
  return (
    <div className='menu-options'>
      <div>
        <p>List people by location.</p>
        <Menu menuData={locationData} onMenuChange={onLocationChange} />
      </div>
      <div>
        <p>List people by affiliation.</p>
        <Menu menuData={affiliationData} onMenuChange={onAffiliationChange} />
      </div>
    </div>
  );
};

export default MenuOptions;