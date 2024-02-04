import './App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Root from './components/page/Root';
import Error from './components/page/Error';
import Guide from './components/page/Guide';
import Home from './components/page/Home';

const router = createBrowserRouter([
  {
    path: '/',
    basename: '/',
    element: <Root />,
    children: [
      {
        index: true,
        element: <Home></Home>,
      },
      {
        path: '/guide',
        element: <Guide />,
      },
    ],
    errorElement: <Error />,
  },
]);

function App() {
  return (
    <div className=''>
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
