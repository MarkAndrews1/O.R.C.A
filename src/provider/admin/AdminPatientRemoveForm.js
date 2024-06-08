import React, { useState } from "react";
import OrcaApi from "../../api"; 
function AdminPatientRemoveForm(){

    const [formData, setFormData] = useState({
        phone_num: "",
        date_of_birth: ""
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
        let res = await OrcaApi.removePatient(formData)
        if(!res){
            setMessage("Patient removed successfully!");
            setFormData({
        phone_num: "",
        date_of_birth: ""
            });
        } else {
            setMessage("Failed to remove patient.");
        }
    }
    
    return (
        <div className="PLF-container">
            <h2>Please enter patient date of birth and phone number.</h2>
            {message && <p>{message}</p>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <input
                        name="phone_num"
                        type="tel"
                        placeholder="Enter patient phone number..."
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
                <button type="submit" className="submit-btn">Enter</button>
            </form>
        </div>
    )
}

export default AdminPatientRemoveForm;
