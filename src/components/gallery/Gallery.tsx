import { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GalleryData } from "../../utils/data/GalleryData";

gsap.registerPlugin(ScrollTrigger);

interface GalleryItem {
  url: string;
  alt: string;
}

// ─── Lightbox ─────────────────────────────────────────────────────────────────
function Lightbox({
  items,
  index,
  onClose,
}: {
  items: GalleryItem[];
  index: number;
  onClose: () => void;
}) {
  const [current, setCurrent] = useState(index);
  const overlayRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  const prev = useCallback(() => {
    setCurrent((c) => (c - 1 + items.length) % items.length);
  }, [items.length]);

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % items.length);
  }, [items.length]);

  // Keyboard navigation
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose, prev, next]);

  // Fade in on open
  useEffect(() => {
    gsap.fromTo(
      overlayRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.25, ease: "power2.out" },
    );
  }, []);

  // Fade image on slide change
  useEffect(() => {
    gsap.fromTo(
      imgRef.current,
      { opacity: 0, scale: 0.97 },
      { opacity: 1, scale: 1, duration: 0.3, ease: "power2.out" },
    );
  }, [current]);

  const close = () => {
    gsap.to(overlayRef.current, {
      opacity: 0,
      duration: 0.2,
      onComplete: onClose,
    });
  };

  return (
    <div
      ref={overlayRef}
      onClick={close}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "rgba(0,0,0,0.92)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      aria-modal="true"
      role="dialog"
      aria-label="Imagen ampliada"
    >
      {/* Close */}
      <button
        onClick={close}
        aria-label="Cerrar"
        style={{
          position: "absolute",
          top: "1.5rem",
          right: "1.5rem",
          background: "rgba(255,255,255,0.08)",
          border: "1px solid rgba(255,255,255,0.15)",
          color: "#fff",
          borderRadius: "50%",
          width: 40,
          height: 40,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          fontSize: 18,
          lineHeight: 1,
          transition: "background 0.2s",
        }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.background = "rgba(255,255,255,0.16)")
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.background = "rgba(255,255,255,0.08)")
        }
      >
        ✕
      </button>

      {/* Prev */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          prev();
        }}
        aria-label="Anterior"
        style={{
          position: "absolute",
          left: "1.5rem",
          background: "rgba(255,255,255,0.08)",
          border: "1px solid rgba(255,255,255,0.15)",
          color: "#fff",
          borderRadius: "50%",
          width: 44,
          height: 44,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          fontSize: 20,
          transition: "background 0.2s",
        }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.background = "rgba(255,255,255,0.16)")
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.background = "rgba(255,255,255,0.08)")
        }
      >
        ‹
      </button>

      {/* Image */}
      <div
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: "88vw", maxHeight: "88vh" }}
      >
        <img
          ref={imgRef}
          src={items[current].url}
          alt={items[current].alt}
          style={{
            maxWidth: "88vw",
            maxHeight: "80vh",
            objectFit: "contain",
            borderRadius: 8,
            display: "block",
          }}
        />
        <p
          style={{
            color: "rgba(255,255,255,0.45)",
            fontSize: 13,
            textAlign: "center",
            marginTop: 12,
          }}
        >
          {items[current].alt} · {current + 1} / {items.length}
        </p>
      </div>

      {/* Next */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          next();
        }}
        aria-label="Siguiente"
        style={{
          position: "absolute",
          right: "1.5rem",
          background: "rgba(255,255,255,0.08)",
          border: "1px solid rgba(255,255,255,0.15)",
          color: "#fff",
          borderRadius: "50%",
          width: 44,
          height: 44,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          fontSize: 20,
          transition: "background 0.2s",
        }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.background = "rgba(255,255,255,0.16)")
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.background = "rgba(255,255,255,0.08)")
        }
      >
        ›
      </button>
    </div>
  );
}

