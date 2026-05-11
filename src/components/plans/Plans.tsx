import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { PlansResume } from "../../db";
import CardPlan from "../cards/card-plan/CardPlan";

import imgBallenas from "../../assets/images/banner/plan-ballenas.webp";
import imgSurf from "../../assets/images/banner/plan-surf.webp";
import imgAventura from "../../assets/images/banner/plan-aventura.webp";

gsap.registerPlugin(ScrollTrigger);

const PLAN_IMAGES: Record<string, string> = {
  "plan-ballenas": imgBallenas.src,
  "plan-surf": imgSurf.src,
  "plan-aventura": imgAventura.src,
};

export default function Plans() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ── Header reveal ──────────────────────────────────────────────────
      gsap.from(headerRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          scrub: true,
        },
        opacity: 0,
        y: 32,
        duration: 0.8,
        ease: "power3.out",
      });

      // ── Cards stagger ──────────────────────────────────────────────────
      const cards = cardsRef.current
        ? Array.from(cardsRef.current.children)
        : [];

      gsap.from(cards, {
        scrollTrigger: {
          trigger: cardsRef.current,
          start: "top 80%",
          once: true,
        },
        opacity: 0,
        y: 60,
        duration: 0.75,
        stagger: 0.15,
        ease: "power3.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="plans"
      ref={sectionRef}
      style={{
        padding: "6rem 0",
      }}
      aria-labelledby="plans-heading"
    >
      <div className="container mx-auto" style={{ padding: "0 1.5rem" }}>
        {/* ── Header ──────────────────────────────────────────────────── */}
        <div
          ref={headerRef}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "0.75rem",
            marginBottom: "3.5rem",
          }}
        >
          <p
            style={{
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              margin: 0,
            }}
            className="text-primary"
          >
            Pacific Waves Hostel · El Valle, Bahía Solano
          </p>

          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "1rem",
            }}
          >
            <h2
              id="plans-heading"
              style={{
                fontSize: "clamp(2.5rem, 6vw, 4rem)",
                fontWeight: 900,
                letterSpacing: "-0.03em",
                lineHeight: 1,
                margin: 0,
              }}
              className="text-primary"
            >
              Nuestros{" "}
              <span
                style={{
                  fontWeight: 900,
                  WebkitTextStroke: "1.5px rgba(255,255,255,0.25)",
                  opacity: 0.35,
                }}
                className="text-primary"
              >
                planes
              </span>
            </h2>

            <p
              style={{
                fontSize: 14,

                maxWidth: 280,
                lineHeight: 1.65,
                margin: 0,
                textAlign: "right",
              }}
              className="text-primary"
            >
              Todo incluido, desde el aeropuerto hasta la última ola.
            </p>
          </div>
        </div>

        {/* ── Cards grid ──────────────────────────────────────────────── */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-3"
          style={{ gap: "1.25rem" }}
        >
          {PlansResume.map((plan) => (
            <CardPlan
              key={plan.slug}
              plan={{
                ...plan,
                image: PLAN_IMAGES[plan.slug] ?? "",
              }}
            />
          ))}
        </div>

        {/* ── Footer note ─────────────────────────────────────────────── */}
        <p
          style={{
            textAlign: "center",
            fontSize: 12,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            marginTop: "2.5rem",
          }}
          className="text-primary"
        >
          Precios por persona · Incluye alojamiento, alimentación y traslados
          aeropuerto BSC
        </p>
      </div>
    </section>
  );
}
