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
        <section label='searchArea'>
          <div className='text-xl'>폰트 테스트!!! 1</div>
          <div className='text-3xl'>폰트 테스트!!! 2</div>
          <div className='bg-y1 w-10 h-10 text-y1'>색상 테스트!</div>
          <div className='bg-y2 w-10 h-10'>색상 테스트!</div>
          <div className='bg-y4 w-10 h-10'>색상 테스트!</div>
          <div className='bg-y5 w-10 h-10'>색상 테스트!</div>
          <div className='bg-r1 w-10 h-10'>색상 테스트!</div>
          <div className='bg-r2 w-10 h-10'>색상 테스트!</div>
          <div className='bg-r3 w-10 h-10'>색상 테스트!</div>
          <div className='bg-r4 w-10 h-10'>색상 테스트!</div>
        </section>
      </div>
    </QueryClientProvider>
  );
}

export default App;
