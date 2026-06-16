import { useEffect, useRef, useState } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMAGE = "https://cdn.poehali.dev/projects/9556b583-e694-4699-9529-1e9cde5e7cbf/bucket/d50db19d-5253-4e10-bf85-92fdc72af922.JPG";
const PRICE_IMAGE = "https://cdn.poehali.dev/projects/9556b583-e694-4699-9529-1e9cde5e7cbf/bucket/9e154c6d-0a4a-4667-8ced-515f53e698c0.jpg";

const NAV_LINKS = [
  { label: "О студии", href: "#about" },
  { label: "Тренировки", href: "#training" },
  { label: "Тренеры", href: "#trainers" },
  { label: "Атмосфера", href: "#atmosphere" },
  { label: "Отзывы", href: "#reviews" },
  { label: "Контакты", href: "#contacts" },
];

const BENEFITS = [
  { icon: "Sparkles", title: "Восстановление осанки", desc: "Работаем с позвоночником через глубокие мышцы-стабилизаторы" },
  { icon: "Shield", title: "Мышечный кор", desc: "Укрепляем центр тела — основу силы и правильного движения" },
  { icon: "Users", title: "Мини-группы до 4 человек", desc: "Максимальное внимание тренера каждому участнику" },
  { icon: "Award", title: "Сертифицированные тренеры", desc: "Все специалисты прошли профессиональную подготовку" },
  { icon: "MapPin", title: "Центр Рязани", desc: "Краснорядская 3 — удобная локация в сердце города" },
  { icon: "Smartphone", title: "Своё приложение", desc: "Смотрите расписание, бронируйте и переносите тренировки онлайн — быстро и без звонков" },
];

const TRAININGS = [
  {
    type: "Мини-группа",
    subtitle: "до 4 человек",
    price: "1 000 ₽",
    oldPrice: "2 200 ₽",
    priceLabel: "первое занятие",
    badge: "Для новичков",
    features: ["Индивидуальный подход", "Атмосфера поддержки", "Общая мотивация", "Далее от 1 730 ₽"],
    accent: false,
    btnLabel: "Хочу на групповую!",
    btnHref: "https://t.me/verve_pilates?text=Здравствуйте!🤎%20Хочу%20забрать%20подарок%20и%20записаться%20на%20групповую%20тренировку%20за%201000р",
  },
  {
    type: "Индивидуально",
    subtitle: "только вы и тренер",
    price: "1 500 ₽",
    oldPrice: "3 300 ₽",
    priceLabel: "первое занятие",
    badge: "Для новичков",
    features: ["100% фокус на вас", "Персональная программа", "Быстрый прогресс", "Далее от 2 590 ₽"],
    accent: true,
    btnLabel: "Хочу на индив!",
    btnHref: "https://t.me/verve_pilates?text=Здравствуйте!🤎%20Хочу%20забрать%20подарок%20и%20записаться%20на%20индивидуальную%20тренировку%20за%201500р",
  },
];

const REFORMER_WORKS = [
  { title: "Позвоночник и осанка", icon: "Zap" },
  { title: "Глубокие мышцы кора", icon: "Target" },
  { title: "Тазовое дно", icon: "Circle" },
  { title: "Мобильность суставов", icon: "RotateCcw" },
  { title: "Реабилитация после травм", icon: "Heart" },
  { title: "Антистресс и тело", icon: "Wind" },
  { title: "Гибкость и баланс", icon: "Activity" },
  { title: "Тонус без нагрузки", icon: "TrendingUp" },
];

const TRAINERS = [
  { name: "Анна", spec: "Пилатес на реформерах", cert: "Сертифицированный тренер", photo: "https://cdn.poehali.dev/projects/9556b583-e694-4699-9529-1e9cde5e7cbf/bucket/3e4e06d1-9279-4204-b339-32c3f71a5c00.jpg", video: "https://cdn.poehali.dev/projects/9556b583-e694-4699-9529-1e9cde5e7cbf/bucket/83f4813b-9449-4442-bbce-d19fc57c1c49.MOV" },
  { name: "София", spec: "Пилатес на реформерах", cert: "Сертифицированный тренер", photo: "https://cdn.poehali.dev/projects/9556b583-e694-4699-9529-1e9cde5e7cbf/bucket/d3e0b651-fc0b-499e-a9ee-a1e28adfe61e.jpg", video: "https://cdn.poehali.dev/projects/9556b583-e694-4699-9529-1e9cde5e7cbf/bucket/18fe9eb1-5df6-41dc-8135-d416e3b9a672.MOV" },
  { name: "Валентина", spec: "Пилатес на реформерах", cert: "Сертифицированный тренер", photo: "https://cdn.poehali.dev/projects/9556b583-e694-4699-9529-1e9cde5e7cbf/bucket/a59f91a6-adeb-41f2-9d58-d0f8df85f979.jpg", video: "https://cdn.poehali.dev/projects/9556b583-e694-4699-9529-1e9cde5e7cbf/bucket/3b34ef74-9b9b-436c-b1c1-65e574789ef6.MOV" },
  { name: "Ксения", spec: "Пилатес на реформерах", cert: "Сертифицированный тренер", photo: "https://cdn.poehali.dev/projects/9556b583-e694-4699-9529-1e9cde5e7cbf/bucket/73a01b38-d81a-4b99-9082-1026c056de06.jpg", video: "https://cdn.poehali.dev/projects/9556b583-e694-4699-9529-1e9cde5e7cbf/bucket/159fbfaa-ac26-4793-ade8-8e259dcdfbc7.MOV" },
];

const GROUP_PRICES = [
  { name: "6 занятий", price: "13 200 ₽", gift: "+1", perClass: "1 885 ₽", totalClasses: 7, badge: null },
  { name: "9 занятий", price: "19 800 ₽", gift: "+2", perClass: "1 800 ₽", totalClasses: 11, badge: "hit" },
  { name: "11 занятий", price: "24 200 ₽", gift: "+3", perClass: "1 730 ₽", totalClasses: 14, badge: "best" },
];

const SOLO_PRICES = [
  { name: "6 занятий", price: "19 800 ₽", gift: "+1", perClass: "2 830 ₽", totalClasses: 7, badge: null },
  { name: "9 занятий", price: "29 700 ₽", gift: "+2", perClass: "2 700 ₽", totalClasses: 11, badge: "hit" },
  { name: "11 занятий", price: "36 300 ₽", gift: "+3", perClass: "2 590 ₽", totalClasses: 14, badge: "best" },
];


const MARQUEE_ITEMS = [
  "REFORMER PILATES", "POSTURE RECOVERY", "MUSCLE CORE", "MINI GROUPS", "PREMIUM STUDIO", "CERTIFIED TRAINERS",
  "REFORMER PILATES", "POSTURE RECOVERY", "MUSCLE CORE", "MINI GROUPS", "PREMIUM STUDIO", "CERTIFIED TRAINERS",
];

const ATMOSPHERE_VIDEOS = [
  "https://cdn.poehali.dev/projects/9556b583-e694-4699-9529-1e9cde5e7cbf/bucket/3328703d-0b47-4a85-9fb5-98011951c3d2.MOV",
  "https://cdn.poehali.dev/projects/9556b583-e694-4699-9529-1e9cde5e7cbf/bucket/15c39244-1e95-4bcd-bcb6-31d74c193ef0.MOV",
];

