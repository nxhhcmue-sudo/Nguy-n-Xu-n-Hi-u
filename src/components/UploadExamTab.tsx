import React, { useState, useRef } from 'react';
import { useMathPortal } from '../context/MathPortalContext';
import { UploadedExamDoc } from '../types';
import {
  UploadCloud,
  FileText,
  FileDown,
  Trash2,
  Search,
  CheckCircle2,
  File,
  Eye,
  Plus,
  Filter,
  School,
  Calendar,
  X
} from 'lucide-react';

export const UploadExamTab: React.FC = () => {
  const { uploadedDocs, addUploadedDoc, deleteUploadedDoc, isTeacherMode } = useMathPortal();

  // Filter & Search states
  const [filterGrade, setFilterGrade] = useState<string>('all');
  const [filterFormat, setFilterFormat] = useState<string>('all');
  const [searchDocQuery, setSearchDocQuery] = useState('');

  // Upload Form State
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [gradeTarget, setGradeTarget] = useState<'10' | '11' | '12' | 'ĐGNL' | 'Chung'>('12');
  const [examType, setExamType] = useState<any>('Giữa HK1');
  const [schoolOrSource, setSchoolOrSource] = useState('');
  const [year, setYear] = useState('2025-2026');
  const [description, setDescription] = useState('');
  
  // Files
  const [examFile, setExamFile] = useState<{ name: string; size: string; type: 'pdf' | 'word' | 'image' | 'other'; dataUrl: string } | null>(null);
  const [answerFile, setAnswerFile] = useState<{ name: string; dataUrl: string } | null>(null);

  // Active preview modal
  const [previewDoc, setPreviewDoc] = useState<UploadedExamDoc | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const answerFileInputRef = useRef<HTMLInputElement>(null);

  // Handle Exam File selection
  const handleExamFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const fileName = file.name;
    const lowerName = fileName.toLowerCase();
    let fileType: 'pdf' | 'word' | 'image' | 'other' = 'other';
    if (lowerName.endsWith('.pdf')) fileType = 'pdf';
    else if (lowerName.endsWith('.doc') || lowerName.endsWith('.docx')) fileType = 'word';
    else if (lowerName.endsWith('.png') || lowerName.endsWith('.jpg') || lowerName.endsWith('.jpeg')) fileType = 'image';

    const fileSize = file.size > 1024 * 1024 
      ? (file.size / (1024 * 1024)).toFixed(1) + ' MB' 
      : (file.size / 1024).toFixed(0) + ' KB';

    // Auto-fill title if empty
    if (!title) {
      const cleanName = fileName.replace(/\.[^/.]+$/, '').replace(/[_-]/g, ' ');
      setTitle(cleanName);
    }

    const reader = new FileReader();
    reader.onload = event => {
      setExamFile({
        name: fileName,
        size: fileSize,
        type: fileType,
        dataUrl: event.target?.result as string,
      });
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  // Handle Answer key selection
  const handleAnswerFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = event => {
      setAnswerFile({
        name: file.name,
        dataUrl: event.target?.result as string,
      });
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  // Submit Upload Form
  const handleSubmitUpload = (e: React.FormEvent) => {
    e.preventDefault();
    if (!examFile) {
      alert('Vui lòng chọn tệp đề thi (PDF, Word, Ảnh...) để tải lên!');
      return;
    }
    if (!title.trim()) {
      alert('Vui lòng nhập tên đề thi!');
      return;
    }

    addUploadedDoc({
      title: title.trim(),
      gradeTarget,
      examType,
      year: year.trim() || '2026',
      schoolOrSource: schoolOrSource.trim() || 'Trung Tâm Trí Nhân',
      description: description.trim(),
      fileName: examFile.name,
      fileSize: examFile.size,
      fileType: examFile.type,
      fileDataUrl: examFile.dataUrl,
      hasAnswerKey: !!answerFile,
      answerKeyFileName: answerFile?.name,
      answerKeyDataUrl: answerFile?.dataUrl,
      author: 'Giáo viên bộ môn Toán',
    });

    // Reset form
    setTitle('');
    setDescription('');
    setSchoolOrSource('');
    setExamFile(null);
    setAnswerFile(null);
    setIsFormOpen(false);
    alert('Đã tải lên và lưu đề thi thành công vào hệ thống!');
  };

  // Filter docs
  const filteredDocs = uploadedDocs.filter(doc => {
    if (filterGrade !== 'all') {
      if (doc.gradeTarget !== filterGrade) return false;
    }
    if (filterFormat !== 'all') {
      if (doc.fileType !== filterFormat) return false;
    }
    if (searchDocQuery.trim()) {
      const q = searchDocQuery.toLowerCase();
      const matchTitle = doc.title.toLowerCase().includes(q);
      const matchSchool = doc.schoolOrSource.toLowerCase().includes(q);
      const matchFile = doc.fileName.toLowerCase().includes(q);
      if (!matchTitle && !matchSchool && !matchFile) return false;
    }
    return true;
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Intro & Action Banner */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-2xs">
        <div className="max-w-2xl">
          <div className="flex items-center gap-2 text-xs font-semibold text-indigo-700 uppercase tracking-wider mb-2">
            <span>Kho Đề Thi PDF & Word</span>
            <span aria-hidden="true" className="text-slate-300">·</span>
            <span>Hỗ trợ .pdf, .docx, .doc, hình ảnh</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight mb-2">
            Tải Lên & Quản Lý Đề Thi Định Dạng PDF, Word
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Dành cho quý thầy cô và học sinh tải lên các đề thi thử, đề kiểm tra định kỳ từ các trường THPT, chuyên, Sở GD&ĐT để lưu trữ, chia sẻ và tải về in ấn luyện tập.
          </p>
        </div>

        <div className="shrink-0">
          <button
            onClick={() => setIsFormOpen(!isFormOpen)}
            className="flex items-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 rounded-xl transition-all shadow-sm cursor-pointer whitespace-nowrap"
          >
            {isFormOpen ? <X className="w-4 h-4" /> : <UploadCloud className="w-4 h-4" />}
            <span>{isFormOpen ? 'Đóng khung tải lên' : 'Tải đề thi mới lên'}</span>
          </button>
        </div>
      </div>

      {/* UPLOAD FORM (Expands when button clicked) */}
      {isFormOpen && (
        <div className="bg-white border-2 border-dashed border-indigo-200 rounded-2xl p-6 sm:p-8 shadow-sm">
          <form onSubmit={handleSubmitUpload} className="space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <UploadCloud className="w-5 h-5 text-indigo-600" />
                <span>Soạn thông tin và chọn tệp đề thi</span>
              </h3>
              <span className="text-xs text-slate-500">
                Lưu trực tiếp vào trình duyệt (Offline-ready)
              </span>
            </div>

            {/* Dropzone for main exam file */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2">
                  Tệp Đề thi chính (.pdf, .docx, .doc, ảnh) *
                </label>
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-slate-300 hover:border-indigo-400 bg-slate-50 hover:bg-indigo-50/30 rounded-xl p-6 text-center cursor-pointer transition-colors"
                >
                  <UploadCloud className="w-8 h-8 text-indigo-500 mx-auto mb-2" />
                  {examFile ? (
                    <div>
                      <div className="text-xs font-bold text-slate-900 truncate">
                        {examFile.name}
                      </div>
                      <div className="text-[11px] text-slate-500 mt-1">
                        Dung lượng: {examFile.size} · Định dạng: {examFile.type.toUpperCase()}
                      </div>
                      <span className="inline-block mt-2 text-[11px] text-indigo-600 font-medium">
                        Bấm để đổi tệp khác
                      </span>
                    </div>
                  ) : (
                    <div>
                      <span className="text-xs font-semibold text-indigo-600 block">
                        Nhấp để chọn tệp từ máy tính
                      </span>
                      <span className="text-[11px] text-slate-400 mt-1 block">
                        PDF (.pdf), Word (.docx, .doc) hoặc ảnh (.png, .jpg)
                      </span>
                    </div>
                  )}
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleExamFileChange}
                    accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
                    className="hidden"
                  />
                </div>
              </div>

              {/* Optional Answer key file */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2">
                  Tệp Đáp án & Lời giải chi tiết (Tuỳ chọn)
                </label>
                <div
                  onClick={() => answerFileInputRef.current?.click()}
                  className="border-2 border-dashed border-slate-300 hover:border-emerald-400 bg-slate-50 hover:bg-emerald-50/30 rounded-xl p-6 text-center cursor-pointer transition-colors"
                >
                  <FileText className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
                  {answerFile ? (
                    <div>
                      <div className="text-xs font-bold text-slate-900 truncate">
                        {answerFile.name}
                      </div>
                      <span className="inline-block mt-2 text-[11px] text-emerald-600 font-medium">
                        Đã chọn file đáp án · Bấm để đổi
                      </span>
                    </div>
                  ) : (
                    <div>
                      <span className="text-xs font-semibold text-emerald-700 block">
                        Nhấp để tải kèm file đáp án
                      </span>
                      <span className="text-[11px] text-slate-400 mt-1 block">
                        File PDF / Word chứa bảng đáp án và giải chi tiết
                      </span>
                    </div>
                  )}
                  <input
                    type="file"
                    ref={answerFileInputRef}
                    onChange={handleAnswerFileChange}
                    accept=".pdf,.doc,.docx"
                    className="hidden"
                  />
                </div>
              </div>
            </div>

            {/* Metadata Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Khối đối tượng *
                </label>
                <select
                  value={gradeTarget}
                  onChange={e => setGradeTarget(e.target.value as any)}
                  className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="10">Lớp 10</option>
                  <option value="11">Lớp 11</option>
                  <option value="12">Lớp 12</option>
                  <option value="ĐGNL">Đánh Giá Năng Lực</option>
                  <option value="Chung">Tổng hợp / Toàn khối</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Hình thức kiểm tra *
                </label>
                <select
                  value={examType}
                  onChange={e => setExamType(e.target.value as any)}
                  className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="Giữa HK1">Giữa Học Kì 1</option>
                  <option value="Cuối HK1">Cuối Học Kì 1</option>
                  <option value="Giữa HK2">Giữa Học Kì 2</option>
                  <option value="Cuối HK2">Cuối Học Kì 2</option>
                  <option value="ĐGNL">Đánh Giá Năng Lực (ĐHQG/HSA)</option>
                  <option value="Khảo sát chất lượng">Khảo sát chất lượng / Thi thử tốt nghiệp</option>
                  <option value="Đề học sinh giỏi">Đề Học Sinh Giỏi</option>
                  <option value="Chuyên đề">Thi chuyên đề</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Trường / Nguồn đề
                </label>
                <input
                  type="text"
                  value={schoolOrSource}
                  onChange={e => setSchoolOrSource(e.target.value)}
                  placeholder="VD: THPT Chuyên Lê Hồng Phong"
                  className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-lg"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Năm học
                </label>
                <input
                  type="text"
                  value={year}
                  onChange={e => setYear(e.target.value)}
                  placeholder="2025-2026"
                  className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-lg"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Tên / Tiêu đề đề thi hiển thị *
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="VD: Đề thi thử Giữa HK1 Toán 12 - Năm 2026 có ma trận đặc tả"
                className="w-full text-xs sm:text-sm p-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 font-semibold"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Ghi chú mô tả (Thời gian, cấu trúc câu hỏi, dạng bài)
              </label>
              <input
                type="text"
                value={description}
                onChange={e => setDescription(e.target.value)}
                placeholder="VD: Đề gồm 50 câu trắc nghiệm (35 câu cơ bản, 15 câu vận dụng cao)..."
                className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-lg"
              />
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setIsFormOpen(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 cursor-pointer"
              >
                Huỷ bỏ
              </button>
              <button
                type="submit"
                disabled={!examFile}
                className={`px-5 py-2 text-xs sm:text-sm font-semibold text-white rounded-lg transition-all shadow-sm flex items-center gap-1.5 cursor-pointer ${
                  examFile ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-slate-300 cursor-not-allowed'
                }`}
              >
                <UploadCloud className="w-4 h-4" />
                <span>Lưu & Tải lên kho đề</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* FILTER & SEARCH TOOLBAR */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 pt-2">
        {/* Search input */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchDocQuery}
            onChange={e => setSearchDocQuery(e.target.value)}
            placeholder="Tìm đề thi theo trường, tên đề, năm học..."
            className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Filter Badges / Segmented Controls */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Grade filter */}
          <select
            value={filterGrade}
            onChange={e => setFilterGrade(e.target.value)}
            className="text-xs bg-white border border-slate-200 rounded-lg px-3 py-2 text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium"
          >
            <option value="all">Tất cả các khối</option>
            <option value="10">Khối 10</option>
            <option value="11">Khối 11</option>
            <option value="12">Khối 12</option>
            <option value="ĐGNL">Đánh Giá Năng Lực</option>
          </select>

          {/* Format filter */}
          <select
            value={filterFormat}
            onChange={e => setFilterFormat(e.target.value)}
            className="text-xs bg-white border border-slate-200 rounded-lg px-3 py-2 text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium"
          >
            <option value="all">Tất cả định dạng (.pdf, .docx)</option>
            <option value="pdf">Chỉ xem PDF (.pdf)</option>
            <option value="word">Chỉ xem Word (.docx, .doc)</option>
            <option value="image">Hình ảnh đề thi</option>
          </select>
        </div>
      </div>

      {/* UPLOADED EXAMS GRID */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
          <span>Tìm thấy <strong className="text-slate-900 tabular-nums">{filteredDocs.length}</strong> tệp đề thi</span>
        </div>

        {filteredDocs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredDocs.map(doc => {
              const isPdf = doc.fileType === 'pdf';
              const isWord = doc.fileType === 'word';

              return (
                <div
                  key={doc.id}
                  className="bg-white rounded-xl border border-slate-200 p-5 hover:border-indigo-300 hover:shadow-xs transition-all duration-200 flex flex-col justify-between"
                >
                  <div>
                    {/* Top metadata */}
                    <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                      <div className="flex items-center gap-1.5 truncate">
                        <span className="font-semibold text-indigo-700">{doc.examType}</span>
                        <span aria-hidden="true" className="text-slate-300">·</span>
                        <span>{doc.gradeTarget === 'ĐGNL' ? 'ĐGNL' : `Khối ${doc.gradeTarget}`}</span>
                        <span aria-hidden="true" className="text-slate-300">·</span>
                        <span>Năm {doc.year}</span>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                            isPdf
                              ? 'bg-rose-50 text-rose-700 border border-rose-200'
                              : isWord
                              ? 'bg-blue-50 text-blue-700 border border-blue-200'
                              : 'bg-slate-100 text-slate-700 border border-slate-200'
                          }`}
                        >
                          {doc.fileType.toUpperCase()}
                        </span>

                        {isTeacherMode && (
                          <button
                            onClick={() => deleteUploadedDoc(doc.id)}
                            className="p-1 text-slate-400 hover:text-rose-600 rounded hover:bg-slate-100 transition-colors cursor-pointer"
                            title="Xoá đề thi khỏi hệ thống"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-sm sm:text-base font-bold text-slate-900 mb-2 leading-snug line-clamp-2">
                      {doc.title}
                    </h3>

                    {/* School and Details */}
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500 mb-3">
                      <span className="flex items-center gap-1 font-medium text-slate-700">
                        <School className="w-3.5 h-3.5 text-slate-400" />
                        {doc.schoolOrSource}
                      </span>
                      <span aria-hidden="true" className="text-slate-300">·</span>
                      <span>Dung lượng: <strong className="text-slate-800 tabular-nums">{doc.fileSize}</strong></span>
                      {doc.hasAnswerKey && (
                        <>
                          <span aria-hidden="true" className="text-slate-300">·</span>
                          <span className="text-emerald-700 font-semibold flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            Có đáp án chi tiết
                          </span>
                        </>
                      )}
                    </div>

                    {doc.description && (
                      <p className="text-xs text-slate-600 line-clamp-2 mb-4 leading-relaxed bg-slate-50/60 p-2 rounded">
                        {doc.description}
                      </p>
                    )}
                  </div>

                  {/* Action buttons */}
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2 mt-auto">
                    <span className="text-[11px] text-slate-400 truncate max-w-[150px]">
                      {doc.fileName}
                    </span>

                    <div className="flex items-center gap-2">
                      {/* Preview Button for PDF */}
                      {isPdf && doc.fileDataUrl && (
                        <button
                          onClick={() => setPreviewDoc(doc)}
                          className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>Xem nhanh</span>
                        </button>
                      )}

                      {/* Download Exam file */}
                      <a
                        href={doc.fileDataUrl}
                        download={doc.fileName}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 rounded-lg transition-colors shadow-2xs cursor-pointer"
                      >
                        <FileDown className="w-3.5 h-3.5" />
                        <span>Tải đề ({doc.fileType.toUpperCase()})</span>
                      </a>

                      {/* Download Answer Key */}
                      {doc.hasAnswerKey && doc.answerKeyDataUrl && (
                        <a
                          href={doc.answerKeyDataUrl}
                          download={doc.answerKeyFileName || 'Dap_an_chi_tiet.pdf'}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-lg transition-colors cursor-pointer"
                          title="Tải tệp đáp án chi tiết"
                        >
                          <FileDown className="w-3.5 h-3.5" />
                          <span>Đáp án</span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="p-12 text-center bg-white rounded-2xl border border-slate-200">
            <FileText className="w-10 h-10 text-slate-300 mx-auto mb-3" />
            <h3 className="text-base font-semibold text-slate-800 mb-1">
              Chưa có tệp đề thi nào phù hợp bộ lọc
            </h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto mb-4">
              Bạn có thể bấm nút "Tải đề thi mới lên" ở trên để đưa các đề thi PDF hoặc Word vào kho đề của Trung Tâm.
            </p>
            <button
              onClick={() => setIsFormOpen(true)}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors cursor-pointer"
            >
              <UploadCloud className="w-3.5 h-3.5" />
              <span>Tải đề lên ngay</span>
            </button>
          </div>
        )}
      </div>

      {/* PDF Quick Preview Modal */}
      {previewDoc && (
        <div className="fixed inset-0 z-60 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl h-[90vh] flex flex-col overflow-hidden border border-slate-200">
            <div className="px-5 py-3.5 border-b border-slate-200 flex items-center justify-between gap-4 bg-slate-50">
              <div className="truncate">
                <span className="text-[11px] font-bold text-indigo-600 block uppercase">
                  Xem trước đề thi
                </span>
                <h3 className="text-sm font-bold text-slate-900 truncate">
                  {previewDoc.title}
                </h3>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={previewDoc.fileDataUrl}
                  download={previewDoc.fileName}
                  className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 cursor-pointer"
                >
                  <FileDown className="w-3.5 h-3.5" />
                  <span>Tải về máy</span>
                </a>
                <button
                  onClick={() => setPreviewDoc(null)}
                  className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-200/60 transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="flex-1 bg-slate-100 p-2 flex items-center justify-center overflow-hidden">
              {previewDoc.fileDataUrl.startsWith('data:application/pdf') || previewDoc.fileDataUrl.endsWith('.pdf') ? (
                <iframe
                  src={previewDoc.fileDataUrl}
                  className="w-full h-full rounded-lg border border-slate-300 bg-white"
                  title={previewDoc.title}
                />
              ) : (
                <div className="text-center p-6 bg-white rounded-xl shadow-xs max-w-md">
                  <FileText className="w-12 h-12 text-indigo-500 mx-auto mb-3" />
                  <h4 className="text-sm font-bold text-slate-800 mb-1">
                    Định dạng file Word / Tài liệu
                  </h4>
                  <p className="text-xs text-slate-500 mb-4">
                    Tệp "{previewDoc.fileName}" đã được tải lên an toàn. Trình duyệt không hỗ trợ xem trực tiếp định dạng Word, vui lòng nhấn tải về để mở trên máy tính.
                  </p>
                  <a
                    href={previewDoc.fileDataUrl}
                    download={previewDoc.fileName}
                    className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg cursor-pointer"
                  >
                    <FileDown className="w-4 h-4" />
                    <span>Tải tệp {previewDoc.fileName}</span>
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
