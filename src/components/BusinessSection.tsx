import React from 'react';
import { TrendingUp, AlertTriangle, ShieldCheck, DollarSign, Building2, HelpCircle, ArrowRight, CheckCircle2 } from 'lucide-react';
import { BUSINESS_METRICS, BUSINESS_TAX_REGIMES, WHY_FEW_GOOD_BUSINESSES, GOV_SUPPORT_PROGRAMS } from '../data/businessData';
import { Mentor } from '../types';

interface BusinessSectionProps {
  onBookWithMentorById: (mentorId: string) => void;
}

export const BusinessSection: React.FC<BusinessSectionProps> = ({
  onBookWithMentorById
}) => {
  return (
    <div className="py-10 space-y-12">
      {/* Header */}
      <div className="max-w-4xl mx-auto text-center space-y-3 px-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/70 border border-purple-700/40 text-xs text-purple-300 font-medium">
          <Building2 className="w-3.5 h-3.5 text-purple-400" />
          <span>Аналитика МСБ Республики Казахстан</span>
        </div>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white">
          Бизнес в Казахстане: много зарегистрировано, но устойчивых мало
        </h2>
        <p className="text-sm text-purple-200/75 max-w-2xl mx-auto leading-relaxed">
          Официальные данные Бюро национальной статистики РК, налоговые режимы 2025–2026 года и честный разбор реальных причин закрытия малого бизнеса.
        </p>
      </div>

      {/* 4 Crucial Business Numbers */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {BUSINESS_METRICS.map((metric, i) => (
          <div
            key={i}
            className="p-5 rounded-2xl bg-[#120b22] border border-purple-900/30 flex flex-col justify-between space-y-3"
          >
            <div>
              <div className="flex items-center justify-between text-xs text-purple-400/80 mb-2">
                <span>{metric.title}</span>
                {metric.trend && (
                  <span className="font-semibold text-purple-300 bg-purple-950/80 px-2 py-0.5 rounded text-[10px]">
                    {metric.trend}
                  </span>
                )}
              </div>
              <div className="text-2xl sm:text-3xl font-black text-white font-mono tabular-nums">
                {metric.value}
              </div>
            </div>
            <div className="border-t border-purple-900/20 pt-2 text-[11px] text-purple-300/70 leading-relaxed">
              <p>{metric.subtext}</p>
              <p className="text-[10px] text-purple-500/60 mt-1">Источник: {metric.source}</p>
            </div>
          </div>
        ))}
      </div>

      {/* The Core Analytical Problem: Why Few Businesses Survive */}
      <div className="p-6 sm:p-8 rounded-2xl bg-[#130d24] border border-purple-900/40 space-y-6">
        <div>
          <div className="flex items-center gap-2 text-rose-400 text-xs font-bold uppercase tracking-wider mb-1">
            <AlertTriangle className="w-4 h-4" />
            Честный анализ казахстанского рынка
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-white">
            Почему в Казахстане зарегистрировано 2.2 миллиона МСП, но успешных — единицы?
          </h3>
          <p className="text-xs sm:text-sm text-purple-200/80 mt-1 max-w-3xl leading-relaxed">
            По данным аналитиков, 78.6% открывающихся ИП и ТОО в РК закрываются или перестают подавать признаки жизни в первые 3 года. Главные факторы риска:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {WHY_FEW_GOOD_BUSINESSES.map((item) => (
            <div
              key={item.number}
              className="p-4 rounded-xl bg-[#170f2b] border border-purple-900/30 space-y-2"
            >
              <div className="flex items-center gap-2.5">
                <span className="font-mono font-black text-purple-400 text-sm">
                  {item.number}
                </span>
                <h4 className="font-bold text-white text-sm">
                  {item.title}
                </h4>
              </div>
              <p className="text-xs text-purple-200/75 leading-relaxed pl-6">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Tax Regimes of Kazakhstan Guide */}
      <div className="space-y-4">
        <div>
          <h3 className="text-xl font-bold text-white">
            Налоговые режимы в Казахстане: Как не потерять бизнес
          </h3>
          <p className="text-xs text-purple-300/70">
            Сравнение актуальных налоговых ставок для ИП и ТОО в РК на 2025–2026 год
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {BUSINESS_TAX_REGIMES.map((regime, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-[#120b22] border border-purple-900/30 flex flex-col justify-between space-y-3"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h4 className="font-bold text-white text-base">
                    {regime.name}
                  </h4>
                  <span className="px-2.5 py-1 rounded-lg bg-purple-950 text-purple-300 border border-purple-700/40 font-mono text-xs font-bold whitespace-nowrap">
                    {regime.rate}
                  </span>
                </div>

                <div className="text-xs font-mono text-emerald-400 mb-2">
                  Лимит: {regime.limitKzt}
                </div>

                <p className="text-xs text-purple-200/80 leading-relaxed mb-3">
                  {regime.description}
                </p>

                <div className="space-y-1.5 text-xs">
                  <div>
                    <span className="text-purple-400 font-semibold">Идеально для: </span>
                    <span className="text-purple-200">{regime.bestFor}</span>
                  </div>
                  <div>
                    <span className="text-rose-400 font-semibold">Подводный камень: </span>
                    <span className="text-purple-300/80">{regime.pitfalls}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Government Support: Damu & Grants */}
      <div className="p-6 rounded-2xl bg-[#130d24] border border-purple-900/40 space-y-4">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-purple-400" />
          Реальные государственные инструменты поддержки бизнеса в РК
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {GOV_SUPPORT_PROGRAMS.map((prog, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-[#18102e] border border-purple-900/30 space-y-2">
              <h4 className="font-bold text-white text-sm">{prog.name}</h4>
              <div className="text-xs font-bold text-emerald-400 font-mono">
                {prog.subsidy}
              </div>
              <p className="text-xs text-purple-200/70 leading-relaxed">
                {prog.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Practical Mentorship CTA */}
      <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-purple-950/90 via-[#180e30] to-purple-950/90 border border-purple-600/40 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-1 text-center sm:text-left">
          <h4 className="text-xl font-bold text-white">
            Хотите открыть бизнес в РК или выйти на Kaspi без слива бюджета?
          </h4>
          <p className="text-xs text-purple-200/80 max-w-xl leading-relaxed">
            Бауыржан Касымов (оборот 45+ млн ₸/мес на Kaspi) и Динара Садвакасова (эксперт фонда «Даму») разберут вашу бизнес-модель, проверят юнит-экономику и подберут субсидии до того, как вы совершите фатальные ошибки.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-2.5 shrink-0">
          <button
            onClick={() => onBookWithMentorById('mentor-5')}
            className="py-2.5 px-4 rounded-lg bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 shadow-lg shadow-purple-900/50"
          >
            <span>Ментор по Kaspi (Бауыржан)</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => onBookWithMentorById('mentor-6')}
            className="py-2.5 px-4 rounded-lg bg-[#241444] hover:bg-[#311b5e] border border-purple-500/40 text-purple-200 font-semibold text-xs transition-colors flex items-center justify-center gap-1.5"
          >
            <span>Гранты и Даму (Динара)</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
