"use strict";

const db = require("../db");
const { BadRequestError, NotFoundError } = require("../expressError");

class Message {
  static async create(data) {
    const { sender, provider_id, patient_id, content } = data;

    const res = await db.query(
        `INSERT INTO messages (sender, provider_id, patient_id, content)
         VALUES ($1, $2, $3, $4)
         RETURNING *`,
        [sender, provider_id, patient_id, content]
    );

    const message = res.rows[0];
    return message;
}


      static async getMessages(data){
        let { provider_id, patient_id } = data;
        const res = await db.query(
            `SELECT *
            FROM messages
            WHERE provider_id = $1 AND patient_id = $2
            ORDER BY timestamp`,
            [provider_id, patient_id]
        );
    
        const messages = res.rows;
        return messages;
    }
    
}

module.exports = Message;
