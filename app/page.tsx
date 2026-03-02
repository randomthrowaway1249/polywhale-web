"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Waves,
  Zap,
  Shield,
  ArrowRight,
  ChevronRight,
  Activity,
  Menu,
  X,
  Server,
  BrainCircuit,
  Crosshair,
  Filter,
  Eye,
  EyeOff,
  User,
  TrendingUp,
  Key,
} from "lucide-react";

/* ─── palette ─── */
const COLORS = {
  bg: "#060b18",
  bgCard: "rgba(12,20,40,0.65)",
  accent: "#00e5cc",
  accentAlt: "#7c5cfc",
  accentPink: "#f472b6",
  textPrimary: "#e2e8f0",
  textSecondary: "#8492a6",
  border: "rgba(0,229,204,0.12)",
};

/* ─── global styles ─── */
function GlobalStyles(): React.JSX.Element {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,wght@0,400;0,500;0,700;1,400&display=swap');

      :root {
        --accent: ${COLORS.accent};
        --accent-alt: ${COLORS.accentAlt};
        --bg: ${COLORS.bg};
      }

      *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

      body, html, #root {
        background: var(--bg);
        color: ${COLORS.textPrimary};
        font-family: 'DM Sans', sans-serif;
        overflow-x: hidden;
        scroll-behavior: smooth;
      }

      .font-display { font-family: 'Syne', sans-serif; }

      .glow-accent { text-shadow: 0 0 40px rgba(0,229,204,0.35); }
      .glow-box { box-shadow: 0 0 60px -12px rgba(0,229,204,0.2), inset 0 1px 0 rgba(255,255,255,0.05); }
      .glow-box-hover:hover { box-shadow: 0 0 80px -8px rgba(0,229,204,0.3), inset 0 1px 0 rgba(255,255,255,0.08); }

      .glass {
        background: rgba(10,16,32,0.7);
        backdrop-filter: blur(16px);
        -webkit-backdrop-filter: blur(16px);
        border: 1px solid rgba(0,229,204,0.08);
      }

      @keyframes scroll-left {
        0% { transform: translateX(0); }
        100% { transform: translateX(-50%); }
      }
      .ticker-track {
        animation: scroll-left 45s linear infinite;
      }
      .ticker-track:hover {
        animation-play-state: paused;
      }

      .reveal {
        opacity: 0;
        transform: translateY(32px);
        transition: opacity 0.7s cubic-bezier(0.16,1,0.3,1), transform 0.7s cubic-bezier(0.16,1,0.3,1);
      }
      .reveal.visible {
        opacity: 1;
        transform: translateY(0);
      }

      @keyframes shimmer {
        0% { background-position: -200% 0; }
        100% { background-position: 200% 0; }
      }
      .btn-shimmer {
        background: linear-gradient(110deg, #00e5cc 0%, #00e5cc 40%, #7dfff0 50%, #00e5cc 60%, #00e5cc 100%);
        background-size: 200% 100%;
        animation: shimmer 3s ease-in-out infinite;
      }

      @keyframes grid-drift {
        0% { transform: translate(0,0); }
        100% { transform: translate(40px,40px); }
      }
      .grid-bg {
        background-image:
          linear-gradient(rgba(0,229,204,0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0,229,204,0.03) 1px, transparent 1px);
        background-size: 60px 60px;
        animation: grid-drift 20s linear infinite;
      }

      @keyframes dash-pulse {
        0%,100% { opacity: 0.6; }
        50% { opacity: 1; }
      }

      /* Interactive icon animations */
      @keyframes icon-pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.15); }
      }
      @keyframes icon-glow-cyan {
        0%, 100% { filter: drop-shadow(0 0 4px rgba(0,229,204,0.2)); }
        50% { filter: drop-shadow(0 0 14px rgba(0,229,204,0.7)); }
      }
      @keyframes icon-glow-purple {
        0%, 100% { filter: drop-shadow(0 0 4px rgba(124,92,252,0.2)); }
        50% { filter: drop-shadow(0 0 14px rgba(124,92,252,0.7)); }
      }
      @keyframes icon-glow-pink {
        0%, 100% { filter: drop-shadow(0 0 4px rgba(244,114,182,0.2)); }
        50% { filter: drop-shadow(0 0 14px rgba(244,114,182,0.7)); }
      }
      @keyframes icon-glow-amber {
        0%, 100% { filter: drop-shadow(0 0 4px rgba(251,191,36,0.2)); }
        50% { filter: drop-shadow(0 0 14px rgba(251,191,36,0.7)); }
      }

      @keyframes fade-in-up {
        from { opacity: 0; transform: translateY(8px); }
        to   { opacity: 1; transform: translateY(0); }
      }

      ::-webkit-scrollbar { width: 6px; }
      ::-webkit-scrollbar-track { background: transparent; }
      ::-webkit-scrollbar-thumb { background: rgba(0,229,204,0.2); border-radius: 3px; }

      @media(max-width:768px){
        .hide-mobile{display:none!important}
        .show-mobile-only{display:block!important}
      }
      @media(min-width:769px){
        .show-mobile-only{display:none!important}
      }
      @media(max-width:900px){
        .hero-grid{grid-template-columns:1fr!important}
        .hide-on-wrap{display:none!important}
      }
      @media(max-width:768px){
        .footer-grid{grid-template-columns:1fr 1fr!important}
      }
    `}</style>
  );
}

/* ─── Intersection Observer hook ─── */
function useReveal(threshold: number = 0.15): React.RefObject<HTMLDivElement | null> {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          el.classList.add("visible");
          obs.unobserve(el);
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return ref;
}

/* ═══════════════════════════════════════
   HEADER
   ═══════════════════════════════════════ */
function Header({
  isSubscribed,
  setIsSubscribed,
}: {
  isSubscribed: boolean;
  setIsSubscribed: (v: boolean) => void;
}): React.JSX.Element {
  const [scrolled, setScrolled]       = useState<boolean>(false);
  const [mobileOpen, setMobileOpen]   = useState<boolean>(false);
  const [socialsOpen, setSocialsOpen] = useState<boolean>(false);
  const socialsRef                    = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Close socials dropdown when clicking outside */
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (socialsRef.current && !socialsRef.current.contains(e.target as Node)) {
        setSocialsOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // ── Exact nav links as specified ──
  const navLinks = ["The Bot", "Whales", "Pricing", "How It Works"];

  const getLinkHref = (label: string): string => {
    if (label === "The Bot")      return "/#the-bot";
    if (label === "Whales")       return "/whales";
    if (label === "Pricing")      return "/pricing";
    if (label === "How It Works") return "/how-it-works"; // absolute routing fix
    return "#";
  };

  const socialsLinks = [
    { label: "Discord",   href: "#", icon: "💬" },
    { label: "Telegram",  href: "#", icon: "✈️" },
    { label: "X",         href: "#", icon: "𝕏" },
  ];

  /* Shared link style */
  const linkStyle: React.CSSProperties = {
    color: "#e2e8f0",
    textDecoration: "none",
    fontSize: 14,
    fontWeight: 700,
    letterSpacing: "0.01em",
    transition: "color 0.2s",
    whiteSpace: "nowrap",
  };

  return (
    <header
      className="glass font-display"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        padding: scrolled ? "12px 0" : "16px 0",
        borderBottom: `1px solid ${scrolled ? "rgba(0,229,204,0.1)" : "rgba(0,229,204,0.06)"}`,
        transition: "all 0.3s ease",
      }}
    >
      <div
        style={{
          maxWidth: 1200,
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
              width: 36,
              height: 36,
              borderRadius: 10,
              background: "linear-gradient(135deg, #00e5cc, #7c5cfc)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Waves size={20} color="#060b18" strokeWidth={2.5} />
          </div>
          <span style={{ fontSize: 22, fontWeight: 800, letterSpacing: "-0.02em", color: "#fff" }}>
            Poly<span style={{ color: COLORS.accent }}>Whale</span>
          </span>
        </a>

        {/* ── Desktop nav ── */}
        <nav className="hide-mobile" style={{ display: "flex", alignItems: "center", gap: 28 }}>

          {/* Main links */}
          {navLinks.map((l) => (
            <a
              key={l}
              href={getLinkHref(l)}
              style={linkStyle}
              onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = COLORS.accent)}
              onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "#e2e8f0")}
            >
              {l}
            </a>
          ))}

          {/* Socials dropdown */}
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
                gap: 5,
                padding: 0,
                color: socialsOpen ? COLORS.accent : "#e2e8f0",
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.color = COLORS.accent)}
              onMouseLeave={(e) => {
                if (!socialsOpen) (e.currentTarget as HTMLButtonElement).style.color = "#e2e8f0";
              }}
            >
              Socials
              <ChevronRight
                size={13}
                style={{
                  transform: socialsOpen ? "rotate(90deg)" : "rotate(0deg)",
                  transition: "transform 0.2s ease",
                }}
              />
            </button>

            {/* Glassmorphism Dropdown panel */}
            {socialsOpen && (
              <div
                style={{
                  position: "absolute",
                  top: "calc(100% + 12px)",
                  right: 0,
                  minWidth: 160,
                  borderRadius: 12,
                  background: "rgba(10,16,36,0.96)",
                  backdropFilter: "blur(20px)",
                  WebkitBackdropFilter: "blur(20px)",
                  border: "1px solid rgba(0,229,204,0.12)",
                  boxShadow: "0 16px 48px rgba(0,0,0,0.4), 0 0 0 1px rgba(0,229,204,0.04)",
                  padding: "6px",
                  animation: "fade-in-up 0.15s ease both",
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
                      color: COLORS.textPrimary,
                      fontSize: 14,
                      fontWeight: 600,
                      fontFamily: "DM Sans, sans-serif",
                      transition: "background 0.15s, color 0.15s",
                    }}
                    onMouseEnter={(e) => {
                      const t = e.currentTarget as HTMLAnchorElement;
                      t.style.background = "rgba(0,229,204,0.07)";
                      t.style.color = COLORS.accent;
                    }}
                    onMouseLeave={(e) => {
                      const t = e.currentTarget as HTMLAnchorElement;
                      t.style.background = "transparent";
                      t.style.color = COLORS.textPrimary;
                    }}
                  >
                    <span style={{ fontSize: 15, lineHeight: 1 }}>{icon}</span>
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
              gap: 8,
              padding: "8px 16px",
              borderRadius: 8,
              border: `1px solid ${isSubscribed ? "rgba(0,229,204,0.3)" : "rgba(124,92,252,0.3)"}`,
              background: isSubscribed ? "rgba(0,229,204,0.08)" : "rgba(124,92,252,0.08)",
              color: isSubscribed ? COLORS.accent : COLORS.accentAlt,
              fontSize: 12,
              fontWeight: 600,
              cursor: "pointer",
              fontFamily: "DM Sans, sans-serif",
              whiteSpace: "nowrap",
              transition: "all 0.3s ease",
            }}
          >
            {isSubscribed ? <Eye size={14} /> : <EyeOff size={14} />}
            {isSubscribed ? "PRO Active" : "Free Tier"}
            <div
              style={{
                width: 32,
                height: 18,
                borderRadius: 9,
                background: isSubscribed ? "rgba(0,229,204,0.3)" : "rgba(255,255,255,0.1)",
                position: "relative",
                transition: "background 0.3s ease",
              }}
            >
              <div
                style={{
                  width: 14,
                  height: 14,
                  borderRadius: "50%",
                  background: isSubscribed ? COLORS.accent : COLORS.textSecondary,
                  position: "absolute",
                  top: 2,
                  left: isSubscribed ? 16 : 2,
                  transition: "all 0.3s cubic-bezier(0.16,1,0.3,1)",
                  boxShadow: isSubscribed ? "0 0 8px rgba(0,229,204,0.5)" : "none",
                }}
              />
            </div>
          </button>
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

      {/* ── Mobile menu ── */}
      {mobileOpen && (
        <div
          className="show-mobile-only"
          style={{ padding: "16px 24px", display: "flex", flexDirection: "column", gap: 4 }}
        >
          {/* Main links */}
          {navLinks.map((l) => (
            <a
              key={l}
              href={getLinkHref(l)}
              onClick={() => setMobileOpen(false)}
              style={{
                color: "#e2e8f0",
                textDecoration: "none",
                fontSize: 15,
                fontWeight: 700,
                padding: "10px 0",
                borderBottom: "1px solid rgba(255,255,255,0.04)",
              }}
            >
              {l}
            </a>
          ))}

          {/* Socials — expanded inline in mobile */}
          <div style={{ padding: "10px 0", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", color: COLORS.textSecondary, textTransform: "uppercase", marginBottom: 10 }}>
              Socials
            </div>
            {socialsLinks.map(({ label, href, icon }) => (
              <a
                key={label}
                href={href}
                onClick={() => setMobileOpen(false)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "8px 0",
                  textDecoration: "none",
                  color: COLORS.textSecondary,
                  fontSize: 14,
                  fontWeight: 600,
                }}
              >
                <span>{icon}</span> {label}
              </a>
            ))}
          </div>

          {/* PRO toggle */}
          <div style={{ paddingTop: 12 }}>
            <button
              onClick={() => { setIsSubscribed(!isSubscribed); setMobileOpen(false); }}
              style={{
                width: "100%",
                padding: "12px 16px",
                borderRadius: 10,
                border: `1px solid ${isSubscribed ? "rgba(0,229,204,0.3)" : "rgba(124,92,252,0.3)"}`,
                background: isSubscribed ? "rgba(0,229,204,0.08)" : "rgba(124,92,252,0.08)",
                color: isSubscribed ? COLORS.accent : COLORS.accentAlt,
                fontSize: 14,
                fontWeight: 600,
                cursor: "pointer",
                fontFamily: "DM Sans, sans-serif",
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              {isSubscribed ? <Eye size={16} /> : <EyeOff size={16} />}
              {isSubscribed ? "PRO Active — Click to disable" : "Free Tier — Click to upgrade"}
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

/* ═══════════════════════════════════════
   DASHBOARD MOCKUP
   ═══════════════════════════════════════ */
function DashboardMockup(): React.JSX.Element {
  const bars = [38, 52, 44, 70, 60, 82, 55, 90, 68, 78, 95, 72, 85, 62, 76];
  const line =
    "M0,80 C20,75 40,60 60,65 C80,70 100,40 120,45 C140,50 160,25 180,30 C200,35 220,15 240,20 C260,25 280,10 300,12";

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        maxWidth: 520,
        aspectRatio: "4/3",
        borderRadius: 16,
        overflow: "hidden",
        background: "linear-gradient(145deg, rgba(12,20,45,0.9), rgba(8,14,32,0.95))",
        border: "1px solid rgba(0,229,204,0.12)",
        boxShadow:
          "0 40px 100px -20px rgba(0,229,204,0.15), 0 0 0 1px rgba(0,229,204,0.05)",
      }}
    >
      {/* Top bar */}
      <div
        style={{
          padding: "14px 20px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: "1px solid rgba(0,229,204,0.08)",
        }}
      >
        <div style={{ display: "flex", gap: 6 }}>
          {["#ff5f57", "#ffbd2e", "#28ca41"].map((c, i) => (
            <div
              key={i}
              style={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                background: c,
                opacity: 0.8,
              }}
            />
          ))}
        </div>
        <span
          style={{
            fontSize: 11,
            color: COLORS.textSecondary,
            fontFamily: "monospace",
          }}
        >
          polywhale.io/dashboard
        </span>
        <Activity size={14} color={COLORS.accent} />
      </div>

      {/* Content area */}
      <div style={{ padding: 20 }}>
        {/* Stats row — high-roller values */}
        <div style={{ display: "flex", gap: 12, marginBottom: 20 }}>
          {[
            { label: "Portfolio", value: "$1,842,500", change: "+18.4%", up: true },
            { label: "Today P&L", value: "+$261,450", change: "+14.2%", up: true },
            { label: "Win Rate", value: "94.1%", change: "+4.5%", up: true },
          ].map((s, i) => (
            <div
              key={i}
              style={{
                flex: 1,
                padding: "10px 12px",
                borderRadius: 10,
                background: "rgba(0,229,204,0.04)",
                border: "1px solid rgba(0,229,204,0.08)",
              }}
            >
              <div style={{ fontSize: 10, color: COLORS.textSecondary, marginBottom: 4 }}>
                {s.label}
              </div>
              <div
                style={{
                  fontSize: 16,
                  fontWeight: 700,
                  color: "#fff",
                  fontFamily: "Syne, sans-serif",
                }}
              >
                {s.value}
              </div>
              <div
                style={{
                  fontSize: 10,
                  color: s.up ? COLORS.accent : COLORS.accentPink,
                  marginTop: 2,
                }}
              >
                {s.change}
              </div>
            </div>
          ))}
        </div>

        {/* Chart area — neon cyan-to-purple gradient */}
        <div style={{ position: "relative", height: 120, marginBottom: 16 }}>
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 300 100"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#7c5cfc" />
                <stop offset="100%" stopColor="#00e5cc" />
              </linearGradient>
              <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="rgba(0,229,204,0.15)" />
                <stop offset="100%" stopColor="rgba(0,229,204,0)" />
              </linearGradient>
            </defs>
            <path d={line + " L300,100 L0,100 Z"} fill="url(#areaGrad)" />
            <path
              d={line}
              fill="none"
              stroke="url(#lineGrad)"
              strokeWidth="2.5"
              strokeLinecap="round"
            >
              <animate
                attributeName="stroke-dashoffset"
                from="600"
                to="0"
                dur="2s"
                fill="freeze"
              />
              <animate
                attributeName="stroke-dasharray"
                from="600"
                to="600"
                dur="0.01s"
                fill="freeze"
              />
            </path>
            <circle
              cx="300"
              cy="12"
              r="4"
              fill="#00e5cc"
              style={{ animation: "dash-pulse 2s ease infinite" }}
            >
              <animate
                attributeName="opacity"
                values="0.5;1;0.5"
                dur="2s"
                repeatCount="indefinite"
              />
            </circle>
            <circle
              cx="300"
              cy="12"
              r="8"
              fill="none"
              stroke="#00e5cc"
              strokeWidth="1"
              opacity="0.3"
            >
              <animate
                attributeName="r"
                values="8;16;8"
                dur="2s"
                repeatCount="indefinite"
              />
              <animate
                attributeName="opacity"
                values="0.3;0;0.3"
                dur="2s"
                repeatCount="indefinite"
              />
            </circle>
          </svg>
        </div>

        {/* Mini bar chart */}
        <div style={{ display: "flex", alignItems: "flex-end", gap: 3, height: 40 }}>
          {bars.map((h, i) => (
            <div
              key={i}
              style={{
                flex: 1,
                height: `${h}%`,
                borderRadius: 2,
                background: `linear-gradient(to top, rgba(0,229,204,${0.2 + (h / 100) * 0.6}), rgba(124,92,252,${0.1 + (h / 100) * 0.3}))`,
                transition: "height 0.5s ease",
                transitionDelay: `${i * 40}ms`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Floating glow */}
      <div
        style={{
          position: "absolute",
          top: "30%",
          right: "-20%",
          width: 200,
          height: 200,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(0,229,204,0.12), transparent 70%)",
          pointerEvents: "none",
        }}
      />
    </div>
  );
}

/* ═══════════════════════════════════════
   HERO
   ═══════════════════════════════════════ */
function Hero(): React.JSX.Element {
  const ref = useReveal(0.1);

  return (
    <section
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        padding: "120px 24px 80px",
        overflow: "hidden",
      }}
    >
      <div className="grid-bg" style={{ position: "absolute", inset: 0, opacity: 0.5 }} />
      <div
        style={{
          position: "absolute",
          top: "10%",
          left: "15%",
          width: 500,
          height: 500,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(124,92,252,0.1), transparent 70%)",
          filter: "blur(40px)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "10%",
          right: "10%",
          width: 600,
          height: 600,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(0,229,204,0.07), transparent 70%)",
          filter: "blur(60px)",
          pointerEvents: "none",
        }}
      />

      <div
        ref={ref}
        className="reveal hero-grid"
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          width: "100%",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 60,
          alignItems: "center",
        }}
      >
        {/* Left: copy */}
        <div>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "6px 16px",
              borderRadius: 100,
              background: "rgba(0,229,204,0.08)",
              border: "1px solid rgba(0,229,204,0.15)",
              marginBottom: 28,
              fontSize: 13,
              color: COLORS.accent,
              fontWeight: 500,
            }}
          >
            <Zap size={13} /> Live on Polymarket &mdash; Sub-second execution
          </div>

          {/* Headline with gradient text effect */}
          <h1
            className="font-display glow-accent"
            style={{
              fontSize: "clamp(36px, 5vw, 64px)",
              fontWeight: 800,
              lineHeight: 1.08,
              letterSpacing: "-0.03em",
              marginBottom: 24,
              color: "#fff",
            }}
          >
            Ride the Waves of{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #00e5cc, #7c5cfc)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Smart Money
            </span>
          </h1>

          <p
            style={{
              fontSize: 18,
              lineHeight: 1.7,
              color: COLORS.textSecondary,
              maxWidth: 480,
              marginBottom: 36,
            }}
          >
            Mirror the exact prediction market positions of the most profitable
            Polymarket whales. PolyWhale&apos;s copy-trade engine detects whale
            movements and executes your position in milliseconds &mdash; fully
            non-custodial, purely mathematical.
          </p>

          {/* CTAs: Create Account + See Live Trades */}
          <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
            <button
              className="btn-shimmer font-display"
              style={{
                padding: "14px 32px",
                borderRadius: 12,
                border: "none",
                cursor: "pointer",
                color: "#060b18",
                fontWeight: 700,
                fontSize: 16,
                display: "flex",
                alignItems: "center",
                gap: 8,
                transition: "transform 0.2s, box-shadow 0.2s",
              }}
              onMouseEnter={(e) => {
                const t = e.currentTarget as HTMLButtonElement;
                t.style.transform = "translateY(-2px)";
                t.style.boxShadow = "0 8px 32px rgba(0,229,204,0.4)";
              }}
              onMouseLeave={(e) => {
                const t = e.currentTarget as HTMLButtonElement;
                t.style.transform = "translateY(0)";
                t.style.boxShadow = "none";
              }}
            >
              <User size={18} /> Create Account
            </button>

            <button
              style={{
                padding: "14px 28px",
                borderRadius: 12,
                cursor: "pointer",
                background: "rgba(0,229,204,0.06)",
                border: "1px solid rgba(0,229,204,0.2)",
                color: COLORS.accent,
                fontWeight: 600,
                fontSize: 15,
                fontFamily: "Syne, sans-serif",
                display: "flex",
                alignItems: "center",
                gap: 8,
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => {
                const t = e.currentTarget as HTMLButtonElement;
                t.style.background = "rgba(0,229,204,0.12)";
                t.style.borderColor = "rgba(0,229,204,0.35)";
              }}
              onMouseLeave={(e) => {
                const t = e.currentTarget as HTMLButtonElement;
                t.style.background = "rgba(0,229,204,0.06)";
                t.style.borderColor = "rgba(0,229,204,0.2)";
              }}
            >
              <TrendingUp size={18} /> See Live Trades
            </button>
          </div>

          {/* Quick stats */}
          <div style={{ display: "flex", gap: 32, marginTop: 48 }}>
            {[
              { val: "$48M+", label: "Volume Tracked" },
              { val: "1,200+", label: "Whales Indexed" },
              { val: "<20ms", label: "Avg. Latency" },
            ].map((s, i) => (
              <div key={i}>
                <div
                  className="font-display"
                  style={{ fontSize: 22, fontWeight: 800, color: "#fff" }}
                >
                  {s.val}
                </div>
                <div style={{ fontSize: 12, color: COLORS.textSecondary, marginTop: 2 }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: dashboard mockup */}
        <div style={{ display: "flex", justifyContent: "center" }}>
          <DashboardMockup />
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════
   TICKER — Polymarket prediction trades
   ═══════════════════════════════════════ */
interface Trade {
  wallet: string;
  action: string;
  amount: string;
  side: string;
  market: string;
  profit: string;
  positive: boolean;
}

function TradeItem({ t }: { t: Trade }): React.JSX.Element {
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 10,
        padding: "8px 18px",
        borderRadius: 8,
        background: "rgba(0,229,204,0.04)",
        border: "1px solid rgba(0,229,204,0.08)",
        marginRight: 16,
        whiteSpace: "nowrap",
        fontSize: 13,
      }}
    >
      <span style={{ color: COLORS.textSecondary, fontFamily: "monospace", fontSize: 12 }}>
        {t.wallet}
      </span>
      <span style={{ color: COLORS.textSecondary }}>{t.action}</span>
      <span style={{ color: "#fff", fontWeight: 600 }}>
        {t.amount}{" "}
        <span style={{ color: t.side === "YES" ? COLORS.accent : COLORS.accentPink, fontWeight: 700 }}>
          {t.side}
        </span>
      </span>
      <span style={{ color: COLORS.textSecondary, fontSize: 12 }}>on</span>
      <span style={{ color: "#fff", fontWeight: 500, fontStyle: "italic" }}>
        &lsquo;{t.market}&rsquo;
      </span>
      <span style={{ color: COLORS.textSecondary }}>&mdash;</span>
      <span
        style={{
          color: t.positive ? COLORS.accent : COLORS.accentPink,
          fontWeight: 700,
          padding: "2px 8px",
          borderRadius: 4,
          background: t.positive ? "rgba(0,229,204,0.1)" : "rgba(244,114,182,0.1)",
        }}
      >
        +{t.profit}
      </span>
    </div>
  );
}

function Ticker(): React.JSX.Element {
  const trades: Trade[] = [
    { wallet: "0xd8f3...a42b", action: "bought", amount: "$50k", side: "YES", market: "Fed Rate Cut July", profit: "$12,400", positive: true },
    { wallet: "0x91c2...f8e1", action: "sold", amount: "$10k", side: "NO", market: "Presidential Election", profit: "$3,100", positive: true },
    { wallet: "0x3fa7...12cd", action: "bought", amount: "$75k", side: "YES", market: "BTC Above $150k by Dec", profit: "$31,500", positive: true },
    { wallet: "0xbe45...9a03", action: "bought", amount: "$22k", side: "NO", market: "TikTok US Ban", profit: "$8,800", positive: true },
    { wallet: "0x72d1...e5b8", action: "bought", amount: "$40k", side: "YES", market: "ETH ETF Approved", profit: "$18,200", positive: true },
    { wallet: "0xaa93...4f12", action: "sold", amount: "$15k", side: "YES", market: "UFC 312 Main Event", profit: "$5,400", positive: true },
    { wallet: "0x5c0e...b7d4", action: "bought", amount: "$30k", side: "NO", market: "US Recession 2026", profit: "$11,700", positive: true },
    { wallet: "0xf1a8...c923", action: "bought", amount: "$120k", side: "YES", market: "SpaceX IPO This Year", profit: "$42,000", positive: true },
  ];

  return (
    <div
      style={{
        padding: "16px 0",
        overflow: "hidden",
        borderTop: "1px solid rgba(0,229,204,0.06)",
        borderBottom: "1px solid rgba(0,229,204,0.06)",
        background: "rgba(0,229,204,0.015)",
      }}
    >
      <div className="ticker-track" style={{ display: "flex", width: "max-content" }}>
        {[...trades, ...trades].map((t, i) => (
          <TradeItem key={i} t={t} />
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════
   ANIMATED ICON WRAPPER (shared)
   ═══════════════════════════════════════ */
function AnimatedIcon({
  children,
  gradient,
  glowClass,
  isHovered,
  size = 48,
  radius = 12,
}: {
  children: React.ReactNode;
  gradient: string;
  glowClass: string;
  isHovered: boolean;
  size?: number;
  radius?: number;
}): React.JSX.Element {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: radius,
        background: gradient,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 20,
        color: "#060b18",
        transform: isHovered ? "rotate(-8deg) scale(1.14)" : "rotate(0deg) scale(1)",
        boxShadow: isHovered
          ? `0 0 28px ${gradient.includes("00e5cc") ? "rgba(0,229,204,0.45)" : gradient.includes("7c5cfc") ? "rgba(124,92,252,0.45)" : gradient.includes("f472b6") ? "rgba(244,114,182,0.45)" : "rgba(251,191,36,0.45)"}`
          : "none",
        animation: isHovered ? `icon-pulse 1.4s ease-in-out infinite, ${glowClass} 1.4s ease-in-out infinite` : "none",
        transition: "transform 0.4s cubic-bezier(0.16,1,0.3,1), box-shadow 0.4s ease",
      }}
    >
      {children}
    </div>
  );
}

/* ═══════════════════════════════════════
   FEATURES — Polymarket-focused
   ═══════════════════════════════════════ */
function Features(): React.JSX.Element {
  const ref = useReveal();
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const features = [
    {
      icon: <Zap size={24} />,
      title: "Sub-Second Execution",
      desc: "Our engine detects whale positions on Polymarket and mirrors them to your account within 180ms. By the time a human trader reads a market shift, your position is already placed and confirmed.",
      gradient: "linear-gradient(135deg, #00e5cc, #00b8a9)",
      glowClass: "icon-glow-cyan",
    },
    {
      icon: <Server size={24} />,
      title: "EU-West 1 Proximity Edge",
      desc: "Our infrastructure is co-located in EU-West 1 — the same region as Polymarket's core exchange. Single-digit millisecond latency gives us an unfair speed advantage over every human trader and most competing bots.",
      gradient: "linear-gradient(135deg, #7c5cfc, #a78bfa)",
      glowClass: "icon-glow-purple",
    },
    {
      icon: <BrainCircuit size={24} />,
      title: "Zero-Emotion Execution",
      desc: "PolyWhale doesn't panic-sell, FOMO-buy, or second-guess. Every trade is purely mathematical — executed by algorithms that replicate whale logic with cold precision and zero cognitive bias.",
      gradient: "linear-gradient(135deg, #f472b6, #fb7185)",
      glowClass: "icon-glow-pink",
    },
    {
      icon: <Key size={24} />,
      title: "Non-Custodial & Transparent",
      desc: "Your funds never leave your wallet. PolyWhale executes via delegated smart contract authority on Polygon — full ownership, full transparency, revoke access with a single click anytime.",
      gradient: "linear-gradient(135deg, #fbbf24, #f59e0b)",
      glowClass: "icon-glow-amber",
    },
  ];

  return (
    <section id="the-bot" style={{ padding: "100px 24px", position: "relative" }}>
      <div
        style={{
          position: "absolute",
          top: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: 600,
          height: 600,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(124,92,252,0.06), transparent 70%)",
          filter: "blur(80px)",
          pointerEvents: "none",
        }}
      />

      <div ref={ref} className="reveal" style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <span
            className="font-display"
            style={{
              fontSize: 13,
              fontWeight: 600,
              color: COLORS.accent,
              textTransform: "uppercase",
              letterSpacing: "0.12em",
            }}
          >
            Core Features
          </span>
          <h2
            className="font-display"
            style={{
              fontSize: "clamp(28px, 4vw, 46px)",
              fontWeight: 800,
              color: "#fff",
              marginTop: 12,
              letterSpacing: "-0.02em",
            }}
          >
            Why <span style={{ color: COLORS.accent }}>PolyWhale</span>?
          </h2>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: 20,
          }}
        >
          {features.map((f, i) => (
            <div
              key={i}
              className="glow-box glow-box-hover"
              style={{
                padding: 32,
                borderRadius: 16,
                background: COLORS.bgCard,
                border: `1px solid ${hoveredIdx === i ? "rgba(0,229,204,0.25)" : COLORS.border}`,
                transition: "all 0.35s cubic-bezier(0.16,1,0.3,1)",
                cursor: "default",
                transform: hoveredIdx === i ? "translateY(-6px)" : "translateY(0)",
              }}
              onMouseEnter={() => setHoveredIdx(i)}
              onMouseLeave={() => setHoveredIdx(null)}
            >
              <AnimatedIcon
                gradient={f.gradient}
                glowClass={f.glowClass}
                isHovered={hoveredIdx === i}
              >
                {f.icon}
              </AnimatedIcon>
              <h3
                className="font-display"
                style={{ fontSize: 19, fontWeight: 700, color: "#fff", marginBottom: 10 }}
              >
                {f.title}
              </h3>
              <p style={{ fontSize: 14, lineHeight: 1.7, color: COLORS.textSecondary }}>
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════
   HOW IT WORKS — Polymarket-focused
   ═══════════════════════════════════════ */
function HowItWorks(): React.JSX.Element {
  const ref = useReveal();
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);

  const steps = [
    {
      num: "01",
      icon: <User size={28} />,
      title: "Create Your Account",
      desc: "Sign up in seconds — no KYC, no personal data required. Connect your Polygon wallet and you're live. Your keys stay yours; PolyWhale operates through non-custodial delegation only.",
      color: COLORS.accent,
      glowClass: "icon-glow-cyan",
    },
    {
      num: "02",
      icon: <Filter size={28} />,
      title: "Select a Profitable Whale",
      desc: "Browse our ranked leaderboard of verified Polymarket whales. Filter by win-rate on specific event topics — Politics, Crypto, Sports, or Finance — and pick the strategist that matches your thesis.",
      color: COLORS.accentAlt,
      glowClass: "icon-glow-purple",
    },
    {
      num: "03",
      icon: <Crosshair size={28} />,
      title: "Auto-Trade at Machine Speed",
      desc: "Set your allocation and risk limits, then let the bot work. When your whale enters a YES or NO position, PolyWhale mirrors it within milliseconds from our co-located EU-West 1 servers — faster than any human can type.",
      color: COLORS.accentPink,
      glowClass: "icon-glow-pink",
    },
  ];

  return (
    <section
      id="how-it-works"
      style={{
        padding: "100px 24px",
        position: "relative",
        background: "linear-gradient(180deg, transparent, rgba(0,229,204,0.02), transparent)",
      }}
    >
      <div ref={ref} className="reveal" style={{ maxWidth: 1000, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <span
            className="font-display"
            style={{
              fontSize: 13,
              fontWeight: 600,
              color: COLORS.accentAlt,
              textTransform: "uppercase",
              letterSpacing: "0.12em",
            }}
          >
            Get Started
          </span>
          <h2
            className="font-display"
            style={{
              fontSize: "clamp(28px, 4vw, 46px)",
              fontWeight: 800,
              color: "#fff",
              marginTop: 12,
              letterSpacing: "-0.02em",
            }}
          >
            Three Steps to{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #00e5cc, #7c5cfc)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Alpha
            </span>
          </h2>
        </div>

        <div
          style={{
            display: "flex",
            gap: 24,
            position: "relative",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {steps.map((s, i) => {
            const isHovered = hoveredStep === i;
            return (
              <div
                key={i}
                style={{
                  flex: "1 1 280px",
                  maxWidth: 320,
                  position: "relative",
                  padding: 32,
                  borderRadius: 16,
                  background: COLORS.bgCard,
                  border: `1px solid ${isHovered ? `${s.color}33` : COLORS.border}`,
                  transition: "all 0.35s cubic-bezier(0.16,1,0.3,1)",
                  transform: isHovered ? "translateY(-6px)" : "translateY(0)",
                }}
                onMouseEnter={() => setHoveredStep(i)}
                onMouseLeave={() => setHoveredStep(null)}
              >
                {/* Step number watermark */}
                <div
                  className="font-display"
                  style={{
                    fontSize: 64,
                    fontWeight: 800,
                    color: `${s.color}10`,
                    position: "absolute",
                    top: 12,
                    right: 20,
                    lineHeight: 1,
                    userSelect: "none",
                  }}
                >
                  {s.num}
                </div>

                {/* Icon — interactive with pulse/rotate/glow */}
                <div
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: 14,
                    background: `${s.color}15`,
                    border: `1px solid ${s.color}25`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: s.color,
                    marginBottom: 20,
                    position: "relative",
                    transform: isHovered ? "rotate(-8deg) scale(1.14)" : "rotate(0deg) scale(1)",
                    boxShadow: isHovered ? `0 0 24px ${s.color}35` : "none",
                    animation: isHovered
                      ? `icon-pulse 1.4s ease-in-out infinite, ${s.glowClass} 1.4s ease-in-out infinite`
                      : "none",
                    transition: "transform 0.4s cubic-bezier(0.16,1,0.3,1), box-shadow 0.4s ease",
                  }}
                >
                  {s.icon}
                </div>

                <h3 className="font-display" style={{ fontSize: 20, fontWeight: 700, color: "#fff", marginBottom: 10 }}>
                  {s.title}
                </h3>
                <p style={{ fontSize: 14, lineHeight: 1.7, color: COLORS.textSecondary }}>
                  {s.desc}
                </p>

                {i < 2 && (
                  <div
                    className="hide-on-wrap"
                    style={{
                      position: "absolute",
                      top: "50%",
                      right: -16,
                      transform: "translateY(-50%)",
                      color: COLORS.textSecondary,
                      opacity: 0.3,
                    }}
                  >
                    <ChevronRight size={20} />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════
   CTA BANNER
   ═══════════════════════════════════════ */
function CTABanner(): React.JSX.Element {
  const ref = useReveal();

  return (
    <section style={{ padding: "40px 24px 100px" }}>
      <div
        ref={ref}
        className="reveal"
        style={{
          maxWidth: 900,
          margin: "0 auto",
          padding: "56px 48px",
          borderRadius: 24,
          position: "relative",
          overflow: "hidden",
          background: "linear-gradient(135deg, rgba(0,229,204,0.08), rgba(124,92,252,0.08))",
          border: "1px solid rgba(0,229,204,0.12)",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "-50%",
            right: "-20%",
            width: 400,
            height: 400,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(0,229,204,0.12), transparent 70%)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-40%",
            left: "-10%",
            width: 300,
            height: 300,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(124,92,252,0.1), transparent 70%)",
            pointerEvents: "none",
          }}
        />

        <div style={{ position: "relative", textAlign: "center" }}>
          <h2
            className="font-display"
            style={{
              fontSize: "clamp(24px, 3.5vw, 38px)",
              fontWeight: 800,
              color: "#fff",
              marginBottom: 16,
              letterSpacing: "-0.02em",
            }}
          >
            Start Copy-Trading Polymarket Whales Today
          </h2>
          <p
            style={{
              fontSize: 16,
              color: COLORS.textSecondary,
              maxWidth: 520,
              margin: "0 auto 32px",
              lineHeight: 1.7,
            }}
          >
            Join thousands of traders already mirroring the smartest prediction
            market wallets. No minimum deposit. No subscription fees. Just alpha,
            executed at machine speed.
          </p>
          <a href="/pricing">
            <button
              className="btn-shimmer font-display"
              style={{
                padding: "16px 40px",
                borderRadius: 14,
                border: "none",
                cursor: "pointer",
                color: "#060b18",
                fontWeight: 700,
                fontSize: 17,
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                transition: "transform 0.2s, box-shadow 0.2s",
              }}
              onMouseEnter={(e) => {
                const t = e.currentTarget as HTMLButtonElement;
                t.style.transform = "translateY(-2px) scale(1.02)";
                t.style.boxShadow = "0 12px 40px rgba(0,229,204,0.4)";
              }}
              onMouseLeave={(e) => {
                const t = e.currentTarget as HTMLButtonElement;
                t.style.transform = "translateY(0) scale(1)";
                t.style.boxShadow = "none";
              }}
            >
              <User size={20} /> Get Started <ArrowRight size={16} />
            </button>
          </a>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════
   FOOTER
   ═══════════════════════════════════════ */
function Footer(): React.JSX.Element {
  const columns = [
    { title: "Product",   links: ["Dashboard", "Whale Index", "Analytics", "API"] },
    { title: "Resources", links: ["Documentation", "Tutorials", "Blog", "Changelog"] },
    { title: "Community", links: ["Discord", "Twitter / X", "Telegram", "GitHub"] },
    { title: "Legal",     links: ["Terms of Service", "Privacy Policy", "Risk Disclosure"] },
  ];

  return (
    <footer
      id="socials"
      style={{
        borderTop: "1px solid rgba(0,229,204,0.06)",
        padding: "64px 24px 32px",
        background: "linear-gradient(180deg, transparent, rgba(6,11,24,1))",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div
          className="footer-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1.5fr repeat(4, 1fr)",
            gap: 40,
            marginBottom: 48,
          }}
        >
          {/* Brand column */}
          <div>
            <a href="/" style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16, textDecoration: "none" }}>
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 8,
                  background: "linear-gradient(135deg, #00e5cc, #7c5cfc)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Waves size={18} color="#060b18" strokeWidth={2.5} />
              </div>
              <span className="font-display" style={{ fontSize: 20, fontWeight: 800, color: "#fff" }}>
                Poly<span style={{ color: COLORS.accent }}>Whale</span>
              </span>
            </a>
            <p style={{ fontSize: 13, lineHeight: 1.7, color: COLORS.textSecondary, maxWidth: 260 }}>
              The most advanced Polymarket whale copy-trading engine. Mirror smart
              money on prediction markets. Capture alpha. Stay non-custodial.
            </p>
          </div>

          {/* Link columns */}
          {columns.map((col, i) => (
            <div key={i}>
              <h4
                className="font-display"
                style={{
                  fontSize: 13,
                  fontWeight: 700,
                  color: "#fff",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  marginBottom: 16,
                }}
              >
                {col.title}
              </h4>
              <ul style={{ listStyle: "none", padding: 0 }}>
                {col.links.map((link, j) => (
                  <li key={j} style={{ marginBottom: 10 }}>
                    <a
                      href="#"
                      style={{ color: COLORS.textSecondary, textDecoration: "none", fontSize: 13, transition: "color 0.2s" }}
                      onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = COLORS.accent)}
                      onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = COLORS.textSecondary)}
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div
          style={{
            borderTop: "1px solid rgba(0,229,204,0.06)",
            paddingTop: 24,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 16,
          }}
        >
          <span style={{ fontSize: 12, color: COLORS.textSecondary }}>
            &copy; 2026 PolyWhale. All rights reserved. Prediction markets involve risk.
          </span>
          <div style={{ display: "flex", gap: 20 }}>
            {["Twitter", "Discord", "Telegram", "GitHub"].map((s, i) => (
              <a
                key={i}
                href="#"
                style={{ fontSize: 12, color: COLORS.textSecondary, textDecoration: "none", transition: "color 0.2s" }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = COLORS.accent)}
                onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = COLORS.textSecondary)}
              >
                {s}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ═══════════════════════════════════════
   MAIN APP
   ═══════════════════════════════════════ */
export default function PolyWhaleApp(): React.JSX.Element {
  const [isSubscribed, setIsSubscribed] = useState<boolean>(false);

  return (
    <div style={{ background: COLORS.bg, minHeight: "100vh" }}>
      <GlobalStyles />
      <Header isSubscribed={isSubscribed} setIsSubscribed={setIsSubscribed} />
      <Hero />
      <Ticker />
      <Features />
      <HowItWorks />
      <CTABanner />
      <Footer />
    </div>
  );
}
