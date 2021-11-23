export default async ({ symbol, getAccessToken, clientId }) => {
  const accessToken = getAccessToken ? await getAccessToken() : null;
  const url = new URL(
    `https://api.tdameritrade.com/v1/marketdata/${symbol}/quotes`
  );
  url.searchParams.append('apikey', clientId);
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
  return (await res.json())[symbol];
};
