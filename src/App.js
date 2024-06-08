import React, { useState, useEffect } from 'react';
import { BrowserRouter } from "react-router-dom";
import Navigation from './routes/Navigation';
import OrcaApi from './api';
import UserContext from "./auth/UserContext";
import useLocalStorage from './hooks/useLocalStrorage';
import { jwtDecode } from 'jwt-decode';

import OrcaRoutes from './routes/Routes';

import './App.css';

export const TOKEN_STORAGE_ID = "orca-token";

function App() {
    const [infoLoaded, setInfoLoaded] = useState(false);
    const [providerToken, setProviderToken] = useLocalStorage("orca-provider-token");
    const [patientToken, setPatientToken] = useLocalStorage("orca-patient-token");
    const [currentProvider, setCurrentProvider] = useState(null);
    const [currentPatient, setCurrentPatient] = useState(null);
    

    async function getCurrentProvider() {
        if (providerToken) {
            try {
                let { providerId } = jwtDecode(providerToken);
                // Set the token on the Api class so it can use it to call the API.
                OrcaApi.token = providerToken;
                let currentProvider = await OrcaApi.getProvider(providerId);
                setCurrentProvider(currentProvider);
            } catch (err) {
                console.error("App loadUserInfo: problem loading", err);
                setCurrentProvider(null);
            }
        }
    }
    
    async function getCurrentPatient() {
        if (patientToken) {
            try {
                let { patientId } = jwtDecode(patientToken);
                // Set the token on the Api class so it can use it to call the API.
                OrcaApi.token = patientToken;
                let currentPatient = await OrcaApi.getPatient(patientId);
                setCurrentPatient(currentPatient);
            } catch (err) {
                console.error("App loadUserInfo: problem loading", err);
                setCurrentPatient(null);
            }
        }
    }
    
    useEffect(function loadUserInfo() {
        getCurrentProvider();
        getCurrentPatient();
        setInfoLoaded(true);
    }, [providerToken, patientToken]);

    async function providerLogin(loginData) {
        try {
            let token = await OrcaApi.providerLogin(loginData)
            setProviderToken(token);
            console.log(token);
            return { success: true };
        } catch (errs) {
            console.error("login failed", errs);
            return { success: false, errs };
        }
    }

    async function patientLogin(loginData) {
        try {
            let token = await OrcaApi.patientLogin(loginData);
            setPatientToken(token);
            console.log(token);
            return { success: true };
        } catch (error) {
            console.error("Login failed", error);
            return { success: false, error };
        }
    }

    function logout() {
        if(currentProvider){
            OrcaApi.providerAdminToggle(currentProvider.id, false)
            setCurrentProvider(prevProvider => ({
                ...prevProvider,
                isAdmin: false
            }));
        }
        setCurrentProvider(null);
        setCurrentPatient(null);
        setProviderToken(null);
        setPatientToken(null);

    }

    if (!infoLoaded) return (
        <div className="App">
            <h1>Loading...</h1>
        </div>
    );

    return (
        <BrowserRouter>
            <UserContext.Provider 
                value={{ currentProvider, setCurrentProvider, currentPatient }}>
                <div className="App">
                    <Navigation logout={logout} />
                    <OrcaRoutes providerLogin={providerLogin} patientLogin={patientLogin} />
                </div>
            </UserContext.Provider>
        </BrowserRouter>
    );
}

export default App;
