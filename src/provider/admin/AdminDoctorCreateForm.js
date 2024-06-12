import React, { useState, useContext } from "react";
import UserContext from '../../auth/UserContext';
import OrcaApi from "../../api";
import './AdminDoctorCreateForm.css';

function AdminDoctorCreateForm(){
    const { currentProvider } = useContext(UserContext);
    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        provider_id: currentProvider.id,
        profile_img_url: ""
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
                let res = await OrcaApi.createDoctor(formData);
                setMessage(`Doctor created successfully!`);
                setFormData({
                    first_name: "",
                    last_name: "",
                    profile_img_url: ""
                });
            }catch(err){
                setMessage("Invalid doctor credentials.");
            }

    }
    
    return (
        <div className="ADCF-container">
            <h2>Please enter doctor details.</h2>
            {message && <p>{message}</p>}
            <form onSubmit={handleSubmit} className="ADCF-form">
                <div className="ADCF-form-group">
                    <input
                        name="first_name"
                        type="text"
                        placeholder="Enter first name..."
                        className="ADCF-form-input"
                        value={formData.first_name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="ADCF-form-group">
                    <input
                        name="last_name"
                        type="text"
                        placeholder="Enter last name..."
                        className="ADCF-form-input"
                        value={formData.last_name}
                        onChange={handleChange}
                        required
                    />
                </div>
                {/* New input fields for doctor */}
                <div className="ADCF-form-group">
                    <input
                        name="profile_img_url"
                        type="text"
                        placeholder="Enter profile image URL..."
                        className="ADCF-form-input"
                        value={formData.profile_img_url}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" className="ADCF-submit-btn">Submit</button>
            </form>
        </div>
    )
}

export default AdminDoctorCreateForm;
