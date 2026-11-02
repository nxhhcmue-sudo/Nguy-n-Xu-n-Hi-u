import React, { useState, useEffect } from 'react';
import { Exam, ExamResult } from '../types';
import { useMathPortal } from '../context/MathPortalContext';
import { useAuth } from '../context/AuthContext';
import { MathText } from './MathText';
import {
  X,
  Clock,
  Flag,
  CheckCircle2,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  BookOpen,
  Award,
  ArrowRight,
  UserCheck
} from 'lucide-react';

interface ExamSimulatorModalProps {
  exam: Exam;
  onClose: () => void;
}

export const ExamSimulatorModal: React.FC<ExamSimulatorModalProps> = ({ exam, onClose }) => {
  const { saveExamResult } = useMathPortal();
  const { currentUser, recordExamSubmission, openLoginModal } = useAuth();

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, 'A' | 'B' | 'C' | 'D'>>({});
  const [flaggedQuestions, setFlaggedQuestions] = useState<Record<string, boolean>>({});
  const [timeLeftSeconds, setTimeLeftSeconds] = useState(exam.timeMinutes * 60);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showConfirmSubmit, setShowConfirmSubmit] = useState(false);
  const [examResult, setExamResult] = useState<ExamResult | null>(null);

  // Timer countdown
  useEffect(() => {
    if (isSubmitted) return;

    const timer = setInterval(() => {
      setTimeLeftSeconds(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmitExam();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isSubmitted]);

  const currentQ = exam.questions[currentQuestionIndex];
  const totalQuestions = exam.questions.length;

  const selectAnswer = (option: 'A' | 'B' | 'C' | 'D') => {
    if (isSubmitted || !currentQ) return;
    setUserAnswers(prev => ({
      ...prev,
      [currentQ.id]: option,
    }));
  };

  const toggleFlag = (qId: string) => {
    setFlaggedQuestions(prev => ({
      ...prev,
      [qId]: !prev[qId],
    }));
  };

  const handleSubmitExam = () => {
    setShowConfirmSubmit(false);
    setIsSubmitted(true);

    // Calculate score
    let correctCount = 0;
    exam.questions.forEach(q => {
      if (userAnswers[q.id] === q.correctAnswer) {
        correctCount++;
      }
    });

    const calculatedScore = totalQuestions > 0 
      ? Math.round((correctCount / totalQuestions) * exam.maxScore * 10) / 10 
      : 0;

    const timeSpent = exam.timeMinutes * 60 - timeLeftSeconds;
    const result: ExamResult = {
      examId: exam.id,
      examTitle: exam.title,
      score: calculatedScore,
      totalQuestions,
      correctAnswersCount: correctCount,
      timeSpentSeconds: timeSpent,
      completedAt: new Date().toISOString(),
      answers: userAnswers,
    };

    setExamResult(result);
    saveExamResult(result);

    // Save to user account submission history
    recordExamSubmission({
      examId: exam.id,
      examTitle: exam.title,
      examType: exam.examType,
      score: calculatedScore,
      maxScore: exam.maxScore,
      correctCount,
      totalQuestions,
      timeSpentSeconds: timeSpent,
      answers: userAnswers,
    });
  };

  const handleRetake = () => {
    setUserAnswers({});
    setFlaggedQuestions({});
    setTimeLeftSeconds(exam.timeMinutes * 60);
    setIsSubmitted(false);
    setExamResult(null);
    setCurrentQuestionIndex(0);
  };

  // Format time
  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const answeredCount = Object.keys(userAnswers).length;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl h-[94vh] flex flex-col overflow-hidden border border-slate-200">
        {/* Top bar */}
        <div className="px-4 sm:px-6 py-3.5 border-b border-slate-200 flex items-center justify-between gap-4 bg-slate-50">
          <div className="flex items-center gap-3 truncate">
            <span className="font-bold text-xs uppercase px-2 py-0.5 bg-indigo-100 text-indigo-800 rounded">
              {exam.examType}
            </span>
            <h2 className="text-sm sm:text-base font-bold text-slate-900 truncate">
              {exam.title}
            </h2>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            {/* Real-time countdown timer */}
            {!isSubmitted ? (
              <div
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold font-mono tabular-nums ${
                  timeLeftSeconds < 300
                    ? 'bg-rose-100 text-rose-700 animate-pulse'
                    : 'bg-indigo-50 text-indigo-700 border border-indigo-200'
                }`}
              >
                <Clock className="w-4 h-4" />
                <span>{formatTimer(timeLeftSeconds)}</span>
              </div>
            ) : (
              <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded">
                Đã hoàn thành
              </span>
            )}

            {!isSubmitted && (
              <button
                onClick={() => setShowConfirmSubmit(true)}
                className="px-3.5 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 rounded-lg transition-colors cursor-pointer shadow-2xs"
              >
                Nộp bài
              </button>
            )}

            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-200/60 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Main Area: Split Screen */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
          {/* Main Question / Result Area */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-6">
            {/* If Exam is Submitted, show Results Card first */}
            {isSubmitted && examResult && (
              <div className="p-6 bg-gradient-to-br from-indigo-50/80 to-slate-50 border border-indigo-200 rounded-2xl mb-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-indigo-100">
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600 block mb-1">
                      Kết quả thi thử
                    </span>
                    <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                      Điểm số: {examResult.score} / {exam.maxScore}
                    </h3>
                  </div>

                  <button
                    onClick={handleRetake}
                    className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-indigo-700 bg-white border border-indigo-300 rounded-lg hover:bg-indigo-50 transition-colors shadow-2xs cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Làm lại đề thi này</span>
                  </button>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4 text-center">
                  <div className="p-2.5 bg-white rounded-xl border border-indigo-50">
                    <span className="text-[10px] text-slate-500 block uppercase">Số câu đúng</span>
                    <span className="text-base font-bold text-emerald-600 tabular-nums">
                      {examResult.correctAnswersCount} / {totalQuestions}
                    </span>
                  </div>
                  <div className="p-2.5 bg-white rounded-xl border border-indigo-50">
                    <span className="text-[10px] text-slate-500 block uppercase">Số câu sai</span>
                    <span className="text-base font-bold text-rose-600 tabular-nums">
                      {totalQuestions - examResult.correctAnswersCount}
                    </span>
                  </div>
                  <div className="p-2.5 bg-white rounded-xl border border-indigo-50">
                    <span className="text-[10px] text-slate-500 block uppercase">Thời gian làm bài</span>
                    <span className="text-base font-bold text-slate-700 tabular-nums">
                      {formatTimer(examResult.timeSpentSeconds)}
                    </span>
                  </div>
                  <div className="p-2.5 bg-white rounded-xl border border-indigo-50">
                    <span className="text-[10px] text-slate-500 block uppercase">Tỉ lệ chính xác</span>
                    <span className="text-base font-bold text-indigo-600 tabular-nums">
                      {Math.round((examResult.correctAnswersCount / totalQuestions) * 100)}%
                    </span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-indigo-100 flex items-center justify-between text-xs">
                  {currentUser ? (
                    <div className="flex items-center gap-1.5 text-indigo-900 font-medium">
                      <UserCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Kết quả thi đã được tự động ghi nhận vào học bạ cá nhân của <strong>{currentUser.name}</strong></span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <span className="text-slate-500">Bạn đang làm bài thi tự do.</span>
                      <button
                        onClick={openLoginModal}
                        className="font-bold text-indigo-600 hover:underline cursor-pointer"
                      >
                        Đăng nhập để lưu điểm
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Active Question Box */}
            {currentQ && (
              <div className="space-y-6">
                <div className="flex items-center justify-between gap-3 text-xs text-slate-500 pb-3 border-b border-slate-100 font-medium">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-indigo-700">
                      Câu {currentQuestionIndex + 1}
                    </span>
                    <span aria-hidden="true" className="text-slate-300">/</span>
                    <span>{totalQuestions} câu</span>
                    {currentQ.chapter && (
                      <>
                        <span aria-hidden="true" className="text-slate-300">·</span>
                        <span className="text-slate-600">{currentQ.chapter}</span>
                      </>
                    )}
                    {currentQ.difficulty && (
                      <>
                        <span aria-hidden="true" className="text-slate-300">·</span>
                        <span className="text-slate-600 font-medium">{currentQ.difficulty}</span>
                      </>
                    )}
                  </div>

                  {!isSubmitted && (
                    <button
                      onClick={() => toggleFlag(currentQ.id)}
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium transition-colors cursor-pointer ${
                        flaggedQuestions[currentQ.id]
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      <Flag className="w-3.5 h-3.5" fill={flaggedQuestions[currentQ.id] ? 'currentColor' : 'none'} />
                      <span>{flaggedQuestions[currentQ.id] ? 'Đã đánh dấu' : 'Đánh dấu xem lại'}</span>
                    </button>
                  )}
                </div>

                {/* Question Statement */}
                <div className="text-base sm:text-lg font-semibold text-slate-900 leading-relaxed">
                  <MathText>{currentQ.question}</MathText>
                </div>

                {/* Options List */}
                <div className="space-y-3">
                  {(['A', 'B', 'C', 'D'] as const).map(opt => {
                    const isSelected = userAnswers[currentQ.id] === opt;
                    const isCorrectAnswer = currentQ.correctAnswer === opt;
                    let style = 'border-slate-200 hover:border-indigo-300 hover:bg-slate-50 text-slate-800';

                    if (isSubmitted) {
                      if (isCorrectAnswer) {
                        style = 'border-emerald-500 bg-emerald-50/70 text-emerald-950 font-semibold ring-1 ring-emerald-500';
                      } else if (isSelected && !isCorrectAnswer) {
                        style = 'border-rose-400 bg-rose-50 text-rose-900';
                      }
                    } else if (isSelected) {
                      style = 'border-indigo-600 bg-indigo-50/80 text-indigo-950 font-semibold ring-1 ring-indigo-600';
                    }

                    return (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => selectAnswer(opt)}
                        disabled={isSubmitted}
                        className={`w-full p-4 rounded-xl border text-left text-sm sm:text-base flex items-start gap-3 transition-all cursor-pointer ${style}`}
                      >
                        <span className="w-6 h-6 rounded-full border border-current flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                          {opt}
                        </span>
                        <div className="flex-1">
                          <MathText>{currentQ.options[opt]}</MathText>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* If submitted, show full step-by-step solution */}
                {isSubmitted && (
                  <div className="p-4 sm:p-5 bg-slate-50 border border-slate-200 rounded-xl space-y-2 animate-in fade-in duration-150">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-900 uppercase">
                        Lời giải chi tiết:
                      </span>
                      <span className="text-xs text-slate-500">
                        (Đáp án đúng: <strong className="text-emerald-700 font-bold">{currentQ.correctAnswer}</strong>)
                      </span>
                    </div>
                    <div className="text-sm text-slate-700 leading-relaxed font-normal">
                      <MathText as="div">{currentQ.explanation}</MathText>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Sidebar / Question Palette Grid */}
          <div className="w-full md:w-72 lg:w-80 bg-slate-50/80 border-t md:border-t-0 md:border-l border-slate-200 p-4 sm:p-5 flex flex-col justify-between overflow-y-auto">
            <div>
              <div className="flex items-center justify-between text-xs text-slate-600 font-semibold mb-3">
                <span>BẢNG CÂU HỎI</span>
                <span className="tabular-nums">
                  Đã làm: {answeredCount}/{totalQuestions}
                </span>
              </div>

              {/* Grid 1..N */}
              <div className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-5 gap-2">
                {exam.questions.map((q, idx) => {
                  const isCurrent = idx === currentQuestionIndex;
                  const isAnswered = !!userAnswers[q.id];
                  const isFlagged = !!flaggedQuestions[q.id];
                  const isCorrect = userAnswers[q.id] === q.correctAnswer;

                  let btnStyle = 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100';

                  if (isSubmitted) {
                    if (isCorrect) {
                      btnStyle = 'bg-emerald-600 text-white border-emerald-600';
                    } else if (isAnswered) {
                      btnStyle = 'bg-rose-500 text-white border-rose-500';
                    } else {
                      btnStyle = 'bg-slate-200 text-slate-500 border-slate-200';
                    }
                  } else {
                    if (isAnswered) {
                      btnStyle = 'bg-indigo-600 text-white border-indigo-600 font-bold';
                    } else if (isFlagged) {
                      btnStyle = 'bg-amber-100 text-amber-900 border-amber-300 font-medium';
                    }
                  }

                  if (isCurrent) {
                    btnStyle += ' ring-2 ring-indigo-500 ring-offset-1';
                  }

                  return (
                    <button
                      key={q.id}
                      onClick={() => setCurrentQuestionIndex(idx)}
                      className={`h-9 rounded-lg border text-xs font-semibold flex items-center justify-center transition-all cursor-pointer relative tabular-nums ${btnStyle}`}
                    >
                      {idx + 1}
                      {isFlagged && !isSubmitted && (
                        <span className="absolute top-0.5 right-0.5 w-1.5 h-1.5 bg-amber-500 rounded-full" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Legend */}
              <div className="mt-6 pt-4 border-t border-slate-200 space-y-1.5 text-[11px] text-slate-500">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded bg-indigo-600 shrink-0" />
                  <span>Đã trả lời ({answeredCount})</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded bg-white border border-slate-300 shrink-0" />
                  <span>Chưa trả lời ({totalQuestions - answeredCount})</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded bg-amber-100 border border-amber-300 shrink-0" />
                  <span>Đã đánh dấu xem lại</span>
                </div>
              </div>
            </div>

            {/* Prev / Next controls */}
            <div className="pt-4 border-t border-slate-200 flex items-center justify-between gap-2 mt-4">
              <button
                disabled={currentQuestionIndex === 0}
                onClick={() => setCurrentQuestionIndex(prev => prev - 1)}
                className={`flex-1 py-2 px-3 text-xs font-medium rounded-lg border flex items-center justify-center gap-1 transition-colors ${
                  currentQuestionIndex === 0
                    ? 'border-slate-200 text-slate-300 cursor-not-allowed'
                    : 'border-slate-300 bg-white text-slate-700 hover:bg-slate-100 cursor-pointer'
                }`}
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Câu trước</span>
              </button>

              <button
                disabled={currentQuestionIndex === totalQuestions - 1}
                onClick={() => setCurrentQuestionIndex(prev => prev + 1)}
                className={`flex-1 py-2 px-3 text-xs font-medium rounded-lg border flex items-center justify-center gap-1 transition-colors ${
                  currentQuestionIndex === totalQuestions - 1
                    ? 'border-slate-200 text-slate-300 cursor-not-allowed'
                    : 'border-indigo-600 bg-indigo-600 text-white hover:bg-indigo-700 cursor-pointer'
                }`}
              >
                <span>Câu tiếp</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Confirm Submit Dialog */}
      {showConfirmSubmit && (
        <div className="fixed inset-0 z-60 bg-slate-900/40 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <h3 className="text-lg font-bold text-slate-900">Xác nhận nộp bài thi?</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Bạn đã hoàn thành <strong className="text-indigo-600 tabular-nums">{answeredCount}</strong> / {totalQuestions} câu hỏi.
              {answeredCount < totalQuestions && (
                <span className="block mt-1 text-amber-600 font-medium">
                  Lưu ý: Vẫn còn {totalQuestions - answeredCount} câu chưa chọn đáp án!
                </span>
              )}
            </p>
            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setShowConfirmSubmit(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100 rounded-lg cursor-pointer"
              >
                Làm tiếp
              </button>
              <button
                onClick={handleSubmitExam}
                className="px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg cursor-pointer shadow-sm"
              >
                Đồng ý nộp bài
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
