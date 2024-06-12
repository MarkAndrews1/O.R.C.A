import React, { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../auth/UserContext";
import "./ProviderAdminPage.css"

function ProviderAdminPage() {
    const { currentProvider } = useContext(UserContext)

    if (!currentProvider) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <div className="container text-center">
                <h1>{currentProvider.providerName} admin page</h1>
                <h2>Manage:</h2>
                <ul className="admin-list">
                    <li className="provider-li">
                        <Link className="admin-link" to="/provider/admin/patients">
                            Patients
                        </Link>
                    </li>
                    <li className="provider-li">
                        <Link className="admin-link" to="/provider/admin/doctors">
                            Doctors
                        </Link>
                    </li>
                    <li className="provider-li">
                        <Link className="admin-link" to="/provider/admin/offices">
                            Offices
                        </Link>
                    </li>
                </ul>

            </div>
        </div>
    )
}
export default ProviderAdminPage;