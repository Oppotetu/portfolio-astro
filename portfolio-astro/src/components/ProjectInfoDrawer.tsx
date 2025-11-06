import { useState, type Dispatch, type SetStateAction } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from './ui/sheet';
import TableList from './TableList';
import type { Project } from '@/lib/types';
import { useStore } from '@nanostores/react';
import { currentProject } from '@/lib/store';

const assignmentTranslator = {
  professional: 'Profesjonell',
  academic: 'Akademisk',
  publication: 'Publication',
};

interface ProjectInfoDrawerProps {
  projects: Project[];
  includeTrigger?: boolean;
  openProject?: boolean;
  setOpenProject?: Dispatch<SetStateAction<boolean>>;
}

const ProjectInfoDrawer = (p: ProjectInfoDrawerProps) => {
  const [openProject, setOpenProject] = useState(false);
  const $currentProject = useStore(currentProject);

  const authors = $currentProject?.authors?.filter((a) => a.trim().length > 0);

  const spreadInto = (key: string, value: string | string[] | number) => {
    if (typeof value === 'number') {
      return value?.toString().length ? [`${key}: ${value}`] : [];
    } else {
      return value?.length ? [`${key}: ${value}`] : [];
    }
  };

  return (
    <Sheet
      open={p.openProject ?? openProject}
      onOpenChange={p.setOpenProject ?? setOpenProject}
    >
      {p.includeTrigger && (
        <SheetTrigger className="absolute mt-7" asChild>
          <button
            className="inverted-text title title-right absolute z-30 cursor-none transition-all duration-300 ease-in-out hover:-skew-x-12"
            aria-hidden={true}
          >
            {$currentProject?.title}
          </button>
        </SheetTrigger>
      )}
      <SheetContent
        side="right"
        className="dark:bg-black"
        aria-describedby={undefined}
      >
        <SheetHeader className="px-2">
          <TableList
            header={$currentProject?.title}
            items={[
              ...spreadInto('Publisert', $currentProject?.publishedYear),
              ...spreadInto('Kvadratmeter', $currentProject?.squareFootage),
              ...spreadInto('Medforfattere', authors?.join(', ')),
              ...spreadInto(
                'Oppdragstype',
                assignmentTranslator[$currentProject?.assignmentType]
              ),
              ...spreadInto('Oppsummering', $currentProject?.summary),
            ]}
          />
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};
export default ProjectInfoDrawer;
