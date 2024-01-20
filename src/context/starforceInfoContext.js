import { createContext, useState, useContext } from 'react';

// 1. Context 생성
const StarforceContext = createContext();

// 2. Context Provider 생성
export function StarforceProvider({ children }) {
  const [starforceInfoArray, setStarforceInfoArray] = useState([]);

  return (
    <StarforceContext.Provider
      value={{
        starforceInfoArray,
        setStarforceInfoArray,
      }}
    >
      {children}
    </StarforceContext.Provider>
  );
}

export function useStarforceInfoArray() {
  const { starforceInfoArray, setStarforceInfoArray } =
    useContext(StarforceContext);
  return [starforceInfoArray, setStarforceInfoArray];
}
