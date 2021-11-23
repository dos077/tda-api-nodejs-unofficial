export default async ({
  accountId,
  maxResults,
  fromEnteredTime,
  toEnteredTime,
  status,
  getAccessToken,
}) => {
  const accessToken = await getAccessToken();
  const url = new URL(
    `https://api.tdameritrade.com/v1/accounts/${accountId}/orders`
  );
  if (maxResults) url.searchParams.append('maxResults', maxResults);
  if (fromEnteredTime)
    url.searchParams.append(
      'fromEnteredTime',
      fromEnteredTime.toISOString().slice(0, 10)
    );
  if (toEnteredTime)
    url.searchParams.append(
      'toEnteredTime',
      toEnteredTime.toISOString().slice(0, 10)
    );
  if (status) url.searchParams.append('status', status);
  const options = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };
  const res = await fetch(url, options);
  if (res.status === 200) return await res.json();
  else throw Error(res);
};
