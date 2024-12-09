const axios = require('axios');

/**
 * Login to Robinhood using username and password.
 *
 * @param {string} username - Your Robinhood username (email).
 * @param {string} password - Your Robinhood password.
 * @param {string} [mfaCode=null] - Optional MFA code if your account requires multi-factor auth.
 * @returns {Promise<Object>} - Returns a promise that resolves to an object containing your access_token and related info.
 */
async function login(username, password, mfaCode = null) {
  const data = {
    grant_type: 'password',
    scope: 'internal',
    client_id: 'c82SH0WZOsabOXGP2sxqcj34FxkvfnWRZBKlBjFS', // This is the public client_id used by the Robinhood app; known from reverse-engineering.
    expires_in: 86400,
    device_token: 'YOUR_DEVICE_TOKEN_HERE', // In practice, you should generate and use a stable device token.
    username: username,
    password: password
  };

  // If MFA is required, add the code to the request body
  if (mfaCode) {
    data.mfa_code = mfaCode;
  }

  try {
    const response = await axios.post('https://api.robinhood.com/oauth2/token/', data);
    const authToken = response.data.access_token;
    // You can store this token in a variable, database, or memory for subsequent requests.
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error("Login failed: ", error.response.data);
    } else {
      console.error("Login error: ", error.message);
    }
    throw error;
  }
}

module.exports = {
  login
};
