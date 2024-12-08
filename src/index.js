const Account = require('./account/account');

async function displayPortfolio() {
    const account = new Account();
    const portfolio = await account.getPortfolio();
    console.log(portfolio);
}

displayPortfolio();
