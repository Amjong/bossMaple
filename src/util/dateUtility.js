const getCurrentDateString = (dayOffset) => {
  const currentDate = new Date();

  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1 해주고 두 자리로 패딩
  const day = String(currentDate.getDate() + dayOffset).padStart(2, '0'); // 두 자리로 패딩

  const formattedDate = `${year}-${month}-${day}`;
  return formattedDate;
};

module.exports = {
  getCurrentDateString,
};
