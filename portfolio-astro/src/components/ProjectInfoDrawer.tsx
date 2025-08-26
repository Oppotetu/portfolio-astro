import { useEffect, useState, type Dispatch, type SetStateAction } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from './ui/sheet';
import TableList from './TableList';
import type { Project } from '@/lib/types';
import { useStore } from '@nanostores/react';
import { swiperApi } from '@/lib/store';

const assignmentTranslator = {
  professional: 'Profesjonell',
  academic: 'Akademisk',
  publication: 'Publication'
}

interface ProjectInfoDrawerProps {
  projects: Project[];
  includeTrigger?: boolean;
  openProject?: boolean;
  setOpenProject?: Dispatch<SetStateAction<boolean>>;
}

const ProjectInfoDrawer = (p: ProjectInfoDrawerProps) => {
  const [openProject, setOpenProject] = useState(false);
  const $swiperApi = useStore(swiperApi);

  const currentProject = p.projects?.find((pro) => pro.slideIndexRange.includes($swiperApi?.activeIndex))

  const authors = currentProject?.authors?.filter((a) => a.trim().length > 0)

  const spreadInto = (key: string, value: string | string[] | number) => {
    if (typeof value === 'number') {
      return value?.toString().length ? [`${key}: ${value}`] : []
    } else {
      return value?.length ? [`${key}: ${value}`] : []
    }
  }

  return (
    <Sheet
      open={p.openProject ?? openProject}
      onOpenChange={p.setOpenProject ?? setOpenProject}
    >
      {p.includeTrigger && (
        <SheetTrigger className="absolute mt-7" asChild>
          <button className="inverted-text absolute title title-right z-30" aria-hidden={true}>
            {currentProject?.title}
          </button>
        </SheetTrigger>
      )
      }
      <SheetContent
        side="right"
        aria-describedby={undefined}
      >
        <SheetHeader className="px-2">
          <TableList
            header={currentProject?.title}
            items={[
              ...spreadInto('Publisert', currentProject?.publishedYear),
              ...spreadInto('Kvadratmeter', currentProject?.squareFootage),
              ...spreadInto('Medforfattere', authors?.join(', ')),
              ...spreadInto('Oppdragstype', assignmentTranslator[currentProject?.assignmentType]),
              ...spreadInto('Oppsummering', currentProject?.summary),
            ]}
          />
        </SheetHeader>
      </SheetContent>
    </Sheet >
  );
};
export default ProjectInfoDrawer;
