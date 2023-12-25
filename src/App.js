import './App.css';
import InputBar from './components/InputBar';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className='flex flex-col'>
        <header className='bg-gray-200 text-red-200 text-3xl font-bold text-center'>
          BossMaple
        </header>
        <section className='bg-black h-screen flex flex-col'>
          <div className='text-center m-auto'>
            <InputBar></InputBar>
          </div>
        </section>
      </div>
    </QueryClientProvider>
  );
}

export default App;
