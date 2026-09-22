import { useEffect, useState } from "react";
import { CONTACT, FOOTER_NAV, NAV, QUICK_COLUMNS, SITE } from "../data";
import { cn } from "../utils/cn";
import { Btn } from "./ui";

/* ---------------- logo (zvanični logo vrtića Borići) ---------------- */
export function Logo({
  onClick,
  small,
  inverse = false,
}: {
  onClick: () => void;
  small?: boolean;
  inverse?: boolean;
}) {
  const [imgError, setImgError] = useState(false);

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Vrtić Borići - Početna"
      title="Vrtić Borići"
      className="group flex shrink-0 items-center transition-transform duration-200 active:scale-95"
    >
      <span
        className={cn(
          "grid shrink-0 place-items-center rounded-2xl border-2 transition-transform duration-300 group-hover:-rotate-3 group-hover:scale-105",
          inverse
            ? "border-cream/25 bg-white shadow-[0_4px_0_0_rgba(0,0,0,0.2)]"
            : "border-forest/15 bg-white shadow-[0_4px_0_0_rgba(19,59,38,0.12)]",
          small ? "h-12 w-12 p-1.5" : "h-14 w-14 p-2 sm:h-16 sm:w-16 sm:p-2.5",
        )}
      >
        {!imgError ? (
          <img
            src={SITE.logo}
            alt="Logo Vrtić Borići"
            loading="eager"
            decoding="async"
            onError={() => setImgError(true)}
            className="h-full w-full object-contain"
          />
        ) : (
          <span className="text-3xl leading-none">🌲</span>
        )}
      </span>
    </button>
  );
}

/* ---------------- scroll progress ---------------- */
export function ScrollProgress() {
  const [p, setP] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setP(h > 0 ? (window.scrollY / h) * 100 : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div className="fixed inset-x-0 top-0 z-[70] h-1.5 bg-forest/10">
      <div className="h-full rounded-r-full bg-gradient-to-r from-leaf via-sun to-coral" style={{ width: `${p}%` }} />
    </div>
  );
}

/* ---------------- pozadinske dekoracije ---------------- */
export function Decor() {
  const leaves = ["🌿", "🍃", "🌲", "🍂", "🌼"];
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className="absolute -top-24 -left-24 h-72 w-72 animate-blob rounded-[46%_54%_60%_40%/52%_44%_56%_48%] bg-leaf/15" />
      <div className="absolute top-1/3 -right-28 h-80 w-80 animate-blob rounded-[46%_54%_60%_40%/52%_44%_56%_48%] bg-sun/25 [animation-delay:-6s]" />
      <div className="absolute bottom-0 left-1/4 h-64 w-64 animate-blob rounded-[46%_54%_60%_40%/52%_44%_56%_48%] bg-sky/20 [animation-delay:-3s]" />
      <div className="absolute top-16 right-[12%] hidden animate-spin-slow text-4xl md:block">☀️</div>
      <div className="absolute top-40 left-[6%] hidden animate-sway text-3xl md:block">🦋</div>
      {leaves.map((l, i) => (
        <span
          key={i}
          className="absolute animate-fall text-xl opacity-60"
          style={{
            left: `${8 + i * 19}%`,
            animationDelay: `${i * 3.4}s`,
            animationDuration: `${14 + i * 2}s`,
          }}
        >
          {l}
        </span>
      ))}
    </div>
  );
}

