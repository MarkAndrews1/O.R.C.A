import React, { useState, useContext } from "react";
import UserContext from '../../auth/UserContext';
import OrcaApi from "../../api"; 

function AdminDoctorRemoveForm(){
    const { currentProvider } = useContext(UserContext);
    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
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

        let res = await OrcaApi.removeDoctor(formData);
        if(!res){
            setMessage("Doctor removed successfully!");
            setFormData({
                first_name: "",
                last_name: ""
            });
        } else {
            setMessage("Failed to remove doctor.");
        }
    }
    
    return (
        <div className="APCF-container">
            <h2>Please enter doctor details.</h2>
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
                <button type="submit" className="submit-btn">Submit</button>
            </form>
        </div>
    )
}

export default AdminDoctorRemoveForm;
