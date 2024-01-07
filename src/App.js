import './App.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import Error from './components/Error';
import Loading from './components/Loading';
import CharacterInfo from './components/CharacterInfo';
import StarforceInfo from './components/StarforceInfo';
import CharacterInputTable from './components/CharacterInputTable';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      suspense: true,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className='flex flex-col'>
        <header className='bg-gray-200 text-red-200 text-3xl font-bold text-center'>
          BossMaple
        </header>
        <section className='bg-gray-200 h-screen flex flex-col'>
          <p className='h-1/5 font-bold text-3xl text-center flex items-center justify-center'>
            캐릭터 추가
          </p>
          <div className='text-center m-auto w-1/2 h-4/5 border-solid border-black border-2'>
            {/* <ErrorBoundary fallback={<Error></Error>}>
              <Suspense fallback={<Loading></Loading>}>
                <CharacterInfo></CharacterInfo>
              </Suspense>
            </ErrorBoundary> */}
            <ErrorBoundary fallback={<Error></Error>}>
              <Suspense fallback={<Loading></Loading>}>
                <StarforceInfo></StarforceInfo>
              </Suspense>
            </ErrorBoundary>
            {/* <ErrorBoundary fallback={<Error></Error>}>
              <Suspense fallback={<Loading></Loading>}>
                <CharacterInputTable />
              </Suspense>
            </ErrorBoundary> */}
          </div>
        </section>
        <footer className='text-black text-3xl text-center'>
          Data based on NEXON Open API.
        </footer>
      </div>
    </QueryClientProvider>
  );
}

export default App;
