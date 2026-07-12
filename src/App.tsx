import { useEffect } from "react";
import { MotionConfig } from "framer-motion";
import { Routes, Route, useLocation } from "react-router-dom";
import { Landing } from "./pages/Landing";
import { SubscribePage } from "./pages/SubscribePage";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/subscribe" element={<SubscribePage />} />
      </Routes>
    </MotionConfig>
  );
}
