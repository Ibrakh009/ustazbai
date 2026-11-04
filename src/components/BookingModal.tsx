import React, { useState } from 'react';
import { X, Calendar, Clock, Phone, Send, CheckCircle2, ShieldCheck, AlertCircle } from 'lucide-react';
import { Mentor, MentorPackage, BookingRequest } from '../types';
import { formatKzt } from '../utils/formatters';

interface BookingModalProps {
  mentor: Mentor | null;
  initialPackage?: MentorPackage | null;
  onClose: () => void;
  onSubmitBooking: (booking: Omit<BookingRequest, 'id' | 'createdAt' | 'status'>) => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  mentor,
  initialPackage,
  onClose,
  onSubmitBooking
}) => {
  if (!mentor) return null;

  const defaultPkg = initialPackage || mentor.packages[0];
  const [selectedPkg, setSelectedPkg] = useState<MentorPackage>(defaultPkg);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('+7 ');
  const [telegram, setTelegram] = useState('');
  const [ageGroup, setAgeGroup] = useState('Студент / Абитуриент');
  const [date, setDate] = useState(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  });
  const [timeSlot, setTimeSlot] = useState('18:00');
  const [userGoal, setUserGoal] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setErrorMsg('Пожалуйста, укажите ваше имя');
      return;
    }
    if (phone.trim().length < 8) {
      setErrorMsg('Пожалуйста, укажите контактный телефон или WhatsApp');
      return;
    }
    if (!userGoal.trim()) {
      setErrorMsg('Пожалуйста, кратко опишите цель консультации');
      return;
    }

    onSubmitBooking({
      mentorId: mentor.id,
      mentorName: mentor.name,
      clientName: name,
      clientPhone: phone,
      clientTelegram: telegram,
      clientAgeGroup: ageGroup,
      packageTitle: selectedPkg.title,
      priceKzt: selectedPkg.priceKzt,
      scheduledDate: date,
      scheduledTime: timeSlot,
      userGoal: userGoal
    });

    setIsSuccess(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div
        className="relative w-full max-w-xl bg-[#110a20] border border-purple-800/40 rounded-2xl shadow-2xl shadow-purple-950/80 overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-purple-900/30 flex items-center justify-between bg-[#150e28]">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${mentor.avatarColor} flex items-center justify-center text-white font-bold text-sm border border-purple-400/30`}>
              {mentor.initials}
            </div>
            <div>
              <h3 className="font-bold text-white text-base">
                Запись к ментору: {mentor.name}
              </h3>
              <p className="text-xs text-purple-300/80">
                {mentor.title}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-purple-400 hover:text-white hover:bg-purple-900/40 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {isSuccess ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto shadow-lg shadow-emerald-950/50">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <h4 className="text-xl font-bold text-white">
              Заявка успешно отправлена!
            </h4>

            <p className="text-sm text-purple-200/80 max-w-md mx-auto leading-relaxed">
              Спасибо, <span className="font-semibold text-white">{name}</span>! Ментор{' '}
              <span className="font-semibold text-white">{mentor.name}</span> и куратор свяжутся с вами по номеру{' '}
              <span className="font-mono text-purple-300">{phone}</span> (в WhatsApp) в течение 2 часов для согласования ссылки на Google Meet / Zoom.
            </p>

            <div className="p-4 rounded-xl bg-purple-950/40 border border-purple-900/40 max-w-sm mx-auto text-left text-xs space-y-1.5 text-purple-200">
              <div className="flex justify-between">
                <span className="text-purple-400">Формат:</span>
                <span className="text-white font-medium">Онлайн (Google Meet / Zoom)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-purple-400">Дата и время:</span>
                <span className="text-white font-medium font-mono">{date} в {timeSlot}</span>
              </div>
              <div className="flex justify-between border-t border-purple-900/40 pt-1.5 font-bold">
                <span className="text-purple-300">Сумма к оплате:</span>
                <span className="text-emerald-300 font-mono text-sm">{formatKzt(selectedPkg.priceKzt)}</span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="py-2.5 px-6 rounded-lg bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs transition-colors shadow-md shadow-purple-900/40"
            >
              Вернуться в каталог
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
            {errorMsg && (
              <div className="p-3 rounded-lg bg-rose-950/80 border border-rose-500/40 text-rose-300 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Select Package */}
            <div>
              <label className="block text-purple-300 font-semibold mb-1.5">
                Выберите пакет менторства:
              </label>
              <div className="space-y-2">
                {mentor.packages.map((pkg, idx) => (
                  <label
                    key={idx}
                    className={`block p-3 rounded-xl border cursor-pointer transition-all ${
                      selectedPkg.title === pkg.title
                        ? 'bg-purple-950/70 border-purple-500 shadow-sm'
                        : 'bg-[#150e26] border-purple-900/30 hover:border-purple-800'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="package"
                          checked={selectedPkg.title === pkg.title}
                          onChange={() => setSelectedPkg(pkg)}
                          className="accent-purple-500"
                        />
                        <span className="font-bold text-white text-xs">{pkg.title}</span>
                      </div>
                      <span className="font-mono font-bold text-purple-300 text-xs tabular-nums">
                        {formatKzt(pkg.priceKzt)}
                      </span>
                    </div>
                    <p className="text-[11px] text-purple-400/80 mt-1 pl-5">
                      {pkg.description}
                    </p>
                  </label>
                ))}
              </div>
            </div>

            {/* Client Info Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div>
                <label className="block text-purple-300 font-medium mb-1">
                  Ваше имя и фамилия *
                </label>
                <input
                  type="text"
                  placeholder="Например: Арман Сериков"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    setErrorMsg('');
                  }}
                  className="w-full px-3 py-2 rounded-lg bg-[#150e26] border border-purple-900/40 text-white placeholder-purple-400/40 focus:outline-none focus:border-purple-500"
                  required
                />
              </div>

              <div>
                <label className="block text-purple-300 font-medium mb-1">
                  Телефон / WhatsApp (РК) *
                </label>
                <input
                  type="text"
                  placeholder="+7 701 000 0000"
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value);
                    setErrorMsg('');
                  }}
                  className="w-full px-3 py-2 rounded-lg bg-[#150e26] border border-purple-900/40 text-white placeholder-purple-400/40 focus:outline-none focus:border-purple-500 font-mono"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-purple-300 font-medium mb-1">
                  Telegram (по желанию)
                </label>
                <input
                  type="text"
                  placeholder="@username"
                  value={telegram}
                  onChange={(e) => setTelegram(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-[#150e26] border border-purple-900/40 text-white placeholder-purple-400/40 focus:outline-none focus:border-purple-500"
                />
              </div>

              <div>
                <label className="block text-purple-300 font-medium mb-1">
                  Категория / Возраст
                </label>
                <select
                  value={ageGroup}
                  onChange={(e) => setAgeGroup(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-[#150e26] border border-purple-900/40 text-white focus:outline-none focus:border-purple-500"
                >
                  <option value="Школьник 10-11 класс">Школьник 10-11 класс</option>
                  <option value="Студент / Абитуриент">Студент / Абитуриент</option>
                  <option value="Родитель школьника">Родитель школьника</option>
                  <option value="Взрослый (смена карьеры / IT)">Взрослый (смена карьеры / IT)</option>
                  <option value="Действующий предприниматель">Действующий предприниматель</option>
                </select>
              </div>
            </div>

            {/* Date & Time Slot */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-purple-300 font-medium mb-1">
                  Удобная дата сессии
                </label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-[#150e26] border border-purple-900/40 text-white focus:outline-none focus:border-purple-500 font-mono"
                />
              </div>

              <div>
                <label className="block text-purple-300 font-medium mb-1">
                  Время (по времени Астаны, UTC+5)
                </label>
                <select
                  value={timeSlot}
                  onChange={(e) => setTimeSlot(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-[#150e26] border border-purple-900/40 text-white focus:outline-none focus:border-purple-500 font-mono"
                >
                  <option value="11:00">11:00</option>
                  <option value="14:00">14:00</option>
                  <option value="16:00">16:00</option>
                  <option value="18:00">18:00</option>
                  <option value="19:30">19:30</option>
                  <option value="21:00">21:00</option>
                </select>
              </div>
            </div>

            {/* Goal */}
            <div>
              <label className="block text-purple-300 font-medium mb-1">
                Цель консультации и текущая ситуация *
              </label>
              <textarea
                rows={2}
                placeholder="Например: 'Текущий балл ЕНТ 92, хочу грант в КБТУ или МУИТ на IT, не знаю как расставить 4 кода' или 'Хочу запустить магазин на Kaspi, есть бюджет 1.5 млн ₸'..."
                value={userGoal}
                onChange={(e) => {
                  setUserGoal(e.target.value);
                  setErrorMsg('');
                }}
                className="w-full px-3 py-2 rounded-lg bg-[#150e26] border border-purple-900/40 text-white placeholder-purple-400/40 focus:outline-none focus:border-purple-500 leading-relaxed"
                required
              />
            </div>

            {/* Price Summary & Submit */}
            <div className="pt-3 border-t border-purple-900/30 flex items-center justify-between gap-4">
              <div>
                <div className="text-[11px] text-purple-400">Итоговая стоимость:</div>
                <div className="text-lg font-bold text-white font-mono tabular-nums">
                  {formatKzt(selectedPkg.priceKzt)}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="py-2 px-3 text-xs text-purple-300 hover:text-white"
                >
                  Отмена
                </button>
                <button
                  type="submit"
                  className="py-2.5 px-5 text-xs font-semibold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 rounded-lg shadow-lg shadow-purple-900/50 transition-all flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Подтвердить запись</span>
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
