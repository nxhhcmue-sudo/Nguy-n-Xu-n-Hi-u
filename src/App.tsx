import React, { useState } from 'react';
import { MathPortalProvider, useMathPortal } from './context/MathPortalContext';
import { AuthProvider } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { LessonCard } from './components/LessonCard';
import { ExamCard } from './components/ExamCard';
import { LessonDetailModal } from './components/LessonDetailModal';
import { ExamSimulatorModal } from './components/ExamSimulatorModal';
import { TeacherStudioModal } from './components/TeacherStudioModal';
import { UploadExamTab } from './components/UploadExamTab';
import { TaxonomySubTabs } from './components/TaxonomySubTabs';
import { Breadcrumb } from './components/Breadcrumb';
import { AuthModal } from './components/auth/AuthModal';
import { AccountManagerModal } from './components/auth/AccountManagerModal';
import { Footer } from './components/Footer';
import {
  BookOpen,
  FileText,
  Plus,
  Filter,
  CheckCircle2,
  Sparkles,
  ArrowUpRight,
  Inbox
} from 'lucide-react';

const MainContent: React.FC = () => {
  const {
    activeTab,
    lessons,
    exams,
    searchQuery,
    selectedChapter,
    subFilter,
    setSubFilter,
    activeLessonModal,
    setActiveLessonModal,
    activeExamModal,
    setActiveExamModal,
    isTeacherMode,
    openStudioForLesson,
    openStudioForExam,
  } = useMathPortal();

  // Filter lessons based on active tab, search, and chapter
  const filteredLessons = lessons.filter(lesson => {
    // Tab check
    if (lesson.tabCategory !== activeTab) return false;

    // Search check
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = lesson.title.toLowerCase().includes(q);
      const matchDesc = lesson.description.toLowerCase().includes(q);
      const matchChapter = lesson.chapter.toLowerCase().includes(q);
      const matchContent = lesson.content.toLowerCase().includes(q);
      if (!matchTitle && !matchDesc && !matchChapter && !matchContent) {
        return false;
      }
    }

    // Chapter filter
    if (selectedChapter !== 'all' && lesson.chapter !== selectedChapter) {
      return false;
    }

    return true;
  });

  // Filter exams based on tab, subfilter, and search
  const filteredExams = exams.filter(exam => {
    // Tab check
    if (activeTab === 'ghk-hk') {
      if (exam.tabCategory !== 'ghk-hk') return false;
      if (subFilter !== 'all') {
        if (subFilter === '10' && exam.gradeTarget !== '10') return false;
        if (subFilter === '11' && exam.gradeTarget !== '11') return false;
        if (subFilter === '12' && exam.gradeTarget !== '12') return false;
        if (subFilter === 'giua-ki' && !exam.examType.includes('Giữa')) return false;
        if (subFilter === 'cuoi-ki' && !exam.examType.includes('Cuối')) return false;
      }
    } else if (activeTab === 'dgnl') {
      if (exam.tabCategory !== 'dgnl') return false;
      if (subFilter !== 'all') {
        if (subFilter === 'hcm' && !exam.examType.includes('HCM')) return false;
        if (subFilter === 'hn' && !exam.examType.includes('HN')) return false;
      }
    } else {
      // In lesson tabs, maybe show related exams
      return false;
    }

    // Search check
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = exam.title.toLowerCase().includes(q);
      const matchDesc = exam.description.toLowerCase().includes(q);
      if (!matchTitle && !matchDesc) return false;
    }

    return true;
  });

  const isExamTab = activeTab === 'ghk-hk' || activeTab === 'dgnl';

  return (
    <div className="min-h-screen flex flex-col bg-slate-50/50">
      <Navbar />
      <HeroSection />

      {/* Navigational Breadcrumb Component */}
      <Breadcrumb />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Sub-Filter Bar for Exam Tabs */}
        {isExamTab && (
          <div className="mb-6 flex flex-wrap items-center gap-1.5 p-1 bg-slate-100 rounded-lg w-fit">
            {activeTab === 'ghk-hk' ? (
              <>
                <button
                  onClick={() => setSubFilter('all')}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                    subFilter === 'all'
                      ? 'bg-white text-slate-900 shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Tất cả các khối
                </button>
                <button
                  onClick={() => setSubFilter('10')}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                    subFilter === '10'
                      ? 'bg-white text-slate-900 shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Khối 10
                </button>
                <button
                  onClick={() => setSubFilter('11')}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                    subFilter === '11'
                      ? 'bg-white text-slate-900 shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Khối 11
                </button>
                <button
                  onClick={() => setSubFilter('12')}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                    subFilter === '12'
                      ? 'bg-white text-slate-900 shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Khối 12
                </button>
                <button
                  onClick={() => setSubFilter('giua-ki')}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                    subFilter === 'giua-ki'
                      ? 'bg-white text-slate-900 shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Đề Giữa Kì
                </button>
                <button
                  onClick={() => setSubFilter('cuoi-ki')}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                    subFilter === 'cuoi-ki'
                      ? 'bg-white text-slate-900 shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Đề Cuối Kì
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => setSubFilter('all')}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                    subFilter === 'all'
                      ? 'bg-white text-slate-900 shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Tất cả kỳ thi ĐGNL
                </button>
                <button
                  onClick={() => setSubFilter('hcm')}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                    subFilter === 'hcm'
                      ? 'bg-white text-slate-900 shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  ĐHQG TP. Hồ Chí Minh
                </button>
                <button
                  onClick={() => setSubFilter('hn')}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                    subFilter === 'hn'
                      ? 'bg-white text-slate-900 shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  ĐHQG Hà Nội (HSA)
                </button>
              </>
            )}
          </div>
        )}

        {/* ================= SECTION: UPLOAD EXAMS TAB ================= */}
        {activeTab === 'tai-de-thi' && <UploadExamTab />}

        {/* ================= SECTION: LESSON CARDS & TAXONOMY ================= */}
        {!isExamTab && activeTab !== 'tai-de-thi' && (
          <div>
            {/* Render Taxonomy Sub-Tabs for Toán 10, Toán 11, Toán 12 */}
            {(activeTab === 'toan-10' || activeTab === 'toan-11' || activeTab === 'toan-12') && (
              <TaxonomySubTabs
                grade={
                  activeTab === 'toan-10' ? '10' : activeTab === 'toan-11' ? '11' : '12'
                }
              />
            )}

            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-700">
                Danh sách bài giảng & Chuyên đề ({filteredLessons.length})
              </h2>

              {isTeacherMode && (
                <button
                  onClick={() => openStudioForLesson()}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 hover:text-indigo-800 transition-colors cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Thêm bài học mới</span>
                </button>
              )}
            </div>

            {filteredLessons.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredLessons.map(lesson => (
                  <LessonCard key={lesson.id} lesson={lesson} />
                ))}
              </div>
            ) : (
              <div className="p-12 text-center bg-white rounded-2xl border border-slate-200">
                <Inbox className="w-10 h-10 text-slate-300 mx-auto mb-3" />
                <h3 className="text-base font-semibold text-slate-800 mb-1">
                  Chưa tìm thấy bài giảng phù hợp
                </h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto mb-4">
                  {searchQuery
                    ? `Không có kết quả nào khớp với "${searchQuery}". Hãy thử từ khoá khác.`
                    : 'Chưa có nội dung nào trong chuyên đề này.'}
                </p>
                {isTeacherMode && (
                  <button
                    onClick={() => openStudioForLesson()}
                    className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors shadow-2xs cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Soạn bài giảng đầu tiên</span>
                  </button>
                )}
              </div>
            )}
          </div>
        )}

        {/* ================= SECTION: EXAM CARDS ================= */}
        {isExamTab && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-700">
                Ngân hàng đề thi ({filteredExams.length})
              </h2>

              {isTeacherMode && (
                <button
                  onClick={() => openStudioForExam()}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 hover:text-emerald-900 transition-colors cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Đăng đề thi mới</span>
                </button>
              )}
            </div>

            {filteredExams.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredExams.map(exam => (
                  <ExamCard key={exam.id} exam={exam} />
                ))}
              </div>
            ) : (
              <div className="p-12 text-center bg-white rounded-2xl border border-slate-200">
                <Inbox className="w-10 h-10 text-slate-300 mx-auto mb-3" />
                <h3 className="text-base font-semibold text-slate-800 mb-1">
                  Chưa có đề thi nào trong danh mục này
                </h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto mb-4">
                  Vui lòng chọn bộ lọc khác hoặc dùng quyền giáo viên để đưa đề thi lên hệ thống.
                </p>
                {isTeacherMode && (
                  <button
                    onClick={() => openStudioForExam()}
                    className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors shadow-2xs cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Đăng đề thi ngay</span>
                  </button>
                )}
              </div>
            )}
          </div>
        )}
      </main>

      {/* Modals */}
      {activeLessonModal && (
        <LessonDetailModal
          lesson={activeLessonModal}
          onClose={() => setActiveLessonModal(null)}
        />
      )}

      {activeExamModal && (
        <ExamSimulatorModal
          exam={activeExamModal}
          onClose={() => setActiveExamModal(null)}
        />
      )}

      {/* Teacher CMS Studio */}
      <TeacherStudioModal />

      {/* Auth & Account Modals */}
      <AuthModal />
      <AccountManagerModal />

      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <MathPortalProvider>
        <MainContent />
      </MathPortalProvider>
    </AuthProvider>
  );
}
