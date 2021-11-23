import getQuote from './getQuote';
import getQuotes from './getQuotes';

const parseDates = (res) => {
  const {
    divDate,
    quoteTimeInLong,
    tradeTimeInLong,
    regularMarketTradeTimeInLong,
  } = res;
  return {
    ...res,
    divDate: divDate ? new Date(divDate) : undefined,
    quoteTime: new Date(quoteTimeInLong),
    tradeTime: new Date(tradeTimeInLong),
    regularMarketTradeTime: new Date(regularMarketTradeTimeInLong),
  };
};

export default ({ authentication, config }) => {
  const { getAccessToken } = authentication;

  const get = async (params) => {
    return parseDates(await getQuote({ ...params, getAccessToken, ...config }));
  };

  const gets = async (params) => {
    return (await getQuotes({ ...params, getAccessToken, ...config })).map(
      (data) => parseDates(data)
    );
  };

  const unAuthGet = async (params) =>
    parseDates(await getQuote({ ...params, ...config }));

  const unAuthGets = async (params) => {
    const resJson = await getQuotes({ ...params, ...config });
    const arr = [];
    Object.keys(resJson).forEach((key) => {
      arr.push(parseDates(resJson[key]));
    });
    return arr;
  };

  return {
    getQuote: get,
    getQuotes: gets,
    unauthenticated: {
      getQuote: unAuthGet,
      getQuotes: unAuthGets,
    },
  };
};
