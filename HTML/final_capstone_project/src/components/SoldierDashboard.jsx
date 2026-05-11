import React, { useState } from 'react';
import AddCounselingModal from './AddCounselingModal';
import '../App.css';
import {Button} from "react-bootstrap";
import CounselingHistory from "./CounselingHistory.jsx";

const SoldierDashboard = ({ soldier, onBack, onEdit, onUploadSuccess, fetchSoldierData }) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [isUploading, setIsUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [isCounselingModalOpen, setIsCounselingModalOpen] = useState(false);

    const handlePrint = () => {
        window.print();
    };

    const getStatusColor = (dateString) => {
        if (!dateString) return 'secondary';

        const dueDate = new Date(dateString);
        const today = new Date();
        const diffTime = dueDate - today;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays < 0) return 'danger';
        if (diffDays <= 30) return 'warning';
        return 'success';
    };

    const calculateReadiness = (soldier) => {
        if (!soldier) return 0;

        const checks = [
            ['success', 'warning'].includes(getStatusColor(soldier.pha_due)),
            ['success', 'warning'].includes(getStatusColor(soldier.acft_date)),
            ['success', 'warning'].includes(getStatusColor(soldier.next_counseling_due)),
            ['success', 'warning'].includes(getStatusColor(soldier.dental_due))
        ];

        const passed = checks.filter(Boolean).length;
        return Math.round((passed / checks.length) * 100);
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedFile(file);
            const localPreviewUrl = URL.createObjectURL(file);
            if (typeof onEdit === 'function') {
                onEdit({...soldier, localPhoto: localPreviewUrl}, 'none');
            }
        }
    };

    const handleUpload = async () => {
        if (typeof onEdit === 'function') {
            onEdit(null, 'none');
        }
        if (!soldier) {
            alert("Error: No soldier is selected. Please select a soldier and try again.");
            return;
        }
        if (!selectedFile) {
            alert("Please select a photo first.");
            return;
        }

        const soldierId = soldier.id || soldier.soldier_id || soldier.soldierId;
        if (!soldierId) {
            alert("Soldier ID is missing.");
            return;
        }

        setIsUploading(true);
        setUploadProgress(0);

        const formData = new FormData();
        formData.append('file', selectedFile);
        try {
            const response = await fetch(`http://localhost:8080/api/soldiers/${soldierId}/photo`, {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                const result = await response.text();
                alert(result);
                // Fetch updated soldier data to reflect the new photo
                if (fetchSoldierData) {
                    fetchSoldierData();
                }
            } else {
                console.error("Upload failed");
            }
        } catch (error) {
            console.error("Error uploading photo:", error);
        }

        const backendUrl = `http://localhost:8080/api/soldiers/${soldierId}/photo`;

        const xhr = new XMLHttpRequest();

        // Track upload progress
        xhr.upload.addEventListener('progress', (e) => {
            if (e.lengthComputable) {
                const percent = Math.round((e.loaded / e.total) * 100);
                setUploadProgress(percent);
            }
        });
        // Handle completion
        xhr.addEventListener('load', () => {
            setIsUploading(false);
            if (xhr.status >= 200 && xhr.status < 300) {
                alert(xhr.responseText || "Photo uploaded successfully!");

                // if (typeof onEdit === 'function') {
                //     onEdit(null, 'none');
                // }
                if (typeof fetchSoldierData === 'function') {
                    fetchSoldierData();
                }
                if (typeof onUploadSuccess === 'function') {
                    onUploadSuccess();
                }
                setSelectedFile(null);
            } else {
                alert(`Upload failed: ${xhr.status} - ${xhr.statusText || 'Unknown Error'}`);
            }
        });

        // Handle network/connection errors
        xhr.addEventListener('error', () => {
            setIsUploading(false);
            alert("A network error occurred during upload.");
        });

        xhr.open('POST', backendUrl, true);
        xhr.send(formData);
    };

    return (
        <div className="container-fluid py-4 bg-light">
            {/* Action Buttons */}
            <div className="d-flex justify-content-between mb-4 d-print-none">
                <button className="btn btn-outline-secondary" onClick={onBack}>
                    <i className="bi bi-arrow-left"></i> Back to Roster
                </button>
                <button className="btn btn-success" onClick={handlePrint}>
                    <i className="bi bi-file-earmark-pdf"></i> Print to PDF
                </button>
            </div>

            {/* Custom Print Styles */}
            <style dangerouslySetInnerHTML={{__html: `
                @media print {
                    body { background-color: white !important; }
                    .card { border: 1px solid #dee2e6 !important; box-shadow: none !important; }
                    .bg-light { background-color: white !important; }
                    .d-print-none { display: none !important; }
                }
            `}} />

            {/* Top Readiness Summary Bar */}
            <div className="row mb-4 d-print-block">
                <div className="col-12">
                    <div className="card shadow-sm border-0 overflow-hidden">
                        <div className="card-body p-0">
                            <div className="d-flex align-items-center p-3">
                                <div className="me-4 text-center">
                                    <div className="h4 mb-0 fw-bold">{calculateReadiness(soldier)}%</div>
                                    <small className="text-muted text-uppercase" style={{ fontSize: '0.7rem' }}>Overall Readiness</small>
                                </div>
                                <div className="flex-grow-1 me-4">
                                    <div className="progress" style={{ height: '12px' }}>
                                        <div
                                            className={`progress-bar bg-${calculateReadiness(soldier) > 75 ? 'success' : 'warning'}`}
                                            role="progressbar"
                                            style={{ width: `${calculateReadiness(soldier)}%` }}
                                        ></div>
                                    </div>
                                </div>
                                <div className="d-flex gap-2">
                                    <span className={`badge bg-${getStatusColor(soldier.pha_due)}-subtle text-${getStatusColor(soldier.pha_due)} border`}>
                                        MEDPROS
                                    </span>
                                    <span className={`badge bg-${getStatusColor(soldier.acft_date)}-subtle text-${getStatusColor(soldier.acft_date)} border`}>
                                        ACFT
                                    </span>
                                    <span className={`badge bg-${getStatusColor(soldier.next_counseling_due)}-subtle text-${getStatusColor(soldier.next_counseling_due)} border`}>
                                        ADMIN
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row g-4">
                {/* Profile Header Card */}
                <div className="col-md-4">
                    <div className="mx-auto bg-dark rounded mb-3 d-flex align-items-center justify-content-center"
                         style={{ width: '150px', height: '180px', border: '1px solid rgba(255,255,255,0.2)', overflow: 'hidden' }}>
                        {soldier.localPhoto ? (
                            <img src={soldier.localPhoto} alt="Local Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        ) : soldier.photo ? (
                            <img src={`data:image/jpeg;base64,${soldier.photo}`} alt="Soldier" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        ) : (
                            <i className="bi bi-person-fill text-secondary" style={{ fontSize: '5rem' }}></i>
                        )}
                    </div>
                    <div className="mt-3">
                        <input
                            type="file"
                            onChange={handleFileChange}
                            accept="image/*"
                            disabled={isUploading}
                        />
                        <button
                            className="btn btn-success btn-sm mt-2 d-block"
                            onClick={handleUpload}
                            disabled={isUploading}
                        >
                            {isUploading ? (
                                <><span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                    Uploading...</>
                            ) : ("Confirm Photo")}
                        </button>
                    <div/>
                        {/* Progress Bar Display */}
                        {isUploading && (
                            <div className="mt-3" style={{ maxWidth: '250px' }}>
                                <div className="progress" style={{ height: '12px' }}>
                                    <div
                                        className="progress-bar progress-bar-striped progress-bar-animated bg-success"
                                        role="progressbar"
                                        style={{ width: `${uploadProgress}%` }}
                                        aria-valuenow={uploadProgress}
                                        aria-valuemin="0"
                                        aria-valuemax="100"
                                    >
                                        {uploadProgress}%
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/*bottom of Photocard infos*/}
                    <div className="card glass-card shadow-sm border-0 text-center p-4 mt-3">
                        <h3 className="mb-0">{soldier.rank} {soldier.name}</h3>
                        <p className="text-muted">ID: {soldier.soldier_id || soldier.id || 'N/A'}</p>
                        <span className="badge bg-success">Status: {soldier.role || 'User'}</span>
                    </div>

                    {/* Soldier's Infos */}
                    <div className="card glass-card shadow-sm border-0 mt-4 p-3 position-relative">
                        <div className="card-edit-overlay d-print-none" onClick={(e) => {
                            e.stopPropagation();
                            onEdit(soldier, 'admin');
                        }}>
                            <i className="bi bi-pencil-square"></i>
                        </div>
                        <h5 className="border-bottom pb-2">Soldier's Infos</h5>
                        <ul className="list-unstyled mb-0">
                            <li><strong>Phone:</strong> {soldier.phone || '555-0123'}</li>
                            <li><strong>Marital:</strong> {soldier.is_married ? 'Married' : 'Single'}</li>
                            <li><strong>Housing:</strong> {soldier.lives_on_post ? 'On Post' : 'Off Post'}</li>
                            <li><strong>M.O.S:</strong> Level {soldier.mos || '68A'}</li>
                        </ul>
                    </div>
                </div>

                {/* Readiness & MEDPROS */}
                <div className="col-md-8">
                    <div className="row g-3">
                        {/* ACFT Card */}
                        <div className="col-md-6">
                            <div className="card shadow-sm border-0 h-100 p-3 position-relative">
                                <div className="card-edit-overlay d-print-none" onClick={(e) => {
                                    e.stopPropagation();
                                    onEdit(soldier, 'acftWeapon');
                                }}>
                                    <i className="bi bi-pencil-square"></i>
                                </div>
                                <h5 className="text-primary"><i className="bi bi-person-arms-up"></i> AFT</h5>
                                <div className="d-flex justify-content-between mt-2">
                                    <span>Last Score: <strong>{soldier.acft_score || '540'}</strong></span>
                                    <span>Date: {soldier.acft_date || '2025-01-10'}</span>
                                </div>
                            </div>
                        </div>

                        {/* Weapon Qualification Card */}
                        <div className="col-md-6">
                            <div className="card shadow-sm border-0 h-100 p-3 position-relative">
                                <div className="card-edit-overlay d-print-none" onClick={(e) => {
                                    e.stopPropagation();
                                    onEdit(soldier, 'acftWeapon');
                                }}>
                                    <i className="bi bi-pencil-square"></i>
                                </div>
                                <h5 className="text-primary"><i className="bi bi-bullseye"></i> Weapon Qualification</h5>
                                <div className="d-flex justify-content-between mt-2">
                                    <span>Weapon Score: <strong>{soldier.weapon_score || '40'}</strong></span>
                                    <span>Due Date: {soldier.weapon_qual_date || '2025-01-10'}</span>
                                </div>
                            </div>
                        </div>

                        {/* MEDPROS Card */}
                        <div className="col-md-12">
                            <div className="card shadow-sm border-0 p-3 position-relative">
                                <div className="card-edit-overlay d-print-none" onClick={(e) => {
                                    e.stopPropagation();
                                    onEdit(soldier, 'medpros');
                                }}>
                                    <i className="bi bi-pencil-square"></i>
                                </div>
                                <h5 className="text-danger"><i className="bi bi-heart-pulse"></i> MEDPROS</h5>
                                <div className="row text-center mt-2">
                                    <div className="col">Vision: <br/>
                                        <span className={`fw-bold text-${getStatusColor(soldier.vision_due)}`}>
                                            {getStatusColor(soldier.vision_due) === 'danger' ? 'OVERDUE' : 'GO'}
                                        </span><br/>
                                        <span>Next Due:</span><br/>
                                        <span className="badge bg-info">{soldier.vision_due || '2025-01-10'}</span><br/>
                                    </div>
                                    <div className="col">Dental: <br/>
                                        <span className={`fw-bold text-${getStatusColor(soldier.dental_due)}`}>
                                            {getStatusColor(soldier.dental_due) === 'danger' ? 'OVERDUE' : 'GO'}
                                        </span><br/>
                                        <span>Next Due:</span><br/>
                                        <span className="badge bg-info">{soldier.dental_due || '2025-01-10'}</span><br/>
                                    </div>
                                    <div className="col">Immz: <br/>
                                        <span className={`fw-bold text-${getStatusColor(soldier.immunization_due)}`}>
                                            {getStatusColor(soldier.immunization_due) === 'danger' ? 'OVERDUE' : 'GO'}
                                        </span><br/>
                                        <span>Next Due:</span><br/>
                                        <span className="badge bg-info">{soldier.immunization_due || '2026-04-12'}</span><br/>
                                    </div>
                                    <div className="col">Blood Type: <br/><strong className="text-danger">{soldier.blood_type || 'O+'}</strong></div>

                                    <div className="col">Hearing: <br/>
                                        <span className={`fw-bold text-${getStatusColor(soldier.hearing_due)}`}>
                                            {getStatusColor(soldier.hearing_due) === 'danger' ? 'OVERDUE' : 'GO'}
                                        </span><br/>
                                        <span>Next Due:</span><br/>
                                        <span className="badge bg-info">{soldier.hearing_due || '2026-04-12'}</span><br/>
                                    </div>
                                    <div className="col">HIV: <br/>
                                        <span className={`fw-bold text-${getStatusColor(soldier.hiv_due)}`}>
                                            {getStatusColor(soldier.hiv_due) === 'danger' ? 'OVERDUE' : 'GO'}
                                        </span><br/>
                                        <span>Next Due:</span><br/>
                                        <span className="badge bg-info">{soldier.hiv_due || '2026-04-12'}</span><br/>
                                    </div>
                                    <div className="col">Profile: <br/>
                                        <span className={`fw-bold text-${getStatusColor(soldier.profile_due)}`}>
                                            {getStatusColor(soldier.profile_due) === 'danger' ? 'OVERDUE' : 'GO'}
                                        </span><br/>
                                        <span>Next Due:</span><br/>
                                        <span className="badge bg-info">{soldier.profile_due || '2026-04-12'}</span><br/>
                                    </div>
                                    <div className="mt-3 text-center">
                                        <small className="text-muted">Periodic Health Assessment due: <strong>{soldier.pha_due || '2025-01-10'}</strong></small>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Chain of Command */}
                        <div className="col-12">
                            <div className="card shadow-sm border-0 p-3 bg-white position-relative">
                                <div className="card-edit-overlay d-print-none" onClick={(e) => {
                                    e.stopPropagation();
                                    onEdit(soldier, 'chain');
                                }}>
                                    <i className="bi bi-pencil-square"></i>
                                </div>
                                <h5 className="border-bottom pb-2">Immediate Chain of Command</h5>
                                <div className="row small">
                                    <div className="col-md-4"><strong>Squad Leader:</strong> {soldier.squad_leader || 'SGT Snuffy'}</div>
                                    <div className="col-md-4"><strong>Platoon Sgt:</strong> {soldier.psg || 'SFC Smith'}</div>
                                    <div className="col-md-4"><strong>1SG:</strong> {soldier.first_sgt || '1SG Miller'}</div>
                                    <div className="col-md-4"><strong>Squad Leader:</strong> {soldier.squad_leader_phone_number || '000-000-000'}</div>
                                    <div className="col-md-4"><strong>Platoon Sgt:</strong> {soldier.psg_phone_number || '000-000-000'}</div>
                                    <div className="col-md-4"><strong>1SG:</strong> {soldier.first_sgt_phone_number || '000-000-000'}</div>
                                </div>
                            </div>
                        </div>

                        {/* Counseling & Bio */}
                        <div className="col-12">
                            <div className="card shadow-sm border-0 p-3 position-relative">
                                <div className="card-edit-overlay d-print-none" onClick={(e) => {
                                    e.stopPropagation();
                                    onEdit(soldier, 'bio');
                                }}>
                                    <i className="bi bi-pencil-square"></i>
                                </div>
                                <h5>Soldier Biography</h5>
                                <p className="text-muted small">
                                    {soldier.bio || "Soldier is currently assigned to the main unit."}
                                </p>

                                <div className={`p-3 rounded d-flex justify-content-between align-items-center bg-${getStatusColor(soldier.next_counseling_due)}-subtle`}>
                                    <div>
                                        <i className="bi bi-journal-text me-2 bg-warning-subtle p-2 rounded"></i>
                                        <span className="fw-bold">Next Performance Counseling:</span>
                                        <span className={`badge bg-${getStatusColor(soldier.next_counseling_due)} ms-2`}>{soldier.next_counseling_due || '2025-01-10'}</span>
                                    </div>
                                </div>
                                <Button
                                    variant="outline-success"
                                    size="sm"
                                    onClick={() => setIsCounselingModalOpen(true)}
                                >
                                    + Add Record
                                </Button>
                                {/* 4. The Modal Component */}
                                <AddCounselingModal
                                    isOpen={isCounselingModalOpen}
                                    onClose={() => setIsCounselingModalOpen(false)}
                                    soldierId={soldier?.soldier_id||soldier?.id||soldier?.soldierId}
                                    onSuccess={fetchSoldierData} // This triggers the refresh we set up earlier
                                />
                                <CounselingHistory counselings={soldier.counselings} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SoldierDashboard;