import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "../auth/UserContext";

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
        <div>
            <div className="container text-center">
                <div className="Homepage-title">
                    <h1>O.R.C.A</h1>
                    <small><i>Optimal Relay for Clinical Assistance</i></small>
                </div>

                <div className="Homepage-links">
                    <h3>
                        <Link to="/provider-login">
                            I am a provider
                        </Link>
                    </h3>
                    <h3>
                        <Link to="/patient-login">
                            I am a patient/guardian
                        </Link>
                    </h3>
                </div>
            </div>
        </div>
    );
}

export default Homepage;
