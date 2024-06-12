const Doctor = require('../models/doctor');
const db = require('../db');

process.env.NODE_ENV = 'test';

jest.mock('../db');

describe('Doctor Model', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create a new doctor', async () => {
      db.query.mockResolvedValueOnce({ rows: [] });

      const mockResult = { rows: [{ id: 1 }] };
      db.query.mockResolvedValueOnce(mockResult);

      const doctorData = { first_name: 'John', last_name: 'Doe', providerId: 1 };
      const doctorId = await Doctor.create(doctorData);

      expect(db.query).toHaveBeenCalledWith(expect.any(String), ['John', 'Doe']);
      expect(doctorId).toBe(1);
    });

    it('should throw an error if doctor creation fails due to a duplicate name', async () => {
      db.query.mockResolvedValueOnce({ rows: [{ id: 1 }] });

      const doctorData = { first_name: 'John', last_name: 'Doe', providerId: 1 };
      await expect(Doctor.create(doctorData)).rejects.toThrow('Doctor with name John Doe already exists');
    });

    it('should throw an error if doctor creation fails due to a database error', async () => {
      // Mock the duplicate check query to return no results
      db.query.mockResolvedValueOnce({ rows: [] });

      // Mock the actual insert query to throw an error
      db.query.mockRejectedValueOnce(new Error('Database error'));

      const doctorData = { first_name: 'John', last_name: 'Doe', providerId: 1 };
      await expect(Doctor.create(doctorData)).rejects.toThrow('Database error');
    });
  });

  describe('remove', () => {
    it('should remove a doctor', async () => {
      const mockResult = { rows: [{ id: 1 }] };
      db.query.mockResolvedValue(mockResult);

      await Doctor.remove(1);

      expect(db.query).toHaveBeenCalledWith(expect.any(String), [1]);
    });

    it('should throw a NotFoundError if doctor not found', async () => {
      const mockResult = { rows: [] };
      db.query.mockResolvedValue(mockResult);

      await expect(Doctor.remove(1)).rejects.toThrow('Doctor with ID 1 not found');
    });

    it('should throw an error if removing doctor fails', async () => {
      db.query.mockRejectedValue(new Error('Database error'));

      await expect(Doctor.remove(1)).rejects.toThrow('Database error');
    });
  });
});
