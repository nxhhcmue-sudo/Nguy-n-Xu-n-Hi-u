import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { UserRole } from '../../types/auth';
import {
  X,
  LogIn,
  UserPlus,
  Lock,
  Mail,
  User,
  School,
  Sparkles,
  GraduationCap,
  Briefcase,
  AlertCircle
} from 'lucide-react';

export const AuthModal: React.FC = () => {
  const {
    isAuthModalOpen,
    authModalMode,
    closeAuthModal,
    openLoginModal,
    openRegisterModal,
    login,
    register,
    quickDemoLogin,
  } = useAuth();

  // Login form state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Register form state
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regPasswordConfirm, setRegPasswordConfirm] = useState('');
  const [regRole, setRegRole] = useState<UserRole>('student');
  const [regGrade, setRegGrade] = useState<'10' | '11' | '12' | 'ĐGNL'>('12');
  const [regSchool, setRegSchool] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regError, setRegError] = useState('');

  if (!isAuthModalOpen) return null;

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    setIsSubmitting(true);
    const res = await login(loginEmail, loginPassword);
    setIsSubmitting(false);
    if (!res.success) {
      setLoginError(res.error || 'Đăng nhập không thành công');
    }
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setRegError('');

    if (regPassword.length < 6) {
      setRegError('Mật khẩu phải có ít nhất 6 ký tự!');
      return;
    }
    if (regPassword !== regPasswordConfirm) {
      setRegError('Mật khẩu xác nhận không khớp!');
      return;
    }

    setIsSubmitting(true);
    const res = await register({
      name: regName,
      email: regEmail,
      password: regPassword,
      role: regRole,
      grade: regGrade,
      school: regSchool,
      phone: regPhone,
    });
    setIsSubmitting(false);
    if (!res.success) {
      setRegError(res.error || 'Đăng ký không thành công');
    }
  };

  return (
    <div className="fixed inset-0 z-60 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden border border-slate-200">
        {/* Header Tabs */}
        <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50 px-6 pt-4">
          <div className="flex gap-4">
            <button
              onClick={openLoginModal}
              className={`pb-3 text-sm font-bold border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 ${
                authModalMode === 'login'
                  ? 'border-indigo-600 text-indigo-600'
                  : 'border-transparent text-slate-500 hover:text-slate-900'
              }`}
            >
              <LogIn className="w-4 h-4" />
              <span>Đăng nhập</span>
            </button>
            <button
              onClick={openRegisterModal}
              className={`pb-3 text-sm font-bold border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 ${
                authModalMode === 'register'
                  ? 'border-indigo-600 text-indigo-600'
                  : 'border-transparent text-slate-500 hover:text-slate-900'
              }`}
            >
              <UserPlus className="w-4 h-4" />
              <span>Tạo tài khoản mới</span>
            </button>
          </div>

          <button
            onClick={closeAuthModal}
            className="pb-3 text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          {/* ================= FORM: ĐĂNG NHẬP ================= */}
          {authModalMode === 'login' && (
            <div className="space-y-5">
              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  Chào mừng bạn trở lại!
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Đăng nhập để vào thi thử, lưu bảng điểm và quản lý học tập tại Trung Tâm Trí Nhân.
                </p>
              </div>

              {loginError && (
                <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{loginError}</span>
                </div>
              )}

              <form onSubmit={handleLoginSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Email hoặc Số điện thoại
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      value={loginEmail}
                      onChange={e => setLoginEmail(e.target.value)}
                      placeholder="gv.trinhan@edu.vn hoặc hs.minhanh@gmail.com"
                      className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Mật khẩu
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="password"
                      required
                      value={loginPassword}
                      onChange={e => setLoginPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:bg-white"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-2.5 text-xs sm:text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 rounded-lg transition-colors shadow-2xs cursor-pointer"
                >
                  {isSubmitting ? 'Đang đăng nhập...' : 'Đăng nhập vào hệ thống'}
                </button>
              </form>

              {/* 1-Click Quick Demo Login */}
              <div className="pt-4 border-t border-slate-200">
                <span className="text-[11px] font-bold text-slate-500 block mb-2 uppercase tracking-wider">
                  Đăng nhập nhanh 1-chạm (Dành cho thử nghiệm):
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => quickDemoLogin('teacher')}
                    className="p-2.5 border border-indigo-200 bg-indigo-50/60 hover:bg-indigo-100/70 rounded-lg text-left transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-1.5 text-xs font-bold text-indigo-800">
                      <Briefcase className="w-3.5 h-3.5" />
                      <span>Giáo Viên Toán</span>
                    </div>
                    <div className="text-[10px] text-slate-500 mt-0.5">Thầy Trí (Toàn quyền)</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => quickDemoLogin('student12')}
                    className="p-2.5 border border-emerald-200 bg-emerald-50/60 hover:bg-emerald-100/70 rounded-lg text-left transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-800">
                      <GraduationCap className="w-3.5 h-3.5" />
                      <span>Học Sinh 12</span>
                    </div>
                    <div className="text-[10px] text-slate-500 mt-0.5">Minh Anh (Lớp 12)</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => quickDemoLogin('student11')}
                    className="p-2.5 border border-sky-200 bg-sky-50/60 hover:bg-sky-100/70 rounded-lg text-left transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-1.5 text-xs font-bold text-sky-800">
                      <GraduationCap className="w-3.5 h-3.5" />
                      <span>Học Sinh 11</span>
                    </div>
                    <div className="text-[10px] text-slate-500 mt-0.5">Quang Huy (Lớp 11)</div>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ================= FORM: ĐĂNG KÝ ================= */}
          {authModalMode === 'register' && (
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  Tạo tài khoản học tập & giảng dạy
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Lưu điểm số, theo dõi quá trình tiến bộ và luyện thi trực tuyến.
                </p>
              </div>

              {regError && (
                <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{regError}</span>
                </div>
              )}

              <form onSubmit={handleRegisterSubmit} className="space-y-3.5">
                {/* Role Selection */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Bạn tham gia với vai trò:
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setRegRole('student')}
                      className={`p-2.5 rounded-lg border text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                        regRole === 'student'
                          ? 'border-indigo-600 bg-indigo-50 text-indigo-900 shadow-2xs'
                          : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      <GraduationCap className="w-4 h-4" />
                      <span>Học Sinh</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setRegRole('teacher')}
                      className={`p-2.5 rounded-lg border text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                        regRole === 'teacher'
                          ? 'border-indigo-600 bg-indigo-50 text-indigo-900 shadow-2xs'
                          : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      <Briefcase className="w-4 h-4" />
                      <span>Giáo Viên</span>
                    </button>
                  </div>
                </div>

                {/* Name */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Họ và tên *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      value={regName}
                      onChange={e => setRegName(e.target.value)}
                      placeholder="VD: Nguyễn Hoàng Long"
                      className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:bg-white"
                    />
                  </div>
                </div>

                {/* Email & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Email đăng nhập *
                    </label>
                    <input
                      type="email"
                      required
                      value={regEmail}
                      onChange={e => setRegEmail(e.target.value)}
                      placeholder="email@example.com"
                      className="w-full p-2 text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Số điện thoại
                    </label>
                    <input
                      type="tel"
                      value={regPhone}
                      onChange={e => setRegPhone(e.target.value)}
                      placeholder="09xx xxx xxx"
                      className="w-full p-2 text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-lg"
                    />
                  </div>
                </div>

                {/* Grade & School */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Khối lớp
                    </label>
                    <select
                      value={regGrade}
                      onChange={e => setRegGrade(e.target.value as any)}
                      className="w-full p-2 text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-lg"
                    >
                      <option value="12">Lớp 12 (Ôn thi THPT & ĐGNL)</option>
                      <option value="11">Lớp 11</option>
                      <option value="10">Lớp 10</option>
                      <option value="ĐGNL">Luyện Thi ĐGNL</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Trường THPT
                    </label>
                    <input
                      type="text"
                      value={regSchool}
                      onChange={e => setRegSchool(e.target.value)}
                      placeholder="VD: THPT Mạc Đĩnh Chi"
                      className="w-full p-2 text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-lg"
                    />
                  </div>
                </div>

                {/* Password & Confirm */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Mật khẩu (≥ 6 ký tự) *
                    </label>
                    <input
                      type="password"
                      required
                      value={regPassword}
                      onChange={e => setRegPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full p-2 text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Xác nhận mật khẩu *
                    </label>
                    <input
                      type="password"
                      required
                      value={regPasswordConfirm}
                      onChange={e => setRegPasswordConfirm(e.target.value)}
                      placeholder="••••••••"
                      className="w-full p-2 text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-lg"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-2.5 text-xs sm:text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 rounded-lg transition-colors shadow-2xs cursor-pointer mt-2"
                >
                  {isSubmitting ? 'Đang tạo tài khoản...' : 'Hoàn tất đăng ký'}
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
