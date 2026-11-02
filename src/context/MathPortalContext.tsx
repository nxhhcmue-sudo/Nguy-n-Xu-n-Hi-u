import React, { createContext, useContext, useState, useEffect } from 'react';
import { Lesson, Exam, TabCategory, ExamResult, UploadedExamDoc } from '../types';
import { INITIAL_LESSONS, INITIAL_EXAMS, INITIAL_UPLOADED_DOCS } from '../data/initialData';

interface MathPortalContextType {
  lessons: Lesson[];
  exams: Exam[];
  uploadedDocs: UploadedExamDoc[];
  activeTab: TabCategory;
  setActiveTab: (tab: TabCategory) => void;
  selectedBranch: string;
  setSelectedBranch: (branch: string) => void;
  selectedChapter: string;
  setSelectedChapter: (chapter: string) => void;
  subFilter: string;
  setSubFilter: (filter: string) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  bookmarks: string[];
  toggleBookmark: (lessonId: string) => void;
  
  // Teacher Mode & Studio
  isTeacherMode: boolean;
  setIsTeacherMode: (val: boolean) => void;
  isStudioOpen: boolean;
  openStudioForLesson: (lesson?: Lesson) => void;
  openStudioForExam: (exam?: Exam) => void;
  closeStudio: () => void;
  editingLesson: Lesson | null;
  editingExam: Exam | null;

  // CRUD for Lessons & Exams
  saveLesson: (lessonData: Partial<Lesson>) => void;
  deleteLesson: (id: string) => void;
  saveExam: (examData: Partial<Exam>) => void;
  deleteExam: (id: string) => void;
  
  // CRUD for Uploaded Docs (PDF/Word)
  addUploadedDoc: (doc: Omit<UploadedExamDoc, 'id' | 'uploadedAt'>) => void;
  deleteUploadedDoc: (id: string) => void;

  // Modals for students
  activeLessonModal: Lesson | null;
  setActiveLessonModal: (lesson: Lesson | null) => void;
  activeExamModal: Exam | null;
  setActiveExamModal: (exam: Exam | null) => void;

  // Exam Results
  examHistory: ExamResult[];
  saveExamResult: (result: ExamResult) => void;

  // Backup & Restore
  exportDataAsJson: () => void;
  importDataFromJson: (jsonStr: string) => boolean;
  resetToDefault: () => void;
}

const MathPortalContext = createContext<MathPortalContextType | undefined>(undefined);

const STORAGE_KEY_LESSONS = 'trinhan_lessons_v2';
const STORAGE_KEY_EXAMS = 'trinhan_exams_v2';
const STORAGE_KEY_UPLOADED_DOCS = 'trinhan_uploaded_docs_v2';
const STORAGE_KEY_BOOKMARKS = 'trinhan_bookmarks_v2';
const STORAGE_KEY_RESULTS = 'trinhan_results_v2';
const STORAGE_KEY_TEACHER = 'trinhan_teacher_mode_v2';

