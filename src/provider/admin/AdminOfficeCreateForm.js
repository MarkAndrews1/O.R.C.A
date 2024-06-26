import React, { useState, useContext } from "react";
import UserContext from '../../auth/UserContext';
import OrcaApi from "../../api";
import "./AdminOfficeCreateForm.css"; 

function AdminOfficeCreateForm(){
    const { currentProvider } = useContext(UserContext);
    const [formData, setFormData] = useState({
        address: "",
        provider_id: currentProvider.id,
        phone_num: ""
    });
    const [message, setMessage] = useState("");

    function handleChange(evt) {
        const { name, value } = evt.target;
        let processedValue = value;

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
        try{
            let res = await OrcaApi.createOffice(formData);
            setMessage("Office created successfully!");
            setFormData({
                address: "",
                phone_num: ""
            });
        } catch(err) {
            setMessage(`Invalid office credentials.`);
        }
    }
    
    return (
        <div className="AOCF-container">
            <h2>Please enter office details.</h2>
            {message && <p>{message}</p>}
            <form onSubmit={handleSubmit} className="AOCF-form">
                <div className="AOCF-form-group">
                    <input
                        name="address"
                        type="text"
                        placeholder="Enter address..."
                        className="AOCF-form-input"
                        value={formData.address}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="AOCF-form-group">
                    <input
                        name="phone_num"
                        type="tel"
                        placeholder="Enter phone number..."
                        className="AOCF-form-input"
                        value={formData.phone_num}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" className="AOCF-submit-btn">Submit</button>
            </form>
        </div>
    )
}

export default AdminOfficeCreateForm;
