import { useEffect, useState } from "react";
import {
  ABOUT,
  CONTACT,
  DAY,
  GALLERY,
  HERO_PHOTOS,
  MARQUEE_ITEMS,
  PACKAGES,
  photo,
  SITE,
  STATS,
  TESTIMONIALS,
  TESTIMONIALS_HIGHLIGHT,
  WHY_HOME,
} from "../data";
import { cn } from "../utils/cn";
import MemoryGame from "../components/MemoryGame";
import { CtaBand } from "../components/Blocks";
import { ACCENT, Blob, Btn, Chip, CountUp, Reveal, SectionTitle, Tilt, fireConfetti } from "../components/ui";

export default function Home({ go }: { go: (r: string) => void }) {
  const [w, setW] = useState(0);
  const [par, setPar] = useState({ x: 0, y: 0 });
  const [activeDay, setActiveDay] = useState(2);

  useEffect(() => {
    const t = window.setInterval(() => setW((v) => (v + 1) % SITE.hero.length), 2600);
    return () => window.clearInterval(t);
  }, []);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    setPar({ x: (e.clientX - r.left) / r.width - 0.5, y: (e.clientY - r.top) / r.height - 0.5 });
  };

  return (
    <>
      {/* ---------------- HERO ---------------- */}
      <section onMouseMove={onMove} className="relative overflow-hidden pt-8 pb-16 lg:pt-12">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-sun/20 via-cream to-cream" />
        <div className="absolute inset-0 -z-10 grid-bg opacity-70" />
        <Blob className="-top-24 -left-24 h-72 w-72 bg-leaf/20" accent="leaf" />
        <Blob className="top-24 right-0 h-72 w-72 bg-sky/25" accent="sky" />

        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <Reveal>
              <div className="flex flex-wrap items-center gap-2">
                <Chip accent="coral">📍 Petlovo brdo, Beograd</Chip>
                <Chip accent="sun">🎒 Male grupe</Chip>
                <Chip accent="leaf">🌲 Akreditovana ustanova</Chip>
              </div>
            </Reveal>

            <Reveal delay={80}>
              <p className="mt-6 font-hand text-2xl text-coral sm:text-3xl">{SITE.heroKicker}</p>
            </Reveal>

            <h1 className="mt-2 font-display text-3xl leading-[1.08] font-extrabold text-forest-deep sm:text-5xl md:text-6xl lg:text-[4.2rem] min-[420px]:text-4xl">
              <span className="block min-h-[1.12em]">
                <span key={w} className="inline-block animate-rise wavy-underline">
                  {SITE.hero[w]}
                </span>
              </span>
              <span className="mt-1 block text-xl font-bold text-ink/75 sm:text-2xl md:text-3xl">
                u vrtiću <span className="text-forest">Borići</span> 🌿
              </span>
            </h1>

            <Reveal delay={140}>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <span className="inline-flex animate-pop items-center gap-2 rounded-2xl border-4 border-sun bg-white px-4 py-2 font-display text-lg font-extrabold text-forest-deep shadow-[0_6px_0_0_#eda61f]">
                  {SITE.heroBadge}
                </span>
                <span className="text-ink/70">
                  U sistemu subvencija grada – <strong>cene kao u državnom vrtiću.</strong>
                </span>
              </div>
            </Reveal>

            <Reveal delay={200}>
              <div className="mt-8 flex flex-wrap gap-3">
                <Btn size="lg" accent="coral" emoji="📅" onClick={() => go("kontakt")}>
                  Zakažite posetu
                </Btn>
                <Btn size="lg" accent="leaf" variant="white" emoji="📸" onClick={() => go("galerija")}>
                  Pogledajte naše dane
                </Btn>
              </div>
            </Reveal>

            <Reveal delay={260}>
              <dl className="mt-10 grid max-w-xl grid-cols-2 gap-4">
                <div className="rounded-3xl border-4 border-forest/10 bg-white/80 px-4 py-3">
                  <dt className="font-display text-sm font-bold tracking-wide text-forest/70 uppercase">Boravak</dt>
                  <dd className="font-display text-2xl font-extrabold text-forest-deep">{CONTACT.hoursShort}</dd>
                </div>
                <div className="rounded-3xl border-4 border-forest/10 bg-white/80 px-4 py-3">
                  <dt className="font-display text-sm font-bold tracking-wide text-forest/70 uppercase">Adresa</dt>
                  <dd className="text-[15px] font-bold text-forest-deep">{CONTACT.addressShort}</dd>
                </div>
              </dl>
            </Reveal>
          </div>

          {/* foto kolaž sa paralaksom */}
          <div className="relative mx-auto w-full max-w-lg px-2 sm:px-0">
            <div className="relative" style={{ transform: `translate3d(${par.x * 12}px, ${par.y * 12}px, 0)` }}>
              <Tilt className="relative z-10">
                <div className="overflow-hidden rounded-[2rem] border-4 border-white shadow-[0_14px_0_0_rgba(19,59,38,0.14)] sm:rounded-[2.5rem]">
                  <img src={HERO_PHOTOS[0].src} alt={HERO_PHOTOS[0].alt} className="aspect-square w-full object-cover" />
                </div>
              </Tilt>

              <div
                className="absolute -bottom-4 -left-2 z-20 w-32 sm:-bottom-8 sm:-left-6 sm:w-44 min-[420px]:w-36 md:w-48"
                style={{ transform: `translate3d(${par.x * -18}px, ${par.y * -18}px, 0)` }}
              >
                <img
                  src={HERO_PHOTOS[1].src}
                  alt={HERO_PHOTOS[1].alt}
                  loading="lazy"
                  className="animate-float-slow aspect-square w-full rounded-[1.4rem] border-3 border-white object-cover shadow-[0_10px_0_0_rgba(19,59,38,0.14)] sm:rounded-[1.75rem] sm:border-4"
                />
              </div>

              <div
                className="absolute -top-4 -right-2 z-20 w-28 sm:-top-8 sm:-right-4 sm:w-40 min-[420px]:w-32"
                style={{ transform: `translate3d(${par.x * 20}px, ${par.y * 20}px, 0)` }}
              >
                <img
                  src={HERO_PHOTOS[2].src}
                  alt={HERO_PHOTOS[2].alt}
                  loading="lazy"
                  className="aspect-square w-full rounded-[1.2rem] border-3 border-white object-cover shadow-[0_8px_0_0_rgba(19,59,38,0.14)] sm:rounded-[1.5rem] sm:border-4"
                />
              </div>

              <div className="animate-float absolute right-1 bottom-4 z-20 rounded-2xl border-3 border-white bg-berry px-3 py-1.5 text-center font-display text-xs font-bold text-white shadow-[0_6px_0_0_#8d4baf] sm:-right-3 sm:bottom-8 sm:rounded-3xl sm:border-4 sm:px-4 sm:py-2 sm:text-sm">
                <span className="block text-xl sm:text-2xl">🎨</span>
                muzika & umetnost
              </div>
            </div>

            <span className="animate-sway absolute -bottom-2 left-1/3 text-2xl sm:text-3xl">🌿</span>
            <span className="animate-spin-slow absolute top-1/2 -left-8 hidden text-3xl sm:block">☀️</span>
          </div>
        </div>
      </section>

      {/* ---------------- MARQUEE ---------------- */}
      <div className="border-y-4 border-forest/10 bg-white py-4">
        <div className="marquee-track gap-8">
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((m, i) => (
            <span key={i} className="flex items-center gap-8 font-display text-xl font-bold text-forest/80">
              {m} <span className="text-sun">●</span>
            </span>
          ))}
        </div>
      </div>

      {/* ---------------- STATISTIKA ---------------- */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16">
        <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
          {STATS.map((s, i) => (
            <Reveal key={s.label} delay={i * 90}>
              <div className="h-full rounded-2xl border-3 border-forest/10 bg-white p-4 text-center transition-transform duration-300 hover:-translate-y-1.5 hover:rotate-1 sm:rounded-[2rem] sm:border-4 sm:p-6">
                <p className="font-display text-2xl font-extrabold text-forest sm:text-4xl min-[400px]:text-3xl">
                  <CountUp to={s.value} suffix={s.suffix} />
                </p>
                <p className="mt-1.5 text-xs leading-snug font-semibold text-ink/70 sm:text-sm">{s.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------------- ZAŠTO ---------------- */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionTitle
          kicker="Zašto Vrtić Borići?"
          title="Dva stuba našeg vrtića"
          sub="Priroda iz koje rastemo i empatija koju gradimo – sve ostalo je igra."
          accent="leaf"
        />
        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {WHY_HOME.map((c, i) => {
            const a = ACCENT[c.accent as keyof typeof ACCENT];
            return (
              <Reveal key={c.title} delay={i * 120}>
                <Tilt strength={6}>
                  <article className="flex h-full flex-col rounded-[2.5rem] border-4 border-forest/10 bg-white p-7 transition-colors duration-300 hover:border-leaf/50">
                    <div className="flex items-center gap-4">
                      <span className={cn("grid h-16 w-16 place-items-center rounded-3xl text-3xl", a.soft)}>
                        <span className="animate-sway">{c.emoji}</span>
                      </span>
                      <h3 className="font-display text-2xl font-extrabold text-forest-deep sm:text-3xl">{c.title}</h3>
                    </div>
                    <div className="mt-5 space-y-3">
                      {c.lead.map((l) => (
                        <p key={l} className={cn("font-display text-xl font-bold", a.text)}>
                          {l}
                        </p>
                      ))}
                      <p className="text-lg text-ink/80">{c.body}</p>
                      {c.outro && (
                        <p className="rounded-2xl bg-leaf/10 px-4 py-3 font-display text-lg font-bold text-forest">
                          „{c.outro}“
                        </p>
                      )}
                    </div>
                  </article>
                </Tilt>
              </Reveal>
            );
          })}
        </div>
        <div className="mt-8 text-center">
          <Btn accent="leaf" size="lg" emoji="🌟" onClick={() => go("zasto-mi")}>
            7 razloga da nam se pridružite
          </Btn>
        </div>
      </section>

      {/* ---------------- O NAMA ---------------- */}
      <section className="mx-auto mt-20 max-w-7xl px-4 sm:px-6">
        <div className="grid items-center gap-10 lg:grid-cols-[0.95fr_1.05fr]">
          <Reveal>
            <div className="relative pt-4 sm:pt-0">
              <img
                src={photo("DSC00653-1024x1024")}
                alt="Deca se igraju u dvorištu vrtića Borići"
                loading="lazy"
                className="w-full rounded-[2rem] border-4 border-white object-cover shadow-[0_14px_0_0_rgba(19,59,38,0.14)] sm:rounded-[2.5rem]"
              />
              <div className="animate-float absolute -right-4 -bottom-6 rounded-3xl border-4 border-white bg-sun px-5 py-3 font-display font-extrabold text-forest-deep shadow-[0_8px_0_0_#eda61f]">
                <span className="block text-xs tracking-wide uppercase">cene kao u</span>
                državnom vrtiću
              </div>
              <span className="animate-float-slow absolute -top-6 -left-6 hidden text-4xl sm:block">🦋</span>
            </div>
          </Reveal>

          <div>
            <Reveal>
              <h2 className="text-2xl leading-tight font-extrabold text-forest-deep sm:text-4xl">
                Živite u gradu ali sanjate da vam dete odrasta u prirodi?
              </h2>
              <p className="mt-3 font-hand text-2xl text-coral sm:text-3xl">U našem vrtiću ostvarujemo snove!</p>
            </Reveal>
            <Reveal delay={100}>
              <div className="mt-5 space-y-4 text-base text-ink/80 sm:text-lg">
                <p>{ABOUT.intro}</p>
                {ABOUT.blocks.map((b) => (
                  <p key={b.slice(0, 24)}>{b}</p>
                ))}
                <p className="font-display text-xl font-extrabold text-forest">Zakažite posetu – čekamo vas!</p>
              </div>
            </Reveal>
            <Reveal delay={180}>
              <div className="mt-6 flex flex-wrap gap-3">
                <Btn accent="forest" emoji="🌿" onClick={() => go("o-nama")}>
                  Više o nama
                </Btn>
                <Btn accent="berry" variant="white" emoji="📖" onClick={() => go("nasa-prica")}>
                  Naša priča
                </Btn>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------------- JEDAN DAN U BORIĆIMA ---------------- */}
      <section className="mx-auto mt-24 max-w-7xl px-4 sm:px-6">
        <SectionTitle
          kicker="Jedan dan u Borićima"
          title="Kako izgledaju naši dani?"
          sub="Klikni na deo dana i proviri u našu šumu."
          accent="sky"
        />
        <div className="mt-10 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal>
            <div className="grid grid-cols-3 gap-3 sm:grid-cols-5 lg:grid-cols-3">
              {DAY.map((d, i) => (
                <button
                  key={d.time}
                  type="button"
                  onClick={() => setActiveDay(i)}
                  className={cn(
                    "press rounded-2xl border-4 px-2 py-3 font-display font-bold transition-all",
                    activeDay === i
                      ? "border-forest bg-forest text-cream shadow-[0_6px_0_0_#133b26]"
                      : "border-forest/10 bg-white text-forest-deep hover:border-sun",
                  )}
                >
                  <span className="block text-xl">{d.emoji}</span>
                  <span className="block text-sm">{d.time}</span>
                </button>
              ))}
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="flex h-full flex-col justify-center rounded-[2.5rem] border-4 border-forest/10 bg-gradient-to-br from-white to-cream-deep p-7">
              <div key={activeDay} className="animate-rise">
                <span className="text-5xl">{DAY[activeDay].emoji}</span>
                <p className="mt-3 font-display text-sm font-bold tracking-[0.2em] text-coral uppercase">
                  {DAY[activeDay].time}
                </p>
                <h3 className="mt-1 font-display text-2xl font-extrabold text-forest-deep sm:text-3xl">
                  {DAY[activeDay].title}
                </h3>
                <p className="mt-3 text-lg text-ink/75">{DAY[activeDay].text}</p>
              </div>
              <div className="mt-6 h-3 w-full overflow-hidden rounded-full bg-forest/10">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-leaf via-sun to-coral transition-all duration-500"
                  style={{ width: `${((activeDay + 1) / DAY.length) * 100}%` }}
                />
              </div>
              <p className="mt-2 text-sm font-semibold text-ink/60">
                Korak {activeDay + 1} od {DAY.length} · {CONTACT.hours}
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------------- PAKETI ---------------- */}
      <section className="mx-auto mt-24 max-w-7xl px-4 sm:px-6">
        <SectionTitle
          kicker="Upis i cene"
          title="Naši paketi – bez skrivenih troškova"
          sub="Izaberi uzrast deteta i vidi šta te čeka u Borićima."
          accent="coral"
        />
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {PACKAGES.map((p, i) => {
            const a = ACCENT[p.accent as keyof typeof ACCENT];
            return (
              <Reveal key={p.key} delay={i * 110}>
                <Tilt>
                  <div className="h-full rounded-[2.5rem] border-4 border-forest/10 bg-white p-6 transition-all duration-300 hover:border-transparent">
                    <div className="flex items-center justify-between">
                      <span className={cn("grid h-14 w-14 place-items-center rounded-2xl text-2xl", a.soft)}>
                        <span className="transition-transform duration-300 group-hover:-rotate-12">{p.emoji}</span>
                      </span>
                      <span className={cn("rounded-full px-3 py-1 font-display text-sm font-bold", a.chip)}>{p.ageLabel}</span>
                    </div>
                    <h3 className="mt-4 font-display text-2xl font-extrabold text-forest-deep">{p.name}</h3>
                    <ul className="mt-3 space-y-1.5 text-sm text-ink/75">
                      {p.items.slice(0, 3).map((it) => (
                        <li key={it} className="flex gap-2">
                          <span className="text-leaf">✔</span> {it}
                        </li>
                      ))}
                    </ul>
                    <p className={cn("mt-4 rounded-2xl px-3 py-2 text-sm font-bold", a.soft, a.text)}>{p.extra}</p>
                  </div>
                </Tilt>
              </Reveal>
            );
          })}
        </div>
        <div className="mt-8 text-center">
          <Btn accent="coral" size="lg" emoji="🎒" onClick={() => go("upis-i-cene")}>
            Detalji o upisu i dokumentaciji
          </Btn>
        </div>
      </section>

      {/* ---------------- SUBVENCIJA ---------------- */}
      <section className="relative mx-auto mt-24 max-w-7xl px-4 sm:px-6">
        <div className="overflow-hidden rounded-[3rem] border-4 border-forest/10 bg-white">
          <div className="grid items-center gap-8 p-7 sm:p-10 lg:grid-cols-[1.2fr_0.8fr]">
            <div>
              <Chip accent="sun">🏛️ Subvencija grada</Chip>
              <h2 className="mt-4 text-3xl font-extrabold text-forest-deep sm:text-4xl">
                Vrtić u sistemu subvencija. <span className="text-leaf">Cene kao u državnom vrtiću.</span>
              </h2>
              <p className="mt-4 text-lg text-ink/75">
                Ako ispunjavate uslove propisane odlukom grada Beograda, imate pravo da konkurišete za subvencionisanje
                troškova privatnih vrtića. Mi vas vodimo kroz celu proceduru – od odbijenice do rešenja.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Btn accent="leaf" emoji="📋" onClick={() => go("upis-i-cene")}>
                  Kako do subvencije?
                </Btn>
                <Btn href={CONTACT.phoneHref} variant="white" accent="forest" emoji="📞" className="bg-cream">
                  {CONTACT.phone}
                </Btn>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {["🎉 bez skrivenih troškova", "📆 mesečna isplata", "🧾 pomažemo sa papirologijom", "🤝 ugovor bez stresa"].map(
                (t) => (
                  <div
                    key={t}
                    className="rounded-3xl border-4 border-forest/10 bg-cream px-4 py-5 text-center text-sm font-bold text-forest-deep transition-transform duration-300 hover:-translate-y-1.5 hover:rotate-2"
                  >
                    {t}
                  </div>
                ),
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- GALERIJA ---------------- */}
      <section className="mx-auto mt-24 max-w-7xl px-4 sm:px-6">
        <SectionTitle
          kicker="Galerija"
          title="Delić atmosfere iz našeg dvorišta"
          sub="Borova šuma, drvene igračke, osmesi i – naravno – malo blata."
          accent="berry"
        />
        <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {GALLERY.slice(0, 8).map((g, i) => (
            <Reveal key={g} delay={i * 70}>
              <button
                type="button"
                onClick={() => go("galerija")}
                className={cn(
                  "group relative block w-full overflow-hidden rounded-3xl border-4 border-white shadow-[0_10px_0_0_rgba(19,59,38,0.12)]",
                  i % 3 === 0 && "sm:rotate-1",
                  i % 3 === 1 && "sm:-rotate-1",
                )}
              >
                <img
                  src={photo(g, 300)}
                  alt="Fotografija iz vrtića Borići"
                  loading="lazy"
                  className="aspect-square w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <span className="absolute inset-0 grid place-items-center bg-forest-deep/45 text-4xl opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  🔍
                </span>
              </button>
            </Reveal>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Btn accent="berry" size="lg" emoji="📸" onClick={() => go("galerija")}>
            Otvori celu galeriju
          </Btn>
        </div>
      </section>

      {/* ---------------- UTISCI ---------------- */}
      <section className="mx-auto mt-24 max-w-7xl px-4 sm:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
          <Reveal>
            <div className="flex h-full flex-col justify-between rounded-[2.5rem] border-4 border-sun/70 bg-white p-7">
              <div>
                <span className="text-5xl">💛</span>
                <h3 className="mt-3 font-display text-2xl font-extrabold text-forest-deep">Utisci roditelja</h3>
                <p className="mt-3 font-display text-2xl font-bold text-forest">{TESTIMONIALS_HIGHLIGHT}</p>
                <p className="mt-4 text-ink/75">
                  {TESTIMONIALS[0].quote.slice(0, 190)}… <strong>{TESTIMONIALS[0].name}</strong>, {TESTIMONIALS[0].role}
                </p>
              </div>
              <div className="mt-6">
                <Btn accent="sun" emoji="⭐" onClick={() => go("utisci-roditelja")}>
                  Pročitaj sve utiske
                </Btn>
              </div>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div className="h-full overflow-hidden rounded-[2.5rem] border-4 border-forest/10">
              <img
                src={photo("DSC00925")}
                alt="Detinjstvo u borovoj šumi"
                loading="lazy"
                className="h-full min-h-[280px] w-full object-cover"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------------- IGRAONICA ---------------- */}
      <section className="mx-auto mt-24 max-w-7xl px-4 sm:px-6">
        <Reveal>
          <MemoryGame />
        </Reveal>
        <div className="mt-6 text-center">
          <Btn accent="coral" variant="white" emoji="🎉" onClick={() => fireConfetti(40)}>
            Pošalji malo konfeta u šumu
          </Btn>
        </div>
      </section>

      <CtaBand go={go} />
    </>
  );
}
