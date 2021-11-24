export default async ({ fields, getAccessToken }) => {
  const accessToken = await getAccessToken();
  const url = new URL('https://api.tdameritrade.com/v1/accounts');
  if (fields) url.searchParams.append('fields', fields.join(','));
  const options = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };
  const res = await fetch(url, options);
  if (res.status === 200) return await res.json();
  else throw Error(res);
};
