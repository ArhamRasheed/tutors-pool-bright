// src/lib/protected-route.tsx
import React, { ReactNode } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { URLS } from "@/lib/url";

const FullPageSpinner = () => (
    <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary/40 border-t-primary"></div>
    </div>
);

export function ProtectedRoute({
    children,
    requireProfile = true,
}: {
    children?: ReactNode;
    requireProfile?: boolean;
}) {
    const { firebaseUser, profile, loading } = useAuth();
    const location = useLocation();

    if (loading) return <FullPageSpinner />;

    if (!firebaseUser) {
        return <Navigate to={URLS.LOGIN} state={{ from: location }} replace />;
    }

    if (requireProfile && !profile) {
        return <Navigate to={URLS.COMPLETE_PROFILE} replace />;
    }

    return children ? <>{children}</> : <Outlet />;
}

export function RoleProtectedRoute({
    allowedRoles,
    children,
}: {
    allowedRoles: string[];
    children?: ReactNode;
}) {
    const { profile, loading } = useAuth();

    if (loading) return <FullPageSpinner />;

    if (!profile || !allowedRoles.includes(profile.role)) {
        return <Navigate to={URLS.UNAUTHORIZED} replace />;
    }

    return children ? <>{children}</> : <Outlet />;
}
