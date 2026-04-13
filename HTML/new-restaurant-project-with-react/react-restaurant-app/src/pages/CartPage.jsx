import React, { useState } from 'react';
import { Container, Table, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { useNavigate } from 'react-router-dom';

const CartPage = ({ cart, clearCart }) => {
  const navigate = useNavigate();
  const [modalType, setModalType] = useState(null);

  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const tax = subtotal * 0.0825;
  const total = subtotal + tax;

  const handleAction = () => {
    clearCart();
    setModalType(null);
    alert(modalType === 'submit' ? "Thank you! Order Submitted." : "Order Cancelled.");
    navigate('/menu');
  };

  if (cart.length === 0) return <Container className="mt-5"><h3>Your cart is empty.</h3></Container>;

  return (
    <Container className="mt-4">
      <h2>Your Cart</h2>
      <Table dark striped>
        <thead>
        <tr><th>Item</th><th>Price</th><th>Qty</th><th>Total</th></tr>
        </thead>
        <tbody>
        {cart.map(item => (
          <tr key={item.id}>
            <td>{item.name}</td>
            <td>${item.price.toFixed(2)}</td>
            <td>{item.quantity}</td>
            <td>${(item.price * item.quantity).toFixed(2)}</td>
          </tr>
        ))}
        </tbody>
      </Table>
      <div className="text-right">
        <p>Subtotal: ${subtotal.toFixed(2)}</p>
        <p>Tax (8.25%): ${tax.toFixed(2)}</p>
        <h4>Final Total: ${total.toFixed(2)}</h4>
      </div>

      <Button color="danger" onClick={() => setModalType('cancel')}>Cancel Order</Button>{' '}
      <Button color="success" onClick={() => setModalType('submit')}>Submit Order</Button>

      <Modal isOpen={!!modalType} toggle={() => setModalType(null)}>
        <ModalHeader>{modalType === 'cancel' ? "Cancel Order" : "Confirm Order"}</ModalHeader>
        <ModalBody>
          {modalType === 'cancel' ? "Are you sure you want to cancel?" : "Ready to place your order?"}
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleAction}>Yes</Button>
          <Button color="secondary" onClick={() => setModalType(null)}>No</Button>
        </ModalFooter>
      </Modal>
    </Container>
  );
};

export default CartPage;
