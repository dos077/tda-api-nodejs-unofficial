export default async ({
  index,
  direction,
  change,
  getAccessToken,
  clientId,
}) => {
  const url = new URL(
    `https://api.tdameritrade.com/v1/marketdata/${index}/movers`
  );
  url.searchParams.append('apikey', clientId);
  url.searchParams.append('direction', direction);
  url.searchParams.append('change', change);
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
