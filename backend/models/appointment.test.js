const Appointment = require('../models/appointment');
const db = require('../db');

// Mock the db.query function
jest.mock('../db');

describe('Appointment Model', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create a new appointment', async () => {
      const mockResult = { rows: [{ id: 1, date: '2024-06-10', patient_id: 1, doctor_id: 1 }] };
      db.query.mockResolvedValue(mockResult);

      const appointmentData = { date: '2024-06-10', patientId: 1, doctorId: 1 };
      const appointment = await Appointment.create(appointmentData);

      expect(appointment).toEqual({ id: 1, date: '2024-06-10', patient_id: 1, doctor_id: 1 });
    });

    it('should throw an error if appointment creation fails', async () => {
      db.query.mockRejectedValue(new Error('Database error'));

      const appointmentData = { date: '2024-06-10', patientId: 1, doctorId: 1 };
      await expect(Appointment.create(appointmentData)).rejects.toThrow('Error creating appointment');
    });
  });

  describe('getByDoctor', () => {
    it('should get appointments by doctor ID', async () => {
      const mockResult = { rows: [{ id: 1, date: '2024-06-10', patient_id: 1, doctor_id: 1 }] };
      db.query.mockResolvedValue(mockResult);

      const appointments = await Appointment.getByDoctor(1);

      expect(db.query).toHaveBeenCalledWith(expect.any(String), [1]);
      expect(appointments).toEqual([{ id: 1, date: '2024-06-10', patient_id: 1, doctor_id: 1 }]);
    });

    it('should throw an error if retrieving appointments fails', async () => {
      db.query.mockRejectedValue(new Error('Database error'));

      await expect(Appointment.getByDoctor(1)).rejects.toThrow('Error retrieving appointments by doctor');
    });
  });

  describe('getByPatient', () => {
    it('should get appointments by patient ID', async () => {
      const mockResult = { rows: [{ id: 1, date: '2024-06-10', patient_id: 1, doctor_id: 1 }] };
      db.query.mockResolvedValue(mockResult);

      const appointments = await Appointment.getByPatient(1);

      expect(db.query).toHaveBeenCalledWith(expect.any(String), [1]);
      expect(appointments).toEqual([{ id: 1, date: '2024-06-10', patient_id: 1, doctor_id: 1 }]);
    });

    it('should throw an error if retrieving appointments fails', async () => {
      db.query.mockRejectedValue(new Error('Database error'));

      await expect(Appointment.getByPatient(1)).rejects.toThrow('Error retrieving appointments by patient');
    });
  });

  describe('remove', () => {
    it('should remove an appointment', async () => {
      const mockResult = { rowCount: 1 };
      db.query.mockResolvedValue(mockResult);

      await Appointment.remove(1);

      expect(db.query).toHaveBeenCalledWith(expect.any(String), [1]);
    });

    it('should throw a NotFoundError if appointment not found', async () => {
      const mockResult = { rowCount: 0 };
      db.query.mockResolvedValue(mockResult);

      await expect(Appointment.remove(1)).rejects.toThrow('Error removing appointment');
    });

    it('should throw an error if removing appointment fails', async () => {
      db.query.mockRejectedValue(new Error('Database error'));

      await expect(Appointment.remove(1)).rejects.toThrow('Error removing appointment');
    });
  });
});
