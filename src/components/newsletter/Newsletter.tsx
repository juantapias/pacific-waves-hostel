import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import NewsletterForm from "../ui/forms/newsletter/NewsletterForm";

import WhaleTale from "../../assets/images/whale-tail.webp";

import styles from "./Newsletter.module.css";

export default function Newsletter() {
  gsap.registerPlugin(ScrollTrigger);

  const containerRef = useRef<HTMLDivElement>(null);
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
    <div ref={containerRef} className={styles.newsletter}>
      <div className="container">
        <h2 ref={titleRef} className={styles.title}>
          Únete a nuestro boletín para recibir novedades y ofertas exclusivas.
        </h2>

        <div ref={formRef} className={styles.form}>
          <NewsletterForm placeholder="Ingresa tu correo..." />
        </div>

        <div className={styles.socials}>
          <ul>
            <li>
              <a
                href="http://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLinks}
              >
                <i className="icon icon-instagram"></i>
              </a>
            </li>
            <li>
              <a
                href="http://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLinks}
              >
                <i className="icon icon-facebook"></i>
              </a>
            </li>
            <li>
              <a
                href="http://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLinks}
              >
                <i className="icon icon-youtube"></i>
              </a>
            </li>
            <li>
              <a
                href="http://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLinks}
              >
                <i className="icon icon-tripadvisor"></i>
              </a>
            </li>
            <li>
              <a
                href="http://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLinks}
              >
                <i className="icon icon-mail"></i>
              </a>
            </li>
          </ul>
        </div>

        <nav>
          <ul className={styles.navigation}>
            <li>
              <a href="#">Política de privacidad</a>
            </li>
            <li>
              <a href="#">Términos y condiciones</a>
            </li>
          </ul>
        </nav>
      </div>

      <figure ref={assetRef} className={styles.whaletale}>
        <img src={WhaleTale.src} alt="Cola de ballena" />
      </figure>
    </div>
  );
}
