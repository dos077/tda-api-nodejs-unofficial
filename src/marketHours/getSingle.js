export default async ({ market, date, getAccessToken, clientId }) => {
  const accessToken = await getAccessToken();
  const url = new URL(
    `https://api.tdameritrade.com/v1/marketdata/${market}/hours`
  );
  url.searchParams.append('clientId', clientId);
  url.searchParams.append('date', date);
  const options = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };
  const res = await fetch(url, options);
  if (res.status !== 200) throw Error(res);
  return await res.json();
};
