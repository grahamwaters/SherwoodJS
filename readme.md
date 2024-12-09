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

# The Auth Class
The `Auth` class we created effectively sets up and handles the login process to Robinhood's API using JavaScript with Node.js. This class is designed to manage the authentication process, including sending the login credentials and handling the response. Here’s a breakdown of each part and what you might want to be aware of:

### Breaking Down the `Auth` Class:

1. **Constructor**:
   - `apiURL`: Sets the endpoint for the OAuth2 token request.
   - `clientID`: Specifies the client ID. This ID should be provided by Robinhood when you register your application or might be a public ID for general API access. In your case, it's a hardcoded value, which is fine for example purposes but should be securely managed in production applications.

2. **Login Method**:
   - **Payload Setup**: Constructs the data object that includes all necessary parameters for the OAuth2 authentication request:
     - `grant_type`: This is typically `'password'` for this kind of OAuth flow.
     - `username` and `password`: These are pulled from environment variables, ensuring sensitive credentials aren’t hardcoded in your source code.
     - `client_id`: Passed from the class property.
     - `scope`: Defines the permissions the application is requesting. The `'read'` scope must align with the specific permissions granted by Robinhood; this might need adjustment based on what access your application actually requires.
   - **Making the HTTP Request**: Uses Axios to send a POST request to the Robinhood API with the constructed payload.
   - **Response Handling**:
     - **Success**: If the request is successful, it logs the success, extracts the `access_token` from the response, and sets it for future Axios requests. This token is crucial for making authenticated API calls.
     - **Error**: If there’s an error (e.g., wrong credentials, network issues), it logs the detailed error message. This is crucial for debugging issues with authentication.

3. **Usage**:
   - You would typically create an instance of this `Auth` class and call the `login` method to authenticate. After logging in successfully, you can use the `accessToken` for making other API requests that require authentication.

### Example Usage:

Here's how you might use this class in your application:

```javascript
const Auth = require('./path/to/auth'); // Adjust the path as necessary

async function authenticate() {
    const auth = new Auth();
    try {
        const token = await auth.login();
        console.log('Authentication successful, token:', token);
    } catch (error) {
        console.error('Authentication failed:', error);
    }
}

authenticate();
```

### Improvements and Considerations:

- **Error Handling**: More robust error handling could be implemented to manage different types of authentication errors more effectively.
- **Security**: Ensure that the environment variables are securely managed and not exposed, especially in a production environment.
- **Scopes and Permissions**: Verify the required scopes by checking the Robinhood API documentation or your application configuration within Robinhood.

This setup provides a solid foundation for managing authentication with Robinhood’s API in a Node.js application. Adjustments may be necessary based on specific requirements or changes in the API.

# Rate Limits on Robinhood

Rate Limits
Requests per minute per user account: 100
Requests per minute per user account in bursts: 300
[See their documentation here](https://docs.robinhood.com/crypto/trading/#section/Rate-Limiting)

# APIs
I used the code below to generate an API key.
```js
const nacl = require('tweetnacl')
const base64 = require('base64-js')

// Generate an Ed25519 keypair
const keyPair = nacl.sign.keyPair()

// Convert keys to base64 strings
const private_key_base64 = base64.fromByteArray(keyPair.secretKey)
const public_key_base64 = base64.fromByteArray(keyPair.publicKey)

// Print keys in the base64 format
console.log("Private Key (Base64)")
console.log(private_key_base64)

console.log("Public Key (Base64):")
console.log(public_key_base64)
```
You will also need to do this `npm install tweetnacl base64-js` to install those packages.

# Goals
1. Authentication via API call.