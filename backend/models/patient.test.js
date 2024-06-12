const Patient = require('../models/patient');
const db = require('../db');

// Mock the db.query function
jest.mock('../db');

describe('Patient Model', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create a new patient', async () => {
      const mockResult = { rows: [{ id: 1 }] };
      db.query.mockResolvedValue(mockResult);

      const patientData = {
        first_name: 'John',
        last_name: 'Doe',
        date_of_birth: '1990-01-01',
        phone_num: 1234567890,
      };
      const patientId = await Patient.create(patientData);

      expect(db.query).toHaveBeenCalledWith(expect.any(String), [
        'John',
        'Doe',
        '1990-01-01',
        1234567890,
      ]);
      expect(patientId).toBe(1);
    });

    it('should throw an error if patient creation fails', async () => {
      db.query.mockRejectedValue(new Error('Database error'));

      const patientData = {
        first_name: 'John',
        last_name: 'Doe',
        date_of_birth: '1990-01-01',
        phone_num: 1234567890,
      };
      await expect(Patient.create(patientData)).rejects.toThrow(
        'Database error'
      );
    });
  });

  describe('remove', () => {
    it('should remove a patient', async () => {
      const mockResult = { rows: [{ id: 1 }] };
      db.query.mockResolvedValue(mockResult);

      await Patient.remove(1);

      expect(db.query).toHaveBeenCalledWith(expect.any(String), [1]);
    });

    it('should throw a NotFoundError if patient not found', async () => {
      const mockResult = { rows: [] };
      db.query.mockResolvedValue(mockResult);

      await expect(Patient.remove(1)).rejects.toThrow(
        'Patient with ID 1 not found'
      );
    });

    it('should throw an error if removing patient fails', async () => {
      db.query.mockRejectedValue(new Error('Database error'));

      await expect(Patient.remove(1)).rejects.toThrow(
        'Database error'
      );
    });
  });
});
