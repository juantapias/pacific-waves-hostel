import { useEffect, useRef } from "react";
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
      <div className="container">
        <h2 id="newsletter-heading" ref={titleRef} className={styles.title}>
          Únete a nuestro boletín para recibir novedades y ofertas exclusivas.
        </h2>

        <div ref={formRef} className={styles.form}>
          <NewsletterForm placeholder="Ingresa tu correo..." />
        </div>

        <div className={styles.socials}>
          <ul aria-label="Redes sociales">
            <li>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLinks}
                aria-label="Instagram"
              >
                <i className="icon icon-instagram" aria-hidden="true"></i>
              </a>
            </li>
            <li>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLinks}
                aria-label="Facebook"
              >
                <i className="icon icon-facebook" aria-hidden="true"></i>
              </a>
            </li>
            <li>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLinks}
                aria-label="YouTube"
              >
                <i className="icon icon-youtube" aria-hidden="true"></i>
              </a>
            </li>
            <li>
              <a
                href="https://tripadvisor.com"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLinks}
                aria-label="TripAdvisor"
              >
                <i className="icon icon-tripadvisor" aria-hidden="true"></i>
              </a>
            </li>
            <li>
              <a
                href="mailto:info@tusitio.com"
                className={styles.socialLinks}
                aria-label="Correo electrónico"
              >
                <i className="icon icon-mail" aria-hidden="true"></i>
              </a>
            </li>
          </ul>
        </div>

        <nav aria-label="Enlaces legales">
          <ul className={styles.navigation}>
            <li>
              <a href="/politica-de-privacidad">Política de privacidad</a>
            </li>
            <li>
              <a href="/terminos-y-condiciones">Términos y condiciones</a>
            </li>
          </ul>
        </nav>
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
