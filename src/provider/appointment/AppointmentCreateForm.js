import React, { useState, useContext } from "react";
import UserContext from '../../auth/UserContext';
import OrcaApi from "../../api";

function AppointmentCreateForm() {
    const { currentProvider } = useContext(UserContext);
    const [formData, setFormData] = useState({
        date: "",
        phone_num: "",
        date_of_birth: "",
        first_name: "",
        last_name: "",
        address: "",
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
        let res = await OrcaApi.createAppointment(formData)
        if(res){
            setMessage("Appointment created successfully!");
            setFormData({
                date: "",
                phone_num: "",
                date_of_birth: "",
                first_name: "",
                last_name: "",
                address: "",
            });
        } else {
            setMessage("Failed to create Appointment.");
        }
    };

    return (
        <div>
            <h2>Please enter information</h2>
            {message && <p>{message}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                <label>
                        Date of Appointment:
                        <input
                        name="date" 
                        type="text"
                        placeholder="YYYY-MM-DD"
                        className="form-control"
                        value={formData.date}
                        onChange={handleChange}
                        required
                    />
                    </label>
                </div>
                <div>
                    <label>
                        Patient's Phone Number:
                        <input
                        name="phone_num"
                        type="tel"
                        placeholder="Enter patient phone number..."
                        className="form-control"
                        value={formData.phone_num}
                        onChange={handleChange}
                        required
                    />
                    </label>
                </div>
                <div>
                    <label>
                        Date of Patient's Birth:
                        <input
                        name="date_of_birth" 
                        type="text"
                        placeholder="YYYY-MM-DD"
                        className="form-control"
                        value={formData.date_of_birth}
                        onChange={handleChange}
                        required
                    />
                    </label>
                </div>
                <div>
                    <label>
                        Doctor First Name:
                        <input
                        name="first_name"
                        type="text"
                        placeholder="Enter first name..."
                        className="form-control"
                        value={formData.first_name}
                        onChange={handleChange}
                        required
                    />
                    </label>
                </div>
                <div>
                    <label>
                        Doctor Last Name:
                        <input
                        name="last_name"
                        type="text"
                        placeholder="Enter last name..."
                        className="form-control"
                        value={formData.last_name}
                        onChange={handleChange}
                        required
                    />
                    </label>
                </div>
                <div>
                    <label>
                        Office Address:
                        <input
                        name="address"
                        type="text"
                        placeholder="Enter address..."
                        className="form-control"
                        value={formData.address}
                        onChange={handleChange}
                        required
                    />
                    </label>
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default AppointmentCreateForm;
