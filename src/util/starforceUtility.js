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
    // console.log(finalResponse);
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

    console.log(originalCost);

    currentCost = applyStarforceEventList(
      element.starforce_event_list,
      originalCost
    );

    console.log(currentCost);

    if (element.destroy_defence === '파괴 방지 적용') {
      currentCost += originalCost;
    }

    console.log('파방 적용 : ' + currentCost);

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

  let tempArr = [...itemsAndCost];
  tempArr.forEach((element) => {
    console.log(`${element[0]}, ${element[1]}`);
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

module.exports = {
  calculateCost,
  getStarForceInfo,
  calculateCostForEachItemsFromArray,
  getStarforceResultInfo,
};
