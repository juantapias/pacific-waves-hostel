
import { Swiper, SwiperSlide } from 'swiper/react';
import { Scrollbar } from 'swiper/modules';

import GalleryImage1 from "../../assets/images/gallery/pacific-waves-hostel-0.webp";
import GalleryImage2 from "../../assets/images/gallery/pacific-waves-hostel-1.webp";
import GalleryImage3 from "../../assets/images/gallery/pacific-waves-hostel-2.webp";
import GalleryImage4 from "../../assets/images/gallery/pacific-waves-hostel-3.webp";
import GalleryImage5 from "../../assets/images/gallery/pacific-waves-hostel-4.webp";
import GalleryImage6 from "../../assets/images/gallery/pacific-waves-hostel-5.webp";
import GalleryImage7 from "../../assets/images/gallery/pacific-waves-hostel-6.webp";
import GalleryImage8 from "../../assets/images/gallery/pacific-waves-hostel-7.webp";

import style from './rooms.module.css'

export default function Rooms() {
  const roomGallery = [
    {
      src: GalleryImage1,
      alt: 'Habitación principal'
    },
    {
      src: GalleryImage2,
      alt: 'Habitación principal'
    },
    {
      src: GalleryImage3,
      alt: 'Habitación principal'
    },
    {
      src: GalleryImage4,
      alt: 'Habitación principal'
    },
    {
      src: GalleryImage5,
      alt: 'Habitación principal'
    },
    {
      src: GalleryImage6,
      alt: 'Habitación principal'
    },
    {
      src: GalleryImage7,
      alt: 'Habitación principal'
    },
    {
      src: GalleryImage8,
      alt: 'Habitación principal'
    }
  ]

  return (
    <div className={style.rooms}>
      <div className="container">
        <div className={style.roomWrap}>

          <Swiper
            scrollbar={{
              hide: true,
            }}
            modules={[Scrollbar]}
            className={style.roomGallery}
          >
            {roomGallery.map((item, index) => (
              <SwiperSlide key={index} className={style.styleCarousel}>
                <img src={item.src.src} alt={item.alt} className={style.roomGalleryItem} />
              </SwiperSlide>
            ))}
          </Swiper>

          <div>
            <div className={style.heading}>
              <span className={style.subtitle}>Descanso pleno</span>
              <h2 className={style.title}>Habitaciones pensadas para ti</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
