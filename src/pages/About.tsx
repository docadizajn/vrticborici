import { useState } from "react";
import { ABOUT, CONTACT, HERO_PHOTOS, STORY, photo } from "../data";
import { cn } from "../utils/cn";
import { CtaBand, PageHeader } from "../components/Blocks";
import { ACCENT, Blob, Btn, Chip, Reveal, SectionTitle, Tilt, fireConfetti } from "../components/ui";

const VALUES = [
  { emoji: "💚", title: "Empatija", text: "Učimo decu da razumeju svoje i tuđe emocije, i da brinu o svemu živom." },
  { emoji: "🧭", title: "Samostalnost", text: "Dozvoljavamo im da probaju sami – uz sigurnu podršku vaspitača." },
  { emoji: "⭐", title: "Samopouzdanje", text: "Svaki mali uspeh slavimo glasno, jer hrabrost raste iz podrške." },
  { emoji: "🔍", title: "Radoznalost", text: "Istraživački duh se najbolje budi napolju, u stvarnom svetu." },
  { emoji: "🤝", title: "Timski duh", text: "Dogovor, pomaganje i zajedništvo – baš kao u velikoj porodici." },
  { emoji: "🌍", title: "Odgovornost", text: "Od najmlađih dana gradimo svest o prirodi i svetu oko sebe." },
];

