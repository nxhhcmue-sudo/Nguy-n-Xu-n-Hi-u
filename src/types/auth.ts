export type UserRole = 'teacher' | 'student';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  passwordHash: string; // SHA-256 hash or secure local string
  role: UserRole;
  grade?: '10' | '11' | '12' | 'ĐGNL';
  school?: string;
  avatar?: string;
  createdAt: string;
  phone?: string;
}

export interface StudentExamSubmission {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  grade?: string;
  examId: string;
  examTitle: string;
  examType: string;
  score: number;
  maxScore: number;
  correctCount: number;
  totalQuestions: number;
  timeSpentSeconds: number;
  submittedAt: string;
  answers: Record<string, string>;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  role: UserRole;
  grade?: '10' | '11' | '12' | 'ĐGNL';
  school?: string;
  phone?: string;
}
