import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import NotFoundPage from "./pages/404";
import LoginPage from "./pages/LoginPage";
import AdminHome from "./pages/admin/AdminHome";
import AdminOlympiadsPage from "./pages/admin/AdminOlympiadsPage";
import AdminNewOlympiadPage from "./pages/admin/AdminNewOlympiadPage";
import AdminExercisesPage from "./pages/admin/AdminExercisesPage";
import AdminNewExercisePage from "./pages/admin/AdminNewExercisePage";
import AdminRubricsPage from "./pages/admin/AdminRubricsPage";
import AdminNewRubricPage from "./pages/admin/AdminNewRubricPage";
import OrganizerHome from "./pages/OrganizerHome";
import { getToken, getUserType } from "./services/authService";

function PrivateRoute({ children, type }) {
  const token = getToken();
  const userType = getUserType();

  if (!token) return <Navigate to="/login" />;
  if (type && userType !== type) return <Navigate to="/login" />;

  return children;
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/404" element={<NotFoundPage />} />
        <Route
          path="/admin"
          element={
            <PrivateRoute type="ADMIN">
              <AdminHome />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/olympiads"
          element={
            <PrivateRoute type="ADMIN">
              <AdminOlympiadsPage />
            </PrivateRoute>
          }
        />

        <Route
          path="/admin/olympiads/new"
          element={
            <PrivateRoute type="ADMIN">
              <AdminNewOlympiadPage />
            </PrivateRoute>
          }
        />

        <Route
          path="/admin/exercises"
          element={
            <PrivateRoute type="ADMIN">
              <AdminExercisesPage />
            </PrivateRoute>
          }
        />

        <Route
          path="/admin/exercises/new"
          element={
            <PrivateRoute type="ADMIN">
              <AdminNewExercisePage />
            </PrivateRoute>
          }
        />

        <Route
          path="/admin/rubrics"
          element={
            <PrivateRoute type="ADMIN">
              <AdminRubricsPage />
            </PrivateRoute>
          }
        />

        <Route
          path="/admin/rubrics/new"
          element={
            <PrivateRoute type="ADMIN">
              <AdminNewRubricPage />
            </PrivateRoute>
          }
        />

        <Route
          path="/organizer"
          element={
            <PrivateRoute type="ORGANIZER">
              <OrganizerHome />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<Navigate to="/404" />} />
      </Routes>
    </Router>
  );
}


