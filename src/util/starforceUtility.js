const { getStarForceUrl } = require('./openApiManager');

/* TODO : Save static table for each level&starforceCount to optimizing */
const calculateCost = (Itemlevel, starforceCount) => {
  let finalCost = 1000;
  if (starforceCount >= 25 || starforceCount < 0) {
    console.log('Invalid starforceCount (' + starforceCount + ')');
    return 0;
  }

  if (starforceCount < 10) {
    finalCost += (Itemlevel ** 3 * (starforceCount + 1)) / 25;
  } else {
    finalCost += Itemlevel ** 3 * (starforceCount + 1) ** 2.7;
    if (starforceCount < 11) {
      finalCost /= 400;
    } else if (starforceCount < 12) {
      finalCost /= 220;
    } else if (starforceCount < 13) {
      finalCost /= 150;
    } else if (starforceCount < 14) {
      finalCost /= 110;
    } else if (starforceCount < 15) {
      finalCost /= 75;
    } else {
      finalCost /= 200;
    }
  }

  return Math.round(finalCost / 10) * 10;
};

const getStarForceInfo = async (apikey, dateString) => {
  let cursor = undefined;
  let starforceHistoryArray = [];
  while (true) {
    let date = cursor ? undefined : dateString;
    const response = await fetch(getStarForceUrl(50, date, cursor), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-nxopen-api-key': apikey,
      },
    });

    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.statusText}`);
    }

    const finalResponse = await response.json();
    console.log(finalResponse);
    finalResponse.starforce_history.forEach((element) => {
      starforceHistoryArray.push(element);
    });
    if (finalResponse.next_cursor) {
      cursor = finalResponse.next_cursor;
      continue;
    } else {
      return starforceHistoryArray;
    }
  }
};

module.exports = {
  calculateCost,
  getStarForceInfo,
};
