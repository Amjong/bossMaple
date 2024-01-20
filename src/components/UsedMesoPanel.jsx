import React from 'react';
import { useStarforceInfoArray } from '../context/starforceInfoContext';
import { calculateCostForEachItemsFromArray } from '../util/starforceUtility';

export default function UsedMesoPanel() {
  const [starforceInfoArray] = useStarforceInfoArray();
  return (
    <div>
      {starforceInfoArray.length !== 0 &&
        Array.from(calculateCostForEachItemsFromArray(starforceInfoArray)).map(
          (element) => {
            return (
              <div>
                <p>아이템 이름 : {element[0]}</p>
                <p>사용 메소량 : {element[1]}</p>
              </div>
            );
          }
        )}
    </div>
  );
}
