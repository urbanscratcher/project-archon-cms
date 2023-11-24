import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ReactNode } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import SignIn from './features/authentication/SignIn';
import SignUp from './features/authentication/SignUp';
import Layout from './ui/Layout';
import Users from './features/users/Users';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // staleTime: 60 * 1000 ms
      staleTime: 0,
    },
  },
});

function App(): ReactNode {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route
              index
              element={
                <Navigate
                  replace
                  to="dashboard"
                />
              }
            />
            <Route
              path="dashboard"
              element={<div>/dashboard</div>}
            />
            <Route
              path="users"
              element={<Users />}
            />
            <Route
              path="topics"
              element={<div>/topics</div>}
            />
            <Route
              path="insights"
              element={<div>/insights</div>}
            />
            <Route
              path="covers"
              element={<div>/covers</div>}
            />
            <Route
              path="setting"
              element={<div>/settings</div>}
            />
            <Route
              path="account"
              element={<div>/account</div>}
            />
          </Route>
          <Route
            path="signin"
            element={<SignIn />}
          />
          <Route
            path="signup"
            element={<SignUp />}
          />
          <Route
            path="*"
            element={<div>/pageNotFound</div>}
          />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
