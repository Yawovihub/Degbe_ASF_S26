import React, { useState } from 'react';
import { Container, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { MENU_ITEMS } from '../data/menuData.js';
import MenuFilter from '../components/MenuFilter';

const MenuPage = ({ addToCart }) => {
  const [filter, setFilter] = useState('All');
  const filteredItems = filter === 'All'
    ? MENU_ITEMS
    : MENU_ITEMS.filter(item => item.category === filter);

  return (
    <Container className="mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Our Menu</h1>
        <UncontrolledDropdown>
          <DropdownToggle caret color="secondary">Filter: {filter}</DropdownToggle>
          <DropdownMenu>
            {['All', 'Breakfast', 'Lunch', 'Dinner'].map(cat => (
              <DropdownItem key={cat} onClick={() => setFilter(cat)}>{cat}</DropdownItem>
            ))}
          </DropdownMenu>
        </UncontrolledDropdown>
      </div>
      <MenuFilter items={filteredItems} onAdd={addToCart} />
    </Container>
  );
};

export default MenuPage;
