import {useState} from "react";

const AddUserForm = ({isOpen, onClose, onSave}) => {

    const [formData,setFormData]=useState({
        name: '',
        email: '',
        role: 'User',
    });

    const handleSubmit=(e) =>{
        e.preventDefault();
        onSave(formData)
        onClose();
    }
    if(isOpen){ return null;}

    return (
        <div className="modal d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content shadow">
                    <div className="modal-header">
                        <h5 className="modal-title">Add New User</h5>
                        <button type="button" className="btn-close" onClick={onClose}></button>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="modal-body">
                            <div className="mb-3">
                                <label className="form-label">Full Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    required
                                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Email Address</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    required
                                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Role</label>
                                <select
                                    className="form-select"
                                    onChange={(e) => setFormData({...formData, role: e.target.value})}
                                >
                                    <option value="User">User</option>
                                    <option value="Editor">Editor</option>
                                    <option value="Administrator">Administrator</option>
                                </select>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
                            <button type="submit" className="btn btn-primary">Save User</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

    )
}
export default AddUserForm;