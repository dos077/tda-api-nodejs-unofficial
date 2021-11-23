export default async ({
  type,
  symbol,
  startDate,
  endDate,
  accountId,
  getAccessToken,
}) => {
  const accessToken = await getAccessToken();
  const url = new URL(
    `https://api.tdameritrade.com/v1/accounts/${accountId}/transactions`
  );
  if (type) url.searchParams.append('type', type);
  if (symbol) url.searchParams.append('symbol', symbol);
  if (startDate)
    url.searchParams.append('startDate', startDate.toISOString().slice(0, 10));
  if (endDate)
    url.searchParams.append('endDate', endDate.toISOString().slice(0, 10));
  const options = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };
  const res = await fetch(url, options);
  if (res.status !== 200) throw Error(res);
  return await res.json();
};
