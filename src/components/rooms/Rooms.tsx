import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Swiper, SwiperSlide, type SwiperRef } from "swiper/react";
import { Navigation } from "swiper/modules";
import SwiperCore from "swiper";

import { RoomData } from "../../utils/data/RoomsData";

import style from "./rooms.module.css";

export default function Rooms() {
  const [roomActive, setRoomActive] = useState<number | null>(null);

  const roomRef = useRef<HTMLDivElement>(null);
  const swipperRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const buttonsRoomsRef = useRef<HTMLDivElement>(null);

  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const swiperRef = useRef<SwiperCore | null>(null);
  const swiperRoomRef = useRef<SwiperRef>(null);

  // refs para cada contenido
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);

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

    tl.from(swiperRoomRef.current, { opacity: 0 });

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

  const handleSelectedRoom = (index: number) => {
    if (roomActive === index) {
      const content = contentRefs.current[index];
      if (content) {
        gsap.to(content, {
          height: 0,
          duration: 0.4,
          ease: "power2.inOut",
          onComplete: () => setRoomActive(null),
        });
      } else {
        setRoomActive(null);
      }
    } else {
      if (roomActive !== null && contentRefs.current[roomActive]) {
        gsap.to(contentRefs.current[roomActive], {
          height: 0,
          duration: 0.3,
          ease: "power2.inOut",
        });
      }

      const content = contentRefs.current[index];
      if (content) {
        gsap.set(content, { height: "auto" });
        const height = content.offsetHeight;
        gsap.fromTo(
          content,
          { height: 0 },
          {
            height,
            duration: 0.4,
            ease: "power2.inOut",
          },
        );
      }

      setRoomActive(index);
    }
  };

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
            ref={swiperRoomRef}
          >
            {RoomData[roomActive ?? 0].gallery.map((item, index) => (
              <SwiperSlide key={index} className={style.styleCarousel}>
                <img
                  src={item.src}
                  alt={""}
                  className={style.roomGalleryItem}
                />
              </SwiperSlide>
            ))}
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
              {RoomData.map((item, index) => (
                <div className={style.room} key={index}>
                  <button
                    className={style.roomName}
                    onClick={() => handleSelectedRoom(index)}
                  >
                    <span>{item.name}</span>
                    <i>{roomActive === index ? "−" : "+"}</i>
                  </button>
                  <div
                    ref={(el) => {
                      contentRefs.current[index] = el;
                    }}
                    className={style.roomContent}
                    style={{ height: 0, overflow: "hidden" }}
                    dangerouslySetInnerHTML={{ __html: item.content }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
