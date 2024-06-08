const db = require('../db');
const Provider = require('../models/provider');

// Mock the db.query function
jest.mock('../db');

describe('Provider Model', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getAllPatients', () => {
    it('should retrieve all patients for a provider', async () => {
      const mockResult = { rows: [{ id: 1, name: 'John Doe' }] };
      db.query.mockResolvedValue(mockResult);

      const providerId = 1;
      const patients = await Provider.getAllPatients(providerId);

      expect(db.query).toHaveBeenCalledWith(expect.any(String), [providerId]);
      expect(patients).toEqual([{ id: 1, name: 'John Doe' }]);
    });

    it('should throw an error if retrieving patients fails', async () => {
      db.query.mockRejectedValue(new Error('Database error'));

      const providerId = 1;
      await expect(Provider.getAllPatients(providerId)).rejects.toThrow(
        'Error retrieving patients for provider'
      );
    });
  });

  describe('getAllDoctors', () => {
    it('should retrieve all doctors for a provider', async () => {
      const mockResult = { rows: [{ id: 1, name: 'Dr. Smith' }] };
      db.query.mockResolvedValue(mockResult);

      const providerId = 1;
      const doctors = await Provider.getAllDoctors(providerId);

      expect(db.query).toHaveBeenCalledWith(expect.any(String), [providerId]);
      expect(doctors).toEqual([{ id: 1, name: 'Dr. Smith' }]);
    });

    it('should throw an error if retrieving doctors fails', async () => {
      db.query.mockRejectedValue(new Error('Database error'));

      const providerId = 1;
      await expect(Provider.getAllDoctors(providerId)).rejects.toThrow(
        'Error retrieving doctors for provider'
      );
    });
  });

  describe('getAllOffices', () => {
    it('should retrieve all offices for a provider', async () => {
      const mockResult = { rows: [{ id: 1, address: '123 Main St' }] };
      db.query.mockResolvedValue(mockResult);

      const providerId = 1;
      const offices = await Provider.getAllOffices(providerId);

      expect(db.query).toHaveBeenCalledWith(expect.any(String), [providerId]);
      expect(offices).toEqual([{ id: 1, address: '123 Main St' }]);
    });

    it('should throw an error if retrieving offices fails', async () => {
      db.query.mockRejectedValue(new Error('Database error'));

      const providerId = 1;
      await expect(Provider.getAllOffices(providerId)).rejects.toThrow(
        'Error retrieving offices for provider'
      );
    });
  });
});
