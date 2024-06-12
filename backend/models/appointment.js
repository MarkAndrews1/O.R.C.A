"use strict";

const db = require("../db");
const { NotFoundError } = require("../expressError");

class Appointment {

    static async create(data) {
        const { date, patient_id, doctor_id, office_id } = data;

        const query = `
            INSERT INTO appointments (date, patient_id, doctor_id, office_id)
            VALUES ($1, $2, $3, $4)
            RETURNING id, date, patient_id, doctor_id, office_id`;

        try {
            const result = await db.query(query, [date, patient_id, doctor_id, office_id]);
            return result.rows[0];
        } catch (error) {
            console.error("Error in createAppointment:", error.message);
            throw new Error("Error creating appointment");
        }
    }

    static async getByDoctor(doctorId) {
        let query = `SELECT a.*
                     FROM appointments a
                     JOIN doctors d ON a.doctor_id = d.id
                     WHERE d.id = $1`;

        try {
            const result = await db.query(query, [doctorId]);
            return result.rows;
        } catch (error) {
            console.error("Error in getByDoctor:", error.message);
            throw new Error("Error retrieving appointments by doctor");
        }
    }

    static async getByPatient(patientId) {
        let query = `SELECT a.*
                     FROM appointments a
                     JOIN patients p ON a.patient_id = p.id
                     WHERE p.id = $1`;

        try {
            const result = await db.query(query, [patientId]);
            return result.rows;
        } catch (error) {
            console.error("Error in getByPatient:", error.message);
            throw new Error("Error retrieving appointments by patient");
        }
    }

    static async findAppointment(data){
        const res = await db.query(
            `SELECT * 
            FROM appointments
            WHERE date = $1 AND patient_id = $2 AND doctor_id = $3`,
           [data.date, data.patient_id, data.doctor_id]
        )

        const appointment = res.rows[0];
        return appointment;
    }

    static async remove(appointmentId) {
        const query = `
            DELETE FROM appointments
            WHERE id = $1`;

        try {
            const result = await db.query(query, [appointmentId]);
            if (result.rowCount === 0) throw new NotFoundError("Appointment not found");
        } catch (error) {
            console.error("Error in removeAppointment:", error.message);
            throw new Error("Error removing appointment");
        }
    }
}

module.exports = Appointment;
