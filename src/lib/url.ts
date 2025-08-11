// src/lib/url.ts
export const URLS = {
  HOME: "/",
  LOGIN: "/login",
  JOIN: "/join",
  STUDENT_PROFILE: (uid: string) => `/student/${uid}`,
  STUDENT_DASHBOARD: (uid: string) => `/student/${uid}/view`,
  TUTOR_PROFILE: (uid: string) => `/tutor/${uid}`,
  TUTOR_PROFILE_EDIT: (uid: string) => `/tutor/${uid}/edit`,
  TUTOR_DASHBOARD: (uid: string) => `/tutor/${uid}/view`,
  TUTOR_VIEW_FOR_STUDENTS: (uid: string) => `/tutor/${uid}/view`,
  COURSE_DETAILS: (courseId: string) => `/course/${courseId}`,
  NOT_FOUND: "*",
  UNAUTHORIZED: "/unauthorized",
  COMPLETE_PROFILE: "/complete-profile",
};
