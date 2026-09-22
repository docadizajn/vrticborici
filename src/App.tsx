import { useCallback, useEffect, useState } from "react";
import { NAV } from "./data";
import { BackToTop, Decor, Footer, Header, LeafTrail, ScrollProgress } from "./components/Shell";
import Home from "./pages/Home";
import { AboutPage, StoryPage } from "./pages/About";
import WhyPage from "./pages/Why";
import Enrollment from "./pages/Enrollment";
import GalleryPage from "./pages/GalleryPage";
import TestimonialsPage from "./pages/TestimonialsPage";
import { CareersPage, ContactPage } from "./pages/ContactPage";

const VALID = NAV.flatMap((n) => [n.key, ...(n.children?.map((c) => c.key) ?? [])]);

function useHashRoute() {
  const read = () => {
    const raw = window.location.hash.replace(/^#\/?/, "");
    return VALID.includes(raw) ? raw : "pocetna";
  };
  const [route, setRoute] = useState(read);

  useEffect(() => {
    const onHash = () => setRoute(read());
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  const go = useCallback((next: string) => {
    if (window.location.hash === `#/${next}`) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    window.location.hash = `#/${next}`;
  }, []);

  return [route, go] as const;
}

export default function App() {
  const [route, go] = useHashRoute();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [route]);

  const pages: Record<string, React.ReactNode> = {
    pocetna: <Home go={go} />,
    "o-nama": <AboutPage go={go} />,
    "nasa-prica": <StoryPage go={go} />,
    "zasto-mi": <WhyPage go={go} />,
    "upis-i-cene": <Enrollment go={go} />,
    galerija: <GalleryPage go={go} />,
    "utisci-roditelja": <TestimonialsPage go={go} />,
    zaposlenje: <CareersPage go={go} />,
    kontakt: <ContactPage go={go} />,
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-cream">
      <Decor />
      <LeafTrail />
      <ScrollProgress />
      <div className="relative z-10">
        <Header route={route} go={go} />
        <main key={route} className="animate-rise">
          {pages[route] ?? <Home go={go} />}
        </main>
        <Footer go={go} />
      </div>
      <BackToTop />
    </div>
  );
}
