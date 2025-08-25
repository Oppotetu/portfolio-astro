import { useEffect, useState, type Dispatch, type SetStateAction } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from './ui/sheet';
import TableList from './TableList';
import type { Project } from '@/lib/types';

const assignmentTranslator = {
  professional: 'Profesjonell',
  academic: 'Akademisk',
  publication: 'Publication'
}

interface ProjectInfoDrawerProps {
  project: Project;
  includeTrigger?: boolean;
  openProject?: boolean;
  setOpenProject?: Dispatch<SetStateAction<boolean>>;
}

const ProjectInfoDrawer = (p: ProjectInfoDrawerProps) => {
  const [openProject, setOpenProject] = useState(false);

  // useEffect(() => {
  //   console.log('autohrs', p.project.authors);
  // }, [p.project.authors]);

  const authors = p.project?.authors?.filter((a) => a.trim().length > 0)

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
        <SheetTrigger className="absolute right-2 z-30" asChild>
          <button className="title-size text-xl">+</button>
        </SheetTrigger>
      )}
      <SheetContent
        // className="w-[60%] overflow-auto sm:max-w-[60%]"
        side="right"
        aria-describedby={undefined}
      >
        <SheetHeader className="px-2">
          <TableList
            header={p.project?.title}
            items={[
              ...spreadInto('Publisert', p.project?.publishedYear),
              ...spreadInto('Kvadratmeter', p.project?.squareFootage),
              ...spreadInto('Medforfattere', authors?.join(', ')),
              ...spreadInto('Oppdragstype', assignmentTranslator[p.project?.assignmentType]),
              ...spreadInto('Oppsummering', p.project?.summary),
            ]}
          />
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};
export default ProjectInfoDrawer;
