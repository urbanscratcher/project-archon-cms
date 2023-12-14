import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ReactNode } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import AppLayout from './layouts/AppLayout';
import SignLayout from './layouts/SignLayout';
import Error from './pages/Error';
import Insights from './pages/Insights';
import PageNotFound from './pages/PageNotFound';
import Profile from './pages/Profile';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Topics from './pages/Topics';
import Users from './pages/Users';
import ProtectedRoute from './ui/ProtectedRoute';
import Redirect from './ui/Redirect';
import Insight from './pages/Insight';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      // refetchInterval: 5 * 60 * 1000,
      retry: 0,
    },
  },
});

function App(): ReactNode {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <ErrorBoundary fallback={<Error />}>
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
                element={<Insights />}
              />
              <Route
                path="insights/:insightIdx"
                element={<Insight />}
              />
              <Route
                path="profile"
                element={<Profile />}
              />
            </Route>
            <Route
              element={
                <Redirect>
                  <SignLayout />
                </Redirect>
              }
              errorElement={<Error />}
            >
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
              element={<PageNotFound />}
            />
            <Route
              path="error"
              element={<Error />}
            />
          </Routes>
        </BrowserRouter>
      </ErrorBoundary>
    </QueryClientProvider>
  );
}

export default App;
