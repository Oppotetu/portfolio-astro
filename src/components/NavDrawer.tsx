import { useState } from 'react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './ui/sheet';
import { useStore } from '@nanostores/react';
import { carouselApi, currentProject, emblaApi } from '@/lib/store';
import type { Project } from '@/lib/types';
import AboutDrawer from './AboutDrawer';
import TableList from './TableList';
import ProjectInfoDrawer from './ProjectInfoDrawer';

interface NavDrawerProps {
  projects: Project[];
  projectParam: string;
}

export default function NavDrawer(p: NavDrawerProps) {
  const [openLeft, setOpenLeft] = useState(false);
  const [openAbout, setOpenAbout] = useState(false);
  const [openProject, setOpenProject] = useState(false);
  const $carouselApi = useStore(carouselApi);
  const $emblaApi = useStore(emblaApi);
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
    console.log('project', project);
    if (!$emblaApi || project.slideIndexStart === undefined) return;
    setOpenLeft(false);
    $emblaApi.scrollTo(project.slideIndexStart);
  };

  return (
    <>
      <Sheet open={openLeft} onOpenChange={setOpenLeft}>
        <SheetTrigger className="absolute">
          <div
            className="inverted-text title title-left title-size z-30"
            aria-hidden={true}
          >
            Dagsson
          </div>
          <h1 className="title title-left title-stroked title-size z-40">
            Dagsson
          </h1>
        </SheetTrigger>
        <SheetContent
          side="left"
          // className="w-[40%] overflow-auto sm:max-w-[40%]"
          aria-describedby={undefined}
        >
          <SheetHeader className="px-2">
            <TableList
              header="Projects"
              items={p.projects?.map((pro) => ({
                name: pro.title,
                handleClick: () => handleProjectClick(pro),
              }))}
            />
            <TableList
              header="Info"
              items={[
                {
                  name: 'About me',
                  handleClick: () => {
                    setOpenLeft(false);
                    setOpenAbout(true);
                  },
                },
                {
                  name: 'About this project',
                  handleClick: () => {
                    setOpenLeft(false);
                    setOpenProject(true);
                  },
                },
              ]}
            />
          </SheetHeader>
        </SheetContent>
      </Sheet>
      <AboutDrawer openAbout={openAbout} setOpenAbout={setOpenAbout} />
      <ProjectInfoDrawer
        project={p.projects?.find((pro) => pro.slug === p.projectParam)}
        openProject={openProject}
        setOpenProject={setOpenProject}
      />
    </>
  );
}
