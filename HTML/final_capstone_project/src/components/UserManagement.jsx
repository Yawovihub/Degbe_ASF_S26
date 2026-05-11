import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, ListGroup, Button, Spinner, Alert, Modal } from 'react-bootstrap';
import SoldierDashboard from './SoldierDashboard';
import EditModal from './EditModal';
import AddUserModal from './AddUserModal';


const BACKEND_URL = 'http://localhost:8080/api/soldiers';

const UserManagement = () => {
    const [soldiers, setSoldiers] = useState([]);
    const [selectedSoldier, setSelectedSoldier] = useState(null);
    const [activeModal, setActiveModal] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [modalType, setModalType] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [soldierIdToDelete, setSoldierIdToDelete] = useState(null);

    const fetchSoldiers = async () => {
        setLoading(true);
        try {
            const response = await axios.get(BACKEND_URL);
            setSoldiers(response.data);
        } catch (err) {
            console.error(err);
            setError("Failed to load roster.");
        } finally {
            // This MUST run to hide the spinner
            setLoading(false);
        }
    };

    // Fetch soldiers from the backend

    const fetchSoldierData = async () => {
        // 1. Guard Clause: Don't do anything if no soldier is selected
        if (!selectedSoldier) return;

        // 2. Determine the ID
        const soldierId = selectedSoldier.id || selectedSoldier.soldier_id || selectedSoldier.soldierId;

        // 3. If ID is still missing, stop here to prevent 405/404 errors
        if (!soldierId) {
            console.warn("Refresh aborted: No valid ID found for selected soldier.");
            return;
        }

        try {
            // 4. Move the call INSIDE the try block
            const response = await axios.get(`${BACKEND_URL}/${soldierId}`);

            if (response.data) {
                const updatedSoldier = response.data;

                // 5. Handle the photo mapping
                if (updatedSoldier.photo) {
                    updatedSoldier.photoUrl = `data:image/jpeg;base64,${updatedSoldier.photo}`;
                }

                // 6. Update states
                setSelectedSoldier(updatedSoldier);

                // 7. Update the roster list so the 'Back' view is current
                setSoldiers(prev => prev.map(s =>
                    s.id === updatedSoldier.id ? updatedSoldier : s
                ));

                console.log("FRESH DATA FROM SERVER:", updatedSoldier.counselingHistory);

                console.log("UI Refreshed with new data for Soldier:", soldierId);
            }
        } catch (error) {
            console.error("Error refreshing soldier data:", error.response?.data || error.message);
        }
    };

    useEffect(() => {
        fetchSoldiers();
    }, []);

    // Handle editing an attribute from the dashboard
    const handleEdit = (soldier, modalType) => {
        setSelectedSoldier(soldier);
        if (modalType === 'none') {
            if (soldier) {
                sessionStorage.setItem('selectedSoldierId', soldier.id || soldier.soldier_id || soldier.soldierId);
            }
            return; // Exit early so the modal doesn't open
        }
        setActiveModal(modalType);
        setIsModalOpen(true);
        if (soldier) {
            sessionStorage.setItem('selectedSoldierId', soldier.id || soldier.soldier_id || soldier.soldierId);
        }

    };

    const handleSave = async (formData) => {
        const isNewSoldier = !formData.id;
        try {
            if (isNewSoldier) {
                await axios.post(BACKEND_URL, formData);
            } else {
                const response = await axios.put(`${BACKEND_URL}/${formData.id}`, formData);
                // UPDATE: Immediately update the selectedSoldier with the response from the server
                setSelectedSoldier(response.data);
            }
            await fetchSoldiers(); // Keeps the roster list in sync
            setIsModalOpen(false);
            alert(isNewSoldier ? 'Soldier added successfully!' : 'Changes saved successfully!');
        } catch (error) {
            console.error('Save failed:', error);
            alert('Error: ' + (error.response?.data?.message || error.message));
        }
    };

    const handleOpenModal = (soldierData, type) => {
        setSelectedSoldier(soldierData);
        if (type === 'edit' || type === 'photo') {
            setModalType(type);
            setIsModalOpen(true);
        } else {
            console.error("Invalid modal type passed:", type);
        }
    };

    const handleAddUserSave = async (newSoldier) => {

        // 1. Clean the data: Convert empty strings to null
        const cleanedSoldier = { };
        Object.keys(newSoldier).forEach(key => {
            const value = newSoldier[key];
            // If it's an empty string, set to null.
            // If it's "User" or "Present", keep it.
            cleanedSoldier[key] = (value === "" || value === undefined) ? null : value;
        });
        // Special check: ensure soldier_id is a number if your backend expects a Long/Integer
        if (cleanedSoldier.soldier_id) {
            cleanedSoldier.soldier_id = parseInt(cleanedSoldier.soldier_id, 10);
        }

        try {
            await axios.post(BACKEND_URL, cleanedSoldier);
            setIsAddModalOpen(false);
            await fetchSoldiers();
        } catch {
            setError('Could not add the soldier.');
        }
    };

    // Trigger the delete confirmation popup
    const handleDeleteUser = (e, id) => {
        e.stopPropagation(); // Prevents the ListGroup.Item click from firing
        setSoldierIdToDelete(id);
        setShowDeleteModal(true);
    };

    // Remove a soldier from the backend after confirmation
    const confirmDelete = async () => {
        if (!soldierIdToDelete) return;
        try {
            await axios.delete(`${BACKEND_URL}/${soldierIdToDelete}`);
            if (selectedSoldier && selectedSoldier.id === soldierIdToDelete) {
                handleBack();
            }
            await fetchSoldiers();
        } catch {
            setError('Could not delete the soldier. Verify your backend endpoint mapping.');
        } finally {
            setShowDeleteModal(false);
            setSoldierIdToDelete(null);
        }
    };

    // Handle return action and clear persisted state
    const handleBack = () => {
        setSelectedSoldier(null);
        sessionStorage.removeItem('selectedSoldierId');
        fetchSoldiers();
    };

    const handleSelectSoldier = (soldier) => {
        setSelectedSoldier(soldier);
        sessionStorage.setItem('selectedSoldierId', soldier.id);
    };

    return (
        <Container className="mt-4">
            {error && <Alert variant="danger">{error}</Alert>}

            {selectedSoldier ? (
                <SoldierDashboard
                    soldier={selectedSoldier}
                    onBack={handleBack}
                    onEdit={handleEdit}
                    onUploadSuccess={fetchSoldierData}
                    fetchSoldierData={fetchSoldierData}
                />
            ) : (
                <div>
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <h3 className="text-secondary m-0">Soldier Roster</h3>
                        <Button
                            variant="success"
                            onClick={() => setIsAddModalOpen(true)}>
                            <i className="bi bi-person-plus-fill me-1"></i> Add Soldier
                        </Button>
                    </div>

                    {loading ? (
                        <div className="text-center my-5">
                            <Spinner animation="border" variant="primary" />
                            <p className="mt-2 text-muted">Loading roster data...</p>
                        </div>
                    ) : (
                        <ListGroup className="shadow-sm">
                            {Array.isArray(soldiers) && soldiers.length > 0 ? (
                                soldiers.map((soldier) => (
                                    <ListGroup.Item
                                        key={soldier.id}
                                        action
                                        onClick={() => handleSelectSoldier(soldier)}
                                        className="d-flex justify-content-between align-items-center py-3"
                                    >
                                        <div>
                                            <strong>{soldier.rank} {soldier.name}</strong>
                                        </div>
                                        <div className="d-flex gap-2">
                                            <Button
                                                variant="outline-primary"
                                                size="sm"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleSelectSoldier(soldier);
                                                }}
                                            >
                                                View Profile
                                            </Button>
                                            <Button
                                                variant="outline-danger"
                                                size="sm"
                                                onClick={(e) => handleDeleteUser(e, soldier.id)}
                                                title="Remove Soldier"
                                            >
                                                <i className="bi bi-trash-fill"></i>
                                            </Button>
                                        </div>
                                    </ListGroup.Item>
                                ))
                            ) : (
                                <ListGroup.Item className="text-center text-muted py-4">
                                    No soldiers found.
                                </ListGroup.Item>
                            )}
                        </ListGroup>
                    )}
                </div>
            )}

            {/* Edit Modal */}
            {isModalOpen && (
                <EditModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    soldier={selectedSoldier}
                    modalType={activeModal}
                    onSave={handleSave}
                />
            )}

            {/* Add User Modal */}
            <AddUserModal
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                onSave={handleAddUserSave}
            />

            {/* Custom Delete Confirmation Modal */}
            <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} centered>
                <Modal.Header closeButton className="bg-danger text-white">
                    <Modal.Title>Confirm Soldier Removal</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to permanently remove this soldier from the roster? This action cannot be undone.
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={confirmDelete}>
                        Remove Soldier
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default UserManagement;