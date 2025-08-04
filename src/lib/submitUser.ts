import { collection, setDoc, doc, serverTimestamp } from "firebase/firestore";
import { db } from "./firebase";


// export const submitUser = async (data: any, userType: "student" | "tutor") => {
//     try {
//       const docRef = await addDoc(collection(db, userType + "s"), {
//         ...data,
//         createdAt: serverTimestamp(),
//         role: userType,
//       });
//       return { success: true, id: docRef.id };
//       } 
//     catch (error) {
//       console.error("Error submitting user:", error);
//       return { success: false, error };
//     }
//   };

export const submitUser = async (
  uid: string,
  data: any,
  userType: "student" | "tutor"
) => {
  try {
    const userRef = doc(db, `${userType}s`, uid); // UID as document ID
    await setDoc(userRef, {
      ...data,
      createdAt: serverTimestamp(),
      role: userType,
      uid: uid,
    });
    return { success: true, id: uid };
  } catch (error) {
    console.error("Error submitting user:", error);
    return { success: false, error };
  }
};