function AtmosphereVideoCarousel() {
  const [current, setCurrent] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  const goTo = (idx: number) => {
    setCurrent(idx);
  };

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
      videoRef.current.play().catch(() => {});
    }
  }, [current]);

  return (
    <div className="sm:col-span-2 relative overflow-hidden rounded-xl h-[650px] sm:h-[480px]" style={{ border: "1px solid rgba(184,92,69,0.12)" }}>
      <video
        ref={videoRef}
        key={ATMOSPHERE_VIDEOS[current]}
        src={ATMOSPHERE_VIDEOS[current]}
        className="w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
      />
      <div className="absolute inset-0 flex items-end p-6 rounded-xl pointer-events-none" style={{ background: "linear-gradient(to top, rgba(15,13,10,0.8) 0%, transparent 60%)" }}>
        <p className="font-display text-xl italic" style={{ color: "var(--verve-gold)" }}>Студия на реформерах</p>
      </div>
      {/* Dots */}
      <div className="absolute bottom-4 right-4 flex gap-2">
        {ATMOSPHERE_VIDEOS.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className="rounded-full transition-all duration-300"
            style={{ width: i === current ? 20 : 8, height: 8, background: i === current ? "var(--verve-gold)" : "rgba(255,255,255,0.4)" }}
          />
        ))}
      </div>
      {/* Arrows */}
      <button
        onClick={() => goTo((current - 1 + ATMOSPHERE_VIDEOS.length) % ATMOSPHERE_VIDEOS.length)}
        className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center justify-center rounded-full"
        style={{ width: 36, height: 36, background: "rgba(0,0,0,0.45)", border: "1px solid rgba(255,255,255,0.3)", color: "#fff" }}
      >
        <Icon name="ChevronLeft" size={18} />
      </button>
      <button
        onClick={() => goTo((current + 1) % ATMOSPHERE_VIDEOS.length)}
        className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center rounded-full"
        style={{ width: 36, height: 36, background: "rgba(0,0,0,0.45)", border: "1px solid rgba(255,255,255,0.3)", color: "#fff" }}
      >
        <Icon name="ChevronRight" size={18} />
      </button>
    </div>
  );
}

function TrainerVideoModal({ tr, onClose }: { tr: { name: string; video: string }; onClose: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    videoRef.current?.play().catch(() => {});
    const handleKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ background: "rgba(0,0,0,0.85)" }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-sm mx-4 rounded-2xl overflow-hidden"
        style={{ aspectRatio: "9/16", maxHeight: "85vh" }}
        onClick={(e) => e.stopPropagation()}
      >
        <video
          ref={videoRef}
          src={tr.video}
          className="w-full h-full object-cover"
          controls
          playsInline
          autoPlay
        />
        <button
          onClick={onClose}
          className="absolute top-3 right-3 flex items-center justify-center rounded-full"
          style={{ width: 36, height: 36, background: "rgba(0,0,0,0.6)", color: "#fff" }}
        >
          <Icon name="X" size={18} />
        </button>
        <div className="absolute bottom-0 left-0 right-0 px-4 py-3" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.7), transparent)" }}>
          <p className="font-display text-lg font-light" style={{ color: "#fff" }}>{tr.name}</p>
          <p className="font-body text-xs" style={{ color: "var(--verve-gold)" }}>Видео-визитка</p>
        </div>
      </div>
    </div>
  );
}

function TrainerCard({ tr }: { tr: { name: string; spec: string; cert: string; photo: string; video: string } }) {
  const [showVideo, setShowVideo] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const touchStartX = useRef(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) > 40) {
      setShowVideo((v) => !v);
    }
  };

  useEffect(() => {
    if (showVideo && videoRef.current) {
      videoRef.current.play().catch(() => {});
    } else if (!showVideo && videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  }, [showVideo]);

  return (
    <>
      {modalOpen && <TrainerVideoModal tr={tr} onClose={() => setModalOpen(false)} />}
      <div
        className="card-hover overflow-hidden rounded-xl cursor-pointer select-none"
        style={{ background: "var(--verve-dark-3)", border: "1px solid rgba(184,92,69,0.12)" }}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onMouseEnter={() => setShowVideo(true)}
        onMouseLeave={() => setShowVideo(false)}
      >
        <div className="relative overflow-hidden" style={{ aspectRatio: "3/4" }}>
          <img
            src={tr.photo}
            alt={tr.name}
            className="absolute inset-0 w-full h-full object-cover object-top transition-opacity duration-500"
            style={{ opacity: showVideo ? 0 : 1 }}
          />
          <video
            ref={videoRef}
            src={tr.video}
            className="absolute inset-0 w-full h-full object-cover object-top transition-opacity duration-500"
            style={{ opacity: showVideo ? 1 : 0 }}
            muted
            loop
            playsInline
          />
          <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(to top, rgba(15,13,10,0.7) 0%, transparent 50%)" }} />

          {/* Иконка воспроизведения на фото */}
          <div
            className="absolute inset-0 flex items-center justify-center transition-opacity duration-300"
            style={{ opacity: showVideo ? 0 : 1, pointerEvents: "none" }}
          >
            <div className="flex items-center justify-center rounded-full"
              style={{ width: 44, height: 44, background: "rgba(0,0,0,0.45)", border: "1.5px solid rgba(255,255,255,0.5)" }}>
              <Icon name="Play" size={20} style={{ color: "#fff", marginLeft: 3 }} />
            </div>
          </div>

          {/* Кнопка развернуть */}
          <button
            className="absolute top-2 right-2 flex items-center justify-center rounded-full transition-opacity duration-300"
            style={{ width: 30, height: 30, background: "rgba(0,0,0,0.45)", border: "1px solid rgba(255,255,255,0.3)", opacity: showVideo ? 1 : 0, color: "#fff" }}
            onClick={(e) => { e.stopPropagation(); setModalOpen(true); }}
          >
            <Icon name="Maximize2" size={14} />
          </button>

          <div className="absolute bottom-0 left-0 right-0 p-2 md:p-4">
            <h3 className="font-display text-lg md:text-2xl font-light" style={{ color: "#fff" }}>{tr.name}</h3>
          </div>
          <div className="absolute top-2 left-2 flex gap-1">
            <div className="rounded-full" style={{ width: 6, height: 6, background: showVideo ? "rgba(255,255,255,0.4)" : "var(--verve-gold)" }} />
            <div className="rounded-full" style={{ width: 6, height: 6, background: showVideo ? "var(--verve-gold)" : "rgba(255,255,255,0.4)" }} />
          </div>
        </div>
        <div className="px-2 md:px-4 py-2 md:py-3">
          <p className="font-body text-xs mb-1 leading-tight" style={{ color: "var(--verve-gold)" }}>{tr.spec}</p>
          <p className="font-body text-xs tracking-wider leading-tight" style={{ color: "var(--verve-muted)" }}>{tr.cert}</p>
        </div>
      </div>
    </>
  );
}

function useReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("visible");
        });
      },
      { threshold: 0.1 }
    );
    document.querySelectorAll(".reveal-section").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

