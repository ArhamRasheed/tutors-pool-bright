// src/hooks/useStudentData.ts
import { useQuery } from '@tanstack/react-query';
import { doc, getDoc, collection, query, where, orderBy, limit, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';

// Types for student dashboard data
export interface StudentData {
  uid: string;
  name: string;
  email: string;
  avatar?: string;
  grade: string;
  currentStreak: number;
  completedSessions: number;
  pendingAssignments: number;
  progress: string;
  nextSession?: {
    date: any;
    subject: string;
    tutor: string;
    id: string;
  };
}

export interface RecentSession {
  id: string;
  subject: string;
  tutor: string;
  date: string;
  rating: number;
  duration?: number;
  notes?: string;
}

export interface DashboardStats {
  totalSessions: number;
  averageRating: number;
  hoursLearned: number;
  subjectsStudied: number;
  currentStreak: number;
}

// Fetch detailed student data
async function fetchStudentData(uid: string): Promise<StudentData> {
  const studentDoc = await getDoc(doc(db, 'students', uid));
  
  if (!studentDoc.exists()) {
    throw new Error('Student not found');
  }

  const data = studentDoc.data();
  
  // Fetch next session
  const nextSessionQuery = query(
    collection(db, 'sessions'),
    where('studentId', '==', uid),
    where('status', '==', 'scheduled'),
    orderBy('scheduledDate', 'asc'),
    limit(1)
  );
  
  const nextSessionSnapshot = await getDocs(nextSessionQuery);
  let nextSession = null;
  
  if (!nextSessionSnapshot.empty) {
    const sessionData = nextSessionSnapshot.docs[0].data();
    nextSession = {
      id: nextSessionSnapshot.docs[0].id,
      date: sessionData.scheduledDate,
      subject: sessionData.subject,
      tutor: sessionData.tutorName || 'Unknown Tutor'
    };
  }

  return {
    uid,
    name: `${data.firstName} ${data.lastName}`,
    email: data.email,
    avatar: data.avatar || data.photoURL,
    grade: data.grade || 'Not specified',
    currentStreak: data.currentStreak || 0,
    completedSessions: data.completedSessions || 0,
    pendingAssignments: data.pendingAssignments || 0,
    progress: data.averageGradeImprovement || '0%',
    nextSession
  };
}

// Fetch recent sessions
async function fetchRecentSessions(uid: string): Promise<RecentSession[]> {
  const sessionsQuery = query(
    collection(db, 'sessions'),
    where('studentId', '==', uid),
    where('status', '==', 'completed'),
    orderBy('completedAt', 'desc'),
    limit(5)
  );

  const snapshot = await getDocs(sessionsQuery);
  
  return snapshot.docs.map(doc => {
    const data = doc.data();
    return {
      id: doc.id,
      subject: data.subject,
      tutor: data.tutorName || 'Unknown Tutor',
      date: data.completedAt?.toDate?.()?.toLocaleDateString() || 'Unknown date',
      rating: data.studentRating || 0,
      duration: data.duration,
      notes: data.notes
    };
  });
}

// Fetch dashboard statistics
async function fetchDashboardStats(uid: string): Promise<DashboardStats> {
  // This could be optimized with a single compound query or cached stats
  const sessionsQuery = query(
    collection(db, 'sessions'),
    where('studentId', '==', uid),
    where('status', '==', 'completed')
  );

  const snapshot = await getDocs(sessionsQuery);
  const sessions = snapshot.docs.map(doc => doc.data());

  const totalSessions = sessions.length;
  const ratingsSum = sessions.reduce((sum, session) => sum + (session.studentRating || 0), 0);
  const averageRating = totalSessions > 0 ? ratingsSum / totalSessions : 0;
  const hoursLearned = sessions.reduce((sum, session) => sum + (session.duration || 0), 0) / 60;
  const subjectsStudied = new Set(sessions.map(session => session.subject)).size;

  // Get current streak from student doc
  const studentDoc = await getDoc(doc(db, 'students', uid));
  const currentStreak = studentDoc.exists() ? studentDoc.data().currentStreak || 0 : 0;

  return {
    totalSessions,
    averageRating: Math.round(averageRating * 10) / 10,
    hoursLearned: Math.round(hoursLearned * 10) / 10,
    subjectsStudied,
    currentStreak
  };
}

// React Query Hooks
export function useStudentData(uid: string | undefined) {
  return useQuery({
    queryKey: ['student', uid],
    queryFn: () => fetchStudentData(uid!),
    enabled: !!uid,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes (renamed from cacheTime)
  });
}

export function useRecentSessions(uid: string | undefined) {
  return useQuery({
    queryKey: ['recentSessions', uid],
    queryFn: () => fetchRecentSessions(uid!),
    enabled: !!uid,
    staleTime: 2 * 60 * 1000, // 2 minutes
    gcTime: 5 * 60 * 1000, // 5 minutes (renamed from cacheTime)
  });
}

export function useDashboardStats(uid: string | undefined) {
  return useQuery({
    queryKey: ['dashboardStats', uid],
    queryFn: () => fetchDashboardStats(uid!),
    enabled: !!uid,
    staleTime: 10 * 60 * 1000, // 10 minutes
    gcTime: 15 * 60 * 1000, // 15 minutes (renamed from cacheTime)
  });
}