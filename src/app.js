import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from 'react-router-dom';

import './app.css';
import Public from './public';
import Private from './private';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<Public />} />
      <Route path="/private" element={<Private />} />
    </Route>
  )
);

function App() {
  return (
    <>
      <div className="nav">
        <a href="/">Public</a> | <a href="/private">Private</a>
      </div>
      <div>
        <RouterProvider router={router} />
      </div>
    </>
  );
}

export default App;
