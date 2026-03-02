"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Waves,
  Crown,
  Copy,
  Check,
  Lock,
  TrendingUp,
  Clock,
  Trophy,
  Eye,
  EyeOff,
  Zap,
  Flame,
  Target,
  ArrowRight,
  Menu,
  X,
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

/* ─── mock whale data ─── */
interface Whale {
  id: number;
  walletAddress: string;
  displayName: string;
  winRate: number;
  thirtyDayPnL: number;
  totalVolume: number;
  topMarkets: string[];
  lastActive: string;
  followers: number;
  streak: number;
}

const WHALES: Whale[] = [
  {
    id: 1,
    walletAddress: "0x3fA1b2C4d5E6f7A8b9C0d1E2f3A4b5C6d7E8f9A0",
    displayName: "majorexploiter",
    winRate: 94,
    thirtyDayPnL: 2400000,
    totalVolume: 19200000,
    topMarkets: ["Politics", "Macro"],
    lastActive: "1 min ago",
    followers: 3241,
    streak: 18,
  },
  {
    id: 2,
    walletAddress: "0x7bC9d0E1f2A3b4C5d6E7f8A9b0C1d2E3f4A5b6C7",
    displayName: "gmanas",
    winRate: 91,
    thirtyDayPnL: 732000,
    totalVolume: 6100000,
    topMarkets: ["Crypto", "Elections"],
    lastActive: "4 mins ago",
    followers: 2187,
    streak: 12,
  },
  {
    id: 3,
    walletAddress: "0x1aC2d3E4f5B6c7D8e9F0a1B2c3D4e5F6a7B8c9D0",
    displayName: "Anon-9197",
    winRate: 88,
    thirtyDayPnL: 552000,
    totalVolume: 4800000,
    topMarkets: ["Politics", "Sports"],
    lastActive: "9 mins ago",
    followers: 1654,
    streak: 9,
  },
  {
    id: 4,
    walletAddress: "0x9bE5f6A7b8C9d0E1f2A3b4C5d6E7f8A9b0C1d2E3",
    displayName: "WoofMaster",
    winRate: 87,
    thirtyDayPnL: 404000,
    totalVolume: 3500000,
    topMarkets: ["Crypto", "Fed Policy"],
    lastActive: "17 mins ago",
    followers: 1389,
    streak: 7,
  },
  {
    id: 5,
    walletAddress: "0x4dF0a1B2c3D4e5F6a7B8c9D0e1F2a3B4c5D6e7F8",
    displayName: "Wannac",
    winRate: 85,
    thirtyDayPnL: 346000,
    totalVolume: 2900000,
    topMarkets: ["Geopolitics", "Macro"],
    lastActive: "31 mins ago",
    followers: 1102,
    streak: 11,
  },
  {
    id: 6,
    walletAddress: "0x7eA9b0C1d2E3f4A5b6C7d8E9f0A1b2C3d4E5f6A7",
    displayName: "auggl00p",
    winRate: 84,
    thirtyDayPnL: 333000,
    totalVolume: 2600000,
    topMarkets: ["Tech", "AI Policy"],
    lastActive: "58 mins ago",
    followers: 876,
    streak: 6,
  },
  {
    id: 7,
    walletAddress: "0x2bC3d4E5f6A7b8C9d0E1f2A3b4C5d6E7f8A9b0C1",
    displayName: "joosangyoo",
    winRate: 82,
    thirtyDayPnL: 292000,
    totalVolume: 2300000,
    topMarkets: ["Sports", "MMA"],
    lastActive: "1 hour ago",
    followers: 743,
    streak: 5,
  },
  {
    id: 8,
    walletAddress: "0x6fD4e5F6a7B8c9D0e1F2a3B4c5D6e7F8a9B0c1D2",
    displayName: "gatorr",
    winRate: 81,
    thirtyDayPnL: 287000,
    totalVolume: 2200000,
    topMarkets: ["Politics", "SCOTUS"],
    lastActive: "2 hours ago",
    followers: 612,
    streak: 4,
  },
  {
    id: 9,
    walletAddress: "0x8Dbf0DE58835C4827Ba77669b5155980d1A053be",
    displayName: "Vanguard_Trades",
    winRate: 80,
    thirtyDayPnL: 158000,
    totalVolume: 1400000,
    topMarkets: ["Crypto", "ETH"],
    lastActive: "3 hours ago",
    followers: 489,
    streak: 3,
  },
  {
    id: 10,
    walletAddress: "0x5cA8b9D0e1F2a3B4c5D6e7F8a9B0c1D2e3F4a5B6",
    displayName: "JuicySlots",
    winRate: 79,
    thirtyDayPnL: 116000,
    totalVolume: 980000,
    topMarkets: ["Sports", "Soccer"],
    lastActive: "4 hours ago",
    followers: 371,
    streak: 2,
  },
];

