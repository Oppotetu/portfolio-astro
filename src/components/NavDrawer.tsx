import { useState } from 'react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './ui/sheet';
import { useStore } from '@nanostores/react';
import { carouselApi, currentProject } from '@/lib/store';
import type { Project } from '@/lib/types';
import AboutDrawer from './AboutDrawer';

interface NavDrawerProps {
  projects: Project[];
}

export default function NavDrawer(p: NavDrawerProps) {
  const [openLeft, setOpenLeft] = useState(false);
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

  const handleProjectClick = (project: Project) => {
    if (!$carouselApi || project.slideIndexStart === undefined) return;
    setOpenLeft(false);
    $carouselApi.scrollTo(project.slideIndexStart);
  };

  return (
    <Sheet open={openLeft} onOpenChange={setOpenLeft}>
      <SheetTrigger className="absolute">
        <div
          className="inverted-text title title-left title-size z-30"
          aria-hidden={true}
        >
          Crakc
        </div>
        <h1 className="title title-left title-stroked title-size z-40">
          Crakc
        </h1>
      </SheetTrigger>
      <SheetContent
        side="left"
        className="border-r-primary border-r-1"
        // className="w-[40%] overflow-auto sm:max-w-[40%]"
        aria-describedby={undefined}
      >
        <SheetHeader className="mt-8 pr-0">
          <ul className="">
            <li className="border-y-primary border-y-1 pt-0.5 pb-2">
              <a href="/about">
                <SheetTitle className="text-xl">About me</SheetTitle>
              </a>
            </li>
            <li className="pt-0.5 pb-2">
              <AboutDrawer />
            </li>
          </ul>
          <ul className="mt-4">
            <li className="border-y-primary border-y-1 pt-0.5 pb-2">
              <SheetTitle className="text-xl">Projects</SheetTitle>
            </li>
            {p.projects.map((project) => (
              <li
                key={project.slug}
                className="border-b-primary border-b-1 pt-0.5 pb-2 pl-4"
              >
                {/* <button onClick={() => handleProjectClick(project)}> */}
                <button
                  onClick={() => handleProjectClick(project)}
                  className="cursor-pointer"
                >
                  <SheetTitle
                    className={`text-left text-xl ${
                      $currentProject === project.slug
                        ? 'text-slate-500'
                        : 'black'
                    }`}
                  >
                    {/* {p.projects?.find((p) => p.projects === project)?.title} */}
                    {project.title}
                  </SheetTitle>
                </button>
              </li>
            ))}
          </ul>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
