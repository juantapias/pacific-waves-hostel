import { useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Swiper, SwiperSlide, type SwiperRef } from "swiper/react";
import { Navigation } from "swiper/modules";

import { RoomData } from "../../utils/data/RoomsData";
import style from "./rooms.module.css";
import IconFamily from "../icons/icon-family";
import IconFourGroup from "../icons/icon-four-group";
import IconThreeGroup from "../icons/icon-three-group";
import IconDoorLock from "../icons/icon-door-lock";

// Registrar plugins fuera del componente (solo se ejecuta una vez)
gsap.registerPlugin(ScrollTrigger);

const ROOM_TYPES = [
  { icon: <IconThreeGroup />, type: "group-8", title: "Compartidas de 8" },
  { icon: <IconFourGroup />, type: "group-4", title: "Compartidas de 4" },
  { icon: <IconFamily />, type: "family", title: "Familiar" },
  { icon: <IconDoorLock />, type: "privacy", title: "Privada" },
];

export default function Rooms() {
  const [roomActive, setRoomActive] = useState<string>("group-8");

  const roomRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const buttonsRoomsRef = useRef<HTMLDivElement>(null);
  const swiperRoomRef = useRef<SwiperRef>(null);

  // Refs para botones de navegación custom
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  useLayoutEffect(() => {
    ScrollTrigger.getAll().forEach((t) => t.kill());

    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: roomRef.current,
          start: "-50% top",
          end: "75% bottom",
          scrub: 1,
        },
      });

      const swiperEl = swiperRoomRef.current?.swiper?.el;
      if (swiperEl) tl.from(swiperEl, { opacity: 0 }, "a");

      if (headingRef.current) {
        tl.from(
          headingRef.current.children,
          { opacity: 0, stagger: 1, y: 20 },
          "a",
        );
      }

      if (buttonsRoomsRef.current) {
        tl.from(
          buttonsRoomsRef.current.children,
          { opacity: 0, stagger: 1, y: 20 },
          "a",
        );
      }
    });

    mm.add("(max-width: 767px)", () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: roomRef.current,
          start: "-80% 80%",
          end: "center 20%",
          scrub: 1,
          markers: false,
        },
      });

      const swiperEl = swiperRoomRef.current?.swiper?.el;
      if (swiperEl) {
        tl.from(swiperEl, {
          opacity: 0,
          y: 30,
          duration: 0.8,
          ease: "power2.out",
        });
      }

      if (headingRef.current) {
        tl.from(
          headingRef.current.children,
          {
            opacity: 0,
            stagger: 0.3,
            y: 20,
            duration: 0.6,
            ease: "power2.out",
          },
          "-=0.4",
        );
      }

      if (buttonsRoomsRef.current) {
        tl.from(
          buttonsRoomsRef.current.children,
          {
            opacity: 0,
            stagger: 0.2,
            y: 20,
            duration: 0.5,
            ease: "power2.out",
          },
          "-=0.3",
        );
      }
    });

    return () => mm.revert();
  }, []);

  // Re-inicializar navegación cuando los botones ya están montados
  useLayoutEffect(() => {
    const swiper = swiperRoomRef.current?.swiper;
    if (!swiper || !prevRef.current || !nextRef.current) return;
    if (typeof swiper.params.navigation !== "object") return;

    swiper.params.navigation.prevEl = prevRef.current;
    swiper.params.navigation.nextEl = nextRef.current;
    swiper.navigation.destroy();
    swiper.navigation.init();
    swiper.navigation.update();
  }, []);

  const activeRoom = RoomData.find((room) => room.type === roomActive);

  return (
    <div id="rooms" ref={roomRef} className={style.rooms}>
      <div className="container mx-auto px-4">
        {/* Encabezado */}
        <div ref={headingRef} className="grid grid-cols-1 gap-8">
          <div className="text-center">
            <span className={style.subtitle}>Descanso pleno</span>
            <h2 className={style.title}>Habitaciones pensadas para ti</h2>
          </div>

          {/* Selector de tipo de habitación */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 rounded-2xl md:rounded-full bg-primary w-fit mx-auto py-2 px-4">
            {ROOM_TYPES.map((room) => (
              <button
                key={room.type}
                className={`${
                  roomActive === room.type
                    ? "bg-white text-primary"
                    : "text-white"
                } px-4 py-2 rounded-full cursor-pointer flex items-center space-x-2`}
                onClick={() => setRoomActive(room.type)}
              >
                {room.icon}
                <span>{room.title}</span>
              </button>
            ))}
          </div>

          {/* Tarjeta de habitación */}
          <div className={style.roomWrap}>
            <div className="bg-[#fff] p-4 shadow-md rounded-3xl">
              <div className="grid grid-cols-1 md:grid-cols-2">
                {/* Galería */}
                <Swiper
                  ref={swiperRoomRef}
                  className={style.roomGallery}
                  modules={[Navigation]}
                  navigation={{
                    prevEl: prevRef.current,
                    nextEl: nextRef.current,
                  }}
                  loop={true}
                  autoHeight={true}
                >
                  {activeRoom?.gallery?.map((item, index) => (
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

                {/* Contenido de la habitación */}
                <div ref={buttonsRoomsRef} className={style.roomTypes}>
                  <div className={style.room}>
                    <div
                      key={roomActive}
                      className="text-primary gap-4 grid"
                      dangerouslySetInnerHTML={{
                        __html: activeRoom?.content ?? "",
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
