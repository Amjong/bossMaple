import { createContext, useState, useContext } from 'react';

// 1. Context 생성
const LoadingContext = createContext();

// 2. Context Provider 생성
export function LoadingProvider({ children }) {
  const [isloading, setIsLoading] = useState(false);

  return (
    <LoadingContext.Provider
      value={{
        isloading,
        setIsLoading,
      }}
    >
      {children}
    </LoadingContext.Provider>
  );
}

export function useLoading() {
  const { isloading, setIsLoading } = useContext(LoadingContext);
  return [isloading, setIsLoading];
}
