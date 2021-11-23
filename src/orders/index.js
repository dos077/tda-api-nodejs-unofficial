import placeOrder from './placeOrder';
import getOrder from './getOrder';
import getOrders from './getOrdersByPath';
import cancelOrder from './cancelOrder';
import replaceOrder from './replaceOrder';

const parseDates = (res) => {
  const { cancelTime, releaseTime, enteredTime, closeTime } = res;
  if (cancelTime)
    cancelTime.date = cancelTime.date ? new Date(cancelTime.date) : undefined;
  return {
    ...res,
    releaseTime: releaseTime ? new Date(releaseTime) : undefined,
    enteredTime: enteredTime ? new Date(enteredTime) : undefined,
    closeTime: closeTime ? new Date(closeTime) : undefined,
    cancelTime,
  };
};

export default ({ authentication }) => {
  const { getAccessToken } = authentication;

  const placeOrderEquity = async (params) => {
    return await placeOrder.equity({ ...params, getAccessToken });
  };

  const replaceOrderEquity = async (params) => {
    return await replaceOrder.equity({ ...params, getAccessToken });
  };

  const get = async (params) => {
    return parseDates(await getOrder({ ...params, getAccessToken }));
  };

  const gets = async (params) => {
    return (await getOrders({ ...params, getAccessToken })).map((order) =>
      parseDates(order)
    );
  };

  const cancel = async (params) => {
    await cancelOrder({ ...params, getAccessToken });
  };

  return {
    placeOrderEquity,
    replaceOrderEquity,
    getOrder: get,
    getOrdersByPath: gets,
    cancelOrder: cancel,
  };
};
