import React, { useState } from 'react';
import {Card, CardBody, CardTitle, CardText, Button, Input, InputGroup, CardImg} from 'reactstrap';

const MenuItemCard = ({ item, onAdd }) => {
  const [quantity, setQuantity] = useState(1);

  return (
    <Card className="h-100 shadow-sm">
      <CardImg
        top
        src={item.image}
        alt={item.name}
        style={{ height: '200px', objectFit: 'cover' }}
      />
      <CardBody className="d-flex flex-column">
        <CardTitle tag="h5">{item.name}</CardTitle>
        <CardText className="text-muted">{item.description}</CardText>
        <CardText className="mt-auto"><strong>${item.price.toFixed(2)}</strong></CardText>
        <CardText className="text-muted">{item.calories}</CardText>

        <InputGroup className="mb-3">
          <Input
            type="number"
            min="1"
            max="5"
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value))}/>
          <Button color="primary" onClick={() => onAdd(item, quantity)}>
            Add to Cart
          </Button>
        </InputGroup>
      </CardBody>
    </Card>
  );
};

export default MenuItemCard;
