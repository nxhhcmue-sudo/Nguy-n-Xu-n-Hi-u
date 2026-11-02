export type TabCategory = 'toan-10' | 'toan-11' | 'toan-12' | 'ghk-hk' | 'dgnl' | 'tai-de-thi';

export interface MultipleChoiceQuestion {
  id: string;
  question: string; // supports LaTeX formulas with $...$
  options: {
    A: string;
    B: string;
    C: string;
    D: string;
  };
  correctAnswer: 'A' | 'B' | 'C' | 'D';
  explanation: string; // step-by-step detailed solution with LaTeX
  chapter?: string;
  difficulty?: 'Nhận biết' | 'Thông hiểu' | 'Vận dụng' | 'Vận dụng cao';
}

export interface ExampleProblem {
  id: string;
  title: string;
  question: string;
  solution: string;
  difficulty?: 'Cơ bản' | 'Nâng cao';
}

export interface Lesson {
  id: string;
  title: string;
  tabCategory: TabCategory;
  chapter: string;
  grade: '10' | '11' | '12' | 'Chung';
  description: string;
  content: string; // Detailed theory & notes with LaTeX
  keyFormulas: string[]; // List of important formulas
  examples: ExampleProblem[];
  practiceQuestions: MultipleChoiceQuestion[];
  pdfUrl?: string;
  videoUrl?: string; // YouTube or Drive link
  author?: string;
  createdAt: string;
  updatedAt?: string;
  isFeatured?: boolean;
}

export interface Exam {
  id: string;
  title: string;
  tabCategory: 'ghk-hk' | 'dgnl' | 'toan-10' | 'toan-11' | 'toan-12';
  gradeTarget: '10' | '11' | '12' | 'ĐGNL' | 'Tổng hợp';
  examType: 'Giữa HK1' | 'Cuối HK1' | 'Giữa HK2' | 'Cuối HK2' | 'ĐGNL ĐHQG-HCM' | 'ĐGNL ĐHQG-HN' | 'ĐH Sư Phạm' | 'Chuyên đề';
  timeMinutes: number; // e.g. 90, 60, 45, 120
  totalQuestions: number;
  maxScore: number; // e.g. 10 or 1200 or 100
  year: string;
  description: string;
  questions: MultipleChoiceQuestion[];
  pdfUrl?: string;
  createdAt: string;
  isOfficialFormat?: boolean;
}

export interface ExamResult {
  examId: string;
  examTitle: string;
  score: number;
  totalQuestions: number;
  correctAnswersCount: number;
  timeSpentSeconds: number;
  completedAt: string;
  answers: Record<string, string>; // questionId -> selectedOption
}

export interface UploadedExamDoc {
  id: string;
  title: string;
  gradeTarget: '10' | '11' | '12' | 'ĐGNL' | 'Chung';
  examType: 'Giữa HK1' | 'Cuối HK1' | 'Giữa HK2' | 'Cuối HK2' | 'ĐGNL' | 'Khảo sát chất lượng' | 'Đề học sinh giỏi' | 'Chuyên đề';
  year: string;
  schoolOrSource: string;
  description?: string;
  fileName: string;
  fileSize: string;
  fileType: 'pdf' | 'word' | 'image' | 'other';
  fileDataUrl: string; // Base64 or Blob link
  hasAnswerKey: boolean;
  answerKeyFileName?: string;
  answerKeyDataUrl?: string;
  uploadedAt: string;
  author?: string;
}
