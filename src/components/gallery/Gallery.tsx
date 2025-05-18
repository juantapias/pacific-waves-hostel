import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { GalleryData } from "../../utils/data/GalleryData";

import style from "./gallery.module.css";

gsap.registerPlugin(ScrollTrigger);

const gridGallery = () => {
  const pattern = [2, 1, 2, 1, 2]; // número de elementos por grupo
  const imageGroups = [];

  let index = 0;

  for (let i = 0; i < pattern.length; i++) {
    const groupSize = pattern[i];
    const group = GalleryData.slice(index, index + groupSize).map(
      (item) => item.url,
    );
    imageGroups.push(group);
    index += groupSize;
  }

  return imageGroups;
};

export default function Gallery() {
  const galleryRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: galleryRef.current,
        start: "-50% center",
        end: "bottom bottom",
        scrub: 1,
        markers: false,
      },
    });

    tl.from(titleRef.current, { opacity: 0, y: 100, duration: 1 });
    tl.from(gsap.utils.toArray(`.${style.galleryItem}`), {
      opacity: 0,
      y: 100,
      stagger: 0.2,
    });
  }, []);

  return (
    <div ref={galleryRef} className={style.gallery}>
      <div className="container">
        <h2 ref={titleRef} className={style.title}>
          Postales del paraíso
        </h2>
        <div className={style.galleryContainer}>
          {gridGallery().map((group, groupIndex) => (
            <div
              key={groupIndex}
              className={`${style.galleryRow} ${
                group.length === 1 ? style.single : style.double
              }`}
            >
              {group.map((src, imgIndex) => (
                <div key={imgIndex} className={style.galleryItem}>
                  <img
                    src={src}
                    alt={`Imagen ${groupIndex}-${imgIndex}`}
                    height={400}
                    className="max-w-full object-cover aspect-ratio-16/9"
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
