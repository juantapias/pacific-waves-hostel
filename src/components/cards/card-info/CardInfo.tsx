import type { IPlan } from "../../../types";
import { iconsMap } from "../../../utils/IconMaps";

export default function CardInfo({ plan }: { plan: IPlan }) {
  const Icon = iconsMap[plan.icon];

  return (
    <div className="rounded-2xl bg-secondary flex flex-col items-center justify-center text-white p-4">
      {Icon && <Icon size={32} />}
      <h4 className="text-sm">{plan.title}</h4>
      <p className="font-semibold">{plan.content}</p>
    </div>
  );
}
