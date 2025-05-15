import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import CoverPage from "../../assets/images/pacific-waves.jpg";

import style from "./contentblock.module.css";

export default function ContentBlock() {
  gsap.registerPlugin(ScrollTrigger);

  const contentBlockRef = useRef<HTMLDivElement>(null);
  const contentBlockTitleRef = useRef<HTMLHeadingElement>(null);
  const contentBlockContentRef = useRef<HTMLDivElement>(null);
  const contentBlockImageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: contentBlockRef.current,
        start: "-50% center",
        end: "bottom bottom",
        scrub: 1,
        markers: false,
      },
    });

    const letters =
      contentBlockTitleRef &&
      contentBlockTitleRef.current &&
      contentBlockTitleRef.current.querySelectorAll("span");
    tl.from(letters, {
      opacity: 0,
      y: -50,
      duration: 0.75,
      stagger: 0.25,
      ease: "power2.out",
    });

    tl.from(contentBlockImageRef.current, { duration: 1, opacity: 0 }, "a");
    if (contentBlockContentRef.current?.children) {
      tl.from(Array.from(contentBlockContentRef.current.children), {
        opacity: 0,
        y: 50,
        duration: 0.75,
        stagger: 0.25,
        ease: "power2.out",
      });
    }
  }, []);

  return (
    <div ref={contentBlockRef} className={style.contentBlock}>
      <div className="content-primary">
        <div className="container">
          <div className={style.coverPage}>
            <div className={style.contentParagraph}>
              <h2 ref={contentBlockTitleRef} className={style.contentTitle}>
                {"Tu refugio costero".split("").map((letter, index) => {
                  const isSpace = letter === " ";
                  return (
                    <span
                      key={index}
                      style={{
                        display: "inline-block",
                        whiteSpace: isSpace ? "pre" : "normal",
                      }}
                    >
                      {isSpace ? "\u00A0" : letter}
                    </span>
                  );
                })}
              </h2>
              <div ref={contentBlockContentRef} className={style.content}>
                <p>
                  Descubre Pacific Waves Hostel & Surf, un rincón acogedor a
                  orillas del majestuoso océano Pacífico, donde cada amanecer
                  trae consigo la promesa de nuevas aventuras. Situado en la
                  impresionante Playa El Almejal, nuestro hostal combina la
                  serenidad de la naturaleza con la energía del surf y el
                  espíritu libre del viajero moderno.
                </p>
                <p>
                  Sumérgete en una experiencia única que va más allá del
                  alojamiento. Aquí no solo dormirás con el sonido de las olas:
                  podrás vivir cada día intensamente entre clases de surf para
                  todos los niveles, excursiones a cascadas escondidas,
                  caminatas por senderos tropicales y, por supuesto, el
                  asombroso espectáculo del avistamiento de ballenas —todo desde
                  la comodidad de nuestro entorno frente al mar.
                </p>
              </div>
            </div>
            <div className={style.coverWrapperImage}>
              <img
                ref={contentBlockImageRef}
                src={CoverPage.src}
                alt="Pacific Waves Hostel & Surf"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
