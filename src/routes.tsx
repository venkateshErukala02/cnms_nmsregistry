import { memo } from "react";
import {
  HashRouter,
  Routes,
  Route,
} from "react-router-dom";

import DashboardPage from "./pages/nmsregistrydashboard";

export const AppRouter = memo(() => {
  return (
    <HashRouter>
      <Routes>
        <Route
          path="/"
          element={<DashboardPage />}
        />
      </Routes>
    </HashRouter>
  );
});