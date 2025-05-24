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

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

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
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("home");
              }}
            >
              Inicio
            </a>
          </li>
          <li>
            <a
              href="#us"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("us");
              }}
            >
              Nosotros
            </a>
          </li>
          <li>
            <a
              href="#rooms"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("rooms");
              }}
            >
              Hospedaje
            </a>
          </li>
        </ul>
        <button
          className="btn-primary"
          onClick={(e) => {
            e.preventDefault();
            scrollToSection("booking");
          }}
        >
          Reserva
        </button>
      </nav>
    </header>
  );
}
