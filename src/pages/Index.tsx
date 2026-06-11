import { useEffect, useState } from "react";
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
  { icon: "Smartphone", title: "Онлайн-запись", desc: "Своё приложение для удобного бронирования тренировок" },
];

const TRAININGS = [
  {
    type: "Мини-группа",
    subtitle: "до 4 человек",
    price: "1 000 ₽",
    priceLabel: "первое занятие",
    badge: "Для новичков",
    features: ["Индивидуальный подход", "Атмосфера поддержки", "Общая мотивация", "Далее от 1 730 ₽"],
    accent: false,
  },
  {
    type: "Индивидуально",
    subtitle: "только вы и тренер",
    price: "1 500 ₽",
    priceLabel: "первое занятие",
    badge: "Для новичков",
    features: ["100% фокус на вас", "Персональная программа", "Быстрый прогресс", "Далее от 2 590 ₽"],
    accent: true,
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
  { name: "Анна", spec: "Пилатес на реформерах", cert: "Сертифицированный тренер", photo: "https://cdn.poehali.dev/projects/9556b583-e694-4699-9529-1e9cde5e7cbf/bucket/3e4e06d1-9279-4204-b339-32c3f71a5c00.jpg" },
  { name: "София", spec: "Пилатес на реформерах", cert: "Сертифицированный тренер", photo: "https://cdn.poehali.dev/projects/9556b583-e694-4699-9529-1e9cde5e7cbf/bucket/d3e0b651-fc0b-499e-a9ee-a1e28adfe61e.jpg" },
  { name: "Валентина", spec: "Пилатес на реформерах", cert: "Сертифицированный тренер", photo: "https://cdn.poehali.dev/projects/9556b583-e694-4699-9529-1e9cde5e7cbf/bucket/a59f91a6-adeb-41f2-9d58-d0f8df85f979.jpg" },
  { name: "Ксения", spec: "Пилатес на реформерах", cert: "Сертифицированный тренер", photo: "https://cdn.poehali.dev/projects/9556b583-e694-4699-9529-1e9cde5e7cbf/bucket/73a01b38-d81a-4b99-9082-1026c056de06.jpg" },
];

const GROUP_PRICES = [
  { name: "Разовое занятие", price: "2 200 ₽", gift: "", perClass: "" },
  { name: "4 занятия", price: "8 800 ₽", gift: "", perClass: "2 200 ₽" },
  { name: "6 занятий", price: "13 200 ₽", gift: "+1", perClass: "1 885 ₽" },
  { name: "9 занятий", price: "19 800 ₽", gift: "+2", perClass: "1 800 ₽" },
  { name: "11 занятий", price: "24 200 ₽", gift: "+3", perClass: "1 730 ₽" },
];

const SOLO_PRICES = [
  { name: "Разовое занятие", price: "3 300 ₽", gift: "", perClass: "" },
  { name: "4 занятия", price: "13 200 ₽", gift: "", perClass: "3 300 ₽" },
  { name: "6 занятий", price: "19 800 ₽", gift: "+1", perClass: "2 830 ₽" },
  { name: "9 занятий", price: "29 700 ₽", gift: "+2", perClass: "2 700 ₽" },
  { name: "11 занятий", price: "36 300 ₽", gift: "+3", perClass: "2 590 ₽" },
];

const REVIEWS = [
  { name: "Екатерина", text: "Занимаюсь 3 месяца — спина болеть перестала совсем. Тренер объясняет каждое движение, следит за техникой. Студия красивая, атмосфера невероятная.", rate: 5 },
  { name: "Наталья", text: "Пришла после травмы позвоночника. Уже после 10 занятий почувствовала разницу. Очень бережный подход, никаких резких движений.", rate: 5 },
  { name: "Ирина", text: "Самая эстетичная студия в Рязани. Реформеры, свет, музыка — всё на уровне. Тренеры — профессионалы высшего класса.", rate: 5 },
  { name: "Светлана", text: "Долго искала что-то для осанки. VERVE — находка. Мини-группа создаёт особую атмосферу, чувствуешь поддержку.", rate: 5 },
];

const MARQUEE_ITEMS = [
  "REFORMER PILATES", "POSTURE RECOVERY", "MUSCLE CORE", "MINI GROUPS", "PREMIUM STUDIO", "CERTIFIED TRAINERS",
  "REFORMER PILATES", "POSTURE RECOVERY", "MUSCLE CORE", "MINI GROUPS", "PREMIUM STUDIO", "CERTIFIED TRAINERS",
];

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

          <button className="hidden md:block verve-btn-primary" onClick={() => scrollTo("#booking")}>
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
              <button className="verve-btn-primary mt-2" onClick={() => scrollTo("#booking")}>
                Записаться
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* HERO */}
      <section className="relative min-h-screen flex items-end pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${HERO_IMAGE})` }} />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to bottom, rgba(15,13,10,0.15) 0%, rgba(15,13,10,0.5) 55%, rgba(15,13,10,0.88) 100%)" }}
        />

        <div className="relative max-w-7xl mx-auto px-6 w-full">
          <p className="font-body text-xs tracking-[0.4em] uppercase mb-6 animate-fade-up" style={{ color: "var(--verve-gold)", animationDelay: "0.1s", opacity: 0, animationFillMode: "forwards" }}>
            Студия пилатеса на реформерах · Рязань
          </p>
          <h1
            className="font-display font-light leading-[0.92] mb-8 animate-fade-up"
            style={{ fontSize: "clamp(2.8rem, 11vw, 9rem)", color: "#fff", animationDelay: "0.25s", opacity: 0, animationFillMode: "forwards" }}
          >
            Движение<br />
            <em className="italic" style={{ color: "var(--verve-gold)" }}>рождает</em><br />
            силу
          </h1>
          <p
            className="font-body font-light text-base md:text-lg mb-10 max-w-lg leading-relaxed animate-fade-up"
            style={{ color: "rgba(255,255,255,0.8)", animationDelay: "0.4s", opacity: 0, animationFillMode: "forwards" }}
          >
            Премиальная студия в центре Рязани. Восстановление осанки и глубокого кора через работу на реформере.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 animate-fade-up" style={{ animationDelay: "0.55s", opacity: 0, animationFillMode: "forwards" }}>
            <a href="https://apps.apple.com/ru/app/verve-пилатес-на-реформерах/id6758667943" target="_blank" rel="noopener noreferrer" className="verve-btn-primary flex items-center justify-center gap-3" style={{ textDecoration: "none" }}>
              <Icon name="Smartphone" size={16} />
              Записаться онлайн
            </a>
            <a href="https://t.me/verve_pilates" target="_blank" rel="noopener noreferrer" className="verve-btn-outline flex items-center justify-center gap-3" style={{ textDecoration: "none", color: "#fff", borderColor: "#fff" }}>
              <Icon name="MessageCircle" size={16} />
              Написать в Telegram
            </a>
          </div>

          <div className="mt-10 md:mt-16 flex gap-5 md:gap-10 animate-fade-up" style={{ animationDelay: "0.7s", opacity: 0, animationFillMode: "forwards" }}>
            {[["Краснорядская 3", "Рязань"], ["мини-группы", "до 4х человек"], ["индивидуальные", "тренировки"]].map(([val, label]) => (
              <div key={label}>
                <div className="font-display text-lg md:text-2xl font-light" style={{ color: "var(--verve-gold)" }}>{val}</div>
                <div className="font-body text-xs tracking-wider uppercase mt-1" style={{ color: "rgba(255,255,255,0.6)" }}>{label}</div>
              </div>
            ))}
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

      {/* ABOUT */}
      <section id="about" className="py-16 md:py-28 px-4 md:px-6" style={{ background: "var(--verve-dark-2)" }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
            <div className="reveal-section">
              <p className="font-body text-xs tracking-[0.4em] uppercase mb-5" style={{ color: "var(--verve-gold)" }}>О студии</p>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light leading-tight mb-8">
                Место, где тело<br /><em className="italic" style={{ color: "var(--verve-gold)" }}>обретает</em> баланс
              </h2>
              <div className="gold-line mb-8" />
              <p className="font-body font-light leading-relaxed mb-6" style={{ color: "rgba(28,20,16,0.65)", fontSize: "1.05rem" }}>
                VERVE — это не просто спортзал. Это пространство осознанного движения в самом центре Рязани, на Краснорядской 3. Мы создали студию, где каждая деталь работает на ваше тело и ваш комфорт.
              </p>
              <p className="font-body font-light leading-relaxed" style={{ color: "rgba(28,20,16,0.65)", fontSize: "1.05rem" }}>
                Пилатес на реформерах — это научно обоснованный метод работы с телом. Мы используем оборудование студийного класса и работаем без выходных с 9 до 21.
              </p>
            </div>
            <div className="reveal-section grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
              {BENEFITS.map((b) => (
                <div key={b.title} className="card-hover p-4 md:p-5 rounded-sm" style={{ background: "var(--verve-dark-3)", border: "1px solid rgba(184,92,69,0.12)" }}>
                  <div className="mb-3" style={{ color: "var(--verve-gold)" }}><Icon name={b.icon} size={20} fallback="Star" /></div>
                  <h4 className="font-body font-medium text-sm mb-2" style={{ color: "var(--verve-cream)" }}>{b.title}</h4>
                  <p className="font-body text-xs leading-relaxed" style={{ color: "var(--verve-muted)" }}>{b.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

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
                className="flex flex-col items-center justify-center py-7 md:py-10 px-3 md:px-4 text-center transition-all duration-300"
                style={{ background: "var(--verve-dark)" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "var(--verve-dark-3)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "var(--verve-dark)"; }}
              >
                <div className="mb-4" style={{ color: "var(--verve-gold)" }}><Icon name={item.icon} size={24} fallback="Circle" /></div>
                <span className="font-body text-sm font-medium" style={{ color: "var(--verve-cream)" }}>{item.title}</span>
              </div>
            ))}
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
                className="relative p-5 sm:p-8 md:p-10 rounded-sm overflow-hidden card-hover"
                style={{
                  background: t.accent ? "transparent" : "var(--verve-dark-3)",
                  border: t.accent ? "1px solid var(--verve-gold)" : "1px solid rgba(184,92,69,0.15)",
                  boxShadow: t.accent ? "inset 0 0 80px rgba(184,92,69,0.05)" : "none",
                }}
              >
                <div className="absolute top-5 right-5 font-body text-xs tracking-widest uppercase px-3 py-1" style={{ background: "var(--verve-gold)", color: "#fff" }}>
                  Впервые у нас
                </div>
                <p className="font-body text-xs tracking-[0.3em] uppercase mb-3" style={{ color: "var(--verve-gold)" }}>{t.subtitle}</p>
                <h3 className="font-display text-2xl sm:text-3xl md:text-4xl font-light mb-4 md:mb-6" style={{ color: "var(--verve-cream)" }}>{t.type}</h3>
                <div className="gold-line mb-6" />
                <div className="mb-2">
                  <span className="font-display text-2xl sm:text-3xl font-light" style={{ color: "var(--verve-gold)" }}>{t.price}</span>
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
                  href="https://t.me/verve_pilates"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={t.accent ? "verve-btn-primary w-full flex items-center justify-center" : "verve-btn-outline w-full flex items-center justify-center"}
                  style={{ textDecoration: "none" }}
                >
                  Записаться
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="py-16 md:py-28 px-4 md:px-6" style={{ background: "var(--verve-dark)" }}>
        <div className="max-w-4xl mx-auto">
          <div className="reveal-section text-center mb-10 md:mb-14">
            <p className="font-body text-xs tracking-[0.4em] uppercase mb-5" style={{ color: "var(--verve-gold)" }}>Абонементы</p>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light leading-tight mb-2">
              Меню<br /><em className="italic" style={{ color: "var(--verve-gold)" }}>восстановления</em>
            </h2>
            <p className="font-body text-sm mt-4" style={{ color: "var(--verve-muted)" }}>При покупке абонемента от 6 занятий — бонусные занятия в подарок</p>
          </div>

          {/* Tab switcher */}
          <div className="reveal-section flex justify-center mb-10">
            <div className="flex rounded-sm overflow-hidden" style={{ border: "1px solid rgba(184,92,69,0.3)" }}>
              <button
                className="font-body text-xs tracking-widest uppercase px-8 py-3 transition-all duration-300"
                style={{
                  background: priceTab === "group" ? "var(--verve-gold)" : "transparent",
                  color: priceTab === "group" ? "#fff" : "var(--verve-gold)",
                }}
                onClick={() => setPriceTab("group")}
              >
                Группа
              </button>
              <button
                className="font-body text-xs tracking-widest uppercase px-8 py-3 transition-all duration-300"
                style={{
                  background: priceTab === "solo" ? "var(--verve-gold)" : "transparent",
                  color: priceTab === "solo" ? "#fff" : "var(--verve-gold)",
                }}
                onClick={() => setPriceTab("solo")}
              >
                Индивидуально
              </button>
            </div>
          </div>

          {/* Price table */}
          <div className="reveal-section rounded-sm overflow-hidden" style={{ border: "1px solid rgba(184,92,69,0.15)" }}>
            {/* Header */}
            <div className="grid grid-cols-3 px-3 md:px-6 py-3" style={{ background: "var(--verve-dark-3)", borderBottom: "1px solid rgba(184,92,69,0.15)" }}>
              <span className="font-body text-xs tracking-widest uppercase" style={{ color: "var(--verve-muted)" }}>Абонемент</span>
              <span className="font-body text-xs tracking-widest uppercase text-center" style={{ color: "var(--verve-muted)" }}>Цена</span>
              <span className="font-body text-xs tracking-widest uppercase text-right" style={{ color: "var(--verve-muted)" }}>За занятие</span>
            </div>
            {prices.map((row, i) => (
              <div
                key={row.name}
                className="grid grid-cols-3 px-3 md:px-6 py-4 md:py-5 items-center transition-all duration-200"
                style={{
                  background: i % 2 === 0 ? "var(--verve-dark)" : "var(--verve-dark-2)",
                  borderBottom: i < prices.length - 1 ? "1px solid rgba(184,92,69,0.08)" : "none",
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "var(--verve-dark-3)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = i % 2 === 0 ? "var(--verve-dark)" : "var(--verve-dark-2)"; }}
              >
                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
                  <span className="font-body text-xs md:text-sm" style={{ color: "var(--verve-cream)" }}>{row.name}</span>
                  {row.gift && (
                    <span className="font-body text-xs px-1.5 py-0.5 rounded-sm w-fit" style={{ background: "rgba(184,92,69,0.15)", color: "var(--verve-gold)" }}>
                      {row.gift} в подарок
                    </span>
                  )}
                </div>
                <span className="font-display text-base md:text-lg font-light text-center" style={{ color: "var(--verve-gold)" }}>{row.price}</span>
                <span className="font-body text-xs md:text-sm text-right" style={{ color: row.perClass ? "var(--verve-muted)" : "transparent" }}>{row.perClass || "—"}</span>
              </div>
            ))}
            {/* Для двоих */}
            <div
              className="px-6 py-5 flex items-center justify-between"
              style={{ background: "var(--verve-dark-3)", borderTop: "1px solid rgba(184,92,69,0.2)" }}
            >
              <div>
                <p className="font-body text-xs tracking-widest uppercase mb-1" style={{ color: "var(--verve-gold)" }}>Для двоих</p>
                <p className="font-body text-sm" style={{ color: "var(--verve-cream)" }}>Сплит занятие</p>
              </div>
              <span className="font-display text-2xl font-light" style={{ color: "var(--verve-gold)" }}>5 000 ₽</span>
            </div>
          </div>

          <div className="mt-8 text-center reveal-section">
            <a
              href="https://apps.apple.com/ru/app/verve-пилатес-на-реформерах/id6758667943"
              target="_blank"
              rel="noopener noreferrer"
              className="verve-btn-primary inline-flex items-center gap-3"
              style={{ textDecoration: "none" }}
            >
              <Icon name="Smartphone" size={16} />
              Купить абонемент в приложении
            </a>
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
              <div key={tr.name} className="card-hover rounded-sm overflow-hidden" style={{ background: "var(--verve-dark-3)", border: "1px solid rgba(184,92,69,0.12)" }}>
                <div className="relative overflow-hidden" style={{ aspectRatio: "3/4" }}>
                  <img
                    src={tr.photo}
                    alt={tr.name}
                    className="w-full h-full object-cover object-top transition-transform duration-500"
                    style={{ transform: "scale(1)" }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLImageElement).style.transform = "scale(1.04)"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLImageElement).style.transform = "scale(1)"; }}
                  />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(15,13,10,0.7) 0%, transparent 50%)" }} />
                  <div className="absolute bottom-0 left-0 right-0 p-2 md:p-4">
                    <h3 className="font-display text-lg md:text-2xl font-light" style={{ color: "#fff" }}>{tr.name}</h3>
                  </div>
                </div>
                <div className="px-2 md:px-4 py-2 md:py-3">
                  <p className="font-body text-xs mb-1 leading-tight" style={{ color: "var(--verve-gold)" }}>{tr.spec}</p>
                  <p className="font-body text-xs tracking-wider leading-tight" style={{ color: "var(--verve-muted)" }}>{tr.cert}</p>
                </div>
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
            <div className="sm:col-span-2 rounded-sm relative overflow-hidden" style={{ minHeight: "240px", border: "1px solid rgba(184,92,69,0.12)" }}>
              <img src={HERO_IMAGE} alt="Студия VERVE" className="w-full h-full object-cover" style={{ minHeight: "320px" }} />
              <div className="absolute inset-0 flex items-end p-6" style={{ background: "linear-gradient(to top, rgba(15,13,10,0.8) 0%, transparent 60%)" }}>
                <p className="font-display text-xl italic" style={{ color: "var(--verve-gold)" }}>Студия на реформерах</p>
              </div>
            </div>
            {[
              { icon: "Layers", title: "Профессиональное оборудование", desc: "Реформеры студийного класса ведущих брендов" },
              { icon: "Sun", title: "Продуманное освещение", desc: "Свет создаёт правильное настроение для практики" },
              { icon: "Music", title: "Атмосферный звук", desc: "Плейлисты специально подобраны под темп тренировок" },
              { icon: "Coffee", title: "Меню напитков", desc: "Капучино, матча, латте и сезонные напитки — в подарок для каждого гостя" },
            ].map((card) => (
              <div key={card.title} className="card-hover p-6 rounded-sm" style={{ background: "var(--verve-dark-3)", border: "1px solid rgba(184,92,69,0.12)" }}>
                <div className="mb-3" style={{ color: "var(--verve-gold)" }}><Icon name={card.icon} size={20} fallback="Star" /></div>
                <h4 className="font-body font-medium text-sm mb-2" style={{ color: "var(--verve-cream)" }}>{card.title}</h4>
                <p className="font-body text-xs leading-relaxed" style={{ color: "var(--verve-muted)" }}>{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section id="reviews" className="py-16 md:py-28 px-4 md:px-6" style={{ background: "var(--verve-dark-2)" }}>
        <div className="max-w-7xl mx-auto">
          <div className="reveal-section text-center mb-10 md:mb-16">
            <p className="font-body text-xs tracking-[0.4em] uppercase mb-5" style={{ color: "var(--verve-gold)" }}>Отзывы</p>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light leading-tight">
              Говорят наши<br /><em className="italic" style={{ color: "var(--verve-gold)" }}>клиенты</em>
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6 reveal-section">
            {REVIEWS.map((r) => (
              <div key={r.name} className="card-hover p-7 rounded-sm" style={{ background: "var(--verve-dark-3)", border: "1px solid rgba(184,92,69,0.12)" }}>
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: r.rate }).map((_, i) => (
                    <span key={i} style={{ color: "var(--verve-gold)" }}>★</span>
                  ))}
                </div>
                <p className="font-body font-light leading-relaxed mb-5" style={{ color: "rgba(28,20,16,0.7)", fontSize: "0.95rem" }}>«{r.text}»</p>
                <div className="gold-line mb-4" />
                <p className="font-body text-sm font-medium" style={{ color: "var(--verve-gold)" }}>{r.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BOOKING */}
      <section id="booking" className="py-16 md:py-28 px-4 md:px-6" style={{ background: "var(--verve-dark)" }}>
        <div className="max-w-3xl mx-auto text-center reveal-section">
          <p className="font-body text-xs tracking-[0.4em] uppercase mb-5" style={{ color: "var(--verve-gold)" }}>Запись</p>
          <h2 className="font-display font-light leading-tight mb-6" style={{ fontSize: "clamp(2.5rem, 8vw, 5rem)" }}>
            Начни своё<br /><em className="italic" style={{ color: "var(--verve-gold)" }}>движение</em>
          </h2>
          <p className="font-body font-light text-lg mb-10 leading-relaxed" style={{ color: "rgba(28,20,16,0.6)" }}>
            Записывайтесь через приложение или напишите администратору в Telegram. Отвечаем быстро.
          </p>
          <div className="gold-line mb-10" />
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
            <a
              href="https://apps.apple.com/ru/app/verve-пилатес-на-реформерах/id6758667943"
              target="_blank"
              rel="noopener noreferrer"
              className="verve-btn-primary flex items-center justify-center gap-3"
              style={{ textDecoration: "none" }}
            >
              <Icon name="Smartphone" size={16} />
              Скачать приложение
            </a>
            <a
              href="https://t.me/verve_pilates"
              target="_blank"
              rel="noopener noreferrer"
              className="verve-btn-outline flex items-center justify-center gap-3"
              style={{ textDecoration: "none" }}
            >
              <Icon name="MessageCircle" size={16} />
              Написать администратору
            </a>
          </div>
          <div className="grid grid-cols-2 gap-4 md:gap-6 mt-10 md:mt-12">
            {[
              { price: "1 000 ₽", label: "пробная в группе", href: "https://t.me/verve_pilates?text=Здравствуйте! Запишите меня на пробную тренировку в мини-группе за 1000р" },
              { price: "1 500 ₽", label: "пробная индивидуальная", href: "https://t.me/verve_pilates?text=Здравствуйте! Запишите меня на индивидуальную тренировку за 1500р" },
            ].map(({ price, label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 md:p-6 rounded-sm card-hover block"
                style={{ background: "var(--verve-dark-3)", border: "1px solid rgba(184,92,69,0.15)", textDecoration: "none" }}
              >
                <div className="font-display text-2xl md:text-3xl font-light mb-1" style={{ color: "var(--verve-gold)" }}>{price}</div>
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
          <div className="grid md:grid-cols-3 gap-6 reveal-section">
            {[
              { icon: "MapPin", title: "Адрес", lines: ["Краснорядская 3", "Рязань"] },
              { icon: "Clock", title: "Режим работы", lines: ["Ежедневно: 9:00–21:00", "Без выходных"] },
              { icon: "Phone", title: "Телефон", lines: ["+7 (920) 973-45-63"] },
            ].map((c) => (
              <div key={c.title} className="card-hover p-8 rounded-sm" style={{ background: "var(--verve-dark-3)", border: "1px solid rgba(184,92,69,0.12)" }}>
                <div className="mb-4" style={{ color: "var(--verve-gold)" }}><Icon name={c.icon} size={22} fallback="MapPin" /></div>
                <h4 className="font-body font-medium text-sm mb-3" style={{ color: "var(--verve-gold)" }}>{c.title}</h4>
                {c.lines.map((line) => (
                  <p key={line} className="font-body font-light text-sm" style={{ color: "rgba(28,20,16,0.7)" }}>{line}</p>
                ))}
              </div>
            ))}
          </div>

          {/* Social links */}
          <div className="mt-4 md:mt-6 grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 reveal-section">
            {[
              { icon: "Phone", label: "Позвонить", href: "tel:+79209734563" },
              { icon: "MessageCircle", label: "Telegram запись", href: "https://t.me/verve_pilates" },
              { icon: "Send", label: "Telegram канал", href: "https://t.me/vervepilates_rzn" },
              { icon: "Smartphone", label: "Приложение", href: "https://apps.apple.com/ru/app/verve-пилатес-на-реформерах/id6758667943" },
            ].map((s) => (
              <a
                key={s.label}
                href={s.href}
                target={s.href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="card-hover flex items-center gap-3 p-4 rounded-sm"
                style={{ background: "var(--verve-dark-3)", border: "1px solid rgba(184,92,69,0.12)", textDecoration: "none" }}
              >
                <div style={{ color: "var(--verve-gold)" }}><Icon name={s.icon} size={18} fallback="Link" /></div>
                <span className="font-body text-sm" style={{ color: "var(--verve-cream)" }}>{s.label}</span>
              </a>
            ))}
          </div>

          {/* Map placeholder */}
          <div
            className="mt-6 rounded-sm overflow-hidden reveal-section relative"
            style={{ height: "280px", background: "var(--verve-dark-3)", border: "1px solid rgba(184,92,69,0.12)" }}
          >
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
              <div style={{ color: "var(--verve-gold)" }}><Icon name="MapPin" size={32} fallback="MapPin" /></div>
              <p className="font-display text-2xl italic" style={{ color: "var(--verve-gold)" }}>Краснорядская 3, Рязань</p>
              <p className="font-body text-xs tracking-wider" style={{ color: "var(--verve-muted)" }}>VERVE Pilates Studio</p>
              <a
                href="https://yandex.ru/maps/?text=Рязань+Краснорядская+3"
                target="_blank"
                rel="noopener noreferrer"
                className="verve-btn-outline mt-2 text-xs"
                style={{ textDecoration: "none", padding: "8px 20px" }}
              >
                Открыть на карте
              </a>
            </div>
            <div
              className="absolute inset-0 opacity-5"
              style={{ backgroundImage: `repeating-linear-gradient(0deg, rgba(184,92,69,0.4) 0px, transparent 1px, transparent 40px), repeating-linear-gradient(90deg, rgba(184,92,69,0.4) 0px, transparent 1px, transparent 40px)` }}
            />
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
          <p className="font-body text-xs" style={{ color: "var(--verve-muted)" }}>© 2024 VERVE · Краснорядская 3 · 9:00–21:00</p>
          <div className="flex gap-4">
            <a href="https://t.me/verve_pilates" target="_blank" rel="noopener noreferrer" className="card-hover p-2 rounded-sm" style={{ background: "var(--verve-dark-3)", color: "var(--verve-gold)" }}>
              <Icon name="MessageCircle" size={18} />
            </a>
            <a href="https://t.me/vervepilates_rzn" target="_blank" rel="noopener noreferrer" className="card-hover p-2 rounded-sm" style={{ background: "var(--verve-dark-3)", color: "var(--verve-gold)" }}>
              <Icon name="Send" size={18} />
            </a>
            <a href="tel:+79209734563" className="card-hover p-2 rounded-sm" style={{ background: "var(--verve-dark-3)", color: "var(--verve-gold)" }}>
              <Icon name="Phone" size={18} />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}