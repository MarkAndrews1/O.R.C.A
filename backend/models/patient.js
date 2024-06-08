"use strict";

const db = require("../db");
const { BadRequestError, NotFoundError } = require("../expressError");

class Patient {

    static async getPatient(id) {
        const result = await db.query(
            `SELECT id, first_name, last_name, date_of_birth, phone_num
             FROM patients
             WHERE id = $1`,
            [id]
        );

        if (result.rows.length === 0) {
            throw new NotFoundError("Patient not found");
        }

        return result.rows[0];
    }

    static async findPatient(phone_num, date_of_birth) {
        const result = await db.query(
            `SELECT id, first_name, last_name, date_of_birth, phone_num
             FROM patients
             WHERE phone_num = $1 AND date_of_birth = $2`,
            [phone_num, date_of_birth]
        );

        if (result.rows.length === 0) {
            throw new NotFoundError("Patient not found");
        }

        return result.rows[0];
    }

    static async create(data) {
        const duplicateCheck = await db.query(
            `SELECT id 
             FROM patients
             WHERE first_name = $1 AND last_name = $2 AND date_of_birth = $3 AND phone_num = $4`,
            [data.first_name, data.last_name, data.date_of_birth, data.phone_num]
        );
    
        if (duplicateCheck.rows[0]) {
            await db.query(
                `INSERT INTO patient_provider (patient_id, provider_id)
                VALUES ($1, $2)`,
                [
                    duplicateCheck.rows[0].id,
                    data.provider_id
                ])
            return duplicateCheck.rows[0].id
        }

        const result = await db.query(
            `INSERT INTO patients (first_name, last_name, date_of_birth, phone_num)
             VALUES ($1, $2, $3, $4) RETURNING id`,
            [
                data.first_name,
                data.last_name,
                data.date_of_birth,
                data.phone_num
            ]);

        const patientId = result.rows[0].id;

        await db.query(
            `INSERT INTO patient_provider (patient_id, provider_id)
            VALUES ($1, $2)`,
            [
                patientId,
                data.provider_id
            ])

        return patientId;
    }

    static async getProviders(patientId) {
        const query = `
            SELECT p.*
            FROM providers p
            JOIN patient_provider pp ON p.id = pp.provider_id
            WHERE pp.patient_id = $1`;

        try {
            const result = await db.query(query, [patientId]);
            return result.rows;
        } catch (error) {
            console.error("Error in getProviders:", error.message);
            throw new Error("Error retrieving providers for patient");
        }
    }

    static async remove(patientId) {
        const result = await db.query(
            `DELETE FROM patient_provider
             WHERE patient_id = $1
             RETURNING id`,
            [patientId]);
    
        if (result.rows.length === 0) {
            throw new NotFoundError(`Patient with ID ${patientId} not found`);
        }
    }
    
}

module.exports = Patient;
