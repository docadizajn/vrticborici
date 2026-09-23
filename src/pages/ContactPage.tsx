import { useState } from "react";
import { CAREERS, CONTACT, PACKAGES, photo } from "../data";
import { cn } from "../utils/cn";
import { CtaBand, PageHeader } from "../components/Blocks";
import { Btn, Chip, Reveal, SectionTitle, fireConfetti } from "../components/ui";

const inputCls =
  "w-full rounded-2xl border-3 border-forest/10 bg-cream px-4 py-3 font-body text-base text-ink outline-none transition-colors focus:border-leaf focus:bg-white sm:border-4";

function Toast({ text }: { text: string | null }) {
  return (
    <div
      className={cn(
        "pointer-events-none fixed left-1/2 z-[95] max-w-[90vw] -translate-x-1/2 rounded-full bg-forest px-5 py-2.5 text-center font-display text-sm font-bold text-cream shadow-[0_6px_0_0_#133b26] transition-all duration-300 sm:py-3 sm:text-base",
        text ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0",
      )}
    >
      {text}
    </div>
  );
}

export function ContactPage({ go }: { go: (r: string) => void }) {
  const [toast, setToast] = useState<string | null>(null);
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", child: "", message: "" });
  const [errors, setErrors] = useState<Record<string, boolean>>({});

  const copy = async (value: string, label: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setToast(`${label} kopiran! 📋`);
    } catch {
      setToast(`${label}: ${value}`);
    }
    window.setTimeout(() => setToast(null), 2200);
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const next: Record<string, boolean> = {};
    if (!form.name.trim()) next.name = true;
    if (!/^\S+@\S+\.\S+$/.test(form.email)) next.email = true;
    if (!form.message.trim()) next.message = true;
    setErrors(next);
    if (Object.keys(next).length) {
      setToast("Još samo par polja 🙂");
      window.setTimeout(() => setToast(null), 2200);
      return;
    }
    fireConfetti(70);
    setSent(true);
    setForm({ name: "", email: "", phone: "", child: "", message: "" });
    window.setTimeout(() => setSent(false), 6000);
  };

  const cards = [
    { emoji: "📍", title: "Adresa", value: CONTACT.address, action: () => copy(CONTACT.address, "Adresa") },
    { emoji: "📞", title: "Kontakt", value: CONTACT.phone, action: () => copy(CONTACT.phone, "Telefon") },
    { emoji: "✉️", title: "E-mail", value: CONTACT.email, action: () => copy(CONTACT.email, "E-mail") },
    { emoji: "🕖", title: "Radno vreme", value: CONTACT.hours, action: () => copy(CONTACT.hours, "Radno vreme") },
  ];

  return (
    <>
      <PageHeader
        emoji="📞"
        kicker="Kontakt"
        title="Dobrodošli u naš vrtić"
        lead="Radujemo se da vas upoznamo! Tu smo za sva Vaša pitanja – pišite nam ili nas pozovite."
        go={go}
        accent="sky"
      />

      <section className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((c, i) => (
            <Reveal key={c.title} delay={i * 80}>
              <button
                type="button"
                onClick={c.action}
                className="press group h-full w-full rounded-[2rem] border-4 border-forest/10 bg-white p-6 text-left transition-all hover:-translate-y-1.5 hover:border-sky/60"
              >
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-sky/15 text-2xl">{c.emoji}</span>
                <p className="mt-3 font-display text-sm font-bold tracking-widest text-forest/60 uppercase">{c.title}</p>
                <p className="mt-1 break-words font-bold text-forest-deep">{c.value}</p>
                <p className="mt-2 text-xs font-semibold text-ink/50 opacity-0 transition-opacity group-hover:opacity-100">
                  klikni da kopiraš 📋
                </p>
              </button>
            </Reveal>
          ))}
        </div>

        <div className="mt-10 grid items-start gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <Reveal className="w-full min-w-0">
            <form
              onSubmit={submit}
              className="w-full rounded-[2rem] border-3 border-forest/10 bg-white p-5 shadow-[0_10px_0_0_rgba(19,59,38,0.1)] sm:rounded-[2.5rem] sm:border-4 sm:p-7"
            >
              <Chip accent="leaf">📅 Zakažite posetu već danas</Chip>
              <h2 className="mt-3 font-display text-2xl font-extrabold text-forest-deep sm:text-3xl">
                Popričajmo o vašem mališanu
              </h2>
              <p className="mt-2 text-ink/70">Popunite formu i javljamo vam se u najkraćem roku – obično istog dana.</p>

              {sent && (
                <p className="mt-4 animate-pop rounded-2xl border-4 border-leaf bg-leaf/10 px-4 py-3 font-display font-bold text-forest">
                  🎉 Hvala! Vaša poruka je poslata – čekamo vas u šumici!
                </p>
              )}

              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="font-display text-sm font-bold text-forest-deep">Ime i prezime *</span>
                  <input
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="npr. Jovana Jovanović"
                    className={cn(inputCls, "mt-1", errors.name && "border-coral")}
                  />
                </label>
                <label className="block">
                  <span className="font-display text-sm font-bold text-forest-deep">E-mail *</span>
                  <input
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="ime@primer.rs"
                    className={cn(inputCls, "mt-1", errors.email && "border-coral")}
                  />
                </label>
                <label className="block">
                  <span className="font-display text-sm font-bold text-forest-deep">Telefon</span>
                  <input
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="06x xxx xxxx"
                    className={cn(inputCls, "mt-1")}
                  />
                </label>
                <label className="block">
                  <span className="font-display text-sm font-bold text-forest-deep">Uzrast deteta</span>
                  <select
                    value={form.child}
                    onChange={(e) => setForm({ ...form, child: e.target.value })}
                    className={cn(inputCls, "mt-1")}
                  >
                    <option value="">Izaberite</option>
                    {PACKAGES.map((p) => (
                      <option key={p.key} value={p.name}>
                        {p.name} ({p.ageLabel})
                      </option>
                    ))}
                    <option value="drugo">Još nije rođeno / drugo</option>
                  </select>
                </label>
              </div>

              <label className="mt-4 block">
                <span className="font-display text-sm font-bold text-forest-deep">Poruka *</span>
                <textarea
                  rows={4}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Kada biste želeli da nas posetite i šta vas najviše zanima?"
                  className={cn(inputCls, "mt-1 resize-none", errors.message && "border-coral")}
                />
              </label>

              <div className="mt-5 flex flex-wrap items-center gap-3">
                <Btn accent="coral" size="lg" emoji="🚀" type="submit">
                  Pošalji poruku
                </Btn>
                <span className="font-hand text-2xl text-leaf">odgovaramo istog dana 💌</span>
              </div>
            </form>
          </Reveal>

          <div className="min-w-0 space-y-6">
            <Reveal delay={100}>
              <div className="rounded-[2rem] border-3 border-forest/10 bg-white p-5 sm:rounded-[2.5rem] sm:border-4 sm:p-7">
                <h3 className="font-display text-2xl font-extrabold text-forest-deep">Kako da nas nađete 🚗</h3>
                <ul className="mt-4 space-y-3 text-ink/80">
                  <li className="flex gap-3">
                    <span>🧭</span> {CONTACT.directions}
                  </li>
                  <li className="flex gap-3">
                    <span>🅿️</span> {CONTACT.parking}
                  </li>
                  <li className="flex gap-3">
                    <span>🚌</span> {CONTACT.transport}
                  </li>
                </ul>
                <div className="mt-5 flex flex-wrap gap-3">
                  <Btn href={CONTACT.map} target="_blank" accent="sky" emoji="🗺️">
                    Otvori mapu
                  </Btn>
                  <Btn href={CONTACT.instagram} target="_blank" accent="coral" variant="white" emoji="📱">
                    Zaprati nas
                  </Btn>
                </div>
              </div>
            </Reveal>

            <Reveal delay={160}>
              <div className="overflow-hidden rounded-[2.5rem] border-4 border-forest/10">
                <iframe
                  title="Mapa – Vrtić Borići"
                  src={CONTACT.mapEmbed}
                  loading="lazy"
                  className="h-72 w-full border-0"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </Reveal>

            <Reveal delay={200}>
              <img
                src={photo("DSC00647")}
                alt="Ulaz u vrtić Borići"
                loading="lazy"
                className="h-56 w-full rounded-[2.5rem] border-4 border-white object-cover shadow-[0_12px_0_0_rgba(19,59,38,0.12)]"
              />
            </Reveal>
          </div>
        </div>
      </section>

      <Toast text={toast} />
      <CtaBand go={go} />
    </>
  );
}

