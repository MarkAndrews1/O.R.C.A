import React, { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from '../../auth/UserContext';
import "../ProviderAdminPage.css"

function AdminDoctorPage() {
    const { currentProvider } = useContext(UserContext)

    if (!currentProvider) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <div className="container text-center">
                <h1>Doctor's Page</h1>
                <ul>
                    <li>
                        <Link className="admin-link" to="/provider/admin/doctors/create">
                            Add Doctor
                        </Link>
                    </li>
                    <li>
                        <Link className="admin-link" to="/provider/admin/doctors/remove">
                            Remove Doctor
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    )
}
export default AdminDoctorPage;