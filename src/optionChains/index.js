import getOptionChain from './getOptionChain';

const parseDates = (entry) => {
  entry.tradeTime = new Date(entry.tradeTimeInLong);
  entry.quoteTime = new Date(entry.quoteTimeInLong);
  if (entry.tradeDate) entry.tradeDate = new Date(entry.tradeDate);
  entry.expirationDate = new Date(entry.expirationDate);
  entry.lastTradingDay = new Date(entry.lastTradingDay);
};

const parseRes = (res) => {
  Object.keys(res.putExpDateMap).forEach((dateKey) => {
    Object.keys(res.putExpDateMap[dateKey]).forEach((priceKey) => {
      res.putExpDateMap[dateKey][priceKey].forEach((entry) => {
        parseDates(entry);
      });
    });
  });
  Object.keys(res.callExpDateMap).forEach((dateKey) => {
    Object.keys(res.callExpDateMap[dateKey]).forEach((priceKey) => {
      res.callExpDateMap[dateKey][priceKey].forEach((entry) => {
        parseDates(entry);
      });
    });
  });
  return res;
};

export default ({ authentication, config }) => {
  const { getAccessToken } = authentication;

  const get = async (params) => {
    return parseRes(
      await getOptionChain({ ...params, getAccessToken, ...config })
    );
  };

  const unAuthGet = async (params) =>
    parseRes(await getOptionChain({ ...params, ...config }));

  return {
    getOptionChain: get,
    unauthenticated: {
      getOptionChain: unAuthGet,
    },
  };
};
