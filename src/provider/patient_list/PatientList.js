import React, { useState, useEffect, useContext } from "react";
import OrcaApi from "../../api";
import UserContext from "../../auth/UserContext";
import PatientCard from "./PatientCard";
import PatientSearchForm from "./PatientSearchForm";
import "./PatientList.css"; // Import the CSS file for styling

function PatientList() {
    const [patients, setPatients] = useState();
    const { currentProvider } = useContext(UserContext);

    useEffect(() => {
        getPatients();
    }, []);

    async function getPatients() {
        try {
            const patients = await OrcaApi.getProviderPatients(currentProvider.id);
            setPatients(patients);
            console.log(patients);
        } catch (error) {
            console.error("Error retrieving patients:", error);
        }
    }

    async function search(data) {
        try {
            const patient = await OrcaApi.searchPatient(data);
            setPatients(patient ? [patient] : []);
        } catch (error) {
            console.error("Error searching for patient:", error);
        }
    }

    if (!patients) return <h3>Loading...</h3>;

    return (
        <div className="patient-list-container">
            <h2>Search for patients</h2>
            <PatientSearchForm searchFor={search} />
            <div className="patient-cards-container">
                {patients.length ? (
                    patients.map((p) => (
                        <PatientCard
                            key={p.id}
                            id={p.id}
                            patient_id={p.id}
                            first_name={p.first_name}
                            last_name={p.last_name}
                            date_of_birth={p.date_of_birth}
                            phone_num={p.phone_num}
                        />
                    ))
                ) : (
                    <p>Sorry, couldn't find that patient...</p>
                )}
            </div>
        </div>
    );
}

export default PatientList;
