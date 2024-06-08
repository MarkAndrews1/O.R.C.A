import React, { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from '../../auth/UserContext';
import "../ProviderAdminPage.css"

function AdminPatientPage() {
    const { currentProvider } = useContext(UserContext)

    // Check if currentProvider is null before accessing its properties
    if (!currentProvider) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <div className="container text-center">
                <ul>
                    <li>
                        <Link className="admin-link" to="/provider/admin/patients/create">
                            Add Patient
                        </Link>
                    </li>
                    <li>
                        <Link className="admin-link" to="/provider/admin/patients/remove">
                            Remove Patient
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    )
}
export default AdminPatientPage;