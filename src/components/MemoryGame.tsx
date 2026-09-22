import { useEffect, useMemo, useState } from "react";
import { MEMORY_PAIRS } from "../data";
import { cn } from "../utils/cn";
import { Btn, fireConfetti } from "./ui";

type Card = { id: number; pair: number; emoji: string; label: string };

function buildDeck(): Card[] {
  const cards: Omit<Card, "id">[] = MEMORY_PAIRS.flatMap((p) => [
    { pair: MEMORY_PAIRS.indexOf(p), emoji: p.emoji, label: p.label },
    { pair: MEMORY_PAIRS.indexOf(p), emoji: p.emoji, label: p.label },
  ]);

  for (let i = cards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cards[i], cards[j]] = [cards[j], cards[i]];
  }
  return cards.map((c, id) => ({ ...c, id }));
}

export default function MemoryGame() {
  const [deck, setDeck] = useState<Card[]>(() => buildDeck());
  const [flipped, setFlipped] = useState<number[]>([]);
  const [matched, setMatched] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [best, setBest] = useState<number | null>(null);

  const solved = matched.length === deck.length && deck.length > 0;
  const pairsFound = useMemo(() => matched.length / 2, [matched.length]);

  useEffect(() => {
    if (flipped.length !== 2) return;
    const [a, b] = flipped;
    const isPair = deck[a].pair === deck[b].pair;
    const timer = window.setTimeout(
      () => {
        if (isPair) setMatched((m) => [...m, a, b]);
        setMoves((m) => m + 1);
        setFlipped([]);
      },
      isPair ? 420 : 780,
    );
    return () => window.clearTimeout(timer);
  }, [flipped, deck]);

  useEffect(() => {
    if (!solved) return;
    fireConfetti(70);
    setBest((b) => (b === null ? moves : Math.min(b, moves)));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [solved]);

  const flip = (i: number) => {
    if (flipped.length === 2 || flipped.includes(i) || matched.includes(i)) return;
    setFlipped((f) => [...f, i]);
  };

  const reset = () => {
    setDeck(buildDeck());
    setFlipped([]);
    setMatched([]);
    setMoves(0);
  };

  return (
    <div className="relative overflow-hidden rounded-[2rem] border-3 border-forest/10 bg-white p-4 shadow-[0_12px_0_0_rgba(19,59,38,0.1)] sm:rounded-[2.5rem] sm:border-4 sm:p-7">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="font-hand text-xl text-coral sm:text-2xl">Igraonica Borići 🎈</p>
          <h3 className="font-display text-xl font-extrabold text-forest-deep sm:text-2xl md:text-3xl">
            Zapamti parove iz šume
          </h3>
          <p className="mt-1 text-xs text-ink/70 sm:text-sm md:text-base">
            Okreni kartice i nađi iste sličice – baš kao što naši mališani igraju napolju.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-1.5 text-xs font-bold sm:gap-2 sm:text-sm">
          <span className="rounded-full bg-leaf/15 px-2.5 py-1 text-forest">Poteza: {moves}</span>
          <span className="rounded-full bg-sun/30 px-2.5 py-1 text-sun-deep">Parova: {pairsFound}/6</span>
          {best !== null && <span className="rounded-full bg-coral/15 px-2.5 py-1 text-coral-deep">Rekord: {best}</span>}
        </div>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2 sm:mt-5 sm:grid-cols-4 sm:gap-3">
        {deck.map((card, i) => {
          const isOpen = flipped.includes(i) || matched.includes(i);
          const done = matched.includes(i);
          return (
            <button
              key={`${card.id}-${i}`}
              type="button"
              aria-label={isOpen ? card.label : "Skrivena kartica"}
              onClick={() => flip(i)}
              className="group relative h-20 [perspective:800px] sm:h-24 md:h-28"
            >
              <span
                className={cn(
                  "absolute inset-0 grid place-items-center rounded-2xl border-4 transition-all duration-300 [transform-style:preserve-3d]",
                  isOpen ? "[transform:rotateY(180deg)]" : "[transform:rotateY(0deg)]",
                )}
              >
                <span
                  className={cn(
                    "absolute inset-0 grid place-items-center rounded-2xl border-4 border-forest/15 bg-gradient-to-br from-forest to-forest-deep text-2xl text-sun [backface-visibility:hidden] sm:text-3xl",
                    !isOpen && "group-hover:-rotate-2 group-hover:scale-[1.03]",
                  )}
                >
                  🌲
                </span>
                <span
                  className={cn(
                    "absolute inset-0 grid place-items-center rounded-2xl border-4 text-3xl [backface-visibility:hidden] [transform:rotateY(180deg)] sm:text-4xl",
                    done ? "border-leaf bg-leaf/15" : "border-sun/70 bg-cream",
                  )}
                >
                  <span className={cn(done && "animate-pop")}>{card.emoji}</span>
                </span>
              </span>
            </button>
          );
        })}
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
        <Btn onClick={reset} accent="sun" emoji="🔀">
          Promešaj ponovo
        </Btn>
        {solved && (
          <p className="animate-pop font-display text-lg font-bold text-forest sm:text-xl">
            🎉 Bravo! Pronašli ste sve parove u {moves} poteza!
          </p>
        )}
      </div>
    </div>
  );
}
