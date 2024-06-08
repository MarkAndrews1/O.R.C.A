"use strict";

const db = require("../db");
const { BadRequestError, NotFoundError } = require("../expressError");

class Office {
    static async create(data) {
        const result = await db.query(
            `INSERT INTO offices (address, provider_id, phone_num)
             VALUES ($1, $2, $3) RETURNING id`,
            [
                data.address,
                data.provider_id,
                data.phone_num
            ]);

        const officeId = result.rows[0].id;
        return officeId;
    }

    static async getOffice(id){
        const res = await db.query(
            `SELECT * 
            FROM offices
            WHERE id = $1`,
            [id]
        )

        const office = res.rows[0];
        return office;
    }

    static async findOffice(data) {
        const result = await db.query(
            `SELECT id, address, phone_num
             FROM offices
             WHERE address = $1 AND provider_id = $2`,
            [data.address, data.provider_id]
        );

        let office = result.rows[0]
        return office;
    }

    static async remove(officeId) {
        const result = await db.query(
            `DELETE FROM offices
             WHERE id = $1
             RETURNING id`,
            [officeId]);

        if (result.rows.length === 0) {
            throw new NotFoundError(`Office with ID ${officeId} not found`);
        }
    }
}

module.exports = Office;
