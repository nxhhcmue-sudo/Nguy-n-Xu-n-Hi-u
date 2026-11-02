import React from 'react';
import { useMathPortal } from '../context/MathPortalContext';
import { TabCategory } from '../types';
import { RefreshCw, Download, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setActiveTab, resetToDefault, exportDataAsJson } = useMathPortal();

  return (
    <footer className="bg-white border-t border-slate-200 mt-16 text-slate-600 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Col 1 */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded bg-indigo-600 text-white flex items-center justify-center font-bold text-xs">
                ∑
              </span>
              <span className="font-bold text-slate-900 text-sm">
                Trung Tâm Trí Nhân
              </span>
            </div>
            <p className="text-slate-500 leading-relaxed">
              Cổng học tập, quản lý bài giảng và luyện thi thử trực tuyến dành cho học sinh và giáo viên môn Toán THPT theo Chương trình Giáo dục Phổ thông mới.
            </p>
          </div>

          {/* Col 2: Khối Lớp */}
          <div>
            <h4 className="font-semibold text-slate-900 mb-3 text-xs uppercase tracking-wider">
              Chương trình Phổ thông
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => setActiveTab('toan-10')}
                  className="hover:text-indigo-600 transition-colors cursor-pointer"
                >
                  Toán 10 (Đại số, Hình học & Thống kê)
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('toan-11')}
                  className="hover:text-indigo-600 transition-colors cursor-pointer"
                >
                  Toán 11 (Lượng giác, Cấp số, Giới hạn)
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('toan-12')}
                  className="hover:text-indigo-600 transition-colors cursor-pointer"
                >
                  Toán 12 (Đạo hàm, Oxyz, Tích phân)
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Đề thi thử */}
          <div>
            <h4 className="font-semibold text-slate-900 mb-3 text-xs uppercase tracking-wider">
              Khảo sát & Thi thử
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => setActiveTab('ghk-hk')}
                  className="hover:text-indigo-600 transition-colors cursor-pointer"
                >
                  Đề thi thử Giữa HK1 - Cuối HK1
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('ghk-hk')}
                  className="hover:text-indigo-600 transition-colors cursor-pointer"
                >
                  Đề thi thử Giữa HK2 - Cuối HK2
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('dgnl')}
                  className="hover:text-indigo-600 transition-colors cursor-pointer"
                >
                  Đề ĐGNL ĐHQG TP.HCM (Tư duy toán học)
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('dgnl')}
                  className="hover:text-indigo-600 transition-colors cursor-pointer"
                >
                  Đề ĐGNL ĐHQG Hà Nội (HSA Định lượng)
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Dữ liệu & Lưu trữ */}
          <div>
            <h4 className="font-semibold text-slate-900 mb-3 text-xs uppercase tracking-wider">
              Quản lý Dữ liệu
            </h4>
            <div className="space-y-2.5">
              <button
                onClick={exportDataAsJson}
                className="flex items-center gap-1.5 text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
              >
                <Download className="w-3.5 h-3.5 text-indigo-600" />
                <span>Xuất toàn bộ bài giảng & đề (.json)</span>
              </button>
              <button
                onClick={resetToDefault}
                className="flex items-center gap-1.5 text-slate-500 hover:text-rose-600 transition-colors cursor-pointer"
                title="Khôi phục lại dữ liệu bài mẫu ban đầu"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Khôi phục dữ liệu gốc</span>
              </button>
              <p className="text-[11px] text-slate-400 pt-1">
                Dữ liệu được lưu trữ trực tiếp trên trình duyệt của bạn (Offline-ready).
              </p>
            </div>
          </div>
        </div>

        {/* Quiet Copyright Row */}
        <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-400 text-[11px]">
          <div>
            © {new Date().getFullYear()} Trung Tâm Trí Nhân · Xây dựng theo Chương trình GDPT 2018 Bộ Giáo dục & Đào tạo.
          </div>
          <div className="flex items-center gap-3">
            <span>Hỗ trợ hiển thị công thức chuẩn KaTeX / LaTeX</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