export default function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [priceTab, setPriceTab] = useState<"group" | "solo">("group");
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [buyModal, setBuyModal] = useState(false);
  const [buyForm, setBuyForm] = useState({ name: "", phone: "" });
  const [buyDone, setBuyDone] = useState(false);
  useReveal();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const prices = priceTab === "group" ? GROUP_PRICES : SOLO_PRICES;

  return (
    <div className="min-h-screen" style={{ background: "var(--verve-dark)", color: "var(--verve-cream)" }}>
      {/* NAV */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          background: scrolled ? "rgba(245,239,230,0.95)" : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(184,92,69,0.2)" : "none",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 py-4 md:px-6 md:py-5 flex items-center justify-between">
          <button
            className="font-display text-xl md:text-2xl tracking-[0.3em] font-light"
            style={{ color: "var(--verve-gold)", background: "none", border: "none", cursor: "pointer" }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            VERVE
          </button>

          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((l) => (
              <button key={l.href} className="nav-link" onClick={() => scrollTo(l.href)}>
                {l.label}
              </button>
            ))}
          </div>

          <button className="hidden md:block verve-btn-primary rounded-xl" onClick={() => scrollTo("#booking")}>
            Записаться
          </button>

          <button
            className="md:hidden p-2"
            style={{ color: "var(--verve-gold)", background: "none", border: "none", cursor: "pointer" }}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Меню"
          >
            <Icon name={menuOpen ? "X" : "Menu"} size={22} />
          </button>
        </div>

        {menuOpen && (
          <div
            className="md:hidden mobile-menu-enter px-6 pb-6 pt-2"
            style={{ background: "rgba(245,239,230,0.98)", borderBottom: "1px solid rgba(184,92,69,0.2)" }}
          >
            <div className="flex flex-col gap-5">
              {NAV_LINKS.map((l) => (
                <button key={l.href} className="nav-link text-left text-sm" onClick={() => scrollTo(l.href)}>
                  {l.label}
                </button>
              ))}
              <button className="verve-btn-primary mt-2 rounded-xl" onClick={() => scrollTo("#booking")}>
                Записаться
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* HERO */}
      <section className="relative min-h-screen flex items-end pb-20 pt-24 overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${HERO_IMAGE})` }} />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to bottom, rgba(15,13,10,0.3) 0%, rgba(15,13,10,0.65) 50%, rgba(15,13,10,0.95) 100%)" }}
        />

        <div className="relative max-w-7xl mx-auto px-4 md:px-6 w-full">
          <p className="font-body text-xs tracking-[0.4em] uppercase mb-6 animate-fade-up" style={{ color: "var(--verve-gold)", animationDelay: "0.1s", opacity: 0, animationFillMode: "forwards" }}>
            Баланс. Эстетика. Осанка
          </p>
          <h1
            className="font-display font-light leading-[0.92] mb-8 animate-fade-up"
            style={{ fontSize: "clamp(2.8rem, 11vw, 9rem)", color: "#fff", animationDelay: "0.25s", opacity: 0, animationFillMode: "forwards" }}
          >
            Пилатес на реформерах.<br />
            <em className="italic" style={{ color: "var(--verve-gold)" }}>пл. Ленина</em>
          </h1>
          <p
            className="font-body font-light text-base md:text-lg mb-10 max-w-lg leading-relaxed animate-fade-up"
            style={{ color: "rgba(255,255,255,0.8)", animationDelay: "0.4s", opacity: 0, animationFillMode: "forwards" }}
          >
            Восстановление осанки и глубокого кора через работу на реформере.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 animate-fade-up" style={{ animationDelay: "0.55s", opacity: 0, animationFillMode: "forwards" }}>
            <button className="verve-btn-primary flex items-center justify-center gap-3 rounded-xl" onClick={() => scrollTo("#promo")}>
              <Icon name="Gift" size={16} />
              Пробная тренировка 1000р
              <span style={{ textDecoration: "line-through", opacity: 0.6, fontWeight: 400, fontSize: "0.85em" }}>2200р</span>
            </button>
          </div>

          <div className="mt-10 md:mt-16 flex gap-5 md:gap-10 animate-fade-up" style={{ animationDelay: "0.7s", opacity: 0, animationFillMode: "forwards" }}>
            <a href="https://t.me/verve_pilates?text=Здравствуйте!🤎%20Хочу%20забрать%20подарок%20и%20записаться%20на%20групповую%20тренировку%20за%201000р" target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
              <div className="font-display text-lg md:text-2xl font-light" style={{ color: "var(--verve-gold)" }}>4 человека</div>
              <div className="font-body text-xs tracking-wider uppercase mt-1" style={{ color: "rgba(255,255,255,0.6)" }}>мини-группы</div>
            </a>
            <div>
              <div className="font-display text-lg md:text-2xl font-light" style={{ color: "var(--verve-gold)" }}>вы и тренер</div>
              <div className="font-body text-xs tracking-wider uppercase mt-1" style={{ color: "rgba(255,255,255,0.6)" }}>индивидуальные</div>
            </div>
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <div className="py-5 overflow-hidden border-y" style={{ borderColor: "rgba(184,92,69,0.2)" }}>
        <div className="marquee-track">
          {MARQUEE_ITEMS.map((item, i) => (
            <span key={i} className="font-display text-sm md:text-lg font-light italic mx-4 md:mx-8" style={{ color: "var(--verve-gold)", opacity: 0.6 }}>
              {item} <span className="not-italic mx-2 md:mx-4" style={{ color: "var(--verve-gold)", opacity: 0.3 }}>·</span>
            </span>
          ))}
        </div>
      </div>

      {/* REFORMER WORKS */}
      <section id="reformer" className="py-16 md:py-28 px-4 md:px-6" style={{ background: "var(--verve-dark)" }}>
        <div className="max-w-7xl mx-auto">
          <div className="reveal-section text-center mb-10 md:mb-16">
            <p className="font-body text-xs tracking-[0.4em] uppercase mb-5" style={{ color: "var(--verve-gold)" }}>Пилатес на реформерах</p>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light leading-tight">
              С чем работает<br /><em className="italic" style={{ color: "var(--verve-gold)" }}>реформер</em>
            </h2>
          </div>
          <div className="gold-line mb-16 reveal-section" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px reveal-section" style={{ background: "rgba(184,92,69,0.15)" }}>
            {REFORMER_WORKS.map((item) => (
              <div
                key={item.title}
                className="flex flex-col items-center justify-center py-5 md:py-8 px-2 md:px-4 text-center transition-all duration-300"
                style={{ background: "var(--verve-dark)" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "var(--verve-dark-3)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "var(--verve-dark)"; }}
              >
                <div className="mb-4" style={{ color: "var(--verve-gold)" }}><Icon name={item.icon} size={24} fallback="Circle" /></div>
                <span className="font-body text-xs md:text-sm font-medium leading-tight" style={{ color: "var(--verve-cream)" }}>{item.title}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ATMOSPHERE */}
      <section id="atmosphere" className="py-16 md:py-28 px-4 md:px-6" style={{ background: "var(--verve-dark)" }}>
        <div className="max-w-7xl mx-auto">
          <div className="reveal-section mb-10 md:mb-16">
            <p className="font-body text-xs tracking-[0.4em] uppercase mb-5" style={{ color: "var(--verve-gold)" }}>Атмосфера</p>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light leading-tight">
              Эстетика<br /><em className="italic" style={{ color: "var(--verve-gold)" }}>в деталях</em>
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 reveal-section">
            <AtmosphereVideoCarousel />
            {[
              { icon: "Layers", title: "Профессиональное оборудование", desc: "Реформеры студийного класса ведущих брендов" },
              { icon: "Droplets", title: "Раздевалка с душевыми", desc: "Просторная раздевалка и душевые — всё для комфорта после тренировки" },
              { icon: "Sparkles", title: "Бьюти-зона", desc: "Всё, чтобы выглядеть на все 100: от мистов для лица до фена Bork" },
              { icon: "Coffee", title: "Меню напитков", desc: "Капучино, матча, латте и сезонные напитки — в подарок для каждого гостя" },
            ].map((card) => (
              <div key={card.title} className="card-hover p-6 rounded-xl" style={{ background: "var(--verve-dark-3)", border: "1px solid rgba(184,92,69,0.12)" }}>
                <div className="mb-3" style={{ color: "var(--verve-gold)" }}><Icon name={card.icon} size={20} fallback="Star" /></div>
                <h4 className="font-body font-medium text-sm mb-2" style={{ color: "var(--verve-cream)" }}>{card.title}</h4>
                <p className="font-body text-xs leading-relaxed" style={{ color: "var(--verve-muted)" }}>{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROMO BANNER */}
      <section id="promo" className="px-4 md:px-6 py-0">
        <div className="max-w-7xl mx-auto reveal-section relative overflow-hidden rounded-sm" style={{ background: "var(--verve-dark)" }}>
          {/* Декоративная линия сверху */}
          <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, var(--verve-gold), transparent)" }} />
          {/* Фоновый паттерн */}
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "repeating-linear-gradient(45deg, var(--verve-gold) 0px, transparent 1px, transparent 60px)", backgroundSize: "85px 85px" }} />
          {/* Золотое свечение справа */}
          <div className="absolute right-0 top-0 bottom-0 w-1/2 pointer-events-none" style={{ background: "radial-gradient(ellipse at 80% 50%, rgba(184,92,69,0.12) 0%, transparent 70%)" }} />

          <div className="relative px-4 py-10 sm:px-8 sm:py-12 md:px-16 md:py-16">
            {/* Верхняя строка */}
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 md:gap-10">
              <div className="md:max-w-xl">
                <div className="inline-flex items-center gap-2 mb-4 px-3 py-1.5 rounded-xl" style={{ background: "rgba(184,92,69,0.12)", border: "1px solid rgba(184,92,69,0.3)" }}>
                  <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ background: "var(--verve-gold)" }} />
                  <span className="font-body text-xs tracking-[0.3em] uppercase" style={{ color: "var(--verve-gold)" }}>Только сейчас</span>
                </div>
                <h3 className="font-display font-light leading-[0.9] mb-4" style={{ fontSize: "clamp(2rem, 7vw, 5rem)", color: "var(--verve-cream)" }}>
                  Твоё тело<br />
                  <em className="italic" style={{ color: "var(--verve-gold)" }}>заслуживает</em><br />
                  попробовать
                </h3>
                <p className="font-body font-light text-sm sm:text-base leading-relaxed" style={{ color: "rgba(28,20,16,0.6)" }}>
                  Первая тренировка — по цене кофе с собой. Без абонемента, без обязательств. Просто приходи и почувствуй.
                </p>
              </div>

              {/* Правая колонка — цены + кнопки */}
              <div className="w-full md:w-80 shrink-0">
                <div className="flex flex-col gap-3">
                  <a
                    href="https://t.me/verve_pilates?text=Здравствуйте!🤎%20Хочу%20забрать%20подарок%20и%20записаться%20на%20групповую%20тренировку%20за%201000р"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between gap-3 px-4 py-4 md:px-7 md:py-5 transition-all duration-300 rounded-xl"
                    style={{ background: "var(--verve-gold)", textDecoration: "none" }}
                  >
                    <div>
                      <p className="font-body text-xs tracking-widest uppercase mb-0.5" style={{ color: "rgba(255,255,255,0.75)" }}>Мини-группа</p>
                      <p className="font-display text-lg md:text-2xl font-light flex items-baseline gap-2" style={{ color: "#fff" }}>1 000 ₽<span className="font-body text-sm font-normal" style={{ textDecoration: "line-through", opacity: 0.6 }}>2 200 ₽</span></p>
                    </div>
                    <div className="flex items-center gap-1.5 font-body text-sm font-medium shrink-0" style={{ color: "#fff" }}>
                      Записаться
                      <Icon name="ArrowRight" size={15} />
                    </div>
                  </a>
                  <a
                    href="https://t.me/verve_pilates?text=Здравствуйте!🤎%20Хочу%20забрать%20подарок%20и%20записаться%20на%20индивидуальную%20тренировку%20за%201500р"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between gap-3 px-4 py-4 md:px-7 md:py-5 transition-all duration-300 rounded-xl"
                    style={{ background: "rgba(184,92,69,0.08)", border: "1px solid rgba(184,92,69,0.3)", textDecoration: "none" }}
                  >
                    <div>
                      <p className="font-body text-xs tracking-widest uppercase mb-0.5" style={{ color: "rgba(28,20,16,0.55)" }}>Индивидуально</p>
                      <p className="font-display text-lg md:text-2xl font-light flex items-baseline gap-2" style={{ color: "var(--verve-cream)" }}>1 500 ₽<span className="font-body text-sm font-normal" style={{ textDecoration: "line-through", opacity: 0.6, color: "var(--verve-muted)" }}>3 300 ₽</span></p>
                    </div>
                    <div className="flex items-center gap-1.5 font-body text-sm font-medium shrink-0" style={{ color: "var(--verve-gold)" }}>
                      Записаться
                      <Icon name="ArrowRight" size={15} />
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
          {/* Декоративная линия снизу */}
          <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, var(--verve-gold), transparent)" }} />
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-16 md:py-28 px-4 md:px-6" style={{ background: "var(--verve-dark-2)" }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
            <div className="reveal-section">
              <p className="font-body text-xs tracking-[0.4em] uppercase mb-5" style={{ color: "var(--verve-gold)" }}>О студии</p>
              <h2 className="font-display text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-light leading-tight mb-8">
                Место, где тело<br /><em className="italic" style={{ color: "var(--verve-gold)" }}>обретает</em> баланс
              </h2>
              <div className="gold-line mb-8" />
              <p className="font-body font-light leading-relaxed mb-6" style={{ color: "rgba(28,20,16,0.65)", fontSize: "1.05rem" }}>
                Реформер — не тренажёр из спортзала. Это оборудование, которое работает с глубокими мышцами: выравнивает осанку, восстанавливает кор, убирает зажимы. Мягко, но с результатом.
              </p>
              <p className="font-body font-light leading-relaxed" style={{ color: "rgba(28,20,16,0.65)", fontSize: "1.05rem" }}>
                Мини-группы до 4 человек — каждый получает внимание тренера. Индивидуальные — 100% фокус на вашем теле и целях.
              </p>
            </div>
            <div className="reveal-section grid grid-cols-1 sm:grid-cols-2 gap-3">
              {BENEFITS.map((b) => {
                const isGroup = b.title === "Мини-группы до 4 человек";
                const Wrapper = isGroup ? "a" : "div";
                const wrapperProps = isGroup ? { href: "https://t.me/verve_pilates?text=Здравствуйте!🤎%20Хочу%20забрать%20подарок%20и%20записаться%20на%20групповую%20тренировку%20за%201000р", target: "_blank", rel: "noopener noreferrer", style: { textDecoration: "none" } } : {};
                return (
                  <Wrapper key={b.title} {...wrapperProps}>
                    <div className="card-hover p-3 sm:p-4 md:p-5 rounded-xl" style={{ background: "var(--verve-dark-3)", border: "1px solid rgba(184,92,69,0.12)" }}>
                      <div className="mb-3" style={{ color: "var(--verve-gold)" }}><Icon name={b.icon} size={20} fallback="Star" /></div>
                      <h4 className="font-body font-medium text-sm mb-2" style={{ color: "var(--verve-cream)" }}>{b.title}</h4>
                      <p className="font-body text-xs leading-relaxed" style={{ color: "var(--verve-muted)" }}>{b.desc}</p>
                    </div>
                  </Wrapper>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* TRAININGS */}
      <section id="training" className="py-16 md:py-28 px-4 md:px-6" style={{ background: "var(--verve-dark-2)" }}>
        <div className="max-w-7xl mx-auto">
          <div className="reveal-section mb-10 md:mb-16">
            <p className="font-body text-xs tracking-[0.4em] uppercase mb-5" style={{ color: "var(--verve-gold)" }}>Форматы тренировок</p>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light leading-tight">
              Выберите свой<br /><em className="italic" style={{ color: "var(--verve-gold)" }}>формат</em>
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6 reveal-section">
            {TRAININGS.map((t) => (
              <div
                key={t.type}
                className="relative p-5 sm:p-8 md:p-10 overflow-hidden card-hover rounded-xl"
                style={{
                  background: t.accent ? "transparent" : "var(--verve-dark-3)",
                  border: t.accent ? "1px solid var(--verve-gold)" : "1px solid rgba(184,92,69,0.15)",
                  boxShadow: t.accent ? "inset 0 0 80px rgba(184,92,69,0.05)" : "none",
                }}
              >
                {t.accent && (
                  <div className="absolute top-5 right-5 font-body text-xs tracking-widest uppercase px-2 py-1 rounded-lg" style={{ background: "var(--verve-gold)", color: "#fff" }}>
                    Топ
                  </div>
                )}
                <p className="font-body text-xs tracking-[0.3em] uppercase mb-3" style={{ color: "var(--verve-gold)" }}>{t.subtitle}</p>
                <h3 className="font-display text-2xl sm:text-3xl md:text-4xl font-light mb-4 md:mb-6" style={{ color: "var(--verve-cream)" }}>{t.type}</h3>
                <div className="gold-line mb-6" />
                <div className="mb-2">
                  <span className="font-display text-2xl sm:text-3xl font-light" style={{ color: "var(--verve-gold)" }}>{t.price}</span>
                  {t.oldPrice && <span className="font-body text-sm ml-2" style={{ textDecoration: "line-through", color: "var(--verve-muted)", opacity: 0.6 }}>{t.oldPrice}</span>}
                  <span className="font-body text-xs ml-2" style={{ color: "var(--verve-muted)" }}>/ {t.priceLabel}</span>
                </div>
                <p className="font-body text-xs mb-6" style={{ color: "var(--verve-muted)" }}>Специальная цена для первого визита</p>
                <ul className="space-y-3 mb-8">
                  {t.features.map((f) => (
                    <li key={f} className="flex items-center gap-3 font-body text-sm" style={{ color: "rgba(28,20,16,0.7)" }}>
                      <span style={{ color: "var(--verve-gold)" }}>—</span> {f}
                    </li>
                  ))}
                </ul>
                <a
                  href={t.btnHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="verve-btn-primary w-full flex items-center justify-center rounded-xl"
                  style={{ textDecoration: "none" }}
                >
                  {t.btnLabel}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TRAINERS */}
      <section id="trainers" className="py-16 md:py-28 px-4 md:px-6" style={{ background: "var(--verve-dark-2)" }}>
        <div className="max-w-7xl mx-auto">
          <div className="reveal-section text-center mb-10 md:mb-16">
            <p className="font-body text-xs tracking-[0.4em] uppercase mb-5" style={{ color: "var(--verve-gold)" }}>Наша команда</p>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light leading-tight">
              Сертифицированные<br /><em className="italic" style={{ color: "var(--verve-gold)" }}>тренеры</em>
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 reveal-section">
            {TRAINERS.map((tr) => (
              <TrainerCard key={tr.name} tr={tr} />
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="py-16 md:py-28 px-4 md:px-6" style={{ background: "var(--verve-cream)" }}>
        <div className="max-w-5xl mx-auto">
          <div className="reveal-section text-center mb-10 md:mb-14">
            <p className="font-body text-xs tracking-[0.4em] uppercase mb-5" style={{ color: "var(--verve-gold)" }}>Абонементы</p>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light leading-tight mb-2" style={{ color: "var(--verve-dark)" }}>
              Меню<br /><em className="italic" style={{ color: "var(--verve-gold)" }}>восстановления</em>
            </h2>
          </div>

          {/* В МИНИ-ГРУППЕ */}
          <div className="reveal-section mb-6">
            <div className="rounded-2xl p-6 md:p-8" style={{ background: "rgba(28,20,16,0.06)", border: "1px solid rgba(28,20,16,0.08)" }}>
              <div className="flex items-baseline gap-3 mb-6">
                <h3 className="font-body font-bold text-sm tracking-[0.2em] uppercase" style={{ color: "var(--verve-dark)" }}>В мини-группе</h3>
                <span className="font-body text-xs" style={{ color: "var(--verve-muted)" }}>До 4 человек</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                {GROUP_PRICES.map((row) => (
                  <div
                    key={row.name}
                    className="relative rounded-2xl p-5 pt-7"
                    style={{
                      background: row.badge === "hit" ? "var(--verve-gold)" : "var(--verve-dark)",
                      border: row.badge === "best" ? "2px solid var(--verve-gold)" : row.badge === null ? "1px solid rgba(28,20,16,0.12)" : "none",
                      boxShadow: row.badge === "hit" ? "0 8px 32px rgba(184,92,69,0.35)" : "0 2px 12px rgba(0,0,0,0.06)",
                    }}
                  >
                    {row.badge === "hit" && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap px-3 py-1 rounded-full font-body text-xs font-bold tracking-widest uppercase" style={{ background: "var(--verve-cream)", color: "var(--verve-dark)" }}>
                        Хит продаж
                      </div>
                    )}
                    {row.badge === "best" && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap px-3 py-1 rounded-full font-body text-xs font-bold tracking-widest uppercase" style={{ background: "var(--verve-gold)", color: "#fff" }}>
                        Лучшая цена
                      </div>
                    )}
                    <div className="flex items-center flex-wrap gap-2 mb-3">
                      <span className="font-body font-bold text-sm" style={{ color: row.badge === "hit" ? "#fff" : "var(--verve-cream)" }}>{row.name}</span>
                      <span className="font-body text-xs px-2 py-0.5 rounded-full" style={{ background: row.badge === "hit" ? "rgba(255,255,255,0.25)" : "rgba(184,92,69,0.15)", color: row.badge === "hit" ? "#fff" : "var(--verve-gold)" }}>
                        {row.gift} в подарок
                      </span>
                    </div>
                    <div className="font-display text-3xl md:text-4xl font-light mb-2" style={{ color: row.badge === "hit" ? "#fff" : "var(--verve-gold)" }}>{row.price}</div>
                    <div className="font-body text-xs" style={{ color: row.badge === "hit" ? "rgba(255,255,255,0.7)" : "var(--verve-muted)" }}>
                      {row.perClass} / занятие · {row.totalClasses} тренировок
                    </div>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="rounded-2xl px-5 py-4 flex items-center justify-between" style={{ background: "var(--verve-dark)", border: "1px solid rgba(28,20,16,0.12)" }}>
                  <div>
                    <p className="font-body font-medium text-sm" style={{ color: "var(--verve-cream)" }}>Разовое занятие</p>
                    <p className="font-body text-xs mt-0.5" style={{ color: "var(--verve-muted)" }}>Без абонемента</p>
                  </div>
                  <span className="font-display text-xl font-light" style={{ color: "var(--verve-gold)" }}>2 200 ₽</span>
                </div>
                <div className="rounded-2xl px-5 py-4 flex items-center justify-between" style={{ background: "var(--verve-dark)", border: "1px solid rgba(28,20,16,0.12)" }}>
                  <div>
                    <p className="font-body font-medium text-sm" style={{ color: "var(--verve-cream)" }}>Сплит для двоих</p>
                    <p className="font-body text-xs mt-0.5" style={{ color: "var(--verve-muted)" }}>Тренировка на двоих</p>
                  </div>
                  <span className="font-display text-xl font-light" style={{ color: "var(--verve-gold)" }}>5 000 ₽</span>
                </div>
              </div>
            </div>
          </div>

          {/* ИНДИВИДУАЛЬНО */}
          <div className="reveal-section mb-8">
            <div className="rounded-2xl p-6 md:p-8" style={{ background: "rgba(28,20,16,0.06)", border: "1px solid rgba(28,20,16,0.08)" }}>
              <div className="flex items-baseline gap-3 mb-6">
                <h3 className="font-body font-bold text-sm tracking-[0.2em] uppercase" style={{ color: "var(--verve-dark)" }}>Индивидуально</h3>
                <span className="font-body text-xs" style={{ color: "var(--verve-muted)" }}>Вы и тренер</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                {SOLO_PRICES.map((row) => (
                  <div
                    key={row.name}
                    className="relative rounded-2xl p-5 pt-7"
                    style={{
                      background: row.badge === "hit" ? "var(--verve-gold)" : "var(--verve-dark)",
                      border: row.badge === "best" ? "2px solid var(--verve-gold)" : row.badge === null ? "1px solid rgba(28,20,16,0.12)" : "none",
                      boxShadow: row.badge === "hit" ? "0 8px 32px rgba(184,92,69,0.35)" : "0 2px 12px rgba(0,0,0,0.06)",
                    }}
                  >
                    {row.badge === "hit" && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap px-3 py-1 rounded-full font-body text-xs font-bold tracking-widest uppercase" style={{ background: "var(--verve-cream)", color: "var(--verve-dark)" }}>
                        Хит продаж
                      </div>
                    )}
                    {row.badge === "best" && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap px-3 py-1 rounded-full font-body text-xs font-bold tracking-widest uppercase" style={{ background: "var(--verve-gold)", color: "#fff" }}>
                        Лучшая цена
                      </div>
                    )}
                    <div className="flex items-center flex-wrap gap-2 mb-3">
                      <span className="font-body font-bold text-sm" style={{ color: row.badge === "hit" ? "#fff" : "var(--verve-cream)" }}>{row.name}</span>
                      <span className="font-body text-xs px-2 py-0.5 rounded-full" style={{ background: row.badge === "hit" ? "rgba(255,255,255,0.25)" : "rgba(184,92,69,0.15)", color: row.badge === "hit" ? "#fff" : "var(--verve-gold)" }}>
                        {row.gift} в подарок
                      </span>
                    </div>
                    <div className="font-display text-3xl md:text-4xl font-light mb-2" style={{ color: row.badge === "hit" ? "#fff" : "var(--verve-gold)" }}>{row.price}</div>
                    <div className="font-body text-xs" style={{ color: row.badge === "hit" ? "rgba(255,255,255,0.7)" : "var(--verve-muted)" }}>
                      {row.perClass} / занятие · {row.totalClasses} тренировок
                    </div>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="rounded-2xl px-5 py-4 flex items-center justify-between" style={{ background: "var(--verve-dark)", border: "1px solid rgba(28,20,16,0.12)" }}>
                  <div>
                    <p className="font-body font-medium text-sm" style={{ color: "var(--verve-cream)" }}>Разовое занятие</p>
                    <p className="font-body text-xs mt-0.5" style={{ color: "var(--verve-muted)" }}>Без абонемента</p>
                  </div>
                  <span className="font-display text-xl font-light" style={{ color: "var(--verve-gold)" }}>3 300 ₽</span>
                </div>
                <div className="rounded-2xl px-5 py-4 flex items-center justify-between" style={{ background: "var(--verve-dark)", border: "1px solid rgba(28,20,16,0.12)" }}>
                  <div>
                    <p className="font-body font-medium text-sm" style={{ color: "var(--verve-cream)" }}>Сплит для двоих</p>
                    <p className="font-body text-xs mt-0.5" style={{ color: "var(--verve-muted)" }}>Тренировка на двоих</p>
                  </div>
                  <span className="font-display text-xl font-light" style={{ color: "var(--verve-gold)" }}>5 000 ₽</span>
                </div>
              </div>
            </div>
          </div>

          {/* БОНУСНЫЙ БАННЕР */}
          <div className="reveal-section rounded-2xl px-6 py-5 md:px-10 md:py-6 flex flex-col sm:flex-row items-center gap-4 sm:gap-6 mb-8" style={{ background: "var(--verve-gold)" }}>
            <div className="shrink-0 text-center sm:text-left">
              <p className="font-display text-2xl md:text-3xl font-light" style={{ color: "#fff" }}>+1 000 ₽</p>
              <p className="font-body font-bold text-xs tracking-[0.2em] uppercase" style={{ color: "#fff" }}>бонусами</p>
            </div>
            <div className="w-px self-stretch hidden sm:block" style={{ background: "rgba(255,255,255,0.3)" }} />
            <p className="font-body text-sm leading-relaxed text-center sm:text-left" style={{ color: "rgba(255,255,255,0.9)" }}>Дарим 1 000 бонусных рублей на абонемент, если покупаете в день пробного занятия или продлеваете действующий абонемент.
</p>
          </div>

          <div className="text-center reveal-section">
            <button
              className="verve-btn-primary inline-flex items-center gap-3 text-xs rounded-xl"
              onClick={() => setBuyModal(true)}
            >
              <Icon name="CreditCard" size={16} />
              Купить абонемент
            </button>
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section id="reviews" className="py-16 md:py-28 px-4 md:px-6" style={{ background: "var(--verve-dark-2)" }}>
        <div className="max-w-4xl mx-auto">
          <div className="reveal-section text-center mb-10 md:mb-14">
            <p className="font-body text-xs tracking-[0.4em] uppercase mb-5" style={{ color: "var(--verve-gold)" }}>Отзывы</p>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light leading-tight">
              Говорят наши<br /><em className="italic" style={{ color: "var(--verve-gold)" }}>клиенты</em>
            </h2>
          </div>
          <div className="reveal-section rounded-sm overflow-hidden" style={{ border: "1px solid rgba(184,92,69,0.15)" }}>
            <iframe
              src="https://yandex.ru/maps-reviews-widget/187842926696?comments"
              width="100%"
              height="520"
              style={{ border: "none", display: "block" }}
              title="Отзывы VERVE Pilates на Яндекс Картах"
            />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 md:py-28 px-4 md:px-6" style={{ background: "var(--verve-dark-2)" }}>
        <div className="max-w-3xl mx-auto">
          <div className="reveal-section text-center mb-10 md:mb-14">
            <p className="font-body text-xs tracking-[0.4em] uppercase mb-5" style={{ color: "var(--verve-gold)" }}>Вопросы и ответы</p>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-light leading-tight">
              Всё, что вы<br /><em className="italic" style={{ color: "var(--verve-gold)" }}>хотели спросить</em>
            </h2>
          </div>
          <div className="reveal-section flex flex-col gap-2">
            {[
              {
                q: "Я никогда не занималась пилатесом. Это сложно?",
                a: "Нет. Реформер — это не тренажёрный зал и не групповая аэробика. Тренер ведёт вас с нуля: объясняет каждое движение, следит за техникой, подбирает нагрузку под ваше тело. На первой тренировке всё понятно даже без опыта.",
              },
              {
                q: "Мне нельзя нагружать спину. Подойдёт ли мне?",
                a: "Пилатес на реформерах — один из немногих видов физической активности, который рекомендуют при проблемах со спиной. Он работает с глубокими мышцами-стабилизаторами, снимает нагрузку с позвоночника и восстанавливает правильное положение тела. Перед занятием скажите тренеру о своих ограничениях — программу адаптируют.",
              },
              {
                q: "Сколько занятий нужно, чтобы почувствовать результат?",
                a: "Большинство клиентов замечают первые изменения после 3–5 занятий: спина меньше болит, улучшается осанка, тело становится более управляемым. Видимые изменения — через 8–10 занятий при регулярности 1–2 раза в неделю.",
              },
              {
                q: "Чем мини-группа отличается от индивидуальной?",
                a: "В мини-группе до 4 человек — тренер следит за каждым, но есть живая энергия команды и поддержка. Это более доступный по цене формат с отличным результатом. Индивидуальная — 100% внимание тренера, программа строится только под ваше тело и цели. Подходит тем, кто восстанавливается после травм или хочет максимально быстрого прогресса.",
              },
              {
                q: "Что мне нужно взять на первое занятие?",
                a: "Удобная спортивная одежда и носки с нескользящей подошвой (или спортивные носки — можно купить у нас). Всё остальное есть в студии: коврики, оборудование, душевые, полотенца. После тренировки вас ждёт напиток в подарок.",
              },
              {
                q: "А вдруг мне не понравится?",
                a: "Именно поэтому мы сделали первое занятие по цене 1 000 ₽ — чтобы вы могли попробовать без риска. Никаких обязательств и давления. Пришли, почувствовали, решили. По опыту — 9 из 10 возвращаются.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="overflow-hidden rounded-xl"
                style={{ border: "1px solid rgba(184,92,69,0.15)", background: openFaq === i ? "var(--verve-dark-3)" : "var(--verve-dark)" }}
              >
                <button
                  className="w-full flex items-center justify-between gap-4 px-5 py-5 text-left transition-all duration-200 rounded-xl"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  style={{ background: "none", border: "none", cursor: "pointer" }}
                >
                  <span className="font-body font-medium text-sm sm:text-base leading-snug" style={{ color: "var(--verve-cream)" }}>{item.q}</span>
                  <span
                    className="shrink-0 flex items-center justify-center w-7 h-7 rounded-sm transition-transform duration-300"
                    style={{
                      background: openFaq === i ? "var(--verve-gold)" : "rgba(184,92,69,0.12)",
                      transform: openFaq === i ? "rotate(45deg)" : "rotate(0deg)",
                    }}
                  >
                    <Icon name="Plus" size={14} style={{ color: openFaq === i ? "#fff" : "var(--verve-gold)" }} />
                  </span>
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-5">
                    <div className="gold-line mb-4" />
                    <p className="font-body font-light text-sm leading-relaxed" style={{ color: "rgba(28,20,16,0.7)" }}>{item.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BOOKING */}
      <section id="booking" className="py-16 md:py-28 px-4 md:px-6" style={{ background: "var(--verve-dark)" }}>
        <div className="max-w-3xl mx-auto text-center reveal-section">
          <p className="font-body text-xs tracking-[0.4em] uppercase mb-5" style={{ color: "var(--verve-gold)" }}>Запись</p>
          <h2 className="font-display font-light leading-tight mb-6" style={{ fontSize: "clamp(2rem, 7vw, 5rem)" }}>
            Начни своё<br /><em className="italic" style={{ color: "var(--verve-gold)" }}>движение</em>
          </h2>
          <p className="font-body font-light text-sm sm:text-base md:text-lg mb-10 leading-relaxed" style={{ color: "rgba(28,20,16,0.6)" }}>
            Записывайтесь через приложение или напишите администратору в Telegram. Отвечаем быстро.
          </p>
          <div className="gold-line mb-10" />
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
            <a
              href="https://apps.apple.com/ru/app/verve-пилатес-на-реформерах/id6758667943"
              target="_blank"
              rel="noopener noreferrer"
              className="verve-btn-primary flex items-center justify-center gap-3 rounded-xl"
              style={{ textDecoration: "none" }}
            >
              <Icon name="Smartphone" size={16} />
              Скачать приложение
            </a>
            <a
              href="https://t.me/verve_pilates?text=Здравствуйте!🤎%20Хочу%20записаться%20на%20тренировку"
              target="_blank"
              rel="noopener noreferrer"
              className="verve-btn-outline flex items-center justify-center gap-3 rounded-xl"
              style={{ textDecoration: "none" }}
            >
              <Icon name="MessageCircle" size={16} />
              Написать администратору
            </a>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-6 mt-8 md:mt-12">
            {[
              { price: "1 000 ₽", oldPrice: "2 200 ₽", label: "пробная в группе", href: "https://t.me/verve_pilates?text=Здравствуйте!🤎%20Хочу%20забрать%20подарок%20и%20записаться%20на%20групповую%20тренировку%20за%201000р" },
              { price: "1 500 ₽", oldPrice: "3 300 ₽", label: "пробная индивидуальная", href: "https://t.me/verve_pilates?text=Здравствуйте!🤎%20Хочу%20забрать%20подарок%20и%20записаться%20на%20индивидуальную%20тренировку%20за%201500р" },
            ].map(({ price, oldPrice, label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 md:p-6 card-hover block rounded-xl"
                style={{ background: "var(--verve-dark-3)", border: "1px solid rgba(184,92,69,0.15)", textDecoration: "none" }}
              >
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="font-display text-xl md:text-3xl font-light" style={{ color: "var(--verve-gold)" }}>{price}</span>
                  <span className="font-body text-sm" style={{ textDecoration: "line-through", color: "var(--verve-muted)", opacity: 0.6 }}>{oldPrice}</span>
                </div>
                <p className="font-body text-xs tracking-wider uppercase" style={{ color: "var(--verve-muted)" }}>{label}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACTS */}
      <section id="contacts" className="py-16 md:py-28 px-4 md:px-6" style={{ background: "var(--verve-dark-2)" }}>
        <div className="max-w-7xl mx-auto">
          <div className="reveal-section mb-10 md:mb-16">
            <p className="font-body text-xs tracking-[0.4em] uppercase mb-5" style={{ color: "var(--verve-gold)" }}>Контакты</p>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light leading-tight">
              Найдите нас<br /><em className="italic" style={{ color: "var(--verve-gold)" }}>в центре</em> Рязани
            </h2>
          </div>
          {/* Social links */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 reveal-section">
            {[
              { icon: "Phone", label: "Позвонить", href: "tel:+79209734563" },
              { icon: "MessageCircle", label: "Telegram запись", href: "https://t.me/verve_pilates?text=Здравствуйте!🤎%20Хочу%20записаться%20на%20тренировку" },
              { icon: "Send", label: "Telegram канал", href: "https://t.me/vervepilates_rzn" },
              { icon: "Smartphone", label: "Приложение", href: "https://apps.apple.com/ru/app/verve-пилатес-на-реформерах/id6758667943" },
            ].map((s) => (
              <a
                key={s.label}
                href={s.href}
                target={s.href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="card-hover flex items-center gap-3 p-3 sm:p-4 rounded-xl"
                style={{ background: "var(--verve-dark-3)", border: "1px solid rgba(184,92,69,0.12)", textDecoration: "none" }}
              >
                <div className="shrink-0" style={{ color: "var(--verve-gold)" }}><Icon name={s.icon} size={18} fallback="Link" /></div>
                <span className="font-body text-sm" style={{ color: "var(--verve-cream)" }}>{s.label}</span>
              </a>
            ))}
          </div>

          {/* Map placeholder */}
          <div
            className="mt-6 rounded-sm overflow-hidden reveal-section relative"
            style={{ height: "280px", background: "var(--verve-dark-3)", border: "1px solid rgba(184,92,69,0.12)" }}
          >
            <div
              className="absolute inset-0 opacity-5 pointer-events-none"
              style={{ backgroundImage: `repeating-linear-gradient(0deg, rgba(184,92,69,0.4) 0px, transparent 1px, transparent 40px), repeating-linear-gradient(90deg, rgba(184,92,69,0.4) 0px, transparent 1px, transparent 40px)` }}
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
              <div style={{ color: "var(--verve-gold)" }}><Icon name="MapPin" size={32} fallback="MapPin" /></div>
              <p className="font-display text-lg sm:text-2xl italic text-center px-4" style={{ color: "var(--verve-gold)" }}>Краснорядская 3, Рязань</p>
              <p className="font-body text-xs tracking-wider" style={{ color: "var(--verve-muted)" }}>VERVE Pilates Studio</p>
              <a
                href="https://yandex.ru/maps/org/verve_pilates_na_reformerakh/187842926696?si=5zgz4thw8gwzwkfm37cq6k4fmc"
                target="_blank"
                rel="noopener noreferrer"
                className="verve-btn-outline mt-2 text-xs"
                style={{ textDecoration: "none", padding: "8px 20px", position: "relative", zIndex: 1 }}
              >
                Открыть на карте
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-8 md:py-10 px-4 md:px-6" style={{ borderTop: "1px solid rgba(184,92,69,0.2)", background: "var(--verve-dark)" }}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6 text-center md:text-left">
          <div>
            <span className="font-display text-2xl tracking-[0.3em] font-light block mb-1" style={{ color: "var(--verve-gold)" }}>VERVE</span>
            <p className="font-body text-xs" style={{ color: "var(--verve-muted)" }}>Pilates Reformer Studio · Рязань</p>
          </div>
          <p className="font-body text-xs" style={{ color: "var(--verve-muted)" }}>© 2026 VERVE · Краснорядская 3 · 9:00–21:00</p>
          <div className="flex gap-4">
            <a href="https://t.me/verve_pilates?text=Здравствуйте!🤎%20Хочу%20записаться%20на%20тренировку" target="_blank" rel="noopener noreferrer" className="card-hover p-2 rounded-lg" style={{ background: "var(--verve-dark-3)", color: "var(--verve-gold)" }}>
              <Icon name="MessageCircle" size={18} />
            </a>
            <a href="https://t.me/vervepilates_rzn" target="_blank" rel="noopener noreferrer" className="card-hover p-2 rounded-lg" style={{ background: "var(--verve-dark-3)", color: "var(--verve-gold)" }}>
              <Icon name="Send" size={18} />
            </a>
            <a href="https://vk.com/vervepilates" target="_blank" rel="noopener noreferrer" className="card-hover p-2 rounded-lg" style={{ background: "var(--verve-dark-3)", color: "var(--verve-gold)" }}>
              <Icon name="Users" size={18} />
            </a>
            <a href="tel:+79209734563" className="card-hover p-2 rounded-lg" style={{ background: "var(--verve-dark-3)", color: "var(--verve-gold)" }}>
              <Icon name="Phone" size={18} />
            </a>
          </div>
        </div>
      </footer>

      {/* BUY MODAL */}
      {buyModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center px-4"
          style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(6px)" }}
          onClick={() => { setBuyModal(false); setBuyDone(false); setBuyForm({ name: "", phone: "" }); }}
        >
          <div
            className="w-full max-w-md rounded-2xl p-8 relative"
            style={{ background: "var(--verve-dark)" }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => { setBuyModal(false); setBuyDone(false); setBuyForm({ name: "", phone: "" }); }}
              className="absolute top-4 right-4 flex items-center justify-center rounded-full"
              style={{ width: 32, height: 32, background: "rgba(0,0,0,0.08)", color: "var(--verve-cream)" }}
            >
              <Icon name="X" size={16} />
            </button>

            {buyDone ? (
              <div className="text-center py-6">
                <div className="mb-4" style={{ color: "var(--verve-gold)" }}><Icon name="CheckCircle" size={48} fallback="Check" /></div>
                <h3 className="font-display text-2xl font-light mb-2" style={{ color: "var(--verve-cream)" }}>Заявка отправлена!</h3>
                <p className="font-body text-sm" style={{ color: "var(--verve-muted)" }}>Мы свяжемся с вами в ближайшее время</p>
              </div>
            ) : (
              <>
                <p className="font-body text-xs tracking-[0.3em] uppercase mb-2" style={{ color: "var(--verve-gold)" }}>Абонемент</p>
                <h3 className="font-display text-2xl md:text-3xl font-light mb-6" style={{ color: "var(--verve-cream)" }}>Оставьте контакт — мы всё расскажем</h3>
                <div className="flex flex-col gap-3">
                  <input
                    type="text"
                    placeholder="Ваше имя"
                    value={buyForm.name}
                    onChange={(e) => setBuyForm((f) => ({ ...f, name: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl font-body text-sm outline-none"
                    style={{ background: "var(--verve-dark-2)", border: "1px solid rgba(184,92,69,0.2)", color: "var(--verve-cream)" }}
                  />
                  <input
                    type="tel"
                    placeholder="Номер телефона"
                    value={buyForm.phone}
                    onChange={(e) => setBuyForm((f) => ({ ...f, phone: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl font-body text-sm outline-none"
                    style={{ background: "var(--verve-dark-2)", border: "1px solid rgba(184,92,69,0.2)", color: "var(--verve-cream)" }}
                  />
                  <button
                    className="verve-btn-primary w-full rounded-xl mt-2"
                    disabled={!buyForm.name || !buyForm.phone}
                    onClick={() => {
                      if (!buyForm.name || !buyForm.phone) return;
                      const text = encodeURIComponent(`🤎 Заявка на абонемент\nИмя: ${buyForm.name}\nТелефон: ${buyForm.phone}`);
                      window.open(`https://t.me/verve_pilates?text=${text}`, "_blank");
                      setBuyDone(true);
                    }}
                    style={{ opacity: !buyForm.name || !buyForm.phone ? 0.5 : 1 }}
                  >
                    Отправить заявку
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}