import searchInstruments from './searchInstruments';

const parseDate = (res) => {
  const { fundamental } = res;
  if (fundamental.dividendPayDate)
    fundamental.dividendPayDate = new Date(fundamental.dividendPayDate);
  return {
    ...res,
    fundamental,
  };
};

export default ({ authentication, config }) => {
  const { getAccessToken } = authentication;

  const search = async (params) =>
    parseDate(
      await searchInstruments({ ...params, ...config, getAccessToken })
    );

  const unAuthSearch = async (params) =>
    parseDate(await searchInstruments({ ...params, ...config }));

  return {
    searchInstruments: search,
    unauthenticated: { searchInstruments: unAuthSearch },
  };
};
