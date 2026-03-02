"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Waves,
  Crown,
  Eye,
  EyeOff,
  Zap,
  Star,
  ArrowRight,
  Check,
  X as XIcon,
  Lock,
  Rocket,
  BrainCircuit,
  ArrowLeftRight,
  Sparkles,
  Shield,
  Bell,
  Users,
  Server,
  Webhook,
  HeadphonesIcon,
  BarChart3,
  Activity,
  TrendingUp,
  Menu,
  X,
  ChevronRight,
  ExternalLink,
} from "lucide-react";

/* ─── palette (matches homepage exactly) ─── */
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

      body, html {
        background: var(--bg);
        color: ${COLORS.textPrimary};
        font-family: 'DM Sans', sans-serif;
        overflow-x: hidden;
        scroll-behavior: smooth;
      }

      .font-display { font-family: 'Syne', sans-serif; }

      .glass {
        background: rgba(10,16,32,0.7);
        backdrop-filter: blur(16px);
        -webkit-backdrop-filter: blur(16px);
        border: 1px solid rgba(0,229,204,0.08);
      }

      .glow-box {
        box-shadow: 0 0 60px -12px rgba(0,229,204,0.2), inset 0 1px 0 rgba(255,255,255,0.05);
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

      @keyframes shimmer-purple {
        0% { background-position: -200% 0; }
        100% { background-position: 200% 0; }
      }
      .btn-shimmer-purple {
        background: linear-gradient(110deg, #7c5cfc 0%, #7c5cfc 40%, #a78bfa 50%, #7c5cfc 60%, #7c5cfc 100%);
        background-size: 200% 100%;
        animation: shimmer-purple 3s ease-in-out infinite;
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

      @keyframes fade-in-up {
        0% { opacity: 0; transform: translateY(24px); }
        100% { opacity: 1; transform: translateY(0); }
      }

      @keyframes glow-pulse-cyan {
        0%, 100% { box-shadow: 0 0 30px -8px rgba(0,229,204,0.15), inset 0 1px 0 rgba(255,255,255,0.05); }
        50% { box-shadow: 0 0 50px -4px rgba(0,229,204,0.3), inset 0 1px 0 rgba(255,255,255,0.08); }
      }

      @keyframes glow-pulse-purple {
        0%, 100% { box-shadow: 0 0 40px -8px rgba(124,92,252,0.2), 0 0 80px -16px rgba(0,229,204,0.1), inset 0 1px 0 rgba(255,255,255,0.06); }
        50% { box-shadow: 0 0 60px -4px rgba(124,92,252,0.35), 0 0 100px -12px rgba(0,229,204,0.15), inset 0 1px 0 rgba(255,255,255,0.1); }
      }

      @keyframes badge-float {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-3px); }
      }

      @keyframes roadmap-line-draw {
        0% { height: 0; }
        100% { height: 100%; }
      }

      ::-webkit-scrollbar { width: 6px; }
      ::-webkit-scrollbar-track { background: transparent; }
      ::-webkit-scrollbar-thumb { background: rgba(0,229,204,0.2); border-radius: 3px; }

      @media(max-width:768px) {
        .hide-mobile { display: none !important; }
        .show-mobile-only { display: block !important; }
      }
      @media(min-width:769px) {
        .show-mobile-only { display: none !important; }
      }
      @media(max-width:960px) {
        .pricing-grid { grid-template-columns: 1fr !important; max-width: 480px !important; margin-left: auto !important; margin-right: auto !important; }
        .roadmap-grid { grid-template-columns: 1fr !important; }
      }
    `}</style>
  );
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
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const getLinkHref = (label: string): string => {
    if (label === "Home") return "/";
    if (label === "Whales") return "/whales";
    if (label === "Pricing") return "/pricing";
    return `#${label.toLowerCase().replace(/ /g, "-")}`;
  };

  const navLinks = ["Home", "The Bot", "Whales", "Pricing", "How It Works", "Socials"];

  return (
    <header
      className="glass font-display"
      style={{
        position: "sticky",
        top: 0,
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
        <a
          href="/"
          style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}
        >
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

        {/* Desktop nav */}
        <nav
          className="hide-mobile"
          style={{ display: "flex", alignItems: "center", gap: 28 }}
        >
          {navLinks.map((l) => (
            <a
              key={l}
              href={getLinkHref(l)}
              style={{
                color: l === "Pricing" ? COLORS.accent : "#e2e8f0",
                textDecoration: "none",
                fontSize: 14,
                fontWeight: 700,
                letterSpacing: "0.01em",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLAnchorElement).style.color = COLORS.accent)
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLAnchorElement).style.color =
                  l === "Pricing" ? COLORS.accent : "#e2e8f0")
              }
            >
              {l}
            </a>
          ))}

          {/* PRO toggle */}
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

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          className="show-mobile-only"
          style={{ padding: "16px 24px", display: "flex", flexDirection: "column", gap: 16 }}
        >
          {navLinks.map((l) => (
            <a
              key={l}
              href={getLinkHref(l)}
              onClick={() => setMobileOpen(false)}
              style={{
                color: l === "Pricing" ? COLORS.accent : COLORS.textSecondary,
                textDecoration: "none",
                fontSize: 15,
                fontWeight: 600,
              }}
            >
              {l}
            </a>
          ))}
          <button
            onClick={() => { setIsSubscribed(!isSubscribed); setMobileOpen(false); }}
            style={{
              padding: "10px 16px",
              borderRadius: 8,
              border: `1px solid ${isSubscribed ? "rgba(0,229,204,0.3)" : "rgba(124,92,252,0.3)"}`,
              background: isSubscribed ? "rgba(0,229,204,0.08)" : "rgba(124,92,252,0.08)",
              color: isSubscribed ? COLORS.accent : COLORS.accentAlt,
              fontSize: 13,
              fontWeight: 600,
              cursor: "pointer",
              fontFamily: "DM Sans, sans-serif",
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            {isSubscribed ? <Eye size={14} /> : <EyeOff size={14} />}
            {isSubscribed ? "PRO Active — Click to disable" : "Free Tier — Click to upgrade"}
          </button>
        </div>
      )}
    </header>
  );
}

