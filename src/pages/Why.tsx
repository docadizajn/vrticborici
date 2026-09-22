import { useState } from "react";
import { REASONS, REASONS_OUTRO, photo } from "../data";
import { cn } from "../utils/cn";
import { CtaBand, PageHeader } from "../components/Blocks";
import { ACCENT, Blob, Btn, Reveal, SectionTitle, Tilt } from "../components/ui";

export default function WhyPage({ go }: { go: (r: string) => void }) {
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState<number[]>([]);
  const r = REASONS[active];
  const a = ACCENT[r.accent as keyof typeof ACCENT];

  const toggle = (n: number) => setOpen((o) => (o.includes(n) ? o.filter((x) => x !== n) : [...o, n]));

  return (
    <>
      <PageHeader
        emoji="🌟"
        kicker="Zašto mi"
        title="7 razloga da nam se pridružite"
        lead="Od šume i domaće hrane, do klavira, logopeda i porodične atmosfere – evo šta nas čini Borićima."
        go={go}
        accent="coral"
      />

      {/* ---------- izbor razloga + detalj ---------- */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid items-start gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          {/* lista razloga */}
          <div className="w-full">
            <Reveal>
              <p className="font-hand text-xl text-coral sm:text-2xl">Izaberi razlog koji te zanima 👇</p>
            </Reveal>

            <div className="mt-3 flex flex-col gap-2">
              {REASONS.map((item, i) => {
                const ia = ACCENT[item.accent as keyof typeof ACCENT];
                return (
                  <Reveal key={item.n} delay={i * 40}>
                    <button
                      type="button"
                      onClick={() => setActive(i)}
                      className={cn(
                        "press flex w-full min-w-0 items-center gap-2 rounded-xl border-2 px-3 py-2.5 text-left transition-all sm:gap-3 sm:rounded-2xl sm:border-3 sm:px-4",
                        active === i
                          ? "border-forest bg-forest text-cream shadow-[0_4px_0_0_#133b26]"
                          : "border-forest/10 bg-white hover:border-sun/70",
                      )}
                    >
                      <span className="w-6 shrink-0 font-display text-xs font-bold opacity-70 sm:text-sm">{item.n}</span>
                      <span className="shrink-0 text-lg sm:text-xl">{item.emoji}</span>
                      <span className="min-w-0 flex-1 font-display text-sm leading-snug font-bold sm:text-base">
                        {item.title}
                      </span>
                      <span
                        className={cn(
                          "shrink-0 rounded-full px-2 py-0.5 text-[11px] font-bold sm:text-xs",
                          active === i ? "bg-white/20 text-cream" : ia.chip,
                        )}
                      >
                        {item.paragraphs.length} ✦
                      </span>
                    </button>
                  </Reveal>
                );
              })}
            </div>
          </div>

          {/* detaljni prikaz */}
          <Reveal delay={100} className="w-full min-w-0">
            <div className="flex h-full flex-col overflow-hidden rounded-2xl border-3 border-forest/10 bg-white sm:rounded-[2.5rem] sm:border-4">
              <div
                className={cn(
                  "flex flex-wrap items-center gap-3 border-b-3 border-forest/10 px-4 py-4 sm:gap-4 sm:border-b-4 sm:px-6 sm:py-5",
                  a.soft,
                )}
              >
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-white text-2xl shadow-[0_4px_0_0_rgba(19,59,38,0.12)] sm:h-14 sm:w-14 sm:text-3xl">
                  <span key={active} className="animate-pop">
                    {r.emoji}
                  </span>
                </span>
                <div className="min-w-0 flex-1">
                  <p className="font-display text-[11px] font-bold tracking-[0.15em] text-forest/70 uppercase sm:text-xs">
                    {r.n} razlog
                  </p>
                  <h2 className="font-display text-xl leading-tight font-extrabold text-forest-deep sm:text-2xl md:text-3xl">
                    {r.title}
                  </h2>
                </div>
              </div>

              <div
                key={active}
                className="animate-rise flex-1 space-y-3 px-4 py-5 text-[15px] leading-relaxed text-ink/85 sm:space-y-4 sm:px-6 sm:py-6 sm:text-[17px]"
              >
                {r.paragraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------- slagalica svih razloga ---------- */}
      <section className="mx-auto mt-20 max-w-7xl px-4 sm:mt-24 sm:px-6">
        <SectionTitle
          kicker="Sve na jednom mestu"
          title="Rasklopi razloge kao slagalicu"
          sub="Klikni na karticu da vidiš ceo tekst – ili ih otvori sve i pusti da se sama sklapa slika."
          accent="sun"
        />

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Btn accent="sun" size="sm" emoji="🧩" onClick={() => setOpen(REASONS.map((x) => Number(x.n.slice(0, 2))))}>
            Otvori sve
          </Btn>
          <Btn accent="forest" size="sm" variant="white" emoji="📦" onClick={() => setOpen([])}>
            Zatvori sve
          </Btn>
        </div>

        <div className="mt-8 grid items-stretch gap-5 md:grid-cols-2 lg:grid-cols-3">
          {REASONS.map((item, i) => {
            const n = Number(item.n.slice(0, 2));
            const isOpen = open.includes(n);
            const ia = ACCENT[item.accent as keyof typeof ACCENT];

            return (
              <Reveal key={item.n} delay={(i % 3) * 80}>
                {/* bez Tilt-a: hover 3D efekte zamenjili blagim liftom da tekst nikad ne „ispreseci" susede */}
                <article
                  className={cn(
                    "flex h-full flex-col rounded-[1.75rem] border-3 bg-white p-5 transition-all duration-300 sm:rounded-[2rem] sm:border-4 sm:p-6",
                    isOpen
                      ? "border-forest/25 shadow-[0_10px_0_0_rgba(19,59,38,0.1)]"
                      : "border-forest/10 hover:-translate-y-1.5",
                  )}
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className={cn("grid h-12 w-12 shrink-0 place-items-center rounded-2xl text-2xl sm:h-14 sm:w-14", ia.soft)}>
                      <span className="inline-block">{item.emoji}</span>
                    </span>
                    <span className="font-display text-lg font-extrabold text-forest/30">{item.n}</span>
                  </div>

                  <h3 className="mt-4 font-display text-lg leading-tight font-extrabold text-forest-deep sm:text-xl">
                    {item.title}
                  </h3>

                  <p className="mt-2 text-[15px] leading-relaxed text-ink/80">{item.paragraphs[0]}</p>

                  {isOpen && (
                    <div className="mt-3 space-y-3 border-t-2 border-dashed border-forest/15 pt-3 text-ink/80">
                      {item.paragraphs.slice(1).map((p, j) => (
                        <p key={j} className="text-[15px] leading-relaxed">
                          {p}
                        </p>
                      ))}
                    </div>
                  )}

                  <div className="mt-auto pt-4">
                    <button
                      type="button"
                      onClick={() => toggle(n)}
                      className={cn(
                        "press inline-flex items-center gap-2 rounded-full px-4 py-2 font-display text-sm font-bold transition-all",
                        isOpen ? "bg-forest text-cream" : ia.chip,
                      )}
                    >
                      {isOpen ? "Sakrij detalje ▲" : "Pročitaj više ▼"}
                    </button>
                  </div>
                </article>
              </Reveal>
            );
          })}

          {/* kartica sa pozivom */}
          <Reveal delay={100}>
            <div className="flex h-full flex-col overflow-hidden rounded-[1.75rem] border-3 border-forest/10 sm:rounded-[2rem] sm:border-4">
              <img
                src={photo("DSC00854")}
                alt="Vaspitači i deca u vrtiću Borići"
                loading="lazy"
                className="h-40 w-full shrink-0 object-cover sm:h-44"
              />
              <div className="flex flex-1 flex-col justify-center bg-white p-5 sm:p-6">
                <p className="font-display text-base leading-snug font-bold text-forest sm:text-lg">{REASONS_OUTRO}</p>
                <div className="mt-4">
                  <Btn accent="coral" emoji="📅" onClick={() => go("kontakt")}>
                    Zakaži posetu
                  </Btn>
                </div>
              </div>
              <Blob className="-bottom-8 -right-4 h-24 w-24 bg-sun/40" accent="sun" />
            </div>
          </Reveal>
        </div>
      </section>

      <CtaBand go={go} />
    </>
  );
}
