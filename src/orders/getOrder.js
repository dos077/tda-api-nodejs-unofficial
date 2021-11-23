export default async ({ accountId, orderId, getAccessToken }) => {
  const accessToken = await getAccessToken();
  const url = new URL(
    `https://api.tdameritrade.com/v1/accounts/${accountId}/orders/${orderId}`
  );
  const options = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };
  const res = await fetch(url, options);
  if (res.status === 200) return await res.json();
  else throw Error(res);
};
