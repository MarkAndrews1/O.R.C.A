import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import UserContext from '../auth/UserContext';
import "./ProviderLoginForm.css";

function ProviderLoginForm({ login }) {
    const navigate = useNavigate();
    const { currentProvider } = useContext(UserContext);

    const [formData, setFormData] = useState({
        provider_email: "",
        provider_password: ""
    });
    const [message, setMessage] = useState("");

    useEffect(() => {
        if (currentProvider) {
            navigate("/provider");
        }
    }, [currentProvider, navigate]);

    async function handleChange(evt) {
        const { name, value } = evt.target;
        setFormData(data => ({ ...data, [name]: value }));
    }

    async function handleSubmit(evt) {
        evt.preventDefault();
        try {
            await login(formData);
        } catch (err) {
            setMessage("Error Logging in, Please try again.")
        }
    }

    return (
        <div className="PVLF-container">
            <h2>Please enter your provider email and password.</h2>
            {message && <p>{message}</p>}
            <div>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <input
                            name="provider_email"
                            type="email"
                            placeholder="Enter provider email..."
                            className="form-control"
                            value={formData.provider_email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <input
                            name="provider_password"
                            type="password"
                            placeholder="Enter provider password..."
                            className="form-control"
                            value={formData.provider_password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button type="submit" className="submit-btn">Log in</button>
                </form>
            </div>
        </div>
    )
}

export default ProviderLoginForm;
