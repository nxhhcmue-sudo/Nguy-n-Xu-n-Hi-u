import React, { useState } from 'react';
import { Lesson } from '../types';
import { useMathPortal } from '../context/MathPortalContext';
import { MathText } from './MathText';
import {
  X,
  BookOpen,
  Bookmark,
  CheckCircle,
  HelpCircle,
  FileDown,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Share2,
  Video,
  ListOrdered
} from 'lucide-react';

interface LessonDetailModalProps {
  lesson: Lesson;
  onClose: () => void;
}

export const LessonDetailModal: React.FC<LessonDetailModalProps> = ({ lesson, onClose }) => {
  const { bookmarks, toggleBookmark } = useMathPortal();
  const [activeTab, setActiveTab] = useState<'theory' | 'formulas' | 'examples' | 'quiz'>('theory');
  const [expandedExamples, setExpandedExamples] = useState<Record<string, boolean>>({
    'ex-0': true,
  });
  const [selectedQuizAnswers, setSelectedQuizAnswers] = useState<Record<string, 'A' | 'B' | 'C' | 'D'>>({});
  const [revealedQuizAnswers, setRevealedQuizAnswers] = useState<Record<string, boolean>>({});

  const isBookmarked = bookmarks.includes(lesson.id);

  const toggleExampleSolution = (id: string) => {
    setExpandedExamples(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const selectQuizAnswer = (qId: string, opt: 'A' | 'B' | 'C' | 'D') => {
    setSelectedQuizAnswers(prev => ({ ...prev, [qId]: opt }));
  };

  const revealQuizAnswer = (qId: string) => {
    setRevealedQuizAnswers(prev => ({ ...prev, [qId]: true }));
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden border border-slate-200">
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-slate-200 flex items-start justify-between gap-4 bg-slate-50/50">
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-500 mb-1.5 font-medium">
              <span className="text-indigo-600 font-semibold">{lesson.chapter}</span>
              <span aria-hidden="true" className="text-slate-300">·</span>
              <span>Lớp {lesson.grade}</span>
              <span aria-hidden="true" className="text-slate-300">·</span>
              <span>Ngày đăng: {lesson.createdAt}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              {lesson.title}
            </h2>
          </div>

          <div className="flex items-center gap-1 shrink-0">
            <button
              onClick={() => toggleBookmark(lesson.id)}
              className={`p-2 rounded-lg hover:bg-slate-200/60 transition-colors cursor-pointer ${
                isBookmarked ? 'text-amber-500' : 'text-slate-400 hover:text-slate-600'
              }`}
              title="Lưu bài học"
            >
              <Bookmark className="w-5 h-5" fill={isBookmarked ? 'currentColor' : 'none'} />
            </button>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-200/60 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Lesson Sub-Tabs */}
        <div className="px-5 sm:px-6 border-b border-slate-200 flex items-center gap-2 overflow-x-auto bg-white">
          <button
            onClick={() => setActiveTab('theory')}
            className={`py-3 px-3 text-xs sm:text-sm font-semibold border-b-2 whitespace-nowrap cursor-pointer transition-colors ${
              activeTab === 'theory'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            Lý thuyết trọng tâm
          </button>
          <button
            onClick={() => setActiveTab('formulas')}
            className={`py-3 px-3 text-xs sm:text-sm font-semibold border-b-2 whitespace-nowrap cursor-pointer transition-colors ${
              activeTab === 'formulas'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            Công thức ({lesson.keyFormulas?.length || 0})
          </button>
          <button
            onClick={() => setActiveTab('examples')}
            className={`py-3 px-3 text-xs sm:text-sm font-semibold border-b-2 whitespace-nowrap cursor-pointer transition-colors ${
              activeTab === 'examples'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            Ví dụ mẫu ({lesson.examples?.length || 0})
          </button>
          <button
            onClick={() => setActiveTab('quiz')}
            className={`py-3 px-3 text-xs sm:text-sm font-semibold border-b-2 whitespace-nowrap cursor-pointer transition-colors ${
              activeTab === 'quiz'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            Trắc nghiệm tự luyện ({lesson.practiceQuestions?.length || 0})
          </button>
        </div>

        {/* Tab Content Body */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1 text-slate-800 space-y-6">
          {/* TAB 1: THEORY */}
          {activeTab === 'theory' && (
            <div className="space-y-6">
              {/* Optional Video Lesson if available */}
              {lesson.videoUrl && (
                <div className="p-4 bg-slate-900 text-white rounded-xl flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <Video className="w-5 h-5 text-indigo-400" />
                    <div>
                      <div className="text-xs text-slate-400">Video bài giảng đính kèm</div>
                      <div className="text-sm font-medium">Xem video hướng dẫn chuyên đề</div>
                    </div>
                  </div>
                  <a
                    href={lesson.videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors"
                  >
                    <span>Mở video</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              )}

              {/* Theory text with Math formulas */}
              <div className="prose max-w-none text-slate-700 text-sm sm:text-base leading-relaxed space-y-4">
                <MathText as="div" className="whitespace-pre-line">
                  {lesson.content}
                </MathText>
              </div>

              {/* Download PDF button if attached */}
              {lesson.pdfUrl && (
                <div className="p-4 bg-indigo-50/60 border border-indigo-100 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <FileDown className="w-5 h-5 text-indigo-600" />
                    <div>
                      <div className="text-xs font-medium text-indigo-900">Tài liệu bài học (PDF / Slide)</div>
                      <div className="text-xs text-slate-600">Được tải lên bởi giáo viên bộ môn Toán</div>
                    </div>
                  </div>
                  <a
                    href={lesson.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold bg-white border border-indigo-200 text-indigo-700 hover:bg-indigo-50 rounded-lg transition-colors cursor-pointer"
                  >
                    <span>Tải tệp đính kèm</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: KEY FORMULAS */}
          {activeTab === 'formulas' && (
            <div className="space-y-4">
              <p className="text-xs sm:text-sm text-slate-600 mb-2">
                Hệ thống các công thức cốt lõi cần ghi nhớ để giải nhanh các bài toán trắc nghiệm & tự luận:
              </p>
              {lesson.keyFormulas && lesson.keyFormulas.length > 0 ? (
                <div className="grid gap-3">
                  {lesson.keyFormulas.map((f, idx) => (
                    <div
                      key={idx}
                      className="p-4 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between gap-4 overflow-x-auto"
                    >
                      <div className="text-sm sm:text-base font-mono text-slate-900">
                        <MathText>{`$$${f}$$`}</MathText>
                      </div>
                      <span className="text-[11px] text-slate-400 font-mono shrink-0">
                        CT #{idx + 1}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-sm text-slate-500 italic py-6 text-center">
                  Chưa có danh sách công thức riêng cho bài này. Vui lòng xem ở phần Lý thuyết.
                </div>
              )}
            </div>
          )}

          {/* TAB 3: EXAMPLES */}
          {activeTab === 'examples' && (
            <div className="space-y-4">
              {lesson.examples && lesson.examples.length > 0 ? (
                lesson.examples.map((ex, idx) => {
                  const isExpanded = expandedExamples[ex.id || `ex-${idx}`];
                  return (
                    <div
                      key={ex.id || idx}
                      className="border border-slate-200 rounded-xl overflow-hidden bg-white"
                    >
                      <div
                        onClick={() => toggleExampleSolution(ex.id || `ex-${idx}`)}
                        className="p-4 bg-slate-50/80 hover:bg-slate-100/80 transition-colors flex items-center justify-between cursor-pointer"
                      >
                        <h4 className="text-sm font-semibold text-slate-900">
                          {ex.title || `Ví dụ ${idx + 1}`}
                        </h4>
                        <div className="flex items-center gap-2 text-xs text-indigo-600 font-medium">
                          <span>{isExpanded ? 'Ẩn lời giải' : 'Xem lời giải'}</span>
                          {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </div>
                      </div>

                      <div className="p-4 border-t border-slate-100 space-y-3">
                        <div className="text-sm text-slate-800 leading-relaxed font-medium">
                          <MathText>{ex.question}</MathText>
                        </div>

                        {isExpanded && (
                          <div className="mt-3 p-3.5 bg-indigo-50/40 border border-indigo-100 rounded-lg text-sm text-slate-700 leading-relaxed animate-in fade-in duration-150">
                            <span className="text-xs font-bold text-indigo-900 block mb-1">
                              Lời giải chi tiết:
                            </span>
                            <MathText as="div">{ex.solution}</MathText>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="text-sm text-slate-500 italic py-6 text-center">
                  Chưa có ví dụ mẫu nào được thêm cho bài học này.
                </div>
              )}
            </div>
          )}

          {/* TAB 4: PRACTICE QUIZ */}
          {activeTab === 'quiz' && (
            <div className="space-y-6">
              {lesson.practiceQuestions && lesson.practiceQuestions.length > 0 ? (
                lesson.practiceQuestions.map((q, qIdx) => {
                  const selected = selectedQuizAnswers[q.id];
                  const isRevealed = revealedQuizAnswers[q.id];
                  const isCorrect = selected === q.correctAnswer;

                  return (
                    <div
                      key={q.id}
                      className="p-5 border border-slate-200 rounded-xl bg-white space-y-4"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="text-xs text-slate-500 font-semibold">
                          Câu hỏi {qIdx + 1}
                        </div>
                        {isRevealed && (
                          <span
                            className={`text-xs font-semibold px-2 py-0.5 rounded ${
                              isCorrect
                                ? 'bg-emerald-50 text-emerald-700'
                                : 'bg-rose-50 text-rose-700'
                            }`}
                          >
                            {isCorrect ? 'Chính xác' : 'Chưa chính xác'}
                          </span>
                        )}
                      </div>

                      {/* Question Text */}
                      <div className="text-sm sm:text-base font-medium text-slate-900">
                        <MathText>{q.question}</MathText>
                      </div>

                      {/* Options */}
                      <div className="grid sm:grid-cols-2 gap-2.5">
                        {(['A', 'B', 'C', 'D'] as const).map(opt => {
                          const isOptionSelected = selected === opt;
                          const isOptionCorrect = q.correctAnswer === opt;
                          let optStyle = 'border-slate-200 hover:border-indigo-300 hover:bg-slate-50';

                          if (isRevealed) {
                            if (isOptionCorrect) {
                              optStyle = 'border-emerald-500 bg-emerald-50/50 text-emerald-900 font-medium';
                            } else if (isOptionSelected && !isCorrect) {
                              optStyle = 'border-rose-400 bg-rose-50 text-rose-900';
                            }
                          } else if (isOptionSelected) {
                            optStyle = 'border-indigo-600 bg-indigo-50 text-indigo-900 font-medium';
                          }

                          return (
                            <button
                              key={opt}
                              type="button"
                              onClick={() => !isRevealed && selectQuizAnswer(q.id, opt)}
                              className={`p-3 rounded-lg border text-left text-xs sm:text-sm flex items-start gap-2.5 transition-all cursor-pointer ${optStyle}`}
                            >
                              <span className="font-bold text-slate-500 shrink-0">{opt}.</span>
                              <div className="flex-1">
                                <MathText>{q.options[opt]}</MathText>
                              </div>
                            </button>
                          );
                        })}
                      </div>

                      {/* Check Button & Explanation */}
                      <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-slate-100">
                        <div>
                          {!isRevealed ? (
                            <button
                              disabled={!selected}
                              onClick={() => revealQuizAnswer(q.id)}
                              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                                selected
                                  ? 'bg-indigo-600 hover:bg-indigo-700 text-white cursor-pointer'
                                  : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                              }`}
                            >
                              Kiểm tra đáp án
                            </button>
                          ) : (
                            <span className="text-xs text-slate-500">
                              Đáp án đúng: <strong className="text-emerald-700 font-bold">{q.correctAnswer}</strong>
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Explanation box */}
                      {isRevealed && (
                        <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-lg text-xs sm:text-sm text-slate-700 leading-relaxed animate-in fade-in duration-150">
                          <strong className="text-slate-900 block mb-1">Hướng dẫn giải:</strong>
                          <MathText as="div">{q.explanation}</MathText>
                        </div>
                      )}
                    </div>
                  );
                })
              ) : (
                <div className="text-sm text-slate-500 italic py-6 text-center">
                  Chưa có câu hỏi trắc nghiệm nào cho bài học này.
                </div>
              )}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:px-6 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
          <div className="text-xs text-slate-500">
            {lesson.author && <span>Biên soạn: {lesson.author}</span>}
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
          >
            Đóng bài học
          </button>
        </div>
      </div>
    </div>
  );
};
