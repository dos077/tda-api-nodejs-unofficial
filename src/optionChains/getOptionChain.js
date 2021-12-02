export default async ({
  symbol,
  contractType,
  strikeCount,
  includeQuotes,
  strategy,
  interval,
  strike,
  range,
  fromDate,
  toDate,
  volatility,
  underlyingPrice,
  interestRate,
  daysToExpiration,
  expMonth,
  optionType,
  getAccessToken,
  clientId,
}) => {
  const url = new URL(`https://api.tdameritrade.com/v1/marketdata/chains`);
  url.searchParams.append('apikey', clientId);
  url.searchParams.append('symbol', symbol);
  if (contractType) url.searchParams.append('contractType', contractType);
  url.searchParams.append('includeQuotes', includeQuotes ? true : false);
  if (strikeCount) url.searchParams.append('strikeCount', strikeCount);
  if (strategy) url.searchParams.append('strategy', strategy);
  if (interval) url.searchParams.append('interval', interval);
  if (strike) url.searchParams.append('strike', strike);
  if (range) url.searchParams.append('range', range);
  if (fromDate) url.searchParams.append('fromDate', fromDate.toISOString());
  if (toDate) url.searchParams.append('toDate', toDate.toISOString());
  if (volatility) url.searchParams.append('volatility', volatility);
  if (underlyingPrice)
    url.searchParams.append('underlyingPrice', underlyingPrice);
  if (interestRate) url.searchParams.append('interestRate', interestRate);
  if (daysToExpiration)
    url.searchParams.append('daysToExpiration', daysToExpiration);
  if (expMonth) url.searchParams.append('expMonth', expMonth);
  if (optionType) url.searchParams.append('optionType', optionType);
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
