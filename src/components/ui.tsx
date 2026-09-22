import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import { cn } from "../utils/cn";

/* ---------- accent system ---------- */
export type Accent = "leaf" | "coral" | "sun" | "sky" | "berry" | "forest";

export const ACCENT: Record<
  Accent,
  { bg: string; soft: string; text: string; ring: string; chip: string }
> = {
  leaf: {
    bg: "bg-leaf",
    soft: "bg-leaf/12",
    text: "text-forest",
    ring: "shadow-[0_10px_0_0_#2c7d3f]",
    chip: "bg-leaf/15 text-forest",
  },
  coral: {
    bg: "bg-coral",
    soft: "bg-coral/12",
    text: "text-coral-deep",
    ring: "shadow-[0_10px_0_0_#e0512f]",
    chip: "bg-coral/15 text-coral-deep",
  },
  sun: {
    bg: "bg-sun",
    soft: "bg-sun/20",
    text: "text-sun-deep",
    ring: "shadow-[0_10px_0_0_#eda61f]",
    chip: "bg-sun/25 text-sun-deep",
  },
  sky: {
    bg: "bg-sky",
    soft: "bg-sky/15",
    text: "text-[#2a7fa3]",
    ring: "shadow-[0_10px_0_0_#2a7fa3]",
    chip: "bg-sky/20 text-[#2a7fa3]",
  },
  berry: {
    bg: "bg-berry",
    soft: "bg-berry/12",
    text: "text-[#8d4baf]",
    ring: "shadow-[0_10px_0_0_#8d4baf]",
    chip: "bg-berry/15 text-[#8d4baf]",
  },
  forest: {
    bg: "bg-forest",
    soft: "bg-forest/10",
    text: "text-forest",
    ring: "shadow-[0_10px_0_0_#133b26]",
    chip: "bg-forest/10 text-forest",
  },
};

/* ---------- scroll reveal ---------- */
export function Reveal({
  children,
  delay = 0,
  className,
  as: Tag = "div",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "li" | "section" | "article";
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setSeen(true);
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -30px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={ref as never}
      className={cn("reveal h-full", seen && "is-in", className)}
      style={{ transitionDelay: `${delay}ms` } as CSSProperties}
    >
      {children}
    </Tag>
  );
}

/* ---------- count up ---------- */
export function CountUp({ to, suffix = "", duration = 1400 }: { to: number; suffix?: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const [value, setValue] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const p = Math.min(1, (now - start) / duration);
          const eased = 1 - Math.pow(1 - p, 3);
          setValue(Math.round(to * eased));
          if (p < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [to, duration]);

  return (
    <span ref={ref}>
      {value}
      {suffix}
    </span>
  );
}

/* ---------- confetti ---------- */
const CONFETTI_COLORS = ["#ffc94a", "#ff7a5a", "#55b64a", "#63c4e8", "#b671d6", "#ffffff"];

export function fireConfetti(count = 60) {
  if (typeof document === "undefined") return;
  for (let i = 0; i < count; i++) {
    const piece = document.createElement("i");
    piece.className = "confetti-piece";
    piece.style.background = CONFETTI_COLORS[i % CONFETTI_COLORS.length];
    piece.style.left = `${Math.random() * 100}vw`;
    piece.style.animationDelay = `${Math.random() * 0.5}s`;
    piece.style.animationDuration = `${1.8 + Math.random() * 1.6}s`;
    if (i % 3 === 0) piece.style.borderRadius = "50%";
    document.body.appendChild(piece);
    window.setTimeout(() => piece.remove(), 4200);
  }
}

/* ---------- buttons ---------- */
export function Btn({
  children,
  onClick,
  href,
  accent = "forest",
  size = "md",
  variant = "solid",
  className,
  emoji,
  target,
  ariaLabel,
  type = "button",
}: {
  children: ReactNode;
  onClick?: () => void;
  href?: string;
  accent?: Accent;
  size?: "sm" | "md" | "lg";
  variant?: "solid" | "ghost" | "white";
  className?: string;
  emoji?: string;
  target?: string;
  ariaLabel?: string;
  type?: "button" | "submit";
}) {
  const a = ACCENT[accent];
  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-5 py-2.5 text-[15px]",
    lg: "px-7 py-3.5 text-lg",
  }[size];

  const styles = cn(
    "press inline-flex items-center justify-center gap-2 rounded-full font-display font-bold tracking-wide",
    sizes,
    variant === "solid" && cn(a.bg, "text-white", a.ring),
    variant === "white" && cn("bg-white", a.text, "border-2", "shadow-[0_6px_0_0_rgba(19,59,38,0.14)]"),
    variant === "ghost" && cn(a.text, "border-2", "bg-white/60"),
    className,
  );

  const inner = (
    <>
      {emoji && <span className="text-[1.15em] leading-none transition-transform duration-300 group-hover:rotate-12">{emoji}</span>}
      <span>{children}</span>
    </>
  );

  if (href)
    return (
      <a href={href} target={target} rel={target ? "noreferrer" : undefined} aria-label={ariaLabel} className={cn("group", styles)}>
        {inner}
      </a>
    );
  return (
    <button type={type} aria-label={ariaLabel} onClick={onClick} className={cn("group", styles)}>
      {inner}
    </button>
  );
}

