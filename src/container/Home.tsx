import { useEffect, useState } from "react";
import Loading from "../components/ui/loading";
import MainBanner from "../components/banner/main-banner/MainBanner";
import ContentBlock from "../components/content-block/ContentBlock";
import Rooms from "../components/rooms/Rooms";
import Booking from "../components/booking/Booking";
import Gallery from "../components/gallery/Gallery";
import Newsletter from "../components/newsletter/Newsletter";
import Testimonials from "../components/testimonials/Testimonials";

export default function PageContent() {
  return (
    <>
      <MainBanner />
      <ContentBlock />
      <Rooms />
      <Booking />
      <Testimonials />
      <Gallery />
      <Newsletter />
    </>
  );
}
