// import useStarforceQuery from '../service/hooks/useStarforceQuery';

import { useCallback, useState } from 'react';
import {
  calculateCostForEachItemsFromArray,
  getStarForceInfo,
  getStarforceResultInfo,
} from '../util/starforceUtility';
import InputBar from './InputBar';

// let userInfo = {
//   apikey: '',
//   date: '',
// };
export default function StarforceInfo() {
  // const { data } = useStarforceQuery(10, '2023-12-27');
  const [userInfo, setUserInfo] = useState({});
  const [starforceInfoArray, setStarforceInfoArray] = useState([]);
  const handleSubmit = useCallback((event, value) => {
    event.preventDefault();
    const targetId = event.target.id;
    const targetValue = event.target[0].value;
    console.log(targetValue);
    console.log(targetId);
    setUserInfo((prev) => ({
      ...prev,
      [targetId]: targetValue,
    }));
  }, []);
  const handleClick = async () => {
    const receivedArray = await getStarForceInfo(
      userInfo.apikey,
      userInfo.date
    );
    console.log(receivedArray);
    setStarforceInfoArray(() => {
      return Array.from(receivedArray);
    });
  };
  return (
    <div>
      <div className='text-white text-3xl'>스타포스 정보!</div>
      <div>
        <p>API KEY 입력</p>
        <InputBar id='apikey' handleSubmit={handleSubmit} />
        <p>DATE 입력</p>
        <InputBar id='date' handleSubmit={handleSubmit} />
      </div>
      <button onClick={handleClick}>Do it!</button>
      {/* <div className='text-white text-3xl'>{JSON.stringify(data)}</div> */}
      <div className='border-2 border-solid border-black'>
        <p>아이템 별 사용 메소량!</p>
        {starforceInfoArray.length !== 0 &&
          Array.from(
            calculateCostForEachItemsFromArray(starforceInfoArray)
          ).map((element) => {
            return (
              <div>
                <p>아이템 이름 : {element[0]}</p>
                <p>사용 메소량 : {element[1]}</p>
              </div>
            );
          })}
      </div>
      <div className='border-2 border-solid border-black'>
        <p>구간 별 성공률!</p>
        {starforceInfoArray.length !== 0 &&
          getStarforceResultInfo(starforceInfoArray).map((element, index) => {
            return (
              <div>
                <p className='text-bold'>
                  {index} {' -> '} {index + 1}
                </p>
                <p>시도 횟수 : {element[0] + element[1]}</p>
                <p>성공 횟수 : {element[0]}</p>
                <p>실패 횟수 : {element[1]}</p>
                <p>
                  성공 확률 :
                  {((element[0] / (element[0] + element[1])) * 100).toFixed(1)}%
                </p>
              </div>
            );
          })}
      </div>
    </div>
  );
}
