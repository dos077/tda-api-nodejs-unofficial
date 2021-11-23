export default async ({
  symbol,
  periodType,
  period,
  frequencyType,
  frequency,
  endDate,
  startDate,
  needExtendedHoursData,
  getAccessToken,
  clientId,
}) => {
  const url = new URL(
    `https://api.tdameritrade.com/v1/marketdata/${symbol}/pricehistory`
  );
  url.searchParams.append('apikey', clientId);
  if (periodType) url.searchParams.append('periodType', periodType);
  if (period) url.searchParams.append('period', period);
  if (frequencyType) url.searchParams.append('frequencyType', frequencyType);
  if (frequency) url.searchParams.append('frequency', frequency);
  if (endDate) url.searchParams.append('endDate', endDate.getTime());
  if (startDate) url.searchParams.append('startDate', startDate.getTime());
  url.searchParams.append(
    'needExtendedHoursData',
    needExtendedHoursData ? true : false
  );
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
  return (await res.json()).candles;
};
