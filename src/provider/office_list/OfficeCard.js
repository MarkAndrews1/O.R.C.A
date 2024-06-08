import React from "react";

function OfficeCard({ address, phone_num }) {

    const formatPhoneNumber = (phoneNumber) => {
        const cleaned = ('' + phoneNumber).replace(/\D/g, '');
        const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
        if (match) {
            return `(${match[1]}) ${match[2]}-${match[3]}`;
        }
        return phoneNumber;
    };

    return (
        <div className="patient-card">
            <h2>Office Information</h2>
            <p><strong>Address:</strong> {address}</p>
            <p><strong>Phone Number:</strong> {formatPhoneNumber(phone_num)}</p>
        </div>
    );
}

export default OfficeCard;