/* ─── helpers ─── */
function formatPnL(value: number): string {
  if (value >= 1000000) return `+$${(value / 1000000).toFixed(1)}M`;
  if (value >= 1000) return `+$${(value / 1000).toFixed(1)}k`;
  return `+$${value}`;
}

function formatVolume(value: number): string {
  if (value >= 1000000) return `$${(value / 1000000).toFixed(1)}M`;
  if (value >= 1000) return `$${(value / 1000).toFixed(0)}k`;
  return `$${value}`;
}

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
        0% { opacity: 0; transform: translateY(20px); }
        100% { opacity: 1; transform: translateY(0); }
      }

      @keyframes pulse-glow {
        0%, 100% { box-shadow: 0 0 20px rgba(0,229,204,0.1); }
        50% { box-shadow: 0 0 40px rgba(0,229,204,0.25); }
      }

      @keyframes float-paywall {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-4px); }
      }

      @keyframes streak-flame {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.2); }
      }

      ::-webkit-scrollbar { width: 6px; }
      ::-webkit-scrollbar-track { background: transparent; }
      ::-webkit-scrollbar-thumb { background: rgba(0,229,204,0.2); border-radius: 3px; }

      @media(max-width:900px){
        .leaderboard-table-head { display: none !important; }
        .leaderboard-row { flex-direction: column !important; align-items: flex-start !important; gap: 12px !important; }
        .leaderboard-row > div { width: 100% !important; }
        .stats-grid { grid-template-columns: 1fr 1fr !important; }
        .hide-mobile { display: none !important; }
      }
      @media(min-width:901px){
        .show-mobile-only { display: none !important; }
      }
      @media(max-width:600px){
        .stats-grid { grid-template-columns: 1fr !important; }
      }
    `}</style>
  );
}

/* ═══════════════════════════════════════
   HEADER / NAV
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
                color: l === "Whales" ? COLORS.accent : "#e2e8f0",
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
                  l === "Whales" ? COLORS.accent : "#e2e8f0")
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

        {/* Mobile toggle button */}
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
                color: l === "Whales" ? COLORS.accent : COLORS.textSecondary,
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
   STATS OVERVIEW
   ═══════════════════════════════════════ */
function StatsOverview(): React.JSX.Element {
  const stats = [
    { label: "Whales Tracked", value: "1,247", icon: <Target size={18} />, color: COLORS.accent },
    { label: "Combined 30d P&L", value: "+$12.4M", icon: <TrendingUp size={18} />, color: "#4ade80" },
    { label: "Avg. Win Rate", value: "88.4%", icon: <Trophy size={18} />, color: COLORS.accentAlt },
    { label: "Markets Covered", value: "340+", icon: <Zap size={18} />, color: COLORS.accentPink },
  ];

  return (
    <div
      className="stats-grid"
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: 16,
        marginBottom: 32,
      }}
    >
      {stats.map((s, i) => (
        <div
          key={i}
          style={{
            padding: "20px 24px",
            borderRadius: 14,
            background: COLORS.bgCard,
            border: `1px solid ${COLORS.border}`,
            animation: `fade-in-up 0.5s ease ${i * 0.1}s both`,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 10,
            }}
          >
            <span style={{ fontSize: 12, color: COLORS.textSecondary, fontWeight: 500 }}>
              {s.label}
            </span>
            <div style={{ color: s.color, opacity: 0.7 }}>{s.icon}</div>
          </div>
          <div
            className="font-display"
            style={{ fontSize: 26, fontWeight: 800, color: "#fff" }}
          >
            {s.value}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════
   FILTER BAR
   ═══════════════════════════════════════ */
function FilterBar({
  activeFilter,
  setActiveFilter,
  sortBy,
  setSortBy,
}: {
  activeFilter: string;
  setActiveFilter: (v: string) => void;
  sortBy: string;
  setSortBy: (v: string) => void;
}): React.JSX.Element {
  const filters = ["All", "Politics", "Crypto", "Macro", "Sports", "Tech"];
  const sorts = [
    { value: "pnl", label: "30d P&L" },
    { value: "winRate", label: "Win Rate" },
    { value: "volume", label: "Volume" },
    { value: "recent", label: "Recently Active" },
  ];

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 16,
        marginBottom: 20,
        flexWrap: "wrap",
      }}
    >
      {/* Market filters */}
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setActiveFilter(f)}
            style={{
              padding: "7px 16px",
              borderRadius: 8,
              border: `1px solid ${activeFilter === f ? "rgba(0,229,204,0.3)" : COLORS.border}`,
              background:
                activeFilter === f
                  ? "rgba(0,229,204,0.1)"
                  : "rgba(255,255,255,0.02)",
              color: activeFilter === f ? COLORS.accent : COLORS.textSecondary,
              fontSize: 13,
              fontWeight: 500,
              cursor: "pointer",
              fontFamily: "DM Sans, sans-serif",
              transition: "all 0.2s ease",
            }}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Sort dropdown */}
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{ fontSize: 12, color: COLORS.textSecondary }}>Sort by:</span>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          style={{
            padding: "7px 12px",
            borderRadius: 8,
            border: `1px solid ${COLORS.border}`,
            background: "rgba(12,20,40,0.8)",
            color: COLORS.textPrimary,
            fontSize: 13,
            fontFamily: "DM Sans, sans-serif",
            cursor: "pointer",
            outline: "none",
          }}
        >
          {sorts.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════
   WHALE ROW
   ═══════════════════════════════════════ */
function WhaleRow({
  whale,
  rank,
  isSubscribed,
  index,
}: {
  whale: Whale;
  rank: number;
  isSubscribed: boolean;
  index: number;
}): React.JSX.Element {
  const [copied, setCopied] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(whale.walletAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className="leaderboard-row"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 0,
        padding: "18px 24px",
        borderRadius: 14,
        background: isHovered
          ? "rgba(0,229,204,0.03)"
          : rank <= 3
            ? "rgba(0,229,204,0.015)"
            : "transparent",
        border: `1px solid ${isHovered ? "rgba(0,229,204,0.15)" : rank <= 3 ? "rgba(0,229,204,0.06)" : "transparent"}`,
        transition: "all 0.3s ease",
        animation: `fade-in-up 0.4s ease ${index * 0.06}s both`,
        cursor: "default",
      }}
    >
      {/* Rank */}
      <div style={{ width: 52, flexShrink: 0 }}>
        <div
          className="font-display"
          style={{
            width: 36,
            height: 36,
            borderRadius: 10,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 15,
            fontWeight: 800,
            color: rank <= 3 ? "#060b18" : COLORS.textSecondary,
            background:
              rank === 1
                ? "linear-gradient(135deg, #fbbf24, #f59e0b)"
                : rank === 2
                  ? "linear-gradient(135deg, #c4b5fd, #8b5cf6)"
                  : rank === 3
                    ? "linear-gradient(135deg, #00e5cc, #00b8a9)"
                    : "rgba(255,255,255,0.04)",
            border: rank > 3 ? `1px solid ${COLORS.border}` : "none",
          }}
        >
          {rank}
        </div>
      </div>

      {/* Whale identity */}
      <div style={{ flex: "1 1 220px", minWidth: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
          <span style={{ fontSize: 14, fontWeight: 600, color: "#fff" }}>
            {whale.displayName}
          </span>
          {whale.streak >= 5 && (
            <span
              title={`${whale.streak} win streak`}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 3,
                fontSize: 11,
                color: "#fb923c",
                animation: "streak-flame 1.5s ease infinite",
              }}
            >
              <Flame size={12} /> {whale.streak}
            </span>
          )}
        </div>

        {/* Wallet address — blurred or visible */}
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span
            style={{
              fontFamily: "monospace",
              fontSize: 13,
              color: isSubscribed ? COLORS.accent : COLORS.textSecondary,
              filter: isSubscribed ? "none" : "blur(5px)",
              userSelect: isSubscribed ? "text" : "none",
              transition: "filter 0.4s ease, color 0.3s ease",
              letterSpacing: "0.02em",
            }}
          >
            {whale.walletAddress}
          </span>
          {isSubscribed ? (
            <button
              onClick={handleCopy}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 4,
                padding: "3px 10px",
                borderRadius: 6,
                border: `1px solid ${copied ? "rgba(0,229,204,0.3)" : COLORS.border}`,
                background: copied ? "rgba(0,229,204,0.1)" : "transparent",
                color: copied ? COLORS.accent : COLORS.textSecondary,
                fontSize: 11,
                cursor: "pointer",
                fontFamily: "DM Sans, sans-serif",
                transition: "all 0.2s ease",
              }}
            >
              {copied ? <Check size={11} /> : <Copy size={11} />}
              {copied ? "Copied" : "Copy"}
            </button>
          ) : (
            <Lock size={12} style={{ color: COLORS.textSecondary, opacity: 0.4 }} />
          )}
        </div>
      </div>

      {/* Win rate */}
      <div style={{ width: 140, flexShrink: 0, textAlign: "center", paddingRight: "16px" }}>
        <div style={{ fontSize: 11, color: COLORS.textSecondary, marginBottom: 4 }}>
          Win Rate
        </div>
        <div
          className="font-display"
          style={{
            fontSize: 20,
            fontWeight: 800,
            color: "#4ade80",
            textShadow: "0 0 20px rgba(74,222,128,0.3)",
          }}
        >
          {whale.winRate}%
        </div>
      </div>

      {/* 30d PnL */}
      <div style={{ width: 160, flexShrink: 0, textAlign: "center" }}>
        <div style={{ fontSize: 11, color: COLORS.textSecondary, marginBottom: 4 }}>
          30d P&amp;L
        </div>
        <div
          className="font-display"
          style={{
            fontSize: 20,
            fontWeight: 800,
            color: COLORS.accent,
            textShadow: `0 0 20px rgba(0,229,204,0.3)`,
          }}
        >
          {formatPnL(whale.thirtyDayPnL)}
        </div>
      </div>

      {/* Volume */}
      <div style={{ width: 100, flexShrink: 0, textAlign: "center" }}>
        <div style={{ fontSize: 11, color: COLORS.textSecondary, marginBottom: 4 }}>
          Volume
        </div>
        <div style={{ fontSize: 14, fontWeight: 600, color: COLORS.textPrimary }}>
          {formatVolume(whale.totalVolume)}
        </div>
      </div>

      {/* Markets */}
      <div style={{ width: 160, flexShrink: 0 }}>
        <div style={{ fontSize: 11, color: COLORS.textSecondary, marginBottom: 6 }}>
          Top Markets
        </div>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {whale.topMarkets.map((m, j) => (
            <span
              key={j}
              style={{
                padding: "3px 10px",
                borderRadius: 6,
                fontSize: 11,
                fontWeight: 500,
                color: COLORS.accentAlt,
                background: "rgba(124,92,252,0.1)",
                border: "1px solid rgba(124,92,252,0.15)",
              }}
            >
              {m}
            </span>
          ))}
        </div>
      </div>

      {/* Last Active + Follow */}
      <div style={{ width: 120, flexShrink: 0, textAlign: "right" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            gap: 4,
            marginBottom: 8,
            fontSize: 12,
            color: COLORS.textSecondary,
          }}
        >
          <Clock size={11} />
          {whale.lastActive}
        </div>
        {isSubscribed ? (
          <button
            style={{
              padding: "6px 14px",
              borderRadius: 8,
              border: "none",
              background: "linear-gradient(135deg, #00e5cc, #00c4b0)",
              color: "#060b18",
              fontSize: 12,
              fontWeight: 700,
              cursor: "pointer",
              fontFamily: "Syne, sans-serif",
              display: "inline-flex",
              alignItems: "center",
              gap: 4,
              transition: "transform 0.2s, box-shadow 0.2s",
            }}
            onMouseEnter={(e) => {
              const t = e.currentTarget as HTMLButtonElement;
              t.style.transform = "translateY(-1px)";
              t.style.boxShadow = "0 4px 16px rgba(0,229,204,0.35)";
            }}
            onMouseLeave={(e) => {
              const t = e.currentTarget as HTMLButtonElement;
              t.style.transform = "translateY(0)";
              t.style.boxShadow = "none";
            }}
          >
            <Zap size={11} /> Auto-Follow
          </button>
        ) : (
          <span
            style={{
              fontSize: 11,
              color: COLORS.textSecondary,
              opacity: 0.5,
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              gap: 4,
            }}
          >
            <Lock size={11} /> PRO only
          </span>
        )}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════
   TABLE HEADER
   ═══════════════════════════════════════ */
function TableHeader(): React.JSX.Element {
  return (
    <div
      className="leaderboard-table-head"
      style={{
        display: "flex",
        alignItems: "center",
        padding: "12px 24px",
        borderBottom: `1px solid ${COLORS.border}`,
        marginBottom: 4,
      }}
    >
      <div style={{ width: 52, flexShrink: 0, fontSize: 11, color: COLORS.textSecondary, fontWeight: 600 }}>
        #
      </div>
      <div style={{ flex: "1 1 220px", fontSize: 11, color: COLORS.textSecondary, fontWeight: 600 }}>
        Whale
      </div>
      <div style={{ width: 140, flexShrink: 0, textAlign: "center", paddingRight: "16px", fontSize: 11, color: COLORS.textSecondary, fontWeight: 600 }}>
        Win Rate
      </div>
      <div style={{ width: 160, flexShrink: 0, textAlign: "center", fontSize: 11, color: COLORS.textSecondary, fontWeight: 600 }}>
        30d P&amp;L
      </div>
      <div style={{ width: 100, flexShrink: 0, textAlign: "center", fontSize: 11, color: COLORS.textSecondary, fontWeight: 600 }}>
        Volume
      </div>
      <div style={{ width: 160, flexShrink: 0, fontSize: 11, color: COLORS.textSecondary, fontWeight: 600 }}>
        Markets
      </div>
      <div style={{ width: 120, flexShrink: 0, textAlign: "right", fontSize: 11, color: COLORS.textSecondary, fontWeight: 600 }}>
        Active
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════
   PAYWALL BANNER (free users)
   ═══════════════════════════════════════ */
function PaywallBanner(): React.JSX.Element {
  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 90,
        animation: "float-paywall 3s ease-in-out infinite",
      }}
    >
      {/* Gradient fade on top of list */}
      <div
        style={{
          height: 120,
          background: "linear-gradient(to bottom, transparent, #060b18)",
          pointerEvents: "none",
        }}
      />
      <div
        className="glass"
        style={{
          background: "rgba(8,14,30,0.92)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          borderTop: "1px solid rgba(0,229,204,0.12)",
          padding: "28px 24px",
          animation: "pulse-glow 3s ease-in-out infinite",
        }}
      >
        <div
          style={{
            maxWidth: 800,
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 24,
            flexWrap: "wrap",
          }}
        >
          <div style={{ flex: 1, minWidth: 280 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
              <Lock size={16} color={COLORS.accentAlt} />
              <span
                className="font-display"
                style={{
                  fontSize: 18,
                  fontWeight: 800,
                  color: "#fff",
                }}
              >
                Wallet Addresses Are Locked
              </span>
            </div>
            <p style={{ fontSize: 14, color: COLORS.textSecondary, lineHeight: 1.6 }}>
              Unlock the exact wallet addresses of Polymarket&apos;s top 1%.
              Copy their positions before the market moves.
            </p>
          </div>

          <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
            <a
              href="/pricing"
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
                textDecoration: "none",
                transition: "transform 0.2s, box-shadow 0.2s",
              }}
              onMouseEnter={(e) => {
                const t = e.currentTarget as HTMLAnchorElement;
                t.style.transform = "translateY(-2px)";
                t.style.boxShadow = "0 8px 32px rgba(0,229,204,0.4)";
              }}
              onMouseLeave={(e) => {
                const t = e.currentTarget as HTMLAnchorElement;
                t.style.transform = "translateY(0)";
                t.style.boxShadow = "none";
              }}
            >
              <Crown size={16} /> View Pricing <ArrowRight size={14} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════
   MAIN PAGE
   ═══════════════════════════════════════ */
export default function WhaleLeaderboard(): React.JSX.Element {
  const [isSubscribed, setIsSubscribed] = useState<boolean>(false);
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const [sortBy, setSortBy] = useState<string>("pnl");

  /* Sort logic */
  const sortedWhales = [...WHALES].sort((a, b) => {
    switch (sortBy) {
      case "winRate":
        return b.winRate - a.winRate;
      case "volume":
        return b.totalVolume - a.totalVolume;
      case "recent":
        return 0;
      case "pnl":
      default:
        return b.thirtyDayPnL - a.thirtyDayPnL;
    }
  });

  /* Filter logic */
  const filteredWhales =
    activeFilter === "All"
      ? sortedWhales
      : sortedWhales.filter((w) =>
          w.topMarkets.some((m) =>
            m.toLowerCase().includes(activeFilter.toLowerCase())
          )
        );

  return (
    <div style={{ background: COLORS.bg, minHeight: "100vh" }}>
      <GlobalStyles />

      {/* Background effects */}
      <div className="grid-bg" style={{ position: "fixed", inset: 0, opacity: 0.4, pointerEvents: "none" }} />
      <div
        style={{
          position: "fixed",
          top: "5%",
          right: "10%",
          width: 500,
          height: 500,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(124,92,252,0.06), transparent 70%)",
          filter: "blur(60px)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "fixed",
          bottom: "10%",
          left: "5%",
          width: 600,
          height: 600,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(0,229,204,0.04), transparent 70%)",
          filter: "blur(80px)",
          pointerEvents: "none",
        }}
      />

      <Header isSubscribed={isSubscribed} setIsSubscribed={setIsSubscribed} />

      {/* Page content */}
      <main
        style={{
          position: "relative",
          maxWidth: 1200,
          margin: "0 auto",
          padding: "40px 24px",
          paddingBottom: isSubscribed ? 40 : 200,
        }}
      >
        {/* Page title */}
        <div style={{ marginBottom: 36 }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "6px 14px",
              borderRadius: 100,
              background: "rgba(124,92,252,0.08)",
              border: "1px solid rgba(124,92,252,0.15)",
              marginBottom: 16,
              fontSize: 12,
              color: COLORS.accentAlt,
              fontWeight: 500,
            }}
          >
            <Trophy size={12} /> Updated in real-time
          </div>
          <h1
            className="font-display"
            style={{
              fontSize: "clamp(28px, 4vw, 42px)",
              fontWeight: 800,
              color: "#fff",
              letterSpacing: "-0.03em",
              marginBottom: 10,
            }}
          >
            Whale{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #00e5cc, #7c5cfc)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Leaderboard
            </span>
          </h1>
          <p
            style={{
              fontSize: 16,
              color: COLORS.textSecondary,
              maxWidth: 560,
              lineHeight: 1.6,
            }}
          >
            The most profitable Polymarket wallets, ranked by performance. See who&apos;s
            winning &mdash; and mirror their next move.
          </p>
        </div>

        {/* Stats grid */}
        <StatsOverview />

        {/* Filter bar */}
        <FilterBar
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
          sortBy={sortBy}
          setSortBy={setSortBy}
        />

        {/* Leaderboard */}
        <div
          className="glow-box"
          style={{
            borderRadius: 18,
            background: COLORS.bgCard,
            border: `1px solid ${COLORS.border}`,
            overflow: "hidden",
          }}
        >
          <TableHeader />

          <div style={{ display: "flex", flexDirection: "column", gap: 2, padding: "4px 0" }}>
            {filteredWhales.length > 0 ? (
              filteredWhales.map((whale, i) => (
                <WhaleRow
                  key={whale.id}
                  whale={whale}
                  rank={i + 1}
                  isSubscribed={isSubscribed}
                  index={i}
                />
              ))
            ) : (
              <div
                style={{
                  padding: "60px 24px",
                  textAlign: "center",
                  color: COLORS.textSecondary,
                }}
              >
                <Target
                  size={32}
                  style={{ marginBottom: 12, opacity: 0.3 }}
                />
                <div style={{ fontSize: 15, fontWeight: 500 }}>
                  No whales found for &ldquo;{activeFilter}&rdquo;
                </div>
                <div style={{ fontSize: 13, marginTop: 4, opacity: 0.7 }}>
                  Try a different market filter
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Pro badge note for subscribed users */}
        {isSubscribed && (
          <div
            style={{
              marginTop: 24,
              padding: "16px 24px",
              borderRadius: 12,
              background: "rgba(0,229,204,0.04)",
              border: "1px solid rgba(0,229,204,0.1)",
              display: "flex",
              alignItems: "center",
              gap: 12,
              animation: "fade-in-up 0.4s ease both",
            }}
          >
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: 8,
                background: "rgba(0,229,204,0.1)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: COLORS.accent,
                flexShrink: 0,
              }}
            >
              <Zap size={16} />
            </div>
            <div>
              <span style={{ fontSize: 13, color: COLORS.accent, fontWeight: 600 }}>
                PRO Active
              </span>
              <span style={{ fontSize: 13, color: COLORS.textSecondary, marginLeft: 8 }}>
                Click &quot;Auto-Follow&quot; on any whale to begin mirroring their Polymarket
                positions in real time.
              </span>
            </div>
          </div>
        )}
      </main>

      {/* Paywall banner — only for free users */}
      {!isSubscribed && <PaywallBanner />}
    </div>
  );
}
