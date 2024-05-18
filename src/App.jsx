import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import AddThread from './pages/AddThread';
import DetailPage from './pages/DetailPage';
import Homepage from './pages/Homepage';
import Leaderboards from './pages/Leaderboards';
import Login from './pages/Login';
import NotFound from './components/NotFound';
import Register from './pages/Register';
import RequireAuth from './layout/RequireAuth';
import Layout from './layout/Layout';

const queryClient = new QueryClient();

const routes = createRoutesFromElements(
  <Route path="/" element={<Layout />} errorElement={<NotFound />}>
    <Route path="login" element={<Login />} />
    <Route path="register" element={<Register />} />
    <Route element={<RequireAuth />}>
      <Route index element={<Homepage />} />
      <Route path="thread/:id" element={<DetailPage />} />
      <Route path="add" element={<AddThread />} />
      <Route path="leaderboards" element={<Leaderboards />} />
    </Route>
  </Route>,
);

const router = createBrowserRouter(routes);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
