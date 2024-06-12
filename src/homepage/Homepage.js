import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "../auth/UserContext";
import "./Homepage.css";

function Homepage() {
    const { currentPatient, currentProvider } = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (currentPatient) {
            navigate("/patient");
        } else if (currentProvider) {
            navigate("/provider");
        }
    }, [currentPatient, currentProvider, navigate]);

    return (
        <div className="container">
            <div className="Homepage-title text-center">
                <h1>O.R.C.A</h1>
                <small><i>Optimal Relay for Clinical Assistance</i></small>
            </div>
            <img className="homepage-img" src="https://i.seadn.io/gae/m2Ya4_6Mxw4TkvWWEEHyxDegERW_3EZiveDpiw5iee4X_ABCZ5fJRKBsSHyznDFfoZBc1Hmy7wG5fwDyTOBdvE1eN75T3nBzCIPl?auto=format&dpr=1&w=1000" />
            <div className="Homepage-links text-center">
                <h3>
                    <Link className="homepage-link" to="/provider-login">
                        I am a provider
                    </Link>
                </h3>
                <h3>
                    <Link className="homepage-link" to="/patient-login">
                        I am a patient/guardian
                    </Link>
                </h3>
            </div>
        </div>
    );
}

export default Homepage;
