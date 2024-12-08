const axios = require('axios');
require('dotenv').config();

class Auth {
    constructor() {
        this.apiURL = 'https://api.robinhood.com/oauth2/token/';
        this.clientID = 'c82fd958-5cb6-4f6a-b69d-12f8851a4dae'; // Robinhood's public client ID
    }

    async login() {
        const data = {
            grant_type: 'password',
            username: process.env.ROBINHOOD_USERNAME,
            password: process.env.ROBINHOOD_PASSWORD,
            client_id: this.clientID,
            scope: 'read'  // Assuming 'read' is the correct scope; adjust as needed
        };

        try {
            const response = await axios.post(this.apiURL, data);
            this.accessToken = response.data.access_token;
            axios.defaults.headers.common['Authorization'] = `Bearer ${this.accessToken}`;
            console.log("Logged in successfully.");
            return this.accessToken;
        } catch (error) {
            console.error('Login failed:', error.response ? error.response.data : error.message);
            return null;
        }
    }
}

module.exports = Auth;