/* ═══════════════════════════════════════
   BILLING TOGGLE
   ═══════════════════════════════════════ */
function BillingToggle({
  annual,
  setAnnual,
}: {
  annual: boolean;
  setAnnual: (v: boolean) => void;
}): React.JSX.Element {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 14,
        marginBottom: 56,
      }}
    >
      <span
        style={{
          fontSize: 14,
          fontWeight: 500,
          color: !annual ? "#fff" : COLORS.textSecondary,
          transition: "color 0.2s",
        }}
      >
        Monthly
      </span>
      <button
        onClick={() => setAnnual(!annual)}
        style={{
          width: 52,
          height: 28,
          borderRadius: 14,
          border: "1px solid rgba(0,229,204,0.2)",
          background: annual ? "rgba(0,229,204,0.15)" : "rgba(255,255,255,0.06)",
          cursor: "pointer",
          position: "relative",
          transition: "all 0.3s ease",
        }}
      >
        <div
          style={{
            width: 20,
            height: 20,
            borderRadius: "50%",
            background: annual ? COLORS.accent : COLORS.textSecondary,
            position: "absolute",
            top: 3,
            left: annual ? 28 : 4,
            transition: "all 0.3s cubic-bezier(0.16,1,0.3,1)",
            boxShadow: annual ? "0 0 10px rgba(0,229,204,0.5)" : "none",
          }}
        />
      </button>
      <span
        style={{
          fontSize: 14,
          fontWeight: 500,
          color: annual ? "#fff" : COLORS.textSecondary,
          transition: "color 0.2s",
        }}
      >
        Annual
      </span>
      {annual && (
        <span
          style={{
            padding: "4px 10px",
            borderRadius: 6,
            background: "rgba(0,229,204,0.1)",
            border: "1px solid rgba(0,229,204,0.2)",
            color: COLORS.accent,
            fontSize: 12,
            fontWeight: 600,
            animation: "fade-in-up 0.3s ease both",
          }}
        >
          Save 20%
        </span>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════
   FEATURE LINE
   ═══════════════════════════════════════ */
function FeatureLine({
  text,
  included,
  highlight,
  comingSoon,
}: {
  text: string;
  included: boolean;
  highlight?: boolean;
  comingSoon?: boolean;
}): React.JSX.Element {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: 10,
        padding: "8px 0",
      }}
    >
      <div
        style={{
          width: 20,
          height: 20,
          borderRadius: 6,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          marginTop: 1,
          background: included ? "rgba(0,229,204,0.12)" : "rgba(255,255,255,0.03)",
          border: `1px solid ${included ? "rgba(0,229,204,0.2)" : "rgba(255,255,255,0.06)"}`,
        }}
      >
        {included ? (
          <Check size={12} color={COLORS.accent} strokeWidth={3} />
        ) : (
          <XIcon size={10} color="rgba(255,255,255,0.15)" strokeWidth={2.5} />
        )}
      </div>
      <span
        style={{
          fontSize: 14,
          lineHeight: 1.5,
          color: included
            ? highlight
              ? COLORS.accent
              : COLORS.textPrimary
            : "rgba(255,255,255,0.25)",
          fontWeight: highlight ? 600 : 400,
        }}
      >
        {text}
        {comingSoon && (
          <span
            style={{
              marginLeft: 8,
              padding: "2px 8px",
              borderRadius: 4,
              fontSize: 10,
              fontWeight: 600,
              color: COLORS.accentPink,
              background: "rgba(244,114,182,0.1)",
              border: "1px solid rgba(244,114,182,0.15)",
              verticalAlign: "middle",
            }}
          >
            SOON
          </span>
        )}
      </span>
    </div>
  );
}

