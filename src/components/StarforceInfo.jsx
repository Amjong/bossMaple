// import useStarforceQuery from '../service/hooks/useStarforceQuery';

import { useCallback, useState } from 'react';
import { getStarForceInfo } from '../util/starforceUtility';
import InputBar from './InputBar';

// let userInfo = {
//   apikey: '',
//   date: '',
// };
export default function StarforceInfo() {
  // const { data } = useStarforceQuery(10, '2023-12-27');
  const [userInfo, setUserInfo] = useState({});
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
  const handleClick = async (event, value) => {
    // TODO : fetching starforceINfo
    const starforceInfoArray = await getStarForceInfo(
      userInfo.apikey,
      userInfo.date
    );
    console.log(starforceInfoArray);
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
    </div>
  );
}
