import React, { useState, useContext } from "react";
import UserContext from "../../auth/UserContext";

function PatientSearchForm({searchFor}){
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
        <div className="DSF-container">
            <h2>Please enter doctor details.</h2>
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
                <button type="submit" className="submit-btn">Enter</button>
            </form>
        </div>
    )
}

export default PatientSearchForm;
