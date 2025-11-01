import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { GalleryData } from "../../utils/data/GalleryData";

import style from "./gallery.module.css";

gsap.registerPlugin(ScrollTrigger);

const getGroupedGallery = () => {
  const pattern = [2, 1, 2, 1, 2];
  const groups: { url: string; alt: string }[][] = [];
  let index = 0;

  for (let i = 0; i < pattern.length; i++) {
    const groupSize = pattern[i];
    const group = GalleryData.slice(index, index + groupSize).map((item) => ({
      url: item.url,
      alt: item.alt,
    }));
    groups.push(group);
    index += groupSize;
  }

  return groups;
};

export default function Gallery() {
  const galleryRef = useRef<HTMLElement>(null);
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
    <section
      ref={galleryRef}
      className={style.gallery}
      aria-labelledby="gallery-heading"
    >
      <div className="container">
        <h2 id="gallery-heading" ref={titleRef} className={style.title}>
          Postales del paraíso
        </h2>
        <div className={style.galleryContainer}>
          {getGroupedGallery().map((group, groupIndex) => (
            <div
              key={groupIndex}
              className={`${style.galleryRow} ${
                group.length === 1 ? style.single : style.double
              }`}
            >
              {group.map(({ url, alt }, imgIndex) => (
                <figure key={imgIndex} className={style.galleryItem}>
                  <img
                    src={url}
                    alt={alt}
                    loading="lazy"
                    height={400}
                    className="max-w-full object-cover aspect-ratio-16/9"
                  />
                </figure>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
