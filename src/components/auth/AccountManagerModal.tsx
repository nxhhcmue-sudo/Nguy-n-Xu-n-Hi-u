import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import {
  X,
  User,
  GraduationCap,
  Briefcase,
  Clock,
  Award,
  CheckCircle2,
  Calendar,
  Lock,
  LogOut,
  Save,
  Search,
  Trash2,
  FileText,
  BarChart2,
  BookOpen
} from 'lucide-react';

export const AccountManagerModal: React.FC = () => {
  const {
    currentUser,
    isAccountModalOpen,
    closeAccountModal,
    logout,
    updateProfile,
    changePassword,
    getUserSubmissions,
    allSubmissions,
    allUsers,
    deleteUser,
  } = useAuth();

  // Tabs: 'profile' | 'history' | 'students'
  const isTeacher = currentUser?.role === 'teacher';
  const [activeTab, setActiveTab] = useState<'profile' | 'history' | 'students'>(
    isTeacher ? 'students' : 'history'
  );

  // Profile Edit State
  const [name, setName] = useState(currentUser?.name || '');
  const [school, setSchool] = useState(currentUser?.school || '');
  const [grade, setGrade] = useState(currentUser?.grade || '12');
  const [phone, setPhone] = useState(currentUser?.phone || '');
  const [profileMsg, setProfileMsg] = useState('');

  // Password Change State
  const [oldPass, setOldPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [passMsg, setPassMsg] = useState<{ text: string; isError?: boolean } | null>(null);

  // Teacher Student Search
  const [studentSearch, setStudentSearch] = useState('');
  const [selectedStudentId, setSelectedStudentId] = useState<string | null>(null);

  if (!isAccountModalOpen || !currentUser) return null;

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateProfile({ name, school, grade: grade as any, phone });
    setProfileMsg('Đã lưu thông tin tài khoản thành công!');
    setTimeout(() => setProfileMsg(''), 3000);
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPass.length < 6) {
      setPassMsg({ text: 'Mật khẩu mới phải có ít nhất 6 ký tự!', isError: true });
      return;
    }
    const res = await changePassword(oldPass, newPass);
    if (res.success) {
      setPassMsg({ text: 'Đổi mật khẩu thành công!' });
      setOldPass('');
      setNewPass('');
      setTimeout(() => setPassMsg(null), 3000);
    } else {
      setPassMsg({ text: res.error || 'Đổi mật khẩu thất bại', isError: true });
    }
  };

  // Get submissions for active student or current user
  const userSubmissions = isTeacher && selectedStudentId
    ? allSubmissions.filter(s => s.userId === selectedStudentId)
    : getUserSubmissions();

  // Filter students for teacher view
  const studentsList = allUsers.filter(u => u.role === 'student');
  const filteredStudents = studentsList.filter(s => {
    if (!studentSearch.trim()) return true;
    const q = studentSearch.toLowerCase();
    return s.name.toLowerCase().includes(q) || s.email.toLowerCase().includes(q) || (s.school && s.school.toLowerCase().includes(q));
  });

  // Calculate statistics
  const totalTests = userSubmissions.length;
  const avgScore = totalTests > 0
    ? Math.round((userSubmissions.reduce((acc, s) => acc + s.score, 0) / totalTests) * 10) / 10
    : 0;

  return (
    <div className="fixed inset-0 z-60 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[92vh] flex flex-col overflow-hidden border border-slate-200">
        {/* Top Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between gap-4 bg-slate-50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-base shadow-xs">
              {currentUser.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-slate-900">
                  {currentUser.name}
                </h3>
                <span
                  className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                    currentUser.role === 'teacher'
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-emerald-100 text-emerald-800'
                  }`}
                >
                  {currentUser.role === 'teacher' ? 'Giáo Viên' : `Học Sinh Khối ${currentUser.grade}`}
                </span>
              </div>
              <span className="text-xs text-slate-500">{currentUser.email}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={logout}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-rose-700 hover:bg-rose-50 border border-rose-200 rounded-lg transition-colors cursor-pointer"
              title="Đăng xuất khỏi tài khoản"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Đăng xuất</span>
            </button>
            <button
              onClick={closeAccountModal}
              className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-200/60 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="px-6 border-b border-slate-200 flex items-center gap-4 bg-white overflow-x-auto">
          {isTeacher && (
            <button
              onClick={() => {
                setActiveTab('students');
                setSelectedStudentId(null);
              }}
              className={`py-3 text-xs sm:text-sm font-bold border-b-2 whitespace-nowrap cursor-pointer transition-colors flex items-center gap-1.5 ${
                activeTab === 'students'
                  ? 'border-indigo-600 text-indigo-600'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              <Briefcase className="w-4 h-4" />
              <span>Quản lý Học sinh ({studentsList.length})</span>
            </button>
          )}

          <button
            onClick={() => setActiveTab('history')}
            className={`py-3 text-xs sm:text-sm font-bold border-b-2 whitespace-nowrap cursor-pointer transition-colors flex items-center gap-1.5 ${
              activeTab === 'history'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Award className="w-4 h-4" />
            <span>
              {isTeacher && selectedStudentId
                ? 'Xem bài làm học sinh đã chọn'
                : 'Lịch sử làm bài thi'}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('profile')}
            className={`py-3 text-xs sm:text-sm font-bold border-b-2 whitespace-nowrap cursor-pointer transition-colors flex items-center gap-1.5 ${
              activeTab === 'profile'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <User className="w-4 h-4" />
            <span>Thông tin cá nhân & Mật khẩu</span>
          </button>
        </div>

        {/* Modal Content Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {/* ================= TAB 1: TEACHER'S STUDENT MANAGEMENT ================= */}
          {activeTab === 'students' && isTeacher && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h4 className="text-sm font-bold text-slate-900">
                    Danh Sách Học Sinh Trung Tâm Trí Nhân
                  </h4>
                  <p className="text-xs text-slate-500">
                    Theo dõi tiến độ học tập, số bài thi đã làm và kết quả điểm số của từng em.
                  </p>
                </div>

                <div className="relative max-w-xs w-full">
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={studentSearch}
                    onChange={e => setStudentSearch(e.target.value)}
                    placeholder="Tìm học sinh theo tên, email..."
                    className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              {/* Students Table */}
              <div className="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-2xs">
                <table className="w-full text-left text-xs text-slate-600">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-semibold uppercase tracking-wider text-[10px]">
                    <tr>
                      <th className="py-3 px-4">Họ và tên</th>
                      <th className="py-3 px-3">Khối lớp</th>
                      <th className="py-3 px-3">Trường</th>
                      <th className="py-3 px-3 text-center">Đề đã làm</th>
                      <th className="py-3 px-4 text-right">Thao tác</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredStudents.map(student => {
                      const studentSubs = allSubmissions.filter(s => s.userId === student.id);
                      return (
                        <tr key={student.id} className="hover:bg-slate-50/80 transition-colors">
                          <td className="py-3 px-4">
                            <div className="font-bold text-slate-900">{student.name}</div>
                            <div className="text-[11px] text-slate-400">{student.email}</div>
                          </td>
                          <td className="py-3 px-3">
                            <span className="font-semibold text-indigo-700">
                              Lớp {student.grade || '12'}
                            </span>
                          </td>
                          <td className="py-3 px-3 text-slate-600 truncate max-w-[150px]">
                            {student.school || 'THPT'}
                          </td>
                          <td className="py-3 px-3 text-center font-bold text-slate-800 tabular-nums">
                            {studentSubs.length} đề
                          </td>
                          <td className="py-3 px-4 text-right space-x-2">
                            <button
                              onClick={() => {
                                setSelectedStudentId(student.id);
                                setActiveTab('history');
                              }}
                              className="px-2.5 py-1 text-xs font-semibold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 rounded transition-colors cursor-pointer"
                            >
                              Xem điểm thi
                            </button>
                            <button
                              onClick={() => deleteUser(student.id)}
                              className="p-1 text-slate-400 hover:text-rose-600 rounded hover:bg-slate-100 transition-colors cursor-pointer"
                              title="Xoá tài khoản"
                            >
                              <Trash2 className="w-3.5 h-3.5 inline" />
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ================= TAB 2: EXAM HISTORY & SCORECARD ================= */}
          {activeTab === 'history' && (
            <div className="space-y-4">
              {/* Back to students button if teacher viewed a student */}
              {isTeacher && selectedStudentId && (
                <div className="flex items-center justify-between p-3 bg-indigo-50 border border-indigo-200 rounded-xl">
                  <span className="text-xs font-bold text-indigo-900">
                    Đang xem bài thi của: {allUsers.find(u => u.id === selectedStudentId)?.name}
                  </span>
                  <button
                    onClick={() => {
                      setSelectedStudentId(null);
                      setActiveTab('students');
                    }}
                    className="text-xs font-semibold text-indigo-700 hover:underline cursor-pointer"
                  >
                    ← Quay lại danh sách học sinh
                  </button>
                </div>
              )}

              {/* Statistics strip */}
              <div className="grid grid-cols-3 gap-3">
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-center">
                  <span className="text-[10px] text-slate-500 block uppercase font-medium">Tổng đề thi đã làm</span>
                  <span className="text-lg font-bold text-indigo-600 tabular-nums">
                    {totalTests} đề
                  </span>
                </div>
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-center">
                  <span className="text-[10px] text-slate-500 block uppercase font-medium">Điểm trung bình</span>
                  <span className="text-lg font-bold text-emerald-600 tabular-nums">
                    {avgScore}đ
                  </span>
                </div>
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-center">
                  <span className="text-[10px] text-slate-500 block uppercase font-medium">Tỉ lệ hoàn thành</span>
                  <span className="text-lg font-bold text-slate-800 tabular-nums">
                    100%
                  </span>
                </div>
              </div>

              {/* Submissions List */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  Chi tiết các lượt thi ({userSubmissions.length})
                </h4>

                {userSubmissions.length > 0 ? (
                  <div className="space-y-2.5">
                    {userSubmissions.map((sub, idx) => (
                      <div
                        key={sub.id || idx}
                        className="p-4 bg-white border border-slate-200 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-indigo-300 transition-colors shadow-2xs"
                      >
                        <div>
                          <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
                            <span className="font-semibold text-indigo-600">{sub.examType}</span>
                            <span aria-hidden="true" className="text-slate-300">·</span>
                            <span>{sub.submittedAt}</span>
                          </div>
                          <h5 className="text-sm font-bold text-slate-900 leading-snug">
                            {sub.examTitle}
                          </h5>
                          <div className="flex items-center gap-3 text-xs text-slate-500 mt-1.5 font-medium">
                            <span className="text-emerald-700 flex items-center gap-1">
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              <span>{sub.correctCount} / {sub.totalQuestions} câu đúng</span>
                            </span>
                            <span aria-hidden="true" className="text-slate-300">·</span>
                            <span>Thời gian: {Math.floor(sub.timeSpentSeconds / 60)} phút</span>
                          </div>
                        </div>

                        <div className="text-right shrink-0">
                          <span className="text-[10px] text-slate-400 block uppercase font-medium">Điểm số</span>
                          <span className="text-xl font-black text-indigo-700 tabular-nums">
                            {sub.score} / {sub.maxScore}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-8 text-center bg-slate-50 rounded-xl border border-dashed border-slate-200">
                    <Award className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                    <p className="text-xs text-slate-500">
                      Chưa có lượt làm bài nào được ghi nhận. Hãy vào mục "Đề thi thử GHK-HK" hoặc "Đề thi thử ĐGNL" để bắt đầu làm bài!
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ================= TAB 3: PROFILE & PASSWORD ================= */}
          {activeTab === 'profile' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Profile Details */}
              <div className="space-y-4">
                <h4 className="text-sm font-bold text-slate-900 pb-2 border-b border-slate-100">
                  Thông tin tài khoản
                </h4>

                {profileMsg && (
                  <div className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold">
                    {profileMsg}
                  </div>
                )}

                <form onSubmit={handleUpdateProfile} className="space-y-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Họ và tên
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={e => setName(e.target.value)}
                      className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-lg"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Email đăng nhập (Không thể thay đổi)
                    </label>
                    <input
                      type="text"
                      disabled
                      value={currentUser.email}
                      className="w-full text-xs p-2.5 bg-slate-100 border border-slate-200 text-slate-500 rounded-lg cursor-not-allowed"
                    />
                  </div>

                  {currentUser.role === 'student' && (
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Khối lớp
                        </label>
                        <select
                          value={grade}
                          onChange={e => setGrade(e.target.value as any)}
                          className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-lg"
                        >
                          <option value="10">Lớp 10</option>
                          <option value="11">Lớp 11</option>
                          <option value="12">Lớp 12</option>
                          <option value="ĐGNL">ĐGNL</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Số điện thoại
                        </label>
                        <input
                          type="tel"
                          value={phone}
                          onChange={e => setPhone(e.target.value)}
                          className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-lg"
                        />
                      </div>
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Trường học / Đơn vị
                    </label>
                    <input
                      type="text"
                      value={school}
                      onChange={e => setSchool(e.target.value)}
                      className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-lg"
                    />
                  </div>

                  <button
                    type="submit"
                    className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-2xs cursor-pointer"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>Lưu thay đổi thông tin</span>
                  </button>
                </form>
              </div>

              {/* Password Change */}
              <div className="space-y-4">
                <h4 className="text-sm font-bold text-slate-900 pb-2 border-b border-slate-100">
                  Đổi mật khẩu bảo mật
                </h4>

                {passMsg && (
                  <div
                    className={`p-2.5 rounded-lg text-xs font-semibold ${
                      passMsg.isError
                        ? 'bg-rose-50 border border-rose-200 text-rose-700'
                        : 'bg-emerald-50 border border-emerald-200 text-emerald-800'
                    }`}
                  >
                    {passMsg.text}
                  </div>
                )}

                <form onSubmit={handleChangePassword} className="space-y-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Mật khẩu hiện tại
                    </label>
                    <input
                      type="password"
                      required
                      value={oldPass}
                      onChange={e => setOldPass(e.target.value)}
                      placeholder="Mật khẩu cũ (mặc định demo là 123456)"
                      className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-lg"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Mật khẩu mới
                    </label>
                    <input
                      type="password"
                      required
                      value={newPass}
                      onChange={e => setNewPass(e.target.value)}
                      placeholder="Tối thiểu 6 ký tự"
                      className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-lg"
                    />
                  </div>

                  <button
                    type="submit"
                    className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-slate-800 bg-white border border-slate-300 hover:bg-slate-50 rounded-lg shadow-2xs cursor-pointer"
                  >
                    <Lock className="w-3.5 h-3.5" />
                    <span>Cập nhật mật khẩu mới</span>
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
