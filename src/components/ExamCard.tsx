import React from 'react';
import { Exam } from '../types';
import { useMathPortal } from '../context/MathPortalContext';
import { Clock, HelpCircle, Award, Play, Edit3, Trash2, FileDown, BookOpen } from 'lucide-react';

interface ExamCardProps {
  exam: Exam;
}

export const ExamCard: React.FC<ExamCardProps> = ({ exam }) => {
  const {
    setActiveExamModal,
    isTeacherMode,
    openStudioForExam,
    deleteExam,
  } = useMathPortal();

  return (
    <article className="group bg-white rounded-xl border border-slate-200 p-5 hover:border-indigo-300 hover:shadow-sm transition-all duration-200 flex flex-col justify-between">
      <div>
        {/* Top Kicker: Clean unboxed metadata */}
        <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
          <div className="flex items-center gap-1.5 truncate">
            <span className="font-semibold text-indigo-700">{exam.examType}</span>
            <span aria-hidden="true" className="text-slate-300">·</span>
            <span>Năm {exam.year}</span>
            <span aria-hidden="true" className="text-slate-300">·</span>
            <span>Dành cho: {exam.gradeTarget === 'ĐGNL' ? 'ĐGNL' : `Lớp ${exam.gradeTarget}`}</span>
          </div>

          {isTeacherMode && (
            <div className="flex items-center gap-1 shrink-0 ml-2">
              <button
                onClick={() => openStudioForExam(exam)}
                className="p-1 text-slate-400 hover:text-indigo-600 rounded hover:bg-slate-100 transition-colors cursor-pointer"
                title="Chỉnh sửa đề thi"
              >
                <Edit3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => deleteExam(exam.id)}
                className="p-1 text-slate-400 hover:text-rose-600 rounded hover:bg-slate-100 transition-colors cursor-pointer"
                title="Xoá đề thi"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        {/* Title */}
        <h3
          onClick={() => setActiveExamModal(exam)}
          className="text-base font-bold text-slate-900 group-hover:text-indigo-600 transition-colors cursor-pointer mb-2 line-clamp-2"
        >
          {exam.title}
        </h3>

        {/* Description */}
        <p className="text-xs sm:text-sm text-slate-600 line-clamp-2 mb-4 leading-relaxed">
          {exam.description}
        </p>

        {/* Parameters Box (Clean unboxed tabular stats) */}
        <div className="grid grid-cols-3 gap-2 p-3 bg-slate-50 border border-slate-100 rounded-lg text-center mb-4">
          <div>
            <span className="text-[10px] text-slate-500 block uppercase font-medium">Thời gian</span>
            <span className="text-xs font-bold text-slate-900 tabular-nums">
              {exam.timeMinutes} phút
            </span>
          </div>
          <div className="border-x border-slate-200">
            <span className="text-[10px] text-slate-500 block uppercase font-medium">Số câu</span>
            <span className="text-xs font-bold text-slate-900 tabular-nums">
              {exam.questions.length} câu
            </span>
          </div>
          <div>
            <span className="text-[10px] text-slate-500 block uppercase font-medium">Thang điểm</span>
            <span className="text-xs font-bold text-slate-900 tabular-nums">
              {exam.maxScore}đ
            </span>
          </div>
        </div>
      </div>

      {/* Card Actions */}
      <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2 mt-auto">
        {exam.pdfUrl ? (
          <a
            href={exam.pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs text-slate-500 hover:text-slate-800 transition-colors"
          >
            <FileDown className="w-3.5 h-3.5" />
            <span>Tải đề PDF</span>
          </a>
        ) : (
          <span className="text-xs text-slate-400">Đề thi số hoá</span>
        )}

        <button
          onClick={() => setActiveExamModal(exam)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 rounded-lg transition-colors shadow-2xs cursor-pointer"
        >
          <Play className="w-3 h-3 fill-current" />
          <span>Vào thi thử</span>
        </button>
      </div>
    </article>
  );
};
