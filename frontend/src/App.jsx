import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// COMMON PAGES
import NotFoundPage from "./pages/404";
import LoginPage from "./pages/LoginPage";
import ChangePasswordPage from "./pages/ChangePasswordPage";

// ADMIN PAGES
import AdminHome from "./pages/admin/AdminHome";
// Olympiads
import AdminOlympiadsPage from "./pages/admin/AdminOlympiadsPage";
import AdminNewOlympiadPage from "./pages/admin/AdminNewOlympiadPage";
import AdminEditOlympiadPage from "./pages/admin/AdminEditOlympiadPage";

// Itineraries
import AdminItinerariesPage from "./pages/admin/AdminItinerariesPage";
import AdminNewItineraryPage from "./pages/admin/AdminNewItineraryPage";
import AdminEditItineraryPage from "./pages/admin/AdminEditItineraryPage";

//Exercises
import AdminExercisesPage from "./pages/admin/AdminExercisesPage";
// Plugged in
import AdminNewPluggedInPage from "./pages/admin/AdminNewPluggedInExercisePage";
import AdminEditPluggedInPage from "./pages/admin/AdminEditPluggedInExercisePage";
// Unplugged
import AdminNewUnpluggedPage from "./pages/admin/AdminNewUnpluggedExercisePage";
import AdminEditUnpluggedPage from "./pages/admin/AdminEditUnpluggedExercisePage";

// Rubrics
import AdminRubricsPage from "./pages/admin/AdminRubricsPage";
import AdminNewRubricPage from "./pages/admin/AdminNewRubricPage";
import AdminEditRubricPage from "./pages/admin/AdminEditRubricPage";

// Schools
import AdminSchoolsPage from "./pages/admin/AdminSchoolsPage";
import AdminNewSchoolPage from "./pages/admin/AdminNewSchoolPage";
import AdminEditSchoolPage from "./pages/admin/AdminEditSchoolPage";

// Teams
import AdminTeamsPage from "./pages/admin/AdminTeamsPage";
import AdminNewTeamPage from "./pages/admin/AdminNewTeamPage";
import AdminEditTeamPage from "./pages/admin/AdminEditTeamsPage";

// Assignations
import AdminAssignationsPage from "./pages/admin/AdminAssignationsPage";
import AdminNewAssignationPage from "./pages/admin/AdminNewAssignationPage";

// Users
import AdminUsersPage from "./pages/admin/AdminUsersPage";
import AdminNewUserPage from "./pages/admin/AdminNewUserPage";
import AdminEditUserPage from "./pages/admin/AdminEditUserPage";
import AdminMonitorsPage from "./pages/admin/AdminMonitorsPage";
import AdminNewMonitorPage from "./pages/admin/AdminNewMonitorPage";
import AdminOrganizersPage from "./pages/admin/AdminOrganizersPage";
import AdminNewOrganizerPage from "./pages/admin/AdminNewOrganizerPage";

// ORGANIZER PAGES
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
    <>
        <ToastContainer/>
        <Router>
        <Routes>
            <Route element={<MainLayout />}>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/change-password" element={<ChangePasswordPage/>}/>
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
                path="/admin/olympiads/edit/:id"
                element={
                    <PrivateRoute type="ADMIN">
                        <AdminEditOlympiadPage />
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
                path="/admin/itineraries/edit/:id"
                element={
                    <PrivateRoute type="ADMIN">
                        <AdminEditItineraryPage />
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
                path="/admin/exercises/unplugged/new"
                element={
                    <PrivateRoute type="ADMIN">
                        <AdminNewUnpluggedPage />
                    </PrivateRoute>
                }
                />

                <Route
                path="/admin/exercises/unplugged/edit/:id"
                element={
                    <PrivateRoute type="ADMIN">
                        <AdminEditUnpluggedPage />
                    </PrivateRoute>
                }
                />

                <Route
                path="/admin/exercises/plugged-in/new"
                element={
                    <PrivateRoute type="ADMIN">
                        <AdminNewPluggedInPage />
                    </PrivateRoute>
                }
                />

                <Route
                path="/admin/exercises/plugged-in/edit/:id"
                element={
                    <PrivateRoute type="ADMIN">
                        <AdminEditPluggedInPage />
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
                path="/admin/rubrics/edit/:id"
                element={
                    <PrivateRoute type="ADMIN">
                        <AdminEditRubricPage />
                    </PrivateRoute>
                }
                />

                <Route
                path="/admin/schools"
                element={
                    <PrivateRoute type="ADMIN">
                        <AdminSchoolsPage/>
                    </PrivateRoute>
                }
                />

                <Route
                path="/admin/schools/new"
                element={
                    <PrivateRoute type="ADMIN">
                        <AdminNewSchoolPage/>
                    </PrivateRoute>
                }
                />

                <Route
                path="/admin/schools/edit/:id"
                element={
                    <PrivateRoute type="ADMIN">
                        <AdminEditSchoolPage />
                    </PrivateRoute>
                }
                />

                <Route
                path="/admin/teams"
                element={
                    <PrivateRoute type="ADMIN">
                        <AdminTeamsPage/>
                    </PrivateRoute>
                }
                />

                <Route
                path="/admin/teams/new"
                element={
                    <PrivateRoute type="ADMIN">
                        <AdminNewTeamPage/>
                    </PrivateRoute>
                }
                />

                <Route
                path="/admin/teams/edit/:id"
                element={
                    <PrivateRoute type="ADMIN">
                        <AdminEditTeamPage />
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
                path="/admin/assignations/new"
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
                path="/admin/users/edit/:id"
                element={
                    <PrivateRoute type="ADMIN">
                        <AdminEditUserPage />
                    </PrivateRoute>
                }
                />

                <Route
                path="/admin/monitors"
                element={
                    <PrivateRoute type="ADMIN">
                        <AdminMonitorsPage />
                    </PrivateRoute>
                }
                />

                <Route
                path="/admin/monitors/new"
                element={
                    <PrivateRoute type="ADMIN">
                        <AdminNewMonitorPage />
                    </PrivateRoute>
                }
                />

                <Route
                path="/admin/organizers"
                element={
                    <PrivateRoute type="ADMIN">
                        <AdminOrganizersPage />
                    </PrivateRoute>
                }
                />

                <Route
                path="/admin/organizers/new"
                element={
                    <PrivateRoute type="ADMIN">
                        <AdminNewOrganizerPage />
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
    </>
  );
}


