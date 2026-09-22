import type { ReactNode } from "react";
import { CONTACT, photo, SITE } from "../data";
import { cn } from "../utils/cn";
import { Blob, Btn, Chip, Reveal, fireConfetti } from "./ui";

export function PageHeader({
  emoji,
  kicker,
  title,
  lead,
  go,
  accent = "leaf",
}: {
  emoji: string;
  kicker?: string;
  title: ReactNode;
  lead?: ReactNode;
  go: (r: string) => void;
  accent?: "leaf" | "coral" | "sun" | "sky" | "berry";
}) {
  const tint: Record<string, string> = {
    leaf: "from-leaf/25",
    coral: "from-coral/25",
    sun: "from-sun/35",
    sky: "from-sky/25",
    berry: "from-berry/25",
  };
  return (
    <section className="relative overflow-hidden pt-10 pb-16">
      <div className={cn("absolute inset-0 -z-10 bg-gradient-to-br via-cream to-cream", tint[accent])} />
      <div className="absolute inset-0 -z-10 dotted-bg opacity-60" />
      <Blob className="top-6 -left-16 h-52 w-52" accent={accent as never} />
      <Blob className="right-0 -bottom-10 h-56 w-56" accent="sun" />

      <div className="mx-auto max-w-5xl px-4 text-center sm:px-6">
        <Reveal>
          <span className="inline-flex items-center gap-2 rounded-full border-2 border-forest/10 bg-white px-3.5 py-1.5 font-display text-xs font-bold text-forest shadow-[0_4px_0_0_rgba(19,59,38,0.1)] sm:px-4 sm:py-2 sm:text-sm">
            <span className="animate-wiggle text-lg sm:text-xl">{emoji}</span>
            {kicker ?? SITE.name}
          </span>
        </Reveal>
        <Reveal delay={90}>
          <h1 className="mx-auto mt-4 max-w-3xl text-2xl leading-[1.1] font-extrabold text-forest-deep sm:mt-5 sm:text-4xl md:text-5xl lg:text-6xl min-[380px]:text-3xl">
            {title}
          </h1>
        </Reveal>
        {lead && (
          <Reveal delay={170}>
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-ink/75 sm:mt-5 sm:text-lg">{lead}</p>
          </Reveal>
        )}
        <Reveal delay={240}>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-sm">
            <button
              type="button"
              onClick={() => go("pocetna")}
              className="rounded-full bg-white/80 px-3 py-1 font-bold text-forest transition hover:bg-white"
            >
              🏡 Početna
            </button>
            <span className="text-forest/40">/</span>
            <span className="rounded-full bg-forest px-3 py-1 font-bold text-cream">{kicker ?? "Vrtić Borići"}</span>
          </div>
        </Reveal>
      </div>

      <svg viewBox="0 0 1440 60" className="absolute -bottom-1 left-0 w-full text-cream" preserveAspectRatio="none">
        <path d="M0 34c120 22 240 22 360 6s240-30 360-14 240 30 360 18 240-24 360-26v42H0z" fill="currentColor" />
      </svg>
    </section>
  );
}

export function CtaBand({ go }: { go: (r: string) => void }) {
  return (
    <section className="relative mx-auto mt-16 max-w-7xl px-4 sm:mt-20 sm:px-6">
      <div className="relative overflow-hidden rounded-[2rem] border-3 border-forest/10 bg-gradient-to-br from-forest to-forest-deep px-5 py-8 text-cream sm:rounded-[3rem] sm:border-4 sm:px-10 sm:py-12">
        <Blob className="-top-16 left-1/3 h-56 w-56 bg-sun/25" accent="sun" />
        <div className="grid items-center gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <Chip accent="sun">✨ Zakažite posetu</Chip>
            <h2 className="mt-3 text-2xl leading-tight font-extrabold text-cream sm:mt-4 sm:text-3xl lg:text-[2.6rem] min-[400px]:text-3xl">
              U susret budućnosti sa više mogućnosti
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-cream/85 sm:mt-4 sm:text-base">
              Dođite da vidite našu zelenu učionicu, dvorište koje se nastavlja na borovu šumu, i upoznate vaspitače koji
              svakodnevno stvaraju mališane spremne da menjaju svet.
            </p>
            <div className="mt-6 flex flex-wrap gap-2.5 sm:mt-7 sm:gap-3">
              <Btn
                accent="sun"
                size="md"
                emoji="📅"
                onClick={() => {
                  fireConfetti(50);
                  go("kontakt");
                }}
              >
                Zakažite posetu
              </Btn>
              <Btn
                href={CONTACT.phoneHref}
                size="md"
                variant="white"
                accent="leaf"
                emoji="📞"
                className="bg-cream text-forest-deep"
              >
                {CONTACT.phone}
              </Btn>
            </div>
            <p className="mt-4 font-hand text-xl text-sun sm:text-2xl">Čekamo vas u šumici na Pevcu!</p>
          </div>

          <div className="relative">
            <img
              src="images/borici-cta.png"
              alt="Ilustracija dece koja se igraju u borovoj šumi"
              loading="lazy"
              onError={(e) => {
                const el = e.currentTarget;
                if (el.dataset.fallback) return;
                el.dataset.fallback = "1";
                el.src = photo("DSC00213");
              }}
              className="mx-auto w-full max-w-md rounded-2xl border-3 border-cream/20 object-cover shadow-[0_12px_0_0_rgba(0,0,0,0.15)] sm:rounded-[2rem] sm:border-4"
            />
            <span className="absolute -top-3 -left-2 hidden animate-float rounded-2xl bg-coral px-3 py-1 font-display text-xs font-bold text-white shadow-[0_4px_0_0_#e0512f] sm:block sm:text-sm">
              🌲 205 m nadmorske visine
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
