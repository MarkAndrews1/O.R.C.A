import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import UserContext from "../auth/UserContext";
import "./Navigation.css";

function Navigation({ logout }) {
    const { currentPatient } = useContext(UserContext);
    const { currentProvider } = useContext(UserContext);

    function providerNav() {
        return (
            <ul>
                <li>
                    <NavLink to="/provider">Home</NavLink>
                </li>
                {currentProvider ? (
                    currentProvider.isAdmin ? (
                        <li>
                            <NavLink to="/provider/admin">Admin</NavLink>
                        </li>
                    ) : (
                        <li>
                            <NavLink to="/provider/admin/login">Admin Login</NavLink>
                        </li>
                    )
                ) : null}
                <li>
                    <Link className="nav-link" to="/" onClick={logout}>
                        Log out
                    </Link>
                </li>
            </ul>
        );
    }
    

    function patientNav() {
        return (
            <ul>
                <li>
                    <NavLink to="/patient">Home</NavLink>
                </li>
                <li>
                    <Link className="nav-link" to="/" onClick={logout}>
                        Log out
                    </Link>
                </li>
            </ul>
        );
    }

    return (
        <nav className="Navigation-navbar">
            {currentPatient || currentProvider ? (
                <span className="navbar-brand">ORCA</span>
            ) : (
                <Link className="navbar-brand" to="/">
                    ORCA
                </Link>
            )}
            {currentPatient ? patientNav() : null}
            {currentProvider ? providerNav() : null}
        </nav>
    );
}

export default Navigation;
