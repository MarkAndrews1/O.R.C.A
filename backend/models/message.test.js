"use strict";

const db = require("../db");
const Message = require("./message");

process.env.NODE_ENV = 'test';

const testData = {
    sender: "provider",
    provider_id: 1,
    patient_id: 1,
    content: "Test message"
};

describe("Message class", function () {

    beforeAll(async function () {
        await db.query(`
            INSERT INTO providers (provider_name, provider_password, provider_admin_password, email, provider_img_url) 
            VALUES 
                ('HealthCare Clinic', 
                '$2b$12$Z/wfeoMlDYXlI8EbeoUSFelhlCfUDDqm4c4JY27VLmSf/TmbPMqgG', 
                '1232', 
                'healthcare@gmail.com', 
                'https://img.freepik.com/free-vector/health-care-logo-icon_125964-471.jpg')
            ON CONFLICT (provider_name) DO NOTHING;
        `);

        await db.query(`
            INSERT INTO patients (id, first_name, last_name, date_of_birth, phone_num)
            VALUES 
                (1, 'John', 'Doe', '1980-05-15', 1234567890),
                (2, 'Alice', 'Smith', '1992-09-20', 9876543210)
            ON CONFLICT (id) DO NOTHING;
        `);
    });

    beforeEach(async function () {
        await db.query("DELETE FROM messages");
    });

    afterAll(async function () {
        await db.end();
    });

    test("create new message", async function () {
        const message = await Message.create(testData);
        expect(message).toHaveProperty("id");
        expect(message.sender).toEqual(testData.sender);
        expect(message.provider_id).toEqual(testData.provider_id);
        expect(message.patient_id).toEqual(testData.patient_id);
        expect(message.content).toEqual(testData.content);
    });

    test("get messages", async function () {
        await Message.create(testData);
        await Message.create({ ...testData, content: "Another test message" });

        const messages = await Message.getMessages({ provider_id: 1, patient_id: 1 });
        expect(messages.length).toEqual(2);
        expect(messages[0]).toHaveProperty("id");
        expect(messages[0].sender).toEqual(testData.sender);
        expect(messages[0].provider_id).toEqual(testData.provider_id);
        expect(messages[0].patient_id).toEqual(testData.patient_id);
        expect(messages[0].content).toEqual(testData.content);
    });

    test("get messages with no results", async function () {
        const messages = await Message.getMessages({ provider_id: 999, patient_id: 999 });
        expect(messages.length).toEqual(0);
    });
});