// ─── Gallery ──────────────────────────────────────────────────────────────────
export default function Gallery() {
  const galleryRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const itemsRef = useRef<HTMLDivElement[]>([]);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const items: GalleryItem[] = GalleryData.map((item) => ({
    url: item.url,
    alt: item.alt,
  }));

  // ── Scroll animations ──────────────────────────────────────────────────────
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(titleRef.current, {
        scrollTrigger: {
          trigger: galleryRef.current,
          start: "top 80%",
        },
        opacity: 0,
        y: 36,
        duration: 0.8,
        ease: "power3.out",
      });

      itemsRef.current.forEach((el, i) => {
        if (!el) return;
        gsap.from(el, {
          scrollTrigger: {
            trigger: el,
            start: "top 90%",
          },
          opacity: 0,
          y: 48,
          duration: 0.7,
          delay: (i % 3) * 0.1,
          ease: "power3.out",
        });
      });
    });

    return () => ctx.revert();
  }, []);

  // Masonry-style grid: 3 col desktop, 2 tablet, 1 mobile
  // Assign height classes to create rhythm: tall / short alternation
  const heights = [
    "h-72",
    "h-48",
    "h-64",
    "h-52",
    "h-80",
    "h-48",
    "h-64",
    "h-52",
    "h-72",
    "h-48",
    "h-64",
    "h-52",
  ];

  return (
    <>
      <section
        ref={galleryRef}
        style={{ padding: "6rem 0" }}
        aria-labelledby="gallery-heading"
      >
        <div
          className="container"
          style={{
            margin: "0 auto",
            padding: "0 1.5rem",
          }}
        >
          {/* Header */}
          <div
            ref={titleRef}
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
              marginBottom: "3rem",
              gap: "1rem",
              flexWrap: "wrap",
            }}
          >
            <div>
              <p
                className="text-secondary"
                style={{
                  fontSize: 11,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  marginBottom: "0.75rem",
                  fontWeight: 500,
                }}
              >
                Pacific Waves Hostel
              </p>
              <h2
                id="gallery-heading"
                className="text-primary"
                style={{
                  fontSize: "clamp(2rem, 5vw, 3.5rem)",
                  fontWeight: 800,
                  lineHeight: 1,
                  letterSpacing: "-0.02em",
                  margin: 0,
                }}
              >
                Postales del
                <br />
                <span style={{ opacity: 0.35 }}>paraíso</span>
              </h2>
            </div>
            <p
              style={{
                fontSize: 14,
                maxWidth: 240,
                lineHeight: 1.6,
                textAlign: "right",
              }}
              className="text-primary"
            >
              El Valle, Bahía Solano — Chocó, Colombia
            </p>
          </div>

          {/* Grid */}
          <div
            style={{
              columns: "3 280px",
              columnGap: "12px",
              gap: "12px",
            }}
          >
            {items.map((item, i) => (
              <div
                key={i}
                ref={(el) => {
                  if (el) itemsRef.current[i] = el;
                }}
                onClick={() => setLightbox(i)}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
                style={{
                  position: "relative",
                  marginBottom: 12,
                  borderRadius: 8,
                  overflow: "hidden",
                  cursor: "pointer",
                  breakInside: "avoid",
                  display: "block",
                  // Staggered heights via padding trick
                  aspectRatio:
                    i % 3 === 1 ? "3/4" : i % 5 === 0 ? "1/1" : "4/3",
                }}
                aria-label={`Ver ${item.alt}`}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter") setLightbox(i);
                }}
              >
                <img
                  src={item.url}
                  alt={item.alt}
                  loading="lazy"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                    transform: hoveredIndex === i ? "scale(1.04)" : "scale(1)",
                    transition:
                      "transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                  }}
                />
                {/* Hover overlay */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "rgba(0,0,0,0.35)",
                    opacity: hoveredIndex === i ? 1 : 0,
                    transition: "opacity 0.35s ease",
                    display: "flex",
                    alignItems: "flex-end",
                    padding: "1rem",
                  }}
                >
                  <p
                    style={{
                      color: "rgba(255,255,255,0.85)",
                      fontSize: 12,
                      fontWeight: 500,
                      letterSpacing: "0.05em",
                      margin: 0,
                      transform:
                        hoveredIndex === i
                          ? "translateY(0)"
                          : "translateY(8px)",
                      transition: "transform 0.35s ease",
                    }}
                  >
                    {item.alt}
                  </p>
                </div>

                {/* Expand icon */}
                <div
                  style={{
                    position: "absolute",
                    top: 12,
                    right: 12,
                    width: 32,
                    height: 32,
                    borderRadius: "50%",
                    background: "rgba(255,255,255,0.12)",
                    backdropFilter: "blur(4px)",
                    border: "1px solid rgba(255,255,255,0.2)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    opacity: hoveredIndex === i ? 1 : 0,
                    transform: hoveredIndex === i ? "scale(1)" : "scale(0.8)",
                    transition: "opacity 0.3s ease, transform 0.3s ease",
                    fontSize: 14,
                    color: "#fff",
                  }}
                  aria-hidden="true"
                >
                  ⊕
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightbox !== null && (
        <Lightbox
          items={items}
          index={lightbox}
          onClose={() => setLightbox(null)}
        />
      )}
    </>
  );
}
