import React, { useState, useEffect } from "react";
import OrcaApi from "../../api";
import "./DoctorCard.css"

function DoctorCard({ doctor_id, first_name, last_name, profile_img_url }) {
    const [appointments, setAppointments] = useState([]);
    const [appointmentsDisplayed, setAppointmentsDisplayed] = useState(false);

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    useEffect(() => {
        if (appointmentsDisplayed) {
            const getAppointments = async () => {
                try {
                    const appointmentsData = await OrcaApi.getDoctorAppointments(doctor_id);
                    const appointmentsWithPatients = await Promise.all(appointmentsData.map(async (appointment) => {
                        const patient = await OrcaApi.getPatient(appointment.patient_id);
                        const office = await OrcaApi.getOffice(appointment.office_id);
                        return { ...appointment, patient, office };
                    }));
                    setAppointments(appointmentsWithPatients);
                } catch (error) {
                    console.error("Error fetching appointments:", error);
                }
            };

            getAppointments();
        }
    }, [appointmentsDisplayed, doctor_id]);

    const toggleAppointments = () => {
        setAppointmentsDisplayed(!appointmentsDisplayed);
    };

    return (
        <div className="doctor-card">
            <div className="doctor-info">
                <h2 className="doc-profile">Doctor Information</h2>
                <img className="doctor-profile-pic" src={profile_img_url} alt="Profile" />
                <p><strong>First Name:</strong> {first_name}</p>
                <p><strong>Last Name:</strong> {last_name}</p>
                {appointmentsDisplayed ? (
                    <>
                        <button
                            className="doctor-card-button close-button"
                            onClick={toggleAppointments}
                        >
                            <strong>Close</strong>
                        </button>
                        <ul>
                            {appointments.map((appointment, index) => {
                                return (
                                    <li key={index}>
                                        <strong>Date</strong>: {formatDate(appointment.date)}
                                        <br />
                                        <strong>Patient</strong>: {appointment.patient.first_name} {appointment.patient.last_name}
                                        <br />
                                        <strong>Office</strong>: {appointment.office.address}
                                    </li>
                                );
                            })}
                        </ul>
                    </>
                ) : (
                    <button
                        className="doctor-card-button"
                        onClick={toggleAppointments}
                    >
                        <strong>View Appointments</strong>
                    </button>
                )}
            </div>
        </div>
    );
}

export default DoctorCard;
