import { useLayoutEffect, useRef } from "react";
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

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // ── DESKTOP (≥768px): stagger lateral en cards ─────────────────────
      mm.add("(min-width: 768px)", () => {
        // Header: fade + slide desde arriba, una sola vez
        gsap.from(headerRef.current, {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            once: true,
          },
          opacity: 0,
          y: 32,
          duration: 0.8,
          ease: "power3.out",
        });

        // Cards: stagger con slide desde abajo, las 3 a la vez
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
      });

      // ── MOBILE (<768px): cada card entra al hacer scroll individual ────
      mm.add("(max-width: 767px)", () => {
        // Header con desplazamiento reducido (menos espacio en pantalla chica)
        gsap.from(headerRef.current, {
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 88%",
            once: true,
          },
          opacity: 0,
          y: 20,
          duration: 0.6,
          ease: "power3.out",
        });

        // Cada card tiene su propio trigger independiente:
        // en mobile las cards se apilan, por lo que solo la primera
        // estaría en viewport si usamos un trigger compartido.
        const cards = cardsRef.current
          ? Array.from(cardsRef.current.children)
          : [];

        cards.forEach((card) => {
          gsap.from(card, {
            scrollTrigger: {
              trigger: card,
              start: "top 90%",
              once: true,
            },
            opacity: 0,
            y: 40,
            duration: 0.6,
            ease: "power3.out",
          });
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="plans"
      ref={sectionRef}
      className="py-16 md:py-20"
      aria-labelledby="plans-heading"
    >
      <div className="container mx-auto px-5 md:px-6">
        {/* ── Header ──────────────────────────────────────────────────── */}
        <div ref={headerRef} className="flex flex-col gap-3 mb-10 md:mb-14">
          <p
            className="text-primary m-0"
            style={{
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
            }}
          >
            Pacific Waves Hostel · El Valle, Bahía Solano
          </p>

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3">
            <h2
              id="plans-heading"
              className="text-primary m-0"
              style={{
                fontSize: "clamp(2.25rem, 7vw, 4rem)",
                fontWeight: 900,
                letterSpacing: "-0.03em",
                lineHeight: 1,
              }}
            >
              Nuestros{" "}
              <span
                className="text-primary"
                style={{
                  fontWeight: 900,
                  WebkitTextStroke: "1.5px currentColor",
                  color: "transparent",
                  opacity: 0.35,
                }}
              >
                planes
              </span>
            </h2>

            <p
              className="text-primary m-0"
              style={{
                fontSize: 14,
                maxWidth: 280,
                lineHeight: 1.65,
              }}
            >
              Todo incluido, desde el aeropuerto hasta la última ola.
            </p>
          </div>
        </div>

        {/* ── Cards grid ──────────────────────────────────────────────── */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-5">
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
          className="text-primary text-center mt-10 m-0"
          style={{
            fontSize: 12,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            opacity: 0.5,
          }}
        >
          Precios por persona · Incluye alojamiento, alimentación y traslados
          aeropuerto BSC
        </p>
      </div>
    </section>
  );
}
