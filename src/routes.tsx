// src/routes.tsx
import { Routes, Route } from "react-router-dom";
import { ProtectedRoute, RoleProtectedRoute } from "@/lib/protected_route";
import { URLS } from "@/lib/url";

// Pages
import EnhancedIndex from "./pages/EnhancedIndex";
import Index from "./pages/Index";
import Login from "./pages/Login";
import { JoinFree } from "./pages/JoinFree";
import StudentProfile from "./pages/Student/StudentProfile";
import StudentDashboard from "./pages/StudentDashboard";
import TutorProfile from "./pages/Tutor/TutorProfile";
import TutorProfileViewForStudents from "./pages/Student/TutorProfileViewForStudents";
import TutorProfilePage from "./pages/TutorProfilePage";
import { CourseDetails } from "./components/CourseDetails";
import NotFound from "./pages/NotFound";

export default function AppRoutes() {
    return (
        <Routes>
            {/* Public routes */}
            <Route path={URLS.HOME} element={<EnhancedIndex />} />
            <Route path="/original" element={<Index />} />
            <Route path={URLS.LOGIN} element={<Login />} />
            <Route path={URLS.JOIN} element={<JoinFree />} />

            {/* STUDENT ROUTES */}
            <Route element={<ProtectedRoute />}>
                <Route element={<RoleProtectedRoute allowedRoles={["student"]} />}>
                    <Route path={URLS.STUDENT_PROFILE(":uid")} element={<StudentProfile />} />
                    <Route path={URLS.STUDENT_DASHBOARD(":uid")} element={<StudentDashboard />} />
                    <Route path={URLS.TUTOR_VIEW_FOR_STUDENTS(":uid")} element={<TutorProfileViewForStudents />} />
                </Route>
            </Route>

            {/* TUTOR ROUTES */}
            <Route element={<ProtectedRoute />}>
                <Route element={<RoleProtectedRoute allowedRoles={["tutor"]} />}>
                    <Route path={URLS.COURSE_DETAILS(":courseId")} element={<CourseDetails />} />
                    <Route path={URLS.TUTOR_PROFILE(":id")} element={<TutorProfilePage />} />
                    <Route path={URLS.TUTOR_PROFILE_EDIT(":uid")} element={<TutorProfile />} />
                </Route>
            </Route>

            {/* ADMIN ROUTES */}
            <Route element={<ProtectedRoute />}>
                <Route element={<RoleProtectedRoute allowedRoles={["admin"]} />}>
                    <Route path="/admin-panel" element={<div>Admin Panel</div>} />
                </Route>
            </Route>

            {/* Catch-all */}
            <Route path={URLS.NOT_FOUND} element={<NotFound />} />
        </Routes>
    );
}

