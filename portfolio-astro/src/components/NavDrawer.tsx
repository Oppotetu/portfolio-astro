import { useEffect, useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from "./ui/sheet";
import { useStore } from "@nanostores/react";
import { swiperApi } from "@/lib/store";
import type { Project } from "@/lib/types";
import AboutDrawer from "./AboutDrawer";
import TableList from "./TableList";
import ProjectInfoDrawer from "./ProjectInfoDrawer";

interface NavDrawerProps {
  projects: Project[];
  projectParam: string;
}

export default function NavDrawer(p: NavDrawerProps) {
  const [openLeft, setOpenLeft] = useState(false);
  const [openAbout, setOpenAbout] = useState(false);
  const [openProject, setOpenProject] = useState(false);
  const $swiperApi = useStore(swiperApi);

  const academic = p.projects.filter((pro) => pro.assignmentType === 'academic').sort((a, b) => a.slideIndexRange[0] - b.slideIndexRange[0])
  const professional = p.projects.filter((pro) => pro.assignmentType === 'professional').sort((a, b) => a.slideIndexRange[0] - b.slideIndexRange[0])
  const publications = p.projects.filter((pro) => pro.assignmentType === 'publication').sort((a, b) => a.slideIndexRange[0] - b.slideIndexRange[0])

  const handleProjectClick = (project: Project) => {
    if (!$swiperApi || !project.slideIndexRange?.length) return;
    setOpenLeft(false);
    $swiperApi.slideTo(project.slideIndexRange[0]);
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
        <SheetContent side="left" aria-describedby={undefined}>
          <SheetHeader className="px-2 flex flex-col h-full overflow-auto">
            <TableList
              header="Profesjonelle prosjekter"
              items={professional?.map((pro) => ({
                name: pro.title,
                handleClick: () => handleProjectClick(pro),
              }))}
            />
            <TableList
              header="Akademisk prosjekter"
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
                    name: "About me",
                    handleClick: () => {
                      setOpenLeft(false);
                      setOpenAbout(true);
                    },
                  },
                  {
                    name: "About this project",
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
        // project={p.projects?.find((pro) => pro.slug === p.projectParam)}
        project={p.projects?.find((pro) => pro.slideIndexRange.includes($swiperApi?.activeIndex))}
        openProject={openProject}
        setOpenProject={setOpenProject}
      />
    </>
  );
}
