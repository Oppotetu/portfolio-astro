'use client';
import { Fragment, useEffect, useRef, useState, type ReactNode } from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { useStore } from '@nanostores/react';
import imageList from '../data/imageList.json';
import { carouselApi, currentProject } from '@/lib/store';
import type { ImageEntry } from '@/lib/types';

interface GalleryProps {
  images: ImageEntry[];
}

export default function Gallery(p: GalleryProps) {
  useEffect(() => {
    console.log('iamges', p.images);
  }, [p.images]);

  //   const $carouselApi = useStore(carouselApi);
  //   const $currentProject = useStore(currentProject);
  //   const currentProjectRef = useRef(currentProject.value);

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

  return (
    <Carousel>
      <CarouselContent>
        {p.images.map((image, index) => (
          <CarouselItem
            key={`${image.filepath}-${index}`}
            className="flex justify-center"
          >
            <img
              //   key={`${image.slug}-${index}`}
              src={image.filepath}
              alt={image.filename}
              className="max-h-screen max-w-screen object-contain"
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>

    // // <Carousel setApi={setApi} >
    // <Carousel>
    //   <CarouselContent>
    //     {imageEntries.map(([folderSlug, images], index) => (
    //       <Fragment key={folderSlug + index}>
    //         {images.map((src, index) => (
    //           <CarouselItem
    //             key={`${folderSlug}-${src}-${index + 1}`}
    //             className="flex justify-center"
    //           >
    //             <img
    //               src={src}
    //               alt={`${folderSlug} ${index + 1}`}
    //               className="max-h-screen max-w-screen object-contain"
    //             />
    //           </CarouselItem>
    //         ))}
    //       </Fragment>
    //     ))}
    //   </CarouselContent>
    //   <CarouselPrevious />
    //   <CarouselNext />
    // </Carousel>
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
