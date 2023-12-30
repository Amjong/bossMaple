const openApiBaseUrl = 'https://open.api.nexon.com';

const getStarForceUrl = (count, date, cursor) => {
  if (date && cursor) {
    console.log('date and cursor cannot exist both');
    return undefined;
  }
  let starForceUrl = openApiBaseUrl + '?';
  starForceUrl += `count=${count}`;
  if (date) {
    starForceUrl += `&date=${date}`;
  }
  if (cursor) {
    starForceUrl += `$cursor=${cursor}`;
  }
  return starForceUrl;
};

module.exports = {
  getStarForceUrl,
};
