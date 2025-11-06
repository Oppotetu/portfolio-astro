import { useState } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from './ui/sheet';
import { useStore } from '@nanostores/react';
import { swiperApi } from '@/lib/store';
import type { Project } from '@/lib/types';
import AboutDrawer from './AboutDrawer';
import TableList from './TableList';
import ProjectInfoDrawer from './ProjectInfoDrawer';

interface NavDrawerProps {
  projects: Project[];
}

export default function NavDrawer(p: NavDrawerProps) {
  const [openLeft, setOpenLeft] = useState(false);
  const [openAbout, setOpenAbout] = useState(false);
  const [openProject, setOpenProject] = useState(false);
  const $swiperApi = useStore(swiperApi);

  const academic = p.projects
    .filter((pro) => pro.assignmentType === 'academic')
    .sort((a, b) => a.slideIndexRange[0] - b.slideIndexRange[0]);
  const professional = p.projects
    .filter((pro) => pro.assignmentType === 'professional')
    .sort((a, b) => a.slideIndexRange[0] - b.slideIndexRange[0]);
  const publications = p.projects
    .filter((pro) => pro.assignmentType === 'publication')
    .sort((a, b) => a.slideIndexRange[0] - b.slideIndexRange[0]);

  const handleProjectClick = (project: Project) => {
    if (!$swiperApi || !project.slideIndexRange?.length) return;
    setOpenLeft(false);
    $swiperApi.slideTo(project.slideIndexRange[0]);
  };

  return (
    <>
      <Sheet open={openLeft} onOpenChange={setOpenLeft}>
        <SheetTrigger className="absolute" asChild>
          {/* <DirectionButton label="Dagsson" /> */}
          <button
            className="inverted-text title title-left title-size absolute z-30"
            aria-hidden={true}
            onMouseEnter={() => window.dispatchEvent(new Event('cursor:hide'))}
            onMouseLeave={() => window.dispatchEvent(new Event('cursor:show'))}
          >
            Dagsson
          </button>
        </SheetTrigger>
        <SheetContent
          side="left"
          className="cursor-auto bg-black"
          aria-describedby={undefined}
        >
          <SheetHeader className="flex h-full flex-col overflow-auto px-2">
            <TableList
              header="Profesjonelle prosjekter"
              items={professional?.map((pro) => ({
                name: pro.title,
                handleClick: () => handleProjectClick(pro),
              }))}
            />
            <TableList
              header="Akademiske prosjekter"
              items={academic?.map((pro) => ({
                name: pro.title,
                handleClick: () => handleProjectClick(pro),
              }))}
            />
            <TableList
              header="Publikasjoner"
              items={publications?.map((pro) => ({
                name: pro.title,
                handleClick: () => handleProjectClick(pro),
              }))}
            />
            <div className="mt-auto">
              <TableList
                items={[
                  {
                    name: 'Om meg',
                    handleClick: () => {
                      setOpenLeft(false);
                      setOpenAbout(true);
                    },
                  },
                  {
                    name: 'Om dette prosjektet',
                    handleClick: () => {
                      setOpenLeft(false);
                      setOpenProject(true);
                    },
                  },
                ]}
              />
            </div>
          </SheetHeader>
        </SheetContent>
      </Sheet>
      <AboutDrawer openAbout={openAbout} setOpenAbout={setOpenAbout} />
      <ProjectInfoDrawer
        projects={p.projects}
        openProject={openProject}
        setOpenProject={setOpenProject}
      />
    </>
  );
}
