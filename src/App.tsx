import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { MentorCard } from './components/MentorCard';
import { MentorModal } from './components/MentorModal';
import { BookingModal } from './components/BookingModal';
import { EducationSection } from './components/EducationSection';
import { BusinessSection } from './components/BusinessSection';
import { GrantCalculator } from './components/GrantCalculator';
import { AdminLoginModal } from './components/AdminLoginModal';
import { AdminPanel } from './components/AdminPanel';
import { Footer } from './components/Footer';
import { MobileBottomNav } from './components/MobileBottomNav';
import { PWAInstallButton } from './components/PWAInstallButton';
import { usePWAInstall } from './hooks/usePWAInstall';

import { INITIAL_MENTORS } from './data/mentorsData';
import { UNIVERSITIES_KZ } from './data/educationData';
import { Mentor, MentorPackage, BookingRequest, UniversityKZ, CountryCode, AgeGroup, MentorCategory } from './types';
import { ArrowUpDown, Filter, Sparkles, AlertCircle } from 'lucide-react';

export default function App() {
  // Navigation State
  const [activeTab, setActiveTab] = useState<'mentors' | 'education' | 'business' | 'calculator'>('mentors');

  // Persistence: Mentors State
  const [mentors, setMentors] = useState<Mentor[]>(() => {
    try {
      const saved = localStorage.getItem('ustaz_mentors_v1');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return INITIAL_MENTORS;
  });

  // Persistence: Universities State
  const [universities, setUniversities] = useState<UniversityKZ[]>(() => {
    try {
      const saved = localStorage.getItem('ustaz_unis_v1');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return UNIVERSITIES_KZ;
  });

  // Persistence: Bookings State
  const [bookings, setBookings] = useState<BookingRequest[]>(() => {
    try {
      const saved = localStorage.getItem('ustaz_bookings_v1');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    // Seed initial realistic booking for realism
    return [
      {
        id: 'booking-seed-1',
        mentorId: 'mentor-1',
        mentorName: 'Данияр Сериков',
        clientName: 'Алишер Мусин',
        clientPhone: '+7 777 412 8899',
        clientTelegram: '@alisher_ent',
        clientAgeGroup: 'Школьник 11 класс',
        packageTitle: 'Разовый разбор стратегии ЕНТ (60 мин)',
        priceKzt: 14000,
        scheduledDate: '2026-11-06',
        scheduledTime: '18:00',
        userGoal: 'Определить 4 кода вузов для поступления на IT грант в Алматы (КБТУ, МУИТ)',
        status: 'new',
        createdAt: '2026-11-04 10:30'
      }
    ];
  });

  // Filter & Search States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCountry, setSelectedCountry] = useState<CountryCode | 'all'>('all');
  const [selectedAgeGroup, setSelectedAgeGroup] = useState<AgeGroup | 'all'>('all');
  const [selectedCategory, setSelectedCategory] = useState<MentorCategory | 'all'>('all');
  const [sortBy, setSortBy] = useState<'recommended' | 'priceAsc' | 'priceDesc' | 'rating' | 'experience'>('recommended');

  // Modals
  const [activeMentorDetails, setActiveMentorDetails] = useState<Mentor | null>(null);
  const [bookingMentor, setBookingMentor] = useState<Mentor | null>(null);
  const [bookingInitialPackage, setBookingInitialPackage] = useState<MentorPackage | null>(null);

  // Invisible Admin State (Credentials: ibrakh093 / ibrakh0)
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(() => {
    try {
      return localStorage.getItem('ustaz_admin_auth') === 'true';
    } catch (e) {
      return false;
    }
  });
  const [isAdminLoginOpen, setIsAdminLoginOpen] = useState(false);
  const [isAdminPanelOpen, setIsAdminPanelOpen] = useState(false);
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showPwaGuide, setShowPwaGuide] = useState(false);

  // Sync state to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem('ustaz_mentors_v1', JSON.stringify(mentors));
    } catch (e) {}
  }, [mentors]);

  useEffect(() => {
    try {
      localStorage.setItem('ustaz_unis_v1', JSON.stringify(universities));
    } catch (e) {}
  }, [universities]);

  useEffect(() => {
    try {
      localStorage.setItem('ustaz_bookings_v1', JSON.stringify(bookings));
    } catch (e) {}
  }, [bookings]);

  // Global secret shortcut listener: Alt + A or Ctrl + Shift + A
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.altKey && e.key.toLowerCase() === 'a') || (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'a')) {
        e.preventDefault();
        if (isAdminLoggedIn) {
          setIsAdminPanelOpen((prev) => !prev);
        } else {
          setIsAdminLoginOpen(true);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isAdminLoggedIn]);

  // Admin Handlers
  const handleAdminLoginSuccess = () => {
    setIsAdminLoggedIn(true);
    localStorage.setItem('ustaz_admin_auth', 'true');
    setIsAdminLoginOpen(false);
    setIsAdminPanelOpen(true);
  };

  const handleAdminLogout = () => {
    setIsAdminLoggedIn(false);
    localStorage.removeItem('ustaz_admin_auth');
    setIsAdminPanelOpen(false);
  };

  const handleUpdateMentorPrice = (mentorId: string, newRate: number) => {
    setMentors((prev) =>
      prev.map((m) => {
        if (m.id === mentorId) {
          return {
            ...m,
            hourlyRate: newRate,
            packages: m.packages.map((pkg, idx) => ({
              ...pkg,
              priceKzt: idx === 0 ? newRate : Math.round(newRate * (pkg.sessionsCount * 0.85))
            }))
          };
        }
        return m;
      })
    );
  };

  const handleToggleMentorActive = (mentorId: string) => {
    setMentors((prev) =>
      prev.map((m) => (m.id === mentorId ? { ...m, isActive: !m.isActive } : m))
    );
  };

  const handleAddMentor = (newMentor: Mentor) => {
    setMentors((prev) => [newMentor, ...prev]);
  };

  const handleUpdateBookingStatus = (bookingId: string, status: BookingRequest['status']) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === bookingId ? { ...b, status } : b))
    );
  };

  const handleDeleteBooking = (bookingId: string) => {
    setBookings((prev) => prev.filter((b) => b.id !== bookingId));
  };

  const handleUpdateUniversityFee = (uniId: string, newFee: number, newScore: number) => {
    setUniversities((prev) =>
      prev.map((u) => (u.id === uniId ? { ...u, tuitionKztPerYear: newFee, minGrantScore: newScore } : u))
    );
  };

  // Client Booking Handler
  const handleCreateBooking = (bookingData: Omit<BookingRequest, 'id' | 'createdAt' | 'status'>) => {
    const newBooking: BookingRequest = {
      ...bookingData,
      id: `booking-${Date.now()}`,
      status: 'new',
      createdAt: new Date().toISOString().replace('T', ' ').slice(0, 16)
    };
    setBookings((prev) => [newBooking, ...prev]);
  };

  // Open booking modal for specific mentor
  const handleOpenBooking = (mentor: Mentor, pkg?: MentorPackage) => {
    setBookingMentor(mentor);
    setBookingInitialPackage(pkg || null);
  };

  const handleBookWithMentorById = (mentorId: string) => {
    const found = mentors.find((m) => m.id === mentorId) || mentors[0];
    handleOpenBooking(found);
  };

  // Filtered & Sorted Mentors
  const filteredMentors = mentors
    .filter((m) => {
      if (!m.isActive && !isAdminLoggedIn) return false;

      // Category filter
      if (selectedCategory !== 'all' && m.category !== selectedCategory) return false;

      // Country filter
      if (selectedCountry !== 'all' && m.country !== selectedCountry) return false;

      // Age group filter
      if (selectedAgeGroup !== 'all' && !m.ageGroups.includes(selectedAgeGroup) && !m.ageGroups.includes('all')) {
        return false;
      }

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = m.name.toLowerCase().includes(q);
        const matchTitle = m.title.toLowerCase().includes(q);
        const matchBio = m.bio.toLowerCase().includes(q);
        const matchTopics = m.topics.some((t) => t.toLowerCase().includes(q));
        const matchCity = m.city.toLowerCase().includes(q);
        if (!matchName && !matchTitle && !matchBio && !matchTopics && !matchCity) return false;
      }

      return true;
    })
    .sort((a, b) => {
      if (sortBy === 'priceAsc') return a.hourlyRate - b.hourlyRate;
      if (sortBy === 'priceDesc') return b.hourlyRate - a.hourlyRate;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'experience') return b.experienceYears - a.experienceYears;
      return 0; // recommended
    });

  return (
    <div className="min-h-screen bg-[#080511] text-[#f3f0fa] flex flex-col font-sans selection:bg-purple-600 selection:text-white">
      {/* Top Header */}
      <Header
        activeTab={activeTab}
        onSelectTab={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenAdminLogin={() => setIsAdminLoginOpen(true)}
        isAdminLoggedIn={isAdminLoggedIn}
        onOpenAdminPanel={() => setIsAdminPanelOpen(true)}
        bookingCount={bookings.filter((b) => b.status === 'new').length}
      />

      <main className="flex-1 pb-20 md:pb-0">
        {activeTab === 'mentors' && (
          <>
            {/* Hero & Multi-Filters */}
            <Hero
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              selectedCountry={selectedCountry}
              onSelectCountry={setSelectedCountry}
              selectedAgeGroup={selectedAgeGroup}
              onSelectAgeGroup={setSelectedAgeGroup}
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
              onOpenCalculator={() => setActiveTab('calculator')}
            />

            {/* Catalog Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
              {/* Controls Strip: Count & Sort */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-purple-900/20 pb-4">
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-bold text-white">
                    Каталог экспертов
                  </h2>
                  <span className="text-xs text-purple-300 bg-purple-950/80 border border-purple-700/40 px-2 py-0.5 rounded-full font-mono">
                    Найдено: {filteredMentors.length}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-xs">
                  <span className="text-purple-400/80 flex items-center gap-1">
                    <ArrowUpDown className="w-3.5 h-3.5" />
                    Сортировка:
                  </span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="px-2.5 py-1.5 rounded-lg bg-[#140e26] border border-purple-900/40 text-purple-200 focus:outline-none focus:border-purple-500 font-medium"
                  >
                    <option value="recommended">Рекомендованные</option>
                    <option value="priceAsc">Сначала доступные по цене (₸)</option>
                    <option value="priceDesc">Сначала высокий рейт (₸)</option>
                    <option value="rating">По рейтингу (★ 5.0)</option>
                    <option value="experience">По стажу работы</option>
                  </select>
                </div>
              </div>

              {/* Mentors Grid */}
              {filteredMentors.length === 0 ? (
                <div className="p-12 text-center rounded-2xl bg-[#120b22] border border-purple-900/30 space-y-3">
                  <AlertCircle className="w-8 h-8 text-purple-400 mx-auto" />
                  <h3 className="text-base font-bold text-white">По вашему запросу менторы не найдены</h3>
                  <p className="text-xs text-purple-300/70 max-w-sm mx-auto">
                    Попробуйте сбросить фильтры страны или категории, чтобы увидеть весь список экспертов.
                  </p>
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory('all');
                      setSelectedCountry('all');
                      setSelectedAgeGroup('all');
                    }}
                    className="mt-2 py-2 px-4 rounded-lg bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold"
                  >
                    Сбросить все фильтры
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {filteredMentors.map((mentor) => (
                    <MentorCard
                      key={mentor.id}
                      mentor={mentor}
                      onOpenDetails={(m) => setActiveMentorDetails(m)}
                      onBook={(m) => handleOpenBooking(m)}
                    />
                  ))}
                </div>
              )}
            </div>
          </>
        )}

        {/* Tab 2: Education & Universities of KZ */}
        {activeTab === 'education' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <EducationSection
              universities={universities}
              onBookWithMentorById={handleBookWithMentorById}
              onOpenCalculatorTab={() => setActiveTab('calculator')}
            />
          </div>
        )}

        {/* Tab 3: Business in Kazakhstan */}
        {activeTab === 'business' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <BusinessSection onBookWithMentorById={handleBookWithMentorById} />
          </div>
        )}

        {/* Tab 4: Interactive UNT Grant Calculator */}
        {activeTab === 'calculator' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <GrantCalculator onBookWithEntMentor={() => handleBookWithMentorById('mentor-1')} />
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer
        onOpenAdminLogin={() => setIsAdminLoginOpen(true)}
        isAdminLoggedIn={isAdminLoggedIn}
        onOpenAdminPanel={() => setIsAdminPanelOpen(true)}
        onSelectTab={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Mobile Bottom Navigation Bar (PWA Standalone UX) */}
      <MobileBottomNav
        activeTab={activeTab}
        onSelectTab={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenInstallModal={async () => {
          if (isInstallable) {
            const res = await install();
            if (!res) setShowPwaGuide(true);
          } else {
            setShowPwaGuide(true);
          }
        }}
      />

      {/* Standalone PWA Guide Modal */}
      {showPwaGuide && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div
            className="relative w-full max-w-sm bg-[#110a20] border border-purple-800/60 rounded-2xl p-6 shadow-2xl shadow-purple-950/90 text-center space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowPwaGuide(false)}
              className="absolute right-4 top-4 text-purple-400 hover:text-white"
            >
              ✕
            </button>

            <div className="w-16 h-16 mx-auto rounded-2xl overflow-hidden shadow-xl shadow-purple-900/50 border border-purple-500/50 bg-[#160c2c] flex items-center justify-center">
              <img src="/icon.svg" alt="USTAZ Icon" className="w-full h-full object-cover" />
            </div>

            <div>
              <h3 className="font-bold text-white text-base">
                USTAZ.KZ как приложение
              </h3>
              <p className="text-xs text-purple-300/70 mt-1">
                Открывайте платформу в 1 клик с экрана смартфона без адресной строки
              </p>
            </div>

            {isIOS ? (
              <div className="p-3.5 rounded-xl bg-[#170e2b] border border-purple-900/40 text-left text-xs space-y-2 text-purple-200">
                <p>1. Внизу Safari нажмите кнопку <strong>«Поделиться»</strong> (квадрат со стрелкой вверх ⎋).</p>
                <p>2. Выберите <strong>«На экран «Домой»»</strong> (Add to Home Screen ➕).</p>
                <p>3. Нажмите <strong>«Добавить»</strong>.</p>
              </div>
            ) : (
              <div className="p-3.5 rounded-xl bg-[#170e2b] border border-purple-900/40 text-left text-xs space-y-2 text-purple-200">
                <p>1. В меню Chrome нажмите на три точки <strong>⋮</strong> вверху справа.</p>
                <p>2. Нажмите <strong>«Установить приложение»</strong>.</p>
              </div>
            )}

            <button
              onClick={() => setShowPwaGuide(false)}
              className="w-full py-2.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs"
            >
              Понятно
            </button>
          </div>
        </div>
      )}

      {/* Modals */}
      {/* 1. Mentor Profile Detail Modal */}
      <MentorModal
        mentor={activeMentorDetails}
        onClose={() => setActiveMentorDetails(null)}
        onSelectPackageAndBook={(mentor, pkg) => handleOpenBooking(mentor, pkg)}
      />

      {/* 2. Booking Modal */}
      <BookingModal
        mentor={bookingMentor}
        initialPackage={bookingInitialPackage}
        onClose={() => {
          setBookingMentor(null);
          setBookingInitialPackage(null);
        }}
        onSubmitBooking={handleCreateBooking}
      />

      {/* 3. Invisible Admin Login Modal */}
      <AdminLoginModal
        isOpen={isAdminLoginOpen}
        onClose={() => setIsAdminLoginOpen(false)}
        onLoginSuccess={handleAdminLoginSuccess}
      />

      {/* 4. Full Admin Suite Panel */}
      <AdminPanel
        isOpen={isAdminPanelOpen}
        onClose={() => setIsAdminPanelOpen(false)}
        onLogout={handleAdminLogout}
        mentors={mentors}
        onUpdateMentorPrice={handleUpdateMentorPrice}
        onToggleMentorActive={handleToggleMentorActive}
        onAddMentor={handleAddMentor}
        bookings={bookings}
        onUpdateBookingStatus={handleUpdateBookingStatus}
        onDeleteBooking={handleDeleteBooking}
        universities={universities}
        onUpdateUniversityFee={handleUpdateUniversityFee}
      />
    </div>
  );
}
