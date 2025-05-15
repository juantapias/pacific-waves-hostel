import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import styles from "../banner.module.css";
import Loading from "../../ui/loading";

export default function MainBanner() {
  const containerBanner = useRef<HTMLDivElement>(null);
  const contentBanner = useRef<HTMLDivElement>(null);

  const scrollDownRef = useRef<HTMLDivElement>(null);
  const arrowRef = useRef<HTMLSpanElement>(null);

  const [isLoading, setIsLoading] = useState<boolean>(true);

  gsap.registerPlugin(ScrollTrigger);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const elements = gsap.utils.toArray(contentBanner.current?.children ?? []);

    gsap.from(elements, {
      delay: 5,
      opacity: 0,
      x: -100,
      duration: 1,
      stagger: 0.15,
      ease: "power2.out",
    });

    gsap.to(arrowRef.current, { y: 20, repeat: -1, yoyo: true, duration: 1 });

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

    tl.to(scrollDownRef.current, { opacity: 0 });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      tl.kill();
    };
  }, []);

  return (
    <div ref={containerBanner} className={styles.mainBanner}>
      <Loading isLoading={isLoading} />

      <video
        src="https://res.cloudinary.com/dcuocptj7/video/upload/v1746987622/11.5mb_nasibe.mp4"
        autoPlay
        loop
        muted
        playsInline
      />
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

      <div ref={scrollDownRef} className={styles.scrollDown}>
        <span ref={arrowRef} className={styles.arrow}>
          &darr;
        </span>
      </div>
    </div>
  );
}
