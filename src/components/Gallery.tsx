import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { carouselApi, currentProject } from '@/lib/store';
import type { ImageEntry } from '@/lib/types';
import { useStore } from '@nanostores/react';
import Image from 'astro/components/Image.astro';
import type { EmblaCarouselType } from 'node_modules/embla-carousel/esm/components/EmblaCarousel';
import { useEffect, useRef } from 'react';

interface GalleryProps {
  images: ImageEntry[];
}

export default function Gallery(p: GalleryProps) {
  const $carouselApi = useStore(carouselApi);
  const $currentProject = useStore(currentProject);
  // const currentProjectRef = useRef(currentProject.value);

  useEffect(() => {
    console.log('carouselApi', $carouselApi);
  }, [$carouselApi]);

  //   useEffect(() => {
  //     currentProjectRef.current = currentProject
  //   }, [currentProject])

  //   useEffect(() => {
  //     if (!$carouselApi || !document) return
  //     document.addEventListener('keydown', handleKeyDown)
  //     $carouselApi.on('select', handleSlideChange)
  //     return () => {
  //       document.removeEventListener('keydown', handleKeyDown)
  //       $carouselApi.off('select', handleSlideChange)
  //     }
  //   }, [$carouselApi])

  //   const handleSlideChange = () => {
  //     if (!$carouselApi) return
  //     const newCurrentProject =
  //       imageArray[$carouselApi.selectedScrollSnap()].split('/')[2]
  //     if (
  //       currentProjectRef.current &&
  //       newCurrentProject !== currentProjectRef.current
  //     ) {
  //       setCurrentProject(newCurrentProject)
  //     }
  //   }

  //   const handleKeyDown = (event: KeyboardEvent) => {
  //     if (!$carouselApi) return;
  //     event.preventDefault();
  //     if (event.key === 'ArrowLeft') {
  //       $carouselApi.scrollPrev();
  //     }
  //     if (event.key === 'ArrowRight') {
  //       $carouselApi.scrollNext();
  //     }
  //   };

  useEffect(() => {
    if (!$carouselApi || !document) return;
    document.addEventListener('keydown', handleKeyDown);
    $carouselApi.on('select', (event) => handleSlideChange(event));
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      $carouselApi.off('select', handleSlideChange);
    };
  }, [$carouselApi]);

  const handleKeyDown = (event: KeyboardEvent) => {
    if (!$carouselApi) return;
    event.preventDefault();
    if (event.key === 'ArrowLeft') {
      $carouselApi.scrollPrev();
    }
    if (event.key === 'ArrowRight') {
      $carouselApi.scrollNext();
    }
  };

  const handleSlideChange = (event: EmblaCarouselType) => {
    if (!$carouselApi) return;
    console.log('event', event.selectedScrollSnap());
    // const newCurrentProject =
    //   imageArray[$carouselApi.selectedScrollSnap()].split('/')[2];
    // if (
    //   currentProjectRef.current &&
    //   newCurrentProject !== currentProjectRef.current
    // ) {
    //   setCurrentProject(newCurrentProject);
    // }
  };

  return (
    <Carousel
      setApi={carouselApi.set}
      opts={{
        loop: true,
      }}
    >
      <CarouselContent>
        {p.images.map((image, index) => (
          <CarouselItem
            key={`${image.filepath}-${index}`}
            id={`#${image.project}-${index}`}
            className="flex justify-center"
          >
            <img
              src={image.filepath}
              alt={image.filename}
              className="max-h-screen object-contain"
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="inverted-icon" />
      <CarouselNext className="inverted-icon" />
    </Carousel>
  );
}

//  className={cn(
//         "absolute left-0 top-0 h-full w-1/2 opacity-0 focus:shadow-none focus:outline-none focus:ring-0 disabled:opacity-0",
//         orientation === "horizontal" ? "left-0 top-0 h-full" : "left-0 top-0",
//         className,
//       )}
//   className={cn(
//         "absolute right-0 top-0 h-full w-1/2 opacity-0 focus:shadow-none focus:outline-none focus:ring-0 disabled:opacity-0",
//         orientation === "horizontal" ? "right-0 top-0 h-full" : "right-0 top-0",
//         className,
//       )}
