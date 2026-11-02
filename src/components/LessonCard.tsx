import React from 'react';
import { Lesson } from '../types';
import { useMathPortal } from '../context/MathPortalContext';
import { MathText } from './MathText';
import { BookOpen, Bookmark, Edit3, Trash2, ArrowRight, FileText, CheckCircle2 } from 'lucide-react';

interface LessonCardProps {
  lesson: Lesson;
}

export const LessonCard: React.FC<LessonCardProps> = ({ lesson }) => {
  const {
    setActiveLessonModal,
    isTeacherMode,
    openStudioForLesson,
    deleteLesson,
    bookmarks,
    toggleBookmark,
  } = useMathPortal();

  const isBookmarked = bookmarks.includes(lesson.id);

  return (
    <article className="group bg-white rounded-xl border border-slate-200 p-5 hover:border-indigo-300 hover:shadow-sm transition-all duration-200 flex flex-col justify-between">
      <div>
        {/* Top Kicker: Clean unboxed metadata with dot separators */}
        <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
          <div className="flex items-center gap-1.5 truncate">
            <span className="font-medium text-indigo-700">{lesson.chapter}</span>
            <span aria-hidden="true" className="text-slate-300">·</span>
            <span>Khối {lesson.grade}</span>
          </div>

          <div className="flex items-center gap-1 shrink-0 ml-2">
            <button
              onClick={() => toggleBookmark(lesson.id)}
              className={`p-1 rounded hover:bg-slate-100 transition-colors cursor-pointer ${
                isBookmarked ? 'text-amber-500' : 'text-slate-400 hover:text-slate-600'
              }`}
              title={isBookmarked ? 'Bỏ lưu bài học' : 'Lưu vào danh sách học tập'}
            >
              <Bookmark className="w-4 h-4" fill={isBookmarked ? 'currentColor' : 'none'} />
            </button>

            {isTeacherMode && (
              <>
                <button
                  onClick={() => openStudioForLesson(lesson)}
                  className="p-1 text-slate-400 hover:text-indigo-600 rounded hover:bg-slate-100 transition-colors cursor-pointer"
                  title="Chỉnh sửa bài giảng"
                >
                  <Edit3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => deleteLesson(lesson.id)}
                  className="p-1 text-slate-400 hover:text-rose-600 rounded hover:bg-slate-100 transition-colors cursor-pointer"
                  title="Xoá bài giảng"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </>
            )}
          </div>
        </div>

        {/* Title */}
        <h3
          onClick={() => setActiveLessonModal(lesson)}
          className="text-base font-bold text-slate-900 group-hover:text-indigo-600 transition-colors cursor-pointer mb-2 line-clamp-2"
        >
          {lesson.title}
        </h3>

        {/* Description */}
        <p className="text-xs sm:text-sm text-slate-600 line-clamp-2 mb-4 leading-relaxed">
          {lesson.description}
        </p>

        {/* Key Formula Spotlight (if available) */}
        {lesson.keyFormulas && lesson.keyFormulas.length > 0 && (
          <div className="mb-4 p-2.5 bg-slate-50 border border-slate-100 rounded-lg text-xs font-mono text-slate-800 overflow-x-auto">
            <span className="text-[10px] uppercase font-sans font-semibold tracking-wider text-slate-500 block mb-1">
              Công thức trọng tâm
            </span>
            <MathText>{`$${lesson.keyFormulas[0]}$`}</MathText>
          </div>
        )}
      </div>

      {/* Card Footer: Metadata and Action Button */}
      <div className="pt-3 border-t border-slate-100 flex items-center justify-between mt-auto">
        <div className="flex items-center gap-3 text-xs text-slate-500">
          <span className="flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-slate-400" />
            <span className="tabular-nums font-medium text-slate-700">
              {lesson.practiceQuestions.length}
            </span> câu hỏi
          </span>
          {lesson.pdfUrl && (
            <span className="flex items-center gap-1 text-slate-500">
              <FileText className="w-3.5 h-3.5 text-slate-400" />
              <span>Tài liệu</span>
            </span>
          )}
        </div>

        <button
          onClick={() => setActiveLessonModal(lesson)}
          className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 hover:text-indigo-800 transition-colors cursor-pointer"
        >
          <span>Học bài</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>
    </article>
  );
};
