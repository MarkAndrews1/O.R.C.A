import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import OrcaApi from "../../api";
import './PatientCard.css';

function PatientCard({ patient_id, first_name, last_name, date_of_birth, phone_num }) {
    const [appointments, setAppointments] = useState([]);
    const [appointmentsDisplayed, setAppointmentsDisplayed] = useState(false);

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    const formatPhoneNumber = (phoneNumber) => {
        const cleaned = ('' + phoneNumber).replace(/\D/g, '');
        const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
        if (match) {
            return `(${match[1]}) ${match[2]}-${match[3]}`;
        }
        return phoneNumber;
    };

    useEffect(() => {
        if (appointmentsDisplayed) {
            const getAppointments = async () => {
                try {
                    const appointmentsData = await OrcaApi.getPatientAppointments(patient_id);
                    const appointmentsWithDoctors = await Promise.all(appointmentsData.map(async (appointment) => {
                        const doctor = await OrcaApi.getDoctor(appointment.doctor_id);
                        const office = await OrcaApi.getOffice(appointment.office_id);
                        return { ...appointment, doctor, office };
                    }));
                    setAppointments(appointmentsWithDoctors);
                } catch (error) {
                    console.error("Error fetching appointments:", error);
                }
            };

            getAppointments();
        }
    }, [appointmentsDisplayed, patient_id]);

    const toggleAppointments = () => {
        setAppointmentsDisplayed(!appointmentsDisplayed);
    };

    return (
        <div className="patient-card">
            <h2>Patient Information</h2>

            <p><strong>First Name:</strong> {first_name}</p>
            <p><strong>Last Name:</strong> {last_name}</p>
            <p><strong>Date of Birth:</strong> {formatDate(date_of_birth)}</p>
            <p><strong>Phone Number:</strong> {formatPhoneNumber(phone_num)}</p>
            <Link className="chat-link" to={`/provider/chat/${patient_id}`}>
            Chat
            </Link>
            {appointmentsDisplayed ? (
                <>
                    <button
                        className="patient-card-button close-button"
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
                                    <strong>Doctor</strong>: {appointment.doctor.first_name} {appointment.doctor.last_name}
                                    <br />
                                    <strong>Office</strong>: {appointment.office.address}
                                </li>
                            );
                        })}
                    </ul>
                </>
            ) : (
                <button
                    className="patient-card-button"
                    onClick={toggleAppointments}
                >
                    <strong>View Appointments</strong>
                </button>
            )}
        </div>
    );
}

export default PatientCard;
