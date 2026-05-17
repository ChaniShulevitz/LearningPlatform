module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/src/tests/**/*.ts'], // ✨ שינוי קטן שימצא את api.test.ts מיד!
  setupFiles: ['dotenv/config']
};