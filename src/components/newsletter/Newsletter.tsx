import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import NewsletterForm from '../ui/forms/newsletter/NewsletterForm';

import styles from './Newsletter.module.css';

export default function Newsletter() {
  gsap.registerPlugin(ScrollTrigger);

  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: '-150% center',
        end: '-75% center',
        scrub: 1,
        markers: false,
      },
    });

    tl.from([titleRef.current, formRef.current], {
      opacity: 0,
      y: 100,
      stagger: 0.5,
    });
  }, []);

  return (
    <div ref={containerRef} className={styles.newsletter}>
      <div className='container'>
        <h2 ref={titleRef} className={styles.title}>
          Únete a nuestro boletín para recibir novedades y ofertas exclusivas.
        </h2>

        <div ref={formRef} className={styles.form}>
          <NewsletterForm placeholder='Ingresa tu correo...' />
        </div>
      </div>
    </div>
  );
}