export function CareersPage({ go }: { go: (r: string) => void }) {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", role: "vaspitač", note: "" });
  const [error, setError] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !/^\S+@\S+\.\S+$/.test(form.email)) {
      setError(true);
      return;
    }
    setError(false);
    fireConfetti(70);
    setSent(true);
  };

  return (
    <>
      <PageHeader emoji="🧑‍🏫" kicker="Zaposlenje" title="Postani deo Borići tima" lead={CAREERS.lead} go={go} accent="leaf" />

      <section className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="space-y-5 text-lg text-ink/80">
            <Reveal>
              <p>{CAREERS.intro}</p>
            </Reveal>
            <Reveal delay={90}>
              <p className="rounded-[2rem] border-4 border-coral/50 bg-coral/10 p-6 font-display font-bold text-forest-deep">
                {CAREERS.honest}
              </p>
            </Reveal>
            {[CAREERS.vision, CAREERS.mission].map((b, i) => (
              <Reveal key={b.title} delay={140 + i * 80}>
                <div className="rounded-[2rem] border-4 border-forest/10 bg-white p-6">
                  <h3 className="font-display text-2xl font-extrabold text-forest-deep">{b.title}</h3>
                  <p className="mt-3 text-ink/80">{b.text}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={120}>
            <form
              onSubmit={submit}
              className="rounded-[2.5rem] border-4 border-forest/10 bg-white p-5 shadow-[0_12px_0_0_rgba(19,59,38,0.1)] sm:p-7"
            >
              <Chip accent="coral">💌 Prijava za posao</Chip>
              <h2 className="mt-3 font-display text-2xl font-extrabold text-forest-deep sm:text-3xl">
                Pošalji nam svoju prijavu
              </h2>
              <p className="mt-2 text-ink/70">
                Uz prijavu nam napiši i dve rečenice o tome šta bi u vrtiću promenio/la da možeš.
              </p>

              {sent ? (
                <div className="mt-5 animate-pop rounded-2xl border-4 border-leaf bg-leaf/10 px-4 py-5">
                  <p className="font-display text-xl font-extrabold text-forest">
                    🎉 Hvala, {form.name.split(" ")[0]}! Prijava je poslata.
                  </p>
                  <p className="mt-2 text-ink/75">
                    Javljamo ti se u najkraćem roku – do tada, držimo fige! Ako želiš da nas upoznaš lično, slobodno nas
                    pozovi na {CONTACT.phone}.
                  </p>
                </div>
              ) : (
                <div className="mt-5 space-y-4">
                  <label className="block">
                    <span className="font-display text-sm font-bold text-forest-deep">Ime i prezime *</span>
                    <input
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="npr. Milica Petrović"
                      className={cn(inputCls, "mt-1", error && !form.name && "border-coral")}
                    />
                  </label>
                  <label className="block">
                    <span className="font-display text-sm font-bold text-forest-deep">E-mail *</span>
                    <input
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="ime@primer.rs"
                      className={cn(inputCls, "mt-1", error && !/^\S+@\S+\.\S+$/.test(form.email) && "border-coral")}
                    />
                  </label>
                  <label className="block">
                    <span className="font-display text-sm font-bold text-forest-deep">Pozicija</span>
                    <select
                      value={form.role}
                      onChange={(e) => setForm({ ...form, role: e.target.value })}
                      className={cn(inputCls, "mt-1")}
                    >
                      <option value="vaspitač">Vaspitač</option>
                      <option value="nastavnik muzike">Nastavnik muzike (klavir)</option>
                      <option value="logoped">Logoped</option>
                      <option value="saradnik">Saradnik / animator za rođendane</option>
                    </select>
                  </label>
                  <label className="block">
                    <span className="font-display text-sm font-bold text-forest-deep">Kratko o tebi</span>
                    <textarea
                      rows={4}
                      value={form.note}
                      onChange={(e) => setForm({ ...form, note: e.target.value })}
                      placeholder="Tvoj entuzijazam, iskustvo i ideje…"
                      className={cn(inputCls, "mt-1 resize-none")}
                    />
                  </label>
                  {error && (
                    <p className="rounded-2xl border-4 border-coral bg-coral/10 px-4 py-2 font-bold text-coral-deep">
                      Molimo unesite ime i ispravan e-mail 🙂
                    </p>
                  )}
                  <Btn accent="coral" size="lg" emoji="🚀" type="submit">
                    Pošalji prijavu
                  </Btn>
                </div>
              )}
            </form>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto mt-20 max-w-7xl px-4 sm:px-6">
        <SectionTitle
          kicker="Naš tim"
          title="Ljudi koji svakog dana stvaraju Boriće"
          sub="Strastveni, kreativni i spremni da detinjstvo vrate u prirodu."
          accent="berry"
        />
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { emoji: "👩‍🏫", t: "Vaspitači", d: "Mala grupa = puna pažnja svakom detetu." },
            { emoji: "🎹", t: "Nastavnik muzike", d: "Klavir, pesma i ritam svake nedelje." },
            { emoji: "🗣️", t: "Logoped", d: "Govor i komunikacija u fokusu." },
            { emoji: "🩺", t: "Pedijatar", d: "Redovna briga o zdravlju mališana." },
          ].map((x, i) => (
            <Reveal key={x.t} delay={i * 80}>
              <div className="h-full rounded-[2rem] border-4 border-forest/10 bg-white p-6 transition-transform duration-300 hover:-translate-y-1.5">
                <span className="text-4xl">{x.emoji}</span>
                <h3 className="mt-3 font-display text-xl font-extrabold text-forest-deep">{x.t}</h3>
                <p className="mt-1 text-sm text-ink/70">{x.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <CtaBand go={go} />
    </>
  );
}
