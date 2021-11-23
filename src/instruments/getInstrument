export default async ({ cusip, getAccessToken, clientId }) => {
  const url = new URL(`https://api.tdameritrade.com/v1/instruments/${cusip}`);
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
  if (res.status !== 200) throw Error(res);
  return await res.json();
};
