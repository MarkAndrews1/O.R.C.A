import React, { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from '../../auth/UserContext';
import "../ProviderAdminPage.css"

function AdminDoctorPage() {
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