import { useEffect, useState } from "react";
import { TESTIMONIALS, TESTIMONIALS_HIGHLIGHT, TESTIMONIALS_OUTRO, photo } from "../data";
import { cn } from "../utils/cn";
import { CtaBand, PageHeader } from "../components/Blocks";
import { Btn, Reveal, SectionTitle, Tilt } from "../components/ui";

export default function TestimonialsPage({ go }: { go: (r: string) => void }) {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const t = TESTIMONIALS[i];

  useEffect(() => {
    if (paused) return;
    const id = window.setInterval(() => setI((v) => (v + 1) % TESTIMONIALS.length), 6000);
    return () => window.clearInterval(id);
  }, [paused]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") setI((v) => (v + 1) % TESTIMONIALS.length);
      if (e.key === "ArrowLeft") setI((v) => (v - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <PageHeader emoji="💛" kicker="Utisci roditelja" title="Rekli su o nama" lead={TESTIMONIALS_HIGHLIGHT} go={go} accent="sun" />

      <section className="mx-auto max-w-5xl px-4 sm:px-6">
        <Reveal>
          <div
            className="relative overflow-hidden rounded-[2rem] border-3 border-sun/60 bg-white p-5 sm:rounded-[2.5rem] sm:border-4 sm:p-10"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            <span className="pointer-events-none absolute -top-6 left-4 font-display text-7xl text-sun/40 sm:left-6 sm:text-8xl">
              “
            </span>
            <div key={i} className="animate-rise">
              <p className="relative text-base leading-relaxed text-ink/85 sm:text-lg md:text-xl">{t.quote}</p>
              <div className="mt-5 flex items-center gap-3 sm:mt-6 sm:gap-4">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-cream-deep text-2xl shadow-[0_4px_0_0_rgba(19,59,38,0.1)] sm:h-14 sm:w-14">
                  {t.emoji}
                </span>
                <div>
                  <p className="font-display text-base font-extrabold text-forest-deep sm:text-lg">{t.name}</p>
                  <p className="text-xs text-ink/60 sm:text-sm">{t.role}</p>
                </div>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-between gap-3 sm:mt-7 sm:gap-4">
              <div className="flex gap-1.5 sm:gap-2">
                {TESTIMONIALS.map((x, j) => (
                  <button
                    key={x.name + j}
                    type="button"
                    aria-label={`Utisak ${j + 1}`}
                    onClick={() => setI(j)}
                    className={cn(
                      "h-2.5 rounded-full transition-all duration-300 sm:h-3",
                      j === i ? "w-7 bg-forest sm:w-9" : "w-2.5 bg-forest/25 hover:bg-forest/50 sm:w-3",
                    )}
                  />
                ))}
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  aria-label="Prethodni utisak"
                  onClick={() => setI((v) => (v - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)}
                  className="press grid h-10 w-10 place-items-center rounded-full border-3 border-forest/10 bg-cream text-lg font-bold text-forest-deep sm:h-11 sm:w-11 sm:border-4 sm:text-xl"
                >
                  ‹
                </button>
                <button
                  type="button"
                  aria-label="Sledeći utisak"
                  onClick={() => setI((v) => (v + 1) % TESTIMONIALS.length)}
                  className="press grid h-10 w-10 place-items-center rounded-full bg-forest text-lg font-bold text-cream shadow-[0_4px_0_0_#133b26] sm:h-11 sm:w-11 sm:text-xl"
                >
                  ›
                </button>
              </div>
            </div>
            <p className="mt-2.5 text-right text-xs font-semibold text-ink/45">
              {paused ? "⏸ pauzirano" : "▶ menja se automatski"}
            </p>
          </div>
        </Reveal>
      </section>

      <section className="mx-auto mt-20 max-w-7xl px-4 sm:px-6">
        <SectionTitle
          kicker="Sve preporuke"
          title="Više od 30 porodica nam veruje"
          sub="Poruke koje nas svakog dana motivišu, prenesene upravo onako kako su nam stigle."
          accent="coral"
        />
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {TESTIMONIALS.map((x, j) => (
            <Reveal key={x.name + j} delay={(j % 3) * 90}>
              <Tilt strength={5}>
                <figure className="flex h-full flex-col rounded-[2rem] border-4 border-forest/10 bg-white p-6 transition-colors duration-300 hover:border-coral/50">
                  <span className="text-3xl">{x.emoji}</span>
                  <blockquote className="mt-3 flex-1 text-ink/80">{x.quote}</blockquote>
                  <figcaption className="mt-4 border-t-2 border-dashed border-forest/10 pt-3">
                    <p className="font-display font-extrabold text-forest-deep">{x.name}</p>
                    <p className="text-sm text-ink/60">{x.role}</p>
                  </figcaption>
                </figure>
              </Tilt>
            </Reveal>
          ))}

          <Reveal delay={140}>
            <div className="flex h-full flex-col justify-between overflow-hidden rounded-[2rem] border-4 border-forest/10 bg-cream-deep">
              <img
                src={photo("DSC00564")}
                alt="Deca u dvorištu vrtića Borići"
                loading="lazy"
                className="h-40 w-full object-cover"
              />
              <div className="p-6">
                <p className="font-display text-lg font-extrabold text-forest-deep">{TESTIMONIALS_OUTRO}</p>
                <div className="mt-4">
                  <Btn accent="coral" emoji="📅" onClick={() => go("kontakt")}>
                    Zakaži posetu
                  </Btn>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <CtaBand go={go} />
    </>
  );
}
