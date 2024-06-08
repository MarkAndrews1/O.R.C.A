import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../auth/UserContext";
import OrcaApi from "../api";

function PatientHomepage() {
    const { currentPatient } = useContext(UserContext)
    const [providers, setProviders] =  useState()

    useEffect(function getProviders(){
        getAllProviders()
    }, [])

    async function getAllProviders(){
        let providers = await OrcaApi.getPatientProviders(currentPatient.id)
        setProviders(providers)
    }

    if (!providers) {
        return <div>Loading...</div>;
    }


    return (
        <div>
            <div className="container text-center">
                <h1>Welcome {currentPatient.first_name}</h1>

                <h2>My Providers</h2>
                <ul>
                    {providers.map(provider => (
                        <li key={provider.id}>
                            <Link to={`/patient/chat/${provider.id}`}>{provider.provider_name}</Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default PatientHomepage;