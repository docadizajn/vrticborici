import { useEffect, useState } from "react";
import { GALLERY, photo, SITE } from "../data";
import { cn } from "../utils/cn";
import { CtaBand, PageHeader } from "../components/Blocks";
import { Btn, Chip, Reveal, SectionTitle } from "../components/ui";

export default function GalleryPage({ go }: { go: (r: string) => void }) {
  const [visible, setVisible] = useState(12);
  const [order, setOrder] = useState<string[]>(GALLERY);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [playing, setPlaying] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);

  const shown = order.slice(0, visible);

  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
      if (e.key === "ArrowRight") setLightbox((i) => ((i ?? 0) + 1) % order.length);
      if (e.key === "ArrowLeft") setLightbox((i) => ((i ?? 0) - 1 + order.length) % order.length);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [lightbox, order.length]);

  const shuffle = () => {
    setOrder((prev) => [...prev].sort(() => Math.random() - 0.5));
    setVisible(12);
  };

  return (
    <>
      <PageHeader
        emoji="📸"
        kicker="Galerija"
        title="Mesto gde se najlepše odrasta"
        lead="Kako izgledaju naši dani? Zaviri u našu šumu, dvorište i igraonice."
        go={go}
        accent="berry"
      />

      {/* video */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal>
          <div className="grid items-center gap-6 overflow-hidden rounded-[2.5rem] border-4 border-forest/10 bg-white p-5 sm:p-7 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="relative overflow-hidden rounded-[2rem] bg-forest-deep">
              {playing ? (
                <iframe
                  title="Vrtić Borići – video"
                  src={`${SITE.video}?autoplay=1&rel=0`}
                  className="aspect-video w-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <button type="button" onClick={() => setPlaying(true)} className="group relative block aspect-video w-full">
                  <img
                    src={photo("DSC00643-1")}
                    alt="Video iz vrtića Borići"
                    loading="lazy"
                    className="h-full w-full object-cover opacity-80 transition-transform duration-700 group-hover:scale-105"
                  />
                  <span className="absolute inset-0 grid place-items-center">
                    <span className="relative grid h-20 w-20 place-items-center rounded-full bg-sun text-3xl shadow-[0_8px_0_0_#eda61f] transition-transform duration-300 group-hover:scale-110">
                      ▶
                      <span className="absolute inset-0 animate-ring rounded-full border-4 border-sun" />
                    </span>
                  </span>
                  <span className="absolute bottom-4 left-4 rounded-full bg-forest-deep/80 px-4 py-1.5 font-display font-bold text-cream">
                    🎬 Video · Naš dan u šumi
                  </span>
                </button>
              )}
            </div>
            <div>
              <Chip accent="sun">🎬 Video</Chip>
              <h2 className="mt-3 font-display text-2xl font-extrabold text-forest-deep sm:text-3xl">
                U susret budućnosti sa više mogućnosti
              </h2>
              <p className="mt-3 text-ink/75">
                Pogledajte kratak snimak iz našeg dvorišta – borova šuma, zelena učionica, muzika i igra u kojoj deca
                uče najviše.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <Btn accent="coral" emoji="📅" onClick={() => go("kontakt")}>
                  Zakažite posetu
                </Btn>
                <Btn accent="forest" variant="white" emoji="📸" onClick={shuffle}>
                  Promešaj fotografije
                </Btn>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* mreža fotografija */}
      <section className="mx-auto mt-16 max-w-7xl px-4 sm:px-6">
        <SectionTitle
          kicker="Fotografije"
          title="Delić atmosfere unutar vrtića"
          sub="Klikni na fotografiju za punu veličinu. Koristi strelice ← → na tastaturi."
          accent="leaf"
        />

        <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {shown.map((g, i) => (
            <Reveal key={g} delay={(i % 4) * 60}>
              <button
                type="button"
                onClick={() => setLightbox(i)}
                className="group relative block w-full overflow-hidden rounded-2xl border-3 border-white shadow-[0_8px_0_0_rgba(19,59,38,0.12)] transition-transform duration-300 hover:-translate-y-1.5 sm:rounded-3xl sm:border-4 sm:shadow-[0_10px_0_0_rgba(19,59,38,0.12)]"
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

        {visible < order.length && (
          <div className="mt-10 text-center">
            <Btn accent="leaf" size="lg" emoji="🌿" onClick={() => setVisible((v) => v + 12)}>
              Prikaži još fotografija ({order.length - visible})
            </Btn>
          </div>
        )}
      </section>

      {/* lightbox */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-[95] flex items-center justify-center bg-forest-deep/90 p-3 backdrop-blur-sm sm:p-6"
          onClick={() => setLightbox(null)}
          onTouchStart={(e) => setTouchStart(e.targetTouches[0].clientX)}
          onTouchEnd={(e) => {
            if (touchStart === null) return;
            const diff = touchStart - e.changedTouches[0].clientX;
            if (diff > 45) setLightbox((i) => ((i ?? 0) + 1) % order.length);
            if (diff < -45) setLightbox((i) => ((i ?? 0) - 1 + order.length) % order.length);
            setTouchStart(null);
          }}
        >
          <button
            type="button"
            aria-label="Zatvori"
            onClick={() => setLightbox(null)}
            className="press absolute top-3 right-3 z-20 grid h-11 w-11 place-items-center rounded-full bg-cream text-xl font-bold text-forest-deep shadow-lg sm:top-5 sm:right-5 sm:h-12 sm:w-12"
          >
            ✕
          </button>
          <button
            type="button"
            aria-label="Prethodna"
            onClick={(e) => {
              e.stopPropagation();
              setLightbox((i) => ((i ?? 0) - 1 + order.length) % order.length);
            }}
            className="press absolute left-2 z-20 grid h-11 w-11 place-items-center rounded-full bg-cream text-2xl font-bold text-forest-deep shadow-lg sm:left-6 sm:h-12 sm:w-12"
          >
            ‹
          </button>
          <figure
            className="animate-pop max-h-full w-full max-w-3xl px-12 sm:px-16"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={photo(order[lightbox])}
              alt="Fotografija iz vrtića Borići"
              className="mx-auto max-h-[72vh] w-auto rounded-2xl border-3 border-cream object-contain shadow-2xl sm:max-h-[76vh] sm:rounded-[2rem] sm:border-4"
            />
            <figcaption className="mt-3 text-center font-display text-sm font-bold text-cream sm:mt-4 sm:text-lg">
              🌲 Vrtić Borići · {lightbox + 1} / {order.length}
              <span className="block text-xs font-normal text-cream/75 sm:hidden">prevuci prstom levo / desno</span>
            </figcaption>
          </figure>
          <button
            type="button"
            aria-label="Sledeća"
            onClick={(e) => {
              e.stopPropagation();
              setLightbox((i) => ((i ?? 0) + 1) % order.length);
            }}
            className="press absolute right-2 z-20 grid h-11 w-11 place-items-center rounded-full bg-cream text-2xl font-bold text-forest-deep shadow-lg sm:right-6 sm:h-12 sm:w-12"
          >
            ›
          </button>
        </div>
      )}

      <CtaBand go={go} />
    </>
  );
}
