import { useEffect } from "react";
import { MotionConfig } from "framer-motion";
import { Routes, Route, useLocation } from "react-router-dom";
import { Landing } from "./pages/Landing";
import { SubscribePage } from "./pages/SubscribePage";
import { SkipOfferPage } from "./pages/SkipOfferPage";
import { LoginPage } from "./pages/LoginPage";
import { CookieConsent } from "./components/CookieConsent";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

export default function App() {
  // The cookie consent lives on the marketing pages; the paywall funnel
  // (/subscribe, /skip) keeps its fixed bottom CTA clear.
  const { pathname } = useLocation();
  const marketing = pathname === "/" || pathname === "/login";
  return (
    <MotionConfig reducedMotion="user">
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/subscribe" element={<SubscribePage />} />
        <Route path="/skip" element={<SkipOfferPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
      {marketing && <CookieConsent />}
    </MotionConfig>
  );
}
