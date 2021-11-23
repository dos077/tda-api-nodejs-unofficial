export default async ({ accountId, transactionId, getAccessToken }) => {
  const accessToken = await getAccessToken();
  const url = new URL(
    `https://api.tdameritrade.com/v1/accounts/${accountId}/transactions/${transactionId}`
  );
  const options = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };
  const res = await fetch(url, options);
  if (res.status !== 200) throw Error(res);
  return await res.json();
};
