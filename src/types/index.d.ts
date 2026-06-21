import type { ReactNode } from "react";
import type { IconName } from "../utils/IconMaps";

export interface IPlan {
  icon: IconName;
  title: string;
  content: string;
}

export interface IIncludeItem {
  icon: IconName;
  title: string;
}

export interface INotIncludeItem {
  title: string;
  content?: string[];
}

export interface IItineraryItem {
  id: number;
  day: string | null;
  title: string;
  description: string;
}

export type Photo = {
  src: string;
  alt: string;
};

export type PackageVibesProps = {
  title?: string;
  photos: Photo[];
};

export type ICurrentPlan = {
  name: string;
  description: string;
  slug: string;
  overview: IPlan[];
  includes: IIncludeItem[];
  notIncludes: INotIncludeItem[];
  itinerary: IItineraryItem[];
  gallery: Photo[];
};
