import style from "./banner-page.module.css";
import type { ImageMetadata } from "astro";

type BannerPageProps = {
  title: string;
  bg: ImageMetadata;
};

export default function BannerPage({ title, bg }: BannerPageProps) {
  return (
    <div
      className={style.bannerPage}
      style={{ backgroundImage: `url(${bg.src})` }}
    >
      <div className="container mx-auto px-4 text-center z-1">
        <h1>{title}</h1>
      </div>
    </div>
  );
}
