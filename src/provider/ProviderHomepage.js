import React, { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../auth/UserContext";

function ProviderHomepage() {
    const { currentProvider } = useContext(UserContext)

    if (!currentProvider) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <div className="container text-center">
                <h1>Welcome to the {currentProvider.providerName} homepage</h1>

                <ul>
                    <li className="provider-li">
                        <Link className="link" to="/provider/appointment">
                            Make Appointment
                        </Link>
                    </li>
                    <li className="provider-li">
                        <Link className="link" to="/provider/appointment/remove">
                            Remove Appointment
                        </Link>
                    </li>
                    <li className="provider-li">
                        <Link className="link" to="/provider/patients">
                            View Patients
                        </Link>
                    </li>

                    <li className="provider-li">
                        <Link className="link" to="/provider/doctors">
                            View Doctors
                        </Link>
                    </li>

                    <li className="provider-li">
                        <Link className="link" to="/provider/offices">
                            View Offices
                        </Link>
                    </li>

                </ul>
                
            </div>
        </div>
    )
}

export default ProviderHomepage;