
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import styles from "../banner.module.css";

export default function MainBanner() {
  const containerBanner = useRef<HTMLDivElement>(null);
  const contentBanner = useRef<HTMLDivElement>(null);

  gsap.registerPlugin(ScrollTrigger);

  useEffect(() => {
    const elements = gsap.utils.toArray(contentBanner.current?.children ?? []);

    gsap.from(elements, {
      opacity: 0,
      x: -100,
      duration: 0.8,
      stagger: 0.15,
      ease: "power2.out",
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

    tl.to(elements, {
      y: -50,
      opacity: 0.7,
      stagger: 0.1,
      duration: 0.3,
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      tl.kill();
    };
  }, []);

  return (
    <div ref={containerBanner} className={styles.mainBanner}>
      <div className="container">
        <div ref={contentBanner} className={styles.bannerContent}>
          <h1>
            Surfea las olas, <br /> contempla las ballenas
          </h1>
          <p>
            Despierta frente al mar, siente la libertad de las olas y vive el
            espectáculo natural del Pacífico.
          </p>
          <button className="btn-primary">Reserva</button>
        </div>
      </div>
    </div>
  );
}
