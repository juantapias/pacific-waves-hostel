import { useEffect, useState } from "react";
import LogoWhite from "../../assets/images/logo-white.webp";
import Logo from "../../assets/images/logo.webp";

import style from "./header.module.css";
import { navigation } from "../../utils/data/NavigationData";

export default function Header() {
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

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

  useEffect(() => {
    if (window.location.pathname === "/") {
      const section = sessionStorage.getItem("scrollToSection");
      if (section) {
        const timeout = setTimeout(() => {
          const element = document.getElementById(section.replace("#", ""));
          if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "start" });
          }
          sessionStorage.removeItem("scrollToSection");
        }, 5000); // Espera 5 segundos antes de hacer scroll

        return () => clearTimeout(timeout);
      }
    }
  }, []);

  // Cerrar menú al hacer scroll
  useEffect(() => {
    const handleScroll = () => {
      if (mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };

    if (mobileMenuOpen) {
      window.addEventListener("scroll", handleScroll);
      // Prevenir scroll del body cuando el menú está abierto
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  const scrollToSection = (sectionId: string) => {
    // Cerrar menú móvil antes de hacer scroll
    setMobileMenuOpen(false);

    if (window.location.pathname !== "/") {
      sessionStorage.setItem("scrollToSection", sectionId);
      window.location.href = "/";
      setMobileMenuOpen(false);
      return;
    }

    setTimeout(() => {
      const element = document.getElementById(sectionId.replace("#", ""));

      if (element) {
        const yOffset = sectionId === "#rooms" ? -140 : 0;
        const y =
          element.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
    }, 300); // Espera a que el menú cierre antes de hacer scroll
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => !prev);
  };

  return (
    <header className={`${style.header} ${scrolled ? style.scrolled : ""}`}>
      {/* Nav de escritorio */}
      <nav className={style.desktopNav}>
        <img
          src={scrolled ? Logo.src : LogoWhite.src}
          alt="Pacific waves hostel & surf"
          width={90}
          height={60}
        />
        <ul className={style.navigation}>
          {navigation.map((item, index) => (
            <li key={index}>
              <a
                href={item.url}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(item.url);
                }}
              >
                {item.label}
              </a>
            </li>
          ))}
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

      {/* Nav mobile - Header bar */}
      <div className={style.mobileHeader}>
        <img
          src={scrolled ? Logo.src : LogoWhite.src}
          alt="Pacific waves hostel & surf"
          width={90}
          height={60}
        />

        <button
          className={`${style.menuButton} ${mobileMenuOpen ? style.active : ""}`}
          onClick={toggleMobileMenu}
          aria-label={mobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={mobileMenuOpen}
        >
          <span className={style.hamburger}>
            <span></span>
            <span></span>
            <span></span>
          </span>
        </button>
      </div>

      {/* Nav mobile - Menu overlay */}
      <nav
        className={`${style.mobileNav} ${mobileMenuOpen ? style.open : ""}`}
        aria-hidden={!mobileMenuOpen}
      >
        <div className={style.mobileNavContent}>
          <img
            src={scrolled ? Logo.src : LogoWhite.src}
            alt="Pacific waves hostel & surf"
            width={70}
            height={47}
            className={style.mobileNavLogo}
          />
          <ul className={style.mobileNavigation}>
            {navigation.map((item, index) => (
              <li key={index}>
                <a
                  href={item.url}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(item.url);
                  }}
                >
                  {item.label}
                </a>
              </li>
            ))}
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
        </div>
      </nav>

      {/* Overlay para cerrar menú */}
      {mobileMenuOpen && (
        <div
          className={style.overlay}
          onClick={() => setMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}
    </header>
  );
}
