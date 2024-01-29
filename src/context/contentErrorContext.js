import { createContext, useState, useContext } from 'react';

// 1. Context 생성
const ContentErrorContext = createContext();

// 2. Context Provider 생성
export function ContentErrorProvider({ children }) {
  const [errorText, setErrorText] = useState('');

  return (
    <ContentErrorContext.Provider
      value={{
        errorText,
        setErrorText,
      }}
    >
      {children}
    </ContentErrorContext.Provider>
  );
}

export function useContentError() {
  const { errorText, setErrorText } = useContext(ContentErrorContext);
  return [errorText, setErrorText];
}
