import React, { useState, useContext } from "react";
import UserContext from '../../auth/UserContext';
import OrcaApi from "../../api"; 

function AdminOfficeRemoveForm(){
    const { currentProvider } = useContext(UserContext);
    const [formData, setFormData] = useState({
        address: "",
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
        let res = await OrcaApi.removeOffice(formData);
        if(!res){
            setMessage("office removed successfully!");
            setFormData({
                address: ""
            });
        } else {
            setMessage("Failed to remove office.");
        }
    }
    
    return (
        <div className="APCF-container">
            <h2>Please enter office address.</h2>
            {message && <p>{message}</p>}
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
                <button type="submit" className="submit-btn">Submit</button>
            </form>
        </div>
    )
}

export default AdminOfficeRemoveForm;