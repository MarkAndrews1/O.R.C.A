import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../auth/UserContext";
import OrcaApi from "../api";
import "./PatientHomepage.css";

function PatientHomepage() {
    const { currentPatient } = useContext(UserContext);
    const [providers, setProviders] = useState([]);

    useEffect(() => {
        getProviders();
    }, []);

    async function getProviders() {
        try {
            let providers = await OrcaApi.getPatientProviders(currentPatient.id);
            setProviders(providers);
        } catch (error) {
            console.error("Error fetching providers:", error);
        }
    }

    if (!providers) {
        return <div>Loading...</div>;
    }

    return (
        <div className="patient-homepage-container">
            <div className="container">
                <h1>Welcome {currentPatient.first_name}</h1>
                <h2>My Providers</h2>
                <div className="providers-list">
                    {providers.map(provider => (
                        <div key={provider.id} className="provider-card">
                            <img src={provider.provider_img_url} alt={provider.provider_name} className="provider-image" />
                            <div className="provider-details">
                                <h3 className="provider-name">{provider.provider_name}</h3>
                                <Link to={`/patient/chat/${provider.id}`} className="provider-link">Chat</Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default PatientHomepage;
