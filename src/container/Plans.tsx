import BookingDate from "../components/booking/booking-date/BookingDate";
import CardInfo from "../components/cards/card-info/CardInfo";
import TourInclude from "../components/tour/include/TourInclude";
import TourItinerary from "../components/tour/itinerary/TourItinerary";
import PackageVibes from "../components/tour/vibes/TourVibes";

import { plans } from "../db";
import type { IIncludeItem, INotIncludeItem, IPlan } from "../types";

type IPlanProps = {
  plan: string;
};

export default function Plans({ plan }: IPlanProps) {
  const allPlans = plans[0].plans;

  const currentPlan = Object.values(allPlans).find((p) => p.slug === plan);

  if (!currentPlan) {
    return <div>Plan no encontrado</div>;
  }

  return (
    <div className="container mx-auto py-10">
      <div className="grid grid-rows-1 grid-cols-3 gap-8">
        <div className="grid col-span-2 gap-8">
          <p className="font-light text-base">{currentPlan.description}</p>

          <div className="grid grid-rows-1 gap-8">
            <div
              className={`grid grid-cols-${currentPlan.overview.length} gap-8`}
            >
              {currentPlan.overview.map((plan, index) => (
                <CardInfo key={index} plan={plan as IPlan} />
              ))}
            </div>

            <TourInclude
              includes={currentPlan.includes as IIncludeItem[]}
              notIncludes={currentPlan.notIncludes as INotIncludeItem[]}
            />
            <TourItinerary />
            <PackageVibes
              photos={[
                {
                  src: "https://images.unsplash.com/photo-1568430462989-44163eb1752f?q=80&w=1473&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                  alt: "Cola de ballena jorobada",
                },
                {
                  src: "https://images.unsplash.com/photo-1679158608511-b831e3900bd0?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                  alt: "Bowl de frutas",
                },
                {
                  src: "https://images.unsplash.com/photo-1698334846759-2cdc3352dd85?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                  alt: "Tablas de surf",
                },
                {
                  src: "https://images.unsplash.com/photo-1719450589784-c2c36ccf8e5b?q=80&w=1075&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                  alt: "Fogata en la playa",
                },
              ]}
            />
          </div>
        </div>

        <div>
          <div className="sticky top-24">
            <BookingDate plan={currentPlan.slug} />
          </div>
        </div>
      </div>
    </div>
  );
}
