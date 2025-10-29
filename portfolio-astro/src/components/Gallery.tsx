import type { ImageEntry, Project } from '@/lib/types';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useStore } from '@nanostores/react';
import { currentProject, swiperApi } from '@/lib/store';
import { useEffect } from 'react';
import Swiper from 'swiper';
import 'swiper/css';
import CursorNavigation from './CursorNavigation';
import CursorCircle from './CursorCircle';

interface GalleryProps {
  images: ImageEntry[];
  projects: Project[];
}

const Gallery = (p: GalleryProps) => {
  const $swiperApi = useStore(swiperApi);
  const $currentProject = useStore(currentProject);

  useEffect(() => {
    if (!document) return;
    const swiper = new Swiper('.swiper', {
      centeredSlides: true,
      on: {
        slideChange(sw) {
          currentProject.set(
            p.projects?.find(
              (pro) =>
                pro.slideIndexRange[0] <= sw.activeIndex &&
                pro.slideIndexRange[1] >= sw.activeIndex
            )
          );
        },
        afterInit(sw) {
          currentProject.set(
            p.projects?.find(
              (pro) =>
                pro.slideIndexRange[0] <= sw.activeIndex &&
                pro.slideIndexRange[1] >= sw.activeIndex
            )
          );
        },
      },
    });
    swiperApi.set(swiper);

    return () => swiper.destroy();
  }, [document]);

  useEffect(() => {
    if (!$swiperApi || !document) return;
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
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

  const scrollPrev = () => {
    console.log('scrolling prev');
    if (!$swiperApi) return;
    $swiperApi.slidePrev();
  };

  const scrollNext = () => {
    console.log('scrolling next');
    if (!$swiperApi) return;
    $swiperApi.slideNext();
  };

  const getSrcSet = (image: ImageEntry) =>
    `${image.filePaths.w844} 844w, ${image.filePaths.w1024} 1024w, ${image.filePaths.w1600} 1600w, ${image.filePaths.w2560} 2560w`;

  return (
    <div className="swiper h-full">
      <div className="swiper-wrapper items-center">
        {p.images.map((image, index) => (
          <img
            key={`${image.project}-${index}`}
            sizes="100vw"
            srcSet={getSrcSet(image)}
            src={image.filePaths.w1600}
            alt={image.filename}
            className="swiper-slide h-auto w-auto max-w-screen object-contain"
          />
        ))}
      </div>

      <CursorCircle
        scrollNext={scrollNext}
        scrollPrev={scrollPrev}
        visibleOnMoveOnly
      />

      {/* <Button
        className={cn(
          'inverted-icon sm:debug absolute -bottom-4 left-4 z-40 h-16 w-16 -translate-y-1/2 cursor-pointer rounded-full hover:bg-white focus:bg-white'
        )}
        onClick={scrollPrev}
      >
        <ArrowLeft className="text-black" />
        <span className="sr-only">Previous slide</span>
      </Button>
      <div className="absolute -bottom-4 left-4 z-0 h-16 w-16 -translate-y-1/2 rounded-full bg-white" />

      <Button
        className={cn(
          'inverted-icon absolute right-4 -bottom-4 z-40 h-16 w-16 -translate-y-1/2 cursor-pointer rounded-full hover:bg-white focus:bg-white'
        )}
        onClick={scrollNext}
      >
        <ArrowRight className="text-black" />
        <span className="sr-only">Next slide</span>
      </Button>
      <div className="absolute right-4 -bottom-4 z-0 h-16 w-16 -translate-y-1/2 rounded-full bg-white" /> */}
    </div>
  );
};

export default Gallery;
