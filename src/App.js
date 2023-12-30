import './App.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import Error from './components/Error';
import Loading from './components/Loading';
import CharacterInfo from './components/CharacterInfo';
import StarforceInfo from './components/StarforceInfo';

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
        <section className='bg-black h-screen flex flex-col'>
          <div className='text-center m-auto'>
            <ErrorBoundary fallback={<Error></Error>}>
              <Suspense fallback={<Loading></Loading>}>
                <CharacterInfo></CharacterInfo>
              </Suspense>
            </ErrorBoundary>
            <ErrorBoundary fallback={<Error></Error>}>
              <Suspense fallback={<Loading></Loading>}>
                <StarforceInfo></StarforceInfo>
              </Suspense>
            </ErrorBoundary>
          </div>
        </section>
        <footer className='text-white text-center'>
          Data based on NEXON Open API.
        </footer>
      </div>
    </QueryClientProvider>
  );
}

export default App;
