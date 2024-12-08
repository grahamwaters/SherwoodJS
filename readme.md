# SherwoodJS
## The Javascript wrapper for the Robinhood Robin Stocks Library.

SherwoodJS is a JavaScript wrapper for the Robinhood API. It allows you to interact programmatically with your Robinhood account, enabling tasks such as retrieving portfolio information, making trades, and accessing market data.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

You need Node.js installed on your computer. You can download and install it from [Node.js official website](https://nodejs.org/).

### Installing

Clone the repository to your local machine:

```bash
git clone https://your-repository-url.git
cd RobinHoodie
```
Install the required dependencies:
```
npm install
```
Configuration
Create a .env file in the root directory of your project and add your Robinhood credentials:
```
ROBINHOOD_USERNAME=your_username
ROBINHOOD_PASSWORD=your_password
```
# Usage
## Logging In
To use the library, you first need to log in to Robinhood. Here is how you can do it:

```javascript
const Auth = require('./src/auth/auth');

async function login() {
    const auth = new Auth();
    await auth.login();
}

login();
```
# Fetching Portfolio
Once logged in, you can fetch your portfolio details:

```javascript
Copy code
const Account = require('./src/account/account');

async function displayPortfolio() {
    const account = new Account();
    const portfolio = await account.getPortfolio();
    console.log(portfolio);
}

displayPortfolio();
```
# Making Trades
You can place orders for stocks or cryptocurrencies:

```javascript
Copy code
const Stocks = require('./src/stocks/stocks');

async function placeTrade() {
    const stocks = new Stocks();
    await stocks.placeOrder('AAPL', 1, 'buy'); // Symbol, quantity, type
}

placeTrade();
```
# Contributing
Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are greatly appreciated.

# Fork the Project
Create your Feature Branch (git checkout -b feature/AmazingFeature)
Commit your Changes (git commit -m 'Add some AmazingFeature')
Push to the Branch (git push origin feature/AmazingFeature)
Open a Pull Request
# License
This project is licensed under the MIT License - see the LICENSE.md file for details.

# Disclaimer
This library is not officially affiliated with Robinhood Markets, Inc. It is intended for educational purposes only, and you should use it at your own risk.


# Explanation:

This README provides:

- **Installation instructions**: How to clone the repository and install dependencies.
- **Usage examples**: Clear examples of how to log in, retrieve portfolio data, and place trades using the library.
- **Contribution guidelines**: Encouraging community involvement.
- **License information**: It's important to specify the terms under which the software is licensed.
- **Disclaimer**: A standard disclaimer noting that this is not officially affiliated with Robinhood and is intended for educational purposes.


# Development
I am using a notebook running JS as a kernel and ijavascript to test the code.
```bash
npm install -g ijavascript
ijsinstall
```
I set up the `auth.js` file with the following block of code. It is to implement the login logic using Axios to handle HTTP requests:
```js
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
            client_id: this.clientID
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
```
Add your `.env` file to the `.gitignore`.
# Env File
```env
# this is where you store your login credentials.
ROBINHOOD_USERNAME=your_username
ROBINHOOD_PASSWORD=your_password
```
Your `.gitignore`
```
/.vscode
.env
```
In `src/account`, create a file named `account.js`.
Use the authentication token to fetch portfolio details:
```javascript
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
```
# Testing the Implementation
Run all Scripts:
- Create a test.js file in the root directory.
- Import and use your modules to make sure they work correctly:
```javascript
const Account = require('./src/account/account');

async function displayPortfolio() {
    const account = new Account();
    const portfolio = await account.getPortfolio();
    console.log(portfolio);
}

displayPortfolio();
```