import getTransaction from './getTransaction';
import getTransactions from './getTransactions';

const parseDates = (res) => {
  const settlementDate = new Date(res.settlementDate);
  const transactionDate = new Date(res.transactionDate);
  const orderDate = new Date(res.orderDate);
  const transactionItem = res.transactionItem;
  if (transactionItem && transactionItem.instrument) {
    const { optionExpirationDate, bondMaturityDate } =
      transactionItem.instrument;
    if (optionExpirationDate)
      transactionItem.instrument.optionExpirationDate = new Date(
        optionExpirationDate
      );
    if (bondMaturityDate)
      transactionItem.instrument.bondMaturityDate = new Date(bondMaturityDate);
  }
  return {
    ...res,
    settlementDate,
    transactionDate,
    orderDate,
    transactionItem: { ...transactionItem },
  };
};

export default ({ authentication }) => {
  const { getAccessToken } = authentication;

  const get = async (params) => {
    return parseDates(await getTransaction({ ...params, getAccessToken }));
  };

  const gets = async (params) => {
    return (await getTransactions({ ...params, getAccessToken })).map((res) =>
      parseDates(res)
    );
  };

  return { getTransaction: get, getTransactions: gets };
};