export const MathPortalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lessons, setLessons] = useState<Lesson[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_LESSONS);
      if (stored) {
        const parsed = JSON.parse(stored);
        // If stored version has fewer lessons than new taxonomy initial data, merge/prefer full taxonomy
        if (Array.isArray(parsed) && parsed.length >= INITIAL_LESSONS.length) {
          return parsed;
        }
      }
    } catch {
      // fallback
    }
    return INITIAL_LESSONS;
  });

  const [exams, setExams] = useState<Exam[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_EXAMS);
      if (stored) return JSON.parse(stored);
    } catch {
      // fallback
    }
    return INITIAL_EXAMS;
  });

  const [uploadedDocs, setUploadedDocs] = useState<UploadedExamDoc[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_UPLOADED_DOCS);
      if (stored) return JSON.parse(stored);
    } catch {
      // fallback
    }
    return INITIAL_UPLOADED_DOCS;
  });

  const [bookmarks, setBookmarks] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_BOOKMARKS);
      if (stored) return JSON.parse(stored);
    } catch {
      // fallback
    }
    return [];
  });

  const [examHistory, setExamHistory] = useState<ExamResult[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_RESULTS);
      if (stored) return JSON.parse(stored);
    } catch {
      // fallback
    }
    return [];
  });

  const [isTeacherMode, setIsTeacherModeState] = useState<boolean>(() => {
    try {
      return localStorage.getItem(STORAGE_KEY_TEACHER) === 'true';
    } catch {
      return false;
    }
  });

  const [activeTab, setActiveTabState] = useState<TabCategory>('toan-10');
  const [selectedBranch, setSelectedBranch] = useState<string>('all');
  const [selectedChapter, setSelectedChapter] = useState('all');
  const [subFilter, setSubFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const setActiveTab = (tab: TabCategory) => {
    setActiveTabState(tab);
    setSelectedBranch('all');
    setSelectedChapter('all');
    setSubFilter('all');
    setSearchQuery('');
  };

  // Modals
  const [activeLessonModal, setActiveLessonModal] = useState<Lesson | null>(null);
  const [activeExamModal, setActiveExamModal] = useState<Exam | null>(null);

  // Studio modal for teacher
  const [isStudioOpen, setIsStudioOpen] = useState(false);
  const [editingLesson, setEditingLesson] = useState<Lesson | null>(null);
  const [editingExam, setEditingExam] = useState<Exam | null>(null);

  // Persist lessons
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_LESSONS, JSON.stringify(lessons));
    } catch (e) {
      console.warn('Could not save lessons to localStorage', e);
    }
  }, [lessons]);

  // Persist exams
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_EXAMS, JSON.stringify(exams));
    } catch (e) {
      console.warn('Could not save exams to localStorage', e);
    }
  }, [exams]);

  // Persist uploaded docs
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_UPLOADED_DOCS, JSON.stringify(uploadedDocs));
    } catch (e) {
      console.warn('Could not save uploadedDocs to localStorage', e);
    }
  }, [uploadedDocs]);

  // Persist bookmarks
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_BOOKMARKS, JSON.stringify(bookmarks));
    } catch (e) {
      console.warn('Could not save bookmarks to localStorage', e);
    }
  }, [bookmarks]);

  // Persist results
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_RESULTS, JSON.stringify(examHistory));
    } catch (e) {
      console.warn('Could not save exam results to localStorage', e);
    }
  }, [examHistory]);

  const setIsTeacherMode = (val: boolean) => {
    setIsTeacherModeState(val);
    try {
      localStorage.setItem(STORAGE_KEY_TEACHER, String(val));
    } catch {
      // ignore
    }
  };

  const toggleBookmark = (lessonId: string) => {
    setBookmarks(prev =>
      prev.includes(lessonId) ? prev.filter(id => id !== lessonId) : [...prev, lessonId]
    );
  };

  const openStudioForLesson = (lesson?: Lesson) => {
    setEditingExam(null);
    setEditingLesson(lesson || null);
    setIsStudioOpen(true);
  };

  const openStudioForExam = (exam?: Exam) => {
    setEditingLesson(null);
    setEditingExam(exam || null);
    setIsStudioOpen(true);
  };

  const closeStudio = () => {
    setIsStudioOpen(false);
    setEditingLesson(null);
    setEditingExam(null);
  };

  const saveLesson = (lessonData: Partial<Lesson>) => {
    const now = new Date().toISOString().split('T')[0];
    if (editingLesson) {
      setLessons(prev =>
        prev.map(item =>
          item.id === editingLesson.id
            ? ({ ...item, ...lessonData, updatedAt: now } as Lesson)
            : item
        )
      );
    } else {
      const newLesson: Lesson = {
        id: 'lesson-' + Date.now(),
        title: lessonData.title || 'Bài học mới',
        tabCategory: lessonData.tabCategory || activeTab,
        chapter: lessonData.chapter || 'Chương 1. Mệnh đề. Tập hợp',
        grade: lessonData.grade || (activeTab === 'toan-10' ? '10' : activeTab === 'toan-11' ? '11' : '12'),
        description: lessonData.description || '',
        content: lessonData.content || '',
        keyFormulas: lessonData.keyFormulas || [],
        examples: lessonData.examples || [],
        practiceQuestions: lessonData.practiceQuestions || [],
        pdfUrl: lessonData.pdfUrl,
        videoUrl: lessonData.videoUrl,
        author: lessonData.author || 'Trung Tâm Trí Nhân',
        createdAt: now,
        isFeatured: lessonData.isFeatured || false,
      };
      setLessons(prev => [newLesson, ...prev]);
    }
    closeStudio();
  };

  const deleteLesson = (id: string) => {
    if (confirm('Bạn có chắc chắn muốn xoá bài học này không?')) {
      setLessons(prev => prev.filter(l => l.id !== id));
      if (activeLessonModal?.id === id) setActiveLessonModal(null);
    }
  };

  const saveExam = (examData: Partial<Exam>) => {
    const now = new Date().toISOString().split('T')[0];
    if (editingExam) {
      setExams(prev =>
        prev.map(item =>
          item.id === editingExam.id
            ? ({ ...item, ...examData } as Exam)
            : item
        )
      );
    } else {
      const newExam: Exam = {
        id: 'exam-' + Date.now(),
        title: examData.title || 'Đề thi mới',
        tabCategory: examData.tabCategory || (activeTab === 'dgnl' ? 'dgnl' : 'ghk-hk'),
        gradeTarget: examData.gradeTarget || '12',
        examType: examData.examType || 'Giữa HK1',
        timeMinutes: examData.timeMinutes || 90,
        totalQuestions: examData.questions?.length || 10,
        maxScore: examData.maxScore || 10,
        year: examData.year || '2026',
        description: examData.description || '',
        questions: examData.questions || [],
        pdfUrl: examData.pdfUrl,
        createdAt: now,
        isOfficialFormat: examData.isOfficialFormat ?? true,
      };
      setExams(prev => [newExam, ...prev]);
    }
    closeStudio();
  };

  const deleteExam = (id: string) => {
    if (confirm('Bạn có chắc chắn muốn xoá đề thi này không?')) {
      setExams(prev => prev.filter(e => e.id !== id));
      if (activeExamModal?.id === id) setActiveExamModal(null);
    }
  };

  // Uploaded docs actions
  const addUploadedDoc = (doc: Omit<UploadedExamDoc, 'id' | 'uploadedAt'>) => {
    const now = new Date().toISOString().split('T')[0];
    const newDoc: UploadedExamDoc = {
      ...doc,
      id: 'doc-' + Date.now(),
      uploadedAt: now,
    };
    setUploadedDocs(prev => [newDoc, ...prev]);
  };

  const deleteUploadedDoc = (id: string) => {
    if (confirm('Bạn có chắc chắn muốn xoá tệp đề thi này?')) {
      setUploadedDocs(prev => prev.filter(d => d.id !== id));
    }
  };

  const saveExamResult = (result: ExamResult) => {
    setExamHistory(prev => [result, ...prev]);
  };

  const exportDataAsJson = () => {
    const data = {
      center: 'Trung Tâm Trí Nhân',
      exportDate: new Date().toISOString(),
      lessons,
      exams,
      uploadedDocs,
    };
    const jsonStr = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `TriNhan_DuLieu_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const importDataFromJson = (jsonStr: string): boolean => {
    try {
      const parsed = JSON.parse(jsonStr);
      if (Array.isArray(parsed.lessons)) {
        setLessons(parsed.lessons);
      }
      if (Array.isArray(parsed.exams)) {
        setExams(parsed.exams);
      }
      if (Array.isArray(parsed.uploadedDocs)) {
        setUploadedDocs(parsed.uploadedDocs);
      }
      return true;
    } catch (e) {
      console.error('Import failed:', e);
      return false;
    }
  };

  const resetToDefault = () => {
    if (confirm('Bạn có muốn khôi phục lại toàn bộ chương mục và đề thi gốc từ ngân hàng mục lục không?')) {
      setLessons(INITIAL_LESSONS);
      setExams(INITIAL_EXAMS);
      setUploadedDocs(INITIAL_UPLOADED_DOCS);
      setBookmarks([]);
      setExamHistory([]);
    }
  };

  return (
    <MathPortalContext.Provider
      value={{
        lessons,
        exams,
        uploadedDocs,
        activeTab,
        setActiveTab,
        selectedBranch,
        setSelectedBranch,
        selectedChapter,
        setSelectedChapter,
        subFilter,
        setSubFilter,
        searchQuery,
        setSearchQuery,
        bookmarks,
        toggleBookmark,
        isTeacherMode,
        setIsTeacherMode,
        isStudioOpen,
        openStudioForLesson,
        openStudioForExam,
        closeStudio,
        editingLesson,
        editingExam,
        saveLesson,
        deleteLesson,
        saveExam,
        deleteExam,
        addUploadedDoc,
        deleteUploadedDoc,
        activeLessonModal,
        setActiveLessonModal,
        activeExamModal,
        setActiveExamModal,
        examHistory,
        saveExamResult,
        exportDataAsJson,
        importDataFromJson,
        resetToDefault,
      }}
    >
      {children}
    </MathPortalContext.Provider>
  );
};

export const useMathPortal = () => {
  const context = useContext(MathPortalContext);
  if (!context) {
    throw new Error('useMathPortal must be used within a MathPortalProvider');
  }
  return context;
};
