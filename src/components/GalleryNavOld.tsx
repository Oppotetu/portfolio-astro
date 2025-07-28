import EmblaCarousel, {
  type EmblaCarouselType,
  type EmblaOptionsType,
} from 'embla-carousel';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useStore } from '@nanostores/react';
import { emblaApi } from '@/lib/store';

interface GalleryNavProps {
  initialSlide: number;
}

const GalleryNavOld = (p: GalleryNavProps) => {
  // const emblaApi = useRef<EmblaCarouselType>(null);
  // const [emblaApi, setEmblaApi] = useState<EmblaCarouselType>();
  const $emblaApi = useStore(emblaApi);
  const [initialized, setInitialized] = useState(false);

  const options: EmblaOptionsType = {
    // loop: true,
    // align: 'center' as const,
    // skipSnaps: false,
    // dragFree: false,
    align: 'start',
    // skipSnaps: false,
    // dragFree: false,
    startIndex: 0,
  };

  // useEffect(() => {
  //   if (!$carouselApi || !document) return;
  //   document.addEventListener('keydown', handleKeyDown);
  //   $carouselApi.on('select', (event) => handleSlideChange(event));
  //   return () => {
  //     document.removeEventListener('keydown', handleKeyDown);
  //     $carouselApi.off('select', handleSlideChange);
  //   };
  // }, [$carouselApi]);

  useEffect(() => {
    if (!document) return;
    const viewportNode: HTMLElement =
      document.querySelector('.embla__viewport');
    if (viewportNode) {
      console.log('viewportNode: ', viewportNode);
      emblaApi.set(EmblaCarousel(viewportNode, options));

      // emblaApi.current = EmblaCarousel(viewportNode, options);
      // setEmblaApi(EmblaCarousel(viewportNode, options));

      setInitialized(true);
    }
    return () => {
      // setEmblaApi(undefined);
    };
  }, [document]);

  // const [emblaRef, emblaApi] = useMemo(() => {
  //   if (!document) return;
  //   return useEmblaCarousel(options);
  // }, [document]);

  // const emblaApi = useRef<any>(null);

  // useEffect(() => {
  //   const viewportNode: HTMLElement =
  //     document.querySelector('.embla__viewport');
  //   if (viewportNode) {
  //     emblaApi.current = EmblaCarousel(viewportNode, options);
  //   }
  //   return () => {
  //     emblaApi.current?.destroy();
  //   };
  // }, []);

  useEffect(() => {
    // console.log('emblaApi', emblaApi?.current);
    console.log('emblaApi', emblaApi.value);
  }, [emblaApi]);

  const scrollPrev = useCallback(() => {
    // if (emblaApi) emblaApi.current.scrollPrev();
    if ($emblaApi) $emblaApi.scrollPrev();
  }, [$emblaApi]);

  const scrollNext = useCallback(() => {
    // if (emblaApi) emblaApi.current.scrollNext();
    if ($emblaApi) $emblaApi.scrollNext();
  }, [$emblaApi]);

  return (
    <>
      {/* <button
        className="embla__prev embla__nav__button embla__nav__button--prev"
        onClick={scrollPrev}
        // disabled={!isInitialized}
      >
        ← Prev
      </button> */}
      <Button
        data-slot="carousel-previous"
        // variant={variant}
        // size={size}
        className={cn(
          'inverted-icon embla__prev absolute -bottom-4 left-4 h-16 w-16 -translate-y-1/2 cursor-pointer rounded-full',
          // orientation === 'horizontal'
          //   ? '-bottom-4 left-4 -translate-y-1/2'
          //   : 'top-4 left-1/2 -translate-x-1/2 rotate-90',
          // className,
        )}
        // disabled={!emblaApi?.current?.canScrollPrev}
        disabled={!$emblaApi?.canScrollPrev}
        onClick={scrollPrev}
        // {...props}
      >
        <ArrowLeft />
        <span className="sr-only">Previous slide</span>
      </Button>

      {/* <button
        className="embla__next embla__nav__button embla__nav__button--next"
        onClick={scrollNext}
        // disabled={!isInitialized}
      >
        Next →
      </button> */}
      <Button
        data-slot="embla__next"
        // variant={variant}
        // size={size}
        className={cn(
          'inverted-icon embla__next absolute right-4 -bottom-4 h-16 w-16 -translate-y-1/2 cursor-pointer rounded-full',
          // orientation === 'horizontal'
          //   ? 'right-4 -bottom-4 -translate-y-1/2'
          //   : 'bottom-4 left-1/2 -translate-x-1/2 rotate-90',
        )}
        // disabled={!emblaApi?.current?.canScrollNext}
        disabled={!$emblaApi?.canScrollNext}
        onClick={scrollNext}
        // {...props}
      >
        <ArrowRight />
        <span className="sr-only">Next slide</span>
      </Button>
    </>
  );
};

export default GalleryNavOld;
