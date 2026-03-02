"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Waves,
  Zap,
  Shield,
  Target,
  ArrowRight,
  Eye,
  EyeOff,
  Crown,
  Lock,
  Key,
  ChevronRight,
  Menu,
  X,
  ExternalLink,
  BrainCircuit,
  Radio,
  Gauge,
  ShieldCheck,
  Fingerprint,
  Check,
  X as XIcon,
  LogIn,
} from "lucide-react";

/* ─── refined palette ─── */
const C = {
  bg: "#060b18",
  bgCard: "rgba(10,16,34,0.55)",
  bgDeep: "rgba(6,10,24,0.88)",
  accent: "#00e5cc",
  accentAlt: "#7c5cfc",
  accentPink: "#f472b6",
  text: "#e2e8f0",
  textMuted: "#94a3b8",
  textDim: "#64748b",
  border: "rgba(255,255,255,0.04)",
  borderSubtle: "rgba(255,255,255,0.06)",
};

/* ─── global styles ─── */
function GlobalStyles(): React.JSX.Element {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&family=JetBrains+Mono:wght@400;500;600;700&display=swap');

      :root { --accent: ${C.accent}; --accent-alt: ${C.accentAlt}; --bg: ${C.bg}; }
      *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

      body, html {
        background: var(--bg);
        color: ${C.text};
        font-family: 'DM Sans', -apple-system, sans-serif;
        overflow-x: hidden;
        scroll-behavior: smooth;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
      }

      .font-display { font-family: 'Syne', sans-serif; }
      .font-mono    { font-family: 'JetBrains Mono', monospace; }

      .glass {
        background: rgba(8,14,28,0.82);
        backdrop-filter: blur(22px);
        -webkit-backdrop-filter: blur(22px);
        border: 1px solid ${C.border};
      }

      @keyframes shimmer {
        0%   { background-position: -200% 0; }
        100% { background-position:  200% 0; }
      }
      .btn-shimmer {
        background: linear-gradient(110deg, #00e5cc 0%, #00e5cc 40%, #7dfff0 50%, #00e5cc 60%, #00e5cc 100%);
        background-size: 200% 100%;
        animation: shimmer 3s ease-in-out infinite;
      }

      @keyframes grid-drift {
        0%   { transform: translate(0,0); }
        100% { transform: translate(40px,40px); }
      }
      .grid-bg {
        background-image:
          linear-gradient(rgba(255,255,255,0.012) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.012) 1px, transparent 1px);
        background-size: 72px 72px;
        animation: grid-drift 28s linear infinite;
      }

      @keyframes fade-up {
        0%   { opacity: 0; transform: translateY(28px); }
        100% { opacity: 1; transform: translateY(0); }
      }

      /* Hero orb drift */
      @keyframes orb-drift-a {
        0%,100% { transform: translate(0,0) scale(1); }
        33%     { transform: translate(60px,-40px) scale(1.07); }
        66%     { transform: translate(-30px,30px) scale(0.95); }
      }
      @keyframes orb-drift-b {
        0%,100% { transform: translate(0,0) scale(1); }
        33%     { transform: translate(-60px,35px) scale(0.94); }
        66%     { transform: translate(40px,-50px) scale(1.06); }
      }
      @keyframes orb-drift-c {
        0%,100% { transform: translate(0,0) scale(1); }
        50%     { transform: translate(35px,45px) scale(1.04); }
      }

      /* Interactive icon animations */
      @keyframes zap-pulse {
        0%,100% { transform: scale(1);    filter: drop-shadow(0 0 6px rgba(0,229,204,0.25)); }
        50%     { transform: scale(1.22); filter: drop-shadow(0 0 22px rgba(0,229,204,0.75)); }
      }
      @keyframes target-spin {
        0%   { transform: rotate(0deg)  scale(1); }
        50%  { transform: rotate(18deg) scale(1.14); }
        100% { transform: rotate(0deg)  scale(1); }
      }
      @keyframes shield-glow {
        0%,100% { filter: drop-shadow(0 0 4px rgba(244,114,182,0.2)); transform: scale(1); }
        50%     { filter: drop-shadow(0 0 20px rgba(244,114,182,0.7)); transform: scale(1.16); }
      }
      @keyframes signal-ring {
        0%   { transform: scale(1); opacity: 0.7; }
        100% { transform: scale(3); opacity: 0; }
      }
      @keyframes bar-fill {
        0%   { transform: scaleX(0); }
        100% { transform: scaleX(1); }
      }
      @keyframes scroll-dot {
        0%,100% { opacity: 0.35; transform: translateY(0); }
        50%     { opacity: 1;    transform: translateY(7px); }
      }
      @keyframes flow-dash {
        0%   { stroke-dashoffset: 12; }
        100% { stroke-dashoffset: 0; }
      }
      @keyframes fade-in-down {
        from { opacity: 0; transform: translateY(-8px); }
        to   { opacity: 1; transform: translateY(0); }
      }

      /* Scroll reveal */
      .rv  { opacity: 0; transform: translateY(44px); transition: opacity 1s cubic-bezier(0.16,1,0.3,1), transform 1s cubic-bezier(0.16,1,0.3,1); }
      .rv.vis { opacity: 1; transform: translateY(0); }

      ::-webkit-scrollbar { width: 5px; }
      ::-webkit-scrollbar-track { background: transparent; }
      ::-webkit-scrollbar-thumb { background: rgba(0,229,204,0.12); border-radius: 3px; }

      @media(max-width:768px) {
        .hide-mobile { display: none !important; }
        .show-mobile-only { display: block !important; }
        .lat-layout   { flex-direction: column !important; }
        .flow-grid    { flex-direction: column !important; }
        .flow-connector { display: none !important; }
        .perm-grid    { grid-template-columns: 1fr !important; }
        .sec-cards    { grid-template-columns: 1fr !important; }
      }
      @media(min-width:769px) { .show-mobile-only { display: none !important; } }
    `}</style>
  );
}

/* ─── reveal hook ─── */
function useReveal(threshold = 0.1): React.RefObject<HTMLDivElement | null> {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { el.classList.add("vis"); obs.unobserve(el); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return ref;
}

/* ═══════════════════════════════════════
   HEADER — unified with homepage
   ═══════════════════════════════════════ */
function Header({
  isSubscribed,
  setIsSubscribed,
}: {
  isSubscribed: boolean;
  setIsSubscribed: (v: boolean) => void;
}): React.JSX.Element {
  const [scrolled, setScrolled]       = useState(false);
  const [mobileOpen, setMobileOpen]   = useState(false);
  const [socialsOpen, setSocialsOpen] = useState(false);
  const socialsRef                    = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  useEffect(() => {
    const h = (e: MouseEvent) => {
      if (socialsRef.current && !socialsRef.current.contains(e.target as Node))
        setSocialsOpen(false);
    };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  /* exact links as specified */
  const navLinks = ["Home", "The Bot", "Whales", "Pricing", "How It Works"];

  const getLinkHref = (label: string): string => {
    if (label === "Home")         return "/";
    if (label === "The Bot")      return "/#the-bot";
    if (label === "Whales")       return "/whales";
    if (label === "Pricing")      return "/pricing";
    if (label === "How It Works") return "/how-it-works";
    return "#";
  };

  const socialsLinks = [
    { label: "Discord",  href: "#", icon: "💬" },
    { label: "Telegram", href: "#", icon: "✈️" },
    { label: "X",        href: "#", icon: "𝕏" },
  ];

  const linkStyle: React.CSSProperties = {
    color: C.textMuted,
    textDecoration: "none",
    fontSize: 13,
    fontWeight: 600,
    letterSpacing: "-0.01em",
    transition: "color 0.2s",
    whiteSpace: "nowrap",
  };

  return (
    <header
      className="glass font-display"
      style={{
        position: "sticky",
        top: 0,
        zIndex: 100,
        padding: scrolled ? "10px 0" : "16px 0",
        borderBottom: `1px solid ${scrolled ? C.borderSubtle : "transparent"}`,
        transition: "all 0.35s ease",
      }}
    >
      <div
        style={{
          maxWidth: 1160,
          margin: "0 auto",
          padding: "0 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Logo */}
        <a href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
          <div
            style={{
              width: 34, height: 34, borderRadius: 9,
              background: "linear-gradient(135deg, #00e5cc, #7c5cfc)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}
          >
            <Waves size={18} color="#060b18" strokeWidth={2.5} />
          </div>
          <span style={{ fontSize: 21, fontWeight: 800, letterSpacing: "-0.03em", color: "#fff" }}>
            Poly<span style={{ color: C.accent }}>Whale</span>
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hide-mobile" style={{ display: "flex", alignItems: "center", gap: 24 }}>
          {navLinks.map((l) => (
            <a
              key={l}
              href={getLinkHref(l)}
              style={{
                ...linkStyle,
                color: l === "How It Works" ? C.accent : C.textMuted,
                fontWeight: l === "How It Works" ? 700 : 600,
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = C.accent)}
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLAnchorElement).style.color =
                  l === "How It Works" ? C.accent : C.textMuted)
              }
            >
              {l}
            </a>
          ))}

          {/* Glassmorphism Socials dropdown */}
          <div ref={socialsRef} style={{ position: "relative" }}>
            <button
              onClick={() => setSocialsOpen(!socialsOpen)}
              style={{
                ...linkStyle,
                background: "none",
                border: "none",
                cursor: "pointer",
                fontFamily: "Syne, sans-serif",
                display: "inline-flex",
                alignItems: "center",
                gap: 4,
                padding: 0,
                color: socialsOpen ? C.accent : C.textMuted,
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLButtonElement).style.color = C.accent)
              }
              onMouseLeave={(e) => {
                if (!socialsOpen)
                  (e.currentTarget as HTMLButtonElement).style.color = C.textMuted;
              }}
            >
              Socials
              <ChevronRight
                size={12}
                style={{
                  transform: socialsOpen ? "rotate(90deg)" : "rotate(0deg)",
                  transition: "transform 0.22s ease",
                }}
              />
            </button>

            {socialsOpen && (
              <div
                style={{
                  position: "absolute",
                  top: "calc(100% + 12px)",
                  right: 0,
                  minWidth: 168,
                  borderRadius: 14,
                  background: "rgba(8,14,30,0.97)",
                  backdropFilter: "blur(24px)",
                  WebkitBackdropFilter: "blur(24px)",
                  border: "1px solid rgba(0,229,204,0.1)",
                  boxShadow: "0 20px 56px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.02)",
                  padding: "6px",
                  animation: "fade-in-down 0.15s ease both",
                  zIndex: 200,
                }}
              >
                {socialsLinks.map(({ label, href, icon }) => (
                  <a
                    key={label}
                    href={href}
                    onClick={() => setSocialsOpen(false)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      padding: "10px 14px",
                      borderRadius: 8,
                      textDecoration: "none",
                      color: C.text,
                      fontSize: 13,
                      fontWeight: 500,
                      fontFamily: "DM Sans, sans-serif",
                      transition: "background 0.15s, color 0.15s",
                    }}
                    onMouseEnter={(e) => {
                      const t = e.currentTarget as HTMLAnchorElement;
                      t.style.background = "rgba(0,229,204,0.06)";
                      t.style.color = C.accent;
                    }}
                    onMouseLeave={(e) => {
                      const t = e.currentTarget as HTMLAnchorElement;
                      t.style.background = "transparent";
                      t.style.color = C.text;
                    }}
                  >
                    <span style={{ fontSize: 14, lineHeight: 1 }}>{icon}</span>
                    {label}
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* PRO Active / Free Tier developer toggle */}
          <button
            onClick={() => setIsSubscribed(!isSubscribed)}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 7,
              padding: "7px 14px",
              borderRadius: 8,
              border: `1px solid ${isSubscribed ? "rgba(0,229,204,0.22)" : "rgba(124,92,252,0.22)"}`,
              background: isSubscribed ? "rgba(0,229,204,0.06)" : "rgba(124,92,252,0.06)",
              color: isSubscribed ? C.accent : C.accentAlt,
              fontSize: 11,
              fontWeight: 700,
              cursor: "pointer",
              fontFamily: "DM Sans, sans-serif",
              whiteSpace: "nowrap",
              transition: "all 0.3s ease",
            }}
          >
            {isSubscribed ? <Eye size={12} /> : <EyeOff size={12} />}
            {isSubscribed ? "PRO Active" : "Free Tier"}
            <div
              style={{
                width: 28,
                height: 16,
                borderRadius: 8,
                background: isSubscribed ? "rgba(0,229,204,0.28)" : "rgba(255,255,255,0.07)",
                position: "relative",
                transition: "background 0.3s ease",
              }}
            >
              <div
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: "50%",
                  background: isSubscribed ? C.accent : C.textDim,
                  position: "absolute",
                  top: 2,
                  left: isSubscribed ? 14 : 2,
                  transition: "all 0.3s cubic-bezier(0.16,1,0.3,1)",
                  boxShadow: isSubscribed ? "0 0 8px rgba(0,229,204,0.5)" : "none",
                }}
              />
            </div>
          </button>

          {/* Sign In CTA — premium gradient, NOT solid cyan */}
          <a
            href="/pricing"
            style={{
              padding: "9px 22px",
              borderRadius: 10,
              border: "none",
              cursor: "pointer",
              background: "linear-gradient(135deg, #00e5cc 0%, #7c5cfc 100%)",
              color: "#060b18",
              fontWeight: 700,
              fontSize: 13,
              fontFamily: "Syne, sans-serif",
              display: "inline-flex",
              alignItems: "center",
              gap: 7,
              textDecoration: "none",
              transition: "transform 0.2s, box-shadow 0.2s",
            }}
            onMouseEnter={(e) => {
              const t = e.currentTarget as HTMLAnchorElement;
              t.style.transform = "translateY(-1px)";
              t.style.boxShadow = "0 4px 24px rgba(0,229,204,0.28)";
            }}
            onMouseLeave={(e) => {
              const t = e.currentTarget as HTMLAnchorElement;
              t.style.transform = "translateY(0)";
              t.style.boxShadow = "none";
            }}
          >
            <LogIn size={13} /> Sign In
          </a>
        </nav>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="show-mobile-only"
          style={{ background: "none", border: "none", color: "#fff", cursor: "pointer" }}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          className="show-mobile-only"
          style={{ padding: "16px 24px", display: "flex", flexDirection: "column", gap: 4 }}
        >
          {navLinks.map((l) => (
            <a
              key={l}
              href={getLinkHref(l)}
              onClick={() => setMobileOpen(false)}
              style={{
                color: l === "How It Works" ? C.accent : C.textMuted,
                textDecoration: "none",
                fontSize: 15,
                fontWeight: 600,
                padding: "10px 0",
                borderBottom: "1px solid rgba(255,255,255,0.04)",
              }}
            >
              {l}
            </a>
          ))}

          <div style={{ padding: "10px 0", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", color: C.textDim, textTransform: "uppercase", marginBottom: 10 }}>
              Socials
            </div>
            {[{ label: "Discord", href: "#" }, { label: "Telegram", href: "#" }, { label: "X", href: "#" }].map(({ label, href }) => (
              <a
                key={label}
                href={href}
                onClick={() => setMobileOpen(false)}
                style={{ display: "block", padding: "8px 0", textDecoration: "none", color: C.textMuted, fontSize: 14, fontWeight: 500 }}
              >
                {label}
              </a>
            ))}
          </div>

          <div style={{ paddingTop: 12, display: "flex", gap: 10 }}>
            <button
              onClick={() => { setIsSubscribed(!isSubscribed); setMobileOpen(false); }}
              style={{
                flex: 1,
                padding: "11px 14px",
                borderRadius: 10,
                border: `1px solid ${isSubscribed ? "rgba(0,229,204,0.22)" : "rgba(124,92,252,0.22)"}`,
                background: isSubscribed ? "rgba(0,229,204,0.06)" : "rgba(124,92,252,0.06)",
                color: isSubscribed ? C.accent : C.accentAlt,
                fontSize: 13,
                fontWeight: 700,
                cursor: "pointer",
                fontFamily: "DM Sans, sans-serif",
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              {isSubscribed ? <Eye size={14} /> : <EyeOff size={14} />}
              {isSubscribed ? "PRO Active" : "Free Tier"}
            </button>
            <a
              href="/pricing"
              style={{
                flex: 1,
                padding: "11px 14px",
                borderRadius: 10,
                background: "linear-gradient(135deg, #00e5cc, #7c5cfc)",
                color: "#060b18",
                fontSize: 13,
                fontWeight: 700,
                fontFamily: "Syne, sans-serif",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 6,
                textDecoration: "none",
              }}
            >
              <LogIn size={13} /> Sign In
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

/* ═══════════════════════════════════════
   SECTION LABEL — minimal mono tag
   ═══════════════════════════════════════ */
function SectionLabel({
  num,
  text,
  color,
}: {
  num: string;
  text: string;
  color: string;
}): React.JSX.Element {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 24 }}>
      <span
        className="font-mono"
        style={{
          fontSize: 11, fontWeight: 700, color,
          letterSpacing: "0.08em", padding: "5px 12px",
          borderRadius: 8, background: `${color}08`, border: `1px solid ${color}12`,
        }}
      >
        {num}
      </span>
      <span
        className="font-display"
        style={{ fontSize: 11, fontWeight: 700, color, textTransform: "uppercase", letterSpacing: "0.14em" }}
      >
        {text}
      </span>
    </div>
  );
}

/* ═══════════════════════════════════════
   HERO — commanding headline, deep-ocean orbs
   ═══════════════════════════════════════ */
function Hero(): React.JSX.Element {
  return (
    <section
      style={{
        position: "relative",
        padding: "120px 24px 80px",
        textAlign: "center",
        overflow: "hidden",
      }}
    >
      {/* Massive deep-ocean background orb — very low opacity, heavily blurred */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: 900,
          height: 900,
          marginLeft: -450,
          marginTop: -450,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(0,229,204,0.055) 0%, rgba(124,92,252,0.04) 40%, transparent 70%)",
          filter: "blur(80px)",
          animation: "orb-drift-a 22s ease-in-out infinite",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "38%",
          left: "58%",
          width: 640,
          height: 640,
          marginLeft: -320,
          marginTop: -320,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(124,92,252,0.05) 0%, transparent 65%)",
          filter: "blur(64px)",
          animation: "orb-drift-b 26s ease-in-out infinite",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "65%",
          left: "36%",
          width: 420,
          height: 420,
          marginLeft: -210,
          marginTop: -210,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(244,114,182,0.025) 0%, transparent 65%)",
          filter: "blur(48px)",
          animation: "orb-drift-c 30s ease-in-out infinite",
          pointerEvents: "none",
        }}
      />

      <div style={{ position: "relative", maxWidth: 700, margin: "0 auto" }}>
        {/* Eyebrow badge */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            padding: "7px 16px",
            borderRadius: 100,
            background: "rgba(0,229,204,0.05)",
            border: "1px solid rgba(0,229,204,0.09)",
            marginBottom: 36,
            fontSize: 12,
            color: C.accent,
            fontWeight: 600,
            fontFamily: "DM Sans, sans-serif",
            animation: "fade-up 0.6s ease both",
          }}
        >
          <BrainCircuit size={13} /> The Science of Alpha
        </div>

        {/* Headline — commanding, unified, "Sub-Second Execution" gradient only */}
        <h1
          className="font-display"
          style={{
            fontSize: "clamp(36px, 5.5vw, 62px)",
            fontWeight: 800,
            color: "#fff",
            letterSpacing: "-0.038em",
            marginBottom: 28,
            lineHeight: 1.05,
            animation: "fade-up 0.6s ease 0.07s both",
          }}
        >
          How{" "}
          <span
            style={{
              background: "linear-gradient(135deg, #00e5cc 0%, #7c5cfc 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Sub-Second Execution
          </span>
          <br />
          Wins Markets
        </h1>

        <p
          style={{
            fontSize: 17,
            color: C.textMuted,
            lineHeight: 1.8,
            maxWidth: 530,
            margin: "0 auto",
            letterSpacing: "-0.005em",
            animation: "fade-up 0.6s ease 0.14s both",
          }}
        >
          In prediction markets, information is only as valuable as the speed at
          which you can trade on it. See how PolyWhale gives you the institutional
          edge over every other participant.
        </p>

        {/* Scroll indicator */}
        <div
          style={{
            marginTop: 72,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 10,
            animation: "fade-up 0.6s ease 0.22s both",
          }}
        >
          <span
            style={{
              fontSize: 10,
              color: C.textDim,
              textTransform: "uppercase",
              letterSpacing: "0.18em",
              fontWeight: 500,
            }}
          >
            Scroll to explore
          </span>
          <div
            style={{
              width: 22,
              height: 38,
              borderRadius: 11,
              border: "1.5px solid rgba(255,255,255,0.06)",
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "center",
              paddingTop: 8,
            }}
          >
            <div
              style={{
                width: 3,
                height: 8,
                borderRadius: 2,
                background: C.accent,
                opacity: 0.5,
                animation: "scroll-dot 2s ease-in-out infinite",
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════
   SECTION 1: LATENCY — Bloomberg terminal
   ═══════════════════════════════════════ */
function LatencySection(): React.JSX.Element {
  const ref = useReveal();
  const [zapHovered, setZapHovered] = useState(false);

  /* Bars: thin, sleek, glowing ends, right-aligned monospace ms values */
  const bars = [
    { label: "Human Trader",  sub: "Toronto, ON", ms: "150–300ms", pct: 92, color: C.accentPink, glow: "rgba(244,114,182,0.30)" },
    { label: "Competing Bot", sub: "US-East-1",   ms: "40–80ms",   pct: 30, color: "#fbbf24",    glow: "rgba(251,191,36,0.22)"   },
    { label: "PolyWhale",     sub: "EU-West-1",   ms: "<20ms",     pct: 6,  color: C.accent,     glow: "rgba(0,229,204,0.40)"    },
  ];

  return (
    <section style={{ padding: "140px 24px 100px" }}>
      <div ref={ref} className="rv" style={{ maxWidth: 1000, margin: "0 auto" }}>
        <SectionLabel num="01" text="The Latency Advantage" color={C.accent} />

        <div className="lat-layout" style={{ display: "flex", gap: 64, alignItems: "flex-start" }}>
          {/* Copy column */}
          <div style={{ flex: "1 1 420px" }}>
            <h2
              className="font-display"
              style={{
                fontSize: "clamp(26px, 3.5vw, 40px)",
                fontWeight: 800,
                color: "#fff",
                letterSpacing: "-0.03em",
                marginBottom: 24,
                lineHeight: 1.1,
              }}
            >
              Co-Located in{" "}
              <span style={{ color: C.accent }}>EU-West&nbsp;1</span>
              <br />Dublin, Ireland
            </h2>

            <p style={{ fontSize: 15, lineHeight: 1.8, color: C.textMuted, marginBottom: 22, maxWidth: 460 }}>
              Polymarket&apos;s core exchange infrastructure sits in AWS EU-West&nbsp;1 (Dublin).
              A human trader in Toronto faces 150&ndash;300ms of round-trip latency from network
              transmission alone. By the time their order hits the book, the spread has moved.
            </p>
            <p style={{ fontSize: 15, lineHeight: 1.8, color: C.textMuted, marginBottom: 44, maxWidth: 460 }}>
              PolyWhale&apos;s servers are co-located in the same region. Our full pipeline &mdash;
              detection, risk check, and order placement &mdash; resolves in under 20&nbsp;milliseconds.
              This is not a marginal edge. It is a structural advantage.
            </p>

            {/* Zap execution badge */}
            <div
              onMouseEnter={() => setZapHovered(true)}
              onMouseLeave={() => setZapHovered(false)}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 14,
                padding: "14px 24px",
                borderRadius: 14,
                background: zapHovered ? "rgba(0,229,204,0.07)" : "rgba(0,229,204,0.025)",
                border: `1px solid ${zapHovered ? "rgba(0,229,204,0.18)" : C.border}`,
                cursor: "default",
                transition: "all 0.35s ease",
              }}
            >
              <div
                style={{
                  color: C.accent,
                  display: "flex",
                  animation: zapHovered ? "zap-pulse 1.1s ease-in-out infinite" : "none",
                }}
              >
                <Zap size={20} />
              </div>
              <div>
                <div
                  className="font-mono"
                  style={{ fontSize: 15, color: C.accent, fontWeight: 700, letterSpacing: "-0.02em" }}
                >
                  14.2ms
                </div>
                <div style={{ fontSize: 11, color: C.textDim, marginTop: 2 }}>avg. execution time</div>
              </div>
            </div>
          </div>

          {/* Bloomberg-style latency panel */}
          <div style={{ flex: "1 1 380px" }}>
            <div
              style={{
                padding: "28px 28px 24px",
                borderRadius: 18,
                background: C.bgDeep,
                border: `1px solid ${C.border}`,
                boxShadow: "inset 0 1px 0 rgba(255,255,255,0.025), 0 28px 72px rgba(0,0,0,0.4)",
              }}
            >
              {/* Terminal header */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 32,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div
                    style={{
                      width: 7, height: 7, borderRadius: "50%",
                      background: C.accent,
                      boxShadow: `0 0 8px ${C.accent}60`,
                    }}
                  />
                  <span
                    className="font-mono"
                    style={{ fontSize: 10, color: C.textDim, letterSpacing: "0.12em", textTransform: "uppercase" }}
                  >
                    Latency Monitor
                  </span>
                </div>
                <span className="font-mono" style={{ fontSize: 10, color: C.textDim, letterSpacing: "0.06em" }}>
                  LIVE
                </span>
              </div>

              {/* Bars — thin + glowing ends + right-aligned monospace ms */}
              <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
                {bars.map((b, i) => (
                  <div key={i}>
                    {/* Row header: label left, monospace ms right-aligned */}
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "baseline",
                        marginBottom: 10,
                      }}
                    >
                      <div>
                        <span style={{ fontSize: 13, color: C.text, fontWeight: 600, letterSpacing: "-0.01em" }}>
                          {b.label}
                        </span>
                        <span style={{ fontSize: 11, color: C.textDim, marginLeft: 8 }}>{b.sub}</span>
                      </div>
                      {/* Right-aligned monospace data value */}
                      <span
                        className="font-mono"
                        style={{
                          fontSize: 13,
                          fontWeight: 700,
                          color: b.color,
                          letterSpacing: "-0.02em",
                          textAlign: "right",
                          minWidth: 80,
                          textShadow: `0 0 18px ${b.glow}`,
                        }}
                      >
                        {b.ms}
                      </span>
                    </div>

                    {/* Thin sleek bar track */}
                    <div
                      style={{
                        position: "relative",
                        height: 4,
                        borderRadius: 2,
                        background: "rgba(255,255,255,0.025)",
                        overflow: "visible",
                      }}
                    >
                      <div
                        style={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          height: "100%",
                          width: `${b.pct}%`,
                          borderRadius: 2,
                          background: `linear-gradient(90deg, ${b.color}88, ${b.color})`,
                          transformOrigin: "left",
                          animation: `bar-fill 1.4s cubic-bezier(0.16,1,0.3,1) ${i * 0.18}s both`,
                        }}
                      >
                        {/* Glowing end cap */}
                        <div
                          style={{
                            position: "absolute",
                            right: -2,
                            top: "50%",
                            transform: "translateY(-50%)",
                            width: 8,
                            height: 8,
                            borderRadius: "50%",
                            background: b.color,
                            boxShadow: `0 0 12px 4px ${b.glow}, 0 0 4px ${b.color}`,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Scale footer */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: 24,
                  paddingTop: 18,
                  borderTop: "1px solid rgba(255,255,255,0.022)",
                }}
              >
                {["0ms", "100ms", "200ms", "300ms"].map((v, i) => (
                  <span key={i} className="font-mono" style={{ fontSize: 9, color: C.textDim }}>{v}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Execution model formula */}
        <div
          style={{
            marginTop: 72,
            padding: "40px 32px",
            borderRadius: 18,
            background: C.bgDeep,
            border: `1px solid ${C.border}`,
            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.02)",
            textAlign: "center",
          }}
        >
          <div
            className="font-mono"
            style={{
              fontSize: 10, fontWeight: 600, color: C.textDim,
              textTransform: "uppercase", letterSpacing: "0.14em", marginBottom: 22,
            }}
          >
            Execution Model
          </div>
          <div
            className="font-mono"
            style={{
              fontSize: "clamp(14px, 2.2vw, 20px)",
              color: "#fff",
              fontWeight: 500,
              letterSpacing: "-0.01em",
              lineHeight: 2,
            }}
          >
            <span style={{ color: C.textDim }}>Total&nbsp;Latency</span>
            <span style={{ color: "rgba(255,255,255,0.16)", margin: "0 10px" }}>=</span>
            <span style={{ color: C.accentAlt }}>T<sub style={{ fontSize: "0.7em" }}>transmission</sub></span>
            <span style={{ color: "rgba(255,255,255,0.1)", margin: "0 8px" }}>+</span>
            <span style={{ color: C.accentAlt }}>T<sub style={{ fontSize: "0.7em" }}>processing</sub></span>
            <span style={{ color: "rgba(255,255,255,0.1)", margin: "0 8px" }}>+</span>
            <span style={{ color: C.accentAlt }}>T<sub style={{ fontSize: "0.7em" }}>execution</sub></span>
            <span style={{ color: "rgba(255,255,255,0.1)", margin: "0 10px" }}>&lt;</span>
            <span style={{ color: C.accent, fontWeight: 700, textShadow: "0 0 24px rgba(0,229,204,0.35)" }}>20ms</span>
          </div>
          <div style={{ display: "flex", justifyContent: "center", gap: 40, marginTop: 22, flexWrap: "wrap" }}>
            {[
              { val: "~2ms", note: "same-region" },
              { val: "~8ms", note: "risk checks" },
              { val: "~6ms", note: "order + confirm" },
            ].map((t, i) => (
              <div key={i} style={{ textAlign: "center" }}>
                <div className="font-mono" style={{ fontSize: 14, color: C.accent, fontWeight: 600 }}>{t.val}</div>
                <div style={{ fontSize: 10, color: C.textDim, marginTop: 3 }}>{t.note}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════
   SECTION 2: MIRRORING — Connected pipeline
   ═══════════════════════════════════════ */
function MirroringSection(): React.JSX.Element {
  const ref = useReveal();
  const [targetHovered, setTargetHovered] = useState(false);
  const [activeStep, setActiveStep] = useState<number | null>(null);

  const steps = [
    {
      icon: <Radio size={22} />,
      title: "Detect Whale Move",
      desc: "Our indexer monitors 1,200+ verified whale wallets via Polymarket's event stream. The instant a whale places or adjusts a position, we capture the signal in real time.",
      detail: "~3ms detection",
      color: C.accent,
    },
    {
      icon: <Gauge size={22} />,
      title: "Calculate Position",
      desc: "The engine computes your optimal position size using your allocation, risk limits, whale conviction level, and current market depth — all within a single processing cycle.",
      detail: "~8ms processing",
      color: C.accentAlt,
    },
    {
      icon: <Zap size={22} />,
      title: "Instant Execution",
      desc: "Your mirrored order fires through co-located infrastructure directly to Polymarket's matching engine. Confirmed before most traders see the whale's move.",
      detail: "~6ms placement",
      color: C.accentPink,
    },
  ];

  return (
    <section style={{ padding: "100px 24px 140px" }}>
      <div ref={ref} className="rv" style={{ maxWidth: 1000, margin: "0 auto" }}>
        <SectionLabel num="02" text="The Mirroring Engine" color={C.accentAlt} />

        {/* Section header */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            gap: 20,
            marginBottom: 56,
            flexWrap: "wrap",
          }}
        >
          <div style={{ flex: "1 1 440px" }}>
            <h2
              className="font-display"
              style={{
                fontSize: "clamp(26px, 3.5vw, 40px)",
                fontWeight: 800,
                color: "#fff",
                letterSpacing: "-0.03em",
                marginBottom: 24,
                lineHeight: 1.1,
              }}
            >
              Indexing the{" "}
              <span style={{ color: C.accentAlt }}>Top&nbsp;1%</span>
              <br />of Polymarket
            </h2>
            <p style={{ fontSize: 15, lineHeight: 1.8, color: C.textMuted, maxWidth: 480 }}>
              PolyWhale doesn&apos;t track random wallets. Our proprietary scoring algorithm
              continuously ranks every active Polymarket address by win rate, ROI, volume
              consistency, and market specialization. Only the top 1% make the index.
            </p>
          </div>

          {/* Target icon */}
          <div
            onMouseEnter={() => setTargetHovered(true)}
            onMouseLeave={() => setTargetHovered(false)}
            style={{
              width: 72, height: 72, borderRadius: 18, flexShrink: 0, marginTop: 8,
              background: "rgba(124,92,252,0.04)", border: `1px solid ${C.border}`,
              display: "flex", alignItems: "center", justifyContent: "center", cursor: "default",
            }}
          >
            <div
              style={{
                color: C.accentAlt,
                display: "flex",
                animation: targetHovered ? "target-spin 0.9s ease-in-out infinite" : "none",
              }}
            >
              <Target size={32} />
            </div>
          </div>
        </div>

        {/* Connected pipeline — cards with glowing connector line + chevrons */}
        <div style={{ position: "relative" }}>
          {/* Animated glowing dashed connector (desktop) */}
          <div
            className="flow-connector"
            style={{
              position: "absolute",
              top: "50%",
              left: "calc(33.33% - 6px)",
              right: "calc(33.33% - 6px)",
              height: 2,
              transform: "translateY(-24px)",
              zIndex: 0,
              pointerEvents: "none",
            }}
          >
            <svg width="100%" height="4" style={{ overflow: "visible" }}>
              <defs>
                <linearGradient id="flow-gradient" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%"   stopColor={C.accent}     stopOpacity="0.5" />
                  <stop offset="50%"  stopColor={C.accentAlt}  stopOpacity="0.6" />
                  <stop offset="100%" stopColor={C.accentPink} stopOpacity="0.5" />
                </linearGradient>
              </defs>
              <line
                x1="0" y1="2" x2="100%" y2="2"
                stroke="url(#flow-gradient)"
                strokeWidth="2"
                strokeDasharray="7 7"
                style={{ animation: "flow-dash 0.9s linear infinite" }}
              />
              {/* Chevron arrows mid-connector */}
              {[35, 65].map((xPct, i) => (
                <polygon
                  key={i}
                  points={`${xPct - 1}%,0 ${xPct + 1.2}%,2 ${xPct - 1}%,4`}
                  fill="none"
                  stroke={i === 0 ? C.accentAlt : C.accentPink}
                  strokeWidth="1.5"
                  strokeOpacity="0.5"
                />
              ))}
            </svg>
          </div>

          {/* Step cards */}
          <div className="flow-grid" style={{ display: "flex", gap: 20, position: "relative", zIndex: 1 }}>
            {steps.map((s, i) => {
              const isActive = activeStep === i;
              return (
                <div
                  key={i}
                  onMouseEnter={() => setActiveStep(i)}
                  onMouseLeave={() => setActiveStep(null)}
                  style={{
                    flex: 1,
                    padding: "34px 28px",
                    borderRadius: 18,
                    background: isActive ? `${s.color}06` : C.bgDeep,
                    border: `1px solid ${isActive ? `${s.color}35` : C.border}`,
                    boxShadow: isActive
                      ? `0 0 56px ${s.color}12, inset 0 1px 0 rgba(255,255,255,0.03)`
                      : "inset 0 1px 0 rgba(255,255,255,0.02)",
                    transition: "all 0.4s cubic-bezier(0.16,1,0.3,1)",
                    transform: isActive ? "translateY(-8px) scale(1.02)" : "translateY(0) scale(1)",
                    cursor: "default",
                    position: "relative",
                  }}
                >
                  {/* Watermark number */}
                  <div
                    className="font-display"
                    style={{
                      position: "absolute", top: 14, right: 18,
                      fontSize: 56, fontWeight: 800,
                      color: `${s.color}07`, lineHeight: 1, userSelect: "none",
                    }}
                  >
                    {i + 1}
                  </div>

                  {/* Live signal dot */}
                  {isActive && (
                    <div
                      style={{
                        position: "absolute", top: 18, left: 18,
                        width: 7, height: 7, borderRadius: "50%", background: s.color,
                      }}
                    >
                      <div
                        style={{
                          position: "absolute", inset: -4, borderRadius: "50%",
                          border: `1.5px solid ${s.color}`,
                          animation: "signal-ring 1.5s ease-out infinite",
                        }}
                      />
                    </div>
                  )}

                  {/* Icon */}
                  <div
                    style={{
                      width: 48, height: 48, borderRadius: 13,
                      background: `${s.color}08`, border: `1px solid ${s.color}12`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      color: s.color, marginBottom: 22,
                      transition: "all 0.35s cubic-bezier(0.16,1,0.3,1)",
                      transform: isActive ? "scale(1.14) rotate(-8deg)" : "scale(1)",
                      boxShadow: isActive ? `0 0 28px ${s.color}22` : "none",
                    }}
                  >
                    {s.icon}
                  </div>

                  <h3
                    className="font-display"
                    style={{ fontSize: 17, fontWeight: 700, color: "#fff", marginBottom: 12, letterSpacing: "-0.02em" }}
                  >
                    {s.title}
                  </h3>
                  <p style={{ fontSize: 13, lineHeight: 1.75, color: C.textMuted, marginBottom: 20 }}>
                    {s.desc}
                  </p>
                  <span
                    className="font-mono"
                    style={{
                      fontSize: 11, color: s.color, fontWeight: 600,
                      padding: "5px 12px", borderRadius: 7,
                      background: `${s.color}06`, border: `1px solid ${s.color}10`,
                    }}
                  >
                    {s.detail}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════
   SECTION 3: SECURITY — Enterprise dashboard
   ═══════════════════════════════════════ */
function SecuritySection(): React.JSX.Element {
  const ref = useReveal();
  const [shieldHovered, setShieldHovered] = useState(false);

  const cards = [
    {
      icon: <Key size={18} />,
      title: "Trade-Only Permissions",
      desc: "We only request "Trade" permissions on your Polymarket API key. Withdrawal access is never requested — it's architecturally impossible for us to move your funds.",
      color: C.accent,
    },
    {
      icon: <Shield size={18} />,
      title: "Funds Stay on Polymarket",
      desc: "Your USDC balance stays in your Polymarket account at all times. PolyWhale sends trade instructions as a SaaS layer — we're not a custodian or wallet provider.",
      color: C.accentAlt,
    },
    {
      icon: <Fingerprint size={18} />,
      title: "Revoke Access Instantly",
      desc: "API keys can be regenerated or revoked from your Polymarket settings in seconds, immediately cutting off bot access with zero risk to your balance.",
      color: C.accentPink,
    },
    {
      icon: <ShieldCheck size={18} />,
      title: "AES-256 Encryption",
      desc: "All keys encrypted at rest with AES-256 and transmitted over TLS 1.3. Stored in an isolated vault with zero-trust access and automatic rotation.",
      color: "#fbbf24",
    },
  ];

  return (
    <section style={{ padding: "100px 24px 140px" }}>
      <div ref={ref} className="rv" style={{ maxWidth: 1000, margin: "0 auto" }}>
        <SectionLabel num="03" text="Secure API Integration" color={C.accentPink} />

        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            gap: 20,
            marginBottom: 56,
            flexWrap: "wrap",
          }}
        >
          <div style={{ flex: "1 1 440px" }}>
            <h2
              className="font-display"
              style={{
                fontSize: "clamp(26px, 3.5vw, 40px)",
                fontWeight: 800,
                color: "#fff",
                letterSpacing: "-0.03em",
                marginBottom: 24,
                lineHeight: 1.1,
              }}
            >
              Your Funds{" "}
              <span style={{ color: C.accentPink }}>Never Leave</span>
              <br />Polymarket
            </h2>
            <p style={{ fontSize: 15, lineHeight: 1.8, color: C.textMuted, maxWidth: 480 }}>
              PolyWhale operates as a pure execution layer. We integrate using scoped,
              trade-only API permissions. Your capital is never at risk from our
              infrastructure &mdash; only from the markets themselves.
            </p>
          </div>

          {/* Shield icon */}
          <div
            onMouseEnter={() => setShieldHovered(true)}
            onMouseLeave={() => setShieldHovered(false)}
            style={{
              width: 72, height: 72, borderRadius: 18, flexShrink: 0, marginTop: 8,
              background: "rgba(244,114,182,0.03)", border: `1px solid ${C.border}`,
              display: "flex", alignItems: "center", justifyContent: "center", cursor: "default",
            }}
          >
            <div
              style={{
                color: C.accentPink,
                display: "flex",
                animation: shieldHovered ? "shield-glow 1.2s ease-in-out infinite" : "none",
              }}
            >
              <Shield size={32} />
            </div>
          </div>
        </div>

        {/* Enterprise permission panels — high-end security audit style */}
        <div
          className="perm-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 2,
            borderRadius: 18,
            overflow: "hidden",
            marginBottom: 48,
            border: `1px solid ${C.border}`,
            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.02), 0 28px 72px rgba(0,0,0,0.35)",
          }}
        >
          {/* Granted panel — very dark + subtle green tint */}
          <div
            style={{
              padding: 32,
              background: "linear-gradient(160deg, rgba(0,229,204,0.08) 0%, rgba(0,229,204,0.02) 100%)",
              borderRight: `1px solid rgba(0,229,204,0.06)`,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 24 }}>
              <div
                style={{
                  width: 8, height: 8, borderRadius: "50%",
                  background: C.accent, boxShadow: `0 0 10px ${C.accent}60`,
                }}
              />
              <span
                className="font-mono"
                style={{ fontSize: 11, fontWeight: 700, color: C.accent, letterSpacing: "0.1em", textTransform: "uppercase" }}
              >
                Granted
              </span>
            </div>
            {["Place Market Orders", "Place Limit Orders", "Cancel Open Orders", "Read Position Data"].map((p, i) => (
              <div
                key={i}
                style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 0", borderBottom: i < 3 ? "1px solid rgba(0,229,204,0.04)" : "none" }}
              >
                <div
                  style={{
                    width: 20, height: 20, borderRadius: 6, flexShrink: 0,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    background: "rgba(0,229,204,0.08)", border: "1px solid rgba(0,229,204,0.12)",
                  }}
                >
                  <Check size={11} color={C.accent} strokeWidth={3} />
                </div>
                <span className="font-mono" style={{ fontSize: 12, color: C.text, fontWeight: 500 }}>{p}</span>
              </div>
            ))}
          </div>

          {/* Blocked / Never Requested panel — very dark + subtle red tint */}
          <div
            style={{
              padding: 32,
              background: "linear-gradient(160deg, rgba(244,114,182,0.08) 0%, rgba(244,114,182,0.02) 100%)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 24 }}>
              <div
                style={{
                  width: 8, height: 8, borderRadius: "50%",
                  background: C.accentPink, opacity: 0.45,
                }}
              />
              <span
                className="font-mono"
                style={{ fontSize: 11, fontWeight: 700, color: C.accentPink, letterSpacing: "0.1em", textTransform: "uppercase" }}
              >
                Never Requested
              </span>
            </div>
            {["Withdraw Funds", "Transfer Assets", "Modify Account Settings", "Access Private Keys"].map((p, i) => (
              <div
                key={i}
                style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 0", borderBottom: i < 3 ? "1px solid rgba(244,114,182,0.04)" : "none" }}
              >
                <div
                  style={{
                    width: 20, height: 20, borderRadius: 6, flexShrink: 0,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    background: "rgba(244,114,182,0.06)", border: "1px solid rgba(244,114,182,0.08)",
                  }}
                >
                  <XIcon size={10} color={C.accentPink} strokeWidth={3} />
                </div>
                <span className="font-mono" style={{ fontSize: 12, color: "rgba(255,255,255,0.22)", fontWeight: 500 }}>{p}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Security detail cards */}
        <div className="sec-cards" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
          {cards.map((card, i) => {
            const [hovered, setHovered] = useState(false);
            return (
              <div
                key={i}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                style={{
                  padding: "28px 26px",
                  borderRadius: 16,
                  background: hovered ? `${card.color}05` : C.bgDeep,
                  border: `1px solid ${hovered ? `${card.color}20` : C.border}`,
                  boxShadow: hovered
                    ? `0 0 40px ${card.color}09`
                    : "inset 0 1px 0 rgba(255,255,255,0.015)",
                  transition: "all 0.35s cubic-bezier(0.16,1,0.3,1)",
                  transform: hovered ? "translateY(-4px)" : "translateY(0)",
                }}
              >
                <div
                  style={{
                    width: 40, height: 40, borderRadius: 11,
                    background: `${card.color}06`, border: `1px solid ${card.color}10`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: card.color, marginBottom: 18,
                    transition: "transform 0.3s ease",
                    transform: hovered ? "rotate(-6deg) scale(1.08)" : "rotate(0)",
                  }}
                >
                  {card.icon}
                </div>
                <h4
                  className="font-display"
                  style={{ fontSize: 15, fontWeight: 700, color: "#fff", marginBottom: 10, letterSpacing: "-0.02em" }}
                >
                  {card.title}
                </h4>
                <p style={{ fontSize: 13, lineHeight: 1.75, color: C.textMuted }}>{card.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════
   FINAL CTA
   ═══════════════════════════════════════ */
function FinalCTA(): React.JSX.Element {
  const ref = useReveal();

  return (
    <section style={{ padding: "20px 24px 140px" }}>
      <div
        ref={ref}
        className="rv"
        style={{
          maxWidth: 820, margin: "0 auto", padding: "64px 48px",
          borderRadius: 24, position: "relative", overflow: "hidden",
          background: "linear-gradient(145deg, rgba(0,229,204,0.035), rgba(124,92,252,0.045))",
          border: `1px solid ${C.border}`, textAlign: "center",
          boxShadow: "inset 0 1px 0 rgba(255,255,255,0.03)",
        }}
      >
        <div
          style={{
            position: "absolute", top: "-35%", right: "-12%", width: 350, height: 350,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(124,92,252,0.08), transparent 70%)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute", bottom: "-30%", left: "-8%", width: 280, height: 280,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(0,229,204,0.06), transparent 70%)",
            pointerEvents: "none",
          }}
        />

        <div style={{ position: "relative" }}>
          <div
            style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              padding: "7px 18px", borderRadius: 100,
              background: "rgba(124,92,252,0.06)", border: "1px solid rgba(124,92,252,0.1)",
              marginBottom: 32, fontSize: 12, color: C.accentAlt, fontWeight: 600,
              fontFamily: "DM Sans, sans-serif",
            }}
          >
            <Crown size={13} /> Join the Smart Money
          </div>

          <h2
            className="font-display"
            style={{
              fontSize: "clamp(28px, 4vw, 46px)",
              fontWeight: 800,
              color: "#fff",
              marginBottom: 20,
              letterSpacing: "-0.03em",
              lineHeight: 1.1,
            }}
          >
            Ready to Join the{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #00e5cc, #7c5cfc)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Top&nbsp;1%
            </span>
            ?
          </h2>

          <p
            style={{
              fontSize: 16, color: C.textMuted,
              maxWidth: 460, margin: "0 auto 44px", lineHeight: 1.8,
            }}
          >
            Every millisecond you wait is a millisecond the whales are ahead.
            Pick a plan, connect your account, and start mirroring alpha today.
          </p>

          <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
            <a
              href="/pricing"
              className="btn-shimmer font-display"
              style={{
                padding: "16px 36px", borderRadius: 14, border: "none", cursor: "pointer",
                color: "#060b18", fontWeight: 700, fontSize: 16,
                display: "inline-flex", alignItems: "center", gap: 10,
                textDecoration: "none", transition: "transform 0.2s, box-shadow 0.2s",
              }}
              onMouseEnter={(e) => {
                const t = e.currentTarget as HTMLAnchorElement;
                t.style.transform = "translateY(-2px) scale(1.02)";
                t.style.boxShadow = "0 10px 36px rgba(0,229,204,0.35)";
              }}
              onMouseLeave={(e) => {
                const t = e.currentTarget as HTMLAnchorElement;
                t.style.transform = "translateY(0) scale(1)";
                t.style.boxShadow = "none";
              }}
            >
              View Pricing <ArrowRight size={16} />
            </a>

            <a
              href="/whales"
              className="font-display"
              style={{
                padding: "16px 28px", borderRadius: 14, cursor: "pointer",
                background: "rgba(124,92,252,0.04)", border: "1px solid rgba(124,92,252,0.1)",
                color: C.accentAlt, fontWeight: 600, fontSize: 15,
                display: "inline-flex", alignItems: "center", gap: 8,
                textDecoration: "none", transition: "all 0.2s",
              }}
              onMouseEnter={(e) => {
                const t = e.currentTarget as HTMLAnchorElement;
                t.style.background = "rgba(124,92,252,0.1)";
                t.style.borderColor = "rgba(124,92,252,0.25)";
              }}
              onMouseLeave={(e) => {
                const t = e.currentTarget as HTMLAnchorElement;
                t.style.background = "rgba(124,92,252,0.04)";
                t.style.borderColor = "rgba(124,92,252,0.1)";
              }}
            >
              Browse Whales <ExternalLink size={14} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════
   MAIN PAGE
   ═══════════════════════════════════════ */
export default function HowItWorksPage(): React.JSX.Element {
  const [isSubscribed, setIsSubscribed] = useState<boolean>(false);

  return (
    <div style={{ background: C.bg, minHeight: "100vh" }}>
      <GlobalStyles />

      {/* Fixed background grid */}
      <div
        className="grid-bg"
        style={{ position: "fixed", inset: 0, opacity: 0.28, pointerEvents: "none" }}
      />

      <Header isSubscribed={isSubscribed} setIsSubscribed={setIsSubscribed} />

      <main style={{ position: "relative" }}>
        <Hero />
        <LatencySection />
        <MirroringSection />
        <SecuritySection />
        <FinalCTA />

        {/* Footer */}
        <footer
          style={{
            borderTop: `1px solid ${C.border}`,
            padding: "36px 24px",
            textAlign: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 20,
              flexWrap: "wrap",
            }}
          >
            <span style={{ fontSize: 11, color: C.textDim }}>
              &copy; 2026 PolyWhale. All rights reserved. Prediction markets involve risk.
            </span>
            <div style={{ display: "flex", gap: 16 }}>
              {["Terms", "Privacy", "Risk Disclosure"].map((s, i) => (
                <a
                  key={i}
                  href="#"
                  style={{ fontSize: 11, color: C.textDim, textDecoration: "none", transition: "color 0.2s" }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = C.accent)}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = C.textDim)}
                >
                  {s}
                </a>
              ))}
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
