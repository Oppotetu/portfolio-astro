'use client';

import { useState } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from './ui/sheet';
import AboutDrawer from './AboutDrawer';
import { type CarouselApi } from './ui/carousel';
import { useStore } from '@nanostores/react';
import { carouselApi, currentProject } from '@/lib/store';
import type { Project } from '@/lib/types';

interface NavDrawerProps {
  pathname: string;
  projects: Project[];
}

export default function NavDrawer(p: NavDrawerProps) {
  const [openLeft, setOpenLeft] = useState(false);
  const [api, setApi] = useState<CarouselApi>();
  // const [currentProject, setCurrentProject] = useState<string>(firstProject);
  const $carouselApi = useStore(carouselApi);
  const $currentProject = useStore(currentProject);

  // const scrollTo = (value: string) => {
  //   if (!$carouselApi) return
  //   const imagePath = p.imageArray.find((i) => i.includes(value))
  //   if (!imagePath) return
  //   const newIndex = p.imageArray.indexOf(imagePath)
  //   api.scrollTo(newIndex)
  // }

  // const handleProjectClick = (value: string) => {
  //   if (p.pathname !== '/projects') {
  //     window.location.href = '/projects'
  //     setTimeout(() => scrollTo(value), 3000)
  //   } else {
  //     scrollTo(value)
  //   }
  //   currentProject.set(value)
  //   setOpenLeft(false)
  // }

  return (
    <>
      <Sheet open={openLeft} onOpenChange={setOpenLeft}>
        <SheetTrigger className="absolute">
          <div
            className="title title-left title-size flex w-8"
            aria-hidden={true}
          >
            Crakc
          </div>
          <h1 className="title title-left title-stroked title-size">Crakc</h1>
        </SheetTrigger>
        {/* <SheetTrigger className="inverted-text absolute left-1 top-1 z-30 border-4 p-1 text-3xl md:text-5xl lg:text-7xl">
          JD
        </SheetTrigger> */}
        <SheetContent
          side="left"
          // className="w-[40%] overflow-auto sm:max-w-[40%]"
          aria-describedby={undefined}
        >
          <SheetHeader>
            <ul className="pt-2">
              <li className="py-1.5">
                <AboutDrawer />
                {/* <button onClick={() => handleLinkClick("about")}>
                <SheetTitle className="text-left text-xl">INFO</SheetTitle>
              </button> */}
              </li>
              {/* {p.slugs.map((slug) => (
                <li key={slug} className="py-1.5">
                  <button onClick={() => handleProjectClick(slug)}>
                    <SheetTitle
                      className={`text-left text-xl ${
                        $currentProject === slug ? 'text-slate-500' : 'black'
                      }`}
                    >
                      {p.projects?.find((p) => p.slug === slug)?.title}
                    </SheetTitle>
                  </button>
                </li>
              ))} */}
            </ul>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </>
  );
}
