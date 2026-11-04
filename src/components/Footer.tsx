import React from 'react';
import { Lock } from 'lucide-react';

interface FooterProps {
  onOpenAdminLogin: () => void;
  isAdminLoggedIn: boolean;
  onOpenAdminPanel: () => void;
  onSelectTab: (tab: 'mentors' | 'education' | 'business' | 'calculator') => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenAdminLogin,
  isAdminLoggedIn,
  onOpenAdminPanel,
  onSelectTab
}) => {
  return (
    <footer className="border-t border-purple-900/30 bg-[#07040e] text-purple-300/70 text-xs py-10 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded bg-purple-600 flex items-center justify-center font-bold text-white text-xs">
                U
              </div>
              <span className="text-base font-extrabold text-white tracking-tight">
                USTAZ<span className="text-purple-400">.KZ</span>
              </span>
            </div>
            <p className="text-xs text-purple-300/60 leading-relaxed">
              Премиальная платформа проверенных менторов для всех возрастов. Цены строго в тенге (₸). Актуальная информация по ЕНТ, вузам и бизнесу в РК.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
              Разделы
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => onSelectTab('mentors')}
                  className="hover:text-white transition-colors"
                >
                  Каталог 10 менторов
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('education')}
                  className="hover:text-white transition-colors"
                >
                  Вузы Казахстана и ЕНТ
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('calculator')}
                  className="hover:text-white transition-colors"
                >
                  Калькулятор шансов на грант
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('business')}
                  className="hover:text-white transition-colors"
                >
                  Бизнес в РК: Статистика и налоги
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
              География экспертов
            </h4>
            <ul className="space-y-2 text-purple-300/70">
              <li>🇰🇿 Казахстан (ЕНТ, NU, КБТУ, Kaspi, Даму)</li>
              <li>🇺🇸 США (Ivy League, SAT, Silicon Valley Big Tech)</li>
              <li>🇷🇺 Россия (Ex-Yandex, Product Design, Свитчинг)</li>
              <li className="text-[11px] text-purple-400/50">Формат: Онлайн (Google Meet / Zoom)</li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
              Служебный доступ
            </h4>
            <p className="text-[11px] text-purple-300/60 leading-relaxed mb-3">
              Панель куратора для управления ставками менторов, модерации заявок и редактирования цен.
            </p>
            <button
              onClick={isAdminLoggedIn ? onOpenAdminPanel : onOpenAdminLogin}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-purple-950/60 border border-purple-800/40 text-purple-300 hover:text-white hover:bg-purple-900/40 text-xs transition-colors"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>{isAdminLoggedIn ? 'Панель администратора' : 'Служебный вход (ibrakh093)'}</span>
            </button>
          </div>
        </div>

        <div className="border-t border-purple-900/20 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-purple-400/50">
          <div>
            © {new Date().getFullYear()} USTAZ.KZ. Все права защищены. Оплата и расчеты исключительно в тенге (₸).
          </div>
          <div className="flex items-center gap-4">
            <span>Казахстан · Астана · Алматы</span>
            <span>Горячая клавиша входа: <kbd className="font-mono bg-purple-950/60 border border-purple-800/40 px-1.5 py-0.5 rounded text-purple-300 text-[10px]">Alt + A</kbd></span>
          </div>
        </div>
      </div>
    </footer>
  );
};
