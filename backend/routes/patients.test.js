const express = require('express');
const request = require('supertest');
const Patient = require('../models/patient');
const Appointment = require('../models/appointment');
const router = require('../routes/patients');

// Mock the models
jest.mock('../models/patient');
jest.mock('../models/appointment');

// Mock Express app
const app = express();
app.use(express.json());
app.use('/', router);

describe('Patient Routes', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /:id/providers', () => {
    it('should return providers for a patient', async () => {
      const mockProviders = [{ id: 1, name: 'Provider 1' }];
      Patient.getProviders.mockResolvedValue(mockProviders);

      const patientId = 1;
      const response = await request(app).get(`/${patientId}/providers`);

      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual({ providers: mockProviders });
    });

    it('should handle errors', async () => {
      Patient.getProviders.mockRejectedValue(new Error('Database error'));

      const patientId = 1;
      const response = await request(app).get(`/${patientId}/providers`);

      expect(response.statusCode).toBe(500);
    });
  });

  describe('GET /:id/appointments', () => {
    it('should return appointments for a patient', async () => {
      const mockAppointments = [{ id: 1, date: '2024-06-10' }];
      Appointment.getByPatient.mockResolvedValue(mockAppointments);

      const patientId = 1;
      const response = await request(app).get(`/${patientId}/appointments`);

      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual({ appointments: mockAppointments });
    });

    it('should handle errors', async () => {
      Appointment.getByPatient.mockRejectedValue(new Error('Database error'));

      const patientId = 1;
      const response = await request(app).get(`/${patientId}/appointments`);

      expect(response.statusCode).toBe(500);
    });
  });
});
