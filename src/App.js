import './App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Root from './components/page/Root';
import Error from './components/page/Error';
import Guide from './components/page/Guide';
import Home from './components/page/Home';

const router = createBrowserRouter([
  {
    path: '/bossMaple',
    basename: '/bossMaple',
    element: <Root />,
    children: [
      {
        index: true,
        element: <Home></Home>,
      },
      {
        path: '/bossMaple/guide',
        element: <Guide />,
      },
    ],
    errorElement: <Error />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
