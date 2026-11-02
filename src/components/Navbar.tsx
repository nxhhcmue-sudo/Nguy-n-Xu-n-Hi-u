import React, { useRef, useEffect } from 'react';
import { useMathPortal } from '../context/MathPortalContext';
import { useAuth } from '../context/AuthContext';
import { TabCategory } from '../types';
import { PlusCircle, Bookmark, Download, Upload, RefreshCw, User, LogIn, UserPlus } from 'lucide-react';

interface NavTabItem {
  id: TabCategory;
  label: string;
}

const NAV_TABS: NavTabItem[] = [
  { id: 'toan-10', label: 'Toán 10' },
  { id: 'toan-11', label: 'Toán 11' },
  { id: 'toan-12', label: 'Toán 12' },
  { id: 'ghk-hk', label: 'Đề thi thử GHK-HK' },
  { id: 'dgnl', label: 'Đề thi thử ĐGNL' },
  { id: 'tai-de-thi', label: 'Tải đề thi lên (PDF/Word)' },
];

export const Navbar: React.FC = () => {
  const {
    activeTab,
    setActiveTab,
    isTeacherMode,
    setIsTeacherMode,
    openStudioForLesson,
    openStudioForExam,
    exportDataAsJson,
    importDataFromJson,
    resetToDefault,
    bookmarks,
  } = useMathPortal();

  const {
    currentUser,
    openLoginModal,
    openRegisterModal,
    openAccountModal,
  } = useAuth();

  // Keep teacher mode aligned with user role
  React.useEffect(() => {
    if (currentUser?.role === 'teacher') {
      setIsTeacherMode(true);
    } else if (currentUser?.role === 'student') {
      setIsTeacherMode(false);
    }
  }, [currentUser]);

  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = event => {
      const content = event.target?.result as string;
      if (content) {
        const ok = importDataFromJson(content);
        if (ok) {
          alert('Đã nhập dữ liệu bài giảng và đề thi thành công!');
        } else {
          alert('Tệp dữ liệu không hợp lệ. Vui lòng kiểm tra lại định dạng JSON.');
        }
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-16">
          {/* Zone 1: Wordmark */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => setActiveTab('toan-10')}
              className="text-left group cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold text-base shadow-sm group-hover:bg-indigo-700 transition-colors">
                  ∑
                </span>
                <span className="text-xl font-bold tracking-tight text-slate-900 whitespace-nowrap">
                  Trung Tâm <span className="text-indigo-600 font-semibold text-base">Trí Nhân</span>
                </span>
              </div>
            </button>
          </div>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {NAV_TABS.map(tab => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-3 py-2 text-sm font-medium whitespace-nowrap transition-colors relative cursor-pointer ${
                    isActive
                      ? 'text-indigo-600 font-semibold'
                      : 'text-slate-600 hover:text-slate-950'
                  }`}
                >
                  {tab.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-indigo-600 rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: Primary Action, User Account & Teacher Tools */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {currentUser ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={openAccountModal}
                  className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg border border-slate-200 hover:border-indigo-300 bg-white hover:bg-slate-50 transition-all cursor-pointer shadow-2xs"
                  title="Mở hồ sơ cá nhân & Quản lý tài khoản"
                >
                  <div className="w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-xs shrink-0">
                    {currentUser.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="text-left hidden lg:block">
                    <div className="text-xs font-bold text-slate-800 leading-none truncate max-w-[110px]">
                      {currentUser.name}
                    </div>
                    <div className="text-[10px] text-slate-400 mt-0.5 leading-none">
                      {currentUser.role === 'teacher' ? 'Giáo viên' : `Học sinh ${currentUser.grade || '12'}`}
                    </div>
                  </div>
                </button>

                {currentUser.role === 'teacher' && (
                  <button
                    onClick={() => {
                      if (activeTab === 'ghk-hk' || activeTab === 'dgnl') {
                        openStudioForExam();
                      } else {
                        openStudioForLesson();
                      }
                    }}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 active:bg-indigo-800 transition-colors shadow-2xs whitespace-nowrap cursor-pointer"
                  >
                    <PlusCircle className="w-3.5 h-3.5" />
                    <span>Đăng nội dung</span>
                  </button>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-1.5">
                <button
                  onClick={openLoginModal}
                  className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:text-indigo-600 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                >
                  <LogIn className="w-3.5 h-3.5" />
                  <span>Đăng nhập</span>
                </button>
                <button
                  onClick={openRegisterModal}
                  className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors shadow-2xs cursor-pointer"
                >
                  <UserPlus className="w-3.5 h-3.5" />
                  <span>Đăng ký</span>
                </button>
              </div>
            )}

            {/* Quick backup / options button */}
            <div className="flex items-center gap-1 border-l border-slate-200 pl-2">
              <button
                onClick={exportDataAsJson}
                title="Tải tệp sao lưu dữ liệu (.json)"
                className="p-1.5 text-slate-500 hover:text-slate-800 rounded hover:bg-slate-100 transition-colors cursor-pointer"
                aria-label="Sao lưu"
              >
                <Download className="w-4 h-4" />
              </button>
              <button
                onClick={() => fileInputRef.current?.click()}
                title="Khôi phục / Nhập dữ liệu từ tệp (.json)"
                className="p-1.5 text-slate-500 hover:text-slate-800 rounded hover:bg-slate-100 transition-colors cursor-pointer"
                aria-label="Nhập dữ liệu"
              >
                <Upload className="w-4 h-4" />
              </button>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileUpload}
                accept=".json"
                className="hidden"
              />
            </div>
          </div>
        </div>

        {/* Mobile Nav Bar */}
        <div className="flex md:hidden overflow-x-auto py-2 gap-2 border-t border-slate-100 no-scrollbar">
          {NAV_TABS.map(tab => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3 py-1 text-xs font-medium whitespace-nowrap rounded-md transition-colors ${
                  isActive
                    ? 'bg-indigo-600 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
