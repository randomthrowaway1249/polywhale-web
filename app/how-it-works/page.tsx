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
  ChevronDown,
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
} from "lucide-react";

/* ─── refined palette ─── */
const C = {
  bg: "#060b18",
  bgCard: "rgba(10,16,34,0.55)",
  bgDeep: "rgba(6,10,24,0.85)",
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
      .font-mono { font-family: 'JetBrains Mono', monospace; }

      .glass {
        background: rgba(8,14,28,0.78);
        backdrop-filter: blur(20px);
        -webkit-backdrop-filter: blur(20px);
        border: 1px solid ${C.border};
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
          linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px);
        background-size: 72px 72px;
        animation: grid-drift 25s linear infinite;
      }

      @keyframes fade-up {
        0% { opacity: 0; transform: translateY(32px); }
        100% { opacity: 1; transform: translateY(0); }
      }

      /* Hero orb animations — slow drifting */
      @keyframes orb-drift-a {
        0%, 100% { transform: translate(0, 0) scale(1); }
        33% { transform: translate(50px, -35px) scale(1.06); }
        66% { transform: translate(-25px, 25px) scale(0.96); }
      }
      @keyframes orb-drift-b {
        0%, 100% { transform: translate(0, 0) scale(1); }
        33% { transform: translate(-55px, 30px) scale(0.95); }
        66% { transform: translate(35px, -45px) scale(1.05); }
      }
      @keyframes orb-drift-c {
        0%, 100% { transform: translate(0, 0) scale(1); }
        50% { transform: translate(30px, 40px) scale(1.03); }
      }

      /* Interactive icon animations */
      @keyframes zap-pulse {
        0%, 100% { transform: scale(1); filter: drop-shadow(0 0 6px rgba(0,229,204,0.25)); }
        50% { transform: scale(1.22); filter: drop-shadow(0 0 22px rgba(0,229,204,0.75)); }
      }
      @keyframes target-spin {
        0% { transform: rotate(0deg) scale(1); }
        50% { transform: rotate(18deg) scale(1.14); }
        100% { transform: rotate(0deg) scale(1); }
      }
      @keyframes shield-glow {
        0%, 100% { filter: drop-shadow(0 0 4px rgba(244,114,182,0.2)); transform: scale(1); }
        50% { filter: drop-shadow(0 0 20px rgba(244,114,182,0.7)); transform: scale(1.16); }
      }

      @keyframes signal-ring {
        0% { transform: scale(1); opacity: 0.7; }
        100% { transform: scale(3); opacity: 0; }
      }

      @keyframes bar-fill {
        0% { transform: scaleX(0); }
        100% { transform: scaleX(1); }
      }

      @keyframes scroll-dot {
        0%, 100% { opacity: 0.35; transform: translateY(0); }
        50% { opacity: 1; transform: translateY(7px); }
      }

      @keyframes flow-dash {
        0% { stroke-dashoffset: 12; }
        100% { stroke-dashoffset: 0; }
      }

      /* Scroll reveal */
      .rv {
        opacity: 0;
        transform: translateY(44px);
        transition: opacity 1s cubic-bezier(0.16,1,0.3,1), transform 1s cubic-bezier(0.16,1,0.3,1);
      }
      .rv.vis { opacity: 1; transform: translateY(0); }

      ::-webkit-scrollbar { width: 5px; }
      ::-webkit-scrollbar-track { background: transparent; }
      ::-webkit-scrollbar-thumb { background: rgba(0,229,204,0.12); border-radius: 3px; }

      @media(max-width:768px) {
        .hide-mobile { display: none !important; }
        .show-mobile-only { display: block !important; }
        .lat-layout { flex-direction: column !important; }
        .flow-grid { flex-direction: column !important; }
        .flow-connector { display: none !important; }
        .perm-grid { grid-template-columns: 1fr !important; }
        .sec-cards { grid-template-columns: 1fr !important; }
      }
      @media(min-width:769px) {
        .show-mobile-only { display: none !important; }
      }
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
   SOCIALS DROPDOWN
   ═══════════════════════════════════════ */
