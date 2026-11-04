import React from 'react';
import { Search, GraduationCap, Building2, Globe2, Briefcase, Award, CheckCircle2 } from 'lucide-react';
import { CountryCode, AgeGroup, MentorCategory } from '../types';

interface HeroProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  selectedCountry: CountryCode | 'all';
  onSelectCountry: (c: CountryCode | 'all') => void;
  selectedAgeGroup: AgeGroup | 'all';
  onSelectAgeGroup: (a: AgeGroup | 'all') => void;
  selectedCategory: MentorCategory | 'all';
  onSelectCategory: (cat: MentorCategory | 'all') => void;
  onOpenCalculator: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  searchQuery,
  onSearchChange,
  selectedCountry,
  onSelectCountry,
  selectedAgeGroup,
  onSelectAgeGroup,
  selectedCategory,
  onSelectCategory,
  onOpenCalculator
}) => {
  return (
    <div className="relative overflow-hidden pt-8 pb-12 border-b border-purple-900/20">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 max-w-5xl h-72 bg-gradient-to-b from-purple-900/30 via-purple-950/10 to-transparent blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/60 border border-purple-700/30 text-xs text-purple-300 font-medium">
            <span>Казахстан · США · Россия</span>
            <span className="text-purple-500">·</span>
            <span>Цены строго в тенге (₸)</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight" style={{ textWrap: 'balance' }}>
            Премиальный маркетплейс менторов для всех возрастов
          </h1>

          <p className="text-sm sm:text-base text-purple-200/75 leading-relaxed max-w-2xl mx-auto">
            10 практикующих менторов для школьников, студентов, взрослых свитчеров и предпринимателей.
            Актуальная база ЕНТ, реальные цены на обучение в вузах Казахстана и аналитика рынка без инфоцыганства.
          </p>

          {/* Quick Search */}
          <div className="pt-2 max-w-xl mx-auto">
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-purple-400" />
              <input
                type="text"
                placeholder="Поиск ментора: ЕНТ, КБТУ, Kaspi, Stanford, Python, Болашак..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#120b22] border border-purple-800/40 text-sm text-white placeholder-purple-400/50 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all shadow-inner"
              />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-purple-400 hover:text-white"
                >
                  Очистить
                </button>
              )}
            </div>
          </div>
        </div>

        {/* 4 Crucial Proof & Fact Badges */}
        <div className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 max-w-5xl mx-auto">
          <div className="p-3.5 rounded-xl bg-[#130d24]/90 border border-purple-900/30 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-purple-950/80 border border-purple-600/30 flex items-center justify-center shrink-0 text-purple-400">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs text-purple-300/80">ЕНТ и Вузы РК</div>
              <div className="text-sm font-bold text-white font-mono tabular-nums">88 200+ грантов</div>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-[#130d24]/90 border border-purple-900/30 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-purple-950/80 border border-purple-600/30 flex items-center justify-center shrink-0 text-purple-400">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs text-purple-300/80">Бизнес в Казахстане</div>
              <div className="text-sm font-bold text-white font-mono tabular-nums">2.24 млн МСП</div>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-[#130d24]/90 border border-purple-900/30 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-purple-950/80 border border-purple-600/30 flex items-center justify-center shrink-0 text-purple-400">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs text-purple-300/80">Оплата в тенге</div>
              <div className="text-sm font-bold text-white font-mono tabular-nums">от 14 000 ₸ / час</div>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-[#130d24]/90 border border-purple-900/30 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-purple-950/80 border border-purple-600/30 flex items-center justify-center shrink-0 text-purple-400">
              <Globe2 className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs text-purple-300/80">География менторов</div>
              <div className="text-sm font-bold text-white">🇰🇿 КЗ · 🇺🇸 США · 🇷🇺 РФ</div>
            </div>
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="mt-8 space-y-3">
          {/* Category Filter */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
            <span className="text-purple-400/80 font-medium px-2 shrink-0">Тематика:</span>
            <button
              onClick={() => onSelectCategory('all')}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors font-medium ${
                selectedCategory === 'all'
                  ? 'bg-purple-600 text-white shadow-sm shadow-purple-900/50'
                  : 'bg-[#140e24] text-purple-300/70 hover:text-white border border-purple-900/30'
              }`}
            >
              Все направления
            </button>
            <button
              onClick={() => onSelectCategory('ent')}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors font-medium ${
                selectedCategory === 'ent'
                  ? 'bg-purple-600 text-white shadow-sm'
                  : 'bg-[#140e24] text-purple-300/70 hover:text-white border border-purple-900/30'
              }`}
            >
              ЕНТ и Школа
            </button>
            <button
              onClick={() => onSelectCategory('universities_kz')}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors font-medium ${
                selectedCategory === 'universities_kz'
                  ? 'bg-purple-600 text-white shadow-sm'
                  : 'bg-[#140e24] text-purple-300/70 hover:text-white border border-purple-900/30'
              }`}
            >
              Вузы КЗ и Магистратура
            </button>
            <button
              onClick={() => onSelectCategory('abroad')}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors font-medium ${
                selectedCategory === 'abroad'
                  ? 'bg-purple-600 text-white shadow-sm'
                  : 'bg-[#140e24] text-purple-300/70 hover:text-white border border-purple-900/30'
              }`}
            >
              Учеба за рубежом и SAT/IELTS
            </button>
            <button
              onClick={() => onSelectCategory('business_kz')}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors font-medium ${
                selectedCategory === 'business_kz'
                  ? 'bg-purple-600 text-white shadow-sm'
                  : 'bg-[#140e24] text-purple-300/70 hover:text-white border border-purple-900/30'
              }`}
            >
              Бизнес и Стартапы в РК
            </button>
            <button
              onClick={() => onSelectCategory('it')}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors font-medium ${
                selectedCategory === 'it'
                  ? 'bg-purple-600 text-white shadow-sm'
                  : 'bg-[#140e24] text-purple-300/70 hover:text-white border border-purple-900/30'
              }`}
            >
              IT и Свитчинг
            </button>
            <button
              onClick={() => onSelectCategory('career_design')}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors font-medium ${
                selectedCategory === 'career_design'
                  ? 'bg-purple-600 text-white shadow-sm'
                  : 'bg-[#140e24] text-purple-300/70 hover:text-white border border-purple-900/30'
              }`}
            >
              Дизайн и Карьера
            </button>
          </div>

          {/* Age & Country Multi-Row Controls */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-1 border-t border-purple-900/20 text-xs">
            {/* Age Group */}
            <div className="flex items-center gap-1.5">
              <span className="text-purple-400/80 font-medium shrink-0">Возраст:</span>
              <button
                onClick={() => onSelectAgeGroup('all')}
                className={`px-2.5 py-1 rounded-md transition-colors ${
                  selectedAgeGroup === 'all'
                    ? 'bg-purple-800/80 text-white border border-purple-500/40'
                    : 'text-purple-300/70 hover:text-white'
                }`}
              >
                Все возрасты
              </button>
              <button
                onClick={() => onSelectAgeGroup('school')}
                className={`px-2.5 py-1 rounded-md transition-colors ${
                  selectedAgeGroup === 'school'
                    ? 'bg-purple-800/80 text-white border border-purple-500/40'
                    : 'text-purple-300/70 hover:text-white'
                }`}
              >
                Школьники (14-18)
              </button>
              <button
                onClick={() => onSelectAgeGroup('student')}
                className={`px-2.5 py-1 rounded-md transition-colors ${
                  selectedAgeGroup === 'student'
                    ? 'bg-purple-800/80 text-white border border-purple-500/40'
                    : 'text-purple-300/70 hover:text-white'
                }`}
              >
                Студенты (18-24)
              </button>
              <button
                onClick={() => onSelectAgeGroup('adult')}
                className={`px-2.5 py-1 rounded-md transition-colors ${
                  selectedAgeGroup === 'adult'
                    ? 'bg-purple-800/80 text-white border border-purple-500/40'
                    : 'text-purple-300/70 hover:text-white'
                }`}
              >
                Взрослые / 25+
              </button>
            </div>

            {/* Country */}
            <div className="flex items-center gap-1.5">
              <span className="text-purple-400/80 font-medium shrink-0">Локация ментора:</span>
              <button
                onClick={() => onSelectCountry('all')}
                className={`px-2.5 py-1 rounded-md transition-colors ${
                  selectedCountry === 'all'
                    ? 'bg-purple-800/80 text-white border border-purple-500/40'
                    : 'text-purple-300/70 hover:text-white'
                }`}
              >
                Все страны
              </button>
              <button
                onClick={() => onSelectCountry('kz')}
                className={`px-2.5 py-1 rounded-md transition-colors flex items-center gap-1 ${
                  selectedCountry === 'kz'
                    ? 'bg-purple-800/80 text-white border border-purple-500/40'
                    : 'text-purple-300/70 hover:text-white'
                }`}
              >
                <span>🇰🇿</span> Казахстан
              </button>
              <button
                onClick={() => onSelectCountry('us')}
                className={`px-2.5 py-1 rounded-md transition-colors flex items-center gap-1 ${
                  selectedCountry === 'us'
                    ? 'bg-purple-800/80 text-white border border-purple-500/40'
                    : 'text-purple-300/70 hover:text-white'
                }`}
              >
                <span>🇺🇸</span> США
              </button>
              <button
                onClick={() => onSelectCountry('ru')}
                className={`px-2.5 py-1 rounded-md transition-colors flex items-center gap-1 ${
                  selectedCountry === 'ru'
                    ? 'bg-purple-800/80 text-white border border-purple-500/40'
                    : 'text-purple-300/70 hover:text-white'
                }`}
              >
                <span>🇷🇺</span> Россия
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
