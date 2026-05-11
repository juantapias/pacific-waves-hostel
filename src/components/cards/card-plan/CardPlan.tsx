import React, { useRef, useState } from "react";

// ── Types ────────────────────────────────────────────────────────────────────
export interface PlanData {
  slug: string;
  href: string;
  label: string;
  season: string;
  title: string;
  tagline: string;
  description: string;
  from: number;
  nights: string;
  color: string;
  accent: string;
  activities: string[];
  image: string; // path to the plan's cover image
}

interface CardPlanProps {
  plan: PlanData;
}

// ── Helper ───────────────────────────────────────────────────────────────────
function formatCOP(value: number): string {
  return `$${value.toLocaleString("es-CO")}`;
}

// ── Component ─────────────────────────────────────────────────────────────────
export default function CardPlan({ plan }: CardPlanProps) {
  const [hovered, setHovered] = useState(false);
  const cardRef = useRef<HTMLAnchorElement>(null);

  return (
    <a
      ref={cardRef}
      href={plan.href}
      className="card-plan"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-label={`Ver plan ${plan.title}`}
      style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        borderRadius: "16px",
        overflow: "hidden",
        minHeight: "520px",
        textDecoration: "none",
        cursor: "pointer",
        // Subtle lift on hover
        transform: hovered ? "translateY(-6px)" : "translateY(0)",
        boxShadow: hovered
          ? `0 32px 64px rgba(0,0,0,0.45), 0 0 0 1px ${plan.accent}44`
          : "0 8px 32px rgba(0,0,0,0.25)",
        transition:
          "transform 0.5s cubic-bezier(0.25,0.46,0.45,0.94), box-shadow 0.5s cubic-bezier(0.25,0.46,0.45,0.94)",
      }}
    >
      {/* ── Background image ─────────────────────────────────────────── */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url(${plan.image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          transform: hovered ? "scale(1.06)" : "scale(1)",
          transition: "transform 0.8s cubic-bezier(0.25,0.46,0.45,0.94)",
        }}
      />

      {/* ── Gradient overlay: always-on base ─────────────────────────── */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background: `linear-gradient(
            to bottom,
            transparent 0%,
            ${plan.color}55 40%,
            ${plan.color}ee 100%
          )`,
          transition: "opacity 0.5s ease",
        }}
      />

      {/* ── Hover overlay: richer tint ────────────────────────────────── */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background: `linear-gradient(
            160deg,
            ${plan.color}00 0%,
            ${plan.color}bb 60%,
            ${plan.color}ff 100%
          )`,
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.5s ease",
        }}
      />

      {/* ── Accent glow bar at bottom ─────────────────────────────────── */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 3,
          background: plan.accent,
          boxShadow: `0 0 16px ${plan.accent}99`,
          opacity: hovered ? 1 : 0.5,
          transition: "opacity 0.4s ease",
        }}
      />

      {/* ── Top badge ────────────────────────────────────────────────── */}
      <div
        style={{
          position: "absolute",
          top: "1.25rem",
          left: "1.25rem",
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
        }}
      >
        <span
          style={{
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            background: `${plan.accent}1a`,
            border: `1px solid ${plan.accent}55`,
            borderRadius: 100,
            padding: "4px 12px",
            backdropFilter: "blur(8px)",
          }}
          className="text-white"
        >
          {plan.label}
        </span>
        <span
          style={{
            fontSize: 11,
            color: "rgba(255,255,255,0.55)",
            fontWeight: 500,
          }}
        >
          {plan.season}
        </span>
      </div>

      {/* ── Content ──────────────────────────────────────────────────── */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          padding: "1.75rem",
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        {/* Title block */}
        <div>
          <h3
            style={{
              fontSize: "clamp(2.25rem, 5vw, 3rem)",
              fontWeight: 900,
              lineHeight: 0.95,
              letterSpacing: "-0.03em",
              color: "#fff",
              margin: "0 0 0.4rem",
              textShadow: "0 2px 24px rgba(0,0,0,0.4)",
            }}
          >
            {plan.title}
          </h3>
          <p
            style={{
              fontSize: 13,
              fontWeight: 500,
              color: "rgba(255,255,255,0.65)",
              margin: 0,
              letterSpacing: "0.02em",
            }}
          >
            {plan.tagline}
          </p>
        </div>

        {/* Activities — slide up on hover */}
        <ul
          style={{
            listStyle: "none",
            margin: 0,
            padding: 0,
            display: "flex",
            flexDirection: "column",
            gap: "0.35rem",
            maxHeight: hovered ? "200px" : "0px",
            overflow: "hidden",
            opacity: hovered ? 1 : 0,
            transition:
              "max-height 0.5s cubic-bezier(0.25,0.46,0.45,0.94), opacity 0.4s ease",
          }}
          aria-label={`Actividades del plan ${plan.title}`}
        >
          {plan.activities.map((act) => (
            <li
              key={act}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                fontSize: 13,
                color: "rgba(255,255,255,0.82)",
                fontWeight: 500,
              }}
            >
              <span
                style={{
                  width: 5,
                  height: 5,
                  borderRadius: "50%",
                  background: plan.accent,
                  flexShrink: 0,
                  boxShadow: `0 0 6px ${plan.accent}`,
                }}
                aria-hidden="true"
              />
              {act}
            </li>
          ))}
        </ul>

        {/* Divider */}
        <div
          aria-hidden="true"
          style={{
            height: 1,
            background: `rgba(255,255,255,0.12)`,
          }}
        />

        {/* Price + CTA row */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            gap: "1rem",
          }}
        >
          {/* Price */}
          <div>
            <p
              style={{
                fontSize: 10,
                fontWeight: 600,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.45)",
                margin: "0 0 0.2rem",
              }}
            >
              Desde
            </p>
            <p
              style={{
                fontSize: "1.6rem",
                fontWeight: 900,
                letterSpacing: "-0.03em",
                color: "#fff",
                margin: 0,
                lineHeight: 1,
              }}
            >
              {formatCOP(plan.from)}
              <span
                style={{
                  fontSize: 12,
                  fontWeight: 500,
                  color: "rgba(255,255,255,0.45)",
                  marginLeft: 4,
                  letterSpacing: 0,
                }}
              >
                COP
              </span>
            </p>
            <p
              style={{
                fontSize: 11,
                color: "rgba(255,255,255,0.35)",
                margin: "0.2rem 0 0",
                fontWeight: 400,
              }}
            >
              {plan.nights} · por persona
            </p>
          </div>

          {/* CTA button */}
          <span
            aria-hidden="true"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.4rem",
              padding: "0.6rem 1.25rem",
              borderRadius: 100,
              fontSize: 13,
              fontWeight: 700,
              background: hovered ? plan.accent : "rgba(255,255,255,0.12)",
              color: hovered ? plan.color : "#fff",
              border: `1.5px solid ${hovered ? plan.accent : "rgba(255,255,255,0.2)"}`,
              backdropFilter: "blur(8px)",
              boxShadow: hovered ? `0 4px 20px ${plan.accent}55` : "none",
              transition: "all 0.35s ease",
              whiteSpace: "nowrap",
            }}
          >
            Ver plan
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              style={{
                transform: hovered ? "translateX(3px)" : "translateX(0)",
                transition: "transform 0.3s ease",
              }}
            >
              <path
                d="M2 7h10M8 3l4 4-4 4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </div>
      </div>
    </a>
  );
}
