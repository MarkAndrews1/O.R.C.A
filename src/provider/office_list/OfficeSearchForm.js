import React, { useState, useContext } from "react";
import UserContext from '../../auth/UserContext';
import OrcaApi from "../../api"; 

function AdminOfficeRemoveForm({searchFor}){
    const { currentProvider } = useContext(UserContext);
    const [formData, setFormData] = useState({
        address: "",
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
        <div className="APCF-container">
            <h2>Please enter office address.</h2>
            <form onSubmit={handleSubmit}>
            <div className="form-group">
                    <input
                        name="address"
                        type="text"
                        placeholder="Enter address..."
                        className="form-control"
                        value={formData.address}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" className="submit-btn">Enter</button>
            </form>
        </div>
    )
}

export default AdminOfficeRemoveForm;