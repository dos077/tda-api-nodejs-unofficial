import getMovers from './getMovers';

export default ({ authentication, config }) => {
  const { getAccessToken } = authentication;

  const get = (params) => {
    return getMovers({ ...params, getAccessToken, ...config });
  };

  const unAuthGet = (params) => getMovers({ ...params, ...config });

  return { getMovers: get, unauthenticated: { getMovers: unAuthGet } };
};
