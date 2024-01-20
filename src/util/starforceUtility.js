const { getItemLevelFromTable } = require('../data/itemLevelInfo');
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
    const response = await fetch(getStarForceUrl(102, date, cursor), {
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

const getStarForceInfoByDate = async (
  apikey,
  startDateString,
  endDateString
) => {
  console.log(startDateString);
  console.log(endDateString);
  const startDate = new Date(startDateString);
  const endDate = new Date(endDateString);
  if (startDate > endDate) {
    throw new Error('startDate should be earlier than endDate');
  }

  console.log('api key : ' + apikey);
  console.log('startDate : ' + startDate);
  console.log('endDate : ' + endDate);

  let starforceHistoryArray = [];

  while (startDate <= endDate) {
    console.log(`calculating ${startDate.toISOString().slice(0, 10)}....`);
    const currentDateArray = await getStarForceInfo(
      apikey,
      startDate.toISOString().slice(0, 10)
    );
    console.log(currentDateArray);
    starforceHistoryArray = starforceHistoryArray.concat(currentDateArray);
    // TODO : exception handling
    startDate.setDate(startDate.getDate() + 1);
  }

  return starforceHistoryArray;
};

const applyStarforceEventList = (eventListArray, currentCost) => {
  if (!eventListArray) {
    return currentCost;
  }

  let totalDiscountRate = 0;
  let finalCost = currentCost;

  eventListArray.forEach((element) => {
    if (element.cost_discount_rate !== 'null') {
      totalDiscountRate += parseInt(element.cost_discount_rate);
    }
  });

  console.log(totalDiscountRate);

  console.log(currentCost);

  finalCost *= 1 - totalDiscountRate / 100;
  console.log(finalCost);
  return Math.round(finalCost / 10) * 10;
};

const calculateCostForEachItemsFromArray = (starforceInfoArray) => {
  let itemsAndCost = new Map();

  starforceInfoArray.forEach((element) => {
    let currentCost = 0;
    let originalCost = calculateCost(
      getItemLevelFromTable(element.target_item),
      element.before_starforce_count
    );

    currentCost = applyStarforceEventList(
      element.starforce_event_list,
      originalCost
    );

    if (element.destroy_defence === '파괴 방지 적용') {
      currentCost += originalCost;
    }

    if (!itemsAndCost.has(element.target_item)) {
      itemsAndCost.set(element.target_item, currentCost);
      console.log(`${element.target_item} : ${currentCost}`);
    } else {
      const currentCostofItem = itemsAndCost.get(element.target_item);
      itemsAndCost.set(element.target_item, currentCostofItem + currentCost);
      console.log(
        `${element.target_item} : ${currentCostofItem + currentCost}`
      );
    }
  });

  return itemsAndCost;
};

const getStarforceResultInfo = (starforceInfoArray) => {
  let starforceResultInfo = Array.from({ length: 25 }, () => Array(2).fill(0));

  starforceInfoArray.forEach((element) => {
    if (element.item_upgrade_result === '성공') {
      starforceResultInfo[element.before_starforce_count][0]++;
    } else {
      starforceResultInfo[element.before_starforce_count][1]++;
    }
  });

  return starforceResultInfo;
};

const getStarforceProgressInfo = (starforceInfoArray) => {
  let itemsAndProgressInfo = new Map();

  starforceInfoArray.forEach((element) => {
    if (!itemsAndProgressInfo.has(element.target_item)) {
      let firstArray = [
        element.after_starforce_count,
        element.before_starforce_count,
      ];
      itemsAndProgressInfo.set(element.target_item, firstArray);
    } else {
      let progressInfoArray = itemsAndProgressInfo.get(element.target_item);
      itemsAndProgressInfo.set(element.target_item, [
        ...progressInfoArray,
        element.after_starforce_count,
      ]);
    }
  });

  return itemsAndProgressInfo;
};

module.exports = {
  calculateCost,
  getStarForceInfo,
  calculateCostForEachItemsFromArray,
  getStarforceResultInfo,
  getStarforceProgressInfo,
  getStarForceInfoByDate,
};
