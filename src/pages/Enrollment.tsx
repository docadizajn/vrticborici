import { useMemo, useState } from "react";
import { ACTIVITIES, CONTACT, ENROLL, EXTERNAL, GROUPS, PACKAGES, PRICE_NOTICE } from "../data";
import { cn } from "../utils/cn";
import { CtaBand, PageHeader } from "../components/Blocks";
import { ACCENT, Blob, Btn, Chip, Reveal, SectionTitle, Tilt, fireConfetti } from "../components/ui";

export default function Enrollment({ go }: { go: (r: string) => void }) {
  const [activeTab, setActiveTab] = useState(PACKAGES[1].key);
  const [years, setYears] = useState(4);
  const [step, setStep] = useState(0);
  const [docs, setDocs] = useState<number[]>([]);
  const [bring, setBring] = useState<number[]>([]);

  const pkg = PACKAGES.find((p) => p.key === activeTab) ?? PACKAGES[1];
  const a = ACCENT[pkg.accent as keyof typeof ACCENT];

  const recommendation = useMemo(() => {
    if (years < 3) return PACKAGES[0];
    if (years < 5.5) return PACKAGES[1];
    return PACKAGES[2];
  }, [years]);

  const docProgress = Math.round((docs.length / ENROLL.documents.length) * 100);

  return (
    <>
      <PageHeader emoji="🎒" kicker="Upis i cene" title={ENROLL.subsidyTitle} lead={ENROLL.intro} go={go} accent="coral" />

      <section className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] border-3 border-forest/10 bg-white p-5 sm:rounded-[2.5rem] sm:border-4 sm:p-9">
            <Blob className="-top-16 right-0 h-44 w-44 bg-sun/30" accent="sun" />
            <div className="relative">
              <Chip accent="berry">🧩 Brzi konfigurator</Chip>
              <h2 className="mt-3 font-display text-2xl font-extrabold text-forest-deep sm:text-3xl">
                Koliko godina ima vaš mališan?
              </h2>
              <p className="mt-2 text-sm text-ink/70 sm:text-base">
                Pomeri klizač – pokazaćemo ti koji paket mu najbolje odgovara.
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-3 sm:gap-4">
                <span className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl bg-cream-deep font-display text-2xl font-extrabold text-forest-deep shadow-[0_4px_0_0_rgba(19,59,38,0.12)] sm:h-20 sm:w-20 sm:rounded-3xl sm:text-3xl">
                  {years % 1 === 0 ? years : years.toFixed(1)}
                  <span className="text-xs sm:text-base">god</span>
                </span>
                <input
                  type="range"
                  min={1}
                  max={6}
                  step={0.5}
                  value={years}
                  aria-label="Uzrast deteta u godinama"
                  onChange={(e) => setYears(Number(e.target.value))}
                  className="h-4 min-w-[160px] flex-1 cursor-pointer appearance-none rounded-full bg-gradient-to-r from-coral via-sun to-leaf"
                />
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-[1.2fr_0.8fr]">
                <div className="rounded-3xl border-4 border-leaf/50 bg-leaf/10 p-5">
                  <p className="font-display text-sm font-bold tracking-widest text-forest/70 uppercase">Preporuka za vas</p>
                  <p className="mt-1 font-display text-2xl font-extrabold text-forest-deep">
                    {recommendation.emoji} {recommendation.name}
                  </p>
                  <p className="mt-1 text-ink/75">
                    Uzrast: <strong>{recommendation.ageLabel}</strong> · celodnevni boravak (7-18h), male grupe, domaći
                    obroci.
                  </p>
                </div>
                <div className="rounded-3xl bg-cream-deep p-5 text-sm text-ink/75">
                  <p className="font-display text-lg font-bold text-forest-deep">Podsećamo 😊</p>
                  <p className="mt-1">{ENROLL.subsidyNote}</p>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* grupe */}
      <section className="mx-auto mt-16 max-w-7xl px-4 sm:px-6">
        <SectionTitle
          kicker="Grupe"
          title="Tri grupe – od jaslaca do predškolaca"
          sub="Mešovita grupa okuplja decu različitog uzrasta, baš kao u jednoj porodici."
          accent="leaf"
        />
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {GROUPS.map((g, i) => {
            const ga = ACCENT[g.accent as keyof typeof ACCENT];
            return (
              <Reveal key={g.title} delay={i * 90}>
                <div className="group flex h-full items-center gap-4 rounded-[2rem] border-4 border-forest/10 bg-white p-5 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_12px_0_0_rgba(19,59,38,0.12)]">
                  <span className={cn("grid h-16 w-16 shrink-0 place-items-center rounded-3xl text-3xl", ga.soft)}>
                    <span className="transition-transform duration-300 group-hover:-rotate-12">{g.emoji}</span>
                  </span>
                  <div>
                    <h3 className="font-display text-xl font-extrabold text-forest-deep">{g.title}</h3>
                    <p className={cn("font-bold", ga.text)}>{g.age}</p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* paketi */}
      <section className="mx-auto mt-20 max-w-7xl px-4 sm:px-6">
        <SectionTitle kicker="Naši paketi" title="Izaberi program i pogledaj šta sve uključuje" accent="coral" />

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {PACKAGES.map((p) => {
            const pa = ACCENT[p.accent as keyof typeof ACCENT];
            const on = activeTab === p.key;
            return (
              <button
                key={p.key}
                type="button"
                onClick={() => setActiveTab(p.key)}
                className={cn(
                  "press flex items-center gap-2 rounded-full border-4 px-5 py-3 font-display font-bold transition-all",
                  on ? cn(pa.bg, "border-transparent text-white", pa.ring) : "border-forest/10 bg-white text-forest-deep hover:border-sun",
                )}
              >
                <span className="text-xl">{p.emoji}</span>
                {p.name}
                <span className={cn("rounded-full px-2 py-0.5 text-xs", on ? "bg-white/25" : pa.chip)}>{p.ageLabel}</span>
              </button>
            );
          })}
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <Reveal className="w-full min-w-0">
            <div className="h-full rounded-[2rem] border-3 border-forest/10 bg-white p-5 sm:rounded-[2.5rem] sm:border-4 sm:p-7">
              <div key={pkg.key} className="animate-rise">
                <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                  <span className={cn("grid h-14 w-14 shrink-0 place-items-center rounded-2xl text-3xl sm:h-16 sm:w-16 sm:rounded-3xl", a.soft)}>
                    {pkg.emoji}
                  </span>
                  <div className="min-w-0">
                    <h3 className="font-display text-2xl leading-tight font-extrabold text-forest-deep sm:text-3xl">
                      {pkg.name}
                    </h3>
                    <p className={cn("font-bold", a.text)}>{pkg.ageLabel}</p>
                  </div>
                </div>
                <ul className="mt-6 space-y-2.5">
                  {pkg.items.map((it, i) => (
                    <li
                      key={it}
                      className="animate-rise flex items-start gap-3 rounded-2xl bg-cream px-4 py-2.5 text-ink/85"
                      style={{ animationDelay: `${i * 60}ms` }}
                    >
                      <span
                        className={cn("mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full text-xs font-bold text-white", a.bg)}
                      >
                        ✔
                      </span>
                      {it}
                    </li>
                  ))}
                </ul>
                <p className={cn("mt-5 rounded-2xl px-4 py-3 font-display font-bold", a.soft, a.text)}>{pkg.extra}</p>
              </div>
            </div>
          </Reveal>

          <div className="space-y-4">
            <Reveal delay={90}>
              <div className="rounded-[2rem] border-3 border-forest/10 bg-white p-5 sm:rounded-[2.5rem] sm:border-4 sm:p-6">
                <h3 className="font-display text-2xl font-extrabold text-forest-deep">Dodatne aktivnosti 🎈</h3>
                <div className="mt-4 space-y-3">
                  {ACTIVITIES.map((act) => (
                    <div
                      key={act.title}
                      className="flex gap-3 rounded-2xl bg-cream p-3.5 transition-transform duration-300 hover:translate-x-1 sm:gap-4 sm:p-4"
                    >
                      <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-white text-2xl shadow-[0_4px_0_0_rgba(19,59,38,0.1)] sm:h-14 sm:w-14 sm:rounded-2xl">
                        {act.emoji}
                      </span>
                      <div className="min-w-0">
                        <p className="font-display text-base leading-snug font-bold text-forest-deep sm:text-lg">
                          {act.title}
                        </p>
                        <p className="mt-1 text-sm leading-relaxed text-ink/70">{act.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal delay={150}>
              <div className="rounded-[2.5rem] border-4 border-sun/60 bg-sun/10 p-6">
                <h3 className="font-display text-xl font-extrabold text-forest-deep">
                  Prilikom prvog dolaska deteta u vrtić, treba poneti…
                </h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {ENROLL.bring.map((b, i) => {
                    const on = bring.includes(i);
                    return (
                      <button
                        key={b}
                        type="button"
                        onClick={() => setBring((br) => (br.includes(i) ? br.filter((x) => x !== i) : [...br, i]))}
                        className={cn(
                          "press rounded-full border-2 px-4 py-2 text-sm font-bold transition-all",
                          on ? "border-forest bg-forest text-cream" : "border-forest/20 bg-white text-forest-deep hover:border-forest/50",
                        )}
                      >
                        {on ? "✅ " : "⬜ "}
                        {b}
                      </button>
                    );
                  })}
                </div>
                <p className="mt-4 text-sm text-ink/70">{ENROLL.bringNote}</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* spoljni saradnici */}
      <section className="mx-auto mt-24 max-w-7xl px-4 sm:px-6">
        <SectionTitle
          kicker="Spoljni saradnici"
          title="Posebni gosti naših mališana"
          sub="Stručnjaci koji sa našom decom rade tokom cele godine – logoped je uračunat u cenu vrtića."
          accent="berry"
        />
        <div className="mt-10 grid items-stretch gap-5 md:grid-cols-2">
          {EXTERNAL.map((x, i) => (
            <Reveal key={x.title} delay={(i % 2) * 100}>
              <div className="flex h-full gap-3 rounded-[1.5rem] border-3 border-forest/10 bg-white p-4 transition-all duration-300 hover:-translate-y-1.5 hover:border-berry/50 sm:gap-4 sm:rounded-[2rem] sm:border-4 sm:p-5">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-berry/10 text-2xl sm:h-14 sm:w-14 sm:rounded-2xl sm:text-3xl">
                  {x.emoji}
                </span>
                <div className="min-w-0">
                  <h3 className="font-display text-base leading-snug font-extrabold text-forest-deep sm:text-lg">
                    {x.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink/75">{x.text}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* obaveštenje o ceni */}
      <section className="mx-auto mt-24 max-w-7xl px-4 sm:px-6">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] border-3 border-forest/10 bg-white p-5 sm:rounded-[2.5rem] sm:border-4 sm:p-9">
            <Blob className="-top-16 right-0 h-44 w-44 bg-coral/20" accent="coral" />
            <div className="relative">
              <div className="flex flex-wrap items-center gap-3">
                <Chip accent="coral">💰 Obaveštenje o ceni</Chip>
                <span className="rounded-full bg-forest px-3 py-1 font-display text-sm font-bold text-cream">
                  {PRICE_NOTICE.date}
                </span>
              </div>
              <p className="mt-4 text-base text-ink/80 sm:text-lg">{PRICE_NOTICE.intro}</p>
              <h3 className="mt-5 font-display text-2xl font-extrabold text-forest-deep sm:text-3xl">
                {PRICE_NOTICE.title}
              </h3>

              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                {PRICE_NOTICE.rows.map((row) => {
                  const ra = ACCENT[row.accent as keyof typeof ACCENT];
                  return (
                    <div
                      key={row.label}
                      className={cn(
                        "flex flex-col rounded-2xl border-3 p-4 sm:rounded-3xl sm:border-4 sm:p-5",
                        row.accent === "coral" ? "border-coral/45 bg-coral/8" : "border-leaf/45 bg-leaf/8",
                      )}
                    >
                      <p className={cn("font-display text-sm font-bold tracking-widest uppercase", ra.text)}>
                        {row.label}
                      </p>

                      {/* cena bez subvencije – uvek vidljiva */}
                      <div className="mt-3 rounded-2xl bg-white px-3 py-2.5">
                        <p className="font-display text-[11px] font-bold tracking-wide text-ink/55 uppercase">
                          {row.fullPriceNote}
                        </p>
                        <p className="font-display text-2xl leading-tight font-extrabold text-forest-deep sm:text-3xl">
                          {row.fullPrice}
                        </p>
                      </div>

                      <div className="mt-3 flex items-center gap-2 text-forest/70">
                        <span className="h-px flex-1 bg-forest/20" />
                        <span className="font-display text-[11px] font-bold tracking-wide uppercase">sa subvencijom</span>
                        <span className="h-px flex-1 bg-forest/20" />
                      </div>

                      {/* doplata uz subvenciju */}
                      <div className={cn("mt-2 rounded-2xl px-3 py-2.5", ra.soft)}>
                        <p className="font-display text-[11px] font-bold tracking-wide text-ink/55 uppercase">
                          doplata umesto cene
                        </p>
                        <p className={cn("font-display text-2xl leading-tight font-extrabold sm:text-3xl", ra.text)}>
                          {row.surcharge}
                        </p>
                        <p className="mt-1 inline-flex rounded-full bg-forest px-3 py-0.5 font-display text-xs font-bold text-cream">
                          {row.surchargeNote}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-4 rounded-3xl border-4 border-dashed border-forest/25 bg-cream p-5">
                <p className="text-ink/85">{PRICE_NOTICE.third}</p>
                <p className="mt-3 inline-flex rounded-2xl bg-forest px-4 py-2 font-display text-lg font-extrabold text-cream">
                  {PRICE_NOTICE.subsidy}
                </p>
              </div>

              <p className="mt-5 font-hand text-2xl text-leaf">Za sva pitanja oko cena – tu smo na {CONTACT.phone} 📞</p>
            </div>
          </div>
        </Reveal>
      </section>

      {/* subvencija */}
      <section className="mx-auto mt-24 max-w-7xl px-4 sm:px-6">
        <SectionTitle kicker="Upis uz subvenciju" title="Kako do subvencije?" sub={ENROLL.subsidyCondition} accent="leaf" />

        <div className="mt-10 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <Reveal>
            <div className="h-full rounded-[2.5rem] border-4 border-forest/10 bg-white p-7">
              <div className="flex items-center gap-2">
                {ENROLL.procedure.map((p, i) => (
                  <button
                    key={p.title}
                    type="button"
                    aria-label={`Korak ${i + 1}`}
                    onClick={() => setStep(i)}
                    className={cn(
                      "press grid h-11 w-11 place-items-center rounded-2xl border-4 font-display font-extrabold transition-all",
                      i <= step ? "border-forest bg-forest text-cream" : "border-forest/15 bg-cream text-forest/50",
                    )}
                  >
                    {i + 1}
                  </button>
                ))}
                <div className="mx-2 h-3 flex-1 overflow-hidden rounded-full bg-forest/10">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-leaf to-sun transition-all duration-500"
                    style={{ width: `${((step + 1) / ENROLL.procedure.length) * 100}%` }}
                  />
                </div>
              </div>

              <div key={step} className="mt-6 animate-rise">
                <h3 className="font-display text-2xl font-extrabold text-forest-deep">{ENROLL.procedure[step].title}</h3>
                <p className="mt-3 text-lg text-ink/80">{ENROLL.procedure[step].text}</p>
              </div>

              <div className="mt-6 flex gap-3">
                <Btn accent="forest" size="sm" variant="white" emoji="⬅️" onClick={() => setStep((s) => Math.max(0, s - 1))}>
                  Prethodni
                </Btn>
                <Btn
                  accent="leaf"
                  size="sm"
                  emoji="➡️"
                  onClick={() => setStep((s) => Math.min(ENROLL.procedure.length - 1, s + 1))}
                >
                  Sledeći korak
                </Btn>
              </div>
            </div>
          </Reveal>

          <Reveal delay={110}>
            <div className="h-full rounded-[2.5rem] border-4 border-forest/10 bg-white p-7">
              <div className="flex items-center justify-between gap-3">
                <h3 className="font-display text-2xl font-extrabold text-forest-deep">Potrebna dokumentacija</h3>
                <span className="rounded-full bg-leaf/15 px-3 py-1 font-display font-bold text-forest">
                  {docs.length}/{ENROLL.documents.length}
                </span>
              </div>
              <div className="mt-4 h-3 overflow-hidden rounded-full bg-forest/10">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-leaf to-sun transition-all duration-500"
                  style={{ width: `${docProgress}%` }}
                />
              </div>
              <ul className="mt-5 space-y-2">
                {ENROLL.documents.map((d, i) => {
                  const on = docs.includes(i);
                  return (
                    <li key={d}>
                      <label
                        className={cn(
                          "flex cursor-pointer items-center gap-3 rounded-2xl border-2 px-4 py-3 transition-all",
                          on ? "border-leaf bg-leaf/10" : "border-forest/10 hover:border-forest/30",
                        )}
                      >
                        <input
                          type="checkbox"
                          checked={on}
                          onChange={() =>
                            setDocs((ds) => {
                              const next = ds.includes(i) ? ds.filter((x) => x !== i) : [...ds, i];
                              if (next.length === ENROLL.documents.length) fireConfetti(50);
                              return next;
                            })
                          }
                          className="h-5 w-5 accent-[#55b64a]"
                        />
                        <span className={cn("text-sm font-semibold", on ? "text-forest" : "text-ink/80")}>{d}</span>
                      </label>
                    </li>
                  );
                })}
              </ul>
              <p className="mt-4 font-hand text-2xl text-leaf">
                {docProgress === 100 ? "Sve spremno! Vidimo se u šumi 🌲" : "Označi šta već imaš u fioci 😉"}
              </p>
            </div>
          </Reveal>
        </div>

        <Reveal>
          <div className="mt-10 rounded-[2.5rem] bg-gradient-to-br from-forest to-forest-deep p-7 text-cream sm:p-9">
            <p className="font-display text-2xl font-extrabold sm:text-3xl">{ENROLL.outro}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Btn
                accent="sun"
                size="lg"
                emoji="📅"
                onClick={() => {
                  fireConfetti(60);
                  go("kontakt");
                }}
              >
                Zakažite posetu
              </Btn>
              <Btn
                href={CONTACT.phoneHref}
                size="lg"
                variant="white"
                accent="leaf"
                emoji="📞"
                className="bg-cream text-forest-deep"
              >
                {CONTACT.phone}
              </Btn>
            </div>
          </div>
        </Reveal>
      </section>

      <CtaBand go={go} />
    </>
  );
}
