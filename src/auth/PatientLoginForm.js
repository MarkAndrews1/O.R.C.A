import React, { useState, useContext } from "react";
import { useNavigate } from 'react-router-dom';
import UserContext from '../auth/UserContext'; 

function PatientLoginForm({login}){
    const navigate = useNavigate();
    const { currentPatient } = useContext(UserContext);

    if (currentPatient) {
        navigate("/patient")
    }

    const [formData, setFormData] = useState({
        phone_num: "",
        date_of_birth: ""
    });

    function handleChange(evt) {
        const { name, value } = evt.target;
        let processedValue = value;
        
        if (name === "date_of_birth") {
            processedValue = value.replace(/\//g, '-');
        }

        if (name === "phone_num") {
            processedValue = value.replace(/\D/g, '');
        }

        setFormData(data => ({
            ...data,
            [name]: processedValue
        }));
    }


    async function handleSubmit(evt) {
        evt.preventDefault();
        let res = await login(formData);
        if (res.success) {
            navigate("/patient");
        } else {
            console.error("Error");
        }
    }
    
    return (
        <div className="PLF-container">
            <h2>Please enter your date of birth and phone number.</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <input
                        name="phone_num"
                        type="tel"
                        placeholder="Enter your phone number..."
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

export default PatientLoginForm;
