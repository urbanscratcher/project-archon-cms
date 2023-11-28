import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ReactNode } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import AppLayout from './layouts/AppLayout';
import { SignLayout } from './layouts/SignLayout';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Topics from './pages/Topics';
import Users from './pages/Users';
import ProtectedRoute from './ui/ProtectedRoute';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      // refetchInterval: 5 * 60 * 1000,
    },
  },
});

function App(): ReactNode {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <BrowserRouter>
        <Routes>
          <Route
            element={
              <ProtectedRoute>
                <AppLayout />
              </ProtectedRoute>
            }
          >
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
              element={<Topics />}
            />
            <Route
              path="insights"
              element={<div>/insights</div>}
            />
            <Route
              path="profile"
              element={<div>/profile</div>}
            />
          </Route>
          <Route element={<SignLayout />}>
            <Route
              path="signin"
              element={<SignIn />}
            />
            <Route
              path="signup"
              element={<SignUp />}
            />
          </Route>
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
