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

const getSuccessRate = (starforceCount) => {
  if (starforceCount < 3) {
    return (95 - 5 * starforceCount) / 100;
  } else if (starforceCount < 15) {
    return (100 - 5 * starforceCount) / 100;
  } else if (starforceCount < 23) {
    return 30 / 100;
  } else if (starforceCount < 24) {
    return 3 / 100;
  } else if (starforceCount < 25) {
    return 2 / 100;
  } else return 1 / 100;
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
      throw new Error(response.status);
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
  const startDate = new Date(startDateString);
  const endDate = new Date(endDateString);
  if (startDate > endDate) {
    alert('시작 날짜는 종료 날짜보다 빠를 수 없습니다. 다시 시도해주세요!');
    return;
  }

  let starforceHistoryArray = [];

  while (startDate <= endDate) {
    const currentDateArray = await getStarForceInfo(
      apikey,
      startDate.toISOString().slice(0, 10)
    );
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

  finalCost *= 1 - totalDiscountRate / 100;
  return Math.round(finalCost / 10) * 10;
};

const calculateCostForEachItemsFromArray = (starforceInfoArray) => {
  let itemsAndCost = new Map();

  starforceInfoArray.forEach((element) => {
    let currentCost = 0;
    let itemLevel = getItemLevelFromTable(element.target_item);
    if (itemLevel === undefined) {
      return;
    }
    let originalCost = calculateCost(itemLevel, element.before_starforce_count);

    currentCost = applyStarforceEventList(
      element.starforce_event_list,
      originalCost
    );

    if (element.destroy_defence === '파괴 방지 적용') {
      currentCost += originalCost;
    }

    let currentKey = [
      element.target_item,
      `${element.world_name}/${element.character_name}`,
    ].join('|');

    if (!itemsAndCost.has(currentKey)) {
      itemsAndCost.set(currentKey, currentCost);
    } else {
      const currentCostofItem = itemsAndCost.get(currentKey);
      itemsAndCost.set(currentKey, currentCostofItem + currentCost);
    }
  });

  return itemsAndCost;
};

const getStarforceResultInfo = (starforceInfoArray) => {
  let starforceResultInfo = Array.from({ length: 25 }, () => Array(6).fill(0));

  starforceInfoArray.forEach((element) => {
    // Calculate starcatch result (trial count)
    if (element.starcatch_result === '성공') {
      starforceResultInfo[element.before_starforce_count][0]++;
    } else {
      starforceResultInfo[element.before_starforce_count][1]++;
    }

    // Calculate starforce result (success, failure, destroy)
    if (element.item_upgrade_result === '성공') {
      starforceResultInfo[element.before_starforce_count][2]++;
    } else if (element.item_upgrade_result === '파괴') {
      starforceResultInfo[element.before_starforce_count][4]++;
    } else {
      starforceResultInfo[element.before_starforce_count][3]++;
    }
  });

  // Calculate starcatch result (average)
  starforceResultInfo.forEach((element, index) => {
    let successRate = getSuccessRate(index);
    let starcatchSuccessRate = successRate * 1.05;
    element[5] = (
      element[0] * starcatchSuccessRate +
      element[1] * successRate
    ).toFixed(2);
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