function SocialsDropdown(): React.JSX.Element {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const h = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  const socials = [
    { name: "Discord", href: "#" },
    { name: "Telegram", href: "#" },
    { name: "X (Twitter)", href: "#" },
  ];

  return (
    <div ref={ref} style={{ position: "relative" }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          color: C.textMuted, background: "none", border: "none", fontSize: 13,
          fontWeight: 500, cursor: "pointer", display: "flex", alignItems: "center",
          gap: 4, fontFamily: "DM Sans, sans-serif", transition: "color 0.2s",
        }}
        onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.color = C.accent)}
        onMouseLeave={(e) => {
          if (!open) (e.currentTarget as HTMLButtonElement).style.color = C.textMuted;
        }}
      >
        Socials
        <ChevronDown size={13} style={{ transition: "transform 0.25s", transform: open ? "rotate(180deg)" : "rotate(0)" }} />
      </button>

      {open && (
        <div
          className="glass"
          style={{
            position: "absolute", top: "calc(100% + 12px)", right: 0, minWidth: 180,
            borderRadius: 14, padding: 6, zIndex: 200, animation: "fade-up 0.2s ease both",
            boxShadow: "0 20px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.03)",
          }}
        >
          {socials.map((s, i) => (
            <a
              key={i} href={s.href} onClick={() => setOpen(false)}
              style={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                padding: "10px 14px", borderRadius: 8, textDecoration: "none",
                color: C.text, fontSize: 13, fontWeight: 500, transition: "background 0.15s",
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.background = "rgba(255,255,255,0.04)")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.background = "transparent")}
            >
              {s.name}
              <ExternalLink size={11} style={{ opacity: 0.3 }} />
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════
   HEADER
   ═══════════════════════════════════════ */
function Header({
  isSubscribed, setIsSubscribed,
}: {
  isSubscribed: boolean; setIsSubscribed: (v: boolean) => void;
}): React.JSX.Element {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  const navLinks = ["Home", "The Bot", "Whales", "Pricing", "How It Works"];
  const linkHrefs: Record<string, string> = {
    Home: "/", "The Bot": "/#the-bot", Whales: "/whales",
    Pricing: "/pricing", "How It Works": "/how-it-works",
  };

  return (
    <header
      className="glass font-display"
      style={{
        position: "sticky", top: 0, zIndex: 100,
        padding: scrolled ? "10px 0" : "16px 0",
        borderBottom: `1px solid ${scrolled ? C.borderSubtle : "transparent"}`,
        transition: "all 0.35s ease",
      }}
    >
      <div style={{ maxWidth: 1140, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        {/* Logo */}
        <a href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
          <div style={{ width: 34, height: 34, borderRadius: 9, background: "linear-gradient(135deg, #00e5cc, #7c5cfc)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Waves size={18} color="#060b18" strokeWidth={2.5} />
          </div>
          <span style={{ fontSize: 21, fontWeight: 800, letterSpacing: "-0.03em", color: "#fff" }}>
            Poly<span style={{ color: C.accent }}>Whale</span>
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hide-mobile" style={{ display: "flex", alignItems: "center", gap: 22 }}>
          {navLinks.map((l) => (
            <a
              key={l} href={linkHrefs[l]}
              style={{
                color: l === "How It Works" ? C.accent : C.textMuted,
                textDecoration: "none", fontSize: 13, letterSpacing: "-0.01em",
                fontWeight: l === "How It Works" ? 600 : 500, transition: "color 0.2s",
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = C.accent)}
              onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = l === "How It Works" ? C.accent : C.textMuted)}
            >{l}</a>
          ))}
          <SocialsDropdown />

          {/* Dev toggle */}
          <button
            onClick={() => setIsSubscribed(!isSubscribed)}
            style={{
              display: "flex", alignItems: "center", gap: 7,
              padding: "6px 12px", borderRadius: 8,
              border: `1px solid ${isSubscribed ? "rgba(0,229,204,0.2)" : "rgba(124,92,252,0.2)"}`,
              background: isSubscribed ? "rgba(0,229,204,0.06)" : "rgba(124,92,252,0.06)",
              color: isSubscribed ? C.accent : C.accentAlt,
              fontSize: 11, fontWeight: 600, cursor: "pointer",
              fontFamily: "DM Sans, sans-serif", transition: "all 0.3s ease",
            }}
          >
            {isSubscribed ? <Eye size={12} /> : <EyeOff size={12} />}
            {isSubscribed ? "PRO" : "Free"}
            <div style={{
              width: 26, height: 14, borderRadius: 7,
              background: isSubscribed ? "rgba(0,229,204,0.25)" : "rgba(255,255,255,0.08)",
              position: "relative", transition: "background 0.3s",
            }}>
              <div style={{
                width: 10, height: 10, borderRadius: "50%",
                background: isSubscribed ? C.accent : C.textDim,
                position: "absolute", top: 2, left: isSubscribed ? 14 : 2,
                transition: "all 0.3s cubic-bezier(0.16,1,0.3,1)",
                boxShadow: isSubscribed ? "0 0 8px rgba(0,229,204,0.5)" : "none",
              }} />
            </div>
          </button>

          <button
            style={{
              padding: "9px 22px", borderRadius: 10, border: "none", cursor: "pointer",
              background: "linear-gradient(135deg, #00e5cc, #00c4b0)",
              color: "#060b18", fontWeight: 700, fontSize: 13, fontFamily: "Syne, sans-serif",
              transition: "transform 0.2s, box-shadow 0.2s",
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-1px)"; (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 4px 20px rgba(0,229,204,0.3)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)"; (e.currentTarget as HTMLButtonElement).style.boxShadow = "none"; }}
          >
            Launch App <ArrowRight size={13} style={{ marginLeft: 4, verticalAlign: "middle" }} />
          </button>
        </nav>

        <button onClick={() => setMobileOpen(!mobileOpen)} className="show-mobile-only"
          style={{ background: "none", border: "none", color: "#fff", cursor: "pointer" }}>
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {mobileOpen && (
        <div className="show-mobile-only" style={{ padding: "16px 24px", display: "flex", flexDirection: "column", gap: 14 }}>
          {[...navLinks, "Discord", "Telegram", "X (Twitter)"].map((l) => (
            <a key={l} href={linkHrefs[l] || "#"} onClick={() => setMobileOpen(false)}
              style={{ color: l === "How It Works" ? C.accent : C.textMuted, textDecoration: "none", fontSize: 15, fontWeight: 500 }}>{l}</a>
          ))}
          <button onClick={() => setIsSubscribed(!isSubscribed)}
            style={{ padding: "8px 16px", borderRadius: 8, border: `1px solid ${isSubscribed ? "rgba(0,229,204,0.2)" : "rgba(124,92,252,0.2)"}`, background: isSubscribed ? "rgba(0,229,204,0.06)" : "rgba(124,92,252,0.06)", color: isSubscribed ? C.accent : C.accentAlt, fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "DM Sans, sans-serif" }}>
            {isSubscribed ? "PRO Active" : "Free Tier"} (Toggle)
          </button>
        </div>
      )}
    </header>
  );
}

/* ═══════════════════════════════════════
   SECTION LABEL — minimal mono tag
   ═══════════════════════════════════════ */
function SectionLabel({ num, text, color }: { num: string; text: string; color: string }): React.JSX.Element {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 24 }}>
      <span className="font-mono" style={{
        fontSize: 11, fontWeight: 700, color, letterSpacing: "0.08em",
        padding: "5px 12px", borderRadius: 8,
        background: `${color}08`, border: `1px solid ${color}12`,
      }}>{num}</span>
      <span className="font-display" style={{
        fontSize: 11, fontWeight: 700, color, textTransform: "uppercase", letterSpacing: "0.14em",
      }}>{text}</span>
    </div>
  );
}

/* ═══════════════════════════════════════
   HERO — Animated gradient orbs
   ═══════════════════════════════════════ */
function Hero(): React.JSX.Element {
  return (
    <section style={{ position: "relative", padding: "110px 24px 70px", textAlign: "center", overflow: "hidden" }}>
      {/* Animated gradient orbs — deep ocean feel */}
      <div style={{
        position: "absolute", top: "50%", left: "50%", width: 720, height: 720,
        marginLeft: -360, marginTop: -360, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(0,229,204,0.09) 0%, transparent 65%)",
        filter: "blur(60px)", animation: "orb-drift-a 20s ease-in-out infinite", pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", top: "42%", left: "56%", width: 560, height: 560,
        marginLeft: -280, marginTop: -280, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(124,92,252,0.08) 0%, transparent 65%)",
        filter: "blur(50px)", animation: "orb-drift-b 24s ease-in-out infinite", pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", top: "62%", left: "38%", width: 380, height: 380,
        marginLeft: -190, marginTop: -190, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(244,114,182,0.04) 0%, transparent 65%)",
        filter: "blur(40px)", animation: "orb-drift-c 28s ease-in-out infinite", pointerEvents: "none",
      }} />

      <div style={{ position: "relative", maxWidth: 680, margin: "0 auto" }}>
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 8,
          padding: "7px 16px", borderRadius: 100,
          background: "rgba(0,229,204,0.05)", border: "1px solid rgba(0,229,204,0.08)",
          marginBottom: 32, fontSize: 12, color: C.accent, fontWeight: 500,
          animation: "fade-up 0.6s ease both",
        }}>
          <BrainCircuit size={13} /> The Science of Alpha
        </div>

        <h1 className="font-display" style={{
          fontSize: "clamp(36px, 5.5vw, 60px)", fontWeight: 800, color: "#fff",
          letterSpacing: "-0.035em", marginBottom: 28, lineHeight: 1.06,
          animation: "fade-up 0.6s ease 0.06s both",
        }}>
          How{" "}
          <span style={{
            background: "linear-gradient(135deg, #00e5cc, #7c5cfc)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          }}>Sub-Second Execution</span>
          <br />Wins Markets
        </h1>

        <p style={{
          fontSize: 17, color: C.textMuted, lineHeight: 1.8,
          maxWidth: 520, margin: "0 auto", letterSpacing: "-0.005em",
          animation: "fade-up 0.6s ease 0.12s both",
        }}>
          In prediction markets, information is only as valuable as the speed at
          which you can trade on it. See how PolyWhale gives you the institutional
          edge over every other participant.
        </p>

        {/* Scroll indicator */}
        <div style={{
          marginTop: 72, display: "flex", flexDirection: "column",
          alignItems: "center", gap: 10, animation: "fade-up 0.6s ease 0.2s both",
        }}>
          <span style={{ fontSize: 10, color: C.textDim, textTransform: "uppercase", letterSpacing: "0.16em", fontWeight: 500 }}>
            Scroll to explore
          </span>
          <div style={{
            width: 22, height: 38, borderRadius: 11,
            border: "1.5px solid rgba(255,255,255,0.06)",
            display: "flex", alignItems: "flex-start", justifyContent: "center", paddingTop: 8,
          }}>
            <div style={{
              width: 3, height: 8, borderRadius: 2, background: C.accent, opacity: 0.5,
              animation: "scroll-dot 2s ease-in-out infinite",
            }} />
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

  const bars = [
    { label: "Human Trader", sub: "Toronto, ON", ms: "150\u2013300ms", pct: 92, color: C.accentPink, glow: "rgba(244,114,182,0.25)" },
    { label: "Competing Bot", sub: "US-East-1", ms: "40\u201380ms", pct: 32, color: "#fbbf24", glow: "rgba(251,191,36,0.2)" },
    { label: "PolyWhale", sub: "EU-West-1", ms: "<20ms", pct: 7, color: C.accent, glow: "rgba(0,229,204,0.35)" },
  ];

  return (
    <section style={{ padding: "140px 24px 100px" }}>
      <div ref={ref} className="rv" style={{ maxWidth: 1000, margin: "0 auto" }}>
        <SectionLabel num="01" text="The Latency Advantage" color={C.accent} />

        <div className="lat-layout" style={{ display: "flex", gap: 64, alignItems: "flex-start" }}>
          {/* Copy */}
          <div style={{ flex: "1 1 420px" }}>
            <h2 className="font-display" style={{
              fontSize: "clamp(26px, 3.5vw, 40px)", fontWeight: 800, color: "#fff",
              letterSpacing: "-0.03em", marginBottom: 24, lineHeight: 1.1,
            }}>
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

            {/* Zap badge */}
            <div
              onMouseEnter={() => setZapHovered(true)}
              onMouseLeave={() => setZapHovered(false)}
              style={{
                display: "inline-flex", alignItems: "center", gap: 14,
                padding: "14px 24px", borderRadius: 14,
                background: zapHovered ? "rgba(0,229,204,0.07)" : "rgba(0,229,204,0.025)",
                border: `1px solid ${zapHovered ? "rgba(0,229,204,0.18)" : C.border}`,
                cursor: "default", transition: "all 0.35s ease",
              }}
            >
              <div style={{
                color: C.accent, display: "flex",
                animation: zapHovered ? "zap-pulse 1.1s ease-in-out infinite" : "none",
              }}>
                <Zap size={20} />
              </div>
              <div>
                <div className="font-mono" style={{ fontSize: 15, color: C.accent, fontWeight: 700, letterSpacing: "-0.02em" }}>
                  14.2ms
                </div>
                <div style={{ fontSize: 11, color: C.textDim, marginTop: 2 }}>avg. execution time</div>
              </div>
            </div>
          </div>

          {/* Bloomberg-style latency panel */}
          <div style={{ flex: "1 1 380px" }}>
            <div style={{
              padding: "28px 28px 24px", borderRadius: 18,
              background: C.bgDeep,
              border: `1px solid ${C.border}`,
              boxShadow: "inset 0 1px 0 rgba(255,255,255,0.02), 0 24px 64px rgba(0,0,0,0.35)",
            }}>
              {/* Terminal header */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 28 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ width: 7, height: 7, borderRadius: "50%", background: C.accent, boxShadow: `0 0 8px ${C.accent}60` }} />
                  <span className="font-mono" style={{ fontSize: 10, color: C.textDim, letterSpacing: "0.12em", textTransform: "uppercase" }}>
                    Latency Monitor
                  </span>
                </div>
                <span className="font-mono" style={{ fontSize: 10, color: C.textDim, letterSpacing: "0.06em" }}>LIVE</span>
              </div>

              {/* Bars */}
              <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                {bars.map((b, i) => (
                  <div key={i}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 10 }}>
                      <div>
                        <span style={{ fontSize: 13, color: C.text, fontWeight: 600, letterSpacing: "-0.01em" }}>{b.label}</span>
                        <span style={{ fontSize: 11, color: C.textDim, marginLeft: 8 }}>{b.sub}</span>
                      </div>
                      <span className="font-mono" style={{
                        fontSize: 13, fontWeight: 700, color: b.color, letterSpacing: "-0.02em",
                        textShadow: `0 0 16px ${b.glow}`,
                      }}>
                        {b.ms}
                      </span>
                    </div>
                    {/* Sleek thin bar */}
                    <div style={{
                      position: "relative", height: 5, borderRadius: 3,
                      background: "rgba(255,255,255,0.02)", overflow: "hidden",
                    }}>
                      <div style={{
                        position: "absolute", top: 0, left: 0, height: "100%",
                        width: `${b.pct}%`, borderRadius: 3,
                        background: `linear-gradient(90deg, ${b.color}bb, ${b.color})`,
                        boxShadow: `0 0 16px ${b.glow}, inset 0 1px 0 rgba(255,255,255,0.15)`,
                        transformOrigin: "left",
                        animation: `bar-fill 1.4s cubic-bezier(0.16,1,0.3,1) ${i * 0.18}s both`,
                      }} />
                    </div>
                  </div>
                ))}
              </div>

              {/* Scale footer */}
              <div style={{
                display: "flex", justifyContent: "space-between",
                marginTop: 20, paddingTop: 16,
                borderTop: "1px solid rgba(255,255,255,0.025)",
              }}>
                {["0ms", "100ms", "200ms", "300ms"].map((v, i) => (
                  <span key={i} className="font-mono" style={{ fontSize: 9, color: C.textDim }}>{v}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Formula */}
        <div style={{
          marginTop: 72, padding: "40px 32px", borderRadius: 18,
          background: C.bgDeep, border: `1px solid ${C.border}`,
          boxShadow: "inset 0 1px 0 rgba(255,255,255,0.02)",
          textAlign: "center",
        }}>
          <div className="font-mono" style={{
            fontSize: 10, fontWeight: 600, color: C.textDim,
            textTransform: "uppercase", letterSpacing: "0.14em", marginBottom: 22,
          }}>
            Execution Model
          </div>
          <div className="font-mono" style={{
            fontSize: "clamp(14px, 2.2vw, 20px)", color: "#fff", fontWeight: 500,
            letterSpacing: "-0.01em", lineHeight: 2,
          }}>
            <span style={{ color: C.textDim }}>Total&nbsp;Latency</span>
            <span style={{ color: "rgba(255,255,255,0.18)", margin: "0 10px" }}>=</span>
            <span style={{ color: C.accentAlt }}>T<sub style={{ fontSize: "0.7em" }}>transmission</sub></span>
            <span style={{ color: "rgba(255,255,255,0.12)", margin: "0 8px" }}>+</span>
            <span style={{ color: C.accentAlt }}>T<sub style={{ fontSize: "0.7em" }}>processing</sub></span>
            <span style={{ color: "rgba(255,255,255,0.12)", margin: "0 8px" }}>+</span>
            <span style={{ color: C.accentAlt }}>T<sub style={{ fontSize: "0.7em" }}>execution</sub></span>
            <span style={{ color: "rgba(255,255,255,0.12)", margin: "0 10px" }}>&lt;</span>
            <span style={{ color: C.accent, fontWeight: 700, textShadow: "0 0 24px rgba(0,229,204,0.3)" }}>20ms</span>
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
   SECTION 2: MIRRORING — Connected flow
   ═══════════════════════════════════════ */
function MirroringSection(): React.JSX.Element {
  const ref = useReveal();
  const [targetHovered, setTargetHovered] = useState(false);
  const [activeStep, setActiveStep] = useState<number | null>(null);

  const steps = [
    {
      icon: <Radio size={22} />, title: "Detect Whale Move",
      desc: "Our indexer monitors 1,200+ verified whale wallets via Polymarket\u2019s event stream. The instant a whale places or adjusts a position, we capture the signal in real time.",
      detail: "~3ms detection", color: C.accent,
    },
    {
      icon: <Gauge size={22} />, title: "Calculate Position",
      desc: "The engine computes your optimal position size using your allocation, risk limits, whale conviction level, and current market depth \u2014 all within a single processing cycle.",
      detail: "~8ms processing", color: C.accentAlt,
    },
    {
      icon: <Zap size={22} />, title: "Instant Execution",
      desc: "Your mirrored order fires through co-located infrastructure directly to Polymarket\u2019s matching engine. Confirmed before most traders see the whale\u2019s move.",
      detail: "~6ms placement", color: C.accentPink,
    },
  ];

  return (
    <section style={{ padding: "100px 24px 140px" }}>
      <div ref={ref} className="rv" style={{ maxWidth: 1000, margin: "0 auto" }}>
        <SectionLabel num="02" text="The Mirroring Engine" color={C.accentAlt} />

        <div style={{ display: "flex", alignItems: "flex-start", gap: 20, marginBottom: 56, flexWrap: "wrap" }}>
          <div style={{ flex: "1 1 440px" }}>
            <h2 className="font-display" style={{
              fontSize: "clamp(26px, 3.5vw, 40px)", fontWeight: 800, color: "#fff",
              letterSpacing: "-0.03em", marginBottom: 24, lineHeight: 1.1,
            }}>
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
            <div style={{
              color: C.accentAlt, display: "flex",
              animation: targetHovered ? "target-spin 0.9s ease-in-out infinite" : "none",
            }}>
              <Target size={32} />
            </div>
          </div>
        </div>

        {/* Connected flow cards */}
        <div style={{ position: "relative" }}>
          {/* Glowing dashed connector line (desktop) */}
          <div className="flow-connector" style={{
            position: "absolute", top: "50%", left: "calc(33.33% - 6px)", right: "calc(33.33% - 6px)",
            height: 2, transform: "translateY(-1px)", zIndex: 0, pointerEvents: "none",
          }}>
            <svg width="100%" height="2" style={{ overflow: "visible" }}>
              <line x1="0" y1="1" x2="100%" y2="1"
                stroke="url(#flow-gradient)" strokeWidth="2" strokeDasharray="6 6"
                style={{ animation: "flow-dash 0.8s linear infinite" }}
              />
              <defs>
                <linearGradient id="flow-gradient" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor={C.accent} stopOpacity="0.4" />
                  <stop offset="50%" stopColor={C.accentAlt} stopOpacity="0.5" />
                  <stop offset="100%" stopColor={C.accentPink} stopOpacity="0.4" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          <div className="flow-grid" style={{ display: "flex", gap: 20, position: "relative", zIndex: 1 }}>
            {steps.map((s, i) => {
              const isActive = activeStep === i;
              return (
                <div
                  key={i}
                  onMouseEnter={() => setActiveStep(i)}
                  onMouseLeave={() => setActiveStep(null)}
                  style={{
                    flex: 1, padding: "34px 28px", borderRadius: 18,
                    background: isActive ? `${s.color}05` : C.bgDeep,
                    border: `1px solid ${isActive ? `${s.color}30` : C.border}`,
                    boxShadow: isActive
                      ? `0 0 50px ${s.color}10, inset 0 1px 0 rgba(255,255,255,0.03)`
                      : "inset 0 1px 0 rgba(255,255,255,0.02)",
                    transition: "all 0.4s cubic-bezier(0.16,1,0.3,1)",
                    transform: isActive ? "translateY(-7px)" : "translateY(0)",
                    cursor: "default", position: "relative",
                  }}
                >
                  {/* Watermark number */}
                  <div className="font-display" style={{
                    position: "absolute", top: 14, right: 18, fontSize: 56, fontWeight: 800,
                    color: `${s.color}05`, lineHeight: 1, userSelect: "none",
                  }}>
                    {i + 1}
                  </div>

                  {/* Live signal dot */}
                  {isActive && (
                    <div style={{
                      position: "absolute", top: 18, left: 18,
                      width: 7, height: 7, borderRadius: "50%", background: s.color,
                    }}>
                      <div style={{
                        position: "absolute", inset: -4, borderRadius: "50%",
                        border: `1.5px solid ${s.color}`,
                        animation: "signal-ring 1.5s ease-out infinite",
                      }} />
                    </div>
                  )}

                  {/* Icon */}
                  <div style={{
                    width: 48, height: 48, borderRadius: 13,
                    background: `${s.color}08`, border: `1px solid ${s.color}10`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: s.color, marginBottom: 22,
                    transition: "all 0.35s cubic-bezier(0.16,1,0.3,1)",
                    transform: isActive ? "scale(1.14) rotate(-8deg)" : "scale(1)",
                    boxShadow: isActive ? `0 0 28px ${s.color}18` : "none",
                  }}>
                    {s.icon}
                  </div>

                  <h3 className="font-display" style={{
                    fontSize: 17, fontWeight: 700, color: "#fff",
                    marginBottom: 12, letterSpacing: "-0.02em",
                  }}>
                    {s.title}
                  </h3>
                  <p style={{ fontSize: 13, lineHeight: 1.75, color: C.textMuted, marginBottom: 20 }}>
                    {s.desc}
                  </p>
                  <span className="font-mono" style={{
                    fontSize: 11, color: s.color, fontWeight: 600,
                    padding: "5px 12px", borderRadius: 7,
                    background: `${s.color}06`, border: `1px solid ${s.color}10`,
                  }}>
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
    { icon: <Key size={18} />, title: "Trade-Only Permissions", desc: "We only request \u201CTrade\u201D permissions on your Polymarket API key. Withdrawal access is never requested \u2014 it\u2019s architecturally impossible for us to move your funds.", color: C.accent },
    { icon: <Shield size={18} />, title: "Funds Stay on Polymarket", desc: "Your USDC balance stays in your Polymarket account at all times. PolyWhale sends trade instructions as a SaaS layer \u2014 we\u2019re not a custodian or wallet provider.", color: C.accentAlt },
    { icon: <Fingerprint size={18} />, title: "Revoke Access Instantly", desc: "API keys can be regenerated or revoked from your Polymarket settings in seconds, immediately cutting off bot access with zero risk to your balance.", color: C.accentPink },
    { icon: <ShieldCheck size={18} />, title: "AES-256 Encryption", desc: "All keys encrypted at rest with AES-256 and transmitted over TLS 1.3. Stored in an isolated vault with zero-trust access and automatic rotation.", color: "#fbbf24" },
  ];

  return (
    <section style={{ padding: "100px 24px 140px" }}>
      <div ref={ref} className="rv" style={{ maxWidth: 1000, margin: "0 auto" }}>
        <SectionLabel num="03" text="Secure API Integration" color={C.accentPink} />

        <div style={{ display: "flex", alignItems: "flex-start", gap: 20, marginBottom: 56, flexWrap: "wrap" }}>
          <div style={{ flex: "1 1 440px" }}>
            <h2 className="font-display" style={{
              fontSize: "clamp(26px, 3.5vw, 40px)", fontWeight: 800, color: "#fff",
              letterSpacing: "-0.03em", marginBottom: 24, lineHeight: 1.1,
            }}>
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
            <div style={{
              color: C.accentPink, display: "flex",
              animation: shieldHovered ? "shield-glow 1.2s ease-in-out infinite" : "none",
            }}>
              <Shield size={32} />
            </div>
          </div>
        </div>

        {/* Enterprise permission panels — flush side-by-side */}
        <div className="perm-grid" style={{
          display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2,
          borderRadius: 18, overflow: "hidden", marginBottom: 48,
          border: `1px solid ${C.border}`,
          boxShadow: "inset 0 1px 0 rgba(255,255,255,0.02), 0 24px 64px rgba(0,0,0,0.3)",
        }}>
          {/* Granted panel */}
          <div style={{ padding: 30, background: "rgba(0,229,204,0.025)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 22 }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: C.accent, boxShadow: `0 0 8px ${C.accent}50` }} />
              <span className="font-mono" style={{ fontSize: 11, fontWeight: 700, color: C.accent, letterSpacing: "0.08em", textTransform: "uppercase" }}>
                Granted
              </span>
            </div>
            {["Place Market Orders", "Place Limit Orders", "Cancel Open Orders", "Read Position Data"].map((p, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 0" }}>
                <div style={{
                  width: 18, height: 18, borderRadius: 5,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  background: "rgba(0,229,204,0.06)", border: "1px solid rgba(0,229,204,0.1)",
                }}>
                  <Check size={10} color={C.accent} strokeWidth={3} />
                </div>
                <span className="font-mono" style={{ fontSize: 12, color: C.text, fontWeight: 500 }}>{p}</span>
              </div>
            ))}
          </div>

          {/* Blocked panel */}
          <div style={{ padding: 30, background: "rgba(244,114,182,0.02)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 22 }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: C.accentPink, opacity: 0.5 }} />
              <span className="font-mono" style={{ fontSize: 11, fontWeight: 700, color: C.accentPink, letterSpacing: "0.08em", textTransform: "uppercase" }}>
                Never Requested
              </span>
            </div>
            {["Withdraw Funds", "Transfer Assets", "Modify Account Settings", "Access Private Keys"].map((p, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 0" }}>
                <div style={{
                  width: 18, height: 18, borderRadius: 5,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  background: "rgba(244,114,182,0.04)", border: "1px solid rgba(244,114,182,0.06)",
                }}>
                  <XIcon size={9} color={C.accentPink} strokeWidth={3} />
                </div>
                <span className="font-mono" style={{ fontSize: 12, color: "rgba(255,255,255,0.25)", fontWeight: 500 }}>{p}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Security detail cards */}
        <div className="sec-cards" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
          {cards.map((c, i) => {
            const [hovered, setHovered] = useState(false);
            return (
              <div
                key={i}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                style={{
                  padding: "28px 26px", borderRadius: 16,
                  background: hovered ? `${c.color}04` : C.bgDeep,
                  border: `1px solid ${hovered ? `${c.color}18` : C.border}`,
                  boxShadow: hovered
                    ? `0 0 36px ${c.color}08`
                    : "inset 0 1px 0 rgba(255,255,255,0.015)",
                  transition: "all 0.35s cubic-bezier(0.16,1,0.3,1)",
                  transform: hovered ? "translateY(-4px)" : "translateY(0)",
                }}
              >
                <div style={{
                  width: 40, height: 40, borderRadius: 11,
                  background: `${c.color}06`, border: `1px solid ${c.color}10`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: c.color, marginBottom: 18,
                  transition: "transform 0.3s ease",
                  transform: hovered ? "rotate(-6deg) scale(1.08)" : "rotate(0)",
                }}>
                  {c.icon}
                </div>
                <h4 className="font-display" style={{ fontSize: 15, fontWeight: 700, color: "#fff", marginBottom: 10, letterSpacing: "-0.02em" }}>
                  {c.title}
                </h4>
                <p style={{ fontSize: 13, lineHeight: 1.75, color: C.textMuted }}>{c.desc}</p>
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
      <div ref={ref} className="rv" style={{
        maxWidth: 820, margin: "0 auto", padding: "64px 48px",
        borderRadius: 24, position: "relative", overflow: "hidden",
        background: "linear-gradient(145deg, rgba(0,229,204,0.035), rgba(124,92,252,0.045))",
        border: `1px solid ${C.border}`, textAlign: "center",
        boxShadow: "inset 0 1px 0 rgba(255,255,255,0.03)",
      }}>
        <div style={{
          position: "absolute", top: "-35%", right: "-12%", width: 350, height: 350,
          borderRadius: "50%", background: "radial-gradient(circle, rgba(124,92,252,0.08), transparent 70%)", pointerEvents: "none",
        }} />
        <div style={{
          position: "absolute", bottom: "-30%", left: "-8%", width: 280, height: 280,
          borderRadius: "50%", background: "radial-gradient(circle, rgba(0,229,204,0.06), transparent 70%)", pointerEvents: "none",
        }} />

        <div style={{ position: "relative" }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            padding: "7px 18px", borderRadius: 100,
            background: "rgba(124,92,252,0.06)", border: "1px solid rgba(124,92,252,0.08)",
            marginBottom: 32, fontSize: 12, color: C.accentAlt, fontWeight: 600,
          }}>
            <Crown size={13} /> Join the Smart Money
          </div>

          <h2 className="font-display" style={{
            fontSize: "clamp(28px, 4vw, 46px)", fontWeight: 800, color: "#fff",
            marginBottom: 20, letterSpacing: "-0.03em", lineHeight: 1.1,
          }}>
            Ready to Join the{" "}
            <span style={{
              background: "linear-gradient(135deg, #00e5cc, #7c5cfc)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            }}>Top&nbsp;1%</span>?
          </h2>

          <p style={{
            fontSize: 16, color: C.textMuted, maxWidth: 460,
            margin: "0 auto 44px", lineHeight: 1.8,
          }}>
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

      {/* Background grid */}
      <div className="grid-bg" style={{ position: "fixed", inset: 0, opacity: 0.3, pointerEvents: "none" }} />

      <Header isSubscribed={isSubscribed} setIsSubscribed={setIsSubscribed} />

      <main style={{ position: "relative" }}>
        <Hero />
        <LatencySection />
        <MirroringSection />
        <SecuritySection />
        <FinalCTA />

        {/* Footer */}
        <footer style={{ borderTop: `1px solid ${C.border}`, padding: "36px 24px", textAlign: "center" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 20, flexWrap: "wrap" }}>
            <span style={{ fontSize: 11, color: C.textDim }}>
              &copy; 2026 PolyWhale. All rights reserved. Prediction markets involve risk.
            </span>
            <div style={{ display: "flex", gap: 16 }}>
              {["Terms", "Privacy", "Risk Disclosure"].map((s, i) => (
                <a key={i} href="#" style={{ fontSize: 11, color: C.textDim, textDecoration: "none", transition: "color 0.2s" }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = C.accent)}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = C.textDim)}>
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