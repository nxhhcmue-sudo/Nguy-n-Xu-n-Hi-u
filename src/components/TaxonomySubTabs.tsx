import React, { useState } from 'react';
import { useMathPortal } from '../context/MathPortalContext';
import {
  getGradeBranches,
  getGradeChapters,
  TaxonomyNode,
} from '../data/taxonomyTree';
import {
  FolderTree,
  LayoutGrid,
  ChevronRight,
  ChevronDown,
  BookOpen,
  Plus,
  Layers,
  Sparkles,
  CheckCircle2,
  FileText
} from 'lucide-react';

interface TaxonomySubTabsProps {
  grade: '10' | '11' | '12';
}

export const TaxonomySubTabs: React.FC<TaxonomySubTabsProps> = ({ grade }) => {
  const {
    lessons,
    setActiveLessonModal,
    isTeacherMode,
    openStudioForLesson,
    selectedBranch,
    setSelectedBranch,
    selectedChapter,
    setSelectedChapter,
  } = useMathPortal();

  // Active branch from context: 'all' or branch.code ('D', 'H', 'C')
  const activeBranchCode = selectedBranch;
  const setActiveBranchCode = setSelectedBranch;
  
  // View mode: 'cards' (rich lesson cards) or 'tree' (full Bài & Dạng toán explorer)
  const [viewMode, setViewMode] = useState<'cards' | 'tree'>('cards');

  // Expanded state for accordion chapters & lessons in tree mode
  const [expandedNodes, setExpandedNodes] = useState<Record<string, boolean>>({});

  const toggleExpand = (nodeKey: string) => {
    setExpandedNodes(prev => ({
      ...prev,
      [nodeKey]: !prev[nodeKey],
    }));
  };

  const branches = getGradeBranches(grade);
  const allChapters = getGradeChapters(
    grade,
    activeBranchCode === 'all' ? undefined : activeBranchCode
  );

  // When branch changes, reset chapter filter if not matching
  const handleSelectBranch = (branchCode: string) => {
    setActiveBranchCode(branchCode);
    setSelectedChapter('all');
  };

  return (
    <div className="space-y-6 mb-8">
      {/* ================= LEVEL 1 SUB-TABS: PHÂN MÔN ================= */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-700 block mb-1">
            Cây Mục Lục Phân Môn Toán {grade}
          </span>
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-100 rounded-xl w-fit">
            <button
              onClick={() => handleSelectBranch('all')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                activeBranchCode === 'all'
                  ? 'bg-white text-indigo-700 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Tất cả phân môn
            </button>

            {branches.map(branch => {
              const isActive = activeBranchCode === branch.code;
              return (
                <button
                  key={branch.code}
                  onClick={() => handleSelectBranch(branch.code)}
                  className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-white text-indigo-700 shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <span>{branch.name}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full tabular-nums ${
                      isActive ? 'bg-indigo-50 text-indigo-700' : 'bg-slate-200/80 text-slate-500'
                    }`}
                  >
                    {branch.children?.length || 0} chương
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* View Mode Toggle: Grid Cards vs Taxonomy Tree */}
        <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg w-fit self-start sm:self-center">
          <button
            onClick={() => setViewMode('cards')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors flex items-center gap-1.5 cursor-pointer ${
              viewMode === 'cards'
                ? 'bg-white text-slate-900 shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
            title="Xem bài giảng dạng thẻ trực quan"
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            <span>Thẻ bài học</span>
          </button>
          <button
            onClick={() => setViewMode('tree')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors flex items-center gap-1.5 cursor-pointer ${
              viewMode === 'tree'
                ? 'bg-white text-slate-900 shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
            title="Xem toàn bộ cây mục lục: Chương - Bài - Dạng toán"
          >
            <FolderTree className="w-3.5 h-3.5" />
            <span>Cây mục lục (Bài & Dạng)</span>
          </button>
        </div>
      </div>

      {/* ================= LEVEL 2 SUB-TABS: DANH SÁCH CHƯƠNG ================= */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs text-slate-500">
          <span className="font-semibold text-slate-700">CHỌN CHƯƠNG CHUYÊN ĐỀ:</span>
          <span>{allChapters.length} chương bài học</span>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
          <button
            onClick={() => setSelectedChapter('all')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-colors cursor-pointer border ${
              selectedChapter === 'all'
                ? 'bg-indigo-600 text-white border-indigo-600 shadow-2xs'
                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
            }`}
          >
            Tất cả các chương
          </button>

          {allChapters.map(({ chapter }) => {
            const isSelected = selectedChapter === chapter.name;
            return (
              <button
                key={chapter.code + '-' + chapter.name}
                onClick={() => setSelectedChapter(chapter.name)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-colors cursor-pointer border ${
                  isSelected
                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-2xs'
                    : 'bg-white text-slate-700 border-slate-200 hover:border-indigo-300 hover:bg-slate-50'
                }`}
              >
                {chapter.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* ================= LEVEL 3: FULL TREE VIEW (BÀI & DẠNG TOÁN) ================= */}
      {viewMode === 'tree' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-2xs space-y-4 animate-in fade-in duration-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <FolderTree className="w-4 h-4 text-indigo-600" />
                <span>Cấu Trúc Cây Mục Lục: Chương → Bài → Dạng Toán</span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Chuẩn theo ma trận định dạng ngân hàng câu hỏi và CT GDPT 2018
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs font-medium">
              <span className="text-slate-400">Mức độ:</span>
              <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">Nhận biết</span>
              <span className="text-sky-700 bg-sky-50 px-2 py-0.5 rounded">Thông hiểu</span>
              <span className="text-amber-700 bg-amber-50 px-2 py-0.5 rounded">Vận dụng</span>
              <span className="text-rose-700 bg-rose-50 px-2 py-0.5 rounded">Vận dụng cao</span>
            </div>
          </div>

          {/* Render the taxonomy tree hierarchy */}
          <div className="space-y-3">
            {allChapters
              .filter(({ chapter }) => selectedChapter === 'all' || selectedChapter === chapter.name)
              .map(({ branch, chapter }) => {
                const chapterKey = `ch-${chapter.code}-${chapter.name}`;
                const isChapterOpen = expandedNodes[chapterKey] ?? true;

                // Check if we have an authored lesson for this chapter
                const matchingLesson = lessons.find(
                  l => l.grade === grade && l.chapter.toLowerCase().includes(chapter.name.toLowerCase().slice(0, 15))
                );

                return (
                  <div
                    key={chapterKey}
                    className="border border-slate-200 rounded-xl overflow-hidden bg-slate-50/50"
                  >
                    {/* Chapter Header */}
                    <div
                      onClick={() => toggleExpand(chapterKey)}
                      className="p-3.5 bg-slate-100/70 hover:bg-slate-200/60 transition-colors flex items-center justify-between cursor-pointer"
                    >
                      <div className="flex items-center gap-2">
                        {isChapterOpen ? (
                          <ChevronDown className="w-4 h-4 text-slate-500 shrink-0" />
                        ) : (
                          <ChevronRight className="w-4 h-4 text-slate-500 shrink-0" />
                        )}
                        <span className="text-xs font-semibold text-indigo-700 uppercase tracking-wider">
                          {branch.name}
                        </span>
                        <span aria-hidden="true" className="text-slate-300">·</span>
                        <h4 className="text-xs sm:text-sm font-bold text-slate-900">
                          {chapter.name}
                        </h4>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        {matchingLesson ? (
                          <button
                            onClick={e => {
                              e.stopPropagation();
                              setActiveLessonModal(matchingLesson);
                            }}
                            className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors cursor-pointer"
                          >
                            <BookOpen className="w-3.5 h-3.5" />
                            <span>Mở bài giảng</span>
                          </button>
                        ) : isTeacherMode ? (
                          <button
                            onClick={e => {
                              e.stopPropagation();
                              openStudioForLesson({
                                chapter: chapter.name,
                                title: `Chuyên đề: ${chapter.name}`,
                                grade,
                                tabCategory: grade === '10' ? 'toan-10' : grade === '11' ? 'toan-11' : 'toan-12',
                              } as any);
                            }}
                            className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold text-slate-600 hover:text-indigo-600 bg-white border border-slate-200 rounded-lg transition-colors cursor-pointer"
                          >
                            <Plus className="w-3.5 h-3.5" />
                            <span>Soạn bài</span>
                          </button>
                        ) : null}

                        <span className="text-[11px] text-slate-500 tabular-nums">
                          {chapter.children?.length || 0} bài
                        </span>
                      </div>
                    </div>

                    {/* Chapter Lessons List (Bài) */}
                    {isChapterOpen && chapter.children && (
                      <div className="p-3 sm:p-4 space-y-3 bg-white border-t border-slate-200">
                        {chapter.children.map(bai => {
                          const baiKey = `bai-${chapter.code}-${bai.code}`;
                          const isBaiOpen = expandedNodes[baiKey] ?? true;
                          const dangCount = bai.children?.length || 0;

                          return (
                            <div
                              key={baiKey}
                              className="border border-slate-100 rounded-lg p-3 bg-slate-50/40 hover:border-slate-300 transition-colors"
                            >
                              <div
                                onClick={() => toggleExpand(baiKey)}
                                className="flex items-center justify-between cursor-pointer"
                              >
                                <div className="flex items-center gap-2">
                                  {isBaiOpen ? (
                                    <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                                  ) : (
                                    <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                                  )}
                                  <h5 className="text-xs sm:text-sm font-bold text-slate-800">
                                    {bai.name}
                                  </h5>
                                </div>
                                <span className="text-[11px] text-slate-500 font-medium tabular-nums">
                                  {dangCount} dạng toán
                                </span>
                              </div>

                              {/* Problem Types (Dạng toán) */}
                              {isBaiOpen && bai.children && (
                                <div className="mt-2.5 pt-2 border-t border-slate-200/60 grid grid-cols-1 md:grid-cols-2 gap-1.5 pl-5">
                                  {bai.children.map(dang => (
                                    <div
                                      key={dang.code}
                                      className="flex items-center justify-between text-xs py-1.5 px-2.5 rounded-md bg-white border border-slate-100 text-slate-700 hover:border-indigo-200 transition-colors"
                                    >
                                      <span className="font-medium truncate mr-2">
                                        {dang.name}
                                      </span>
                                      <span className="text-[10px] text-indigo-600 font-mono shrink-0">
                                        [{dang.code}]
                                      </span>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
          </div>
        </div>
      )}
    </div>
  );
};
