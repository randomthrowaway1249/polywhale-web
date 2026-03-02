"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Waves,
  Zap,
  Shield,
  ArrowRight,
  Eye,
  EyeOff,
  Crown,
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
  Activity,
  Wallet,
} from "lucide-react";

/* ─────────────────────────────────────────
   PALETTE
───────────────────────────────────────── */
const C = {
  bg:           "#060b18",
  bgCard:       "rgba(11,18,33,0.80)",
  bgDeep:       "#0b1221",
  accent:       "#00e5cc",
  accentAlt:    "#7c5cfc",
  accentPink:   "#f472b6",
  text:         "#e2e8f0",
  textMuted:    "#94a3b8",
  textDim:      "#4a5568",
  border:       "rgba(255,255,255,0.04)",
  borderAccent: "rgba(0,229,204,0.10)",
};

/* ─────────────────────────────────────────
   GLOBAL STYLES
───────────────────────────────────────── */
function GlobalStyles(): React.JSX.Element {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600;9..40,700&family=JetBrains+Mono:wght@400;500;600;700&display=swap');

      :root {
        --accent:     ${C.accent};
        --accent-alt: ${C.accentAlt};
        --bg:         ${C.bg};
      }

      *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

      html, body {
        background: var(--bg);
        color: ${C.text};
        font-family: 'DM Sans', sans-serif;
        overflow-x: hidden;
        scroll-behavior: smooth;
        -webkit-font-smoothing: antialiased;
      }

      .font-syne { font-family: 'Syne', sans-serif; }
      .font-mono { font-family: 'JetBrains Mono', monospace; }

      .glass {
        background: rgba(7,12,26,0.82);
        backdrop-filter: blur(24px);
        -webkit-backdrop-filter: blur(24px);
        border: 1px solid rgba(255,255,255,0.04);
      }

      @keyframes shimmer {
        0%   { background-position: -200% 0; }
        100% { background-position:  200% 0; }
      }
      .btn-shimmer {
        background: linear-gradient(110deg,#00e5cc 0%,#00e5cc 38%,#7dfff0 50%,#00e5cc 62%,#00e5cc 100%);
        background-size: 200% 100%;
        animation: shimmer 3s ease-in-out infinite;
      }

      @keyframes grid-drift {
        0%   { transform: translate(0,0); }
        100% { transform: translate(48px,48px); }
      }
      .grid-bg {
        background-image:
          linear-gradient(rgba(255,255,255,0.012) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.012) 1px, transparent 1px);
        background-size: 64px 64px;
        animation: grid-drift 28s linear infinite;
      }

      @keyframes fade-up {
        from { opacity:0; transform:translateY(28px); }
        to   { opacity:1; transform:translateY(0);    }
      }

      @keyframes orb-a {
        0%,100% { transform: translate(0,0)       scale(1);    }
        33%     { transform: translate(55px,-40px) scale(1.07); }
        66%     { transform: translate(-30px,28px) scale(0.94); }
      }
      @keyframes orb-b {
        0%,100% { transform: translate(0,0)        scale(1);    }
        40%     { transform: translate(-60px,38px) scale(0.93); }
        70%     { transform: translate(40px,-48px) scale(1.06); }
      }

      @keyframes bar-fill {
        from { transform: scaleX(0); }
        to   { transform: scaleX(1); }
      }
      @keyframes signal-ring {
        0%   { transform: scale(1); opacity:0.7; }
        100% { transform: scale(3); opacity:0;   }
      }
      @keyframes scroll-dot {
        0%,100% { opacity:0.3; transform:translateY(0);   }
        50%     { opacity:1;   transform:translateY(7px); }
      }
      @keyframes glow-pulse {
        0%,100% { box-shadow: 0 0 12px rgba(0,229,204,0.14); }
        50%     { box-shadow: 0 0 28px rgba(0,229,204,0.38); }
      }

      .rv { opacity:0; transform:translateY(40px); transition: opacity .9s cubic-bezier(.16,1,.3,1), transform .9s cubic-bezier(.16,1,.3,1); }
      .rv.vis { opacity:1; transform:translateY(0); }

      ::-webkit-scrollbar { width:5px; }
      ::-webkit-scrollbar-track { background:transparent; }
      ::-webkit-scrollbar-thumb { background:rgba(0,229,204,0.14); border-radius:3px; }

      @media(max-width:768px) {
        .hide-mobile       { display:none !important; }
        .show-mobile-only  { display:block !important; }
        .lat-layout        { flex-direction:column !important; }
        .perm-grid         { grid-template-columns:1fr !important; }
        .sec-cards         { grid-template-columns:1fr !important; }
        .pipeline-row      { flex-direction:column !important; gap:32px !important; }
        .pipeline-connector{ display:none !important; }
      }
      @media(min-width:769px) {
        .show-mobile-only { display:none !important; }
      }

      @keyframes dropdown-in {
        from { opacity:0; transform:translateY(-6px); }
        to   { opacity:1; transform:translateY(0);    }
      }
    `}</style>
  );
}

/* ─────────────────────────────────────────
   REVEAL HOOK
───────────────────────────────────────── */
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

/* ─────────────────────────────────────────
   SECTION LABEL
───────────────────────────────────────── */
function SectionLabel({ num, text, color }: { num: string; text: string; color: string }) {
  return (
    <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:20 }}>
      <span className="font-mono" style={{
        fontSize:10, fontWeight:700, color,
        letterSpacing:"0.1em", padding:"4px 10px", borderRadius:6,
        background:`${color}0a`, border:`1px solid ${color}14`,
      }}>{num}</span>
      <span className="font-syne" style={{
        fontSize:10, fontWeight:700, color,
        textTransform:"uppercase", letterSpacing:"0.18em",
      }}>{text}</span>
    </div>
  );
}

/* ─────────────────────────────────────────
   HEADER
   Links: ["The Bot","Whales","Pricing","How It Works"]
   + Socials dropdown
   Far right: PRO/Free toggle ONLY (no Sign In)
───────────────────────────────────────── */
function Header({ isSubscribed, setIsSubscribed }: {
  isSubscribed: boolean;
  setIsSubscribed: (v: boolean) => void;
}) {
  const [scrolled,    setScrolled]    = useState(false);
  const [mobileOpen,  setMobileOpen]  = useState(false);
  const [socialsOpen, setSocialsOpen] = useState(false);
  const socialsRef = useRef<HTMLDivElement>(null);

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

  const navLinks = ["The Bot", "Whales", "Pricing", "How It Works"];

  const getLinkHref = (l: string) => {
    if (l === "The Bot")      return "/#the-bot";
    if (l === "Whales")       return "/whales";
    if (l === "Pricing")      return "/pricing";
    if (l === "How It Works") return "/how-it-works";
    return "#";
  };

  const socialsLinks = [
    { label:"Discord",  icon:"💬", href:"#" },
    { label:"Telegram", icon:"✈️", href:"#" },
    { label:"X",        icon:"𝕏",  href:"#" },
  ];

  const lStyle: React.CSSProperties = {
    textDecoration:"none", fontSize:13, fontWeight:700,
    letterSpacing:"-0.01em", transition:"color 0.2s", whiteSpace:"nowrap",
    fontFamily:"Syne, sans-serif",
  };

  return (
    <header className="glass font-syne" style={{
      position:"sticky", top:0, zIndex:100,
      padding: scrolled ? "11px 0" : "17px 0",
      borderBottom:`1px solid ${scrolled ? "rgba(0,229,204,0.08)" : "transparent"}`,
      transition:"all 0.3s ease",
    }}>
      <div style={{
        maxWidth:1160, margin:"0 auto", padding:"0 24px",
        display:"flex", alignItems:"center", justifyContent:"space-between",
      }}>
        {/* Logo */}
        <a href="/" style={{ display:"flex", alignItems:"center", gap:10, textDecoration:"none" }}>
          <div style={{
            width:34, height:34, borderRadius:9,
            background:"linear-gradient(135deg,#00e5cc,#7c5cfc)",
            display:"flex", alignItems:"center", justifyContent:"center",
          }}>
            <Waves size={18} color="#060b18" strokeWidth={2.5}/>
          </div>
          <span style={{ fontSize:21, fontWeight:800, letterSpacing:"-0.03em", color:"#fff" }}>
            Poly<span style={{ color:C.accent }}>Whale</span>
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hide-mobile" style={{ display:"flex", alignItems:"center", gap:26 }}>
          {navLinks.map(l => (
            <a key={l} href={getLinkHref(l)}
              style={{ ...lStyle, color: l === "How It Works" ? C.accent : C.textMuted }}
              onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.color = C.accent}
              onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.color = l === "How It Works" ? C.accent : C.textMuted}
            >{l}</a>
          ))}

          {/* Glassmorphism Socials dropdown */}
          <div ref={socialsRef} style={{ position:"relative" }}>
            <button onClick={() => setSocialsOpen(!socialsOpen)} style={{
              ...lStyle, background:"none", border:"none", cursor:"pointer",
              display:"inline-flex", alignItems:"center", gap:4, padding:0,
              color: socialsOpen ? C.accent : C.textMuted,
            }}
              onMouseEnter={e => (e.currentTarget as HTMLButtonElement).style.color = C.accent}
              onMouseLeave={e => { if (!socialsOpen) (e.currentTarget as HTMLButtonElement).style.color = C.textMuted; }}
            >
              Socials
              <ChevronRight size={12} style={{
                transform: socialsOpen ? "rotate(90deg)" : "rotate(0deg)",
                transition:"transform 0.22s",
              }}/>
            </button>

            {socialsOpen && (
              <div style={{
                position:"absolute", top:"calc(100% + 10px)", right:0,
                minWidth:162, borderRadius:13,
                background:"rgba(7,13,28,0.97)",
                backdropFilter:"blur(24px)",
                WebkitBackdropFilter:"blur(24px)",
                border:"1px solid rgba(0,229,204,0.10)",
                boxShadow:"0 20px 56px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.02)",
                padding:"6px", animation:"dropdown-in 0.16s ease both", zIndex:200,
              }}>
                {socialsLinks.map(({ label, icon, href }) => (
                  <a key={label} href={href} onClick={() => setSocialsOpen(false)} style={{
                    display:"flex", alignItems:"center", gap:10,
                    padding:"10px 13px", borderRadius:8, textDecoration:"none",
                    color:C.text, fontSize:13, fontWeight:500,
                    fontFamily:"DM Sans, sans-serif", transition:"background 0.15s, color 0.15s",
                  }}
                    onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background="rgba(0,229,204,0.06)"; (e.currentTarget as HTMLAnchorElement).style.color=C.accent; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background="transparent"; (e.currentTarget as HTMLAnchorElement).style.color=C.text; }}
                  >
                    <span style={{ fontSize:14 }}>{icon}</span>{label}
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* PRO / Free Tier toggle — ONLY right-side element, no Sign In */}
          <button onClick={() => setIsSubscribed(!isSubscribed)} style={{
            display:"inline-flex", alignItems:"center", gap:7,
            padding:"7px 14px", borderRadius:8,
            border:`1px solid ${isSubscribed ? "rgba(0,229,204,0.22)" : "rgba(124,92,252,0.22)"}`,
            background: isSubscribed ? "rgba(0,229,204,0.06)" : "rgba(124,92,252,0.06)",
            color: isSubscribed ? C.accent : C.accentAlt,
            fontSize:11, fontWeight:700, cursor:"pointer",
            fontFamily:"DM Sans, sans-serif", whiteSpace:"nowrap", transition:"all 0.3s ease",
          }}>
            {isSubscribed ? <Eye size={12}/> : <EyeOff size={12}/>}
            {isSubscribed ? "PRO Active" : "Free Tier"}
            <div style={{
              width:28, height:16, borderRadius:8,
              background: isSubscribed ? "rgba(0,229,204,0.28)" : "rgba(255,255,255,0.07)",
              position:"relative", transition:"background 0.3s",
            }}>
              <div style={{
                width:12, height:12, borderRadius:"50%",
                background: isSubscribed ? C.accent : C.textDim,
                position:"absolute", top:2, left: isSubscribed ? 14 : 2,
                transition:"all 0.3s cubic-bezier(.16,1,.3,1)",
                boxShadow: isSubscribed ? "0 0 8px rgba(0,229,204,0.5)" : "none",
              }}/>
            </div>
          </button>
        </nav>

        {/* Mobile hamburger */}
        <button onClick={() => setMobileOpen(!mobileOpen)} className="show-mobile-only"
          style={{ background:"none", border:"none", color:"#fff", cursor:"pointer" }}>
          {mobileOpen ? <X size={24}/> : <Menu size={24}/>}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="show-mobile-only" style={{
          padding:"16px 24px", display:"flex", flexDirection:"column", gap:4,
        }}>
          {navLinks.map(l => (
            <a key={l} href={getLinkHref(l)} onClick={() => setMobileOpen(false)} style={{
              color: l === "How It Works" ? C.accent : C.textMuted,
              textDecoration:"none", fontSize:15, fontWeight:600,
              padding:"10px 0", borderBottom:"1px solid rgba(255,255,255,0.04)",
            }}>{l}</a>
          ))}
          <div style={{ padding:"10px 0", borderBottom:"1px solid rgba(255,255,255,0.04)" }}>
            <div style={{ fontSize:11, fontWeight:700, letterSpacing:"0.08em", color:C.textDim, textTransform:"uppercase", marginBottom:10 }}>Socials</div>
            {socialsLinks.map(({ label, href }) => (
              <a key={label} href={href} onClick={() => setMobileOpen(false)} style={{
                display:"block", padding:"8px 0", textDecoration:"none", color:C.textMuted, fontSize:14,
              }}>{label}</a>
            ))}
          </div>
          <div style={{ paddingTop:12 }}>
            <button onClick={() => { setIsSubscribed(!isSubscribed); setMobileOpen(false); }} style={{
              width:"100%", padding:"12px 16px", borderRadius:10,
              border:`1px solid ${isSubscribed ? "rgba(0,229,204,0.22)" : "rgba(124,92,252,0.22)"}`,
              background: isSubscribed ? "rgba(0,229,204,0.06)" : "rgba(124,92,252,0.06)",
              color: isSubscribed ? C.accent : C.accentAlt,
              fontSize:13, fontWeight:700, cursor:"pointer", fontFamily:"DM Sans, sans-serif",
              display:"flex", alignItems:"center", gap:8,
            }}>
              {isSubscribed ? <Eye size={14}/> : <EyeOff size={14}/>}
              {isSubscribed ? "PRO Active" : "Free Tier"}
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

/* ─────────────────────────────────────────
   HERO — Minimalist Fintech
   grid-bg background + faint radial glow
   Clean h1, gradient only on "Sub-Second Execution"
───────────────────────────────────────── */
function Hero() {
  return (
    <section style={{
      position:"relative", padding:"118px 24px 80px",
      textAlign:"center", overflow:"hidden",
    }}>
      {/* Grid background overlay */}
      <div className="grid-bg" style={{
        position:"absolute", inset:0, opacity:0.18, pointerEvents:"none",
      }}/>

      {/* Single very faint radial glow — institutional, not crypto */}
      <div style={{
        position:"absolute", top:"50%", left:"50%",
        width:900, height:600, marginLeft:-450, marginTop:-300,
        borderRadius:"50%",
        background:"radial-gradient(ellipse,rgba(0,229,204,0.05) 0%,transparent 68%)",
        pointerEvents:"none",
      }}/>

      {/* Content */}
      <div style={{ position:"relative", maxWidth:700, margin:"0 auto" }}>
        <div style={{
          display:"inline-flex", alignItems:"center", gap:8,
          padding:"7px 16px", borderRadius:100,
          background:"rgba(0,229,204,0.05)", border:"1px solid rgba(0,229,204,0.09)",
          marginBottom:36, fontSize:12, color:C.accent, fontWeight:600,
          fontFamily:"DM Sans, sans-serif", animation:"fade-up 0.5s ease both",
        }}>
          <BrainCircuit size={13}/> The Science of Alpha
        </div>

        {/* Headline — "Sub-Second Execution" gradient only, rest pure white */}
        <h1 className="font-syne" style={{
          fontSize:"clamp(38px,5.6vw,64px)", fontWeight:800, color:"#fff",
          letterSpacing:"-0.04em", marginBottom:28, lineHeight:1.04,
          animation:"fade-up 0.5s ease 0.08s both",
        }}>
          How{" "}
          <span style={{
            background:"linear-gradient(135deg,#00e5cc 0%,#7c5cfc 100%)",
            WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent",
            backgroundClip:"text",
          }}>
            Sub-Second Execution
          </span>
          <br/>Wins Markets
        </h1>

        <p style={{
          fontSize:17, color:C.textMuted, lineHeight:1.82,
          maxWidth:520, margin:"0 auto", animation:"fade-up 0.5s ease 0.16s both",
        }}>
          In prediction markets, information is only as valuable as the speed at
          which you act on it. See exactly how PolyWhale delivers the structural
          edge that no human trader can replicate.
        </p>

        {/* Three key stats — clean data row */}
        <div style={{
          marginTop:56, display:"flex", gap:0, justifyContent:"center",
          animation:"fade-up 0.5s ease 0.22s both",
          background:"rgba(11,18,33,0.6)", border:"1px solid rgba(255,255,255,0.05)",
          borderRadius:14, overflow:"hidden", maxWidth:520, margin:"56px auto 0",
        }}>
          {[
            { val:"<20ms", label:"Avg. Execution" },
            { val:"1,200+", label:"Whale Wallets" },
            { val:"EU-W1",  label:"Co-Location" },
          ].map((stat, i) => (
            <div key={i} style={{
              flex:1, padding:"22px 16px", textAlign:"center",
              borderRight: i < 2 ? "1px solid rgba(255,255,255,0.04)" : "none",
            }}>
              <div className="font-mono" style={{
                fontSize:20, fontWeight:700, color: i === 0 ? C.accent : "#fff",
                letterSpacing:"-0.03em", marginBottom:5,
              }}>{stat.val}</div>
              <div style={{ fontSize:10, color:C.textDim, textTransform:"uppercase", letterSpacing:"0.12em" }}>{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Scroll indicator */}
        <div style={{
          marginTop:56, display:"flex", flexDirection:"column",
          alignItems:"center", gap:10, animation:"fade-up 0.5s ease 0.28s both",
        }}>
          <span style={{ fontSize:9, color:C.textDim, textTransform:"uppercase", letterSpacing:"0.2em", fontWeight:600 }}>
            Explore
          </span>
          <div style={{
            width:20, height:36, borderRadius:10,
            border:"1.5px solid rgba(255,255,255,0.06)",
            display:"flex", alignItems:"flex-start", justifyContent:"center", paddingTop:7,
          }}>
            <div style={{
              width:3, height:7, borderRadius:2, background:C.accent, opacity:0.45,
              animation:"scroll-dot 2s ease-in-out infinite",
            }}/>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────
   SECTION 1 — Bloomberg Latency Terminal
───────────────────────────────────────── */
function LatencySection() {
  const ref = useReveal();
  const [zapHov, setZapHov] = useState(false);

  const bars = [
    { label:"Human Trader",  sub:"Toronto, ON", ms:"150–300ms", pct:92, color:C.accentPink, glow:"rgba(244,114,182,0.35)" },
    { label:"Competing Bot", sub:"US-East-1",   ms:"40–80ms",   pct:30, color:"#fbbf24",    glow:"rgba(251,191,36,0.28)"  },
    { label:"PolyWhale",     sub:"EU-West-1",   ms:"<20ms",     pct:6,  color:C.accent,     glow:"rgba(0,229,204,0.45)"   },
  ];

  return (
    <section style={{ padding:"140px 24px 100px" }}>
      <div ref={ref} className="rv" style={{ maxWidth:1000, margin:"0 auto" }}>
        <SectionLabel num="01" text="The Latency Advantage" color={C.accent}/>

        <div className="lat-layout" style={{ display:"flex", gap:60, alignItems:"flex-start" }}>
          {/* Copy */}
          <div style={{ flex:"1 1 400px" }}>
            <h2 className="font-syne" style={{
              fontSize:"clamp(26px,3.5vw,40px)", fontWeight:800, color:"#fff",
              letterSpacing:"-0.03em", marginBottom:22, lineHeight:1.1,
            }}>
              Co-Located in{" "}
              <span style={{ color:C.accent }}>EU-West&nbsp;1</span>
              <br/>Dublin, Ireland
            </h2>
            <p style={{ fontSize:15, lineHeight:1.82, color:C.textMuted, marginBottom:20, maxWidth:440 }}>
              Polymarket&apos;s core exchange infrastructure lives in AWS EU-West&nbsp;1.
              A human trader in Toronto faces 150–300&thinsp;ms of round-trip latency
              before their order even touches the book. The spread has already moved.
            </p>
            <p style={{ fontSize:15, lineHeight:1.82, color:C.textMuted, marginBottom:40, maxWidth:440 }}>
              PolyWhale is co-located in the same datacenter. Detection, risk-check,
              and order-placement resolve in{" "}
              <em style={{ color:"#fff", fontStyle:"normal" }}>under 20&thinsp;milliseconds</em>.
              This is a structural advantage, not a marginal one.
            </p>

            {/* Live latency badge */}
            <div
              onMouseEnter={() => setZapHov(true)}
              onMouseLeave={() => setZapHov(false)}
              style={{
                display:"inline-flex", alignItems:"center", gap:14,
                padding:"13px 22px", borderRadius:13,
                background: zapHov ? "rgba(0,229,204,0.07)" : "rgba(0,229,204,0.03)",
                border:`1px solid ${zapHov ? "rgba(0,229,204,0.18)" : C.border}`,
                cursor:"default", transition:"all 0.3s ease",
                animation:"glow-pulse 3s ease-in-out infinite",
              }}
            >
              <div style={{
                color:C.accent, display:"flex",
                transition:"filter 0.3s",
                filter: zapHov ? "drop-shadow(0 0 10px rgba(0,229,204,0.8))" : "none",
              }}>
                <Zap size={20}/>
              </div>
              <div>
                <div className="font-mono" style={{
                  fontSize:18, color:C.accent, fontWeight:700, letterSpacing:"-0.02em",
                  textShadow:"0 0 20px rgba(0,229,204,0.5)",
                }}>
                  14.2ms
                </div>
                <div style={{ fontSize:11, color:C.textDim, marginTop:1 }}>avg. round-trip execution</div>
              </div>
            </div>
          </div>

          {/* Bloomberg Terminal Panel */}
          <div style={{ flex:"1 1 380px" }}>
            <div style={{
              padding:"26px 26px 22px", borderRadius:18,
              background:C.bgDeep,
              border:"1px solid rgba(255,255,255,0.05)",
              boxShadow:"inset 0 1px 0 rgba(255,255,255,0.025), 0 32px 80px rgba(0,0,0,0.45)",
            }}>
              {/* Terminal header */}
              <div style={{
                display:"flex", justifyContent:"space-between", alignItems:"center",
                marginBottom:28, paddingBottom:16,
                borderBottom:"1px solid rgba(255,255,255,0.04)",
              }}>
                <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                  <div style={{
                    width:7, height:7, borderRadius:"50%", background:C.accent,
                    boxShadow:`0 0 8px ${C.accent}70`,
                    animation:"glow-pulse 2s ease-in-out infinite",
                  }}/>
                  <span className="font-mono" style={{
                    fontSize:10, color:C.textDim, letterSpacing:"0.14em", textTransform:"uppercase",
                  }}>Latency Monitor</span>
                </div>
                <div style={{ display:"flex", alignItems:"center", gap:5 }}>
                  <div style={{ width:5, height:5, borderRadius:"50%", background:"#22c55e" }}/>
                  <span className="font-mono" style={{ fontSize:9, color:"#22c55e", letterSpacing:"0.12em" }}>LIVE</span>
                </div>
              </div>

              {/* Bars */}
              <div style={{ display:"flex", flexDirection:"column", gap:28 }}>
                {bars.map((b, i) => (
                  <div key={i}>
                    <div style={{
                      display:"flex", justifyContent:"space-between",
                      alignItems:"flex-start", marginBottom:10, gap:8,
                    }}>
                      <div>
                        <div style={{ fontSize:12, color:C.text, fontWeight:600, marginBottom:2 }}>{b.label}</div>
                        <div className="font-mono" style={{ fontSize:10, color:C.textDim }}>{b.sub}</div>
                      </div>
                      {/* Monospace neon latency value */}
                      <span className="font-mono" style={{
                        fontSize:14, fontWeight:700,
                        color: i === 2 ? C.accent : b.color,
                        letterSpacing:"-0.02em", textAlign:"right", minWidth:90, flexShrink:0,
                        textShadow: i === 2
                          ? "0 0 18px rgba(0,229,204,0.60)"
                          : `0 0 12px ${b.glow}`,
                      }}>{b.ms}</span>
                    </div>

                    {/* Ultra-thin 4px track */}
                    <div style={{
                      position:"relative", height:4, borderRadius:2,
                      background:"rgba(255,255,255,0.03)", overflow:"visible",
                    }}>
                      <div style={{
                        position:"absolute", top:0, left:0, height:"100%",
                        width:`${b.pct}%`, borderRadius:2,
                        background:`linear-gradient(90deg,${b.color}60,${b.color})`,
                        transformOrigin:"left",
                        animation:`bar-fill 1.6s cubic-bezier(.16,1,.3,1) ${i * 0.2}s both`,
                      }}>
                        {/* Glowing end cap */}
                        <div style={{
                          position:"absolute", right:-3, top:"50%", transform:"translateY(-50%)",
                          width:9, height:9, borderRadius:"50%",
                          background:b.color,
                          boxShadow:`0 0 14px 5px ${b.glow}, 0 0 4px ${b.color}`,
                        }}/>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Scale footer */}
              <div style={{
                display:"flex", justifyContent:"space-between",
                marginTop:22, paddingTop:16,
                borderTop:"1px solid rgba(255,255,255,0.03)",
              }}>
                {["0ms","100ms","200ms","300ms"].map((v,i) => (
                  <span key={i} className="font-mono" style={{ fontSize:9, color:C.textDim }}>{v}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Execution formula */}
        <div style={{
          marginTop:64, padding:"36px 32px", borderRadius:16, background:C.bgDeep,
          border:"1px solid rgba(255,255,255,0.05)", textAlign:"center",
          boxShadow:"inset 0 1px 0 rgba(255,255,255,0.02)",
        }}>
          <div className="font-mono" style={{
            fontSize:9, color:C.textDim, textTransform:"uppercase",
            letterSpacing:"0.18em", marginBottom:20,
          }}>Execution Model</div>
          <div className="font-mono" style={{
            fontSize:"clamp(13px,2vw,18px)", color:"#fff", fontWeight:500, lineHeight:2.2,
          }}>
            <span style={{ color:C.textDim }}>T<sub>total</sub></span>
            <span style={{ color:"rgba(255,255,255,0.12)", margin:"0 10px" }}>=</span>
            <span style={{ color:C.accentAlt }}>T<sub>net</sub></span>
            <span style={{ color:"rgba(255,255,255,0.1)", margin:"0 8px" }}>+</span>
            <span style={{ color:C.accentAlt }}>T<sub>risk</sub></span>
            <span style={{ color:"rgba(255,255,255,0.1)", margin:"0 8px" }}>+</span>
            <span style={{ color:C.accentAlt }}>T<sub>exec</sub></span>
            <span style={{ color:"rgba(255,255,255,0.1)", margin:"0 10px" }}>&lt;</span>
            <span style={{
              color:C.accent, fontWeight:700,
              textShadow:"0 0 22px rgba(0,229,204,0.4)",
            }}>20ms</span>
          </div>
          <div style={{ display:"flex", justifyContent:"center", gap:40, marginTop:20, flexWrap:"wrap" }}>
            {[{v:"~2ms",n:"network hop"},{v:"~8ms",n:"risk checks"},{v:"~6ms",n:"order + confirm"}].map((t,i)=>(
              <div key={i} style={{ textAlign:"center" }}>
                <div className="font-mono" style={{ fontSize:14, color:C.accent, fontWeight:700 }}>{t.v}</div>
                <div style={{ fontSize:10, color:C.textDim, marginTop:3 }}>{t.n}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────
   SECTION 2 — The Mirroring Engine
   Static elegant dashed connector. No moving dot.
───────────────────────────────────────── */
function MirroringSection() {
  const ref = useReveal();
  const [activeStep, setActiveStep] = useState<number | null>(null);

  const steps = [
    {
      num:"01", icon:<Radio size={22}/>, color:C.accent,
      title:"Whale Wallet Monitored",
      desc:"1,200+ verified whale addresses tracked via Polymarket's real-time event stream. Signal captured the instant a position opens or shifts.",
      tag:"~3ms detection",
    },
    {
      num:"02", icon:<Activity size={22}/>, color:C.accentAlt,
      title:"PolyWhale Engine",
      desc:"Position sizing, risk limits, whale conviction scoring, and order construction resolved in a single non-blocking cycle from co-located EU-West 1 infrastructure.",
      tag:"~8ms processing",
    },
    {
      num:"03", icon:<Wallet size={22}/>, color:C.accentPink,
      title:"Your Portfolio Executed",
      desc:"Mirrored order fires directly to Polymarket's matching engine. Confirmed on-chain before most participants have registered the whale's move.",
      tag:"~6ms placement",
    },
  ];

  return (
    <section style={{ padding:"100px 24px 140px" }}>
      <div ref={ref} className="rv" style={{ maxWidth:1000, margin:"0 auto" }}>
        <SectionLabel num="02" text="The Mirroring Engine" color={C.accentAlt}/>

        <div style={{ marginBottom:52 }}>
          <h2 className="font-syne" style={{
            fontSize:"clamp(26px,3.5vw,40px)", fontWeight:800, color:"#fff",
            letterSpacing:"-0.03em", marginBottom:18, lineHeight:1.1,
          }}>
            A{" "}<span style={{ color:C.accentAlt }}>Three-Stage</span>{" "}
            Trade Pipeline
          </h2>
          <p style={{ fontSize:15, lineHeight:1.82, color:C.textMuted, maxWidth:520 }}>
            Every mirrored trade flows through three deterministic stages, each operating
            in sub-millisecond windows with no human bottleneck in the loop.
          </p>
        </div>

        {/* Pipeline wrapper */}
        <div style={{ position:"relative", paddingTop:48 }}>

          {/* Static elegant dashed connector — desktop only */}
          <div className="pipeline-connector" style={{
            position:"absolute", top:0, left:0, right:0, height:48,
            pointerEvents:"none", zIndex:1,
          }}>
            <svg width="100%" height="48" style={{ overflow:"visible" }}>
              {/* Left segment */}
              <line x1="16.5%" y1="50%" x2="50%" y2="50%"
                stroke="rgba(255,255,255,0.10)"
                strokeWidth="1"
                strokeDasharray="5 9"
              />
              {/* Right segment */}
              <line x1="50%" y1="50%" x2="83.5%" y2="50%"
                stroke="rgba(255,255,255,0.10)"
                strokeWidth="1"
                strokeDasharray="5 9"
              />
              {/* Static arrow chevrons */}
              {([33, 67] as number[]).map((xPct, i) => (
                <polyline key={i}
                  points={`${xPct - 1.1}%,32 ${xPct + 1.4}%,50% ${xPct - 1.1}%,68%`}
                  fill="none"
                  stroke="rgba(255,255,255,0.14)"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              ))}
            </svg>
          </div>

          {/* Step cards */}
          <div className="pipeline-row" style={{ display:"flex", gap:20, position:"relative", zIndex:2 }}>
            {steps.map((s, i) => {
              const active = activeStep === i;
              return (
                <div
                  key={i}
                  onMouseEnter={() => setActiveStep(i)}
                  onMouseLeave={() => setActiveStep(null)}
                  style={{
                    flex:1, padding:"30px 26px", borderRadius:18,
                    background:"#0c1428",
                    border:`1px solid ${active ? `${s.color}28` : "rgba(255,255,255,0.05)"}`,
                    boxShadow: active
                      ? `0 12px 40px ${s.color}10, inset 0 1px 0 rgba(255,255,255,0.03)`
                      : "inset 0 1px 0 rgba(255,255,255,0.02)",
                    transform: active ? "translateY(-4px)" : "translateY(0)",
                    transition:"all 0.35s cubic-bezier(.16,1,.3,1)",
                    cursor:"default", position:"relative",
                  }}
                >
                  {/* Watermark number */}
                  <div className="font-syne" style={{
                    position:"absolute", top:14, right:18, fontSize:52, fontWeight:800,
                    color:`${s.color}06`, lineHeight:1, userSelect:"none",
                  }}>{s.num}</div>

                  {/* Live signal dot — only visible on hover */}
                  {active && (
                    <div style={{
                      position:"absolute", top:17, left:17,
                      width:7, height:7, borderRadius:"50%", background:s.color,
                    }}>
                      <div style={{
                        position:"absolute", inset:-4, borderRadius:"50%",
                        border:`1.5px solid ${s.color}`,
                        animation:"signal-ring 1.5s ease-out infinite",
                      }}/>
                    </div>
                  )}

                  <div style={{
                    width:46, height:46, borderRadius:12,
                    background:`${s.color}08`, border:`1px solid ${s.color}12`,
                    display:"flex", alignItems:"center", justifyContent:"center",
                    color:s.color, marginBottom:20,
                    transform: active ? "scale(1.08) rotate(-5deg)" : "scale(1)",
                    transition:"all 0.35s cubic-bezier(.16,1,.3,1)",
                  }}>
                    {s.icon}
                  </div>

                  <h3 className="font-syne" style={{
                    fontSize:16, fontWeight:700, color:"#fff",
                    marginBottom:10, letterSpacing:"-0.02em",
                  }}>{s.title}</h3>
                  <p style={{ fontSize:13, lineHeight:1.76, color:C.textMuted, marginBottom:18 }}>{s.desc}</p>
                  <span className="font-mono" style={{
                    fontSize:10, color:s.color, fontWeight:700,
                    padding:"4px 10px", borderRadius:6,
                    background:`${s.color}07`, border:`1px solid ${s.color}10`,
                  }}>{s.tag}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────
   SECTION 3 — Enterprise Security Dashboard
───────────────────────────────────────── */
function SecuritySection() {
  const ref = useReveal();
  const [shieldHov, setShieldHov] = useState(false);

  const cards = [
    { icon:<Key size={17}/>,         color:C.accent,
      title:"Trade-Only Permissions",
      desc:'We only request "Trade" permissions on your Polymarket API key. Withdrawal access is never requested — it\'s architecturally impossible for us to move your funds.' },
    { icon:<Shield size={17}/>,      color:C.accentAlt,
      title:"Funds Stay on Polymarket",
      desc:"Your USDC balance stays in your Polymarket account at all times. PolyWhale sends trade instructions as a SaaS layer — we're not a custodian or wallet provider." },
    { icon:<Fingerprint size={17}/>, color:C.accentPink,
      title:"Revoke Access Instantly",
      desc:"API keys can be regenerated or revoked from your Polymarket settings in seconds, immediately cutting off bot access with zero risk to your balance." },
    { icon:<ShieldCheck size={17}/>, color:"#fbbf24",
      title:"AES-256 Encryption",
      desc:"All keys encrypted at rest with AES-256, transmitted over TLS 1.3. Stored in an isolated vault with zero-trust access controls and automatic rotation." },
  ];

  return (
    <section style={{ padding:"100px 24px 140px" }}>
      <div ref={ref} className="rv" style={{ maxWidth:1000, margin:"0 auto" }}>
        <SectionLabel num="03" text="Secure API Integration" color={C.accentPink}/>

        <div style={{ display:"flex", alignItems:"flex-start", gap:20, marginBottom:52, flexWrap:"wrap" }}>
          <div style={{ flex:"1 1 440px" }}>
            <h2 className="font-syne" style={{
              fontSize:"clamp(26px,3.5vw,40px)", fontWeight:800, color:"#fff",
              letterSpacing:"-0.03em", marginBottom:22, lineHeight:1.1,
            }}>
              Your Funds{" "}
              <span style={{ color:C.accentPink }}>Never Leave</span>
              <br/>Polymarket
            </h2>
            <p style={{ fontSize:15, lineHeight:1.82, color:C.textMuted, maxWidth:480 }}>
              PolyWhale is a pure execution layer. We integrate using the minimum
              possible scoped permissions. Your capital is never at risk from our
              infrastructure — only from the markets themselves.
            </p>
          </div>

          <div
            onMouseEnter={() => setShieldHov(true)}
            onMouseLeave={() => setShieldHov(false)}
            style={{
              width:70, height:70, borderRadius:17, flexShrink:0, marginTop:8,
              background:"rgba(244,114,182,0.03)", border:"1px solid rgba(244,114,182,0.08)",
              display:"flex", alignItems:"center", justifyContent:"center", cursor:"default",
            }}
          >
            <div style={{
              color:C.accentPink,
              transition:"filter 0.3s, transform 0.3s",
              filter: shieldHov ? "drop-shadow(0 0 16px rgba(244,114,182,0.7))" : "none",
              transform: shieldHov ? "scale(1.14)" : "scale(1)",
            }}>
              <Shield size={30}/>
            </div>
          </div>
        </div>

        {/* Permission audit panels */}
        <div className="perm-grid" style={{
          display:"grid", gridTemplateColumns:"1fr 1fr", gap:2,
          borderRadius:18, overflow:"hidden", marginBottom:44,
          border:"1px solid rgba(255,255,255,0.05)",
          boxShadow:"0 28px 80px rgba(0,0,0,0.45)",
        }}>
          {/* Granted — dark with subtle green tint */}
          <div style={{
            padding:32,
            background:"linear-gradient(150deg,rgba(0,229,204,0.07) 0%,rgba(6,10,24,0.92) 100%)",
            borderRight:"1px solid rgba(0,229,204,0.05)",
          }}>
            <div style={{ display:"flex", alignItems:"center", gap:9, marginBottom:22 }}>
              <div style={{ width:7, height:7, borderRadius:"50%", background:C.accent, boxShadow:`0 0 8px ${C.accent}70` }}/>
              <span className="font-mono" style={{ fontSize:10, fontWeight:700, color:C.accent, letterSpacing:"0.12em", textTransform:"uppercase" }}>Granted</span>
            </div>
            {["Place Market Orders","Place Limit Orders","Cancel Open Orders","Read Position Data"].map((p,i)=>(
              <div key={i} style={{
                display:"flex", alignItems:"center", gap:11, padding:"10px 0",
                borderBottom: i < 3 ? "1px solid rgba(0,229,204,0.05)" : "none",
              }}>
                <div style={{
                  width:20, height:20, borderRadius:6, flexShrink:0,
                  display:"flex", alignItems:"center", justifyContent:"center",
                  background:"rgba(0,229,204,0.07)", border:"1px solid rgba(0,229,204,0.12)",
                }}>
                  <Check size={10} color={C.accent} strokeWidth={3}/>
                </div>
                <span className="font-mono" style={{ fontSize:12, color:C.text, fontWeight:500 }}>{p}</span>
              </div>
            ))}
          </div>

          {/* Never Requested — dark with subtle pink tint */}
          <div style={{
            padding:32,
            background:"linear-gradient(150deg,rgba(244,114,182,0.07) 0%,rgba(6,10,24,0.92) 100%)",
          }}>
            <div style={{ display:"flex", alignItems:"center", gap:9, marginBottom:22 }}>
              <div style={{ width:7, height:7, borderRadius:"50%", background:C.accentPink, opacity:0.5 }}/>
              <span className="font-mono" style={{ fontSize:10, fontWeight:700, color:C.accentPink, letterSpacing:"0.12em", textTransform:"uppercase" }}>Never Requested</span>
            </div>
            {["Withdraw Funds","Transfer Assets","Modify Account Settings","Access Private Keys"].map((p,i)=>(
              <div key={i} style={{
                display:"flex", alignItems:"center", gap:11, padding:"10px 0",
                borderBottom: i < 3 ? "1px solid rgba(244,114,182,0.05)" : "none",
              }}>
                <div style={{
                  width:20, height:20, borderRadius:6, flexShrink:0,
                  display:"flex", alignItems:"center", justifyContent:"center",
                  background:"rgba(244,114,182,0.06)", border:"1px solid rgba(244,114,182,0.08)",
                }}>
                  <XIcon size={10} color={C.accentPink} strokeWidth={3}/>
                </div>
                <span className="font-mono" style={{ fontSize:12, color:"rgba(255,255,255,0.20)", fontWeight:500 }}>{p}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Trade-Only callout banner */}
        <div style={{
          padding:"20px 28px", borderRadius:14, marginBottom:44,
          background:"rgba(0,229,204,0.04)",
          border:"1px solid rgba(0,229,204,0.12)",
          display:"flex", alignItems:"center", gap:16,
        }}>
          <div style={{
            width:36, height:36, borderRadius:9, flexShrink:0,
            background:"rgba(0,229,204,0.08)", border:"1px solid rgba(0,229,204,0.14)",
            display:"flex", alignItems:"center", justifyContent:"center",
          }}>
            <Key size={16} color={C.accent}/>
          </div>
          <div>
            <span className="font-mono" style={{
              fontSize:11, fontWeight:700, color:C.accent,
              letterSpacing:"0.1em", textTransform:"uppercase",
              background:"rgba(0,229,204,0.10)", padding:"3px 9px",
              borderRadius:5, marginRight:10, border:"1px solid rgba(0,229,204,0.18)",
            }}>Trade-Only</span>
            <span style={{ fontSize:13, color:C.textMuted, lineHeight:1.6 }}>
              Our API scope is structurally constrained to order operations. Withdrawal access
              is{" "}<strong style={{ color:"#fff", fontWeight:600 }}>architecturally impossible</strong>{" "}
              — not a policy decision, but a hard technical boundary.
            </span>
          </div>
        </div>

        {/* Security detail cards */}
        <div className="sec-cards" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16 }}>
          {cards.map((card, i) => {
            const [hov, setHov] = useState(false);
            return (
              <div
                key={i}
                onMouseEnter={() => setHov(true)}
                onMouseLeave={() => setHov(false)}
                style={{
                  padding:"26px 24px", borderRadius:16,
                  background: hov ? `${card.color}06` : C.bgDeep,
                  border:`1px solid ${hov ? `${card.color}22` : "rgba(255,255,255,0.05)"}`,
                  transform: hov ? "translateY(-4px)" : "translateY(0)",
                  boxShadow: hov ? `0 0 44px ${card.color}0a` : "none",
                  transition:"all 0.35s cubic-bezier(.16,1,.3,1)",
                }}
              >
                <div style={{
                  width:38, height:38, borderRadius:10,
                  background:`${card.color}07`, border:`1px solid ${card.color}10`,
                  display:"flex", alignItems:"center", justifyContent:"center",
                  color:card.color, marginBottom:16,
                  transform: hov ? "rotate(-6deg) scale(1.08)" : "rotate(0)",
                  transition:"transform 0.3s ease",
                }}>
                  {card.icon}
                </div>
                <h4 className="font-syne" style={{
                  fontSize:14, fontWeight:700, color:"#fff", marginBottom:9, letterSpacing:"-0.02em",
                }}>{card.title}</h4>
                <p style={{ fontSize:13, lineHeight:1.74, color:C.textMuted }}>{card.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────
   FINAL CTA
───────────────────────────────────────── */
function FinalCTA() {
  const ref = useReveal();
  return (
    <section style={{ padding:"20px 24px 140px" }}>
      <div ref={ref} className="rv" style={{
        maxWidth:820, margin:"0 auto", padding:"64px 48px",
        borderRadius:24, position:"relative", overflow:"hidden",
        background:"linear-gradient(145deg,rgba(0,229,204,0.04),rgba(124,92,252,0.06))",
        border:"1px solid rgba(255,255,255,0.05)", textAlign:"center",
        boxShadow:"inset 0 1px 0 rgba(255,255,255,0.03)",
      }}>
        <div style={{
          position:"absolute", top:"-35%", right:"-12%", width:340, height:340,
          borderRadius:"50%", background:"radial-gradient(circle,rgba(124,92,252,0.09),transparent 70%)", pointerEvents:"none",
        }}/>
        <div style={{
          position:"absolute", bottom:"-30%", left:"-8%", width:270, height:270,
          borderRadius:"50%", background:"radial-gradient(circle,rgba(0,229,204,0.07),transparent 70%)", pointerEvents:"none",
        }}/>

        <div style={{ position:"relative" }}>
          <div style={{
            display:"inline-flex", alignItems:"center", gap:8, padding:"6px 16px", borderRadius:100,
            background:"rgba(124,92,252,0.06)", border:"1px solid rgba(124,92,252,0.10)",
            marginBottom:28, fontSize:12, color:C.accentAlt, fontWeight:600, fontFamily:"DM Sans, sans-serif",
          }}>
            <Crown size={13}/> Join the Smart Money
          </div>

          <h2 className="font-syne" style={{
            fontSize:"clamp(28px,4vw,46px)", fontWeight:800, color:"#fff",
            marginBottom:18, letterSpacing:"-0.03em", lineHeight:1.1,
          }}>
            Ready to Join the{" "}
            <span style={{
              background:"linear-gradient(135deg,#00e5cc,#7c5cfc)",
              WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent",
            }}>Top&nbsp;1%</span>?
          </h2>

          <p style={{ fontSize:16, color:C.textMuted, maxWidth:450, margin:"0 auto 40px", lineHeight:1.82 }}>
            Every millisecond you wait is a millisecond the whales are ahead.
            Pick a plan and start mirroring alpha today.
          </p>

          <div style={{ display:"flex", gap:12, justifyContent:"center", flexWrap:"wrap" }}>
            <a href="/pricing" className="btn-shimmer font-syne" style={{
              padding:"15px 34px", borderRadius:13, border:"none", cursor:"pointer",
              color:"#060b18", fontWeight:700, fontSize:15,
              display:"inline-flex", alignItems:"center", gap:9,
              textDecoration:"none", transition:"transform 0.2s,box-shadow 0.2s",
            }}
              onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.transform="translateY(-2px) scale(1.02)"; (e.currentTarget as HTMLAnchorElement).style.boxShadow="0 10px 36px rgba(0,229,204,0.36)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.transform="translateY(0) scale(1)"; (e.currentTarget as HTMLAnchorElement).style.boxShadow="none"; }}
            >
              View Pricing <ArrowRight size={15}/>
            </a>
            <a href="/whales" className="font-syne" style={{
              padding:"15px 26px", borderRadius:13, cursor:"pointer",
              background:"rgba(124,92,252,0.05)", border:"1px solid rgba(124,92,252,0.12)",
              color:C.accentAlt, fontWeight:600, fontSize:14,
              display:"inline-flex", alignItems:"center", gap:8,
              textDecoration:"none", transition:"all 0.2s",
            }}
              onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background="rgba(124,92,252,0.10)"; (e.currentTarget as HTMLAnchorElement).style.borderColor="rgba(124,92,252,0.26)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background="rgba(124,92,252,0.05)"; (e.currentTarget as HTMLAnchorElement).style.borderColor="rgba(124,92,252,0.12)"; }}
            >
              Browse Whales <ExternalLink size={13}/>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────
   ROOT PAGE
───────────────────────────────────────── */
export default function HowItWorksPage() {
  const [isSubscribed, setIsSubscribed] = useState(false);

  return (
    <div style={{ background:C.bg, minHeight:"100vh" }}>
      <GlobalStyles/>
      <div className="grid-bg" style={{ position:"fixed", inset:0, opacity:0.25, pointerEvents:"none" }}/>

      <Header isSubscribed={isSubscribed} setIsSubscribed={setIsSubscribed}/>

      <main style={{ position:"relative" }}>
        <Hero/>
        <LatencySection/>
        <MirroringSection/>
        <SecuritySection/>
        <FinalCTA/>

        <footer style={{ borderTop:"1px solid rgba(255,255,255,0.04)", padding:"34px 24px", textAlign:"center" }}>
          <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:20, flexWrap:"wrap" }}>
            <span style={{ fontSize:11, color:C.textDim }}>
              &copy; 2026 PolyWhale. All rights reserved. Prediction markets involve risk.
            </span>
            <div style={{ display:"flex", gap:16 }}>
              {["Terms","Privacy","Risk Disclosure"].map((s,i)=>(
                <a key={i} href="#" style={{ fontSize:11, color:C.textDim, textDecoration:"none", transition:"color 0.2s" }}
                  onMouseEnter={e=>((e.currentTarget as HTMLAnchorElement).style.color=C.accent)}
                  onMouseLeave={e=>((e.currentTarget as HTMLAnchorElement).style.color=C.textDim)}
                >{s}</a>
              ))}
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
