import { useEffect } from 'react';
import Swiper from 'swiper';
import 'swiper/css';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useStore } from '@nanostores/react';
import { swiperApi } from '@/lib/store';

interface GalleryNavProps {
  projectParam: string;
  imageParam: string;
}

const GalleryNav = (p: GalleryNavProps) => {
  const $swiperApi = useStore(swiperApi);

  useEffect(() => {
    if (!document) return;
    swiperApi.set(
      new Swiper('.swiper', {
        centeredSlides: true,
      }),
    );
  }, [document]);

  useEffect(() => {}, [p.projectParam, p.imageParam]);

  useEffect(() => {
    if (!$swiperApi || !document) return;
    document.addEventListener('keydown', handleKeyDown);
    $swiperApi.on('slideChange', (event) => handleSlideChange(event));
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      $swiperApi.off('slideChange', handleSlideChange);
    };
  }, [$swiperApi]);

  const handleKeyDown = (event: KeyboardEvent) => {
    if (!$swiperApi) return;
    event.preventDefault();
    if (event.key === 'ArrowLeft') {
      $swiperApi.slidePrev();
    }
    if (event.key === 'ArrowRight') {
      $swiperApi.slideNext();
    }
  };

  const handleSlideChange = (event) => {
    if (!$swiperApi) return;
    console.log('event', event.selectedScrollSnap());
  };

  const scrollPrev = () => {
    if (!$swiperApi) return;
    $swiperApi.slidePrev();
  };

  const scrollNext = () => {
    if (!$swiperApi) return;
    $swiperApi.slideNext();
  };

  return (
    <>
      <Button
        data-slot="swiper-button-prev"
        className={cn(
          'inverted-icon absolute -bottom-4 left-4 z-40 h-16 w-16 -translate-y-1/2 cursor-pointer rounded-full',
        )}
        onClick={scrollPrev}
      >
        <ArrowLeft className="text-black" />
        <span className="sr-only">Previous slide</span>
      </Button>
      <div className="absolute -bottom-4 left-4 z-0 h-16 w-16 -translate-y-1/2 rounded-full bg-white" />

      <Button
        data-slot="swiper-button-next"
        className={cn(
          'inverted-icon absolute right-4 -bottom-4 z-40 h-16 w-16 -translate-y-1/2 cursor-pointer rounded-full',
        )}
        onClick={scrollNext}
      >
        <ArrowRight className="text-black" />
        <span className="sr-only">Next slide</span>
      </Button>
      <div className="absolute right-4 -bottom-4 z-0 h-16 w-16 -translate-y-1/2 rounded-full bg-white" />
    </>
  );
};

export default GalleryNav;
