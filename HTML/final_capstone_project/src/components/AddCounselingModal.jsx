import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';

const AddCounselingModal = ({ isOpen, onClose, soldierId, onSuccess }) => {
    const url = `http://localhost:8080/api/soldiers/${soldierId}/counseling`;
    const [counseling, setCounseling] = useState({
        type: 'Event-Oriented',
        counseling_date: new Date().toISOString().split('T')[0]
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!soldierId) {
            alert("Error: Soldier ID is missing.");
            return;
        }

        const payload = {
            type: counseling.type,
            counseling_date: counseling.counseling_date
        };

        try {
            console.log("Sending POST to:", url);
            const response = await axios.post(url, payload);

            // Check if the server actually returned a 200/201
            if (response.status === 200 || response.status === 201) {
                console.log("Save successful, refreshing data...");
                onSuccess(); // This triggers fetchSoldierData in UserManagement
                onClose();
            }
        } catch (error) {
            console.error("Error adding counseling:", error.response?.data || error.message);
            alert("Failed to add counseling record.");
        }
    };

    return (
        <Modal show={isOpen} onHide={onClose} centered>
            <Modal.Header closeButton className="bg-success text-white">
                <Modal.Title>Add Counseling Record</Modal.Title>
            </Modal.Header>
            <Form onSubmit={handleSubmit}>
                <Modal.Body>
                    <Form.Group className="mb-3">
                        <Form.Label className="fw-bold">Counseling Type</Form.Label>
                        <Form.Select
                            value={counseling.type}
                            onChange={(e) => setCounseling({...counseling, type: e.target.value})}
                        >
                            <option value="Event-Oriented">Event-Oriented</option>
                            <option value="Performance">Performance</option>
                            <option value="Professional Growth">Professional Growth</option>
                            <option value="Initial">Initial</option>
                            {/* FIX: Removed duplicate "Initial" value here */}
                            <option value="General">General</option>
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label className="fw-bold">Date of Counseling</Form.Label>
                        <Form.Control
                            type="date"
                            value={counseling.counseling_date}
                            onChange={(e) => setCounseling({...counseling, counseling_date: e.target.value})}
                            required
                        />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={onClose}>Cancel</Button>
                    <Button variant="success" type="submit">Save Record</Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
};

export default AddCounselingModal;