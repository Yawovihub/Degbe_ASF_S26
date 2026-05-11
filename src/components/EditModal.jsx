import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import PhotoUploadCard from "./PhotoUploadCard.jsx";

const EditModal = ({ isOpen, onClose, soldier, modalType, onSave }) => {
    const [formData, setFormData] = useState({
        soldier_id: '',
        phone: '',
        role:'',
        marital: '',
        housing: '',
        proficiency: '',
        acft_score: '',
        acft_date: '',
        weapon_score: '',
        weapon_qual_date: '',
        vision_due: '',
        dental_due: '',
        immunization_due: '',
        hearing_due: '',
        hiv_due: '',
        profile_due: '',
        pha_due: '',
        blood_type: '',
        squad_leader: '',
        squad_leader_phone_number: '',
        psg: '',
        psg_phone_number: '',
        first_sgt: '',
        first_sgt_phone_number: '',
        bio: '',
        next_counseling_due: '',
        photo: '',
    });

    // Populate the form when a soldier is selected
    useEffect(() => {
        if (soldier) {
            setFormData({
                soldier_id: soldier.soldier_id  ,
                name: soldier.name || '',
                phone: soldier.phone || '',
                marital: soldier.is_married ? 'Married' : 'Single',
                housing: soldier.lives_on_post ? 'On Post' : 'Off Post',
                proficiency: soldier.mos || '',
                acft_score: soldier.acft_score || '',
                acft_date: soldier.acft_date || '',
                weapon_score: soldier.weapon_score || '',
                weapon_qual_date: soldier.weapon_qual_date || '',
                vision_due: soldier.vision_due || '',
                dental_due: soldier.dental_due || '',
                immunization_due: soldier.immunization_due || '',
                hearing_due: soldier.hearing_due || '',
                hiv_due: soldier.hiv_due || '',
                profile_due: soldier.profile_due || '',
                pha_due: soldier.pha_due || '',
                blood_type: soldier.blood_type || '',
                squad_leader: soldier.squad_leader || '',
                squad_leader_phone_number: soldier.squad_leader_phone_number || '',
                psg: soldier.psg || '',
                psg_phone_number: soldier.psg_phone_number || '',
                first_sgt: soldier.first_sgt || '',
                first_sgt_phone_number: soldier.first_sgt_phone_number || '',
                bio: soldier.bio || '',
                next_counseling_due: soldier.next_counseling_due || '',
                photo: soldier.photo || '',
            });
        }
    }, [soldier]);

    // Handle form input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    // Submit the updated object
    const handleSubmit = (e) => {
        e.preventDefault();

        const payload = {
            id: soldier.id,
            soldier_id: formData.soldier_id,
            name: formData.name,
            phone: formData.phone,
            is_married: formData.marital === 'Married',
            lives_on_post: formData.housing === 'On Post',
            mos: formData.proficiency,
            acft_score: formData.acft_score,
            acft_date: formData.acft_date,
            weapon_score: formData.weapon_score,
            weapon_qual_date: formData.weapon_qual_date,
            vision_due: formData.vision_due,
            dental_due: formData.dental_due,
            immunization_due: formData.immunization_due,
            hearing_due: formData.hearing_due,
            hiv_due: formData.hiv_due,
            profile_due: formData.profile_due,
            pha_due: formData.pha_due,
            blood_type: formData.blood_type,
            squad_leader: formData.squad_leader,
            squad_leader_phone_number: formData.squad_leader_phone_number,
            psg: formData.psg,
            psg_phone_number: formData.psg_phone_number,
            first_sgt: formData.first_sgt,
            first_sgt_phone_number: formData.first_sgt_phone_number,
            bio: formData.bio,
            next_counseling_due: formData.next_counseling_due,
            photo: formData.photo,
        };
        onSave(payload);
    };

    const renderFormFields = () => {
        const type = modalType ? modalType.toLowerCase().trim() : '';
        switch (type) {
            case 'admin':
            case 'edit details':
                return (
                    <>
                        <Form.Group className="mb-3">
                            <Form.Label>Full Name</Form.Label>
                            <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} autoFocus />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Soldier ID</Form.Label>
                            <Form.Control type="number" name="soldier_id" value={formData.soldier_id} onChange={handleChange} autoFocus />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Phone</Form.Label>
                            <Form.Control type="text" name="phone" value={formData.phone} onChange={handleChange} autoFocus />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Marital Status</Form.Label>
                            <Form.Control type="text" name="marital" value={formData.marital} onChange={handleChange} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Housing</Form.Label>
                            <Form.Control type="text" name="housing" value={formData.housing} onChange={handleChange} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Proficiency</Form.Label>
                            <Form.Control type="text" name="proficiency" value={formData.proficiency} onChange={handleChange} />
                        </Form.Group>
                    </>
                );
            case 'acftweapon':
                return (
                    <>
                        <Form.Group className="mb-3">
                            <Form.Label>ACFT Score</Form.Label>
                            <Form.Control type="number" name="acft_score" value={formData.acft_score} onChange={handleChange} autoFocus />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>ACFT Date</Form.Label>
                            <Form.Control type="date" name="acft_date" value={formData.acft_date} onChange={handleChange} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Weapon Score</Form.Label>
                            <Form.Control type="number" name="weapon_score" value={formData.weapon_score} onChange={handleChange} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Weapon Qual Date</Form.Label>
                            <Form.Control type="date" name="weapon_qual_date" value={formData.weapon_qual_date} onChange={handleChange} />
                        </Form.Group>
                    </>
                );
            case 'medpros':
                return (
                    <>
                        <Form.Group className="mb-3">
                            <Form.Label>Vision Due</Form.Label>
                            <Form.Control type="date" name="vision_due" value={formData.vision_due} onChange={handleChange} autoFocus />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Dental Due</Form.Label>
                            <Form.Control type="date" name="dental_due" value={formData.dental_due} onChange={handleChange} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Immunization Due</Form.Label>
                            <Form.Control type="date" name="immunization_due" value={formData.immunization_due} onChange={handleChange} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Hearing Due</Form.Label>
                            <Form.Control type="date" name="hearing_due" value={formData.hearing_due} onChange={handleChange} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>HIV Due</Form.Label>
                            <Form.Control type="date" name="hiv_due" value={formData.hiv_due} onChange={handleChange} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Profile Due</Form.Label>
                            <Form.Control type="date" name="profile_due" value={formData.profile_due} onChange={handleChange} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>PHA Due</Form.Label>
                            <Form.Control type="date" name="pha_due" value={formData.pha_due} onChange={handleChange} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Blood Type</Form.Label>
                            <Form.Control type="text" name="blood_type" value={formData.blood_type} onChange={handleChange} />
                        </Form.Group>
                    </>
                );
            case 'chain':
                return (
                    <>
                        <Form.Group className="mb-3">
                            <Form.Label>Squad Leader</Form.Label>
                            <Form.Control type="text" name="squad_leader" value={formData.squad_leader} onChange={handleChange} autoFocus />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Squad Leader Phone</Form.Label>
                            <Form.Control type="text" name="squad_leader_phone_number" value={formData.squad_leader_phone_number} onChange={handleChange} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Platoon Sgt</Form.Label>
                            <Form.Control type="text" name="psg" value={formData.psg} onChange={handleChange} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Platoon Sgt Phone</Form.Label>
                            <Form.Control type="text" name="psg_phone_number" value={formData.psg_phone_number} onChange={handleChange} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>First Sergeant</Form.Label>
                            <Form.Control type="text" name="first_sgt" value={formData.first_sgt} onChange={handleChange} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>First Sergeant Phone</Form.Label>
                            <Form.Control type="text" name="first_sgt_phone_number" value={formData.first_sgt_phone_number} onChange={handleChange} />
                        </Form.Group>
                    </>
                );
            case 'bio':
                return (
                    <>
                        <Form.Group className="mb-3">
                            <Form.Label>Biography</Form.Label>
                            <Form.Control as="textarea" rows={3} name="bio" value={formData.bio} onChange={handleChange} autoFocus />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Next Counseling Due</Form.Label>
                            <Form.Control type="date" name="next_counseling_due" value={formData.next_counseling_due} onChange={handleChange} />
                        </Form.Group>
                    </>
                );
            case 'photo':
                return <PhotoUploadCard soldier={soldier} />;
            case undefined:
                return null;
            default:
                return <p className="text-danger">Error: Unknown card type selected: {modalType}</p>;
        }
    };

    const getModalTitle = () => {
        const type = modalType ? modalType.toLowerCase().trim() : '';

        switch (type) {
            case 'admin':
            case 'edit details':
                return "Edit Soldier's Infos";
            case 'acftweapon':
                return "Edit ACFT & Weapon Qualification";
            case 'medpros':
                return "Edit MEDPROS";
            case 'chain':
                return "Edit Immediate Chain of Command";
            case 'bio':
                return "Edit Biography & Counseling";
            case 'photo':
                return "Edit Photos";
            case undefined:
                return null;
            default:
                return "edit details";
        }
    };

    return (
        <Modal show={isOpen} onHide={onClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>{getModalTitle()}</Modal.Title>
            </Modal.Header>
            <Form onSubmit={handleSubmit}>
                <Modal.Body>{renderFormFields()}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button variant="primary" type="submit">
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
};

export default EditModal;