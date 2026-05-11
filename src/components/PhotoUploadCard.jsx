import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Form, Spinner } from 'react-bootstrap';

export default function PhotoUploadCard({ soldier, onUploadSuccess }) {
    const [selectedFile, setSelectedFile] = useState(null);
    const [localPhoto, setLocalPhoto] = useState(null);
    const [isUploading, setIsUploading] = useState(false);

    // Handle file selection and local preview
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);

            const reader = new FileReader();
            reader.onload = (event) => {
                setLocalPhoto(event.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    // Reset local state
    const handleReset = () => {
        setSelectedFile(null);
        setLocalPhoto(null);
    };

    // Upload logic
    const handleUpload = () => {
        if (!selectedFile) {
            alert('Please select a photo first.');
            return;
        }

        const soldierId = soldier?.id || soldier?.soldier_id;
        if (!soldierId) {
            alert('Soldier ID is missing. Please ensure a soldier is selected.');
            return;
        }

        setIsUploading(true);
        const formData = new FormData();
        formData.append('photoFile', selectedFile);

        const backendUrl = `http://localhost:8080/api/soldiers/${soldierId}/photo`;

        fetch(backendUrl, {
            method: 'POST',
            body: formData,
        })
            .then(async (response) => {
                if (!response.ok) {
                    const errorText = await response.text();
                    throw new Error(`Upload failed: ${response.status} - ${errorText}`);
                }
                return response.text();
            })
            .then((responseText) => {
                alert(responseText || 'Photo uploaded successfully!');
                handleReset();

                if (onUploadSuccess) {
                    onUploadSuccess();
                } else {
                    window.location.reload();
                }
            })
            .catch((error) => {
                console.error('Network error during upload:', error);
                alert('Network error: ' + error.message);
            })
            .finally(() => {
                setIsUploading(false);
            });
    };

    return (
        <>
            <div
                className="mx-auto bg-dark rounded mb-3 d-flex align-items-center justify-content-center"
                style={{ width: '150px', height: '180px', border: '1px solid rgba(255,255,255,0.2)', overflow: 'hidden' }}
            >
                {localPhoto ? (
                    <img
                        src={localPhoto}
                        alt="Local Preview"
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                ) : soldier?.photo ? (
                    <img
                        src={`data:image/jpeg;base64,${soldier.photo}`}
                        alt="Soldier"
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                ) : (
                    <i className="bi bi-person-fill text-secondary" style={{ fontSize: '5rem' }}></i>
                )}
            </div>

            {/* Input Selection & Button UI */}
            <Form.Group className="mb-3">
                <Form.Label className="text-white">Select Image</Form.Label>
                <Form.Control
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    disabled={isUploading}
                />
            </Form.Group>

            <div className="d-flex justify-content-end gap-2 mt-3">
                {selectedFile && (
                    <Button variant="outline-secondary" onClick={handleReset} disabled={isUploading}>
                        Cancel
                    </Button>
                )}
                <Button variant="success" onClick={handleUpload} disabled={isUploading}>
                    {isUploading ? (
                        <>
                            <Spinner animation="border" size="sm" className="me-1" />
                            Uploading...
                        </>
                    ) : (
                        'Confirm Image'
                    )}
                </Button>
            </div>
        </>
    );
}

PhotoUploadCard.propTypes = {
    soldier: PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        soldier_id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        photo: PropTypes.string,
    }),
    onUploadSuccess: PropTypes.func,
};