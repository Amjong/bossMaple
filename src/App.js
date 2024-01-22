import './App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Root from './components/page/Root';
import Error from './components/page/Error';

const router = createBrowserRouter([
  {
    path: '/bossMaple',
    basename: '/bossMaple',
    element: <Root />,
    errorElement: <Error />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
