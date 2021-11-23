import getPriceHistory from './getPriceHistory';

const parseDates = (res) => {
  res.forEach((candle) => {
    candle.datetime = new Date(candle.datetime);
  });
  return res;
};

export default ({ authentication, config }) => {
  const { getAccessToken } = authentication;

  const get = async (params) => {
    return parseDates(
      await getPriceHistory({ ...params, ...config, getAccessToken })
    );
  };

  const unAuthGet = async (params) =>
    parseDates(await getPriceHistory({ ...params, ...config }));

  return {
    getPriceHistory: get,
    unauthenticated: {
      getPriceHistory: unAuthGet,
    },
  };
};