/* ---------- section heading ---------- */
export function SectionTitle({
  kicker,
  title,
  sub,
  accent = "forest",
}: {
  kicker?: string;
  title: ReactNode;
  sub?: ReactNode;
  accent?: Accent;
}) {
  const a = ACCENT[accent];
  return (
    <div className="mx-auto max-w-3xl text-center">
      {kicker && (
        <Reveal>
          <span
            className={cn(
              "inline-flex items-center gap-2 rounded-full px-4 py-1.5 font-display text-sm font-bold tracking-[0.18em] uppercase",
              a.chip,
            )}
          >
            {kicker}
          </span>
        </Reveal>
      )}
      <Reveal delay={80}>
        <h2 className="mt-4 text-3xl leading-[1.1] font-extrabold text-forest-deep sm:text-4xl lg:text-5xl">{title}</h2>
      </Reveal>
      {sub && (
        <Reveal delay={160}>
          <p className="mt-4 text-lg text-ink/75">{sub}</p>
        </Reveal>
      )}
    </div>
  );
}

/* ---------- tilt / 3d card ---------- */
export function Tilt({
  children,
  className,
  strength = 8,
}: {
  children: ReactNode;
  className?: string;
  strength?: number;
}) {
  const ref = useRef<HTMLDivElement | null>(null);

  const move = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(900px) rotateY(${px * strength}deg) rotateX(${-py * strength}deg) translateY(-6px)`;
  };
  const leave = () => {
    const el = ref.current;
    if (el) el.style.transform = "";
  };

  return (
    <div ref={ref} onMouseMove={move} onMouseLeave={leave} className={cn("card-3d h-full", className)}>
      {children}
    </div>
  );
}

/* ---------- chip ---------- */
export function Chip({ children, accent = "leaf" }: { children: ReactNode; accent?: Accent }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1 font-display text-sm font-bold",
        ACCENT[accent].chip,
      )}
    >
      {children}
    </span>
  );
}

/* ---------- decorative blob ---------- */
export function Blob({ className, accent = "sun" }: { className?: string; accent?: Accent }) {
  const map: Record<Accent, string> = {
    leaf: "bg-leaf/20",
    coral: "bg-coral/20",
    sun: "bg-sun/30",
    sky: "bg-sky/25",
    berry: "bg-berry/20",
    forest: "bg-forest/10",
  };
  return <div aria-hidden className={cn("pointer-events-none absolute animate-blob", map[accent], className)} />;
}
