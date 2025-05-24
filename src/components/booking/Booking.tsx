import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import BookingForm from "../ui/forms/booking/BookingForm";

import styles from "./booking.module.css";

export default function Booking() {
  gsap.registerPlugin(ScrollTrigger);

  const bookingContentRef = useRef<HTMLDivElement>(null);
  const bookingRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLHeadingElement>(null);
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: bookingRef.current,
        start: "-60% center",
        end: "center center",
        scrub: true,
      },
    });

    tl.from(bookingContentRef.current, { opacity: 0, scale: 0 });
    tl.from(
      [titleRef.current, subtitleRef.current],
      {
        opacity: 0,
        y: 50,
        duration: 1,
        stagger: 0.5,
      },
      "a",
    );
    tl.from(formRef.current, { opacity: 0 });
  }, []);

  return (
    <section
      id="booking"
      ref={bookingRef}
      className={styles.booking}
      aria-labelledby="booking-heading"
    >
      <div className="container">
        <div ref={bookingContentRef} className={styles.bookingContent}>
          <div className={styles.heading}>
            <h2 id="booking-heading" ref={titleRef} className={styles.title}>
              Prepara tu escapada al paraíso
            </h2>
            <h3 ref={subtitleRef} className={styles.subtitle}>
              Elige tus fechas, haz tu reserva y déjate llevar por las olas… y
              las ballenas.
            </h3>
          </div>
          <div ref={formRef}>
            <BookingForm />
          </div>
        </div>
      </div>
    </section>
  );
}
