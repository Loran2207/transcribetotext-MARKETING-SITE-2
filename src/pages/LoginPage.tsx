import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";
import { Nav } from "../components/sections/Nav";
import { AppButton } from "../components/appui/button";
import { AppInput, AppLabel } from "../components/appui/input";
import { brand } from "../data/assets";
import { footer, login } from "../data/content";
import { fadeUp, stagger } from "../lib/motion";

function GoogleMark() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" className="shrink-0">
      <path fill="#4285F4" d="M16.51 8H8.98v3h4.3c-.18 1-.74 1.48-1.6 2.04v2.01h2.6a7.8 7.8 0 0 0 2.38-5.88c0-.57-.05-.66-.15-1.18z" />
      <path fill="#34A853" d="M8.98 17c2.16 0 3.97-.72 5.3-1.94l-2.6-2a4.8 4.8 0 0 1-7.18-2.54H1.83v2.07A8 8 0 0 0 8.98 17z" />
      <path fill="#FBBC05" d="M4.5 10.52a4.8 4.8 0 0 1 0-3.04V5.41H1.83a8 8 0 0 0 0 7.18z" />
      <path fill="#EA4335" d="M8.98 4.18c1.17 0 2.23.4 3.06 1.2l2.3-2.3A8 8 0 0 0 1.83 5.4L4.5 7.49a4.77 4.77 0 0 1 4.48-3.3z" />
    </svg>
  );
}

function MicrosoftMark() {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" className="shrink-0">
      <rect x="0" y="0" width="9.4" height="9.4" fill="#F25022" />
      <rect x="10.6" y="0" width="9.4" height="9.4" fill="#7FBA00" />
      <rect x="0" y="10.6" width="9.4" height="9.4" fill="#00A4EF" />
      <rect x="10.6" y="10.6" width="9.4" height="9.4" fill="#FFB900" />
    </svg>
  );
}

export function LoginPage() {
  const [params] = useSearchParams();
  const [mode, setMode] = useState<"signin" | "signup">(params.get("mode") === "signup" ? "signup" : "signin");
  const [showPassword, setShowPassword] = useState(false);
  const copy = mode === "signup" ? login.signup : login.signin;
  return (
    <div className="flex min-h-screen flex-col bg-canvas">
      <Nav />
      <main className="flex flex-1 flex-col items-center px-4 pb-20 pt-28">
        <motion.div variants={stagger(0.08)} initial="hidden" animate="show" className="flex w-full max-w-[460px] flex-col items-center">
          <motion.div variants={fadeUp} className="inline-flex h-10 items-center justify-center rounded-xl bg-[oklch(0.967_0.001_286.375)] p-[3px]">
            {(["signin", "signup"] as const).map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => setMode(m)}
                className={`inline-flex h-[calc(100%-1px)] items-center justify-center rounded-xl border border-transparent px-6 text-sm font-medium transition-[color,box-shadow] ${
                  mode === m ? "bg-white text-foreground shadow-[0_1px_2px_rgba(16,24,40,0.08)]" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {m === "signin" ? login.tabs.login : login.tabs.signup}
              </button>
            ))}
          </motion.div>
          <motion.div variants={fadeUp} className="mt-10 w-full max-w-[400px]">
            <h1 className="text-center text-2xl font-semibold text-foreground">{copy.title}</h1>
            <p className="mt-2 text-center text-sm text-muted-foreground">{copy.subtitle}</p>
            <div className="mt-6 flex flex-col gap-3">
              <AppButton variant="pill-dark" size="lg" className="w-full"><GoogleMark /> {login.google}</AppButton>
              <AppButton variant="pill-dark" size="lg" className="w-full"><MicrosoftMark /> {login.microsoft}</AppButton>
            </div>
            <div className="my-5 flex items-center gap-3">
              <div className="h-px flex-1 bg-border" />
              <span className="text-xs text-muted-foreground">{login.divider}</span>
              <div className="h-px flex-1 bg-border" />
            </div>
            <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <AppLabel htmlFor="email">{login.email.label}</AppLabel>
                <AppInput id="email" type="email" placeholder={login.email.placeholder} autoComplete="email" />
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <AppLabel htmlFor="password">{login.password.label}</AppLabel>
                  {mode === "signin" ? (
                    <button type="button" className="text-xs text-primary hover:underline">{login.signin.forgot}</button>
                  ) : null}
                </div>
                <div className="relative">
                  <AppInput id="password" type={showPassword ? "text" : "password"} placeholder={login.password.placeholder} autoComplete="current-password" className="pr-10" />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    tabIndex={-1}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
              <AppButton type="submit" size="lg" className="w-full">{copy.submit}</AppButton>
            </form>
            <p className="mt-5 text-center text-xs leading-relaxed text-muted-foreground">
              {login.terms.prefix}{" "}
              {login.terms.links.map((l, i) => (
                <span key={l}>
                  <a href="#" className="text-primary hover:underline">{l}</a>
                  {i < login.terms.links.length - 1 ? (i === login.terms.links.length - 2 ? " and " : ", ") : "."}
                </span>
              ))}
            </p>
            <p className="mt-2 text-center text-xs text-muted-foreground">
              {login.help.prefix}{" "}
              <a href={`mailto:${login.help.email}`} className="text-primary hover:underline">{login.help.email}</a>
            </p>
            <p className="mt-4 text-center text-sm text-muted-foreground">
              {copy.switchPrompt}{" "}
              <button
                type="button"
                onClick={() => setMode(mode === "signup" ? "signin" : "signup")}
                className="font-medium text-primary hover:underline"
              >
                {copy.switchAction}
              </button>
            </p>
          </motion.div>
        </motion.div>
      </main>
      <footer className="border-t border-border bg-tint-sky py-5">
        <div className="mx-auto flex w-full max-w-[1200px] items-center justify-between gap-6 px-6 md:px-10">
          <img src={brand.logo} alt="TranscribeToText.AI" className="h-6 w-auto" />
          <p className="text-sm text-ink-2">{footer.copyright}</p>
          <p className="text-xs text-muted">{footer.companyDetails}</p>
        </div>
      </footer>
    </div>
  );
}
