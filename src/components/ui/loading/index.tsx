import { useEffect, useRef } from "react";
import { gsap } from "gsap";

import Logo from "../../../assets/images/logo-white.webp?url";

import style from "./loading.module.css";

type LoadingProps = {
  isLoading: boolean;
};

export default function Loading({ isLoading }: LoadingProps) {
  const loaderRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (isLoading) {
      window.scrollTo({ top: 0 });
      if (loaderRef.current && logoRef.current) {
        const tl = gsap.timeline();

        tl.to(logoRef.current, { opacity: 0, duration: 4 });
        tl.to(loaderRef.current, {
          y: "-1000%",
          duration: 2,
          ease: "power2.inOut",
        });

        return () => {
          tl.kill();
        };
      }
    }
  }, [isLoading]);

  return (
    <div ref={loaderRef} className={style.loading}>
      <img
        ref={logoRef}
        src={Logo}
        alt="Pacific waves hostel & surf"
        className={style.loadingSpinner}
        width={128}
      />
    </div>
  );
}
