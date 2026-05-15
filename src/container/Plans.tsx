import BookingDate from "../components/booking/booking-date/BookingDate";
import CardInfo from "../components/cards/card-info/CardInfo";
import TourInclude from "../components/tour/include/TourInclude";
import TourItinerary from "../components/tour/itinerary/TourItinerary";
import PackageVibes from "../components/tour/vibes/TourVibes";

import { plans } from "../db";
import type { IIncludeItem, INotIncludeItem, IPlan, Photo } from "../types";

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
    <div className="container mx-auto py-10 px-4">
      <div className="grid grid-rows-1 grid-cols-1 md:grid-cols-3 gap-8">
        <div className="grid col-span-1 md:col-span-2 gap-8">
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
            <PackageVibes photos={currentPlan.gallery as Photo[]} />
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
