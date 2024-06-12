import React, { useState, useContext } from "react";
import UserContext from '../../auth/UserContext';
import OrcaApi from "../../api";
import "./AdminDoctorRemoveForm.css";

function AdminDoctorRemoveForm(){
    const { currentProvider } = useContext(UserContext);
    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        provider_id: currentProvider.id
    });
    const [message, setMessage] = useState("");

    function handleChange(evt) {
        const { name, value } = evt.target;
        let processedValue = value;

        setFormData(data => ({
            ...data,
            [name]: processedValue
        }));
    }

    async function handleSubmit(evt) {
        evt.preventDefault();
        try{
            let res = await OrcaApi.removeDoctor(formData);
            setMessage("Doctor removed successfully!");
            setFormData({
                first_name: "",
                last_name: ""
            });
        } catch(err) {
            setMessage(`Invalid doctor credentials.`);
        }
    }
    
    return (
        <div className="ADR-container">
            <h2>Please enter doctor details.</h2>
            {message && <p>{message}</p>}
            <form onSubmit={handleSubmit} className="ADR-form">
                <div className="ADR-form-group">
                    <input
                        name="first_name"
                        type="text"
                        placeholder="Enter first name..."
                        className="ADR-form-input"
                        value={formData.first_name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="ADR-form-group">
                    <input
                        name="last_name"
                        type="text"
                        placeholder="Enter last name..."
                        className="ADR-form-input"
                        value={formData.last_name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" className="ADR-submit-btn">Remove</button>
            </form>
        </div>
    )
}

export default AdminDoctorRemoveForm;
