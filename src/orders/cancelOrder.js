export default async ({ accountId, orderId, getAccessToken }) => {
  const accessToken = await getAccessToken();
  const url = new URL(
    `https://api.tdameritrade.com/v1/accounts/${accountId}/orders/${orderId}`
  );
  const options = {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };
  const res = await fetch(url, options);
  if (!(res.status === 200 || res.status === 201)) {
    console.error(res);
    throw Error('cancelling order error');
  }
};
