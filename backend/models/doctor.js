"use strict";

const db = require("../db");
const { BadRequestError, NotFoundError } = require("../expressError");

class Doctor {
    static async create(data) {
        const duplicateCheck = await db.query(
            `SELECT id 
             FROM doctors
             WHERE first_name = $1 AND last_name = $2 AND provider_id = $3`,
            [data.first_name, data.last_name, data.provider_id]
        );
    
        if (duplicateCheck.rows.length > 0) {
            throw new BadRequestError(`Doctor with name ${data.first_name} ${data.last_name} already exists`);
        }

        const result = await db.query(
            `INSERT INTO doctors (first_name, last_name, provider_id, profile_img_url)
             VALUES ($1, $2, $3, $4) RETURNING id`,
            [
                data.first_name,
                data.last_name,
                data.provider_id,
                data.profile_img_url
            ]);

        const doctorId = result.rows[0].id;
        return doctorId;
    }

    static async getDoctor(id){
        const res = await db.query(
            `SELECT * 
            FROM doctors
            WHERE id = $1`,
            [id]
        )

        const doctor = res.rows[0];
        return doctor;
    }

    static async findDoctor(data){
        const res = await db.query(
            `SELECT * 
            FROM doctors
            WHERE first_name = $1 AND last_name = $2 AND provider_id = $3`,
           [data.first_name, data.last_name, data.provider_id]
        )

        const doctor = res.rows[0];
        return doctor;
    }

    static async remove(doctorId) {
        const result = await db.query(
            `DELETE FROM doctors
             WHERE id = $1
             RETURNING id`,
            [doctorId]);

        if (result.rows.length === 0) {
            throw new NotFoundError(`Doctor with ID ${doctorId} not found`);
        }
    }
}

module.exports = Doctor;
