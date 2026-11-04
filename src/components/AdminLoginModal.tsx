import React, { useState } from 'react';
import { X, Lock, ShieldAlert, KeyRound, ArrowRight } from 'lucide-react';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: () => void;
}

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess
}) => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (login.trim() === 'ibrakh093' && password === 'ibrakh0') {
      setError('');
      setLogin('');
      setPassword('');
      onLoginSuccess();
    } else {
      setError('Неверный логин или пароль служебного доступа');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div
        className="relative w-full max-w-sm bg-[#0f091c] border border-purple-800/50 rounded-2xl shadow-2xl shadow-purple-950/90 overflow-hidden p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-purple-400 hover:text-white transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="text-center space-y-2 mb-6">
          <div className="w-12 h-12 rounded-xl bg-purple-950/80 border border-purple-600/40 text-purple-400 flex items-center justify-center mx-auto shadow-inner">
            <KeyRound className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-white">
            Служебная аутентификация
          </h3>
          <p className="text-xs text-purple-300/70">
            Введите учетные данные администратора платформы
          </p>
        </div>

        {error && (
          <div className="p-2.5 rounded-lg bg-rose-950/80 border border-rose-600/40 text-rose-300 text-xs flex items-center gap-2 mb-4">
            <ShieldAlert className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
          <div>
            <label className="block text-purple-300 font-medium mb-1">
              Логин
            </label>
            <input
              type="text"
              autoFocus
              value={login}
              onChange={(e) => {
                setLogin(e.target.value);
                setError('');
              }}
              placeholder="Логин"
              className="w-full px-3 py-2 rounded-lg bg-[#160e28] border border-purple-900/50 text-white placeholder-purple-400/40 focus:outline-none focus:border-purple-500 font-mono"
              required
            />
          </div>

          <div>
            <label className="block text-purple-300 font-medium mb-1">
              Пароль
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError('');
              }}
              placeholder="••••••••"
              className="w-full px-3 py-2 rounded-lg bg-[#160e28] border border-purple-900/50 text-white placeholder-purple-400/40 focus:outline-none focus:border-purple-500 font-mono"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full mt-2 py-2.5 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs transition-all shadow-lg shadow-purple-900/40 flex items-center justify-center gap-1.5"
          >
            <Lock className="w-3.5 h-3.5" />
            <span>Войти в админ-панель</span>
          </button>
        </form>
      </div>
    </div>
  );
};
