import IconWhale from "../components/icons/IconWhale";
import IconSurfboard from "../components/icons/IconSurfboard";
import { IconWalk } from "../components/icons/icon-walk";
import { IconTubing } from "../components/icons/icon-tubing";
import {
  IconBus,
  IconBed,
  IconSalad,
  IconHomeShield,
  IconRoute,
  IconClock,
  IconUsers,
  IconCashBanknote,
  IconCalendar,
} from "@tabler/icons-react";

export const iconsMap = {
  IconBus,
  IconBed,
  IconSalad,
  IconWhale,
  IconSurfboard,
  IconHomeShield,
  IconRoute,
  IconClock,
  IconUsers,
  IconCashBanknote,
  IconCalendar,
  IconWalk,
  IconTubing,
} as const;

export type IconName = keyof typeof iconsMap;
