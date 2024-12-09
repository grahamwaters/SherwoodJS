require('dotenv').config();  // Ensure this is at the top
console.log(process.env.ROBINHOOD_USERNAME);

const axios = require('axios');
const Auth = require('../auth/auth');

class Account {
    constructor() {
        this.auth = new Auth();
    }

    async getPortfolio() {
        if (!this.auth.accessToken) {
            await this.auth.login();
        }

        try {
            const response = await axios.get('https://api.robinhood.com/portfolios/');
            console.log("Portfolio:", response.data);
            return response.data;
        } catch (error) {
            console.error('Failed to retrieve portfolio:', error.response ? error.response.data : error.message);
            return null;
        }
    }
}

module.exports = Account;
