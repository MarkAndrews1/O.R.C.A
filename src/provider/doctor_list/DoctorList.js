import React, { useState, useEffect, useContext } from "react";
import OrcaApi from "../../api";
import UserContext from "../../auth/UserContext";
import DoctorCard from "./DoctorCard";
import DoctorSearchForm from "./DoctorSearchForm";
import "./DoctorList.css";

function DoctorList() {
    const [doctors, setDoctors] = useState();
    const { currentProvider } = useContext(UserContext);

    useEffect(() => {
        getDoctors();
    }, []);

    async function getDoctors() {
        try {
            let doctors = await OrcaApi.getProviderDoctors(currentProvider.id);
            setDoctors(doctors);
        } catch (error) {
            console.error("Error fetching doctors:", error);
        }
    }

    async function search(data) {
        try {
            const doctor = await OrcaApi.searchDoctor(data);
            setDoctors(doctor ? [doctor] : []);
        } catch (error) {
            console.error("Error searching for doctor:", error);
        }
    }

    if (!doctors) return <h3>Loading...</h3>;

    return (
        <div className="doctor-list-container">
            <h2>Search for Doctors</h2>
            <div className="search-form-container">
                <DoctorSearchForm searchFor={search} />
            </div>

            <div className="doctor-grid">
                {doctors.map((doctor) => (
                    <DoctorCard
                        key={doctor.id}
                        id={doctor.id}
                        doctor_id={doctor.id}
                        first_name={doctor.first_name}
                        last_name={doctor.last_name}
                        profile_img_url={doctor.profile_img_url}
                    />
                ))}
            </div>
        </div>
    );
}

export default DoctorList;
