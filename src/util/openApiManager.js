const openApiBaseUrl = 'https://open.api.nexon.com';

const getStarForceUrl = (count, date, cursor) => {
  const starForceBaseUrl = '/maplestory/v1/history/starforce';
  if (date && cursor) {
    console.log('date and cursor cannot exist both');
    return undefined;
  }
  let starForceUrl = openApiBaseUrl + starForceBaseUrl + '?';
  starForceUrl += `count=${count}`;
  if (date) {
    starForceUrl += `&date=${date}`;
  }
  if (cursor) {
    starForceUrl += `$cursor=${cursor}`;
  }
  console.log(starForceUrl);
  return starForceUrl;
};

module.exports = {
  getStarForceUrl,
};
