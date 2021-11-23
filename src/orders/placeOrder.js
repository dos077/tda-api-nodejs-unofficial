const equity = async ({
  accountId,
  quantity,
  symbol,
  orderType,
  price,
  instruction,
  getAccessToken,
}) => {
  const accessToken = await getAccessToken();
  const url = new URL(
    `https://api.tdameritrade.com/v1/accounts/${accountId}/orders`
  );
  const data = {
    orderType: orderType,
    session: 'NORMAL',
    duration: 'DAY',
    orderStrategyType: 'SINGLE',
    orderLegCollection: [
      {
        instruction: instruction,
        quantity: quantity,
        instrument: {
          symbol: symbol,
          assetType: 'EQUITY',
        },
      },
    ],
  };
  if (price) data['price'] = price;
  const options = {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  };
  const res = await fetch(url, options);
  if (res.status == 201) {
    return true;
  } else throw Error(res);
};

export default { equity };
