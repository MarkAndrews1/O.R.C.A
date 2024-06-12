import React, { useState, useContext } from "react";
import UserContext from '../../auth/UserContext';
import OrcaApi from "../../api";

import "./AdminPatientCreateForm.css"

function AdminPatientCreateForm(){
    const { currentProvider } = useContext(UserContext);
    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        date_of_birth: "",
        phone_num: "",
        provider_id: currentProvider.id
    });
    const [message, setMessage] = useState("");

    function handleChange(evt) {
        const { name, value } = evt.target;
        let processedValue = value;
        
        if (name === "date_of_birth") {
            processedValue = value.replace(/\//g, '-');
        }
    
        if (name === "phone_num") {
            processedValue = value.replace(/\D/g, '');
            processedValue = parseInt(processedValue);
        }
    
        setFormData(data => ({
            ...data,
            [name]: processedValue
        }));
    }

    async function handleSubmit(evt) {
        evt.preventDefault();
        try {
            let res = await OrcaApi.createPatient(formData);
            setMessage("Patient created successfully!");
            setFormData({
                first_name: "",
                last_name: "",
                date_of_birth: "",
                phone_num: ""
            });
        } catch(err){
            setMessage("Invalid patient credentials.");
        }
    }
    
    return (
        <div className="APCF-container">
            <h2>Please enter patient details.</h2>
            {message && <p>{message}</p>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <input
                        name="first_name"
                        type="text"
                        placeholder="Enter first name..."
                        className="form-control"
                        value={formData.first_name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <input
                        name="last_name"
                        type="text"
                        placeholder="Enter last name..."
                        className="form-control"
                        value={formData.last_name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <input
                        name="phone_num"
                        type="tel"
                        placeholder="Enter phone number..."
                        className="form-control"
                        value={formData.phone_num}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <input
                        name="date_of_birth" 
                        type="text"
                        placeholder="YYYY-MM-DD"
                        className="form-control"
                        value={formData.date_of_birth}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" className="submit-btn">Submit</button>
            </form>
        </div>
    )
}

export default AdminPatientCreateForm;
