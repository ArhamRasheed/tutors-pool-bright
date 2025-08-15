// 

// src/contexts/AuthContext.tsx
import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { onAuthStateChanged, User as FirebaseUser } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import { signOut } from "firebase/auth";

type Role = "student" | "tutor" | "admin";

export interface UserProfile {
    role: Role;
    data : any; // Replace with actual data structure
}

interface AuthContextValue {
    firebaseUser: FirebaseUser | null;
    profile: UserProfile | null;
    loading: boolean;
    logout: () => Promise<void>;
    refreshProfile: () => Promise<void>;
    // Helper computed values
    isAuthenticated: boolean;
    isStudent: boolean;
    isTutor: boolean;
    isAdmin: boolean;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

async function fetchUserProfile(uid: string): Promise<UserProfile | null> {
    const collections = ["students", "tutors", "admins"];

    for (const col of collections) {
        try {
            const snap = await getDoc(doc(db, col, uid));
            if (snap.exists()) {
                const data = snap.data();
                const role = (data as any).role ||
                    (col === "students" ? "student" : col === "tutors" ? "tutor" : "admin");

                return {
                    role: role as Role,
                    data: data
                };
            }
            else {
                return null;
            }
        } catch (error) {
            console.error(`Error fetching from ${col}:`, error);
        }
    }
    return null;
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null);
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            setFirebaseUser(user);
            if (user) {
                try {
                    const prof = await fetchUserProfile(user.uid);
                    setProfile(prof);
                } catch (error) {
                    console.error("Error fetching user profile:", error);
                    setProfile(null);
                }
            } else {
                setProfile(null);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const refreshProfile = async () => {
        if (!firebaseUser) return;
        setLoading(true);
        try {
            const prof = await fetchUserProfile(firebaseUser.uid);
            setProfile(prof);
        } catch (error) {
            console.error("Error refreshing profile:", error);
        } finally {
            setLoading(false);
        }
    };

    const logout = async () => {
        try {
            await signOut(auth);
        } catch (error) {
            console.error("Error signing out:", error);
            throw error;
        }
    };

    // Computed values for convenience
    const isAuthenticated = !!firebaseUser && !!profile;
    const isStudent = profile?.role === "student";
    const isTutor = profile?.role === "tutor";
    const isAdmin = profile?.role === "admin";

    return (
        <AuthContext.Provider value={{
            firebaseUser,
            profile,
            loading,
            logout,
            refreshProfile,
            isAuthenticated,
            isStudent,
            isTutor,
            isAdmin
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within AuthProvider");
    }
    return context;
}