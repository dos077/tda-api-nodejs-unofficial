import getAccounts from './getAccounts';
import getById from './getById.js';

export default ({ authentication }) => {
  const { getAccessToken } = authentication;

  const get = async (params) => {
    return await getById({ ...params, getAccessToken });
  };

  const gets = async (params) => {
    return await getAccounts({ params, getAccessToken });
  };

  return { getAccounts: gets, getAccount: get };
};
