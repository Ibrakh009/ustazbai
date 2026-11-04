import React, { useState } from 'react';
import { X, LogOut, Users, FileText, School, BarChart2, Plus, Trash2, Edit2, Check, ShieldCheck, DollarSign } from 'lucide-react';
import { Mentor, BookingRequest, UniversityKZ, CountryCode, AgeGroup, MentorCategory } from '../types';
import { formatKzt, formatNumber } from '../utils/formatters';

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
  onLogout: () => void;
  mentors: Mentor[];
  onUpdateMentorPrice: (mentorId: string, newRate: number) => void;
  onToggleMentorActive: (mentorId: string) => void;
  onAddMentor: (newMentor: Mentor) => void;
  bookings: BookingRequest[];
  onUpdateBookingStatus: (bookingId: string, status: BookingRequest['status']) => void;
  onDeleteBooking: (bookingId: string) => void;
  universities: UniversityKZ[];
  onUpdateUniversityFee: (uniId: string, newFee: number, newScore: number) => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({
  isOpen,
  onClose,
  onLogout,
  mentors,
  onUpdateMentorPrice,
  onToggleMentorActive,
  onAddMentor,
  bookings,
  onUpdateBookingStatus,
  onDeleteBooking,
  universities,
  onUpdateUniversityFee
}) => {
  const [activeTab, setActiveTab] = useState<'mentors' | 'bookings' | 'universities' | 'stats'>('mentors');

  // Edit price inline state
  const [editingMentorId, setEditingMentorId] = useState<string | null>(null);
  const [newRateInput, setNewRateInput] = useState<number>(0);

  // Edit university inline state
  const [editingUniId, setEditingUniId] = useState<string | null>(null);
  const [newUniFee, setNewUniFee] = useState<number>(0);
  const [newUniScore, setNewUniScore] = useState<number>(0);

  // New Mentor Form State
  const [showAddMentorModal, setShowAddMentorModal] = useState(false);
  const [newMName, setNewMName] = useState('');
  const [newMTitle, setNewMTitle] = useState('');
  const [newMCountry, setNewMCountry] = useState<CountryCode>('kz');
  const [newMCity, setNewMCity] = useState('Алматы');
  const [newMRate, setNewMRate] = useState(15000);
  const [newMCategory, setNewMCategory] = useState<MentorCategory>('ent');
  const [newMBio, setNewMBio] = useState('');
  const [newMTopics, setNewMTopics] = useState('ЕНТ, Подготовка к тестам, Выбор вуза');

  if (!isOpen) return null;

  const totalBookingRevenue = bookings.reduce((sum, b) => sum + b.priceKzt, 0);

  const handleStartEditMentor = (m: Mentor) => {
    setEditingMentorId(m.id);
    setNewRateInput(m.hourlyRate);
  };

  const handleSaveMentorRate = (mentorId: string) => {
    if (newRateInput > 0) {
      onUpdateMentorPrice(mentorId, newRateInput);
    }
    setEditingMentorId(null);
  };

  const handleStartEditUni = (u: UniversityKZ) => {
    setEditingUniId(u.id);
    setNewUniFee(u.tuitionKztPerYear);
    setNewUniScore(u.minGrantScore);
  };

  const handleSaveUni = (uniId: string) => {
    if (newUniFee > 0) {
      onUpdateUniversityFee(uniId, newUniFee, newUniScore);
    }
    setEditingUniId(null);
  };

  const handleCreateMentor = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMName.trim() || !newMTitle.trim()) return;

    const initials = newMName
      .split(' ')
      .map((w) => w[0])
      .join('')
      .toUpperCase()
      .slice(0, 2) || 'МК';

    const flags: Record<CountryCode, string> = {
      kz: '🇰🇿',
      ru: '🇷🇺',
      us: '🇺🇸'
    };

    const countryNames: Record<CountryCode, string> = {
      kz: 'Казахстан',
      ru: 'Россия',
      us: 'США'
    };

    const newMentorObj: Mentor = {
      id: `mentor-custom-${Date.now()}`,
      name: newMName,
      title: newMTitle,
      country: newMCountry,
      countryName: countryNames[newMCountry],
      city: newMCity,
      flag: flags[newMCountry],
      hourlyRate: Number(newMRate),
      rating: 5.0,
      reviewsCount: 1,
      experienceYears: 5,
      category: newMCategory,
      categoryLabel: newMCategory === 'ent' ? 'ЕНТ и Школа' : 'Бизнес и Вузы',
      ageGroups: ['student', 'adult'],
      ageGroupLabels: ['Студенты', 'Взрослые'],
      topics: newMTopics.split(',').map((t) => t.trim()).filter(Boolean),
      bio: newMBio || 'Практикующий специалист и ментор платформы USTAZ.',
      achievements: ['Верифицированный профиль администратором'],
      education: 'Высшее образование',
      currentRole: newMTitle,
      packages: [
        {
          title: 'Разовая консультация (60 мин)',
          sessionsCount: 1,
          priceKzt: Number(newMRate),
          description: 'Персональный разбор целей и стратегии.'
        },
        {
          title: 'Пакет из 4 сессий',
          sessionsCount: 4,
          priceKzt: Number(newMRate) * 3.5,
          description: 'Глубокий трекинг с домашними заданиями.',
          isPopular: true
        }
      ],
      reviews: [],
      isActive: true,
      avatarColor: 'from-purple-700 to-indigo-900',
      initials: initials
    };

    onAddMentor(newMentorObj);
    setShowAddMentorModal(false);
    setNewMName('');
    setNewMTitle('');
    setNewMBio('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md overflow-y-auto">
      <div
        className="relative w-full max-w-6xl bg-[#0c0717] border border-purple-700/50 rounded-2xl shadow-2xl shadow-purple-950/90 overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Admin Bar */}
        <div className="p-4 sm:p-5 border-b border-purple-900/40 bg-[#120a22] flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-emerald-950/80 border border-emerald-500/50 text-emerald-400 flex items-center justify-center font-bold">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-white text-base">
                  USTAZ.KZ — Скрытая панель куратора
                </h3>
                <span className="bg-emerald-950/80 text-emerald-300 border border-emerald-600/40 px-2 py-0.5 rounded text-[10px] font-mono font-semibold">
                  ibrakh093 · Online
                </span>
              </div>
              <p className="text-xs text-purple-300/70">
                Полный контроль цен (₸), менторов, заявок клиентов и каталога вузов
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onLogout}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-purple-950/60 hover:bg-rose-950/60 text-purple-300 hover:text-rose-300 border border-purple-800/40 text-xs transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Выйти</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-purple-400 hover:text-white hover:bg-purple-900/40 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Admin Tabs */}
        <div className="px-5 border-b border-purple-900/30 bg-[#0e081c] flex items-center gap-2 overflow-x-auto text-xs">
          <button
            onClick={() => setActiveTab('mentors')}
            className={`py-3 px-3 font-semibold transition-colors flex items-center gap-1.5 border-b-2 whitespace-nowrap ${
              activeTab === 'mentors'
                ? 'border-purple-500 text-white'
                : 'border-transparent text-purple-300/60 hover:text-purple-200'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Управление менторами ({mentors.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('bookings')}
            className={`py-3 px-3 font-semibold transition-colors flex items-center gap-1.5 border-b-2 whitespace-nowrap ${
              activeTab === 'bookings'
                ? 'border-purple-500 text-white'
                : 'border-transparent text-purple-300/60 hover:text-purple-200'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Заявки на консультации ({bookings.length})</span>
            {bookings.length > 0 && (
              <span className="bg-purple-600 text-white px-1.5 py-0.2 rounded-full font-bold text-[10px]">
                {bookings.filter((b) => b.status === 'new').length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('universities')}
            className={`py-3 px-3 font-semibold transition-colors flex items-center gap-1.5 border-b-2 whitespace-nowrap ${
              activeTab === 'universities'
                ? 'border-purple-500 text-white'
                : 'border-transparent text-purple-300/60 hover:text-purple-200'
            }`}
          >
            <School className="w-4 h-4" />
            <span>Цены вузов РК ({universities.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('stats')}
            className={`py-3 px-3 font-semibold transition-colors flex items-center gap-1.5 border-b-2 whitespace-nowrap ${
              activeTab === 'stats'
                ? 'border-purple-500 text-white'
                : 'border-transparent text-purple-300/60 hover:text-purple-200'
            }`}
          >
            <BarChart2 className="w-4 h-4" />
            <span>Финансы и аналитика</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 overflow-y-auto flex-1">
          {/* TAB 1: MENTORS */}
          {activeTab === 'mentors' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-white text-sm">
                    Каталог 10 менторов (цены, статусы и редактирование)
                  </h4>
                  <p className="text-xs text-purple-300/70">
                    Нажмите на цену в тенге, чтобы изменить почасовую ставку ментора
                  </p>
                </div>

                <button
                  onClick={() => setShowAddMentorModal(true)}
                  className="py-1.5 px-3 rounded-lg bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs flex items-center gap-1.5 shadow-md shadow-purple-900/50"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Добавить ментора</span>
                </button>
              </div>

              <div className="overflow-x-auto rounded-xl border border-purple-900/30 bg-[#120a22]">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#170e2b] text-purple-300/80 uppercase tracking-wider text-[10px] border-b border-purple-900/30">
                    <tr>
                      <th className="py-2.5 px-3">Ментор</th>
                      <th className="py-2.5 px-3">Страна</th>
                      <th className="py-2.5 px-3">Категория</th>
                      <th className="py-2.5 px-3">Рейтинг</th>
                      <th className="py-2.5 px-3">Ставка (₸ / час)</th>
                      <th className="py-2.5 px-3 text-center">Статус</th>
                      <th className="py-2.5 px-3 text-right">Действия</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-purple-900/20 text-purple-200">
                    {mentors.map((m) => (
                      <tr key={m.id} className="hover:bg-purple-950/20 transition-colors">
                        <td className="py-3 px-3">
                          <div className="flex items-center gap-2.5">
                            <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${m.avatarColor} flex items-center justify-center text-white font-bold text-xs shrink-0`}>
                              {m.initials}
                            </div>
                            <div>
                              <div className="font-bold text-white">{m.name}</div>
                              <div className="text-[11px] text-purple-300/70 truncate max-w-xs">{m.title}</div>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-3 whitespace-nowrap">
                          {m.flag} {m.countryName}
                        </td>
                        <td className="py-3 px-3 text-purple-300 whitespace-nowrap">
                          {m.categoryLabel}
                        </td>
                        <td className="py-3 px-3 font-mono">
                          ★ {m.rating} ({m.reviewsCount})
                        </td>
                        <td className="py-3 px-3">
                          {editingMentorId === m.id ? (
                            <div className="flex items-center gap-1.5">
                              <input
                                type="number"
                                value={newRateInput}
                                onChange={(e) => setNewRateInput(Number(e.target.value))}
                                className="w-24 px-2 py-1 bg-black/60 border border-purple-500 rounded text-xs font-mono text-white focus:outline-none"
                              />
                              <button
                                onClick={() => handleSaveMentorRate(m.id)}
                                className="p-1 rounded bg-emerald-600 hover:bg-emerald-500 text-white"
                                title="Сохранить цену"
                              >
                                <Check className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() => handleStartEditMentor(m)}
                              className="font-mono font-bold text-emerald-400 hover:text-emerald-300 hover:underline flex items-center gap-1"
                              title="Нажмите для редактирования"
                            >
                              <span>{formatKzt(m.hourlyRate)}</span>
                              <Edit2 className="w-3 h-3 text-purple-400 opacity-60" />
                            </button>
                          )}
                        </td>
                        <td className="py-3 px-3 text-center">
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              m.isActive
                                ? 'bg-emerald-950 text-emerald-300 border border-emerald-800/40'
                                : 'bg-zinc-900 text-zinc-400 border border-zinc-700'
                            }`}
                          >
                            {m.isActive ? 'Активен' : 'Отключен'}
                          </span>
                        </td>
                        <td className="py-3 px-3 text-right">
                          <button
                            onClick={() => onToggleMentorActive(m.id)}
                            className="px-2 py-1 text-[11px] rounded bg-purple-950 hover:bg-purple-900 text-purple-300 border border-purple-800/40 transition-colors"
                          >
                            {m.isActive ? 'Деактивировать' : 'Включить'}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 2: BOOKINGS */}
          {activeTab === 'bookings' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-white text-sm">
                    Все поступившие заявки на консультации ({bookings.length})
                  </h4>
                  <p className="text-xs text-purple-300/70">
                    Контакты клиентов, выбранные пакеты и статус обработки
                  </p>
                </div>
              </div>

              {bookings.length === 0 ? (
                <div className="p-8 text-center text-purple-300/60 bg-[#120a22] rounded-xl border border-purple-900/30">
                  Пока нет новых заявок. Отправьте тестовую запись через каталог менторов, чтобы увидеть ее здесь!
                </div>
              ) : (
                <div className="space-y-3">
                  {bookings.map((b) => (
                    <div
                      key={b.id}
                      className="p-4 rounded-xl bg-[#120a22] border border-purple-900/30 space-y-2.5"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-purple-900/20 pb-2">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-white text-sm">{b.clientName}</span>
                            <span className="text-xs text-purple-300 bg-purple-950/80 border border-purple-800/40 px-2 py-0.5 rounded">
                              {b.clientAgeGroup}
                            </span>
                          </div>
                          <div className="text-xs text-purple-400 font-mono mt-0.5">
                            Телефон: <strong className="text-white">{b.clientPhone}</strong> {b.clientTelegram && `· Telegram: ${b.clientTelegram}`}
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <div className="text-right">
                            <div className="font-mono font-bold text-emerald-400 text-sm">
                              {formatKzt(b.priceKzt)}
                            </div>
                            <div className="text-[10px] text-purple-400/60">
                              {b.scheduledDate} в {b.scheduledTime}
                            </div>
                          </div>

                          <select
                            value={b.status}
                            onChange={(e) => onUpdateBookingStatus(b.id, e.target.value as any)}
                            className="px-2 py-1 rounded bg-black/60 border border-purple-700/50 text-xs text-white focus:outline-none"
                          >
                            <option value="new">Новая</option>
                            <option value="confirmed">Подтверждена</option>
                            <option value="completed">Завершена</option>
                            <option value="cancelled">Отклонена</option>
                          </select>

                          <button
                            onClick={() => onDeleteBooking(b.id)}
                            className="p-1.5 rounded text-purple-400 hover:text-rose-400 hover:bg-rose-950/40 transition-colors"
                            title="Удалить заявку"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                        <div>
                          <span className="text-purple-400">Ментор: </span>
                          <span className="text-white font-medium">{b.mentorName}</span>
                          <span className="text-purple-300/70 block text-[11px]">{b.packageTitle}</span>
                        </div>
                        <div>
                          <span className="text-purple-400">Цель клиента: </span>
                          <p className="text-purple-200/90 leading-relaxed text-xs">"{b.userGoal}"</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 3: UNIVERSITIES */}
          {activeTab === 'universities' && (
            <div className="space-y-4">
              <div>
                <h4 className="font-bold text-white text-sm">
                  Редактирование цен на обучение в вузах Казахстана
                </h4>
                <p className="text-xs text-purple-300/70">
                  Изменение стоимости платного отделения в тенге в год и проходного балла на грант
                </p>
              </div>

              <div className="overflow-x-auto rounded-xl border border-purple-900/30 bg-[#120a22]">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#170e2b] text-purple-300/80 uppercase tracking-wider text-[10px] border-b border-purple-900/30">
                    <tr>
                      <th className="py-2.5 px-3">Вуз</th>
                      <th className="py-2.5 px-3">Город</th>
                      <th className="py-2.5 px-3">Стоимость (₸ / год)</th>
                      <th className="py-2.5 px-3">Порог на грант</th>
                      <th className="py-2.5 px-3 text-right">Действия</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-purple-900/20 text-purple-200">
                    {universities.map((u) => (
                      <tr key={u.id} className="hover:bg-purple-950/20 transition-colors">
                        <td className="py-3 px-3">
                          <span className="font-bold text-white">{u.name}</span>
                          <span className="text-purple-400/60 block text-[11px]">{u.shortName}</span>
                        </td>
                        <td className="py-3 px-3 text-purple-300">{u.city}</td>
                        <td className="py-3 px-3 font-mono font-bold text-white">
                          {editingUniId === u.id ? (
                            <input
                              type="number"
                              value={newUniFee}
                              onChange={(e) => setNewUniFee(Number(e.target.value))}
                              className="w-28 px-2 py-1 bg-black/60 border border-purple-500 rounded text-xs font-mono text-white"
                            />
                          ) : (
                            formatKzt(u.tuitionKztPerYear)
                          )}
                        </td>
                        <td className="py-3 px-3 font-mono font-bold text-emerald-400">
                          {editingUniId === u.id ? (
                            <input
                              type="number"
                              value={newUniScore}
                              onChange={(e) => setNewUniScore(Number(e.target.value))}
                              className="w-16 px-2 py-1 bg-black/60 border border-purple-500 rounded text-xs font-mono text-white"
                            />
                          ) : (
                            `${u.minGrantScore} б.`
                          )}
                        </td>
                        <td className="py-3 px-3 text-right">
                          {editingUniId === u.id ? (
                            <button
                              onClick={() => handleSaveUni(u.id)}
                              className="px-2.5 py-1 rounded bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold"
                            >
                              Сохранить
                            </button>
                          ) : (
                            <button
                              onClick={() => handleStartEditUni(u)}
                              className="px-2 py-1 rounded bg-purple-950 hover:bg-purple-900 text-purple-300 text-xs border border-purple-800/40"
                            >
                              Редактировать
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 4: STATS */}
          {activeTab === 'stats' && (
            <div className="space-y-5">
              <h4 className="font-bold text-white text-sm">
                Финансовые показатели и аналитика платформы USTAZ.KZ
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-[#120a22] border border-purple-900/30">
                  <div className="text-xs text-purple-400 mb-1">Сумма всех заявок</div>
                  <div className="text-2xl font-black text-emerald-400 font-mono tabular-nums">
                    {formatKzt(totalBookingRevenue)}
                  </div>
                  <div className="text-[11px] text-purple-400/60 mt-1">Оборот в тенге</div>
                </div>

                <div className="p-4 rounded-xl bg-[#120a22] border border-purple-900/30">
                  <div className="text-xs text-purple-400 mb-1">Всего бронирований</div>
                  <div className="text-2xl font-black text-white font-mono tabular-nums">
                    {bookings.length}
                  </div>
                  <div className="text-[11px] text-purple-400/60 mt-1">
                    Новых: {bookings.filter((b) => b.status === 'new').length}
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-[#120a22] border border-purple-900/30">
                  <div className="text-xs text-purple-400 mb-1">Активных экспертов</div>
                  <div className="text-2xl font-black text-purple-300 font-mono tabular-nums">
                    {mentors.filter((m) => m.isActive).length} / {mentors.length}
                  </div>
                  <div className="text-[11px] text-purple-400/60 mt-1">Казахстан, США, РФ</div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal: Add Mentor */}
        {showAddMentorModal && (
          <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <div className="bg-[#120a22] border border-purple-700/60 rounded-2xl p-6 w-full max-w-lg space-y-4 text-xs">
              <div className="flex items-center justify-between border-b border-purple-900/40 pb-3">
                <h4 className="font-bold text-white text-base">Добавить нового ментора</h4>
                <button
                  onClick={() => setShowAddMentorModal(false)}
                  className="text-purple-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleCreateMentor} className="space-y-3">
                <div>
                  <label className="block text-purple-300 font-medium mb-1">ФИО ментора *</label>
                  <input
                    type="text"
                    required
                    value={newMName}
                    onChange={(e) => setNewMName(e.target.value)}
                    placeholder="Например: Алишер Жумабаев"
                    className="w-full px-3 py-2 rounded bg-black/60 border border-purple-900/40 text-white"
                  />
                </div>

                <div>
                  <label className="block text-purple-300 font-medium mb-1">Специализация и регалии *</label>
                  <input
                    type="text"
                    required
                    value={newMTitle}
                    onChange={(e) => setNewMTitle(e.target.value)}
                    placeholder="Например: Выпускник МУИТ, Senior iOS разработчик"
                    className="w-full px-3 py-2 rounded bg-black/60 border border-purple-900/40 text-white"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-purple-300 font-medium mb-1">Страна</label>
                    <select
                      value={newMCountry}
                      onChange={(e) => setNewMCountry(e.target.value as CountryCode)}
                      className="w-full px-3 py-2 rounded bg-black/60 border border-purple-900/40 text-white"
                    >
                      <option value="kz">Казахстан 🇰🇿</option>
                      <option value="us">США 🇺🇸</option>
                      <option value="ru">Россия 🇷🇺</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-purple-300 font-medium mb-1">Ставка (₸ / час)</label>
                    <input
                      type="number"
                      required
                      value={newMRate}
                      onChange={(e) => setNewMRate(Number(e.target.value))}
                      className="w-full px-3 py-2 rounded bg-black/60 border border-purple-900/40 text-white font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-purple-300 font-medium mb-1">Темы (через запятую)</label>
                  <input
                    type="text"
                    value={newMTopics}
                    onChange={(e) => setNewMTopics(e.target.value)}
                    className="w-full px-3 py-2 rounded bg-black/60 border border-purple-900/40 text-white"
                  />
                </div>

                <div>
                  <label className="block text-purple-300 font-medium mb-1">Краткая биография</label>
                  <textarea
                    rows={2}
                    value={newMBio}
                    onChange={(e) => setNewMBio(e.target.value)}
                    placeholder="Опыт, результаты подопечных..."
                    className="w-full px-3 py-2 rounded bg-black/60 border border-purple-900/40 text-white"
                  />
                </div>

                <div className="pt-2 flex justify-end gap-2 border-t border-purple-900/30">
                  <button
                    type="button"
                    onClick={() => setShowAddMentorModal(false)}
                    className="py-1.5 px-3 rounded text-purple-300 hover:text-white"
                  >
                    Отмена
                  </button>
                  <button
                    type="submit"
                    className="py-1.5 px-4 rounded bg-purple-600 hover:bg-purple-500 text-white font-bold"
                  >
                    Сохранить
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
