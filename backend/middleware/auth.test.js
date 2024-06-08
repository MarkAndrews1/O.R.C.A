const { isAdmin } = require('./auth'); 

const req = {};
const res = {
  status: jest.fn(() => res),
  json: jest.fn(),
};
const next = jest.fn();

describe('isAdmin middleware', () => {
  it('should call next() if user is an admin', () => {
    req.provider = { admin: true };

    isAdmin(req, res, next);

    expect(next).toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
  });

  it('should return 403 error if user is not an admin', () => {
    req.provider = { admin: false };

    isAdmin(req, res, next);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({ message: 'Unauthorized' });
  });

  it('should return 403 error if req.provider is undefined', () => {
    isAdmin(req, res, next);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({ message: 'Unauthorized' });
  });
});
