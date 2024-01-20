import { createContext, useState, useContext } from 'react';

// 1. Context 생성
const UserInfoContext = createContext();

// 2. Context Provider 생성
export function UserInfoProvider({ children }) {
  const [userInfo, setUserInfo] = useState({});

  return (
    <UserInfoContext.Provider
      value={{
        userInfo,
        setUserInfo,
      }}
    >
      {children}
    </UserInfoContext.Provider>
  );
}

export function useUserInfo() {
  const { userInfo, setUserInfo } = useContext(UserInfoContext);
  return [userInfo, setUserInfo];
}
