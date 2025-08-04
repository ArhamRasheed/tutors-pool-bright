// /lib/auth/loginUser.ts
import { auth, db } from "./firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

export const loginUser = async (
  email: string,
  password: string,
  loginType: "student" | "tutor"
): Promise<{ success: boolean; error?: string; user?: any }> => {
  try {
    // Step 1: Firebase Auth login
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Step 2: Check Firestore if user has a profile
    const userRef = doc(db, "users", user.uid);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      return { success: false, error: "Account not found. Please sign up first." };
    }

    const userData = userSnap.data();
    if (userData.role !== loginType) {
      return {
        success: false,
        error: `You signed up as a ${userData.role}. Switch tab to continue.`,
      };
    }

    return { success: true, user }; // success
  } catch (error: any) {
    console.error("Login error:", error.message);

    if (error.code === "auth/user-not-found") {
      return { success: false, error: "User not found. Please sign up first." };
    } else if (error.code === "auth/wrong-password") {
      return { success: false, error: "Incorrect password. Please try again." };
    } else {
      return { success: false, error: "Something went wrong. Please try again." };
    }
  }
};
