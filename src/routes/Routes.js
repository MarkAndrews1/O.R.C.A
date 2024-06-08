import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import UserContext from "../auth/UserContext";

import Homepage from "../homepage/Homepage";
import ProviderLoginForm from "../auth/ProviderLoginForm";
import ProviderHomepage from "../provider/ProviderHomepage";
import PatientLoginForm from "../auth/PatientLoginForm";
import PatientHomepage from "../patient/PatientHomepage";

import AdminLoginForm from "../auth/AdminLoginForm";
import ProviderAdminPage from "../provider/ProviderAdminPage";

import AdminPatientPage from "../provider/admin/AdminPatientPage";
import AdminPatientCreateForm from "../provider/admin/AdminPatientCreateForm";
import AdminPatientRemoveForm from "../provider/admin/AdminPatientRemoveForm";

import AdminDoctorPage from "../provider/admin/AdminDoctorPage";
import AdminDoctorCreateForm from "../provider/admin/AdminDoctorCreateForm";
import AdminDoctorRemoveForm from "../provider/admin/AdminDoctorRemoveForm";

import AdminOfficePage from "../provider/admin/AdminOfficePage";
import AdminOfficeCreateForm from "../provider/admin/AdminOfficeCreateForm";
import AdminOfficeRemoveForm from "../provider/admin/AdminOfficeRemoveForm";

import PatientList from "../provider/patient_list/PatientList";
import DoctorList from "../provider/doctor_list/DoctorList"
import OfficeList from "../provider/office_list/OfficeList";

import AppointmentCreateForm from "../provider/appointment/AppointmentCreateForm";
import AppointmentRemoveForm from "../provider/appointment/AppointmentRemoveForm";

import ChatRoom from "../chat_room/ChatRoom";

function OrcaRoutes({ providerLogin, patientLogin }) {
    const { currentProvider } = useContext(UserContext);
    const { currentPatient } = useContext(UserContext);

    return (
        <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/provider-login" element={<ProviderLoginForm login={providerLogin} />} />
            {currentProvider ? (
                <>
                    {!currentProvider.isAdmin && <Route path="/provider/admin/login" element={<AdminLoginForm />} />}
                    <Route path="/provider" element={<ProviderHomepage />} />

                    <Route path="/provider/patients" element={<PatientList />} />
                    <Route path="/provider/doctors" element={<DoctorList />} />
                    <Route path="/provider/offices" element={<OfficeList />} />
                    <Route path="/provider/chat/:otherId" element={<ChatRoom />} />

                    <Route path="/provider/appointment" element={<AppointmentCreateForm />} />
                    <Route path="/provider/appointment/remove" element={<AppointmentRemoveForm />} />

                    {currentProvider.isAdmin && <Route path="/provider/admin" element={<ProviderAdminPage />} />}

                    {currentProvider.isAdmin && <Route path="/provider/admin/patients" element={<AdminPatientPage />} />}
                    {currentProvider.isAdmin && <Route path="/provider/admin/patients/create" element={<AdminPatientCreateForm />} />}
                    {currentProvider.isAdmin && <Route path="/provider/admin/patients/remove" element={<AdminPatientRemoveForm />} />}

                    {currentProvider.isAdmin && <Route path="/provider/admin/doctors/" element={<AdminDoctorPage />} />}
                    {currentProvider.isAdmin && <Route path="/provider/admin/doctors/create" element={<AdminDoctorCreateForm />} />}
                    {currentProvider.isAdmin && <Route path="/provider/admin/doctors/remove" element={<AdminDoctorRemoveForm />} />}

                    {currentProvider.isAdmin && <Route path="/provider/admin/offices" element={<AdminOfficePage />} />}
                    {currentProvider.isAdmin && <Route path="/provider/admin/offices/create" element={<AdminOfficeCreateForm />} />}
                    {currentProvider.isAdmin && <Route path="/provider/admin/offices/remove" element={<AdminOfficeRemoveForm />} />}
                </>
            ) : (
                <Route path="/provider" element={<Navigate to="/provider" />} />
            )}
            <Route path="/patient-login" element={<PatientLoginForm login={patientLogin} />} />
            {currentPatient ? (
                <>
                    <Route path="/patient" element={<PatientHomepage />} />
                    <Route path="/patient/chat/:otherId" element={<ChatRoom />} />
                </>
            ) : (
                <Route path="/patient" element={<Navigate to="/patient-login" />} />
            )}
            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    );
}

export default OrcaRoutes;
