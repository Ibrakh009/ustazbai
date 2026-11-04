import React from 'react';
import { X, Star, ShieldCheck, MapPin, Clock, Award, BookOpen, Briefcase, CheckCircle2 } from 'lucide-react';
import { Mentor, MentorPackage } from '../types';
import { formatKzt } from '../utils/formatters';

interface MentorModalProps {
  mentor: Mentor | null;
  onClose: () => void;
  onSelectPackageAndBook: (mentor: Mentor, pkg: MentorPackage) => void;
}

export const MentorModal: React.FC<MentorModalProps> = ({
  mentor,
  onClose,
  onSelectPackageAndBook
}) => {
  if (!mentor) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div
        className="relative w-full max-w-3xl bg-[#100a1f] border border-purple-800/40 rounded-2xl shadow-2xl shadow-purple-950/80 overflow-hidden my-8 max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="p-6 border-b border-purple-900/30 flex items-start justify-between gap-4 bg-[#140e26]">
          <div className="flex items-start gap-4">
            {/* Typographic avatar */}
            <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${mentor.avatarColor} flex items-center justify-center text-white font-black text-2xl tracking-wider border border-purple-400/40 shadow-lg shrink-0 relative`}>
              {mentor.initials}
              <div className="absolute -bottom-1 -right-1 text-lg leading-none">
                {mentor.flag}
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-xl font-bold text-white">{mentor.name}</h2>
                <span className="flex items-center gap-1 text-xs text-purple-300 font-medium bg-purple-950/80 border border-purple-700/40 px-2 py-0.5 rounded-full">
                  <ShieldCheck className="w-3.5 h-3.5 text-purple-400" />
                  Верифицирован
                </span>
              </div>
              <p className="text-sm text-purple-200/80 font-medium mt-0.5">
                {mentor.title}
              </p>
              <div className="flex items-center gap-3 text-xs text-purple-400/70 mt-1.5 flex-wrap">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" />
                  {mentor.city} ({mentor.countryName})
                </span>
                <span aria-hidden="true">·</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  Опыт {mentor.experienceYears} лет
                </span>
                <span aria-hidden="true">·</span>
                <span className="flex items-center gap-1 text-amber-300 font-semibold">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  {mentor.rating} ({mentor.reviewsCount} отзывов)
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-purple-400 hover:text-white hover:bg-purple-900/40 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm text-purple-200/85">
          {/* Bio & Background */}
          <div>
            <h3 className="text-xs uppercase tracking-wider text-purple-400 font-semibold mb-2">
              О менторе
            </h3>
            <p className="leading-relaxed text-purple-100/90 text-sm">
              {mentor.bio}
            </p>
          </div>

          {/* Education & Current Role Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3.5 rounded-xl bg-purple-950/40 border border-purple-900/30">
              <div className="flex items-center gap-2 text-xs font-semibold text-purple-300 mb-1">
                <BookOpen className="w-4 h-4 text-purple-400" />
                Образование:
              </div>
              <div className="text-xs text-white/90 font-medium">
                {mentor.education}
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-purple-950/40 border border-purple-900/30">
              <div className="flex items-center gap-2 text-xs font-semibold text-purple-300 mb-1">
                <Briefcase className="w-4 h-4 text-purple-400" />
                Текущая должность:
              </div>
              <div className="text-xs text-white/90 font-medium">
                {mentor.currentRole}
              </div>
            </div>
          </div>

          {/* Key Achievements */}
          <div>
            <h3 className="text-xs uppercase tracking-wider text-purple-400 font-semibold mb-2.5 flex items-center gap-1.5">
              <Award className="w-4 h-4 text-purple-400" />
              Подтвержденные достижения
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {mentor.achievements.map((ach, idx) => (
                <div key={idx} className="flex items-start gap-2 p-2.5 rounded-lg bg-[#140e24] border border-purple-900/20 text-xs text-purple-200">
                  <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                  <span>{ach}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Topics Covered */}
          <div>
            <h3 className="text-xs uppercase tracking-wider text-purple-400 font-semibold mb-2">
              Темы для консультаций
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {mentor.topics.map((t, idx) => (
                <span key={idx} className="px-3 py-1 rounded-md bg-purple-950/60 border border-purple-800/40 text-xs text-purple-200">
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Pricing & Packages Section (In Tenge) */}
          <div className="pt-2">
            <h3 className="text-sm font-bold text-white mb-3">
              Пакеты и стоимость менторства (в тенге)
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {mentor.packages.map((pkg, idx) => (
                <div
                  key={idx}
                  className={`p-4 rounded-xl border flex flex-col justify-between transition-all ${
                    pkg.isPopular
                      ? 'bg-purple-950/60 border-purple-500 shadow-md shadow-purple-900/40'
                      : 'bg-[#140e24] border-purple-900/30'
                  }`}
                >
                  <div>
                    {pkg.isPopular && (
                      <div className="text-[10px] font-bold uppercase tracking-wider text-purple-300 mb-1">
                        ★ Популярный выбор
                      </div>
                    )}
                    <h4 className="font-bold text-white text-xs leading-snug mb-1">
                      {pkg.title}
                    </h4>
                    <div className="text-lg font-black text-white font-mono tabular-nums my-1.5">
                      {formatKzt(pkg.priceKzt)}
                    </div>
                    <p className="text-[11px] text-purple-300/70 leading-relaxed mb-3">
                      {pkg.description}
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      onClose();
                      onSelectPackageAndBook(mentor, pkg);
                    }}
                    className={`w-full py-2 px-3 text-xs font-semibold rounded-lg transition-colors ${
                      pkg.isPopular
                        ? 'bg-purple-600 hover:bg-purple-500 text-white'
                        : 'bg-purple-900/50 hover:bg-purple-800 text-purple-200'
                    }`}
                  >
                    Выбрать этот пакет
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Verified Reviews */}
          {mentor.reviews.length > 0 && (
            <div className="pt-2">
              <h3 className="text-xs uppercase tracking-wider text-purple-400 font-semibold mb-3">
                Реальные отзывы подопечных
              </h3>
              <div className="space-y-3">
                {mentor.reviews.map((rev) => (
                  <div key={rev.id} className="p-3.5 rounded-xl bg-[#140e24] border border-purple-900/30 space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <div className="font-semibold text-white flex items-center gap-2">
                        <span>{rev.author}</span>
                        <span className="text-[11px] text-purple-400/60 font-normal">({rev.authorRole}, {rev.city})</span>
                      </div>
                      <div className="flex items-center gap-1 text-amber-300">
                        <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                        <span className="font-mono">{rev.rating}</span>
                      </div>
                    </div>
                    <p className="text-xs text-purple-200/80 leading-relaxed">
                      "{rev.comment}"
                    </p>
                    <div className="text-[11px] text-purple-300 font-medium flex items-center gap-1">
                      <span className="text-purple-400">Результат:</span>
                      <span className="bg-purple-950/80 px-2 py-0.5 rounded text-purple-200">
                        {rev.result}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-purple-900/30 bg-[#140e26] flex items-center justify-between gap-4">
          <div>
            <div className="text-[11px] text-purple-400/70">Разовая консультация:</div>
            <div className="text-lg font-bold text-white font-mono tabular-nums">
              {formatKzt(mentor.hourlyRate)} <span className="text-xs text-purple-300/70 font-sans font-normal">/ 60 минут</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="py-2 px-4 text-xs font-medium text-purple-300 hover:text-white"
            >
              Закрыть
            </button>
            <button
              onClick={() => {
                onClose();
                onSelectPackageAndBook(mentor, mentor.packages[0]);
              }}
              className="py-2.5 px-5 text-xs font-semibold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 rounded-lg shadow-lg shadow-purple-900/40 transition-all"
            >
              Записаться на консультацию
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
