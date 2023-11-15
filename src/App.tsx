import { ReactNode } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import MainLayout from './ui/MainLayout';

function App(): ReactNode {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
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
            element={<div>/users</div>}
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
            element={<div>/accounts</div>}
          />
        </Route>
        <Route
          path="signin"
          element={<div>/signin</div>}
        />
        <Route
          path="signup"
          element={<div>/signup</div>}
        />
        <Route
          path="*"
          element={<div>/pageNotFound</div>}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
