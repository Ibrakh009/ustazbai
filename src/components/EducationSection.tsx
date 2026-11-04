import React, { useState } from 'react';
import { GraduationCap, Award, Search, Filter, ShieldCheck, CheckCircle, HelpCircle, School, ArrowRight, Sparkles } from 'lucide-react';
import { UNIVERSITIES_KZ, GOP_THRESHOLDS, ENT_KEY_FACTS } from '../data/educationData';
import { UniversityKZ, Mentor } from '../types';
import { formatKzt, formatNumber } from '../utils/formatters';

interface EducationSectionProps {
  universities: UniversityKZ[];
  onBookWithMentorById: (mentorId: string) => void;
  onOpenCalculatorTab?: () => void;
}

export const EducationSection: React.FC<EducationSectionProps> = ({
  universities,
  onBookWithMentorById,
  onOpenCalculatorTab
}) => {
  const [cityFilter, setCityFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortField, setSortField] = useState<'ranking' | 'tuition' | 'grantScore'>('ranking');

  // Filtered universities
  const filteredUniversities = universities
    .filter((u) => {
      const matchCity = cityFilter === 'all' || u.city.toLowerCase().includes(cityFilter.toLowerCase());
      const matchSearch =
        u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        u.shortName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        u.popularDirections.some((d) => d.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchCity && matchSearch;
    })
    .sort((a, b) => {
      if (sortField === 'ranking') return a.rankingKZ - b.rankingKZ;
      if (sortField === 'tuition') return a.tuitionKztPerYear - b.tuitionKztPerYear;
      if (sortField === 'grantScore') return b.minGrantScore - a.minGrantScore;
      return 0;
    });

  return (
    <div className="py-10 space-y-12">
      {/* Education Header */}
      <div className="max-w-4xl mx-auto text-center space-y-3 px-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/70 border border-purple-700/40 text-xs text-purple-300 font-medium">
          <GraduationCap className="w-3.5 h-3.5 text-purple-400" />
          <span>Образовательная база Республики Казахстан 2025–2026</span>
        </div>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white">
          Актуальные данные ЕНТ и стоимость вузов в Казахстане
        </h2>
        <p className="text-sm text-purple-200/75 max-w-2xl mx-auto leading-relaxed">
          Проверенная статистика Национального центра тестирования (НЦТ) и Министерства науки и высшего образования РК.
          Реальные проходные баллы на гранты и цены платного обучения в тенге (₸).
        </p>
      </div>

      {/* UNT Key Benchmarks Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
        <div className="p-4 rounded-xl bg-[#120b22] border border-purple-900/30">
          <div className="text-xs text-purple-400/80 mb-1">Средний балл ЕНТ по РК</div>
          <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono tabular-nums">
            {ENT_KEY_FACTS.currentAverageScore} <span className="text-sm text-purple-400/60 font-sans">/ 140</span>
          </div>
          <div className="text-[11px] text-purple-300/60 mt-1">Среди 181 400+ тестируемых</div>
        </div>

        <div className="p-4 rounded-xl bg-[#120b22] border border-purple-900/30">
          <div className="text-xs text-purple-400/80 mb-1">Всего гос. грантов в РК</div>
          <div className="text-2xl sm:text-3xl font-extrabold text-purple-300 font-mono tabular-nums">
            {ENT_KEY_FACTS.totalGrantsKazakhstan}
          </div>
          <div className="text-[11px] text-purple-300/60 mt-1">МОН РК (бакалавриат)</div>
        </div>

        <div className="p-4 rounded-xl bg-[#120b22] border border-purple-900/30">
          <div className="text-xs text-purple-400/80 mb-1">Сельская квота</div>
          <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400 font-mono tabular-nums">
            35%
          </div>
          <div className="text-[11px] text-emerald-300/60 mt-1">Снижает проходной балл на 10-25</div>
        </div>

        <div className="p-4 rounded-xl bg-[#120b22] border border-purple-900/30">
          <div className="text-xs text-purple-400/80 mb-1">Порог для участия в гранте</div>
          <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono tabular-nums">
            50 <span className="text-sm text-purple-400/60 font-sans">(65 в нац. вузы)</span>
          </div>
          <div className="text-[11px] text-purple-300/60 mt-1">Педагогика / Право: 75 баллов</div>
        </div>
      </div>

      {/* Quotas & Legislation Info Box */}
      <div className="p-5 rounded-2xl bg-[#130d24] border border-purple-900/40 space-y-3">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-purple-400" />
          Государственные квоты при распределении образовательных грантов в РК
        </h3>
        <p className="text-xs text-purple-200/80 leading-relaxed">
          В конкурсе грантов абитуриенты участвуют не только по общему списку. Законодательством РК закреплены обязательные процентные квоты:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 pt-1">
          {ENT_KEY_FACTS.quotas.map((q, idx) => (
            <div key={idx} className="p-3 rounded-lg bg-[#18102e] border border-purple-900/30 text-xs">
              <div className="flex items-center justify-between mb-1">
                <span className="font-semibold text-white">{q.name}</span>
                <span className="font-mono font-bold text-purple-300">{q.percent}</span>
              </div>
              <p className="text-[11px] text-purple-300/70">{q.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* GOP Table: Real Passing Scores in KZ */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-white">
              Проходные баллы на грант по популярным специальностям (ГОП)
            </h3>
            <p className="text-xs text-purple-300/70">
              Сравнение общего конкурса и конкурса по сельской квоте (данные 2024–2025/2026)
            </p>
          </div>
        </div>

        <div className="overflow-x-auto rounded-xl border border-purple-900/30 bg-[#120b22]">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#18102e] text-purple-300/80 uppercase tracking-wider text-[10px] border-b border-purple-900/30">
              <tr>
                <th className="py-3 px-4">Код ГОП</th>
                <th className="py-3 px-4">Направление подготовки</th>
                <th className="py-3 px-4">Профильные предметы</th>
                <th className="py-3 px-4 text-center">Грант (Общий)</th>
                <th className="py-3 px-4 text-center">Грант (Сельская квота)</th>
                <th className="py-3 px-4 text-center">Кол-во грантов</th>
                <th className="py-3 px-4 text-center">Конкурс</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-purple-900/20 text-purple-200/90 font-medium">
              {GOP_THRESHOLDS.map((gop) => (
                <tr key={gop.code} className="hover:bg-purple-950/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-purple-400">{gop.code}</td>
                  <td className="py-3 px-4 font-semibold text-white">{gop.name}</td>
                  <td className="py-3 px-4 text-purple-300/80">{gop.subjects}</td>
                  <td className="py-3 px-4 text-center font-mono font-bold text-white">
                    {gop.minGrantScoreGeneral}
                  </td>
                  <td className="py-3 px-4 text-center font-mono font-bold text-emerald-400">
                    {gop.minGrantScoreRural}
                  </td>
                  <td className="py-3 px-4 text-center font-mono text-purple-300">
                    {formatNumber(gop.grantsAllocated2025)}
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                        gop.competition === 'Очень высокая'
                          ? 'bg-rose-950 text-rose-300 border border-rose-800/40'
                          : gop.competition === 'Высокая'
                          ? 'bg-amber-950 text-amber-300 border border-amber-800/40'
                          : 'bg-emerald-950 text-emerald-300 border border-emerald-800/40'
                      }`}
                    >
                      {gop.competition}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Directory of Universities in Kazakhstan */}
      <div className="space-y-5 pt-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-xl font-bold text-white">
              Каталог университетов Казахстана: Цены и гранты
            </h3>
            <p className="text-xs text-purple-300/70">
              Цены платного отделения в тенге в год (₸) и проходные баллы на грант
            </p>
          </div>

          {/* Controls: Search, City Filter, Sort */}
          <div className="flex flex-wrap items-center gap-2 text-xs">
            {/* Search */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-purple-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Поиск вуза (КБТУ, NU, IT...)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8 pr-3 py-1.5 rounded-lg bg-[#140e26] border border-purple-900/40 text-white placeholder-purple-400/50 focus:outline-none focus:border-purple-500"
              />
            </div>

            {/* City */}
            <select
              value={cityFilter}
              onChange={(e) => setCityFilter(e.target.value)}
              className="px-2.5 py-1.5 rounded-lg bg-[#140e26] border border-purple-900/40 text-purple-200 focus:outline-none focus:border-purple-500"
            >
              <option value="all">Все города</option>
              <option value="Алматы">Алматы</option>
              <option value="Астана">Астана</option>
              <option value="Каскелен">Каскелен</option>
            </select>

            {/* Sort */}
            <select
              value={sortField}
              onChange={(e) => setSortField(e.target.value as any)}
              className="px-2.5 py-1.5 rounded-lg bg-[#140e26] border border-purple-900/40 text-purple-200 focus:outline-none focus:border-purple-500"
            >
              <option value="ranking">По рейтингу в КЗ</option>
              <option value="tuition">По стоимости (возрастание)</option>
              <option value="grantScore">По баллу на грант (убывание)</option>
            </select>
          </div>
        </div>

        {/* University Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredUniversities.map((uni) => (
            <div
              key={uni.id}
              className="p-5 rounded-2xl bg-[#120b22] border border-purple-900/30 hover:border-purple-500/40 transition-all flex flex-col justify-between space-y-4"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-purple-400">
                        #{uni.rankingKZ} в РК
                      </span>
                      {uni.badge && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-purple-950/80 border border-purple-700/40 text-purple-300">
                          {uni.badge}
                        </span>
                      )}
                    </div>
                    <h4 className="text-base font-bold text-white mt-1">
                      {uni.name}
                    </h4>
                    <div className="text-xs text-purple-300/70 mt-0.5">
                      г. {uni.city}
                    </div>
                  </div>
                </div>

                <p className="text-xs text-purple-200/75 leading-relaxed mb-3">
                  {uni.description}
                </p>

                {/* Popular Majors */}
                <div className="space-y-1 mb-3">
                  <span className="text-[11px] text-purple-400 font-medium">
                    Популярные направления:
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {uni.popularDirections.map((dir, i) => (
                      <span key={i} className="text-[11px] bg-[#18102e] text-purple-200 px-2 py-0.5 rounded border border-purple-900/30">
                        {dir}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Facilities */}
                <div className="flex items-center gap-3 text-[11px] text-purple-300/70 border-t border-purple-900/20 pt-2.5">
                  <span>Общежитие: <strong className="text-white">{uni.dormitoryAvailable ? 'Да' : 'Нет'}</strong></span>
                  <span aria-hidden="true">·</span>
                  <span>Военная кафедра: <strong className="text-white">{uni.militaryDepartment ? 'Да' : 'Нет'}</strong></span>
                </div>
              </div>

              {/* Price & Grant Bottom Strip */}
              <div className="pt-3 border-t border-purple-900/30 bg-[#160f2a]/60 -mx-5 -mb-5 p-4 rounded-b-2xl flex items-center justify-between gap-3">
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-purple-400">Стоимость в год:</div>
                  <div className="text-sm sm:text-base font-bold text-white font-mono tabular-nums">
                    {formatKzt(uni.tuitionKztPerYear)}
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-[10px] uppercase tracking-wider text-purple-400">Балл на грант:</div>
                  <div className="text-sm sm:text-base font-bold text-emerald-400 font-mono tabular-nums">
                    от {uni.minGrantScore} б.
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Box to Book Danial or Asel for UNT / NU admission */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-purple-950/80 via-[#190f33] to-purple-950/80 border border-purple-600/30 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-1 text-center sm:text-left">
          <h4 className="text-lg font-bold text-white">
            Не знаете, как распределить 4 кода вузов в конкурсе грантов?
          </h4>
          <p className="text-xs text-purple-200/80 max-w-xl">
            Данияр Сериков (ЕНТ 138 баллов) и Асель Нургалиева (выпускница NU) помогут составить персональную стратегию поступления на грант без риска потерять год.
          </p>
        </div>

        <button
          onClick={() => onBookWithMentorById('mentor-1')}
          className="py-2.5 px-5 rounded-lg bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs transition-colors shrink-0 flex items-center gap-1.5 shadow-lg shadow-purple-900/50"
        >
          <span>Записаться к ментору по ЕНТ</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
