import React from 'react';
import { useMathPortal } from '../context/MathPortalContext';
import { Search, BookOpen, FileText, CheckCircle2, Plus, Sparkles } from 'lucide-react';

export const HeroSection: React.FC = () => {
  const {
    activeTab,
    lessons,
    exams,
    searchQuery,
    setSearchQuery,
    selectedChapter,
    setSelectedChapter,
    isTeacherMode,
    openStudioForLesson,
    openStudioForExam,
  } = useMathPortal();

  // Get tab title and description
  const getTabInfo = () => {
    switch (activeTab) {
      case 'toan-10':
        return {
          badge: 'Chương trình GDPT 2018',
          title: 'Toán Học Lớp 10',
          subtitle: 'Mệnh đề, Tập hợp, Bất phương trình bậc nhất hai ẩn, Hệ thức lượng, Véctơ và Thống kê.',
          type: 'lessons',
        };
      case 'toan-11':
        return {
          badge: 'Chương trình GDPT 2018',
          title: 'Toán Học Lớp 11',
          subtitle: 'Lượng giác, Cấp số cộng - Cấp số nhân, Giới hạn, Hình không gian và Hàm số mũ - lôgarit.',
          type: 'lessons',
        };
      case 'toan-12':
        return {
          badge: 'Chương trình GDPT 2018 - Luyện Thi THPT',
          title: 'Toán Học Lớp 12',
          subtitle: 'Khảo sát hàm số, Toạ độ không gian Oxyz, Nguyên hàm - Tích phân và Xác suất có điều kiện.',
          type: 'lessons',
        };
      case 'ghk-hk':
        return {
          badge: 'Ngân Hàng Đề Kiểm Tra Định Kỳ',
          title: 'Đề Thi Thử Giữa Kì & Học Kì',
          subtitle: 'Đề thi chuẩn cấu trúc ma trận của Bộ GD&ĐT cho các khối lớp 10, 11, 12 kèm đáp án và hướng dẫn giải.',
          type: 'exams',
        };
      case 'dgnl':
        return {
          badge: 'Luyện Thi Đánh Giá Năng Lực 2026',
          title: 'Đề Thi Thử Đánh Giá Năng Lực (ĐGNL)',
          subtitle: 'Rèn luyện tư duy định lượng, suy luận logic, giải quyết vấn đề thực tế theo cấu trúc ĐHQG TP.HCM & ĐHQG Hà Nội.',
          type: 'exams',
        };
      case 'tai-de-thi':
        return {
          badge: 'Kho Đề Thi PDF & Word - Trung Tâm Trí Nhân',
          title: 'Tải Đề Thi Lên (PDF, Word, Ảnh...)',
          subtitle: 'Tải lên đề thi thử THPT, đề kiểm tra định kỳ định dạng .pdf, .docx để lưu trữ, in ấn và luyện giải.',
          type: 'uploads',
        };
    }
  };

  const info = getTabInfo();

  // Extract chapters for filter
  const currentTabLessons = lessons.filter(l => l.tabCategory === activeTab);
  const chapters = Array.from(new Set(currentTabLessons.map(l => l.chapter)));

  // Current tab statistics
  const currentTabExams = exams.filter(e => {
    if (activeTab === 'ghk-hk') return e.tabCategory === 'ghk-hk';
    if (activeTab === 'dgnl') return e.tabCategory === 'dgnl';
    return false;
  });

  return (
    <div className="bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-10">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 text-xs font-medium text-indigo-700 mb-2">
              <span>{info.badge}</span>
              <span aria-hidden="true" className="text-slate-300">·</span>
              <span>Cập nhật năm học 2025 - 2026</span>
            </div>
            
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 mb-2">
              {info.title}
            </h1>
            
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-4">
              {info.subtitle}
            </p>

            {/* Unboxed Metadata Stats with typographical separators */}
            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 font-medium">
              <span className="flex items-center gap-1.5 text-slate-700">
                <BookOpen className="w-3.5 h-3.5 text-indigo-600" />
                <strong className="font-semibold text-slate-900 tabular-nums">
                  {currentTabLessons.length}
                </strong> chuyên đề bài giảng
              </span>
              <span aria-hidden="true" className="text-slate-300">·</span>
              <span className="flex items-center gap-1.5 text-slate-700">
                <FileText className="w-3.5 h-3.5 text-emerald-600" />
                <strong className="font-semibold text-slate-900 tabular-nums">
                  {currentTabExams.length || exams.length}
                </strong> đề thi thử chuẩn
              </span>
              <span aria-hidden="true" className="text-slate-300">·</span>
              <span className="flex items-center gap-1.5 text-slate-700">
                <CheckCircle2 className="w-3.5 h-3.5 text-sky-600" />
                Lời giải chi tiết 100%
              </span>
            </div>
          </div>

          {/* Quick Teacher Actions in Hero */}
          {isTeacherMode && (
            <div className="shrink-0 flex flex-col sm:flex-row items-stretch sm:items-center gap-2 p-3 bg-amber-50/70 border border-amber-200/80 rounded-xl">
              <div className="text-xs text-amber-900 font-medium px-1">
                Khu vực giáo viên:
              </div>
              <button
                onClick={() => openStudioForLesson()}
                className="flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold text-indigo-700 bg-white border border-indigo-200 rounded-lg hover:bg-indigo-50 transition-colors shadow-2xs cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Thêm bài giảng mới</span>
              </button>
              <button
                onClick={() => openStudioForExam()}
                className="flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold text-emerald-800 bg-white border border-emerald-200 rounded-lg hover:bg-emerald-50 transition-colors shadow-2xs cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Thêm đề thi thử</span>
              </button>
            </div>
          )}
        </div>

        {/* Search & Filter Toolbar */}
        <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          {/* Search Box */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Tìm kiếm bài giảng, công thức, đề thi..."
              className="w-full pl-9 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all text-slate-900 placeholder:text-slate-400"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 px-1 py-0.5"
              >
                Xoá
              </button>
            )}
          </div>

          {/* Chapter Filter if in Lesson Tab */}
          {info.type === 'lessons' && chapters.length > 0 && (
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500 whitespace-nowrap">Chương:</span>
              <select
                value={selectedChapter}
                onChange={e => setSelectedChapter(e.target.value)}
                className="text-xs bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="all">Tất cả các chương</option>
                {chapters.map(ch => (
                  <option key={ch} value={ch}>
                    {ch}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
