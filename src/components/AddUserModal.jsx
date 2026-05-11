import React, { useState, useEffect, useRef } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import { IMaskInput } from 'react-imask';

const INITIAL_STATE = {
    name: '', email: '', rank: '', unit: '', role: 'User',
    soldier_id: '', phone: '', is_married: false,
    lives_on_post: false, mos: '',
    acft_score: '', acft_date: '', weapon_score: '', weapon_qual_date: '',
    vision_due: '', dental_due: '', immunization_due: '', hearing_due: '',
    hiv_due: '', profile_due: '', pha_due: '',
    squad_leader: '', squad_leader_phone_number: '', psg: '',
    psg_phone_number: '', first_sgt: '', first_sgt_phone_number: '',
    next_counseling_due: '', blood_type: '', bio: '', photo: null,
};

const AddUserModal = ({ isOpen, onClose, onSave, editingUser, activeSection = 'all' }) => {
    const [formData, setFormData] = useState(INITIAL_STATE);
    const lastLoadedUserRef = useRef(null);

    useEffect(() => {
        if (!isOpen) {
            lastLoadedUserRef.current = null;
            return;
        }
        const currentUserId = editingUser?.id || 'new';
        if (lastLoadedUserRef.current !== currentUserId) {
            setFormData(editingUser ? { ...editingUser } : INITIAL_STATE);
            lastLoadedUserRef.current = currentUserId;
        }
    }, [editingUser, isOpen]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
        onClose();
    };

    const isVisible = (sec) => activeSection === 'all' || activeSection === sec;

    const handleInputChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    return (
        <Modal show={isOpen} onHide={onClose} size="lg" centered>
            <Modal.Header closeButton className="bg-dark text-white fw-bold">
                <Modal.Title>
                    {activeSection === 'all' ? (editingUser ? 'Full Soldier Profile' : 'New Soldier') : `Update ${activeSection.toUpperCase()}`}
                </Modal.Title>
            </Modal.Header>
            <Form onSubmit={handleSubmit}>
                <Modal.Body style={{ maxHeight: '75vh', overflowY: 'auto' }}>

                    {/* 1. Administrative & Soldier's Infos */}
                    {isVisible('admin') && (
                        <div className="section mb-4">
                            <h6 className="text-primary border-bottom pb-2 mb-3">Administrative & Soldier's Infos</h6>
                            <Row>
                                <Col md={6}>
                                    <Form.Group className="mb-3">
                                        <Form.Label className="fw-semibold">Name</Form.Label>
                                        <Form.Control type="text" value={formData.name || ''} onChange={(e) => handleInputChange('name', e.target.value)} required />
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group className="mb-3">
                                        <Form.Label className="fw-semibold">Email</Form.Label>
                                        <Form.Control type="email" value={formData.email || ''} onChange={(e) => handleInputChange('email', e.target.value)} required />
                                    </Form.Group>
                                </Col>
                                <Col md={4}>
                                    <Form.Group className="mb-3">
                                        <Form.Label className="fw-semibold">Rank</Form.Label>
                                        <Form.Control type="text" value={formData.rank || ''} onChange={(e) => handleInputChange('rank', e.target.value)} />
                                    </Form.Group>
                                </Col>
                                <Col md={4}>
                                    <Form.Group className="mb-3">
                                        <Form.Label className="fw-semibold">Unit</Form.Label>
                                        <Form.Control type="text" value={formData.unit || ''} onChange={(e) => handleInputChange('unit', e.target.value)} />
                                    </Form.Group>
                                </Col>
                                <Col md={4}>
                                    <Form.Group className="mb-3">
                                        <Form.Label className="fw-semibold">DOD ID</Form.Label>
                                        <Form.Control type="number" value={formData.soldier_id || ''} onChange={(e) => handleInputChange('soldier_id', e.target.value)} />
                                    </Form.Group>
                                </Col>
                                <Col md={4}>
                                    <Form.Group className="mb-3">
                                        <Form.Label className="fw-semibold">Phone Number</Form.Label>
                                        <Form.Control
                                            type="text"
                                            value={formData.phone || ''}
                                            onChange={(e) => handleInputChange('phone', e.target.value)}

                                        />
                                    </Form.Group>
                                </Col>
                                <Col md={4}>
                                    <Form.Group className="mb-3">
                                        <Form.Label className="fw-semibold">M.O.S</Form.Label>
                                        <Form.Control type="text" value={formData.mos || '15R'} onChange={(e) => handleInputChange('mos', e.target.value)} />
                                    </Form.Group>
                                </Col>
                                <Col md={4}>
                                    <Form.Group className="mb-3">
                                        <Form.Label className="fw-semibold">Status</Form.Label>
                                        <Form.Select
                                            value={formData.role || 'Present'}
                                            onChange={(e) => handleInputChange('role', e.target.value)}
                                        >
                                            <option value="Present">Present</option>
                                            <option value="Deployed">Deployed</option>
                                            <option value="onLeave">On leave</option>
                                            <option value="Appointment">Appointment</option>
                                        </Form.Select>
                                    </Form.Group>
                                </Col>
                            </Row>
                        </div>
                    )}

                    {/* 2. Immediate Chain of Command */}
                    {isVisible('chain') && (
                        <div className="section mb-4">
                            <h6 className="text-primary border-bottom pb-2 mb-3">Immediate Chain of Command</h6>
                            <Row>
                                <Col md={4}>
                                    <Form.Group className="mb-3">
                                        <Form.Label className="fw-semibold">Squad Leader</Form.Label>
                                        <Form.Control type="text" value={formData.squad_leader || ''} onChange={(e) => handleInputChange('squad_leader', e.target.value)} />
                                    </Form.Group>
                                </Col>
                                <Col md={4}>
                                    <Form.Group className="mb-3">
                                        <Form.Label className="fw-semibold">Platoon Sgt (PSG)</Form.Label>
                                        <Form.Control type="text" value={formData.psg || ''} onChange={(e) => handleInputChange('psg', e.target.value)} />
                                    </Form.Group>
                                </Col>
                                <Col md={4}>
                                    <Form.Group className="mb-3">
                                        <Form.Label className="fw-semibold">1SG</Form.Label>
                                        <Form.Control type="text" value={formData.first_sgt || ''} onChange={(e) => handleInputChange('first_sgt', e.target.value)} />
                                    </Form.Group>
                                </Col>
                                <Col md={4}>
                                    <Form.Group className="mb-3">
                                        <Form.Label className="fw-semibold">Squad Leader Contact</Form.Label>
                                        <Form.Control type="text" value={formData.squad_leader_phone_number || ''} onChange={(e) => handleInputChange('squad_leader_phone_number', e.target.value)} />
                                    </Form.Group>
                                </Col>
                                <Col md={4}>
                                    <Form.Group className="mb-3">
                                        <Form.Label className="fw-semibold">Platoon Sgt Contact</Form.Label>
                                        <Form.Control type="text" value={formData.psg_phone_number || ''} onChange={(e) => handleInputChange('psg_phone_number', e.target.value)} />
                                    </Form.Group>
                                </Col>
                                <Col md={4}>
                                    <Form.Group className="mb-3">
                                        <Form.Label className="fw-semibold">1SG Contact</Form.Label>
                                        <Form.Control type="text" value={formData.first_sgt_phone_number || ''} onChange={(e) => handleInputChange('first_sgt_phone_number', e.target.value)} />
                                    </Form.Group>
                                </Col>
                            </Row>
                        </div>
                    )}

                    {/* 3. Training & Weapons Section */}
                    {isVisible('acftWeapon') && (
                        <div className="section mb-4">
                            <h6 className="text-primary border-bottom pb-2 mb-3">Training & Weapon Qualification</h6>
                            <Row>
                                <Col md={6}>
                                    <Form.Group className="mb-3">
                                        <Form.Label className="fw-semibold">ACFT Score</Form.Label>
                                        <Form.Control type="number" value={formData.acft_score || ''} onChange={(e) => handleInputChange('acft_score', e.target.value)} />
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group className="mb-3">
                                        <Form.Label className="fw-semibold">ACFT Date</Form.Label>
                                        <Form.Control type="date" value={formData.acft_date || ''} onChange={(e) => handleInputChange('acft_date', e.target.value)} />
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group className="mb-3">
                                        <Form.Label className="fw-semibold">Weapon Score</Form.Label>
                                        <Form.Control type="number" value={formData.weapon_score || ''} onChange={(e) => handleInputChange('weapon_score', e.target.value)} />
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group className="mb-3">
                                        <Form.Label className="fw-semibold">Weapon Qual Date</Form.Label>
                                        <Form.Control type="date" value={formData.weapon_qual_date || ''} onChange={(e) => handleInputChange('weapon_qual_date', e.target.value)} />
                                    </Form.Group>
                                </Col>
                            </Row>
                        </div>
                    )}

                    {/* 4. MEDPROS Section */}
                    {isVisible('medpros') && (
                        <div className="section mb-4">
                            <h6 className="text-danger border-bottom pb-2 mb-3">MEDPROS Tracking</h6>
                            <Row>
                                <Col md={4}>
                                    <Form.Group className="mb-3">
                                        <Form.Label className="fw-semibold">Vision</Form.Label>
                                        <Form.Control type="date" value={formData.vision_due || ''} onChange={(e) => handleInputChange('vision_due', e.target.value)} />
                                    </Form.Group>
                                </Col>
                                <Col md={4}>
                                    <Form.Group className="mb-3">
                                        <Form.Label className="fw-semibold">Dental</Form.Label>
                                        <Form.Control type="date" value={formData.dental_due || ''} onChange={(e) => handleInputChange('dental_due', e.target.value)} />
                                    </Form.Group>
                                </Col>
                                <Col md={4}>
                                    <Form.Group className="mb-3">
                                        <Form.Label className="fw-semibold">Hearing</Form.Label>
                                        <Form.Control type="date" value={formData.hearing_due || ''} onChange={(e) => handleInputChange('hearing_due', e.target.value)} />
                                    </Form.Group>
                                </Col>
                                <Col md={4}>
                                    <Form.Group className="mb-3">
                                        <Form.Label className="fw-semibold">Immunizations</Form.Label>
                                        <Form.Control type="date" value={formData.immunization_due || ''} onChange={(e) => handleInputChange('immunization_due', e.target.value)} />
                                    </Form.Group>
                                </Col>
                                <Col md={4}>
                                    <Form.Group className="mb-3">
                                        <Form.Label className="fw-semibold">HIV</Form.Label>
                                        <Form.Control type="date" value={formData.hiv_due || ''} onChange={(e) => handleInputChange('hiv_due', e.target.value)} />
                                    </Form.Group>
                                </Col>
                                <Col md={4}>
                                    <Form.Group className="mb-3">
                                        <Form.Label className="fw-semibold">Profile</Form.Label>
                                        <Form.Control type="date" value={formData.profile_due || ''} onChange={(e) => handleInputChange('profile_due', e.target.value)} />
                                    </Form.Group>
                                </Col>
                                <Col md={12}>
                                    <Form.Group className="mb-3">
                                        <Form.Label className="fw-semibold">PHA Due Date</Form.Label>
                                        <Form.Control type="date" value={formData.pha_due || ''} onChange={(e) => handleInputChange('pha_due', e.target.value)} />
                                    </Form.Group>
                                </Col>
                                <Col md={4}>
                                    <Form.Group className="mb-3">
                                        <Form.Label className="fw-semibold">Blood Type</Form.Label>
                                        <Form.Control type="text" value={formData.blood_type || ''} onChange={(e) => handleInputChange('blood_type', e.target.value)} />
                                    </Form.Group>
                                </Col>
                            </Row>
                        </div>
                    )}

                    {/* 5. Biography & Counseling */}
                    {isVisible('bioCounseling') && (
                        <div className="section mb-4">
                            <h6 className="text-success border-bottom pb-2 mb-3">History & Counseling</h6>
                            <Row>
                                <Col md={12}>
                                    <Form.Group className="mb-3">
                                        <Form.Label className="fw-semibold">Next Counseling</Form.Label>
                                        <Form.Control type="date" value={formData.next_counseling_due || ''} onChange={(e) => handleInputChange('next_counseling_due', e.target.value)} />
                                    </Form.Group>
                                </Col>
                                <Col md={12}>
                                    <Form.Group className="mb-3">
                                        <Form.Label className="fw-semibold">Bio</Form.Label>
                                        <Form.Control as="textarea" rows={3} value={formData.bio || ''} onChange={(e) => handleInputChange('bio', e.target.value)} />
                                    </Form.Group>
                                </Col>
                            </Row>
                        </div>
                    )}
                </Modal.Body>
                <Modal.Footer className="bg-light">
                    <Button variant="secondary" onClick={onClose}>Cancel</Button>
                    <Button variant="primary" type="submit">Save Changes</Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
};

export default AddUserModal;