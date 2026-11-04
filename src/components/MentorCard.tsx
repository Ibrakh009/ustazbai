import React from 'react';
import { Star, ShieldCheck, MapPin, Clock, Calendar, ArrowRight } from 'lucide-react';
import { Mentor } from '../types';
import { formatKzt } from '../utils/formatters';

interface MentorCardProps {
  mentor: Mentor;
  onOpenDetails: (mentor: Mentor) => void;
  onBook: (mentor: Mentor) => void;
}

export const MentorCard: React.FC<MentorCardProps> = ({
  mentor,
  onOpenDetails,
  onBook
}) => {
  return (
    <div className="group rounded-2xl bg-[#120b22] border border-purple-900/30 hover:border-purple-500/50 p-5 flex flex-col justify-between transition-all duration-200 hover:shadow-xl hover:shadow-purple-950/40 relative">
      {/* Top Header: Avatar Monogram + Name + Flag */}
      <div>
        <div className="flex items-start gap-3.5 mb-3">
          {/* Typographic Monogram Avatar (NO AI IMAGES) */}
          <div className="relative shrink-0">
            <div className={`w-13 h-13 rounded-xl bg-gradient-to-br ${mentor.avatarColor} flex items-center justify-center text-white font-extrabold text-lg tracking-wider border border-purple-400/30 shadow-md shadow-purple-950/60`}>
              {mentor.initials}
            </div>
            <div className="absolute -bottom-1 -right-1 text-base leading-none drop-shadow" title={mentor.countryName}>
              {mentor.flag}
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5 flex-wrap">
              <h3 className="text-base font-bold text-white group-hover:text-purple-200 transition-colors truncate">
                {mentor.name}
              </h3>
              <span title="Верифицированный эксперт" className="inline-flex">
                <ShieldCheck className="w-4 h-4 text-purple-400 shrink-0" />
              </span>
            </div>

            <p className="text-xs text-purple-300/80 font-medium line-clamp-1 mt-0.5">
              {mentor.title}
            </p>

            <div className="flex items-center gap-2 text-[11px] text-purple-400/60 mt-1">
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                {mentor.city}
              </span>
              <span aria-hidden="true">·</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                Опыт {mentor.experienceYears} лет
              </span>
            </div>
          </div>
        </div>

        {/* Rating and Social Proof Line */}
        <div className="flex items-center justify-between py-2 border-y border-purple-900/20 text-xs mb-3">
          <div className="flex items-center gap-1 text-amber-300 font-semibold">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span className="font-mono tabular-nums">{mentor.rating.toFixed(2)}</span>
            <span className="text-purple-400/60 font-normal">({mentor.reviewsCount} отзывов)</span>
          </div>

          <div className="text-[11px] text-purple-300/80 font-medium">
            {mentor.categoryLabel}
          </div>
        </div>

        {/* Short Bio */}
        <p className="text-xs text-purple-200/70 line-clamp-2 leading-relaxed mb-3">
          {mentor.bio}
        </p>

        {/* Topics List (clean unboxed text with bullets) */}
        <div className="space-y-1 mb-4">
          <div className="text-[10px] uppercase tracking-wider text-purple-400/60 font-semibold">
            Ключевые темы:
          </div>
          <div className="text-xs text-purple-200/85 space-y-0.5">
            {mentor.topics.slice(0, 3).map((topic, i) => (
              <div key={i} className="flex items-start gap-1.5 truncate">
                <span className="text-purple-400 text-[10px] mt-0.5">▸</span>
                <span className="truncate">{topic}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Age Groups targets */}
        <div className="flex items-center gap-1.5 flex-wrap text-[11px] text-purple-300/70 mb-4">
          <span className="text-purple-400/50">Для кого:</span>
          {mentor.ageGroupLabels.map((lbl, idx) => (
            <span key={idx} className="bg-purple-950/60 border border-purple-800/30 px-2 py-0.5 rounded text-[11px] text-purple-200">
              {lbl}
            </span>
          ))}
        </div>
      </div>

      {/* Card Footer: Price in Tenge + Action Buttons */}
      <div className="pt-3 border-t border-purple-900/20">
        <div className="flex items-baseline justify-between mb-3">
          <div className="text-[11px] text-purple-400/70">Стоимость консультации:</div>
          <div className="text-right">
            <span className="text-lg font-bold text-white font-mono tabular-nums">
              {formatKzt(mentor.hourlyRate)}
            </span>
            <span className="text-xs text-purple-300/70"> / час</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => onOpenDetails(mentor)}
            className="w-full py-2 px-3 text-xs font-medium text-purple-200 bg-purple-950/50 hover:bg-purple-900/40 border border-purple-800/40 rounded-lg transition-colors text-center"
          >
            Подробнее
          </button>
          <button
            onClick={() => onBook(mentor)}
            className="w-full py-2 px-3 text-xs font-semibold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 rounded-lg transition-all shadow-md shadow-purple-900/40 flex items-center justify-center gap-1"
          >
            <span>Записаться</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
};
