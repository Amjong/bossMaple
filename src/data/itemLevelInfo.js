let itemLevelTable = {};

itemLevelTable['응축된 힘의 결정석'] = 110;
itemLevelTable['레드 아처 마이스터 심볼'] = 100;
itemLevelTable['몽환의 벨트'] = 200;
itemLevelTable['트릭스터 던위치팬츠'] = 150;
itemLevelTable['펜살리르 배틀메일'] = 140;

const getItemLevelFromTable = (name) => {
  return itemLevelTable[name];
};

module.exports = {
  getItemLevelFromTable,
};
