const combatPowerKoreanName = '전투력';

const getCombatPower = (statJson) => {
  if (!Object.keys(statJson).includes('final_stat')) {
    console.log(`json do not include final_stat`);
    return undefined;
  }

  const finalStatArray = statJson.final_stat;

  let foundElement = finalStatArray.find(
    (element) => element.stat_name === combatPowerKoreanName
  );
  if (foundElement === undefined) {
    console.log(`stat_name ${combatPowerKoreanName} is not exist`);
    return undefined;
  }

  return foundElement.stat_value;
};

module.exports = {
  getCombatPower,
};
