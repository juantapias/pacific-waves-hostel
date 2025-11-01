import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Sufer from "../../assets/images/surfer.webp";
import style from "./ContentBlock.module.css";

export default function ContentBlock() {
  gsap.registerPlugin(ScrollTrigger);

  const contentBlockRef = useRef<HTMLDivElement>(null);
  const contentBlockTitleRef = useRef<HTMLHeadingElement>(null);
  const contentBlockContentRef = useRef<HTMLDivElement>(null);
  const contentBlockImageRef = useRef<HTMLImageElement>(null);
  const suferRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: contentBlockRef.current,
        start: "-50% center",
        end: "200% bottom",
        scrub: 1,
        markers: false,
      },
    });

    const letters = contentBlockTitleRef.current?.querySelectorAll("span");
    if (letters?.length) {
      tl.from(letters, {
        opacity: 0,
        y: -50,
        duration: 0.75,
        stagger: 0.25,
        ease: "power2.out",
      });
    }

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

    tl.fromTo(
      suferRef.current,
      {
        right: "-40%",
        bottom: "-13%",
        rotate: -15,
        autoAlpha: 0,
      },
      {
        right: "20%",
        rotate: 10,
        autoAlpha: 1,
        duration: 5,
        ease: "power3.out",
      },
      "+=1",
    )
      .to(suferRef.current, {
        right: "45%",
        rotate: 30,
        duration: 4,
        ease: "sine.inOut",
      })
      .to(suferRef.current, {
        right: "100%",
        rotate: 0,
        bottom: "-13%",
        autoAlpha: 0,
        duration: 7,
        ease: "power2.inOut",
      });
  }, []);

  return (
    <section
      id="us"
      ref={contentBlockRef}
      className={style.contentBlock}
      aria-label="Sección sobre el hostal"
    >
      <div className="content-primary">
        <div className="container">
          <article className={style.coverPage}>
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

              <div
                ref={contentBlockContentRef}
                className={style.content}
                aria-label="Descripción del hostal"
              >
                <p>
                  <strong>Pacific Waves Hostel & Surf</strong> es un refugio
                  paradisíaco ubicado en la impresionante Playa El Almejal, en
                  el corregimiento El Valle, municipio de Bahía Solano. Con una
                  ubicación privilegiada frente al mar y rodeado por la selva
                  del Chocó, nuestro hostal ofrece una experiencia única que
                  combina naturaleza, confort y aventura.
                </p>

                <p>
                  Contamos con opciones de alojamiento privado y compartido,
                  diseñadas para brindar descanso y comodidad en un entorno
                  natural incomparable. Nuestro bar de playa es el lugar para
                  relajarse, compartir con otros viajeros y disfrutar de
                  atardeceres inolvidables con una bebida refrescante.
                </p>

                <p>
                  En Pacific Waves Hostel & Surf, garantizamos altos estándares
                  de calidad en alojamiento, creando un ambiente acogedor donde
                  la conexión con la naturaleza y el espíritu del surf se
                  fusionan para ofrecer una estancia inigualable.
                </p>

                <p>
                  <strong>
                    ¡Ven y vive la magia del Pacífico con nosotros! 🌊
                  </strong>
                </p>
              </div>
            </div>
          </article>
        </div>
      </div>

      <figure ref={suferRef} className={style.surfer}>
        <img
          ref={contentBlockImageRef}
          src={Sufer.src}
          alt="Ilustración de surfista en la playa"
        />
        <figcaption className="sr-only">
          Surfer animado representando la experiencia en el mar
        </figcaption>
      </figure>
    </section>
  );
}
