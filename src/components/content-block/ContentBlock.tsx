import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Sufer from "../../assets/images/surfer.webp";
import style from "./ContentBlock.module.css";

gsap.registerPlugin(ScrollTrigger);

const STATS = [
  { value: "100%", label: "Frente al mar" },
  { value: "3–5", label: "Noches todo incluido" },
  { value: "365", label: "Días de aventura" },
];

export default function ContentBlock() {
  const sectionRef = useRef<HTMLElement>(null);
  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const surferRef = useRef<HTMLDivElement>(null);
  const decorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ── Section reveal ──────────────────────────────────────────────────
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "-50% center",
          end: "center center",
          scrub: true,
        },
      });

      tl.from(decorRef.current, {
        scaleX: 0,
        duration: 1,
        ease: "power4.out",
        transformOrigin: "left center",
      })
        .from(
          eyebrowRef.current,
          { opacity: 0, y: 16, duration: 0.6, ease: "power3.out" },
          "-=0.4",
        )
        .from(
          titleRef.current,
          { opacity: 0, y: 40, duration: 0.9, ease: "power3.out" },
          "-=0.4",
        )
        .from(
          dividerRef.current,
          {
            scaleX: 0,
            duration: 0.8,
            ease: "power3.out",
            transformOrigin: "left center",
          },
          "-=0.5",
        )
        .from(
          bodyRef.current ? Array.from(bodyRef.current.children) : [],
          {
            opacity: 0,
            y: 24,
            duration: 0.6,
            stagger: 0.15,
            ease: "power3.out",
          },
          "-=0.4",
        )
        .from(
          statsRef.current ? Array.from(statsRef.current.children) : [],
          {
            opacity: 0,
            y: 20,
            duration: 0.5,
            stagger: 0.1,
            ease: "power3.out",
          },
          "-=0.3",
        );

      // ── Surfer: solo en desktop (≥768px) ───────────────────────────────
      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        const surferTl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
            end: "bottom top",
            scrub: 2,
          },
        });

        surferTl
          .fromTo(
            surferRef.current,
            { xPercent: 120, rotate: -12, autoAlpha: 0 },
            {
              xPercent: 0,
              rotate: 6,
              autoAlpha: 1,
              duration: 6,
              ease: "power2.out",
            },
          )
          .to(surferRef.current, {
            xPercent: -30,
            rotate: 18,
            duration: 5,
            ease: "sine.inOut",
          })
          .to(surferRef.current, {
            xPercent: -140,
            rotate: 2,
            autoAlpha: 0,
            duration: 6,
            ease: "power2.inOut",
          });
      });

      // En mobile el surfer no se muestra
      mm.add("(max-width: 767px)", () => {
        gsap.set(surferRef.current, { autoAlpha: 0 });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="us"
      ref={sectionRef}
      className={style.contentBlock}
      aria-label="Sobre Pacific Waves Hostel"
      style={{ position: "relative", overflow: "hidden" }}
    >
      {/* Decorative top accent line */}
      <div
        ref={decorRef}
        aria-hidden="true"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "40%",
          height: 2,
          background: "var(--color-primary, #1a5c3a)",
          transformOrigin: "left center",
        }}
      />

      <div
        className="container mx-auto px-5 md:px-8"
        style={{ position: "relative", zIndex: 1 }}
      >
        <article className="py-16 md:py-20">
          {/* ── Text column ─────────────────────────────────────────────── */}
          <div className="w-full md:max-w-xl lg:max-w-2xl">
            {/* Eyebrow */}
            <p
              ref={eyebrowRef}
              className="text-white mb-5"
              style={{
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
              }}
            >
              El Valle · Bahía Solano · Chocó
            </p>

            {/* Title */}
            <h2
              ref={titleRef}
              className="text-white mb-8"
              style={{
                fontSize: "clamp(2.75rem, 8vw, 4.5rem)",
                fontWeight: 800,
                lineHeight: 1.02,
                letterSpacing: "-0.03em",
              }}
            >
              Tu refugio
              <br />
              <span
                className="text-white"
                style={{
                  fontWeight: 800,
                  WebkitTextStroke: "2px currentColor",
                  opacity: 0.35,
                  color: "transparent",
                }}
              >
                costero
              </span>
            </h2>

            {/* Thin divider */}
            <div
              ref={dividerRef}
              aria-hidden="true"
              className="mb-8"
              style={{
                width: 48,
                height: 2,
                background: "var(--color-primary, #1a5c3a)",
                transformOrigin: "left center",
              }}
            />

            {/* Body copy */}
            <div
              ref={bodyRef}
              className="flex flex-col gap-5"
              aria-label="Descripción del hostal"
            >
              <p
                className="text-white m-0"
                style={{
                  fontSize: "clamp(0.9375rem, 2vw, 1.0625rem)",
                  lineHeight: 1.75,
                  opacity: 0.9,
                }}
              >
                <strong>Pacific Waves Hostel & Surf</strong> es un refugio
                paradisíaco ubicado en la impresionante Playa El Almejal, en el
                corregimiento El Valle, municipio de Bahía Solano. Con una
                ubicación privilegiada frente al mar y rodeado por la selva del
                Chocó, ofrecemos una experiencia única que combina naturaleza,
                confort y aventura.
              </p>

              <p
                className="text-white m-0"
                style={{
                  fontSize: "clamp(0.9375rem, 2vw, 1.0625rem)",
                  lineHeight: 1.75,
                  opacity: 0.7,
                }}
              >
                Alojamiento privado y compartido, bar de playa para atardeceres
                inolvidables, y planes todo incluido diseñados para conectar con
                el Pacífico colombiano desde el primer día.
              </p>
            </div>

            {/* Stats row */}
            <div
              ref={statsRef}
              className="grid grid-cols-3 mt-10 pt-8 border-t border-white/20"
            >
              {STATS.map((stat, i) => (
                <div
                  key={stat.label}
                  className={[
                    i > 0 ? "pl-4 md:pl-6" : "",
                    i < STATS.length - 1
                      ? "pr-4 md:pr-6 border-r border-white/20"
                      : "",
                  ].join(" ")}
                >
                  <p
                    className="text-white m-0 mb-1"
                    style={{
                      fontSize: "clamp(1.5rem, 5vw, 2.5rem)",
                      fontWeight: 800,
                      letterSpacing: "-0.04em",
                      lineHeight: 1,
                    }}
                  >
                    {stat.value}
                  </p>
                  <p
                    className="text-white m-0"
                    style={{
                      fontSize: "clamp(9px, 1.8vw, 12px)",
                      fontWeight: 500,
                      letterSpacing: "0.06em",
                      textTransform: "uppercase",
                      opacity: 0.5,
                      lineHeight: 1.4,
                    }}
                  >
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </article>
      </div>

      {/* ── Floating surfer — solo desktop ──────────────────────────────── */}
      <figure
        ref={surferRef}
        className={`${style.surfer} hidden md:block`}
        aria-hidden="true"
        style={{
          position: "absolute",
          bottom: "-5%",
          right: 0,
          margin: 0,
          maxWidth: "45%",
        }}
      >
        <img
          src={Sufer.src}
          alt=""
          style={{
            display: "block",
            maxHeight: "72vh",
            width: "auto",
            maxWidth: "100%",
          }}
        />
        <figcaption className="sr-only">
          Ilustración de surfista representando la experiencia en el mar
        </figcaption>
      </figure>
    </section>
  );
}
