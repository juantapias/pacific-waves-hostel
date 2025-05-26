import { useLayoutEffect, useRef, useState } from "react";
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

  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);

  gsap.registerPlugin(ScrollTrigger);

  useLayoutEffect(() => {
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

    tl.to(swipperRef.current, { top: 100 });

    const swiperEl = swiperRoomRef.current?.swiper?.el;
    if (swiperEl) {
      tl.from(swiperEl, { opacity: 0 });
    }

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

  useLayoutEffect(() => {
    if (
      swiperRef.current &&
      prevRef.current &&
      nextRef.current &&
      swiperRef.current.params.navigation
    ) {
      const swiper = swiperRef.current;

      if (typeof swiper.params.navigation === "object") {
        swiper.params.navigation.prevEl = prevRef.current;
        swiper.params.navigation.nextEl = nextRef.current;

        swiper.navigation.destroy();
        swiper.navigation.init();
        swiper.navigation.update();
      }
    }
  }, []);

  const toggleRoom = (index: number) => {
    const current = contentRefs.current[index];

    if (roomActive === index) {
      if (current) {
        gsap.to(current, {
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

      if (current) {
        gsap.fromTo(
          current,
          { height: 0 },
          {
            height: current.scrollHeight,
            duration: 0.4,
            ease: "power2.inOut",
          },
        );
      }

      setRoomActive(index);
    }
  };

  return (
    <div id="rooms" ref={roomRef} className={style.rooms}>
      <div className="container">
        <div ref={swipperRef} className={style.roomWrap}>
          <Swiper
            ref={swiperRoomRef}
            className={style.roomGallery}
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            modules={[Navigation]}
            navigation={{ prevEl: prevRef.current, nextEl: nextRef.current }}
            scrollbar={{ hide: true }}
            loop={true}
            autoHeight={true}
          >
            {RoomData.length > 0 &&
              RoomData[roomActive ?? 0]?.gallery?.map((item, index) => (
                <SwiperSlide key={index} className={style.styleCarousel}>
                  <img
                    src={item.src}
                    alt={item.alt}
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
                    onClick={() => toggleRoom(index)}
                    aria-expanded={roomActive === index}
                    aria-controls={`room-content-${index}`}
                  >
                    <span>{item.name}</span>
                    <i>{roomActive === index ? "−" : "+"}</i>
                  </button>
                  <div
                    ref={(el) => {
                      contentRefs.current[index] = el;
                    }}
                    id={`room-content-${index}`}
                    role="region"
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
