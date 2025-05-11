import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import GalleryImage1 from "../../assets/images/gallery/pacific-waves-hostel-0.webp";
import GalleryImage2 from "../../assets/images/gallery/pacific-waves-hostel-1.webp";
import GalleryImage3 from "../../assets/images/gallery/pacific-waves-hostel-2.webp";
import GalleryImage4 from "../../assets/images/gallery/pacific-waves-hostel-3.webp";
import GalleryImage5 from "../../assets/images/gallery/pacific-waves-hostel-4.webp";
import GalleryImage6 from "../../assets/images/gallery/pacific-waves-hostel-5.webp";
import GalleryImage7 from "../../assets/images/gallery/pacific-waves-hostel-6.webp";
import GalleryImage8 from "../../assets/images/gallery/pacific-waves-hostel-7.webp";

import "./gallery.module.css";

export default function Gallery() {
  gsap.registerPlugin(ScrollTrigger);
  const galleryRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".gallery-container",
        start: "-25% top",
        end: "bottom bottom",
        scrub: 1,
        markers: false,
      },
    });

    tl.from(".gallery-item", {
      opacity: 0,
      y: 100,
      stagger: 0.2,
    });
  }, []);

  const imageGroups = [
    // Grupo 1: 2 imágenes (fila con 2 columnas)
    [{ src: GalleryImage1 }, { src: GalleryImage2 }],
    // Grupo 2: 1 imagen (fila con 1 columna centrada)
    [{ src: GalleryImage3 }], // Ahora es un array con un solo elemento
    // Grupo 3: 2 imágenes
    [{ src: GalleryImage4 }, { src: GalleryImage5 }],
    // Grupo 4: 1 imagen
    [{ src: GalleryImage6 }], // Ahora es un array con un solo elemento
    // Grupo 5: 2 imágenes
    [{ src: GalleryImage7 }, { src: GalleryImage8 }],
  ];

  return (
    <div ref={galleryRef} className="gallery-container">
      <h2>Postales del paraíso</h2>
      {imageGroups.map((group, groupIndex) => (
        <div
          key={`group-${groupIndex}`}
          className={`gallery-row ${group.length === 1 ? "single" : "double"}`}
        >
          {group.map((img, imgIndex) => (
            <div key={`img-${groupIndex}-${imgIndex}`} className="gallery-item">
              <img
                src={img.src.src}
                alt={`Gallery item ${groupIndex}-${imgIndex}`}
                height={400}
                className="max-w-full object-cover aspect-ratio-16/9"
              />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
