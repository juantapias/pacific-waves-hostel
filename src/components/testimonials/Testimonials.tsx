import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import TestimonialCard from "../cards/TestimonialCard";

import Whale from "../../assets/images/whale.webp";

import styles from "./Testimonials.module.css";

const testimonials = [
  {
    name: "DayTrip62064387533",
    rate: 5,
    comment:
      "Lugar hermoso, habitaciones modernas, aseadas... la atención y servicio 5 de 5.",
    source: "Tripadvisor",
    date: "2025-03-01", // Aproximado: hace 2 meses
  },
  {
    name: "Andrea Sanín",
    rate: 5,
    comment:
      "Es un sitio encantador, limpio, seguro, agradable... muy buenos precios.",
    source: "Google",
    date: "2025-04-17", // Aproximado: hace 2 semanas
  },
  {
    name: "Rhian Kessler",
    rate: 5,
    comment:
      "Staff amigable, buena ubicación frente a la playa, camas cómodas, alquiler de tablas de surf.",
    source: "Google",
    date: "2024-11-01", // Aproximado: hace 6 meses
  },
  {
    name: "Alden Kramer",
    rate: 5,
    comment:
      "Ubicación perfecta, ambiente acogedor, excelente atención por parte de Sebastian.",
    source: "Google",
    date: "2025-02-01", // Aproximado: hace 3 meses
  },
  {
    name: "zahira hincapie",
    rate: 5,
    comment:
      "Todo súper limpio, asesoran con planes, playa hermosa, Erika y Sebastián son excelentes anfitriones.",
    source: "Google",
    date: "2025-02-01", // Aproximado: hace 3 meses
  },
  {
    name: "ALBA MIRIAM VERGARA VARGAS",
    rate: 4,
    comment:
      "Lugar tranquilo, naturaleza, buena atención, excelente ubicación y experiencia para avistamiento de ballenas.",
    source: "Google",
    date: "2024-11-01", // Aproximado: hace 6 meses
  },
  {
    name: "Moritz Czajka",
    rate: 5,
    comment:
      "Muy buena ubicación frente al mar, anfitriones amables, ambiente tranquilo.",
    source: "Google",
    date: "2024-11-01", // Aproximado: hace 6 meses
  },
  {
    name: "Lis Sosa Leon",
    rate: 5,
    comment:
      "Habitaciones nuevas tipo glamping, baño privado, muy cómoda, volvería sin duda.",
    source: "Google",
    date: "2025-03-01", // Aproximado: hace 1 mes
  },
  {
    name: "jenny restrepo",
    rate: 5,
    comment:
      "Habitación excelente, personal muy atento, lo más bonito y nuevo del sector.",
    source: "Google",
    date: "2024-11-01", // Aproximado: hace 6 meses
  },
];

export default function Testimonials() {
  const testimonialsRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const whaleRef = useRef<HTMLDivElement>(null);

  gsap.registerPlugin(ScrollTrigger);

  useEffect(() => {
    gsap.set(whaleRef.current, { xPercent: -50 });
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: testimonialsRef.current,
        start: "-100% center",
        end: "150% center",
        scrub: true,
      },
    });

    tl.from(titleRef.current, { opacity: 0, y: 50, duration: 1 });
    tl.from(".card", { opacity: 0, y: 50, stagger: 0.2 });

    tl.to(whaleRef.current, { xPercent: 20, y: -50, rotate: -15, duration: 1 })
      .to(whaleRef.current, { xPercent: 160, y: 40, rotate: 15, duration: 1 })
      .to(whaleRef.current, { xPercent: 240, y: -30, rotate: -10, duration: 1 })
      .to(whaleRef.current, { xPercent: 320, y: 30, rotate: 10, duration: 1 })
      .to(whaleRef.current, { xPercent: 400, y: -20, rotate: -5, duration: 1 })
      .to(whaleRef.current, { xPercent: 800, y: 20, rotate: 5, duration: 1 });

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section
      ref={testimonialsRef}
      className={styles.testimonials}
      aria-labelledby="testimonials-title"
    >
      <div className="container">
        <h2 id="testimonials-title" ref={titleRef} className={styles.title}>
          Historias que dejan huella en la arena
        </h2>
      </div>

      <Swiper
        spaceBetween={16}
        slidesPerView={5}
        autoplay={{ delay: 2500, disableOnInteraction: false }}
        loop
        modules={[Autoplay]}
      >
        {testimonials.map((testimonial, index) => (
          <SwiperSlide key={index}>
            <div className="card">
              <TestimonialCard testimonial={testimonial} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div style={{ width: "100%" }}>
        <figure ref={whaleRef} className={styles.whale} role="presentation">
          <img src={Whale.src} alt="" />
        </figure>
      </div>
    </section>
  );
}
