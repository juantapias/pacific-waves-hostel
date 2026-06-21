import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import NewsletterForm from "../ui/forms/newsletter/NewsletterForm";
import WhaleTale from "../../assets/images/whale-tail.webp";

import styles from "./Newsletter.module.css";

gsap.registerPlugin(ScrollTrigger);

export default function Newsletter() {
  const containerRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const assetRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "-100% center",
        end: "-5% center",
        scrub: 1,
        markers: false,
      },
    });

    tl.from([titleRef.current, formRef.current], {
      opacity: 0,
      y: 100,
      stagger: 0.5,
    });

    tl.from(assetRef.current, { opacity: 0 });
  }, []);

  return (
    <section
      ref={containerRef}
      className={styles.newsletter}
      aria-labelledby="newsletter-heading"
    >
      <div className="container mx-auto px-4">
        <h2 id="newsletter-heading" ref={titleRef} className={styles.title}>
          Únete a nuestro boletín para recibir novedades y ofertas exclusivas.
        </h2>

        <div ref={formRef} className={styles.form}>
          <NewsletterForm placeholder="Ingresa tu correo..." />
        </div>

      </div>

      <figure ref={assetRef} className={styles.whaletale}>
        <img
          src={WhaleTale.src}
          alt="Ilustración de una cola de ballena emergiendo del mar"
          loading="lazy"
        />
      </figure>
    </section>
  );
}
