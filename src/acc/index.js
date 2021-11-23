import getAccounts from './getAccounts';
import getById from './getById.js';

export default ({ authentication }) => {
  const { getAccessToken } = authentication;

  const get = async (params) => {
    return await getById({ ...params, getAccessToken });
  };

  const gets = async () => {
    return await getAccounts({ getAccessToken });
  };

  return { getAccounts: gets, getAccount: get };
};
