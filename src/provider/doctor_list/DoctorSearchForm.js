import React, { useState, useContext } from "react";
import UserContext from "../../auth/UserContext";
import "./DoctorSearchForm.css"

function DoctorSearchForm({searchFor}){
    const { currentProvider } = useContext(UserContext)
    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        provider_id: currentProvider.id
    });

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
        await searchFor(formData);

    }
    
    return (
        <div className="search-bar-container">
            <form onSubmit={handleSubmit} className="search-bar-form">
                <input
                    name="first_name"
                    type="text"
                    placeholder="Enter first name..."
                    className="search-bar-input"
                    value={formData.first_name}
                    onChange={handleChange}
                    required
                />
                <input
                    name="last_name"
                    type="text"
                    placeholder="Enter last name..."
                    className="search-bar-input"
                    value={formData.last_name}
                    onChange={handleChange}
                    required
                />
                <button type="submit" className="search-bar-submit">Search</button>
            </form>
        </div>
    )
}

export default DoctorSearchForm;
