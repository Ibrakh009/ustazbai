import React, { useState, useMemo } from 'react';
import { Calculator, Award, Sparkles, AlertCircle, CheckCircle2, School, ArrowRight } from 'lucide-react';
import { GOP_THRESHOLDS, UNIVERSITIES_KZ } from '../data/educationData';
import { formatKzt } from '../utils/formatters';

interface GrantCalculatorProps {
  onBookWithEntMentor: () => void;
}

export const GrantCalculator: React.FC<GrantCalculatorProps> = ({
  onBookWithEntMentor
}) => {
  const [score, setScore] = useState<number>(105);
  const [selectedSubjects, setSelectedSubjects] = useState<string>('Математика + Информатика');
  const [isRuralQuota, setIsRuralQuota] = useState<boolean>(false);
  const [isLargeFamily, setIsLargeFamily] = useState<boolean>(false);

  // Subject pairings list
  const subjectOptions = [
    { label: 'Математика + Информатика (IT, ИБ, Data Science)', val: 'Математика + Информатика', code: 'B057' },
    { label: 'Математика + Физика (Инженерия, Энергетика, Механика)', val: 'Математика + Физика', code: 'B064' },
    { label: 'Биология + Химия (Медицина, Фармация, Биотехнологии)', val: 'Биология + Химия', code: 'B086' },
    { label: 'Математика + География (Экономика, Менеджмент, Финансы)', val: 'Математика + География', code: 'B044' },
    { label: 'Иностранный язык + Всемирная история (Лингвистика, Перевод)', val: 'Иностранный язык + Всемирная история', code: 'B018' }
  ];

  const currentGop = useMemo(() => {
    return GOP_THRESHOLDS.find((g) => g.subjects === selectedSubjects) || GOP_THRESHOLDS[0];
  }, [selectedSubjects]);

  const thresholdScore = isRuralQuota
    ? currentGop.minGrantScoreRural
    : currentGop.minGrantScoreGeneral;

  const adjustedThreshold = isLargeFamily ? Math.max(50, thresholdScore - 4) : thresholdScore;

  // Probability calculation
  const probability = useMemo(() => {
    if (score < 50) return 0;
    const diff = score - adjustedThreshold;
    if (diff >= 15) return 96;
    if (diff >= 10) return 88;
    if (diff >= 5) return 78;
    if (diff >= 0) return 65;
    if (diff >= -5) return 40;
    if (diff >= -10) return 20;
    return 8;
  }, [score, adjustedThreshold]);

  // Matching universities for this subject and score
  const matchingUniversities = useMemo(() => {
    return UNIVERSITIES_KZ.map((uni) => {
      let req = uni.minGrantScore;
      if (isRuralQuota) req -= 12;
      const pass = score >= req;
      return {
        ...uni,
        requiredScoreForUser: req,
        hasGoodChance: pass
      };
    });
  }, [score, isRuralQuota]);

  return (
    <div className="py-8 max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-950/70 border border-purple-700/40 text-xs text-purple-300 font-semibold">
          <Calculator className="w-3.5 h-3.5 text-purple-400" />
          <span>Официальная модель отбора МОН РК</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
          Калькулятор шансов на государственный грант ЕНТ
        </h2>
        <p className="text-xs sm:text-sm text-purple-200/75 max-w-xl mx-auto">
          Рассчитайте вероятность получения гранта на основе реальной статистики конкурсов,
          сельской квоты и выбранной комбинации профильных предметов.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Form: Inputs */}
        <div className="lg:col-span-5 p-6 rounded-2xl bg-[#120b22] border border-purple-900/40 space-y-5">
          <h3 className="text-sm font-bold text-white border-b border-purple-900/30 pb-3">
            Параметры абитуриента
          </h3>

          {/* Subjects */}
          <div>
            <label className="block text-xs font-semibold text-purple-300 mb-1.5">
              Профильные предметы:
            </label>
            <select
              value={selectedSubjects}
              onChange={(e) => setSelectedSubjects(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl bg-[#170f2b] border border-purple-800/40 text-xs text-white focus:outline-none focus:border-purple-500"
            >
              {subjectOptions.map((opt, i) => (
                <option key={i} value={opt.val}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          {/* UNT Score Input & Slider */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-semibold text-purple-300">
                Ваш балл ЕНТ (из 140):
              </label>
              <div className="font-mono text-lg font-black text-white bg-purple-950/80 px-2.5 py-0.5 rounded-lg border border-purple-700/40">
                {score}
              </div>
            </div>
            <input
              type="range"
              min={50}
              max={140}
              value={score}
              onChange={(e) => setScore(Number(e.target.value))}
              className="w-full accent-purple-500 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-purple-400/60 font-mono mt-1">
              <span>50 (Мин. порог)</span>
              <span>100</span>
              <span>140 (Макс)</span>
            </div>
          </div>

          {/* Quotas Checkboxes */}
          <div className="space-y-2 pt-2 border-t border-purple-900/30">
            <span className="text-[11px] font-semibold text-purple-400 uppercase tracking-wider block">
              Льготы и квоты:
            </span>

            <label className="flex items-start gap-2.5 p-2.5 rounded-xl bg-[#170f2b] border border-purple-900/30 cursor-pointer hover:border-purple-700/50 transition-colors">
              <input
                type="checkbox"
                checked={isRuralQuota}
                onChange={(e) => setIsRuralQuota(e.target.checked)}
                className="accent-purple-500 mt-0.5"
              />
              <div>
                <span className="text-xs font-semibold text-white block">
                  Сельская квота (35%)
                </span>
                <span className="text-[10px] text-purple-300/70 block">
                  Окончил(а) сельскую школу (снижает проходной балл на 10-20 единиц)
                </span>
              </div>
            </label>

            <label className="flex items-start gap-2.5 p-2.5 rounded-xl bg-[#170f2b] border border-purple-900/30 cursor-pointer hover:border-purple-700/50 transition-colors">
              <input
                type="checkbox"
                checked={isLargeFamily}
                onChange={(e) => setIsLargeFamily(e.target.checked)}
                className="accent-purple-500 mt-0.5"
              />
              <div>
                <span className="text-xs font-semibold text-white block">
                  Многодетная семья (квота 5%)
                </span>
                <span className="text-[10px] text-purple-300/70 block">
                  Семья с 4 и более несовершеннолетними детьми
                </span>
              </div>
            </label>
          </div>
        </div>

        {/* Right Output: Chances & Recommendations */}
        <div className="lg:col-span-7 space-y-4">
          {/* Chance Card */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-[#160e2a] to-[#120a22] border border-purple-700/40 space-y-4 shadow-xl shadow-purple-950/40">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs text-purple-300 uppercase tracking-wider font-semibold">
                  Оценка шансов на грант:
                </span>
                <h4 className="text-xl font-bold text-white mt-0.5">
                  {currentGop.name} ({currentGop.code})
                </h4>
              </div>

              <div className="text-right">
                <div
                  className={`text-3xl font-black font-mono tabular-nums ${
                    probability >= 75
                      ? 'text-emerald-400'
                      : probability >= 45
                      ? 'text-amber-400'
                      : 'text-rose-400'
                  }`}
                >
                  {probability}%
                </div>
                <div className="text-[10px] text-purple-300/70 font-medium">
                  {probability >= 75
                    ? 'Очень высокий шанс'
                    : probability >= 45
                    ? 'Умеренная конкуренция'
                    : 'Высокий риск / платно'}
                </div>
              </div>
            </div>

            {/* Visual Probability Bar */}
            <div className="w-full bg-[#0a0614] h-3 rounded-full overflow-hidden p-0.5 border border-purple-900/40">
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  probability >= 75
                    ? 'bg-gradient-to-r from-emerald-500 to-teal-400'
                    : probability >= 45
                    ? 'bg-gradient-to-r from-amber-500 to-yellow-400'
                    : 'bg-gradient-to-r from-rose-600 to-rose-400'
                }`}
                style={{ width: `${Math.max(5, probability)}%` }}
              />
            </div>

            {/* Threshold comparison */}
            <div className="grid grid-cols-2 gap-3 text-xs pt-1">
              <div className="p-2.5 rounded-lg bg-[#0e081c] border border-purple-900/30">
                <span className="text-purple-400/80 block text-[11px]">Ваш текущий балл:</span>
                <span className="font-mono font-bold text-white text-base">{score}</span>
              </div>
              <div className="p-2.5 rounded-lg bg-[#0e081c] border border-purple-900/30">
                <span className="text-purple-400/80 block text-[11px]">
                  Проходной по ГОП {isRuralQuota ? '(с квотой)' : '(общий)'}:
                </span>
                <span className="font-mono font-bold text-purple-300 text-base">
                  {adjustedThreshold}
                </span>
              </div>
            </div>

            {/* Recommendation Alert */}
            <div className="p-3 rounded-xl bg-purple-950/40 border border-purple-800/40 text-xs text-purple-200/90 leading-relaxed">
              {score >= adjustedThreshold + 10 ? (
                <span>
                  🟢 <strong>Превосходный результат!</strong> Вы проходите на грант в топовые вузы Алматы и Астаны (КБТУ, AITU, МУИТ, КазНУ). Рекомендуем на 1-ю строку ставить самый престижный вуз.
                </span>
              ) : score >= adjustedThreshold ? (
                <span>
                  🟡 <strong>Шансы хорошие, но конкуренция плотная.</strong> Рекомендуем стратегию «1-2-1»: 1-й код — желаемый топ-вуз, 2-й и 3-й — надежные вузы с умеренным конкурсом, 4-й — региональный или производственный грант.
                </span>
              ) : (
                <span>
                  🔴 <strong>Балла может не хватить на популярный грант в Алматы/Астане.</strong> Рассмотрите Satbayev University, региональные национальные университеты или подготовку с ментором для повышения балла на 15–25 единиц.
                </span>
              )}
            </div>
          </div>

          {/* Matching Universities List */}
          <div className="p-5 rounded-2xl bg-[#120b22] border border-purple-900/40 space-y-3">
            <h4 className="text-xs uppercase tracking-wider text-purple-300 font-bold">
              Вузы Казахстана с подходящим проходным баллом:
            </h4>

            <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
              {matchingUniversities.slice(0, 5).map((u) => (
                <div
                  key={u.id}
                  className="p-3 rounded-xl bg-[#160f2b] border border-purple-900/30 flex items-center justify-between text-xs"
                >
                  <div>
                    <div className="font-bold text-white flex items-center gap-1.5">
                      <span>{u.shortName}</span>
                      <span className="text-purple-400/60 font-normal">({u.city})</span>
                    </div>
                    <div className="text-[11px] text-purple-300/70 mt-0.5">
                      Платное: {formatKzt(u.tuitionKztPerYear)} / год
                    </div>
                  </div>

                  <div className="text-right">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        score >= u.requiredScoreForUser
                          ? 'bg-emerald-950 text-emerald-300 border border-emerald-800/40'
                          : 'bg-rose-950 text-rose-300 border border-rose-800/40'
                      }`}
                    >
                      {score >= u.requiredScoreForUser ? 'Грант вероятен' : 'Рискованно'}
                    </span>
                    <div className="text-[10px] font-mono text-purple-400 mt-0.5">
                      Нужно: {u.requiredScoreForUser}+ б.
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2 border-t border-purple-900/30 flex items-center justify-between">
              <span className="text-xs text-purple-300/80">
                Нужна персональная расстановка 4 кодов?
              </span>
              <button
                onClick={onBookWithEntMentor}
                className="py-1.5 px-3 rounded-lg bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs flex items-center gap-1 transition-colors"
              >
                <span>Консультация эксперта ЕНТ</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
