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

const getCharacterStatUrl = (ocid, date) => {
  const characterStatBaseUrl = '/maplestory/v1/character/stat';
  if (!ocid || !date) {
    console.log('ocid and date is required');
    return undefined;
  }
  let characterStatUrl = openApiBaseUrl + characterStatBaseUrl + '?';
  characterStatUrl += `&ocid=${ocid}`;
  characterStatUrl += `&date=${date}`;
  return characterStatUrl;
};

const getOcidUrl = (nickname) => {
  const ocidBaseUrl = '/maplestory/v1/id';
  if (!nickname) {
    console.log('nickname is required');
    return undefined;
  }
  let ocidUrl = openApiBaseUrl + ocidBaseUrl + '?';
  ocidUrl += `&character_name=${nickname}`;
  console.log(ocidUrl);
  return ocidUrl;
};

const getOcidFromNickname = async (nickname) => {
  const response = await fetch(getOcidUrl(nickname), {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'x-nxopen-api-key': process.env.REACT_APP_MAPLE_API_KEY,
    },
  });

  if (!response.ok) {
    throw new Error(`Network response was not ok: ${response.statusText}`);
  }

  return response.json();
};

module.exports = {
  getStarForceUrl,
  getCharacterStatUrl,
  getOcidUrl,
  getOcidFromNickname,
};
