const axios = require('axios');

class Auth {
  constructor() {
    this.api_url = 'https://api.robinhood.com/';
    this.token = null;
  }

  async login(username, password) {
    try {
      const response = await axios.post(`${this.api_url}login/`, {
        username: username,
        password: password
      });
      this.token = response.data.token;
      axios.defaults.headers.common['Authorization'] = `Token ${this.token}`;
      return response.data;
    } catch (error) {
      console.error('Login failed:', error);
      return null;
    }
  }
}

module.exports = Auth;
