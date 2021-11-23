export default async ({ oAuthCode, refreshToken, clientId, redirectUri }) => {
  const url = new URL('https://api.tdameritrade.com/v1/oauth2/token');
  const data = new URLSearchParams();
  data.append('grant_type', oAuthCode ? 'authorization_code' : 'refresh_token');
  if (oAuthCode) {
    data.append('code', oAuthCode);
    data.append('access_type', 'offline');
  } else data.append('refresh_token', refreshToken);
  data.append('client_id', clientId);
  data.append('redirect_uri', redirectUri);
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: data,
  };
  const res = await fetch(url, options);
  const statusCode = res.status || 0;
  const json = await res.json();
  if (statusCode === 200) {
    return json;
  } else throw Error(res);
};
