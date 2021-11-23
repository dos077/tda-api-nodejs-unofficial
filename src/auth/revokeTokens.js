const revokeAccess = async ({ accessToken, clientId }) => {
  const url = new URL('https://api.tdameritrade.com/v1/oauth2/revoke');
  const data = new URLSearchParams();
  data.append('token', `Bearer ${accessToken}`);
  data.append('client_id', clientId);
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: data,
  };
  const res = await fetch(url, options);
  const statusCode = res.status || 0;
  if (statusCode !== 200) {
    const json = await res.json();
    throw Error(res.status, json);
  }
};

const revokeRefresh = async ({ refreshToken, clientId }) => {
  const url = new URL('https://api.tdameritrade.com/v1/oauth2/revoke');
  const data = new URLSearchParams();
  data.append('token', refreshToken);
  data.append('client_id', clientId);
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: data,
  };
  const res = await fetch(url, options);
  const statusCode = res.status || 0;
  if (statusCode !== 200) {
    const json = await res.json();
    throw Error(res.status, json);
  }
};

export default async ({ accessToken, refreshToken, clientId }) => {
  await revokeAccess({ accessToken, refreshToken, clientId });
  await revokeRefresh({ refreshToken, clientId });
};
