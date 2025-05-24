import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import styles from "../banner.module.css";
import Loading from "../../ui/loading";

export default function MainBanner() {
  const containerBanner = useRef<HTMLDivElement>(null);
  const contentBanner = useRef<HTMLDivElement>(null);
  const socialItemsRef = useRef<HTMLUListElement>(null);
  const scrollDownRef = useRef<HTMLDivElement>(null);
  const arrowRef = useRef<HTMLSpanElement>(null);
  const [isLoading, setIsLoading] = useState(true);

  gsap.registerPlugin(ScrollTrigger);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const elements = gsap.utils.toArray(contentBanner.current?.children ?? []);
    const socialElements = gsap.utils.toArray(
      socialItemsRef.current?.children ?? [],
    );

    gsap.from(elements, {
      delay: 5,
      opacity: 0,
      x: -100,
      duration: 1,
      stagger: 0.15,
      ease: "power2.out",
    });

    gsap.from(socialElements, {
      delay: 5.5,
      opacity: 0,
      stagger: 0.15,
      x: 100,
    });

    gsap.from(scrollDownRef.current, { delay: 6, opacity: 0 });
    gsap.to(arrowRef.current, {
      y: 20,
      repeat: -1,
      yoyo: true,
      duration: 1,
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerBanner.current,
        start: "75% center",
        end: "bottom 25%",
        scrub: 0.5,
        markers: false,
        toggleActions: "play none none reverse",
      },
    });

    tl.to(elements, { y: -50, opacity: 0.7, stagger: 0.1, duration: 0.3 });
    tl.to(scrollDownRef.current, { opacity: 0 });
    tl.to(socialItemsRef.current, {
      opacity: 0,
      y: -20,
      stagger: 0.5,
      duration: 0.3,
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      tl.kill();
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section
      id="home"
      ref={containerBanner}
      className={styles.mainBanner}
      aria-label="Sección principal del banner"
    >
      <Loading isLoading={isLoading} />

      <video
        src="/assets/images/videos/11.5mb_nasibe.mp4"
        autoPlay
        loop
        muted
        playsInline
        aria-hidden="true"
        className={styles.backgroundVideo}
        title="Video de olas del mar"
      >
        Tu navegador no admite videos HTML5.
      </video>

      <div className="container">
        <div ref={contentBanner} className={styles.bannerContent}>
          <h1>
            Surfea las olas, <br /> contempla las ballenas
          </h1>
          <p>
            Despierta frente al mar, siente la libertad de las olas y vive el
            espectáculo natural del Pacífico.
          </p>
          <button
            type="button"
            className="btn-primary"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("booking");
            }}
            aria-label="Ir a la sección de reservas"
          >
            Reserva
          </button>
        </div>
      </div>

      <nav className={styles.social} aria-label="Redes sociales">
        <ul ref={socialItemsRef}>
          <li>
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <i className="icon icon-instagram" aria-hidden="true" />
            </a>
          </li>
          <li>
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
            >
              <i className="icon icon-facebook" aria-hidden="true" />
            </a>
          </li>
          <li>
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
            >
              <i className="icon icon-youtube" aria-hidden="true" />
            </a>
          </li>
        </ul>
      </nav>

      <div ref={scrollDownRef} className={styles.scrollDown} aria-hidden="true">
        <span ref={arrowRef} className={styles.arrow}>
          &darr;
        </span>
      </div>
    </section>
  );
}
