export default async ({
  symbol,
  getAccessToken,
  clientId,
  projection = 'fundamental',
}) => {
  const url = new URL(`https://api.tdameritrade.com/v1/instruments`);
  url.searchParams.append('apikey', clientId);
  url.searchParams.append('symbol', symbol);
  url.searchParams.append('projection', projection);
  const accessToken = getAccessToken ? await getAccessToken() : null;
  const options = accessToken
    ? {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    : {};
  const res = await fetch(url, options);
  if (res.status !== 200) throw Error(res);
  else return (await res.json())[symbol];
};
