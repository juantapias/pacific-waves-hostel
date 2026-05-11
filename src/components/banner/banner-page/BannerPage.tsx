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
      <h1>{title}</h1>
    </div>
  );
}
