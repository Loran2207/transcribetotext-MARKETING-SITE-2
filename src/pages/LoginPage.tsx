import { useState } from "react";
import type { FormEvent, ReactNode } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle2, Eye, EyeOff } from "lucide-react";
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

type View = "form" | "reset" | "reset-sent" | "newpass" | "newpass-done";
type Err = "email-empty" | "email-notfound" | "password-empty" | "password-wrong" | "mismatch";

const ERROR_INPUT = "border-destructive! focus-visible:border-destructive! focus-visible:ring-destructive/15!";

function FieldError({ children }: { children: ReactNode }) {
  return <p className="text-[13px] leading-snug text-destructive">{children}</p>;
}

function OauthStack() {
  return (
    <>
      <div className="mt-6 flex flex-col gap-3">
        <AppButton variant="pill-dark" size="lg" className="w-full min-h-11 lg:min-h-10"><GoogleMark /> {login.google}</AppButton>
        <AppButton variant="pill-dark" size="lg" className="w-full min-h-11 lg:min-h-10"><MicrosoftMark /> {login.microsoft}</AppButton>
      </div>
      <div className="my-5 flex items-center gap-3">
        <div className="h-px flex-1 bg-border" />
        <span className="text-xs text-muted-foreground">{login.divider}</span>
        <div className="h-px flex-1 bg-border" />
      </div>
    </>
  );
}

function TitleWithBack({ title, onBack }: { title: string; onBack: () => void }) {
  return (
    <div className="relative flex items-center justify-center">
      <button
        type="button"
        onClick={onBack}
        aria-label="Back"
        className="absolute left-0 flex size-10 items-center justify-center rounded-full text-muted-foreground transition hover:bg-black/5 hover:text-foreground"
      >
        <ArrowLeft size={18} />
      </button>
      <h1 className="text-center text-2xl font-semibold text-foreground">{title}</h1>
    </div>
  );
}

