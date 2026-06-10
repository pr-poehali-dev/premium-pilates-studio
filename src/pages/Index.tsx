import { useEffect, useState } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMAGE = "https://cdn.poehali.dev/projects/9556b583-e694-4699-9529-1e9cde5e7cbf/files/e278b234-6137-4ccf-98ca-9ddfe4cbb473.jpg";

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
  { icon: "MapPin", title: "Центр Рязани", desc: "Студия находится на площади Ленина — в самом сердце города" },
  { icon: "Smartphone", title: "Онлайн-запись", desc: "Своё приложение для удобного бронирования тренировок" },
];

const TRAININGS = [
  {
    type: "Мини-группа",
    subtitle: "до 4 человек",
    price: "от 1 000 ₽",
    priceLabel: "пробная",
    features: ["Индивидуальный подход", "Атмосфера поддержки", "Общая мотивация", "Записаться через приложение"],
    accent: false,
  },
  {
    type: "Индивидуально",
    subtitle: "только вы и тренер",
    price: "от 1 500 ₽",
    priceLabel: "пробная",
    features: ["100% фокус на вас", "Персональная программа", "Быстрый прогресс", "Гибкое расписание"],
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
  { name: "Анна", spec: "Реабилитационный пилатес", exp: "6 лет опыта", cert: "BASI Pilates certified" },
  { name: "Мария", spec: "Пилатес и йога-терапия", exp: "4 года опыта", cert: "Stott Pilates certified" },
  { name: "Елена", spec: "Спортивный пилатес", exp: "5 лет опыта", cert: "Peak Pilates certified" },
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
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
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

  return (
    <div className="min-h-screen" style={{ background: "var(--verve-dark)", color: "var(--verve-cream)" }}>
      {/* NAV */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          background: scrolled ? "rgba(15,13,10,0.95)" : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(201,169,110,0.15)" : "none",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
          <button
            className="font-display text-2xl tracking-[0.3em] font-light"
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
            style={{ background: "rgba(15,13,10,0.98)", borderBottom: "1px solid rgba(201,169,110,0.15)" }}
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
          style={{ background: "linear-gradient(to bottom, rgba(15,13,10,0.3) 0%, rgba(15,13,10,0.6) 50%, rgba(15,13,10,0.95) 100%)" }}
        />
        <div
          className="absolute inset-0 opacity-20"
          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E")` }}
        />

        <div className="relative max-w-7xl mx-auto px-6 w-full">
          <p className="font-body text-xs tracking-[0.4em] uppercase mb-6 animate-fade-up" style={{ color: "var(--verve-gold)", animationDelay: "0.1s", opacity: 0, animationFillMode: "forwards" }}>
            Студия пилатеса на реформерах · Рязань
          </p>
          <h1
            className="font-display font-light leading-[0.92] mb-8 animate-fade-up"
            style={{ fontSize: "clamp(3.5rem, 12vw, 9rem)", color: "var(--verve-cream)", animationDelay: "0.25s", opacity: 0, animationFillMode: "forwards" }}
          >
            Движение<br />
            <em className="italic" style={{ color: "var(--verve-gold)" }}>рождает</em><br />
            силу
          </h1>
          <p
            className="font-body font-light text-lg mb-10 max-w-lg leading-relaxed animate-fade-up"
            style={{ color: "rgba(240,232,220,0.65)", animationDelay: "0.4s", opacity: 0, animationFillMode: "forwards" }}
          >
            Премиальная студия в центре Рязани. Восстановление осанки и глубокого кора через работу на реформере.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 animate-fade-up" style={{ animationDelay: "0.55s", opacity: 0, animationFillMode: "forwards" }}>
            <button className="verve-btn-primary" onClick={() => scrollTo("#booking")}>Пробная тренировка</button>
            <button className="verve-btn-outline" onClick={() => scrollTo("#about")}>Узнать больше</button>
          </div>

          <div className="mt-16 flex gap-10 animate-fade-up" style={{ animationDelay: "0.7s", opacity: 0, animationFillMode: "forwards" }}>
            {[["пл. Ленина", "Рязань"], ["4", "человека макс."], ["100%", "сертифицировано"]].map(([val, label]) => (
              <div key={label}>
                <div className="font-display text-2xl font-light" style={{ color: "var(--verve-gold)" }}>{val}</div>
                <div className="font-body text-xs tracking-wider uppercase mt-1" style={{ color: "var(--verve-muted)" }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <div className="py-5 overflow-hidden border-y" style={{ borderColor: "rgba(201,169,110,0.2)" }}>
        <div className="marquee-track">
          {MARQUEE_ITEMS.map((item, i) => (
            <span key={i} className="font-display text-lg font-light italic mx-8" style={{ color: "var(--verve-gold)", opacity: 0.5 }}>
              {item} <span className="not-italic mx-4" style={{ color: "var(--verve-gold)", opacity: 0.3 }}>·</span>
            </span>
          ))}
        </div>
      </div>

      {/* ABOUT */}
      <section id="about" className="py-28 px-6" style={{ background: "var(--verve-dark-2)" }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="reveal-section">
              <p className="font-body text-xs tracking-[0.4em] uppercase mb-5" style={{ color: "var(--verve-gold)" }}>О студии</p>
              <h2 className="font-display text-5xl md:text-6xl font-light leading-tight mb-8">
                Место, где тело<br /><em className="italic" style={{ color: "var(--verve-gold)" }}>обретает</em> баланс
              </h2>
              <div className="gold-line mb-8" />
              <p className="font-body font-light leading-relaxed mb-6" style={{ color: "rgba(240,232,220,0.65)", fontSize: "1.05rem" }}>
                VERVE — это не просто спортзал. Это пространство осознанного движения в самом центре Рязани, на площади Ленина. Мы создали студию, где каждая деталь работает на ваше тело и ваш комфорт.
              </p>
              <p className="font-body font-light leading-relaxed" style={{ color: "rgba(240,232,220,0.65)", fontSize: "1.05rem" }}>
                Пилатес на реформерах — это не модный тренд, а научно обоснованный метод работы с телом. Мы используем оборудование студийного класса и подходы ведущих мировых школ пилатеса.
              </p>
            </div>
            <div className="reveal-section grid grid-cols-2 gap-4">
              {BENEFITS.map((b) => (
                <div key={b.title} className="card-hover p-5 rounded-sm" style={{ background: "var(--verve-dark-3)", border: "1px solid rgba(201,169,110,0.1)" }}>
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
      <section id="reformer" className="py-28 px-6" style={{ background: "var(--verve-dark)" }}>
        <div className="max-w-7xl mx-auto">
          <div className="reveal-section text-center mb-16">
            <p className="font-body text-xs tracking-[0.4em] uppercase mb-5" style={{ color: "var(--verve-gold)" }}>Пилатес на реформерах</p>
            <h2 className="font-display text-5xl md:text-6xl font-light leading-tight">
              С чем работает<br /><em className="italic" style={{ color: "var(--verve-gold)" }}>реформер</em>
            </h2>
          </div>
          <div className="gold-line mb-16 reveal-section" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px reveal-section" style={{ background: "rgba(201,169,110,0.15)" }}>
            {REFORMER_WORKS.map((item) => (
              <div
                key={item.title}
                className="group flex flex-col items-center justify-center py-10 px-4 text-center transition-all duration-300"
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
      <section id="training" className="py-28 px-6" style={{ background: "var(--verve-dark-2)" }}>
        <div className="max-w-7xl mx-auto">
          <div className="reveal-section mb-16">
            <p className="font-body text-xs tracking-[0.4em] uppercase mb-5" style={{ color: "var(--verve-gold)" }}>Форматы тренировок</p>
            <h2 className="font-display text-5xl md:text-6xl font-light leading-tight">
              Выберите свой<br /><em className="italic" style={{ color: "var(--verve-gold)" }}>формат</em>
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6 reveal-section">
            {TRAININGS.map((t) => (
              <div
                key={t.type}
                className="relative p-8 md:p-10 rounded-sm overflow-hidden card-hover"
                style={{
                  background: t.accent ? "transparent" : "var(--verve-dark-3)",
                  border: t.accent ? "1px solid var(--verve-gold)" : "1px solid rgba(201,169,110,0.15)",
                  boxShadow: t.accent ? "inset 0 0 80px rgba(201,169,110,0.04)" : "none",
                }}
              >
                {t.accent && (
                  <div className="absolute top-5 right-5 font-body text-xs tracking-widest uppercase px-3 py-1" style={{ background: "var(--verve-gold)", color: "var(--verve-dark)" }}>
                    Популярно
                  </div>
                )}
                <p className="font-body text-xs tracking-[0.3em] uppercase mb-3" style={{ color: "var(--verve-gold)" }}>{t.subtitle}</p>
                <h3 className="font-display text-4xl font-light mb-6" style={{ color: "var(--verve-cream)" }}>{t.type}</h3>
                <div className="gold-line mb-6" />
                <div className="mb-8">
                  <span className="font-display text-3xl font-light" style={{ color: "var(--verve-gold)" }}>{t.price}</span>
                  <span className="font-body text-xs ml-2" style={{ color: "var(--verve-muted)" }}>/ {t.priceLabel}</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {t.features.map((f) => (
                    <li key={f} className="flex items-center gap-3 font-body text-sm" style={{ color: "rgba(240,232,220,0.7)" }}>
                      <span style={{ color: "var(--verve-gold)" }}>—</span> {f}
                    </li>
                  ))}
                </ul>
                <button className={t.accent ? "verve-btn-primary w-full" : "verve-btn-outline w-full"} onClick={() => scrollTo("#booking")}>
                  Записаться на пробную
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TRAINERS */}
      <section id="trainers" className="py-28 px-6" style={{ background: "var(--verve-dark)" }}>
        <div className="max-w-7xl mx-auto">
          <div className="reveal-section text-center mb-16">
            <p className="font-body text-xs tracking-[0.4em] uppercase mb-5" style={{ color: "var(--verve-gold)" }}>Наша команда</p>
            <h2 className="font-display text-5xl md:text-6xl font-light leading-tight">
              Сертифицированные<br /><em className="italic" style={{ color: "var(--verve-gold)" }}>тренеры</em>
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6 reveal-section">
            {TRAINERS.map((tr) => (
              <div key={tr.name} className="card-hover p-8 rounded-sm text-center" style={{ background: "var(--verve-dark-3)", border: "1px solid rgba(201,169,110,0.1)" }}>
                <div className="w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center font-display text-3xl font-light" style={{ background: "rgba(201,169,110,0.1)", border: "1px solid rgba(201,169,110,0.3)", color: "var(--verve-gold)" }}>
                  {tr.name[0]}
                </div>
                <h3 className="font-display text-3xl font-light mb-2" style={{ color: "var(--verve-cream)" }}>{tr.name}</h3>
                <p className="font-body text-sm mb-1" style={{ color: "var(--verve-gold)" }}>{tr.spec}</p>
                <p className="font-body text-xs mb-4" style={{ color: "var(--verve-muted)" }}>{tr.exp}</p>
                <div className="gold-line mb-4" />
                <p className="font-body text-xs tracking-wider" style={{ color: "var(--verve-muted)" }}>{tr.cert}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ATMOSPHERE */}
      <section id="atmosphere" className="py-28 px-6" style={{ background: "var(--verve-dark-2)" }}>
        <div className="max-w-7xl mx-auto">
          <div className="reveal-section mb-16">
            <p className="font-body text-xs tracking-[0.4em] uppercase mb-5" style={{ color: "var(--verve-gold)" }}>Атмосфера</p>
            <h2 className="font-display text-5xl md:text-6xl font-light leading-tight">
              Эстетика<br /><em className="italic" style={{ color: "var(--verve-gold)" }}>в деталях</em>
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 reveal-section">
            <div className="col-span-2 rounded-sm relative overflow-hidden" style={{ minHeight: "320px", border: "1px solid rgba(201,169,110,0.1)" }}>
              <img src={HERO_IMAGE} alt="Студия VERVE" className="w-full h-full object-cover" style={{ minHeight: "320px" }} />
              <div className="absolute inset-0 flex items-end p-6" style={{ background: "linear-gradient(to top, rgba(15,13,10,0.8) 0%, transparent 60%)" }}>
                <p className="font-display text-xl italic" style={{ color: "var(--verve-gold)" }}>Студия на реформерах</p>
              </div>
            </div>
            {[
              { icon: "Layers", title: "Профессиональное оборудование", desc: "Реформеры студийного класса ведущих брендов" },
              { icon: "Sun", title: "Продуманное освещение", desc: "Свет создаёт правильное настроение для практики" },
              { icon: "Music", title: "Атмосферный звук", desc: "Плейлисты специально подобраны под темп тренировок" },
              { icon: "Droplets", title: "Комфорт после тренировки", desc: "Душевые, полотенца, натуральный чай" },
            ].map((card) => (
              <div key={card.title} className="card-hover p-6 rounded-sm" style={{ background: "var(--verve-dark-3)", border: "1px solid rgba(201,169,110,0.1)" }}>
                <div className="mb-3" style={{ color: "var(--verve-gold)" }}><Icon name={card.icon} size={20} fallback="Star" /></div>
                <h4 className="font-body font-medium text-sm mb-2" style={{ color: "var(--verve-cream)" }}>{card.title}</h4>
                <p className="font-body text-xs leading-relaxed" style={{ color: "var(--verve-muted)" }}>{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section id="reviews" className="py-28 px-6" style={{ background: "var(--verve-dark)" }}>
        <div className="max-w-7xl mx-auto">
          <div className="reveal-section text-center mb-16">
            <p className="font-body text-xs tracking-[0.4em] uppercase mb-5" style={{ color: "var(--verve-gold)" }}>Отзывы</p>
            <h2 className="font-display text-5xl md:text-6xl font-light leading-tight">
              Говорят наши<br /><em className="italic" style={{ color: "var(--verve-gold)" }}>клиенты</em>
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6 reveal-section">
            {REVIEWS.map((r) => (
              <div key={r.name} className="card-hover p-7 rounded-sm" style={{ background: "var(--verve-dark-3)", border: "1px solid rgba(201,169,110,0.1)" }}>
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: r.rate }).map((_, i) => (
                    <span key={i} style={{ color: "var(--verve-gold)" }}>★</span>
                  ))}
                </div>
                <p className="font-body font-light leading-relaxed mb-5" style={{ color: "rgba(240,232,220,0.75)", fontSize: "0.95rem" }}>«{r.text}»</p>
                <div className="gold-line mb-4" />
                <p className="font-body text-sm font-medium" style={{ color: "var(--verve-gold)" }}>{r.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BOOKING */}
      <section id="booking" className="py-28 px-6" style={{ background: "var(--verve-dark-2)" }}>
        <div className="max-w-3xl mx-auto text-center reveal-section">
          <p className="font-body text-xs tracking-[0.4em] uppercase mb-5" style={{ color: "var(--verve-gold)" }}>Запись</p>
          <h2 className="font-display font-light leading-tight mb-6" style={{ fontSize: "clamp(2.5rem, 8vw, 5rem)" }}>
            Начни своё<br /><em className="italic" style={{ color: "var(--verve-gold)" }}>движение</em>
          </h2>
          <p className="font-body font-light text-lg mb-10 leading-relaxed" style={{ color: "rgba(240,232,220,0.6)" }}>
            Запись через наше приложение или позвоните нам напрямую. Первая тренировка — специальная цена.
          </p>
          <div className="gold-line mb-10" />
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
            <button className="verve-btn-primary flex items-center justify-center gap-3">
              <Icon name="Smartphone" size={16} />
              Скачать приложение
            </button>
            <a href="tel:+7" className="verve-btn-outline flex items-center justify-center gap-3" style={{ textDecoration: "none" }}>
              <Icon name="Phone" size={16} />
              Позвонить нам
            </a>
          </div>
          <div className="grid grid-cols-2 gap-6 mt-12">
            {[["1 000 ₽", "пробная в группе"], ["1 500 ₽", "пробная индивидуальная"]].map(([price, label]) => (
              <div key={label} className="p-6 rounded-sm" style={{ background: "var(--verve-dark-3)", border: "1px solid rgba(201,169,110,0.15)" }}>
                <div className="font-display text-3xl font-light mb-1" style={{ color: "var(--verve-gold)" }}>{price}</div>
                <p className="font-body text-xs tracking-wider uppercase" style={{ color: "var(--verve-muted)" }}>{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACTS */}
      <section id="contacts" className="py-28 px-6" style={{ background: "var(--verve-dark)" }}>
        <div className="max-w-7xl mx-auto">
          <div className="reveal-section mb-16">
            <p className="font-body text-xs tracking-[0.4em] uppercase mb-5" style={{ color: "var(--verve-gold)" }}>Контакты</p>
            <h2 className="font-display text-5xl md:text-6xl font-light leading-tight">
              Найдите нас<br /><em className="italic" style={{ color: "var(--verve-gold)" }}>в центре</em> Рязани
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6 reveal-section">
            {[
              { icon: "MapPin", title: "Адрес", lines: ["пл. Ленина", "Рязань, центр"] },
              { icon: "Clock", title: "Режим работы", lines: ["Пн–Пт: 7:00–22:00", "Сб–Вс: 9:00–20:00"] },
              { icon: "Phone", title: "Связь", lines: ["Телефон", "Приложение VERVE"] },
            ].map((c) => (
              <div key={c.title} className="card-hover p-8 rounded-sm" style={{ background: "var(--verve-dark-3)", border: "1px solid rgba(201,169,110,0.1)" }}>
                <div className="mb-4" style={{ color: "var(--verve-gold)" }}><Icon name={c.icon} size={22} fallback="MapPin" /></div>
                <h4 className="font-body font-medium text-sm mb-3" style={{ color: "var(--verve-gold)" }}>{c.title}</h4>
                {c.lines.map((line) => (
                  <p key={line} className="font-body font-light text-sm" style={{ color: "rgba(240,232,220,0.7)" }}>{line}</p>
                ))}
              </div>
            ))}
          </div>
          <div
            className="mt-6 rounded-sm overflow-hidden reveal-section relative"
            style={{ height: "280px", background: "var(--verve-dark-3)", border: "1px solid rgba(201,169,110,0.1)" }}
          >
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
              <div style={{ color: "var(--verve-gold)" }}><Icon name="MapPin" size={32} fallback="MapPin" /></div>
              <p className="font-display text-2xl italic" style={{ color: "var(--verve-gold)" }}>пл. Ленина, Рязань</p>
              <p className="font-body text-xs tracking-wider" style={{ color: "var(--verve-muted)" }}>VERVE Pilates Studio</p>
            </div>
            <div
              className="absolute inset-0 opacity-5"
              style={{ backgroundImage: `repeating-linear-gradient(0deg, rgba(201,169,110,0.4) 0px, transparent 1px, transparent 40px), repeating-linear-gradient(90deg, rgba(201,169,110,0.4) 0px, transparent 1px, transparent 40px)` }}
            />
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-10 px-6" style={{ borderTop: "1px solid rgba(201,169,110,0.15)", background: "var(--verve-dark)" }}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="font-display text-2xl tracking-[0.3em] font-light" style={{ color: "var(--verve-gold)" }}>VERVE</span>
          <p className="font-body text-xs" style={{ color: "var(--verve-muted)" }}>© 2024 VERVE Pilates Studio · Рязань, пл. Ленина</p>
          <div className="flex gap-6 flex-wrap justify-center">
            {NAV_LINKS.slice(0, 4).map((l) => (
              <button key={l.href} className="nav-link text-xs" onClick={() => scrollTo(l.href)}>{l.label}</button>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
