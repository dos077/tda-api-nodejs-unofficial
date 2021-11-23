export default async ({ symbols, getAccessToken, clientId }) => {
  const url = new URL(`https://api.tdameritrade.com/v1/marketdata/quotes`);
  url.searchParams.append('symbol', symbols.join(','));
  url.searchParams.append('apikey', clientId);
  const accessToken = getAccessToken ? await getAccessToken() : null;
  const options = accessToken
    ? {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    : {};
  const res = await fetch(url, options);
  if (res.status !== 200) {
    console.error(res);
    throw Error(await res.json());
  }
  return await res.json();
};