/* ---------------- trag za mišem ---------------- */
export function LeafTrail() {
  useEffect(() => {
    if (window.matchMedia("(hover: none)").matches) return;
    let last = 0;
    const emojis = ["🌿", "🍃", "⭐", "🦋", "🌼"];
    const onMove = (e: MouseEvent) => {
      const now = performance.now();
      if (now - last < 170) return;
      last = now;
      if (document.querySelectorAll(".trail-bit").length > 10) return;
      const bit = document.createElement("span");
      bit.className = "trail-bit";
      bit.textContent = emojis[Math.floor(Math.random() * emojis.length)];
      bit.style.left = `${e.clientX}px`;
      bit.style.top = `${e.clientY}px`;
      document.body.appendChild(bit);
      window.setTimeout(() => bit.remove(), 1100);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);
  return null;
}

/* ---------------- header: meni centriran, padajuci meni bez rupa ---------------- */
export function Header({ route, go }: { route: string; go: (r: string) => void }) {
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    if (open) window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <header className="sticky top-0 z-[60] pt-1">
        <div className="hidden bg-forest-deep text-cream lg:block">
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-2 text-sm">
            <div className="flex items-center gap-5">
              <span className="flex items-center gap-1.5">
                📍 <span className="text-cream/90">{CONTACT.addressShort}</span>
              </span>
              <span className="flex items-center gap-1.5">
                🕖 <span className="text-cream/90">{CONTACT.hours}</span>
              </span>
            </div>
            <div className="flex items-center gap-4">
              <a href={CONTACT.phoneHref} className="flex items-center gap-1.5 font-bold transition-colors hover:text-sun">
                📞 {CONTACT.phone}
              </a>
              <span className="rounded-full bg-sun px-3 py-0.5 font-display font-extrabold text-forest-deep shadow-[0_2px_0_0_#eda61f]">
                + SUBVENCIJA GRADA
              </span>
            </div>
          </div>
        </div>

        <div
          className={cn(
            "transition-all duration-300",
            solid ? "bg-cream/95 shadow-[0_6px_0_0_rgba(19,59,38,0.08)] backdrop-blur" : "bg-cream/80 backdrop-blur-sm",
          )}
        >
          <div className="mx-auto flex max-w-7xl items-center px-3 py-2 sm:px-6 sm:py-2.5">
            <div className="flex flex-1 items-center">
              <Logo onClick={() => go("pocetna")} />
            </div>

            {/* desktop meni – centriran */}
            <nav className="hidden shrink-0 items-center gap-1 lg:flex">
              {NAV.map((n) => {
                const active = route === n.key || (n.children?.some((c) => c.key === route) ?? false);

                if (!n.children) {
                  return (
                    <button
                      key={n.key}
                      type="button"
                      onClick={() => go(n.key)}
                      className={cn(
                        "press group flex shrink-0 items-center gap-1.5 rounded-full px-3 py-2 font-display text-[15px] font-bold transition-all duration-200",
                        route === n.key
                          ? "bg-forest text-cream shadow-[0_4px_0_0_#133b26]"
                          : "text-forest-deep hover:bg-sun/40",
                      )}
                    >
                      <span
                        className={cn("text-base leading-none transition-transform", route !== n.key && "group-hover:-rotate-12")}
                      >
                        {n.emoji}
                      </span>
                      {n.label}
                    </button>
                  );
                }

                return (
                  <div key={n.key} className="group relative shrink-0">
                    <button
                      type="button"
                      onClick={() => go(n.key)}
                      className={cn(
                        "press flex items-center gap-1.5 rounded-full px-3 py-2 font-display text-[15px] font-bold transition-all duration-200",
                        active ? "bg-forest text-cream shadow-[0_4px_0_0_#133b26]" : "text-forest-deep hover:bg-sun/40",
                      )}
                    >
                      <span
                        className={cn("text-base leading-none transition-transform", !active && "group-hover:-rotate-12")}
                      >
                        {n.emoji}
                      </span>
                      {n.label}
                      <span className="text-[10px] transition-transform duration-300 group-hover:rotate-180">▼</span>
                    </button>

                    <div className="invisible absolute top-full left-1/2 z-50 w-60 -translate-x-1/2 opacity-0 transition-opacity duration-200 group-hover:visible group-hover:opacity-100">
                      <div className="pt-2">
                        <ul className="overflow-hidden rounded-2xl border-4 border-forest/10 bg-white p-2 shadow-[0_12px_0_0_rgba(19,59,38,0.12)]">
                          {n.children.map((c) => (
                            <li key={c.key}>
                              <button
                                type="button"
                                onClick={() => go(c.key)}
                                className={cn(
                                  "flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 font-display text-[15px] font-bold transition-all",
                                  route === c.key ? "bg-leaf text-white" : "text-forest-deep hover:bg-sun/30",
                                )}
                              >
                                <span className="text-base">{c.emoji}</span>
                                {c.label}
                              </button>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                );
              })}
            </nav>

            <div className="flex flex-1 shrink-0 items-center justify-end gap-2">
              <Btn href={CONTACT.phoneHref} size="sm" accent="sun" className="hidden sm:inline-flex lg:inline-flex" emoji="📞">
                Pozovite nas
              </Btn>
              <a
                href={CONTACT.phoneHref}
                aria-label="Pozovite vrtić Borići"
                className="press grid h-11 w-11 shrink-0 place-items-center rounded-2xl border-2 border-forest/15 bg-sun text-lg text-forest-deep shadow-[0_4px_0_0_#eda61f] sm:hidden"
              >
                📞
              </a>
              <button
                type="button"
                aria-label="Meni"
                onClick={() => setOpen(true)}
                className="press grid h-11 w-11 shrink-0 place-items-center rounded-2xl border-2 border-forest/15 bg-white text-forest shadow-[0_4px_0_0_rgba(19,59,38,0.14)] lg:hidden"
              >
                <span className="space-y-1">
                  <span className="block h-0.5 w-6 rounded-full bg-forest" />
                  <span className="block h-0.5 w-6 rounded-full bg-forest" />
                  <span className="block h-0.5 w-4 rounded-full bg-forest" />
                </span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* mobilni meni */}
      <div
        className={cn(
          "fixed inset-0 z-[80] bg-forest-deep/60 backdrop-blur-sm transition-opacity duration-300 lg:hidden",
          open ? "opacity-100" : "pointer-events-none opacity-0",
        )}
        onClick={() => setOpen(false)}
      >
        <div
          className={cn(
            "ml-auto h-full w-[88%] max-w-sm overflow-y-auto rounded-l-[2.5rem] bg-cream p-5 pb-10 transition-transform duration-400 ease-out",
            open ? "translate-x-0" : "translate-x-full",
          )}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between">
            <Logo
              small
              onClick={() => {
                go("pocetna");
                setOpen(false);
              }}
            />
            <button
              type="button"
              aria-label="Zatvori"
              onClick={() => setOpen(false)}
              className="press grid h-10 w-10 place-items-center rounded-full bg-coral text-lg font-bold text-white shadow-[0_4px_0_0_#e0512f]"
            >
              ✕
            </button>
          </div>

          <p className="mt-6 font-hand text-2xl text-leaf">Gde ćemo danas?</p>
          <nav className="mt-2 space-y-2">
            {NAV.map((n, i) => {
              const active = route === n.key;
              return (
                <div key={n.key} className={open ? "animate-pop" : ""} style={{ animationDelay: `${i * 35}ms` }}>
                  <button
                    type="button"
                    onClick={() => {
                      go(n.key);
                      setOpen(false);
                    }}
                    className={cn(
                      "flex w-full items-center gap-3 rounded-2xl border-2 px-4 py-3 text-left font-display text-lg font-bold transition-all",
                      active
                        ? "border-forest bg-forest text-cream shadow-[0_5px_0_0_#133b26]"
                        : "border-forest/10 bg-white text-forest-deep",
                    )}
                  >
                    <span className="text-2xl">{n.emoji}</span>
                    {n.label}
                    <span className="ml-auto text-lg opacity-40">{n.children ? "▾" : "›"}</span>
                  </button>

                  {n.children && (
                    <ul className="mt-1.5 ml-5 space-y-1.5 border-l-3 border-dashed border-leaf/60 pl-3">
                      {n.children.map((c) => {
                        const on = route === c.key;
                        return (
                          <li key={c.key}>
                            <button
                              type="button"
                              onClick={() => {
                                go(c.key);
                                setOpen(false);
                              }}
                              className={cn(
                                "flex w-full items-center gap-2.5 rounded-xl border-2 px-3 py-2 text-left font-display text-base font-bold transition-all",
                                on ? "border-leaf bg-leaf text-white" : "border-forest/10 bg-white text-forest-deep",
                              )}
                            >
                              <span>{c.emoji}</span>
                              {c.label}
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </div>
              );
            })}
          </nav>

          <div className="mt-6 space-y-2 rounded-3xl border-4 border-sun/60 bg-white p-4 text-sm">
            <p className="font-display text-lg font-bold text-forest-deep">Tu smo za vas 💛</p>
            <a href={CONTACT.phoneHref} className="block font-bold text-forest">
              📞 {CONTACT.phone}
            </a>
            <a href={`mailto:${CONTACT.email}`} className="block font-bold text-forest">
              ✉️ {CONTACT.email}
            </a>
            <p className="text-ink/70">📍 {CONTACT.address}</p>
          </div>
        </div>
      </div>
    </>
  );
}

/* ---------------- nazad na vrh ---------------- */
export function BackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <button
      type="button"
      aria-label="Nazad na vrh"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={cn(
        "press fixed right-4 bottom-4 z-[75] grid h-14 w-14 place-items-center rounded-full border-4 border-white bg-forest text-2xl shadow-[0_6px_0_0_#133b26] transition-all duration-300",
        show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-16 opacity-0",
      )}
    >
      🌲
      <span className="absolute inset-0 animate-ring rounded-full border-2 border-leaf" />
    </button>
  );
}

/* ---------------- footer (samo Instagram) ---------------- */
export function Footer({ go }: { go: (r: string) => void }) {
  return (
    <footer className="relative mt-20 overflow-hidden rounded-t-[3rem] bg-forest-deep text-cream">
      <div className="pointer-events-none absolute -top-16 left-1/2 hidden w-full max-w-6xl -translate-x-1/2 gap-3 px-6 md:flex">
        {["🌲", "🌳", "🌲", "🌳", "🌲", "🌳", "🌲"].map((t, i) => (
          <span key={i} className="animate-sway text-5xl" style={{ animationDelay: `${i * 0.4}s` }}>
            {t}
          </span>
        ))}
      </div>

      <div className="relative mx-auto max-w-7xl px-6 pt-24 pb-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Logo onClick={() => go("pocetna")} inverse />
            <p className="mt-4 text-sm text-cream/80 sm:text-base">
              Akreditovana predškolska ustanova u borovoj šumi na Petlovom brdu. Gradskoj deci vraćamo prirodu – a
              prirodu ponovo vraćamo deci.
            </p>
            <p className="mt-4 font-hand text-2xl text-sun">Zakažite posetu – čekamo vas u šumici!</p>
          </div>

          <div>
            <h4 className="font-display text-xl font-bold text-sun">navigacija</h4>
            <ul className="mt-4 space-y-2">
              {FOOTER_NAV.map((n) => (
                <li key={n.key}>
                  <button
                    type="button"
                    onClick={() => go(n.key)}
                    className="group flex items-center gap-2 text-cream/85 transition-colors hover:text-sun"
                  >
                    <span className="transition-transform group-hover:translate-x-1">🌿</span>
                    {n.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display text-xl font-bold text-sun">brzi linkovi</h4>
            <ul className="mt-4 space-y-2">
              {QUICK_COLUMNS.map((n) => (
                <li key={n.key}>
                  <button
                    type="button"
                    onClick={() => go(n.key)}
                    className="group flex items-center gap-2 text-cream/85 transition-colors hover:text-sun"
                  >
                    <span className="transition-transform group-hover:translate-x-1">🐾</span>
                    {n.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display text-xl font-bold text-sun">tu smo za vas</h4>
            <p className="mt-4 text-cream/80">Za sva Vaša pitanja, predloge i sugestije pišite nam ili nas pozovite!</p>
            <ul className="mt-4 space-y-2 text-cream/90">
              <li>
                <a href={CONTACT.phoneHref} className="font-bold transition-colors hover:text-sun">
                  📞 {CONTACT.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${CONTACT.email}`} className="font-bold transition-colors hover:text-sun">
                  ✉️ {CONTACT.email}
                </a>
              </li>
              <li>📍 {CONTACT.address}</li>
              <li>🕖 {CONTACT.hours}</li>
            </ul>
            <div className="mt-4">
              <p className="text-cream/75">Zapratite nas da vidite kako izgledaju naši dani u vrtiću Borići!</p>
              <div className="mt-3 flex items-center gap-3">
                <a
                  href={CONTACT.instagram}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Instagram – vrtic_borici"
                  title="Instagram"
                  className="press grid h-12 w-12 place-items-center rounded-2xl bg-white/10 text-xl transition hover:bg-gradient-to-br hover:from-[#f9ce34] hover:via-[#ee2a7b] hover:to-[#6228d7] hover:text-white"
                >
                  ◎
                </a>
                <span className="font-hand text-lg text-leaf-soft">@vrtic_borici</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-cream/15 pt-6 text-sm text-cream/70 sm:flex-row">
          <p>Copyright © 2026 Vrtić Borići. Created by Doca Design Studio</p>
          <p className="flex items-center gap-2">
            Napravljeno sa <span className="text-coral">♥</span> i mnogo blata na čizmama
          </p>
        </div>
      </div>
    </footer>
  );
}
