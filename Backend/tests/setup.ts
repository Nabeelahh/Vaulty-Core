// Test setup file
process.env.NODE_ENV = 'test';
process.env.DATABASE_URL = 'postgresql://postgres:test@localhost:5432/vaulty_test';
process.env.JWT_ACCESS_SECRET = 'test-secret-key';
process.env.JWT_REFRESH_SECRET = 'test-refresh-secret-key';
process.env.REDIS_HOST = 'localhost';
process.env.REDIS_PORT = '6379';
