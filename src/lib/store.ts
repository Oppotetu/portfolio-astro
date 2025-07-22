import type { CarouselApi } from "@/components/ui/carousel";
import { atom } from "nanostores";

export const carouselApi = atom<CarouselApi>();

export const currentProject = atom("");
