# @i077/tda-api-nodejs-unofficial

Unofficial Node.js wrapper for TD Ameritrade's API. Custom implementation for authorization flows for tokens handling and access scope.

## TD Ameritrade API
The official documentations on TD Ameritrade's API can be found on their website [TD Ameritrade for developers](https://developer.tdameritrade.com/). Not all of its endpoint is included in this client.

## Getting started


### Signing up and creating your app with TD Ameritrade
Go to [TD Ameritrade for developers](https://developer.tdameritrade.com/), register, under "My Apps" click "add new app". Follow the instruction. Most important part is callback URL, the URL of your webapp that will capture the oAuth code that's passed back to authenticate the user on  your webapp. Once your app is approved, copy the consumer key, add "@AMER.OAUTHAP" at the end, this is the clientId. If you are only interested in testing unauthenticated calls or testing with my web demos:

vue frontend demo: [https://dos077.github.io/api-demo-vue/](https://dos077.github.io/api-demo-vue/)
react frontend demo: [https://dos077.github.io/api-demo-react/](https://dos077.github.io/api-demo-react/)

### Installation
This library is distributed on npm. Run the following command in your project:
``` sh
$ npm install @i077/tda-api-nodejs-unofficial
```

### Using the client
``` js
import APIwrapper from '@i077/tda-api-nodejs-unofficial';

// initializing a client for TDA API
const client = APIwrapper({
  clientId: 'consumer key from your app',
  redirectUri: 'redirect URL for oAuth code',
  storeAuth: false, // store refresh token in localStorage, default is false
  logInRedirect: false, // redirect if attempt to login without a stored refresh token or oAuth code
  scope: ['PlaceTrades', 'AccountAccess', 'MoveMoney'], // scope for the access grant
  afterLogIn: () => console.log('client access granted'), // function to run after successful login
  afterLogOut: () => console.log('client access revoked'), // function to run after successful logout
});


// run a test function to log some quote data without authentication
const testLogQuote = async () => {
  const resJson = await client.quotes.unauthenticated.getQuote({ symbol: 'TD' });
  console.log(resJson);
}
testLogQuote();
```

### Authentication
TD Ameritrade API follows OAuth2's authentication. However, the implementation seems to be incomplete and consequently insecure, ~~namely the lack of scopes and~~ revoking grant. I've poked around and tried at least adding revoke access back to the API, but their access controls is incomplete and consequently, access tokens cannot be revoked. Refresh token is revokable and per OAuth's documentation, this should revoke the whole grant, unfortunately, not the case with TD. It could be updated in the future, for now, just know that logging out will only revoke the refresh token and the access token will expires 30 minutes after its grant.

Also note that there are APIs that doesn't require log in. Generally they will return delayed data and calls are subject to lower per app limit.
``` js
// if logInRedirect is true, trying to logIn without an oAuth code will redirect the browser to TDAmeritrade's login portal
client.authentication.logIn();

// once authorized TDA will redirect back to the redirect URI, with oAuth code in query, calling logIn with the code
client.authentication.logIn('oAuth code from query');

// the client will attempt to get tokens, if there's no error, the client is logged in and will run the preconfigured afterLogIn function
// expected output: client access granted
// all APIs are accessible at this point
const testAccLog = async () => {
  const resJson = await client.accounts.getAccounts();
  console.log(resJson);
}
testAccLog();

// Calling logOut will initiate client's calls to revoke access and refresh tokens. As noted above, only the refresh token will be revoked, even though both http request will return with status 200
client.authentication.logOut();
// expected output: client access revoked
```

### Data format
All input and output scheme follows TD Ameritrade's JSON scheme, with some processing to make data types more logical. All input and output dates are expected and converted to JS Date objects. All multiple data points for one param are converted to array.

### Accounts
[Official documentation](https://developer.tdameritrade.com/account-access/apis)
``` js
// return all accounts associated with the authenticated user
const accounts = await client.accounts.getAccounts({
  fields: ['balances', 'positions', 'order']
  // balances is default, refer to TDA's documentation for more info
});

// return specific account
const account = await client.accounts.getAccount({
  fields: ['balances', 'positions', 'order']
});
```

### Orders
Due to the varieties of instrument TDA supports, the order flow can be pretty complicated. To streamline and reduce the order parameters, different instrument types will have different functions for placing order. Currently only equity is implemented.
[Official documentation](https://developer.tdameritrade.com/account-access/apis)
``` js
client.orders.placeOrderEquity({
  accountId: 'id of the account to place order with, accounts can be access with accounts.getAccounts',
  quantity: 'number of shares',
  symbol: 'symbol of stock',
  orderType: 'MARKET or LIMIT, etc.',
  price: 69, // for limit orders
  instruction: 'BUY or SELL',
});

// return orders for a specific account
clients.orders.getOrdersByPath({
  accountId: 'the account ID',
  maxResults: 13, // maximum number of orders to retrieve
  fromEnteredTime: new Date(), // specify the first date of the orders, it's 
  toEnteredTime: new Date(),
  status: 'ACCEPTED, QUEUED, etc.' // refer to official documentations for more
});

// return a specific order
clients.orders.getOrder({
  accountId: 'account ID',
  orderId: 'order ID'
});

// cancel a specific order
clients.orders.cancelOrder({
  accountId: 'account ID',
  orderId: 'order ID'
});
```

### Instruments
[Official documentation](https://developer.tdameritrade.com/instruments/apis)
``` js
// search an instrument with symbol
clients.instruments.searchInstruments({
  symbol: 'TD',
  projection: 'default set as fundamental'
  // refer to official documentation for more options
})

// search without login
clients.instruments.unauthenticated.searchInstruments({
  symbol: 'TD',
})
```

### Movers
[Official documentation](https://developer.tdameritrade.com/instruments/apis)
``` js
// return top movers for a market
clients.movers.getMovers({
  index: '$COMPX, $DJIA, or $SPX.X',
  direction: 'up or down',
  change: 'value or percent'
});

// get movers without log in
clients.movers.unauthenticated.getMovers({ index, direction, change });
```

### Option Chains
[Official documentation](https://developer.tdameritrade.com/option-chains/apis)
``` js
// return option chains for a symbol
clients.optionChains.getOptionChain({
  symbol,
  contractType,
  strikeCount,
  includeQuotes,
  strategy,
  interval,
  strike,
  range,
  fromDate,
  toDate,
  volatility,
  underlyingPrice,
  interestRate,
  daysToExpiration,
  expMonth,
  optionType,
});

// without log in
clients.optionChains.unauthenticated.getOptionChain();
```

### Price History
[Official documentation](https://developer.tdameritrade.com/price-history/apis)
``` js
// return price history for a symbol
clients.priceHistory.getPriceHistory({
  symbol,
  periodType,
  period,
  frequencyType,
  frequency,
  endDate,
  startDate,
  needExtendedHoursData,
});

// without log in
clients.priceHistory.unauthenticated.getPriceHistory();
```

### Transaction History
[Official documentation](https://developer.tdameritrade.com/transaction-history/apis)
``` js
// return transactions for a specific account
clients.transactionHistory.getTransactions({
  type,
  symbol,
  startDate,
  endDate,
  accountId
});

// return specific transactions
clients.transactionHistory.getTransaction({
  accountId,
  transactionId
});
```