/* ═══════════════════════════════════════
   PRICING CARD
   ═══════════════════════════════════════ */
interface PricingTier {
  name: string;
  tagline: string;
  monthlyPrice: number;
  annualPrice: number;
  icon: React.ReactNode;
  popular: boolean;
  features: { text: string; included: boolean; highlight?: boolean; comingSoon?: boolean }[];
  ctaText: string;
  borderColor: string;
  glowAnimation: string;
}

function PricingCard({
  tier,
  annual,
  index,
}: {
  tier: PricingTier;
  annual: boolean;
  index: number;
}): React.JSX.Element {
  const [isHovered, setIsHovered] = useState(false);
  const price = annual ? tier.annualPrice : tier.monthlyPrice;

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        position: "relative",
        padding: tier.popular ? 2 : 0,
        borderRadius: 22,
        background: tier.popular
          ? "linear-gradient(135deg, rgba(0,229,204,0.4), rgba(124,92,252,0.4))"
          : "transparent",
        animation: `fade-in-up 0.5s ease ${index * 0.12}s both`,
      }}
    >
      {/* Popular badge */}
      {tier.popular && (
        <div
          className="font-display"
          style={{
            position: "absolute",
            top: -14,
            left: "50%",
            transform: "translateX(-50%)",
            padding: "6px 20px",
            borderRadius: 100,
            background: "linear-gradient(135deg, #00e5cc, #7c5cfc)",
            color: "#060b18",
            fontSize: 11,
            fontWeight: 800,
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            zIndex: 2,
            display: "flex",
            alignItems: "center",
            gap: 6,
            animation: "badge-float 3s ease-in-out infinite",
            boxShadow: "0 4px 20px rgba(0,229,204,0.3)",
          }}
        >
          <Crown size={13} /> Most Popular
        </div>
      )}

      <div
        style={{
          padding: "36px 32px 32px",
          borderRadius: 20,
          background: tier.popular
            ? "rgba(8,14,30,0.95)"
            : COLORS.bgCard,
          border: `1px solid ${isHovered ? tier.borderColor : COLORS.border}`,
          transition: "all 0.4s cubic-bezier(0.16,1,0.3,1)",
          transform: isHovered
            ? tier.popular
              ? "translateY(-8px) scale(1.02)"
              : "translateY(-6px)"
            : "translateY(0)",
          animation: isHovered ? tier.glowAnimation : "none",
          boxShadow: isHovered
            ? tier.popular
              ? "0 0 60px -8px rgba(124,92,252,0.3), 0 0 100px -16px rgba(0,229,204,0.15)"
              : "0 0 40px -8px rgba(0,229,204,0.15)"
            : "0 0 30px -12px rgba(0,0,0,0.3)",
        }}
      >
        {/* Header */}
        <div style={{ marginBottom: 28 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: 10,
                background: tier.popular
                  ? "linear-gradient(135deg, #7c5cfc, #a78bfa)"
                  : `${tier.borderColor}15`,
                border: `1px solid ${tier.borderColor}30`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: tier.popular ? "#fff" : tier.borderColor.replace("0.3)", "1)"),
              }}
            >
              {tier.icon}
            </div>
            <div>
              <div
                className="font-display"
                style={{ fontSize: 18, fontWeight: 800, color: "#fff" }}
              >
                {tier.name}
              </div>
              <div style={{ fontSize: 12, color: COLORS.textSecondary }}>{tier.tagline}</div>
            </div>
          </div>
        </div>

        {/* Price */}
        <div style={{ marginBottom: 28 }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 4 }}>
            <span
              className="font-display"
              style={{
                fontSize: price === 0 ? 42 : 48,
                fontWeight: 800,
                color: "#fff",
                lineHeight: 1,
              }}
            >
              {price === 0 ? "Free" : `$${price}`}
            </span>
            {price > 0 && (
              <span style={{ fontSize: 14, color: COLORS.textSecondary, fontWeight: 500 }}>
                /mo
              </span>
            )}
          </div>
          {annual && price > 0 && (
            <div style={{ fontSize: 12, color: COLORS.textSecondary, marginTop: 4 }}>
              Billed ${price * 12}/year &middot;{" "}
              <span style={{ color: COLORS.accent }}>Save ${(tier.monthlyPrice - tier.annualPrice) * 12}</span>
            </div>
          )}
          {price === 0 && (
            <div style={{ fontSize: 12, color: COLORS.textSecondary, marginTop: 4 }}>
              Forever free &middot; No card required
            </div>
          )}
        </div>

        {/* CTA */}
        <button
          className={tier.popular ? "btn-shimmer-purple font-display" : "font-display"}
          style={{
            width: "100%",
            padding: "14px 24px",
            borderRadius: 12,
            border: tier.popular ? "none" : `1px solid ${tier.borderColor}`,
            cursor: "pointer",
            color: tier.popular ? "#fff" : COLORS.textPrimary,
            background: tier.popular
              ? undefined
              : price === 0
                ? "rgba(255,255,255,0.04)"
                : "rgba(0,229,204,0.06)",
            fontWeight: 700,
            fontSize: 15,
            fontFamily: "Syne, sans-serif",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            transition: "transform 0.2s, box-shadow 0.2s",
            marginBottom: 28,
          }}
          onMouseEnter={(e) => {
            const t = e.currentTarget as HTMLButtonElement;
            t.style.transform = "translateY(-1px)";
            t.style.boxShadow = tier.popular
              ? "0 6px 24px rgba(124,92,252,0.4)"
              : "0 4px 16px rgba(0,229,204,0.2)";
          }}
          onMouseLeave={(e) => {
            const t = e.currentTarget as HTMLButtonElement;
            t.style.transform = "translateY(0)";
            t.style.boxShadow = "none";
          }}
        >
          {tier.ctaText} <ArrowRight size={15} />
        </button>

        {/* Divider */}
        <div
          style={{
            height: 1,
            background: `linear-gradient(to right, transparent, ${COLORS.border}, transparent)`,
            marginBottom: 24,
          }}
        />

        {/* Features list */}
        <div>
          <div
            style={{
              fontSize: 11,
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              color: COLORS.textSecondary,
              marginBottom: 14,
            }}
          >
            What&apos;s included
          </div>
          {tier.features.map((f, i) => (
            <FeatureLine
              key={i}
              text={f.text}
              included={f.included}
              highlight={f.highlight}
              comingSoon={f.comingSoon}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════
   PRICING TIERS DATA
   ═══════════════════════════════════════ */
const TIERS: PricingTier[] = [
  {
    name: "The Watcher",
    tagline: "Observe the whales",
    monthlyPrice: 0,
    annualPrice: 0,
    icon: <Eye size={20} />,
    popular: false,
    ctaText: "Get Started Free",
    borderColor: "rgba(0,229,204,0.15)",
    glowAnimation: "glow-pulse-cyan 3s ease-in-out infinite",
    features: [
      { text: "Full Whale Leaderboard Access (Censored)", included: true },
      { text: "Curated Polymarket Intelligence Feed", included: true },
      { text: "Global Market Volume Alerts", included: true },
      { text: "PolyWhale Public Discord Community", included: true },
      { text: "Delayed Signal Updates", included: true },
      { text: "Unrestricted Wallet Visibility", included: false },
      { text: "Auto-Follow Whales", included: false },
      { text: "Ultra-Low Latency Execution", included: false },
    ],
  },
  {
    name: "The Whale Hunter",
    tagline: "Copy the smart money",
    monthlyPrice: 99,
    annualPrice: 79,
    icon: <Crown size={20} />,
    popular: true,
    ctaText: "Start Hunting",
    borderColor: "rgba(124,92,252,0.3)",
    glowAnimation: "glow-pulse-purple 3s ease-in-out infinite",
    features: [
      { text: "Everything in Watcher +", included: true, highlight: true },
      { text: "Unrestricted Wallet Visibility (No Blurring)", included: true, highlight: true },
      { text: "Ultra-Low Latency Execution (<20ms)", included: true, highlight: true },
      { text: "Co-Located AWS EU-West 1 Infrastructure", included: true, highlight: true },
      { text: "Precision Mirroring (Up to 5 Whales)", included: true },
      { text: "Real-time Discord Signal Relays", included: true },
      { text: "Advanced ROI & Performance Analytics", included: true },
      { text: "Priority Member Support", included: true },
    ],
  },
  {
    name: "The Market Maker",
    tagline: "Institutional-grade alpha",
    monthlyPrice: 499,
    annualPrice: 399,
    icon: <Sparkles size={20} />,
    popular: false,
    ctaText: "Go Institutional",
    borderColor: "rgba(251,191,36,0.25)",
    glowAnimation: "glow-pulse-cyan 3s ease-in-out infinite",
    features: [
      { text: "Everything in Whale Hunter +", included: true, highlight: true },
      { text: "Mass-Scale Mirroring (Unlimited Whales)", included: true, highlight: true },
      { text: "Developer-Grade API & Webhook Access", included: true },
      { text: "VIP 1-on-1 White-Glove Onboarding", included: true },
      { text: "Direct 24/7 Telegram Concierge", included: true },
      { text: "Beta Access: Cross-Exchange Arbitrage", included: true, comingSoon: true },
      { text: "Beta Access: AI Sentiment Sniper", included: true, comingSoon: true },
      { text: "Beta Access: Predictive Alpha Engine", included: true, comingSoon: true },
    ],
  },
];

/* ═══════════════════════════════════════
   ROADMAP ITEM
   ═══════════════════════════════════════ */
interface RoadmapFeature {
  icon: React.ReactNode;
  title: string;
  description: string;
  status: string;
  color: string;
  quarter: string;
}

function RoadmapCard({ item, index }: { item: RoadmapFeature; index: number }): React.JSX.Element {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        padding: 28,
        borderRadius: 16,
        background: COLORS.bgCard,
        border: `1px solid ${isHovered ? `${item.color}30` : COLORS.border}`,
        transition: "all 0.35s cubic-bezier(0.16,1,0.3,1)",
        transform: isHovered ? "translateY(-4px)" : "translateY(0)",
        boxShadow: isHovered ? `0 0 40px -8px ${item.color}20` : "none",
        animation: `fade-in-up 0.5s ease ${index * 0.1}s both`,
      }}
    >
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 16 }}>
        <div
          style={{
            width: 44,
            height: 44,
            borderRadius: 12,
            background: `${item.color}12`,
            border: `1px solid ${item.color}25`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: item.color,
            transition: "transform 0.3s ease",
            transform: isHovered ? "rotate(-6deg) scale(1.1)" : "rotate(0deg)",
          }}
        >
          {item.icon}
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            gap: 4,
          }}
        >
          <span
            style={{
              padding: "4px 10px",
              borderRadius: 6,
              fontSize: 10,
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.06em",
              color: item.color,
              background: `${item.color}10`,
              border: `1px solid ${item.color}20`,
            }}
          >
            {item.status}
          </span>
          <span style={{ fontSize: 11, color: COLORS.textSecondary }}>{item.quarter}</span>
        </div>
      </div>

      <h3
        className="font-display"
        style={{ fontSize: 17, fontWeight: 700, color: "#fff", marginBottom: 8 }}
      >
        {item.title}
      </h3>
      <p style={{ fontSize: 13, lineHeight: 1.65, color: COLORS.textSecondary }}>
        {item.description}
      </p>
    </div>
  );
}

