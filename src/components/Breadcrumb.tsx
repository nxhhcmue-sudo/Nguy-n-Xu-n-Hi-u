import React from 'react';
import { useMathPortal } from '../context/MathPortalContext';
import { getGradeBranches } from '../data/taxonomyTree';
import { TabCategory } from '../types';
import {
  Home,
  ChevronRight,
  BookOpen,
  FileText,
  FolderTree,
  X,
  Search,
  Upload,
  Sparkles,
  RotateCcw
} from 'lucide-react';

export const Breadcrumb: React.FC = () => {
  const {
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
    lessons,
    exams,
  } = useMathPortal();

  // Tab label mapping
  const TAB_LABELS: Record<TabCategory, string> = {
    'toan-10': 'Toán 10',
    'toan-11': 'Toán 11',
    'toan-12': 'Toán 12',
    'ghk-hk': 'Đề thi thử GHK - HK',
    'dgnl': 'Đề thi thử ĐGNL',
    'tai-de-thi': 'Tải đề thi lên (PDF/Word)',
  };

  const isGradeTab = activeTab === 'toan-10' || activeTab === 'toan-11' || activeTab === 'toan-12';
  const gradeKey = activeTab === 'toan-10' ? '10' : activeTab === 'toan-11' ? '11' : '12';

  // Get current branch name if selected
  const branchName = React.useMemo(() => {
    if (!isGradeTab || selectedBranch === 'all') return null;
    const branches = getGradeBranches(gradeKey);
    const found = branches.find(b => b.code === selectedBranch);
    return found ? found.name : selectedBranch;
  }, [isGradeTab, selectedBranch, gradeKey]);

  // Subfilter label for exam tabs
  const subFilterLabel = React.useMemo(() => {
    if (subFilter === 'all') return null;
    if (activeTab === 'ghk-hk') {
      switch (subFilter) {
        case '10':
          return 'Khối 10';
        case '11':
          return 'Khối 11';
        case '12':
          return 'Khối 12';
        case 'giua-ki':
          return 'Đề Giữa Kì';
        case 'cuoi-ki':
          return 'Đề Cuối Kì';
        default:
          return subFilter;
      }
    }
    if (activeTab === 'dgnl') {
      switch (subFilter) {
        case 'hcm':
          return 'ĐHQG TP. Hồ Chí Minh';
        case 'hn':
          return 'ĐHQG Hà Nội (HSA)';
        default:
          return subFilter;
      }
    }
    return null;
  }, [activeTab, subFilter]);

  // Handlers
  const handleGoHome = () => {
    setActiveTab('toan-10');
    setSelectedBranch('all');
    setSelectedChapter('all');
    setSubFilter('all');
    setSearchQuery('');
  };

  const handleGoTab = () => {
    setSelectedBranch('all');
    setSelectedChapter('all');
    setSubFilter('all');
    setSearchQuery('');
  };

  const handleGoBranch = () => {
    setSelectedChapter('all');
    setSearchQuery('');
  };

  const handleClearChapter = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedChapter('all');
  };

  const handleClearBranch = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedBranch('all');
    setSelectedChapter('all');
  };

  const handleClearSubFilter = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSubFilter('all');
  };

  const handleClearSearch = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSearchQuery('');
  };

  // Determine if any sub-filter / search is active
  const hasActiveFilters =
    (selectedBranch !== 'all' && isGradeTab) ||
    selectedChapter !== 'all' ||
    (subFilter !== 'all' && (activeTab === 'ghk-hk' || activeTab === 'dgnl')) ||
    searchQuery.trim().length > 0;

  // Count items currently in view
  const currentItemCount = React.useMemo(() => {
    if (isGradeTab) {
      return lessons.filter(l => l.tabCategory === activeTab).length;
    }
    if (activeTab === 'ghk-hk' || activeTab === 'dgnl') {
      return exams.filter(e => e.tabCategory === activeTab).length;
    }
    return null;
  }, [isGradeTab, activeTab, lessons, exams]);

  return (
    <div className="bg-white/95 border-b border-slate-200/90 shadow-2xs sticky top-16 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5">
        <div className="flex items-center justify-between gap-4">
          {/* Breadcrumb Path List */}
          <nav aria-label="Đường dẫn điều hướng" className="overflow-x-auto no-scrollbar py-0.5">
            <ol className="flex items-center gap-1.5 sm:gap-2 text-xs text-slate-500 font-medium whitespace-nowrap">
              {/* Level 0: Home */}
              <li className="inline-flex items-center">
                <button
                  onClick={handleGoHome}
                  className="group inline-flex items-center gap-1.5 text-slate-500 hover:text-indigo-600 transition-colors cursor-pointer focus:outline-none focus:ring-1 focus:ring-indigo-500 rounded px-1 -mx-1"
                  title="Về Trang chủ"
                >
                  <Home className="w-3.5 h-3.5 text-slate-400 group-hover:text-indigo-600 transition-colors shrink-0" />
                  <span className="font-medium">Trang chủ</span>
                </button>
              </li>

              {/* Separator */}
              <li aria-hidden="true" className="inline-flex items-center text-slate-300">
                <ChevronRight className="w-3.5 h-3.5" />
              </li>

              {/* Level 1: Active Tab (e.g. Toán 10, Toán 11, etc.) */}
              <li className="inline-flex items-center">
                {!branchName && !subFilterLabel && selectedChapter === 'all' && !searchQuery ? (
                  <span
                    className="font-semibold text-slate-900 flex items-center gap-1 px-1"
                    aria-current="page"
                  >
                    {TAB_LABELS[activeTab]}
                  </span>
                ) : (
                  <button
                    onClick={handleGoTab}
                    className="text-slate-600 hover:text-indigo-600 transition-colors cursor-pointer px-1 -mx-1 rounded focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  >
                    {TAB_LABELS[activeTab]}
                  </button>
                )}
              </li>

              {/* Level 2: Branch (e.g., "Chuyên đề", "Đại số...", "Hình học...") */}
              {isGradeTab && branchName && (
                <>
                  <li aria-hidden="true" className="inline-flex items-center text-slate-300">
                    <ChevronRight className="w-3.5 h-3.5" />
                  </li>
                  <li className="inline-flex items-center">
                    {selectedChapter === 'all' && !searchQuery ? (
                      <span
                        className="inline-flex items-center gap-1.5 font-semibold text-slate-900 bg-slate-100/80 px-2 py-0.5 rounded-md"
                        aria-current="page"
                      >
                        <FolderTree className="w-3 h-3 text-indigo-600 shrink-0" />
                        <span className="max-w-[200px] truncate">{branchName}</span>
                        <button
                          onClick={handleClearBranch}
                          className="text-slate-400 hover:text-slate-600 p-0.5 rounded-xs transition-colors cursor-pointer"
                          title="Bỏ chọn phân môn"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ) : (
                      <button
                        onClick={handleGoBranch}
                        className="text-slate-600 hover:text-indigo-600 transition-colors cursor-pointer px-1 -mx-1 rounded flex items-center gap-1 max-w-[160px] truncate"
                        title={branchName}
                      >
                        <span className="truncate">{branchName}</span>
                      </button>
                    )}
                  </li>
                </>
              )}

              {/* Level 3: Chapter (if selectedChapter !== 'all') */}
              {selectedChapter !== 'all' && (
                <>
                  <li aria-hidden="true" className="inline-flex items-center text-slate-300">
                    <ChevronRight className="w-3.5 h-3.5" />
                  </li>
                  <li className="inline-flex items-center">
                    <span
                      className="inline-flex items-center gap-1.5 font-semibold text-slate-900 bg-indigo-50/70 border border-indigo-100/80 px-2 py-0.5 rounded-md"
                      aria-current="page"
                      title={selectedChapter}
                    >
                      <BookOpen className="w-3 h-3 text-indigo-600 shrink-0" />
                      <span className="max-w-[180px] sm:max-w-[280px] truncate">
                        {selectedChapter}
                      </span>
                      <button
                        onClick={handleClearChapter}
                        className="text-indigo-400 hover:text-indigo-700 p-0.5 rounded-xs transition-colors cursor-pointer"
                        title="Bỏ chọn chương này"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  </li>
                </>
              )}

              {/* Level 2 for Exam tabs: Sub-Filter (e.g. Khối 12, ĐHQG TP.HCM, etc.) */}
              {(activeTab === 'ghk-hk' || activeTab === 'dgnl') && subFilterLabel && (
                <>
                  <li aria-hidden="true" className="inline-flex items-center text-slate-300">
                    <ChevronRight className="w-3.5 h-3.5" />
                  </li>
                  <li className="inline-flex items-center">
                    <span
                      className="inline-flex items-center gap-1.5 font-semibold text-slate-900 bg-emerald-50 border border-emerald-200/60 px-2 py-0.5 rounded-md"
                      aria-current="page"
                    >
                      <FileText className="w-3 h-3 text-emerald-600 shrink-0" />
                      <span>{subFilterLabel}</span>
                      <button
                        onClick={handleClearSubFilter}
                        className="text-emerald-500 hover:text-emerald-700 p-0.5 rounded-xs transition-colors cursor-pointer"
                        title="Bỏ chọn bộ lọc đề thi"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  </li>
                </>
              )}

              {/* Level 4 / Search Query Indicator */}
              {searchQuery.trim() && (
                <>
                  <li aria-hidden="true" className="inline-flex items-center text-slate-300">
                    <ChevronRight className="w-3.5 h-3.5" />
                  </li>
                  <li className="inline-flex items-center">
                    <span className="inline-flex items-center gap-1.5 font-medium text-amber-900 bg-amber-50 border border-amber-200/80 px-2 py-0.5 rounded-md">
                      <Search className="w-3 h-3 text-amber-600 shrink-0" />
                      <span>Tìm: &ldquo;{searchQuery}&rdquo;</span>
                      <button
                        onClick={handleClearSearch}
                        className="text-amber-500 hover:text-amber-800 p-0.5 rounded-xs transition-colors cursor-pointer"
                        title="Xoá tìm kiếm"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  </li>
                </>
              )}
            </ol>
          </nav>

          {/* Right side helper info / quick reset */}
          <div className="shrink-0 flex items-center gap-3">
            {hasActiveFilters && (
              <button
                onClick={handleGoTab}
                className="hidden sm:inline-flex items-center gap-1 text-[11px] font-medium text-slate-500 hover:text-indigo-600 transition-colors cursor-pointer"
                title="Đặt lại toàn bộ bộ lọc trong tab hiện tại"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Đặt lại</span>
              </button>
            )}

            {currentItemCount !== null && (
              <span className="text-[11px] text-slate-400 font-medium tabular-nums hidden sm:inline">
                {currentItemCount} mục
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
