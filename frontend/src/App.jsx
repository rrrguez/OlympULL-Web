import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import NotFoundPage from "./pages/404";
import LoginPage from "./pages/LoginPage";
import AdminHome from "./pages/admin/AdminHome";
import AdminOlympiadsPage from "./pages/admin/AdminOlympiadsPage";
import AdminNewOlympiadPage from "./pages/admin/AdminNewOlympiadPage";
import AdminItinerariesPage from "./pages/admin/AdminItinerariesPage";
import AdminNewItineraryPage from "./pages/admin/AdminNewItineraryPage";
import AdminExercisesPage from "./pages/admin/AdminExercisesPage";
import AdminNewExercisePage from "./pages/admin/AdminNewExercisePage";
import AdminRubricsPage from "./pages/admin/AdminRubricsPage";
import AdminNewRubricPage from "./pages/admin/AdminNewRubricPage";
import AdminAssignationsPage from "./pages/admin/AdminAssignationsPage";
import AdminNewAssignationPage from "./pages/admin/AdminNewAssignationPage";
import AdminUsersPage from "./pages/admin/AdminUsersPage";
import AdminNewUserPage from "./pages/admin/AdminNewUserPage";
import OrganizerHome from "./pages/OrganizerHome";
import { getToken, getUserType } from "./services/authService";
import MainLayout from "./components/layouts/MainLayout";

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
        <Route element={<MainLayout />}>
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
            path="/admin/itineraries"
            element={
                <PrivateRoute type="ADMIN">
                    <AdminItinerariesPage />
                </PrivateRoute>
            }
            />

            <Route
            path="/admin/itineraries/new"
            element={
                <PrivateRoute type="ADMIN">
                    <AdminNewItineraryPage />
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
            path="/admin/assignations"
            element={
                <PrivateRoute type="ADMIN">
                    <AdminAssignationsPage />
                </PrivateRoute>
            }
            />

            <Route
            path="/admin/assignations/olympiads"
            element={
                <PrivateRoute type="ADMIN">
                    <AdminAssignationsPage />
                </PrivateRoute>
            }
            />

            <Route
            path="/admin/assignations/olympiads/new"
            element={
                <PrivateRoute type="ADMIN">
                    <AdminNewAssignationPage />
                </PrivateRoute>
            }
            />

            <Route
            path="/admin/users"
            element={
                <PrivateRoute type="ADMIN">
                    <AdminUsersPage />
                </PrivateRoute>
            }
            />

            <Route
            path="/admin/users/new"
            element={
                <PrivateRoute type="ADMIN">
                    <AdminNewUserPage />
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
        </Route>
      </Routes>
    </Router>
  );
}


