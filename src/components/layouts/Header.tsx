import { useEffect, useState } from "react";
import LogoWhite from "../../assets/images/logo-white.webp";
import Logo from "../../assets/images/logo.webp";

import style from "./header.module.css";

export default function Header() {
  const [scrolled, setScrolled] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header className={scrolled ? style.scrolled : ""}>
      <nav>
        <img
          src={scrolled ? Logo.src : LogoWhite.src}
          alt="Pacific waves hostel & surf"
          width={90}
        />
        <ul className={style.navigation}>
          <li>
            <a href="#">Inicio</a>
          </li>
          <li>
            <a href="#">Nosotros</a>
          </li>
          <li>
            <a href="#">Hospedaje</a>
          </li>
        </ul>
        <button className="btn-primary">Reserva</button>
      </nav>
    </header>
  );
}
