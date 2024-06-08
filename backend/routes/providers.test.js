const request = require('supertest');
const express = require('express');
const router = require('../routes/providers');

jest.mock('../models/provider');
jest.mock('../models/appointment');

const app = express();
app.use(express.json());
app.use('/', router);

describe('Provider Routes', () => {
  describe('GET /:id/patients', () => {
    it('should return a list of patients for the given provider', async () => {
      const expectedPatients = [{ id: 1, name: 'John Doe' }, { id: 2, name: 'Jane Smith' }];
      require('../models/provider').getAllPatients.mockResolvedValue(expectedPatients);

      const response = await request(app).get('/1/patients');

      expect(response.status).toBe(200);
      expect(response.body).toEqual({ patients: expectedPatients });
    });
  });

  describe('GET /:id/doctors', () => {
    it('should return a list of doctors for the given provider', async () => {
      const expectedDoctors = [{ id: 1, name: 'Dr. Smith' }, { id: 2, name: 'Dr. Johnson' }];
      require('../models/provider').getAllDoctors.mockResolvedValue(expectedDoctors);

      const response = await request(app).get('/1/doctors');

      expect(response.status).toBe(200);
      expect(response.body).toEqual({ doctors: expectedDoctors });
    });
  });

  describe('GET /:id/offices', () => {
    it('should return a list of offices for the given provider', async () => {
      const expectedOffices = [{ id: 1, location: 'New York' }, { id: 2, location: 'Los Angeles' }];
      require('../models/provider').getAllOffices.mockResolvedValue(expectedOffices);

      const response = await request(app).get('/1/offices');

      expect(response.status).toBe(200);
      expect(response.body).toEqual({ offices: expectedOffices });
    });
  });

  describe('POST /appointments', () => {
    it('should create a new appointment', async () => {
      const newAppointment = { date: '2024-06-10', patientId: 1, doctorId: 1 };
      const createdAppointment = { id: 1, date: '2024-06-10', patientId: 1, doctorId: 1 };
      require('../models/appointment').create.mockResolvedValue(createdAppointment);

      const response = await request(app)
        .post('/appointments')
        .send(newAppointment);

      expect(response.status).toBe(201);
      expect(response.body).toEqual(createdAppointment);
    });
  });

});
