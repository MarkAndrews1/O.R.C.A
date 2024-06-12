const express = require('express');
const request = require('supertest');
const { validate } = require('jsonschema');
const router = require('../routes/admin');
const Doctor = require('../models/doctor');
const Office = require('../models/office');
const Patient = require('../models/patient');
const db = require("../db");

// Mock the models
jest.mock('../models/doctor');
jest.mock('../models/office');
jest.mock('../models/patient');

// Mock the middleware
jest.mock('../middleware/auth', () => ({
  isAdmin: jest.fn((req, res, next) => next()),
}));

const app = express();
app.use(express.json());
app.use('/', router);

describe('Admin Routes', () => {
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
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterAll(async function () {
    await db.end();
});

  describe('POST /doctors', () => {
    it('should create a new doctor', async () => {
      const mockDoctorData = { 
        first_name: 'John', 
        last_name: 'Doe', 
        provider_id: 1, 
        profile_img_url: 'https://example.com/profile.jpg' 
      };
      Doctor.create.mockResolvedValue(1);
      const response = await request(app).post('/doctors').send(mockDoctorData);
      expect(response.statusCode).toBe(201);
      expect(response.body).toEqual({ id: 1 });
    });
    

  });

  describe('DELETE /doctors/:id', () => {
    it('should remove a doctor', async () => {
      Doctor.remove.mockResolvedValue();
      const response = await request(app).delete('/doctors/1');
      expect(response.statusCode).toBe(204);
    });

  });

  describe('POST /offices', () => {
    it('should create a new office', async () => {
      const mockOfficeData = { address: '123 Main St', provider_id: 1, phone_num: 1234567890 };
      Office.create.mockResolvedValue(1);
      const response = await request(app).post('/offices').send(mockOfficeData);
      expect(response.statusCode).toBe(201);
      expect(response.body).toEqual({ id: 1 });
    });

  });

  describe('DELETE /offices/:id', () => {
    it('should remove an office', async () => {
      Office.remove.mockResolvedValue();
      const response = await request(app).delete('/offices/1');
      expect(response.statusCode).toBe(204);
    });

  });

  describe('POST /patients', () => {
    it('should create a new patient', async () => {
      const mockPatientData = { first_name: 'Jane', last_name: 'Doe', date_of_birth: '2000-01-01', phone_num: 1234567890,provider_id: 1 };
      Patient.create.mockResolvedValue(1);
      const response = await request(app).post('/patients').send(mockPatientData);
      expect(response.statusCode).toBe(201);
      expect(response.body).toEqual({ id: 1 });
    });

  });

  describe('DELETE /patients/:id', () => {
    it('should remove a patient', async () => {
      Patient.remove.mockResolvedValue();
      const response = await request(app).delete('/patients/1');
      expect(response.statusCode).toBe(204);
    });
  });
});
