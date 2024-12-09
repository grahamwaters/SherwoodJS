// example.js
const { login } = require('./robinhood');

(async () => {
  try {
    const credentials = await login('your_username', 'your_password');
    console.log('Login successful:', credentials);
    // credentials.access_token can now be used in subsequent requests
  } catch (err) {
    console.error('Login error:', err);
  }
})();