export function AboutPage({ go }: { go: (r: string) => void }) {
  const [openValue, setOpenValue] = useState<number | null>(0);

  return (
    <>
      <PageHeader
        emoji="🌿"
        kicker="O nama"
        title={ABOUT.title}
        lead="Akreditovana predškolska ustanova u borovoj šumi na Petlovom brdu – mesto gde se detinjstvo i učenje stapaju sa prirodom."
        go={go}
      />

      <section className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid items-start gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <Reveal>
              <div className="rounded-2xl border-3 border-leaf/40 bg-white p-5 shadow-[0_10px_0_0_rgba(85,182,74,0.18)] sm:rounded-[2.5rem] sm:border-4 sm:p-7">
                <p className="text-base leading-relaxed text-ink/85 sm:text-lg">{ABOUT.intro}</p>
              </div>
            </Reveal>
            <div className="mt-5 space-y-4 text-base text-ink/80 sm:text-lg">
              {ABOUT.blocks.map((b, i) => (
                <Reveal key={i} delay={i * 90}>
                  <p>{b}</p>
                </Reveal>
              ))}
            </div>
          </div>

          <Reveal delay={120}>
            <div className="relative pt-4 sm:pt-0">
              <img
                src={HERO_PHOTOS[2].src}
                alt="Prostor vrtića Borići"
                loading="lazy"
                className="w-full rounded-2xl border-3 border-white object-cover shadow-[0_14px_0_0_rgba(19,59,38,0.14)] sm:rounded-[2.5rem] sm:border-4"
              />
              <div className="absolute -bottom-4 -left-2 w-32 sm:-bottom-6 sm:-left-5 sm:w-44 md:w-52">
                <img
                  src={HERO_PHOTOS[4].src}
                  alt="Domaća hrana u vrtiću"
                  loading="lazy"
                  className="animate-float aspect-square w-full rounded-2xl border-3 border-white object-cover shadow-[0_10px_0_0_rgba(19,59,38,0.14)] sm:rounded-[1.75rem] sm:border-4"
                />
              </div>
              <div className="animate-float-slow absolute -top-3 right-3 rounded-xl border-3 border-white bg-forest px-3 py-1.5 font-display text-xs font-bold text-cream shadow-[0_6px_0_0_#133b26] sm:-top-5 sm:right-4 sm:rounded-2xl sm:border-4 sm:px-4 sm:py-2 sm:text-sm">
                205 m ⛰️
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* filozofija */}
      <section className="relative mx-auto mt-24 max-w-7xl px-4 sm:px-6">
        <Blob className="top-10 -left-24 h-64 w-64 bg-sun/30" accent="sun" />
        <SectionTitle
          kicker="Naša filozofija"
          title={ABOUT.why.title}
          sub="Više od decenije iskustva u edukaciji – sada pretočeno u vrtić u šumi."
          accent="leaf"
        />
        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {ABOUT.why.paragraphs.map((p, i) => {
            const accents = ["leaf", "sun", "coral", "sky", "berry", "leaf"] as const;
            const a = ACCENT[accents[i % accents.length]];
            return (
              <Reveal key={i} delay={(i % 3) * 90}>
                <div
                  className={cn(
                    "h-full rounded-[2rem] border-4 border-forest/10 bg-white p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-transparent",
                    i === 0 && "md:col-span-2",
                  )}
                >
                  <div className="flex gap-4">
                    <span
                      className={cn(
                        "grid h-12 w-12 shrink-0 place-items-center rounded-2xl font-display text-lg font-extrabold",
                        a.soft,
                        a.text,
                      )}
                    >
                      {i + 1}
                    </span>
                    <p className="text-[17px] leading-relaxed text-ink/80">{p}</p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* vrednosti */}
      <section className="mx-auto mt-24 max-w-7xl px-4 sm:px-6">
        <SectionTitle
          kicker="Naše vrednosti"
          title="6 stvari koje želimo da ponesu iz šume"
          sub="Klikni na karticu i vidi šta za nas znači."
          accent="berry"
        />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {VALUES.map((v, i) => {
            const open = openValue === i;
            return (
              <Reveal key={v.title} delay={i * 70}>
                <button
                  type="button"
                  onClick={() => setOpenValue(open ? null : i)}
                  className={cn(
                    "press h-full w-full rounded-[2rem] border-4 p-6 text-left transition-all duration-300",
                    open ? "border-berry bg-berry/10" : "border-forest/10 bg-white hover:border-berry/40",
                  )}
                >
                  <span className={cn("inline-block text-4xl transition-transform", open && "animate-pop")}>
                    {v.emoji}
                  </span>
                  <h3 className="mt-3 font-display text-2xl font-extrabold text-forest-deep">{v.title}</h3>
                  <p
                    className={cn(
                      "grid transition-all duration-300",
                      open ? "mt-2 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
                    )}
                  >
                    <span className="overflow-hidden text-ink/75">{v.text}</span>
                  </p>
                </button>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* misija i vizija */}
      <section className="mx-auto mt-24 max-w-7xl px-4 sm:px-6">
        <div className="grid gap-6 lg:grid-cols-2">
          {[ABOUT.mission, ABOUT.vision].map((m, i) => (
            <Reveal key={m.title} delay={i * 110}>
              <Tilt strength={5}>
                <div
                  className={cn(
                    "h-full rounded-[2.5rem] border-4 p-8",
                    i === 0 ? "border-leaf/40 bg-leaf/10" : "border-sky/50 bg-sky/10",
                  )}
                >
                  <Chip accent={i === 0 ? "leaf" : "sky"}>{i === 0 ? "🎯 misija" : "🔭 vizija"}</Chip>
                  <h3 className="mt-4 font-display text-3xl font-extrabold text-forest-deep">{m.title}</h3>
                  <div className="mt-4 space-y-3 text-lg text-ink/80">
                    {m.paragraphs.map((p, j) => (
                      <p key={j}>{p}</p>
                    ))}
                  </div>
                </div>
              </Tilt>
            </Reveal>
          ))}
        </div>
      </section>

      <CtaBand go={go} />
    </>
  );
}

export function StoryPage({ go }: { go: (r: string) => void }) {
  return (
    <>
      <PageHeader
        emoji="📖"
        kicker="Naša priča"
        title="Sve najlepše ideje dođu nenadano"
        lead={STORY.lead}
        go={go}
        accent="sky"
      />

      <section className="mx-auto max-w-5xl px-4 sm:px-6">
        <Reveal>
          <div className="rounded-2xl border-3 border-sky/50 bg-white p-5 sm:rounded-[2.5rem] sm:border-4 sm:p-9">
            <p className="font-hand text-2xl text-coral sm:text-3xl">Letnji dan u hladu borova…</p>
            <p className="mt-4 text-base leading-relaxed text-ink/85 sm:text-lg">{STORY.intro}</p>
          </div>
        </Reveal>

        <ol className="relative mt-12 ml-3 space-y-8 border-l-3 border-dashed border-leaf/50 pl-5 sm:ml-0 sm:mt-14 sm:space-y-10 sm:border-l-4 sm:pl-10">
          {STORY.chapters.map((c, i) => (
            <Reveal as="li" key={c.title} delay={i * 80} className="relative">
              <span className="animate-pop absolute top-5 -left-[32px] grid h-10 w-10 place-items-center rounded-xl border-3 border-white bg-sun text-xl shadow-[0_4px_0_0_#eda61f] sm:-left-[58px] sm:h-12 sm:w-12 sm:rounded-2xl sm:border-4 sm:text-2xl">
                {c.emoji}
              </span>
              <div className="rounded-2xl border-3 border-forest/10 bg-white p-4 transition-transform duration-300 hover:-translate-y-1.5 sm:rounded-[2rem] sm:border-4 sm:p-6">
                <h3 className="font-display text-xl font-extrabold text-forest-deep sm:text-2xl md:text-3xl">
                  {c.title}
                </h3>
                <p className="mt-3 text-base leading-relaxed text-ink/80 sm:text-lg">{c.body}</p>
              </div>
            </Reveal>
          ))}
        </ol>

        <Reveal>
          <div className="mt-14 grid items-center gap-6 rounded-[2.5rem] border-4 border-leaf/40 bg-leaf/10 p-6 sm:grid-cols-[0.8fr_1.2fr] sm:p-8">
            <img
              src={photo("DSC00521")}
              alt="Dvorište vrtića Borići u borovoj šumi"
              loading="lazy"
              className="w-full rounded-[2rem] border-4 border-white object-cover shadow-[0_10px_0_0_rgba(19,59,38,0.14)]"
            />
            <div>
              <p className="font-display text-2xl font-extrabold text-forest-deep sm:text-3xl">{STORY.outro}</p>
              <div className="mt-5 flex flex-wrap gap-3">
                <Btn
                  accent="leaf"
                  emoji="🎉"
                  onClick={() => {
                    fireConfetti(60);
                    go("kontakt");
                  }}
                >
                  Zakaži posetu
                </Btn>
                <Btn href={CONTACT.phoneHref} variant="white" accent="forest" emoji="📞" className="bg-white">
                  {CONTACT.phone}
                </Btn>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      <CtaBand go={go} />
    </>
  );
}
