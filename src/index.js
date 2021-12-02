import Authentication from './auth';
import Orders from './orders';
import Accounts from './acc';
import Instruments from './instruments';
import Movers from './movers';
import OptionChains from './optionChains';
import PriceHistory from './priceHistory';
import Quotes from './quotes';
import TransactionHistory from './transactionHistory';

const defaultConfig = {
  clientId: null,
  redirectUri: null,
  storeAuth: false,
  logInRedirect: false,
};

export default ({
  clientId = defaultConfig.clientId,
  redirectUri = defaultConfig.redirectUri,
  storeAuth = defaultConfig.storeAuth,
  logInRedirect = defaultConfig.logInRedirect,
  afterLogIn,
  afterLogOut,
}) => {
  if (!clientId) throw Error('client ID required');
  const config = {
    clientId,
    redirectUri,
    storeAuth,
    logInRedirect,
    afterLogIn,
    afterLogOut,
  };
  const authentication = Authentication(config);
  const orders = Orders({ config, authentication });
  const accounts = Accounts({ config, authentication });
  const quotes = Quotes({ authentication, config });
  const instruments = Instruments({ authentication, config });
  const movers = Movers({ authentication, config });
  const optionChains = OptionChains({ authentication, config });
  const priceHistory = PriceHistory({ authentication, config });
  const transactionHistory = TransactionHistory({ authentication, config });
  return {
    authentication,
    orders,
    accounts,
    quotes,
    instruments,
    movers,
    priceHistory,
    optionChains,
    transactionHistory,
  };
};
