const Account = require('./src/account/account');

async function displayPortfolio() {
    const account = new Account();
    try {
        console.log("Testing login and portfolio retrieval...");
        const portfolio = await account.getPortfolio();
        console.log("Portfolio retrieved successfully:");
        console.log(portfolio);
    } catch (error) {
        console.error("An error occurred during testing:", error);
    }
}

displayPortfolio();
