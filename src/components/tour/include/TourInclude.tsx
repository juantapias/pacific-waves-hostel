import type { IIncludeItem, INotIncludeItem } from "../../../types";
import { IconCircleX } from "@tabler/icons-react";
import { iconsMap } from "../../../utils/IconMaps";

export default function TourInclude({
  includes,
  notIncludes,
}: {
  includes: IIncludeItem[];
  notIncludes: INotIncludeItem[];
}) {
  return (
    <div className="container mx-auto">
      <div className="grid grid-rows-1">
        <div className="grid grid-cols-1 gap-8">
          <h2 className="text-4xl text-primary">¿Que incluye?</h2>

          <div className="grid grid-cols-2 gap-4">
            {includes.map((include, index) => {
              const Icon = iconsMap[include.icon];

              return (
                <div key={index} className="flex items-center font-light gap-2">
                  <span className="flex items-center justify-center h-14 w-14 bg-primary rounded-full text-white">
                    {Icon && <Icon size={24} />}
                  </span>

                  <div className="w-4/5">
                    <p>{include.title}</p>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="bg-primary p-4 rounded-2xl">
            <div className="flex items-center text-white space-x-2">
              <IconCircleX />
              <h3 className="font-semibold">No incluye</h3>
            </div>

            <ul className="list-disc pl-8">
              {notIncludes.map((item, index) => (
                <li key={index} className="text-xs text-white font-light">
                  <p>{item.title}</p>

                  {item.content && (
                    <ul className="pl-4 list-disc">
                      {item.content?.map((c, i) => <li key={i}>{c}</li>)}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