export function LoginPage() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const paramView = params.get("view");
  const initErr = (params.get("err") as Err | null) ?? null;
  const [mode, setMode] = useState<"signin" | "signup">(params.get("mode") === "signup" ? "signup" : "signin");
  const [view, setView] = useState<View>(
    paramView === "reset" || paramView === "reset-sent" || paramView === "newpass" || paramView === "newpass-done"
      ? (paramView as View)
      : "form",
  );
  const [signupStep, setSignupStep] = useState<1 | 2>(params.get("step") === "password" ? 2 : 1);
  const [email, setEmail] = useState(params.get("email") ?? (params.get("step") === "password" ? "mark@yahoo.com" : ""));
  const [password, setPassword] = useState(initErr === "password-wrong" ? "1124dR" : "");
  const [newPass, setNewPass] = useState(initErr === "mismatch" ? "1124dR" : "");
  const [confirmPass, setConfirmPass] = useState(initErr === "mismatch" ? "1114dR" : "");
  const [err, setErr] = useState<Err | null>(initErr);
  const [showPassword, setShowPassword] = useState(false);
  const copy = mode === "signup" ? login.signup : login.signin;

  const clearFieldErr = (...codes: Err[]) => {
    if (err && codes.includes(err)) setErr(null);
  };
  const goReset = () => {
    setView("reset");
    setErr(null);
    setPassword("");
  };
  const backToLogin = () => {
    setView("form");
    setMode("signin");
    setErr(null);
  };
  const switchMode = (m: "signin" | "signup") => {
    setMode(m);
    setSignupStep(1);
    setErr(null);
  };

  const submitLogin = (e: FormEvent) => {
    e.preventDefault();
    const em = email.trim();
    if (!em) return setErr("email-empty");
    if (em.toLowerCase().startsWith("new")) return setErr("email-notfound");
    if (!password) return setErr("password-empty");
    if (password.length < 8 && password !== "admin123") return setErr("password-wrong");
    navigate("/subscribe");
  };
  const submitSignupEmail = (e: FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return setErr("email-empty");
    setErr(null);
    setPassword("");
    setSignupStep(2);
  };
  const submitSignupPassword = (e: FormEvent) => {
    e.preventDefault();
    if (!password) return setErr("password-empty");
    navigate("/subscribe");
  };
  const submitReset = (e: FormEvent) => {
    e.preventDefault();
    const em = email.trim();
    if (!em) return setErr("email-empty");
    if (em.toLowerCase().startsWith("new")) return setErr("email-notfound");
    setErr(null);
    setView("reset-sent");
  };
  const submitNewpass = (e: FormEvent) => {
    e.preventDefault();
    if (!newPass) return setErr("password-empty");
    if (newPass !== confirmPass) return setErr("mismatch");
    setErr(null);
    setView("newpass-done");
  };

  const emailField = (autoComplete: string) => (
    <div className="flex flex-col gap-2">
      <AppLabel htmlFor="email">{login.email.label}</AppLabel>
      <AppInput
        id="email"
        type="email"
        placeholder={login.email.placeholder}
        autoComplete={autoComplete}
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          clearFieldErr("email-empty", "email-notfound");
        }}
        className={`min-h-11 lg:min-h-9 ${err === "email-empty" || err === "email-notfound" ? ERROR_INPUT : ""}`}
      />
      {err === "email-empty" ? <FieldError>{login.errors.emailEmpty}</FieldError> : null}
      {err === "email-notfound" ? <FieldError>{login.errors.emailNotFound}</FieldError> : null}
    </div>
  );

  const passwordInput = (placeholder: string, autoComplete: string) => (
    <div className="relative">
      <AppInput
        id="password"
        type={showPassword ? "text" : "password"}
        placeholder={placeholder}
        autoComplete={autoComplete}
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
          clearFieldErr("password-empty", "password-wrong");
        }}
        className={`min-h-11 pr-10 lg:min-h-9 ${err === "password-empty" || err === "password-wrong" ? ERROR_INPUT : ""}`}
      />
      <button
        type="button"
        onClick={() => setShowPassword((v) => !v)}
        tabIndex={-1}
        aria-label={showPassword ? "Hide password" : "Show password"}
        className="absolute right-3 top-1/2 -mr-3 flex size-11 -translate-y-1/2 items-center justify-center text-muted-foreground transition-colors hover:text-foreground lg:mr-0 lg:inline-block lg:size-auto"
      >
        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
      </button>
    </div>
  );

  const passwordErrors = (
    <>
      {err === "password-empty" ? <FieldError>{login.errors.passwordEmpty}</FieldError> : null}
      {err === "password-wrong" ? (
        <FieldError>
          {login.errors.passwordWrong}{" "}
          <button type="button" onClick={goReset} className="font-medium underline underline-offset-2 transition hover:text-destructive/80">
            {login.errors.passwordWrongLink}
          </button>
        </FieldError>
      ) : null}
    </>
  );

  const emptyErrActive = (code: Err, value: string) => err === code && !value.trim();
  const loginDisabled = emptyErrActive("email-empty", email) || emptyErrActive("password-empty", password);

  return (
    <div className="flex min-h-screen flex-col bg-canvas">
      <Nav />
      <main className="flex flex-1 flex-col items-center px-5 pb-16 pt-24 md:px-4 md:pb-20 md:pt-28">
        <motion.div variants={stagger(0.08)} initial="hidden" animate="show" className="flex w-full max-w-[460px] flex-col items-center">
          {view === "form" ? (
            <motion.div
              variants={fadeUp}
              className="flex h-11 w-full max-w-[400px] items-center justify-center rounded-xl bg-[oklch(0.967_0.001_286.375)] p-[3px] md:inline-flex md:h-10 md:w-auto md:max-w-none"
            >
              {(["signin", "signup"] as const).map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => switchMode(m)}
                  className={`inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center rounded-xl border border-transparent px-6 text-sm font-medium transition-[color,box-shadow] md:flex-initial ${
                    mode === m ? "bg-white text-foreground shadow-[0_1px_2px_rgba(16,24,40,0.08)]" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {m === "signin" ? login.tabs.login : login.tabs.signup}
                </button>
              ))}
            </motion.div>
          ) : null}
          <motion.div variants={fadeUp} className={view === "form" ? "mt-8 w-full max-w-[400px] md:mt-10" : "w-full max-w-[400px]"}>
            {view === "form" && (mode === "signin" || signupStep === 1) ? (
              <>
                <h1 className="text-center text-2xl font-semibold text-foreground">{copy.title}</h1>
                <p className="mt-2 text-center text-sm text-muted-foreground">{copy.subtitle}</p>
                <OauthStack />
                {mode === "signin" ? (
                  <form onSubmit={submitLogin} className="flex flex-col gap-4">
                    {emailField("email")}
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center justify-between">
                        <AppLabel htmlFor="password">{login.password.label}</AppLabel>
                        <button type="button" onClick={goReset} className="-my-3.5 py-3.5 text-xs text-primary hover:underline lg:my-0 lg:py-0">
                          {login.signin.forgot}
                        </button>
                      </div>
                      {passwordInput(login.password.placeholder, "current-password")}
                      {passwordErrors}
                    </div>
                    <AppButton type="submit" size="lg" disabled={loginDisabled} className="w-full min-h-11 lg:min-h-10">
                      {copy.submit}
                    </AppButton>
                  </form>
                ) : (
                  <form onSubmit={submitSignupEmail} className="flex flex-col gap-4">
                    {emailField("email")}
                    <AppButton type="submit" size="lg" disabled={emptyErrActive("email-empty", email)} className="w-full min-h-11 lg:min-h-10">
                      {copy.submit}
                    </AppButton>
                  </form>
                )}
              </>
            ) : null}
            {view === "form" && mode === "signup" && signupStep === 2 ? (
              <>
                <TitleWithBack title={login.signupPassword.title} onBack={() => { setSignupStep(1); setErr(null); }} />
                <p className="mt-2 text-center text-sm text-muted-foreground">
                  {login.signupPassword.subtitle} <span className="font-medium text-foreground">{email.trim() || "mark@yahoo.com"}</span>
                </p>
                <form onSubmit={submitSignupPassword} className="mt-6 flex flex-col gap-4">
                  <div className="flex flex-col gap-2">
                    <AppLabel htmlFor="password">{login.signupPassword.label}</AppLabel>
                    {passwordInput(login.signupPassword.placeholder, "new-password")}
                    {passwordErrors}
                  </div>
                  <AppButton type="submit" size="lg" disabled={emptyErrActive("password-empty", password)} className="w-full min-h-11 lg:min-h-10">
                    {login.signupPassword.submit}
                  </AppButton>
                </form>
              </>
            ) : null}
            {view === "reset" ? (
              <>
                <TitleWithBack title={login.reset.title} onBack={backToLogin} />
                <p className="mt-2 text-center text-sm text-muted-foreground">{login.reset.subtitle}</p>
                <form onSubmit={submitReset} className="mt-6 flex flex-col gap-4">
                  {emailField("email")}
                  <AppButton type="submit" size="lg" disabled={emptyErrActive("email-empty", email)} className="w-full min-h-11 lg:min-h-10">
                    {login.reset.submit}
                  </AppButton>
                </form>
              </>
            ) : null}
            {view === "reset-sent" ? (
              <>
                <TitleWithBack title={login.reset.title} onBack={backToLogin} />
                <p className="mt-6 text-center text-sm font-medium text-trust">{login.resetSent.message}</p>
                <p className="mt-2 text-center text-xs text-muted-foreground">{login.resetSent.hint}</p>
                <AppButton variant="pill-outline" size="lg" onClick={backToLogin} className="mt-6 w-full min-h-11 lg:min-h-10">
                  {login.reset.back}
                </AppButton>
              </>
            ) : null}
            {view === "newpass" ? (
              <>
                <TitleWithBack title={login.newPassword.title} onBack={backToLogin} />
                <p className="mt-2 text-center text-sm text-muted-foreground">{login.newPassword.subtitle}</p>
                <form onSubmit={submitNewpass} className="mt-6 flex flex-col gap-4">
                  <div className="flex flex-col gap-2">
                    <AppLabel htmlFor="new-password">{login.newPassword.newLabel}</AppLabel>
                    <AppInput
                      id="new-password"
                      type="password"
                      placeholder={login.newPassword.newPlaceholder}
                      autoComplete="new-password"
                      value={newPass}
                      onChange={(e) => {
                        setNewPass(e.target.value);
                        clearFieldErr("password-empty", "mismatch");
                      }}
                      className={`min-h-11 lg:min-h-9 ${err === "password-empty" || err === "mismatch" ? ERROR_INPUT : ""}`}
                    />
                    {err === "password-empty" ? <FieldError>{login.errors.passwordEmpty}</FieldError> : null}
                  </div>
                  <div className="flex flex-col gap-2">
                    <AppLabel htmlFor="confirm-password">{login.newPassword.confirmLabel}</AppLabel>
                    <AppInput
                      id="confirm-password"
                      type="password"
                      placeholder={login.newPassword.confirmPlaceholder}
                      autoComplete="new-password"
                      value={confirmPass}
                      onChange={(e) => {
                        setConfirmPass(e.target.value);
                        clearFieldErr("mismatch");
                      }}
                      className={`min-h-11 lg:min-h-9 ${err === "mismatch" ? ERROR_INPUT : ""}`}
                    />
                    {err === "mismatch" ? <FieldError>{login.errors.mismatch}</FieldError> : null}
                  </div>
                  <AppButton type="submit" size="lg" disabled={emptyErrActive("password-empty", newPass)} className="w-full min-h-11 lg:min-h-10">
                    {login.newPassword.submit}
                  </AppButton>
                </form>
              </>
            ) : null}
            {view === "newpass-done" ? (
              <div className="flex flex-col items-center">
                <div className="flex size-14 items-center justify-center rounded-full bg-trust/10">
                  <CheckCircle2 size={28} className="text-trust" />
                </div>
                <h1 className="mt-4 text-center text-2xl font-semibold text-foreground">{login.newPasswordDone.title}</h1>
                <p className="mt-2 text-center text-sm text-muted-foreground">{login.newPasswordDone.message}</p>
                <AppButton size="lg" onClick={backToLogin} className="mt-6 w-full min-h-11 lg:min-h-10">
                  {login.newPasswordDone.cta}
                </AppButton>
              </div>
            ) : null}
            {view === "form" ? (
              <>
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
                  <a href={`mailto:${login.help.email}`} className="break-words text-primary hover:underline">{login.help.email}</a>
                </p>
                <p className="mt-4 text-center text-sm text-muted-foreground">
                  {copy.switchPrompt}{" "}
                  <button
                    type="button"
                    onClick={() => switchMode(mode === "signup" ? "signin" : "signup")}
                    className="-my-2 py-2 font-medium text-primary hover:underline lg:my-0 lg:py-0"
                  >
                    {copy.switchAction}
                  </button>
                </p>
              </>
            ) : null}
          </motion.div>
        </motion.div>
      </main>
      <footer className="border-t border-border bg-tint-sky py-6 md:py-5">
        <div className="mx-auto flex w-full max-w-[1200px] flex-col items-center gap-3 px-5 text-center md:flex-row md:justify-between md:gap-6 md:px-10 md:text-left">
          <img src={brand.logo} alt="TranscribeToText.AI" className="h-6 w-auto" />
          <p className="text-sm text-ink-2">{footer.copyright}</p>
          <p className="text-xs text-muted">{footer.companyDetails}</p>
        </div>
      </footer>
    </div>
  );
}
