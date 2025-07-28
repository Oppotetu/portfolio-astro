import type { CarouselApi } from '@/components/ui/carousel';
import type { EmblaCarouselType } from 'embla-carousel';
import { atom } from 'nanostores';
import type Swiper from 'swiper';

export const carouselApi = atom<CarouselApi>();

export const swiperApi = atom<Swiper>();

export const emblaApi = atom<EmblaCarouselType>();

export const currentProject = atom('');
