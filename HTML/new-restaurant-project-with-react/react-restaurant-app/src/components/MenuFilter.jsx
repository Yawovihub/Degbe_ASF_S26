import React from 'react';
import { Row, Col } from 'reactstrap';
import MenuItemCard from './MenuItemCard';


const MenuFilter = ({ items, onAdd }) => {

  if (items.length === 0) {
    return (
      <div className="text-center py-5">
        <p className="text-muted fs-4">No items found in this category.</p>
      </div>
    );
  }
  return (
    <Row className="g-4">
      {items.map((item) => (
        <Col key={item.id} sm="6" md="4" lg="3">
          <MenuItemCard item={item} onAdd={onAdd} />
        </Col>
      ))}
    </Row>
  );
}
 export default MenuFilter;
