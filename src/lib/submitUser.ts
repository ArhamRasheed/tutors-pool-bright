import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "./firebase";


export const submitUser = async (data: any, userType: "student" | "tutor") => {
    try {
      const docRef = await addDoc(collection(db, userType + "s"), {
        ...data,
        createdAt: serverTimestamp(),
        role: userType,
      });
      return { success: true, id: docRef.id };
      } 
    catch (error) {
      console.error("Error submitting user:", error);
      return { success: false, error };
    }
  };