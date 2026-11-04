import React, { useState } from 'react';
import { Smartphone, Download, Share, PlusSquare, X, Check } from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';

interface PWAInstallButtonProps {
  className?: string;
  variant?: 'header' | 'hero' | 'floating';
}

export const PWAInstallButton: React.FC<PWAInstallButtonProps> = ({
  className = '',
  variant = 'header'
}) => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showGuideModal, setShowGuideModal] = useState(false);

  // If already installed and launched from home screen in standalone mode, hide
  if (isInstalled) {
    return null;
  }

  const handleClick = async () => {
    if (isInstallable) {
      const ok = await install();
      if (!ok) {
        setShowGuideModal(true);
      }
    } else {
      setShowGuideModal(true);
    }
  };

  return (
    <>
      <button
        onClick={handleClick}
        className={`flex items-center gap-1.5 font-semibold transition-all cursor-pointer ${
          variant === 'header'
            ? 'px-3 py-1.5 text-xs text-purple-200 bg-purple-950/70 hover:bg-purple-900/60 border border-purple-700/50 rounded-lg shadow-sm'
            : variant === 'floating'
            ? 'px-3.5 py-2 text-xs text-white bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full shadow-lg shadow-purple-950/80 border border-purple-400/30'
            : 'px-4 py-2.5 text-xs text-purple-200 bg-purple-950/80 hover:bg-purple-900 border border-purple-700/60 rounded-xl'
        } ${className}`}
      >
        <Smartphone className="w-3.5 h-3.5 text-purple-400 shrink-0" />
        <span className="whitespace-nowrap">Установить как приложение</span>
      </button>

      {/* Guide Modal for iOS & Android Installation */}
      {showGuideModal && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div
            className="relative w-full max-w-sm bg-[#110a20] border border-purple-800/50 rounded-2xl p-6 shadow-2xl shadow-purple-950/90 text-center space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowGuideModal(false)}
              className="absolute right-4 top-4 text-purple-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>

            {/* App Icon Preview */}
            <div className="w-16 h-16 mx-auto rounded-2xl overflow-hidden shadow-xl shadow-purple-900/40 border border-purple-500/40 bg-purple-950 flex items-center justify-center">
              <img src="/icon.svg" alt="USTAZ Icon" className="w-full h-full object-cover" />
            </div>

            <div>
              <h3 className="font-bold text-white text-base">
                Установка USTAZ.KZ на смартфон
              </h3>
              <p className="text-xs text-purple-300/70 mt-1">
                Приложение откроется на весь экран без адресной строки браузера, как из App Store или Google Play
              </p>
            </div>

            {isIOS ? (
              /* iOS Safari instructions */
              <div className="p-3.5 rounded-xl bg-[#170e2b] border border-purple-900/40 text-left text-xs space-y-2.5 text-purple-200">
                <div className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-purple-900/60 text-purple-300 font-bold flex items-center justify-center text-[10px] shrink-0 mt-0.5">
                    1
                  </span>
                  <span>
                    Внизу экрана в Safari нажмите кнопку <strong className="text-white">«Поделиться»</strong> (квадрат со стрелкой вверх <Share className="inline w-3 h-3 text-purple-300 mx-0.5" />).
                  </span>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-purple-900/60 text-purple-300 font-bold flex items-center justify-center text-[10px] shrink-0 mt-0.5">
                    2
                  </span>
                  <span>
                    Прокрутите список вниз и выберите <strong className="text-white">«На экран «Домой»»</strong> (<PlusSquare className="inline w-3 h-3 text-purple-300 mx-0.5" />).
                  </span>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-purple-900/60 text-purple-300 font-bold flex items-center justify-center text-[10px] shrink-0 mt-0.5">
                    3
                  </span>
                  <span>
                    Нажмите <strong className="text-emerald-400">«Добавить»</strong> в правом верхнем углу.
                  </span>
                </div>
              </div>
            ) : (
              /* Android / Chrome instructions */
              <div className="p-3.5 rounded-xl bg-[#170e2b] border border-purple-900/40 text-left text-xs space-y-2 text-purple-200">
                <p>
                  1. В браузере Chrome нажмите меню с тремя точками <strong>⋮</strong> в правом верхнем углу.
                </p>
                <p>
                  2. Выберите <strong>«Установить приложение»</strong> или <strong>«Добавить на главный экран»</strong>.
                </p>
                <p className="text-[11px] text-purple-400/80">
                  После этого иконка USTAZ появится на рабочем столе смартфона.
                </p>
              </div>
            )}

            <button
              onClick={() => setShowGuideModal(false)}
              className="w-full py-2.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs transition-colors"
            >
              Понятно
            </button>
          </div>
        </div>
      )}
    </>
  );
};
