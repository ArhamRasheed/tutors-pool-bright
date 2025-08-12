import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { onAuthStateChanged, User as FirebaseUser } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import { signOut } from "firebase/auth";

type Role = "student" | "tutor" | "admin";

export interface UserProfile {
    uid: string;
    role: Role;
    firstName?: string;
    lastName?: string;
    email?: string;
}

interface AuthContextValue {
    firebaseUser: FirebaseUser | null;
    profile: UserProfile | null;
    loading: boolean;
    logout: () => Promise<void>;
    refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

async function fetchUserProfile(uid: string): Promise<UserProfile | null> {
    const collections = ["students", "tutors", "admins"];
    for (const col of collections) {
        const snap = await getDoc(doc(db, col, uid));
        if (snap.exists()) {
            const data = snap.data();
            const role = (data as any).role ||
                (col === "students" ? "student" : col === "tutors" ? "tutor" : "admin");
            return {
                uid,
                role,
                firstName: (data as any).firstName,
                lastName: (data as any).lastName,
                email: (data as any).email,
            };
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
                const prof = await fetchUserProfile(user.uid);
                setProfile(prof);
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
        const prof = await fetchUserProfile(firebaseUser.uid);
        setProfile(prof);
        setLoading(false);
    };

    const logout = async () => {
        await signOut(auth);
    };

    return (
        <AuthContext.Provider value={{ firebaseUser, profile, loading, logout, refreshProfile }}>
            {children}
        </AuthContext.Provider>
    );
};

export function useAuth() {
    const context = useContext(AuthContext);
    try {
        if (!context) throw new Error("useAuth must be used within AuthProvider");
    }
    catch (error) {
        console.error("AuthContext is not available. Ensure you are using useAuth within AuthProvider.");
    }
    return context;
}

