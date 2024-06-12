const Office = require('../models/office');
const db = require('../db');

// Mock the db.query function
jest.mock('../db');

describe('Office Model', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create a new office', async () => {
      const mockResult = { rows: [{ id: 1 }] };
      db.query.mockResolvedValue(mockResult);

      const officeData = { address: '123 Main St', providerId: 1, phone_num: 1234567890 };
      const officeId = await Office.create(officeData);

      expect(officeId).toBe(1);
    });

    it('should throw an error if office creation fails', async () => {
      db.query.mockRejectedValue(new Error('Database error'));

      const officeData = { address: '123 Main St', providerId: 1, phone_num: 1234567890 };
      await expect(Office.create(officeData)).rejects.toThrow('Database error');
    });
  });

  describe('remove', () => {
    it('should remove an office', async () => {
      const mockResult = { rows: [{ id: 1 }] };
      db.query.mockResolvedValue(mockResult);

      await Office.remove(1);

      expect(db.query).toHaveBeenCalledWith(expect.any(String), [1]);
    });

    it('should throw a NotFoundError if office not found', async () => {
      const mockResult = { rows: [] };
      db.query.mockResolvedValue(mockResult);

      await expect(Office.remove(1)).rejects.toThrow('Office with ID 1 not found');
    });

    it('should throw an error if removing office fails', async () => {
      db.query.mockRejectedValue(new Error('Database error'));

      await expect(Office.remove(1)).rejects.toThrow('Database error');
    });
  });
});
