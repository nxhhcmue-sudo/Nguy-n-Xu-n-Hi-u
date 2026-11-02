import React, { useState } from 'react';
import { useMathPortal } from '../context/MathPortalContext';
import { TabCategory, Lesson, Exam, MultipleChoiceQuestion, ExampleProblem } from '../types';
import { MathText } from './MathText';
import {
  X,
  Plus,
  Trash2,
  Save,
  BookOpen,
  FileText,
  Eye,
  HelpCircle,
  CheckCircle2,
  Layers,
  Sparkles
} from 'lucide-react';

export const TeacherStudioModal: React.FC = () => {
  const {
    isStudioOpen,
    closeStudio,
    editingLesson,
    editingExam,
    saveLesson,
    saveExam,
    activeTab,
  } = useMathPortal();

  // Mode: 'lesson' or 'exam'
  const [studioMode, setStudioMode] = useState<'lesson' | 'exam'>(
    editingExam ? 'exam' : 'lesson'
  );

  // Preview toggle for formula checking
  const [showFormulaPreview, setShowFormulaPreview] = useState(false);

  // Lesson Form State
  const [lessonTitle, setLessonTitle] = useState(editingLesson?.title || '');
  const [lessonCategory, setLessonCategory] = useState<TabCategory>(
    editingLesson?.tabCategory || (activeTab === 'ghk-hk' || activeTab === 'dgnl' ? 'toan-10' : activeTab)
  );
  const [lessonGrade, setLessonGrade] = useState<'10' | '11' | '12' | 'Chung'>(
    editingLesson?.grade || (activeTab === 'toan-11' ? '11' : activeTab === 'toan-12' ? '12' : '10')
  );
  const [lessonChapter, setLessonChapter] = useState(editingLesson?.chapter || '');
  const [lessonDescription, setLessonDescription] = useState(editingLesson?.description || '');
  const [lessonContent, setLessonContent] = useState(
    editingLesson?.content ||
      `### 1. Kiến thức cơ bản\nNội dung lý thuyết trọng tâm của bài...\n\n### 2. Các dạng toán thường gặp\n- Dạng 1: Nhận biết và thông hiểu.\n- Dạng 2: Vận dụng giải phương trình $f(x) = 0$.`
  );
  const [lessonKeyFormulas, setLessonKeyFormulas] = useState<string[]>(
    editingLesson?.keyFormulas || ['y = ax^2 + bx + c', '\\Delta = b^2 - 4ac']
  );
  const [formulaInput, setFormulaInput] = useState('');
  const [lessonPdfUrl, setLessonPdfUrl] = useState(editingLesson?.pdfUrl || '');
  const [lessonVideoUrl, setLessonVideoUrl] = useState(editingLesson?.videoUrl || '');

  // Examples in Lesson
  const [examples, setExamples] = useState<ExampleProblem[]>(
    editingLesson?.examples || [
      {
        id: 'ex-1',
        title: 'Ví dụ 1: Tìm tập xác định',
        question: 'Tìm tập xác định $D$ của hàm số $y = \\sqrt{2x - 4}$.',
        solution: 'Hàm số xác định khi $2x - 4 \\ge 0 \\iff 2x \\ge 4 \\iff x \\ge 2$.\nVậy tập xác định là $D = [2; +\\infty)$.',
      },
    ]
  );

  // Practice Questions in Lesson
  const [lessonQuestions, setLessonQuestions] = useState<MultipleChoiceQuestion[]>(
    editingLesson?.practiceQuestions || [
      {
        id: 'q-1',
        question: 'Tập nghiệm của phương trình $x^2 - 4 = 0$ là:',
        options: {
          A: '\\{-2; 2\\}',
          B: '\\{2\\}',
          C: '\\{-2\\}',
          D: '\\emptyset',
        },
        correctAnswer: 'A',
        explanation: 'Ta có $x^2 - 4 = 0 \\iff x^2 = 4 \\iff x = \\pm 2$.',
      },
    ]
  );

  // Exam Form State
  const [examTitle, setExamTitle] = useState(editingExam?.title || '');
  const [examCategory, setExamCategory] = useState<'ghk-hk' | 'dgnl'>(
    (editingExam?.tabCategory as any) || (activeTab === 'dgnl' ? 'dgnl' : 'ghk-hk')
  );
  const [examType, setExamType] = useState<any>(
    editingExam?.examType || (activeTab === 'dgnl' ? 'ĐGNL ĐHQG-HCM' : 'Giữa HK1')
  );
  const [examGradeTarget, setExamGradeTarget] = useState<any>(
    editingExam?.gradeTarget || (activeTab === 'dgnl' ? 'ĐGNL' : '12')
  );
  const [examTimeMinutes, setExamTimeMinutes] = useState(editingExam?.timeMinutes || 90);
  const [examMaxScore, setExamMaxScore] = useState(editingExam?.maxScore || (activeTab === 'dgnl' ? 300 : 10));
  const [examYear, setExamYear] = useState(editingExam?.year || '2026');
  const [examDescription, setExamDescription] = useState(editingExam?.description || '');
  const [examPdfUrl, setExamPdfUrl] = useState(editingExam?.pdfUrl || '');
  const [examQuestions, setExamQuestions] = useState<MultipleChoiceQuestion[]>(
    editingExam?.questions || [
      {
        id: 'eq-1',
        question: 'Đạo hàm của hàm số $y = x^3 - 3x$ là:',
        options: {
          A: 'y\' = 3x^2 - 3',
          B: 'y\' = 3x^2 - 3x',
          C: 'y\' = x^2 - 3',
          D: 'y\' = 3x^2 + 3',
        },
        correctAnswer: 'A',
        explanation: 'Áp dụng công thức đạo hàm luỹ thừa $(x^n)\' = n x^{n-1}$, ta có $y\' = 3x^2 - 3$.',
        chapter: 'Đạo hàm',
        difficulty: 'Nhận biết',
      },
    ]
  );

  if (!isStudioOpen) return null;

  // Handlers for Formulas
  const addFormula = () => {
    if (formulaInput.trim()) {
      setLessonKeyFormulas(prev => [...prev, formulaInput.trim()]);
      setFormulaInput('');
    }
  };

  const removeFormula = (idx: number) => {
    setLessonKeyFormulas(prev => prev.filter((_, i) => i !== idx));
  };

  // Handlers for Examples
  const addExample = () => {
    setExamples(prev => [
      ...prev,
      {
        id: 'ex-' + Date.now(),
        title: `Ví dụ ${prev.length + 1}: Áp dụng công thức`,
        question: 'Nội dung đề bài ví dụ mẫu (hỗ trợ công thức $...$)...',
        solution: 'Các bước giải chi tiết từng bước...',
      },
    ]);
  };

  const updateExample = (index: number, field: keyof ExampleProblem, value: string) => {
    setExamples(prev =>
      prev.map((item, idx) => (idx === index ? { ...item, [field]: value } : item))
    );
  };

  const removeExample = (index: number) => {
    setExamples(prev => prev.filter((_, i) => i !== index));
  };

  // Handlers for Questions
  const addQuestion = (isExam = false) => {
    const newQ: MultipleChoiceQuestion = {
      id: 'q-' + Date.now(),
      question: 'Nội dung câu hỏi trắc nghiệm mới (hỗ trợ công thức toán $...$)...',
      options: {
        A: 'Phương án A',
        B: 'Phương án B',
        C: 'Phương án C',
        D: 'Phương án D',
      },
      correctAnswer: 'A',
      explanation: 'Hướng dẫn giải chi tiết cho câu hỏi...',
      chapter: 'Chuyên đề chung',
      difficulty: 'Thông hiểu',
    };

    if (isExam) {
      setExamQuestions(prev => [...prev, newQ]);
    } else {
      setLessonQuestions(prev => [...prev, newQ]);
    }
  };

  const updateQuestion = (
    index: number,
    field: keyof MultipleChoiceQuestion,
    value: any,
    isExam = false
  ) => {
    const setter = isExam ? setExamQuestions : setLessonQuestions;
    setter(prev =>
      prev.map((item, idx) => (idx === index ? { ...item, [field]: value } : item))
    );
  };

  const updateQuestionOption = (
    qIndex: number,
    optKey: 'A' | 'B' | 'C' | 'D',
    val: string,
    isExam = false
  ) => {
    const setter = isExam ? setExamQuestions : setLessonQuestions;
    setter(prev =>
      prev.map((item, idx) => {
        if (idx === qIndex) {
          return {
            ...item,
            options: {
              ...item.options,
              [optKey]: val,
            },
          };
        }
        return item;
      })
    );
  };

  const removeQuestion = (index: number, isExam = false) => {
    const setter = isExam ? setExamQuestions : setLessonQuestions;
    setter(prev => prev.filter((_, i) => i !== index));
  };

  // Save Lesson
  const handleSaveLesson = (e: React.FormEvent) => {
    e.preventDefault();
    if (!lessonTitle.trim()) {
      alert('Vui lòng nhập tiêu đề bài học!');
      return;
    }

    saveLesson({
      title: lessonTitle,
      tabCategory: lessonCategory,
      grade: lessonGrade,
      chapter: lessonChapter || 'Chuyên đề chung',
      description: lessonDescription,
      content: lessonContent,
      keyFormulas: lessonKeyFormulas,
      examples,
      practiceQuestions: lessonQuestions,
      pdfUrl: lessonPdfUrl || undefined,
      videoUrl: lessonVideoUrl || undefined,
    });
  };

  // Save Exam
  const handleSaveExam = (e: React.FormEvent) => {
    e.preventDefault();
    if (!examTitle.trim()) {
      alert('Vui lòng nhập tên đề thi!');
      return;
    }

    saveExam({
      title: examTitle,
      tabCategory: examCategory,
      examType,
      gradeTarget: examGradeTarget,
      timeMinutes: Number(examTimeMinutes),
      maxScore: Number(examMaxScore),
      year: examYear,
      description: examDescription,
      questions: examQuestions,
      pdfUrl: examPdfUrl || undefined,
    });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[94vh] flex flex-col overflow-hidden border border-slate-200">
        {/* Modal Top Bar */}
        <div className="px-5 py-4 border-b border-slate-200 flex items-center justify-between gap-4 bg-slate-50">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-600 block">
              Teacher Studio & CMS
            </span>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900">
              {editingLesson
                ? 'Chỉnh sửa bài giảng'
                : editingExam
                ? 'Chỉnh sửa đề thi thử'
                : 'Soạn thảo & Đăng nội dung học tập'}
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowFormulaPreview(!showFormulaPreview)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-colors flex items-center gap-1.5 cursor-pointer ${
                showFormulaPreview
                  ? 'bg-indigo-600 text-white border-indigo-600'
                  : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>{showFormulaPreview ? 'Tắt xem trước công thức' : 'Xem trước công thức'}</span>
            </button>

            <button
              onClick={closeStudio}
              className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-200/60 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Mode Selector Tabs (Lesson vs Exam) */}
        {!editingLesson && !editingExam && (
          <div className="flex border-b border-slate-200 bg-white px-5">
            <button
              onClick={() => setStudioMode('lesson')}
              className={`py-3 px-4 text-xs sm:text-sm font-semibold border-b-2 flex items-center gap-2 cursor-pointer transition-colors ${
                studioMode === 'lesson'
                  ? 'border-indigo-600 text-indigo-600'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Đăng Bài giảng / Chuyên đề (Toán 10, 11, 12)</span>
            </button>
            <button
              onClick={() => setStudioMode('exam')}
              className={`py-3 px-4 text-xs sm:text-sm font-semibold border-b-2 flex items-center gap-2 cursor-pointer transition-colors ${
                studioMode === 'exam'
                  ? 'border-indigo-600 text-indigo-600'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>Đăng Đề thi thử (GHK-HK & ĐGNL)</span>
            </button>
          </div>
        )}

        {/* Modal Body */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1 space-y-6">
          {/* ================= FORM 1: LESSON ================= */}
          {studioMode === 'lesson' && (
            <form id="lesson-form" onSubmit={handleSaveLesson} className="space-y-6">
              {/* Basic Details */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Mục hiển thị / Tab *
                  </label>
                  <select
                    value={lessonCategory}
                    onChange={e => setLessonCategory(e.target.value as TabCategory)}
                    className="w-full text-xs sm:text-sm p-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="toan-10">Toán 10</option>
                    <option value="toan-11">Toán 11</option>
                    <option value="toan-12">Toán 12</option>
                    <option value="ghk-hk">Tài liệu GHK-HK</option>
                    <option value="dgnl">Chuyên đề ĐGNL</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Khối lớp
                  </label>
                  <select
                    value={lessonGrade}
                    onChange={e => setLessonGrade(e.target.value as any)}
                    className="w-full text-xs sm:text-sm p-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="10">Lớp 10</option>
                    <option value="11">Lớp 11</option>
                    <option value="12">Lớp 12</option>
                    <option value="Chung">Tổng hợp chung</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Tên chương / Chuyên đề *
                  </label>
                  <input
                    type="text"
                    required
                    list="taxonomy-chapters"
                    value={lessonChapter}
                    onChange={e => setLessonChapter(e.target.value)}
                    placeholder="Chọn từ cây mục lục hoặc nhập mới..."
                    className="w-full text-xs sm:text-sm p-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  />
                  <datalist id="taxonomy-chapters">
                    {/* Lớp 10 */}
                    <option value="Chương 1. Mệnh đề. Tập hợp" />
                    <option value="Chương 2. BPT và hệ BPT bậc nhất hai ẩn" />
                    <option value="Chương 3. Hàm số bậc hai và đồ thị" />
                    <option value="Chương 4. Hệ thức lượng trong tam giác" />
                    <option value="Chương 5. Véctơ (chưa xét tọa độ)" />
                    <option value="Chương 6. Thống kê" />
                    <option value="Chương 7. Bất phương trình bậc 2 một ẩn" />
                    <option value="Chương 8. Đại số tổ hợp" />
                    <option value="Chương 9. Phương pháp toạ độ trong mặt phẳng (Oxy)" />
                    <option value="Chương 10. Xác suất" />
                    {/* Lớp 11 */}
                    <option value="Chương 1. Hàm số lượng giác và phương trình lượng giác" />
                    <option value="Chương 2. Dãy số. Cấp số cộng. Cấp số nhân" />
                    <option value="Chương 3. Giới hạn. Hàm số liên tục" />
                    <option value="Chương 4. Đường thẳng, mặt phẳng. Quan hệ song song trong không gian" />
                    <option value="Chương 5. Các số đặc trưng đo xu thế trung tâm cho mẫu số liệu ghép nhóm" />
                    <option value="Chương 6. Hàm số mũ và hàm số lôgarít" />
                    <option value="Chương 7. Đạo hàm" />
                    <option value="Chương 8. Quan hệ vuông góc trong không gian" />
                    <option value="Chương 9. Xác suất" />
                    {/* Lớp 12 */}
                    <option value="Chương 1. Ứng dụng đạo hàm để khảo sát hàm số" />
                    <option value="Chương 2. Tọa độ của véc-tơ trong không gian" />
                    <option value="Chương 3. Các số đặc trưng đo mức độ phân tán cho mẫu số liệu ghép nhóm" />
                    <option value="Chương 4. Nguyên hàm, tích phân và ứng dụng" />
                    <option value="Chương 5. Phương trình mặt phẳng, đường thẳng, mặt cầu trong không gian Oxyz" />
                    <option value="Chương 6. Một số yếu tố xác suất" />
                  </datalist>
                </div>
              </div>

              {/* Title */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Tiêu đề bài giảng / Bài học *
                </label>
                <input
                  type="text"
                  required
                  value={lessonTitle}
                  onChange={e => setLessonTitle(e.target.value)}
                  placeholder="VD: Ứng dụng đạo hàm để khảo sát và vẽ đồ thị hàm số"
                  className="w-full text-xs sm:text-sm p-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 font-semibold"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Mô tả tóm tắt nội dung
                </label>
                <input
                  type="text"
                  value={lessonDescription}
                  onChange={e => setLessonDescription(e.target.value)}
                  placeholder="VD: Trọng tâm lý thuyết cực trị, tiệm cận và bài toán thực tế..."
                  className="w-full text-xs sm:text-sm p-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {/* Theory Content with LaTeX */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-semibold text-slate-700">
                    Nội dung lý thuyết & Bài giảng (Hỗ trợ công thức LaTeX $...$ và $$...$$)
                  </label>
                  <span className="text-[11px] text-indigo-600 font-mono">
                    Gợi ý: Viết $x^2 + y^2 = R^2$ hoặc $\lim_{'{x \\to 0}'}$
                  </span>
                </div>
                <textarea
                  rows={8}
                  value={lessonContent}
                  onChange={e => setLessonContent(e.target.value)}
                  placeholder="Soạn nội dung lý thuyết chi tiết ở đây..."
                  className="w-full text-xs sm:text-sm p-3 bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 font-mono"
                />

                {showFormulaPreview && (
                  <div className="mt-2 p-3 bg-indigo-50/50 border border-indigo-200 rounded-lg text-sm text-slate-800">
                    <span className="text-xs font-bold text-indigo-900 block mb-1">
                      Xem trước hiển thị công thức:
                    </span>
                    <MathText as="div">{lessonContent}</MathText>
                  </div>
                )}
              </div>

              {/* Key Formulas Section */}
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-800">
                    Danh sách công thức quan trọng cần nhớ
                  </label>
                  <span className="text-[11px] text-slate-500">
                    {lessonKeyFormulas.length} công thức
                  </span>
                </div>

                <div className="flex gap-2">
                  <input
                    type="text"
                    value={formulaInput}
                    onChange={e => setFormulaInput(e.target.value)}
                    placeholder="VD: a^2 = b^2 + c^2 - 2bc \cos A"
                    className="flex-1 text-xs p-2 bg-white border border-slate-300 rounded-lg font-mono"
                    onKeyDown={e => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        addFormula();
                      }
                    }}
                  />
                  <button
                    type="button"
                    onClick={addFormula}
                    className="px-3 py-2 text-xs font-semibold bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 cursor-pointer"
                  >
                    Thêm công thức
                  </button>
                </div>

                <div className="space-y-1.5 max-h-36 overflow-y-auto">
                  {lessonKeyFormulas.map((f, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between p-2 bg-white border border-slate-200 rounded text-xs"
                    >
                      <div className="flex-1 font-mono overflow-x-auto mr-2">
                        <MathText>{`$${f}$`}</MathText>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeFormula(i)}
                        className="text-slate-400 hover:text-rose-600 p-1 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Example Problems Section */}
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-800">
                    Ví dụ minh hoạ có lời giải mẫu ({examples.length})
                  </label>
                  <button
                    type="button"
                    onClick={addExample}
                    className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold bg-indigo-50 border border-indigo-200 text-indigo-700 rounded-lg hover:bg-indigo-100 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Thêm ví dụ mẫu</span>
                  </button>
                </div>

                <div className="space-y-3">
                  {examples.map((ex, idx) => (
                    <div key={ex.id || idx} className="p-3 bg-white border border-slate-200 rounded-lg space-y-2">
                      <div className="flex items-center justify-between">
                        <input
                          type="text"
                          value={ex.title}
                          onChange={e => updateExample(idx, 'title', e.target.value)}
                          placeholder="Tiêu đề ví dụ"
                          className="text-xs font-bold text-slate-800 border-b border-slate-200 pb-1 flex-1 mr-2"
                        />
                        <button
                          type="button"
                          onClick={() => removeExample(idx)}
                          className="text-slate-400 hover:text-rose-600 p-1 cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <textarea
                        rows={2}
                        value={ex.question}
                        onChange={e => updateExample(idx, 'question', e.target.value)}
                        placeholder="Đề bài ví dụ..."
                        className="w-full text-xs p-2 border border-slate-200 rounded"
                      />

                      <textarea
                        rows={3}
                        value={ex.solution}
                        onChange={e => updateExample(idx, 'solution', e.target.value)}
                        placeholder="Lời giải chi tiết từng bước..."
                        className="w-full text-xs p-2 border border-slate-200 rounded bg-slate-50/50"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Practice Questions Section */}
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-800">
                    Câu hỏi trắc nghiệm tự luyện ({lessonQuestions.length})
                  </label>
                  <button
                    type="button"
                    onClick={() => addQuestion(false)}
                    className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-lg hover:bg-emerald-100 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Thêm câu trắc nghiệm</span>
                  </button>
                </div>

                <div className="space-y-4">
                  {lessonQuestions.map((q, idx) => (
                    <div key={q.id || idx} className="p-3 bg-white border border-slate-200 rounded-lg space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-700">Câu {idx + 1}</span>
                        <div className="flex items-center gap-2">
                          <label className="text-xs text-slate-500">Đáp án đúng:</label>
                          <select
                            value={q.correctAnswer}
                            onChange={e => updateQuestion(idx, 'correctAnswer', e.target.value as any, false)}
                            className="text-xs font-bold text-emerald-700 border border-slate-300 rounded px-2 py-0.5"
                          >
                            <option value="A">A</option>
                            <option value="B">B</option>
                            <option value="C">C</option>
                            <option value="D">D</option>
                          </select>
                          <button
                            type="button"
                            onClick={() => removeQuestion(idx, false)}
                            className="text-slate-400 hover:text-rose-600 p-1 cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      <textarea
                        rows={2}
                        value={q.question}
                        onChange={e => updateQuestion(idx, 'question', e.target.value, false)}
                        placeholder="Nội dung câu hỏi (hỗ trợ $...$)..."
                        className="w-full text-xs p-2 border border-slate-200 rounded"
                      />

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {(['A', 'B', 'C', 'D'] as const).map(opt => (
                          <div key={opt} className="flex items-center gap-1.5">
                            <span className="text-xs font-bold text-slate-500 w-4">{opt}:</span>
                            <input
                              type="text"
                              value={q.options[opt]}
                              onChange={e => updateQuestionOption(idx, opt, e.target.value, false)}
                              placeholder={`Nội dung đáp án ${opt}`}
                              className="flex-1 text-xs p-1.5 border border-slate-200 rounded"
                            />
                          </div>
                        ))}
                      </div>

                      <textarea
                        rows={2}
                        value={q.explanation}
                        onChange={e => updateQuestion(idx, 'explanation', e.target.value, false)}
                        placeholder="Hướng dẫn giải chi tiết cho câu hỏi..."
                        className="w-full text-xs p-2 border border-slate-200 rounded bg-slate-50/50"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Attachment Links */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Liên kết tệp PDF / Tài liệu tải về
                  </label>
                  <input
                    type="url"
                    value={lessonPdfUrl}
                    onChange={e => setLessonPdfUrl(e.target.value)}
                    placeholder="https://...link_tai_lieu.pdf"
                    className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Liên kết Video bài giảng (YouTube)
                  </label>
                  <input
                    type="url"
                    value={lessonVideoUrl}
                    onChange={e => setLessonVideoUrl(e.target.value)}
                    placeholder="https://youtube.com/watch?v=..."
                    className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-lg"
                  />
                </div>
              </div>
            </form>
          )}

          {/* ================= FORM 2: EXAM ================= */}
          {studioMode === 'exam' && (
            <form id="exam-form" onSubmit={handleSaveExam} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Tab hiển thị *
                  </label>
                  <select
                    value={examCategory}
                    onChange={e => setExamCategory(e.target.value as any)}
                    className="w-full text-xs sm:text-sm p-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="ghk-hk">Đề thi thử GHK-HK</option>
                    <option value="dgnl">Đề thi thử ĐGNL</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Loại đề thi *
                  </label>
                  <select
                    value={examType}
                    onChange={e => setExamType(e.target.value as any)}
                    className="w-full text-xs sm:text-sm p-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="Giữa HK1">Giữa Học Kì 1</option>
                    <option value="Cuối HK1">Cuối Học Kì 1</option>
                    <option value="Giữa HK2">Giữa Học Kì 2</option>
                    <option value="Cuối HK2">Cuối Học Kì 2</option>
                    <option value="ĐGNL ĐHQG-HCM">ĐGNL ĐHQG TP.HCM</option>
                    <option value="ĐGNL ĐHQG-HN">ĐGNL ĐHQG Hà Nội (HSA)</option>
                    <option value="ĐH Sư Phạm">ĐGNL ĐH Sư Phạm</option>
                    <option value="Chuyên đề">Thi thử Chuyên đề</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Khối lớp đối tượng
                  </label>
                  <select
                    value={examGradeTarget}
                    onChange={e => setExamGradeTarget(e.target.value as any)}
                    className="w-full text-xs sm:text-sm p-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="10">Lớp 10</option>
                    <option value="11">Lớp 11</option>
                    <option value="12">Lớp 12</option>
                    <option value="ĐGNL">ĐGNL (12 & Tốt nghiệp)</option>
                    <option value="Tổng hợp">Tổng hợp</option>
                  </select>
                </div>
              </div>

              {/* Title */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Tên đề thi *
                </label>
                <input
                  type="text"
                  required
                  value={examTitle}
                  onChange={e => setExamTitle(e.target.value)}
                  placeholder="VD: Đề thi thử Giữa HK1 Toán 12 - Năm học 2025-2026"
                  className="w-full text-xs sm:text-sm p-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 font-semibold"
                />
              </div>

              {/* Time, Max Score, Year */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Thời gian làm bài (phút)
                  </label>
                  <input
                    type="number"
                    min={15}
                    max={180}
                    value={examTimeMinutes}
                    onChange={e => setExamTimeMinutes(Number(e.target.value))}
                    className="w-full text-xs sm:text-sm p-2.5 bg-slate-50 border border-slate-300 rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Thang điểm tối đa
                  </label>
                  <input
                    type="number"
                    value={examMaxScore}
                    onChange={e => setExamMaxScore(Number(e.target.value))}
                    className="w-full text-xs sm:text-sm p-2.5 bg-slate-50 border border-slate-300 rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Năm học / Kỳ thi
                  </label>
                  <input
                    type="text"
                    value={examYear}
                    onChange={e => setExamYear(e.target.value)}
                    className="w-full text-xs sm:text-sm p-2.5 bg-slate-50 border border-slate-300 rounded-lg"
                  />
                </div>
              </div>

              {/* Description & PDF */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Mô tả cấu trúc đề
                  </label>
                  <input
                    type="text"
                    value={examDescription}
                    onChange={e => setExamDescription(e.target.value)}
                    placeholder="VD: Ma trận 70% nhận biết - thông hiểu, 30% vận dụng..."
                    className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Link tệp đề PDF tải về
                  </label>
                  <input
                    type="url"
                    value={examPdfUrl}
                    onChange={e => setExamPdfUrl(e.target.value)}
                    placeholder="https://...de_thi.pdf"
                    className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-lg"
                  />
                </div>
              </div>

              {/* Questions list for Exam */}
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-800">
                    Danh sách câu hỏi trong đề thi ({examQuestions.length} câu)
                  </label>
                  <button
                    type="button"
                    onClick={() => addQuestion(true)}
                    className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 cursor-pointer shadow-2xs"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Thêm câu hỏi mới</span>
                  </button>
                </div>

                <div className="space-y-4 max-h-[50vh] overflow-y-auto pr-1">
                  {examQuestions.map((q, idx) => (
                    <div key={q.id || idx} className="p-3.5 bg-white border border-slate-200 rounded-lg space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-800">Câu {idx + 1}</span>
                        <div className="flex items-center gap-2">
                          <label className="text-xs text-slate-500 font-medium">Đáp án đúng:</label>
                          <select
                            value={q.correctAnswer}
                            onChange={e => updateQuestion(idx, 'correctAnswer', e.target.value as any, true)}
                            className="text-xs font-bold text-emerald-700 border border-slate-300 rounded px-2 py-0.5"
                          >
                            <option value="A">A</option>
                            <option value="B">B</option>
                            <option value="C">C</option>
                            <option value="D">D</option>
                          </select>

                          <select
                            value={q.difficulty || 'Thông hiểu'}
                            onChange={e => updateQuestion(idx, 'difficulty', e.target.value as any, true)}
                            className="text-xs text-slate-600 border border-slate-300 rounded px-1.5 py-0.5"
                          >
                            <option value="Nhận biết">Nhận biết</option>
                            <option value="Thông hiểu">Thông hiểu</option>
                            <option value="Vận dụng">Vận dụng</option>
                            <option value="Vận dụng cao">Vận dụng cao</option>
                          </select>

                          <button
                            type="button"
                            onClick={() => removeQuestion(idx, true)}
                            className="text-slate-400 hover:text-rose-600 p-1 cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      <textarea
                        rows={2}
                        value={q.question}
                        onChange={e => updateQuestion(idx, 'question', e.target.value, true)}
                        placeholder="Đề bài câu hỏi (hỗ trợ công thức $...$)..."
                        className="w-full text-xs p-2 border border-slate-200 rounded font-medium"
                      />

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {(['A', 'B', 'C', 'D'] as const).map(opt => (
                          <div key={opt} className="flex items-center gap-1.5">
                            <span className="text-xs font-bold text-slate-500 w-4">{opt}:</span>
                            <input
                              type="text"
                              value={q.options[opt]}
                              onChange={e => updateQuestionOption(idx, opt, e.target.value, true)}
                              placeholder={`Nội dung ${opt}`}
                              className="flex-1 text-xs p-1.5 border border-slate-200 rounded"
                            />
                          </div>
                        ))}
                      </div>

                      <textarea
                        rows={2}
                        value={q.explanation}
                        onChange={e => updateQuestion(idx, 'explanation', e.target.value, true)}
                        placeholder="Lời giải chi tiết từng bước..."
                        className="w-full text-xs p-2 border border-slate-200 rounded bg-slate-50/50"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </form>
          )}
        </div>

        {/* Modal Footer with Save Buttons */}
        <div className="p-4 sm:px-6 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
          <button
            type="button"
            onClick={closeStudio}
            className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 cursor-pointer"
          >
            Huỷ bỏ
          </button>

          <button
            type="submit"
            form={studioMode === 'lesson' ? 'lesson-form' : 'exam-form'}
            className="inline-flex items-center gap-1.5 px-5 py-2 text-xs sm:text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 rounded-lg shadow-sm cursor-pointer transition-colors"
          >
            <Save className="w-4 h-4" />
            <span>{editingLesson || editingExam ? 'Lưu thay đổi' : 'Đăng tải lên hệ thống'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
