import React, { useState } from "react";
import "./PatientSearchForm.css"; // Import the CSS file for styling

function PatientSearchForm({ searchFor }) {
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
        await searchFor(formData);
    }
    
    return (
        <div className="search-bar-container">
            <form className="search-bar-form" onSubmit={handleSubmit}>
                <input
                    name="phone_num"
                    type="tel"
                    placeholder="Enter patient phone number..."
                    className="search-bar-input"
                    value={formData.phone_num}
                    onChange={handleChange}
                    required
                />
                <input
                    name="date_of_birth" 
                    type="text"
                    placeholder="YYYY-MM-DD"
                    className="search-bar-input"
                    value={formData.date_of_birth}
                    onChange={handleChange}
                    required
                />
                <button type="submit" className="search-btn">
                    Search
                </button>
            </form>
        </div>
    );
}

export default PatientSearchForm;
