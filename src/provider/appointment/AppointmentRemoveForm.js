import React, { useState, useContext } from "react";
import UserContext from '../../auth/UserContext';
import OrcaApi from "../../api";
import "./AppointmentRemoveForm.css";

function AppointmentRemoveForm() {
    const { currentProvider } = useContext(UserContext);
    const [formData, setFormData] = useState({
        date: "",
        phone_num: "",
        date_of_birth: "",
        first_name: "",
        last_name: "",
        provider_id: currentProvider.id
    });

    const [message, setMessage] = useState("");

    function handleChange(evt) {
        const { name, value } = evt.target;
        let processedValue = value;
        
        if (name === "date_of_birth") {
            processedValue = value.replace(/\//g, '-');
        }

        if (name === "date") {
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            let res = await OrcaApi.removeAppointment(formData)
            setMessage("Appointment removed successfully!");
            setFormData({
                date: "",
                phone_num: "",
                date_of_birth: "",
                first_name: "",
                last_name: "",
            });
        } catch(err) {
            setMessage("Failed to remove Appointment.");
        }
    };

    return (
        <div className="container">
            <h2>Please enter information</h2>
            {message && <p className="message">{message}</p>} 
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Date of Appointment:</label>
                    <input
                        name="date" 
                        type="text"
                        placeholder="YYYY-MM-DD"
                        className="form-control"
                        value={formData.date}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Patient's Phone Number:</label>
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
                    <label>Date of Patient's Birth:</label>
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
                <div className="form-group">
                    <label>Doctor First Name:</label>
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
                    <label>Doctor Last Name:</label>
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
                <button type="submit">Remove</button>
            </form>
        </div>
    );
}

export default AppointmentRemoveForm;
