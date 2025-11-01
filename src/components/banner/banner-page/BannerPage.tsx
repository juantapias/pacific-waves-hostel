import style from "./banner-page.module.css";

type BannerPageProps = {
  title: string;
};

export default function BannerPage({ title }: BannerPageProps) {
  return (
    <div className={style.bannerPage}>
      <h1>{title}</h1>
    </div>
  );
}
