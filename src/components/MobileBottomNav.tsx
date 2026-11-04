import React from 'react';
import { Users, GraduationCap, Building2, Calculator, Smartphone } from 'lucide-react';

interface MobileBottomNavProps {
  activeTab: 'mentors' | 'education' | 'business' | 'calculator';
  onSelectTab: (tab: 'mentors' | 'education' | 'business' | 'calculator') => void;
  onOpenInstallModal: () => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  activeTab,
  onSelectTab,
  onOpenInstallModal
}) => {
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#090413]/95 backdrop-blur-xl border-t border-purple-900/40 px-2 py-1.5 flex items-center justify-around shadow-2xl shadow-purple-950 pb-[calc(0.5rem+env(safe-area-inset-bottom))]">
      <button
        onClick={() => onSelectTab('mentors')}
        className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all min-w-[56px] min-h-[44px] ${
          activeTab === 'mentors'
            ? 'text-purple-300 font-bold bg-purple-950/60'
            : 'text-purple-300/60 hover:text-purple-200'
        }`}
      >
        <Users className="w-4 h-4 mb-0.5" />
        <span className="text-[10px] tracking-tight">Менторы</span>
      </button>

      <button
        onClick={() => onSelectTab('education')}
        className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all min-w-[56px] min-h-[44px] ${
          activeTab === 'education'
            ? 'text-purple-300 font-bold bg-purple-950/60'
            : 'text-purple-300/60 hover:text-purple-200'
        }`}
      >
        <GraduationCap className="w-4 h-4 mb-0.5" />
        <span className="text-[10px] tracking-tight">Вузы и ЕНТ</span>
      </button>

      <button
        onClick={() => onSelectTab('calculator')}
        className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all min-w-[56px] min-h-[44px] ${
          activeTab === 'calculator'
            ? 'text-purple-300 font-bold bg-purple-950/60'
            : 'text-purple-300/60 hover:text-purple-200'
        }`}
      >
        <Calculator className="w-4 h-4 mb-0.5" />
        <span className="text-[10px] tracking-tight">Гранты</span>
      </button>

      <button
        onClick={() => onSelectTab('business')}
        className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all min-w-[56px] min-h-[44px] ${
          activeTab === 'business'
            ? 'text-purple-300 font-bold bg-purple-950/60'
            : 'text-purple-300/60 hover:text-purple-200'
        }`}
      >
        <Building2 className="w-4 h-4 mb-0.5" />
        <span className="text-[10px] tracking-tight">Бизнес РК</span>
      </button>

      <button
        onClick={onOpenInstallModal}
        className="flex flex-col items-center justify-center py-1 px-2 rounded-xl text-purple-400 hover:text-purple-200 transition-all min-w-[52px] min-h-[44px]"
        title="Установить как PWA"
      >
        <Smartphone className="w-4 h-4 mb-0.5 text-purple-400" />
        <span className="text-[9px] font-semibold text-purple-300 tracking-tight">Скачать</span>
      </button>
    </nav>
  );
};
