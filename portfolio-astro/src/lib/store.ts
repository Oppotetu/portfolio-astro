import { atom } from 'nanostores';
import type Swiper from 'swiper';
import type { Project } from './types';

export const swiperApi = atom<Swiper | null>(null);

export const currentProject = atom<Project | null>(null);
