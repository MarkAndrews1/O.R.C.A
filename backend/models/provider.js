"use strict";

const db = require("../db");
const bcrypt = require("bcrypt");

const {   UnauthorizedError, BadRequestError, NotFoundError } = require("../expressError");

class Provider {

    static async authenticate(email, password) {
        // Get the provider from the database by email
        const res = await db.query(
            `SELECT id, 
             provider_name AS "providerName",
             provider_password,
             provider_admin_password,
             email,
             admin AS "isAdmin",
             provider_img_url
             FROM providers
             WHERE email = $1`,
            [email]
        );
        
        const provider = res.rows[0];

        if (provider) {
            try {

                const isValid = await bcrypt.compare(password, provider.provider_password);
                console.log(isValid);
        
                if (isValid) {
                    return provider;
                } else {
                    console.log('Passwords do not match');
                }
            } catch (err) {
                // Handle error
                console.error('Error comparing passwords:', err);
            }
        }
        
        throw new UnauthorizedError("Invalid username/password");
    }

    static async getProvider(providerId) {
        const res = await db.query(
            `SELECT id, 
             provider_name AS "providerName",
             provider_password,
             provider_admin_password,
             email,
             admin AS "isAdmin",
             provider_img_url
             FROM providers
             WHERE id = $1`,
            [providerId]
        );
    
        const provider = res.rows[0];
    
        if (!provider) {
            throw new NotFoundError("Provider not found");
        }
    
        return provider;
    }

    static async getAllPatients(providerId) {
        const query = `
            SELECT p.*
            FROM patients p
            JOIN patient_provider pp ON p.id = pp.patient_id
            WHERE pp.provider_id = $1`;

        try {
            const result = await db.query(query, [providerId]);
            return result.rows;
        } catch (error) {
            console.error("Error in getAllPatients:", error.message);
            throw new Error("Error retrieving patients for provider");
        }
    }

    static async getAllDoctors(providerId) {
        const query = `
            SELECT d.*
            FROM doctors d
            WHERE d.provider_id = $1`;

        try {
            const result = await db.query(query, [providerId]);
            return result.rows;
        } catch (error) {
            console.error("Error in getAllDoctors:", error.message);
            throw new Error("Error retrieving doctors for provider");
        }
    }

    static async getAllOffices(providerId) {
        const query = `
            SELECT o.*
            FROM offices o
            WHERE o.provider_id = $1`;

        try {
            const result = await db.query(query, [providerId]);
            return result.rows;
        } catch (error) {
            console.error("Error in getAllOffices:", error.message);
            throw new Error("Error retrieving offices for provider");
        }
    }

    static async toggleAdmin(data) {
        const { providerId, status }= data

        const res = await db.query(
            `SELECT admin 
             FROM providers 
             WHERE id = $1`,
            [providerId]
        );

        const provider = res.rows[0];

        if (!provider) {
            throw new NotFoundError("Provider not found");
        }

        await db.query(
            `UPDATE providers
             SET admin = $1
             WHERE id = $2`,
            [status, providerId]
        );

        return status;
    }
}

module.exports = Provider;
