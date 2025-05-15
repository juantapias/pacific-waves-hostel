import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import SwiperCore from "swiper";

import { privateRoom } from "../../utils/data/RoomsData";

import style from "./rooms.module.css";

export default function Rooms() {
  const roomRef = useRef<HTMLDivElement>(null);
  const swipperRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const buttonsRoomsRef = useRef<HTMLDivElement>(null);

  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const swiperRef = useRef<SwiperCore | null>(null);

  gsap.registerPlugin(ScrollTrigger);

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: roomRef.current,
        start: "-20% top",
        end: "+=2000",
        scrub: 1,
        pin: swipperRef.current,
        markers: false,
      },
    });

    if (headingRef.current) {
      tl.from(headingRef.current.children, {
        opacity: 0,
        stagger: 0.5,
        y: 20,
      });
    }
    if (buttonsRoomsRef.current) {
      tl.from(buttonsRoomsRef.current.children, {
        opacity: 0,
        stagger: 0.5,
        y: 20,
      });
    }
  }, []);

  useEffect(() => {
    if (
      swiperRef.current &&
      prevRef.current &&
      nextRef.current &&
      swiperRef.current.params.navigation
    ) {
      const swiper = swiperRef.current;

      if (
        swiper.params.navigation &&
        typeof swiper.params.navigation === "object"
      ) {
        swiper.params.navigation.prevEl = prevRef.current;
        swiper.params.navigation.nextEl = nextRef.current;

        swiper.navigation.destroy();
        swiper.navigation.init();
        swiper.navigation.update();
      }
    }
  }, []);

  return (
    <div ref={roomRef} className={style.rooms}>
      <div className="container">
        <div ref={swipperRef} className={style.roomWrap}>
          <Swiper
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            modules={[Navigation]}
            navigation={{ prevEl: prevRef.current, nextEl: nextRef.current }}
            scrollbar={{ hide: true }}
            className={style.roomGallery}
          >
            {privateRoom.map((item, index) => (
              <SwiperSlide key={index} className={style.styleCarousel}>
                <img
                  src={item.src}
                  alt={""}
                  className={style.roomGalleryItem}
                />
              </SwiperSlide>
            ))}
            {/* Botones de navegación personalizados */}
            <div className={style.customNav}>
              <button ref={prevRef} className={style.navButton}>
                &#x2039;
              </button>
              <button ref={nextRef} className={style.navButton}>
                &#x203A;
              </button>
            </div>
          </Swiper>

          <div>
            <div ref={headingRef} className={style.heading}>
              <span className={style.subtitle}>Descanso pleno</span>
              <h2 className={style.title}>Habitaciones pensadas para ti</h2>
            </div>

            <div ref={buttonsRoomsRef} className={style.roomTypes}>
              <button className={style.room}>
                <span>Habitaciones privadas</span>
                <i>+</i>
              </button>
              <button className={style.room}>
                <span>Habitaciones compartidas de 4</span>
                <i>+</i>
              </button>
              <button className={style.room}>
                <span>Habitaciones compartidas de 8</span>
                <i>+</i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
