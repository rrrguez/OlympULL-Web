import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// COMMON PAGES
import NotFoundPage from "./pages/404";
import LoginPage from "./pages/LoginPage";
import ChangePasswordPage from "./pages/ChangePasswordPage";

// ADMIN PAGES ---------------------------------------------------------------------------------------------------------
import AdminHome from "./pages/admin/Home";
// Olympiads
import AdminOlympiadsListPage from "./pages/admin/Olympiads/ListPage";
import AdminNewOlympiadPage from "./pages/admin/Olympiads/NewPage";
import AdminEditOlympiadPage from "./pages/admin/Olympiads/EditPage";

// Itineraries
import AdminItinerariesListPage from "./pages/admin/Itineraries/ListPage";
import AdminNewItineraryPage from "./pages/admin/Itineraries/NewPage";
import AdminEditItineraryPage from "./pages/admin/Itineraries/EditPage";

//Exercises
import AdminExercisesListPage from "./pages/admin/Exercises/ListPage";
// Plugged in
import AdminNewPluggedInPage from "./pages/admin/Exercises/PluggedIn/NewPage";
import AdminEditPluggedInPage from "./pages/admin/Exercises/PluggedIn/EditPage";
// Unplugged
import AdminNewUnpluggedPage from "./pages/admin/Exercises/Unplugged/NewPage";
import AdminEditUnpluggedPage from "./pages/admin/Exercises/Unplugged/EditPage";

// Rubrics
import AdminRubricsListPage from "./pages/admin/Rubrics/ListPage";
import AdminNewRubricPage from "./pages/admin/Rubrics/NewPage";
import AdminEditRubricPage from "./pages/admin/Rubrics/EditPage";

// Schools
import AdminSchoolsListPage from "./pages/admin/Schools/ListPage";
import AdminNewSchoolPage from "./pages/admin/Schools/NewPage";
import AdminEditSchoolPage from "./pages/admin/Schools/EditPage";

// Teams
import AdminTeamsListPage from "./pages/admin/Teams/ListPage";
import AdminNewTeamPage from "./pages/admin/Teams/NewPage";
import AdminEditTeamPage from "./pages/admin/Teams/EditPage";

// Exercise assignations
import AdminExerciseAssignationsListPage from "./pages/admin/Exercises/Assignations/ListPage";
import AdminNewExerciseAssignationPage from "./pages/admin/Exercises/Assignations/NewPage";

// Users
import AdminUsersListPage from "./pages/admin/Users/ListPage";
import AdminNewUserPage from "./pages/admin/Users/NewPage";
import AdminEditUserPage from "./pages/admin/Users/EditPage";

// Monitor assignations
import AdminMonitorAssignationsListPage from "./pages/admin/Monitor/ListPage";
import AdminNewMonitorAssignationPage from "./pages/admin/Monitor/NewPage";

// Organizer assignations
import AdminOrganizerAssignationsListPage from "./pages/admin/Organizers/ListPage";
import AdminNewOrganizerAssignationPage from "./pages/admin/Organizers/NewPage";

// Participant assignations
import AdminParticipantAssignationsListPage from "./pages/admin/Participants/ListPage";
import AdminNewParticipantAssignationPage from "./pages/admin/Participants/NewPage";

// ORGANIZER PAGES -----------------------------------------------------------------------------------------------------
import OrganizerHome from "./pages/organizer/Home";
import OrganizerExerciseAssignationsListPage from "./pages/organizer/Assignations/ListPage";
import OrganizerNewExerciseAssignation from "./pages/organizer/Assignations/NewPage";

import { getToken, getUserType } from "./services/authService";
import MainLayout from "./components/layouts/MainLayout";

function PrivateRoute({ children, type }) {
    const token = getToken();
    const userType = getUserType();

    if (!token) return <Navigate to="/login" />;
    if (type && userType !== type) return <Navigate to="/404" />;

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
                                <AdminOlympiadsListPage />
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
                                <AdminItinerariesListPage />
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
                                <AdminExercisesListPage />
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
                                <AdminRubricsListPage />
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
                                <AdminSchoolsListPage/>
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
                                <AdminTeamsListPage/>
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
                                <AdminExerciseAssignationsListPage />
                            </PrivateRoute>
                        }
                    />

                    <Route
                        path="/admin/assignations/new"
                        element={
                            <PrivateRoute type="ADMIN">
                                <AdminNewExerciseAssignationPage />
                            </PrivateRoute>
                        }
                    />

                    <Route
                        path="/admin/users"
                        element={
                            <PrivateRoute type="ADMIN">
                                <AdminUsersListPage />
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
                                <AdminMonitorAssignationsListPage />
                            </PrivateRoute>
                        }
                    />

                    <Route
                        path="/admin/monitors/new"
                        element={
                            <PrivateRoute type="ADMIN">
                                <AdminNewMonitorAssignationPage />
                            </PrivateRoute>
                        }
                    />

                    <Route
                        path="/admin/organizers"
                        element={
                            <PrivateRoute type="ADMIN">
                                <AdminOrganizerAssignationsListPage />
                            </PrivateRoute>
                        }
                    />

                    <Route
                        path="/admin/organizers/new"
                        element={
                            <PrivateRoute type="ADMIN">
                                <AdminNewOrganizerAssignationPage />
                            </PrivateRoute>
                        }
                    />

                    <Route
                        path="/admin/participants"
                        element={
                            <PrivateRoute type="ADMIN">
                                <AdminParticipantAssignationsListPage />
                            </PrivateRoute>
                        }
                    />

                    <Route
                        path="/admin/participants/new"
                        element={
                            <PrivateRoute type="ADMIN">
                                <AdminNewParticipantAssignationPage />
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

                    <Route
                        path="/organizer/assignations"
                        element={
                            <PrivateRoute type="ORGANIZER">
                                <OrganizerExerciseAssignationsListPage />
                            </PrivateRoute>
                        }
                    />

                    <Route
                        path="/organizer/assignations/new"
                        element={
                            <PrivateRoute type="ORGANIZER">
                                <OrganizerNewExerciseAssignation />
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