/* ═══════════════════════════════════════
   FAQ ITEM
   ═══════════════════════════════════════ */
function FAQItem({ q, a, index }: { q: string; a: string; index: number }): React.JSX.Element {
  const [open, setOpen] = useState(false);

  return (
    <div
      style={{
        borderBottom: `1px solid ${COLORS.border}`,
        animation: `fade-in-up 0.4s ease ${index * 0.06}s both`,
      }}
    >
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: "100%",
          padding: "20px 0",
          border: "none",
          background: "transparent",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 16,
          fontFamily: "DM Sans, sans-serif",
        }}
      >
        <span style={{ fontSize: 15, fontWeight: 600, color: "#fff", textAlign: "left" }}>{q}</span>
        <div
          style={{
            width: 28,
            height: 28,
            borderRadius: 8,
            background: open ? "rgba(0,229,204,0.1)" : "rgba(255,255,255,0.04)",
            border: `1px solid ${open ? "rgba(0,229,204,0.2)" : COLORS.border}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            transition: "all 0.2s ease",
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
          }}
        >
          <ChevronRight
            size={14}
            color={open ? COLORS.accent : COLORS.textSecondary}
            style={{ transform: "rotate(90deg)" }}
          />
        </div>
      </button>
      {open && (
        <div
          style={{
            paddingBottom: 20,
            fontSize: 14,
            lineHeight: 1.7,
            color: COLORS.textSecondary,
            animation: "fade-in-up 0.25s ease both",
          }}
        >
          {a}
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════
   MAIN PAGE
   ═══════════════════════════════════════ */
export default function PricingPage(): React.JSX.Element {
  const [annual, setAnnual] = useState<boolean>(false);
  const [isSubscribed, setIsSubscribed] = useState<boolean>(false);

  const roadmapItems: RoadmapFeature[] = [
    {
      icon: <BrainCircuit size={22} />,
      title: "AI Sentiment Sniper",
      description:
        "Machine learning model that analyzes social sentiment, news feeds, and on-chain signals to predict market movements before whales even act. Pre-position ahead of the herd.",
      status: "In Development",
      color: COLORS.accentPink,
      quarter: "Q3 2026",
    },
    {
      icon: <ArrowLeftRight size={22} />,
      title: "Cross-Exchange Arbitrage",
      description:
        "Detect pricing discrepancies between Polymarket and other prediction platforms. Automatically execute delta-neutral arbitrage strategies for risk-minimized returns.",
      status: "In Development",
      color: COLORS.accentAlt,
      quarter: "Q4 2026",
    },
    {
      icon: <Rocket size={22} />,
      title: "Predictive Alpha Engine",
      description:
        "A proprietary model that combines whale behavior patterns, historical resolution data, and real-time event feeds to generate standalone trade signals \u2014 no whale required.",
      status: "Research Phase",
      color: COLORS.accent,
      quarter: "Q1 2027",
    },
  ];

  const faqs = [
    {
      q: "Can I cancel my subscription at any time?",
      a: "Yes, you can cancel anytime from your dashboard. Your access continues until the end of your current billing period. No lock-in contracts, no cancellation fees.",
    },
    {
      q: "Is PolyWhale non-custodial? Do you hold my funds?",
      a: "PolyWhale never holds, controls, or has access to your funds. All trades execute through delegated smart contract authority on Polygon. You can revoke access at any time with a single click.",
    },
    {
      q: "What does sub-second execution actually mean?",
      a: "When a tracked whale places a position on Polymarket, our EU-West 1 co-located servers detect the on-chain transaction and mirror it to your account in under 20 milliseconds. This is faster than the blink of an eye.",
    },
    {
      q: "What happens if a whale I\u2019m following loses money?",
      a: "You can set custom risk limits per whale including max position size, daily loss caps, and market type filters. PolyWhale will automatically pause copying if your thresholds are breached.",
    },
    {
      q: "When will the \u201cComing Soon\u201d features launch?",
      a: "Sentiment Sniper and Cross-Exchange Arbitrage are actively in development for Q3\u2013Q4 2026. Institutional tier subscribers will receive early beta access. The Predictive Alpha Engine is in research phase for Q1 2027.",
    },
  ];

  return (
    <div style={{ background: COLORS.bg, minHeight: "100vh" }}>
      <GlobalStyles />

      {/* Background effects */}
      <div className="grid-bg" style={{ position: "fixed", inset: 0, opacity: 0.35, pointerEvents: "none" }} />
      <div
        style={{
          position: "fixed",
          top: "0%",
          left: "50%",
          transform: "translateX(-50%)",
          width: 800,
          height: 800,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(124,92,252,0.06), transparent 70%)",
          filter: "blur(80px)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "fixed",
          bottom: "0%",
          right: "10%",
          width: 500,
          height: 500,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(0,229,204,0.04), transparent 70%)",
          filter: "blur(60px)",
          pointerEvents: "none",
        }}
      />

      <Header isSubscribed={isSubscribed} setIsSubscribed={setIsSubscribed} />

      <main style={{ position: "relative" }}>
        {/* ─── Hero ─── */}
        <section style={{ padding: "64px 24px 20px", textAlign: "center" }}>
          <div style={{ maxWidth: 700, margin: "0 auto" }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "6px 14px",
                borderRadius: 100,
                background: "rgba(124,92,252,0.08)",
                border: "1px solid rgba(124,92,252,0.15)",
                marginBottom: 20,
                fontSize: 12,
                color: COLORS.accentAlt,
                fontWeight: 500,
                animation: "fade-in-up 0.5s ease both",
              }}
            >
              <Zap size={12} /> Simple, transparent pricing
            </div>

            <h1
              className="font-display"
              style={{
                fontSize: "clamp(32px, 5vw, 52px)",
                fontWeight: 800,
                color: "#fff",
                letterSpacing: "-0.03em",
                marginBottom: 16,
                lineHeight: 1.1,
                animation: "fade-in-up 0.5s ease 0.05s both",
              }}
            >
              Choose Your{" "}
              <span
                style={{
                  background: "linear-gradient(135deg, #00e5cc, #7c5cfc)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Edge
              </span>
            </h1>

            <p
              style={{
                fontSize: 17,
                color: COLORS.textSecondary,
                lineHeight: 1.7,
                maxWidth: 520,
                margin: "0 auto",
                animation: "fade-in-up 0.5s ease 0.1s both",
              }}
            >
              From watching the leaderboard to mirroring every whale trade at machine
              speed. Pick the plan that matches your ambition.
            </p>
          </div>
        </section>

        {/* ─── Billing toggle ─── */}
        <section style={{ padding: "32px 24px 0" }}>
          <BillingToggle annual={annual} setAnnual={setAnnual} />
        </section>

        {/* ─── Pricing Cards ─── */}
        <section style={{ padding: "0 24px 80px" }}>
          <div
            className="pricing-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 24,
              maxWidth: 1100,
              margin: "0 auto",
              alignItems: "start",
            }}
          >
            {TIERS.map((tier, i) => (
              <PricingCard key={tier.name} tier={tier} annual={annual} index={i} />
            ))}
          </div>
        </section>

        {/* ─── Alpha Roadmap ─── */}
        <section style={{ padding: "40px 24px 80px" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: 56 }}>
              <span
                className="font-display"
                style={{
                  fontSize: 13,
                  fontWeight: 600,
                  color: COLORS.accentPink,
                  textTransform: "uppercase",
                  letterSpacing: "0.12em",
                }}
              >
                The Alpha Roadmap
              </span>
              <h2
                className="font-display"
                style={{
                  fontSize: "clamp(26px, 3.5vw, 40px)",
                  fontWeight: 800,
                  color: "#fff",
                  marginTop: 12,
                  letterSpacing: "-0.02em",
                }}
              >
                What&apos;s{" "}
                <span
                  style={{
                    background: "linear-gradient(135deg, #f472b6, #7c5cfc)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  Coming Next
                </span>
              </h2>
              <p
                style={{
                  fontSize: 15,
                  color: COLORS.textSecondary,
                  marginTop: 12,
                  maxWidth: 500,
                  margin: "12px auto 0",
                  lineHeight: 1.6,
                }}
              >
                PolyWhale is just getting started. Here&apos;s the tech we&apos;re building to keep
                you ahead of every market.
              </p>
            </div>

            <div
              className="roadmap-grid"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: 20,
              }}
            >
              {roadmapItems.map((item, i) => (
                <RoadmapCard key={item.title} item={item} index={i} />
              ))}
            </div>
          </div>
        </section>

        {/* ─── FAQ ─── */}
        <section style={{ padding: "20px 24px 80px" }}>
          <div style={{ maxWidth: 680, margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: 48 }}>
              <h2
                className="font-display"
                style={{
                  fontSize: "clamp(24px, 3vw, 34px)",
                  fontWeight: 800,
                  color: "#fff",
                  letterSpacing: "-0.02em",
                }}
              >
                Frequently Asked
              </h2>
            </div>

            <div
              style={{
                borderRadius: 18,
                background: COLORS.bgCard,
                border: `1px solid ${COLORS.border}`,
                padding: "8px 28px",
              }}
            >
              {faqs.map((faq, i) => (
                <FAQItem key={i} q={faq.q} a={faq.a} index={i} />
              ))}
            </div>
          </div>
        </section>

        {/* ─── Bottom CTA ─── */}
        <section style={{ padding: "0 24px 100px" }}>
          <div
            style={{
              maxWidth: 800,
              margin: "0 auto",
              padding: "48px 40px",
              borderRadius: 24,
              position: "relative",
              overflow: "hidden",
              background: "linear-gradient(135deg, rgba(124,92,252,0.08), rgba(0,229,204,0.06))",
              border: "1px solid rgba(124,92,252,0.12)",
              textAlign: "center",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: "-40%",
                right: "-15%",
                width: 300,
                height: 300,
                borderRadius: "50%",
                background: "radial-gradient(circle, rgba(124,92,252,0.12), transparent 70%)",
                pointerEvents: "none",
              }}
            />
            <div
              style={{
                position: "absolute",
                bottom: "-30%",
                left: "-10%",
                width: 250,
                height: 250,
                borderRadius: "50%",
                background: "radial-gradient(circle, rgba(0,229,204,0.08), transparent 70%)",
                pointerEvents: "none",
              }}
            />

            <div style={{ position: "relative" }}>
              <h2
                className="font-display"
                style={{
                  fontSize: "clamp(22px, 3vw, 32px)",
                  fontWeight: 800,
                  color: "#fff",
                  marginBottom: 12,
                }}
              >
                Still deciding? Start free.
              </h2>
              <p
                style={{
                  fontSize: 15,
                  color: COLORS.textSecondary,
                  maxWidth: 440,
                  margin: "0 auto 28px",
                  lineHeight: 1.6,
                }}
              >
                Watch the leaderboard, study the whales, and upgrade when you&apos;re ready
                to copy their alpha.
              </p>
              <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
                <button
                  className="btn-shimmer font-display"
                  style={{
                    padding: "14px 32px",
                    borderRadius: 12,
                    border: "none",
                    cursor: "pointer",
                    color: "#060b18",
                    fontWeight: 700,
                    fontSize: 15,
                    display: "inline-flex",
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
                  Get Started Free <ArrowRight size={15} />
                </button>
                <a
                  href="/whales"
                  className="font-display"
                  style={{
                    padding: "14px 28px",
                    borderRadius: 12,
                    border: "1px solid rgba(124,92,252,0.25)",
                    background: "rgba(124,92,252,0.06)",
                    color: COLORS.accentAlt,
                    fontWeight: 600,
                    fontSize: 15,
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    textDecoration: "none",
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    const t = e.currentTarget as HTMLAnchorElement;
                    t.style.background = "rgba(124,92,252,0.12)";
                    t.style.borderColor = "rgba(124,92,252,0.4)";
                  }}
                  onMouseLeave={(e) => {
                    const t = e.currentTarget as HTMLAnchorElement;
                    t.style.background = "rgba(124,92,252,0.06)";
                    t.style.borderColor = "rgba(124,92,252,0.25)";
                  }}
                >
                  View Leaderboard <ExternalLink size={14} />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Footer ─── */}
        <footer
          style={{
            borderTop: "1px solid rgba(0,229,204,0.06)",
            padding: "32px 24px",
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
            <span style={{ fontSize: 12, color: COLORS.textSecondary }}>
              &copy; 2026 PolyWhale. All rights reserved. Prediction markets involve risk.
            </span>
            <div style={{ display: "flex", gap: 16 }}>
              {["Terms", "Privacy", "Risk Disclosure"].map((s, i) => (
                <a
                  key={i}
                  href="#"
                  style={{
                    fontSize: 12,
                    color: COLORS.textSecondary,
                    textDecoration: "none",
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) =>
                    ((e.currentTarget as HTMLAnchorElement).style.color = COLORS.accent)
                  }
                  onMouseLeave={(e) =>
                    ((e.currentTarget as HTMLAnchorElement).style.color = COLORS.textSecondary)
                  }
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
