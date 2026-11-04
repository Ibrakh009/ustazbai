import React from 'react';
import { Lock, Sparkles, ShieldCheck } from 'lucide-react';
import { PWAInstallButton } from './PWAInstallButton';

interface HeaderProps {
  activeTab: 'mentors' | 'education' | 'business' | 'calculator';
  onSelectTab: (tab: 'mentors' | 'education' | 'business' | 'calculator') => void;
  onOpenAdminLogin: () => void;
  isAdminLoggedIn: boolean;
  onOpenAdminPanel: () => void;
  bookingCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  onSelectTab,
  onOpenAdminLogin,
  isAdminLoggedIn,
  onOpenAdminPanel,
  bookingCount
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#090514]/90 backdrop-blur-md border-b border-purple-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Wordmark */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => onSelectTab('mentors')}
            className="group flex items-center gap-2.5 text-left focus:outline-none"
          >
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-purple-600 to-indigo-800 flex items-center justify-center font-bold text-white shadow-lg shadow-purple-900/40 border border-purple-500/30 group-hover:scale-105 transition-transform">
              U
            </div>
            <div>
              <span className="text-xl font-extrabold tracking-tight text-white flex items-center gap-1.5">
                USTAZ<span className="text-purple-400">.KZ</span>
              </span>
            </div>
          </button>
        </div>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-sm font-medium">
          <button
            onClick={() => onSelectTab('mentors')}
            className={`whitespace-nowrap transition-colors py-1 relative ${
              activeTab === 'mentors'
                ? 'text-purple-300 font-semibold'
                : 'text-purple-200/70 hover:text-white'
            }`}
          >
            Каталог менторов (10)
            {activeTab === 'mentors' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-500 rounded-full" />
            )}
          </button>

          <button
            onClick={() => onSelectTab('education')}
            className={`whitespace-nowrap transition-colors py-1 relative ${
              activeTab === 'education'
                ? 'text-purple-300 font-semibold'
                : 'text-purple-200/70 hover:text-white'
            }`}
          >
            ЕНТ и Вузы Казахстана
            {activeTab === 'education' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-500 rounded-full" />
            )}
          </button>

          <button
            onClick={() => onSelectTab('business')}
            className={`whitespace-nowrap transition-colors py-1 relative ${
              activeTab === 'business'
                ? 'text-purple-300 font-semibold'
                : 'text-purple-200/70 hover:text-white'
            }`}
          >
            Бизнес в РК: Аналитика
            {activeTab === 'business' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-500 rounded-full" />
            )}
          </button>

          <button
            onClick={() => onSelectTab('calculator')}
            className={`whitespace-nowrap transition-colors py-1 relative ${
              activeTab === 'calculator'
                ? 'text-purple-300 font-semibold'
                : 'text-purple-200/70 hover:text-white'
            }`}
          >
            Калькулятор гранта
            {activeTab === 'calculator' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-500 rounded-full" />
            )}
          </button>
        </nav>

        {/* Zone 3: Primary Action & Secret Trigger */}
        <div className="flex items-center gap-3 shrink-0">
          {isAdminLoggedIn ? (
            <button
              onClick={onOpenAdminPanel}
              className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-emerald-300 bg-emerald-950/60 border border-emerald-500/40 rounded-lg hover:bg-emerald-900/40 transition-colors"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Панель управления</span>
              {bookingCount > 0 && (
                <span className="bg-emerald-500 text-black px-1.5 py-0.2 rounded-full font-bold text-[10px]">
                  {bookingCount}
                </span>
              )}
            </button>
          ) : null}

          <PWAInstallButton className="hidden sm:flex" />

          <button
            onClick={() => onSelectTab('mentors')}
            className="px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 rounded-lg shadow-lg shadow-purple-900/40 border border-purple-400/20 transition-all hover:shadow-purple-700/50 whitespace-nowrap"
          >
            Подобрать ментора
          </button>

          {/* Discreet Admin Lock Trigger */}
          <button
            onClick={isAdminLoggedIn ? onOpenAdminPanel : onOpenAdminLogin}
            title={isAdminLoggedIn ? "Открыть админку" : "Служебный доступ (ibrakh093 / ibrakh0)"}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-purple-400/40 hover:text-purple-300 hover:bg-purple-950/50 transition-colors"
            aria-label="Служебный доступ"
          >
            <Lock className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </header>
  );
};
