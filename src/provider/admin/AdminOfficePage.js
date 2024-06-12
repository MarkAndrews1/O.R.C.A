import React, { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from '../../auth/UserContext';
import "../ProviderAdminPage.css"

function AdminOfficePage() {
    const { currentProvider } = useContext(UserContext)

    if (!currentProvider) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <div className="container text-center">
                <h1>Office's Page</h1>
                <ul>
                    <li>
                        <Link className="admin-link" to="/provider/admin/offices/create">
                            Add Office
                        </Link>
                    </li>
                    <li>
                        <Link className="admin-link" to="/provider/admin/offices/remove">
                            Remove Office
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    )
}
export default AdminOfficePage;