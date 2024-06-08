import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

function ProviderLoginForm({ login }) {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        provider_email: "",
        provider_password: ""
    });

    async function handleChange(evt) {
        const { name, value } = evt.target;
        setFormData(data => ({ ...data, [name]: value }));
    }

    async function handleSubmit(evt) {
        evt.preventDefault();
        let res = await login(formData);
        if (res.success) {
            navigate("/provider");
        } else {
            console.error("Error");
        }
    }

    return (
        <div className="PLF-container">
            <h2>Please enter your provider email and password.</h2>
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
