import { useState, type Dispatch, type SetStateAction } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from './ui/sheet';
import TableList from './TableList';
import type { Project } from '@/lib/types';

interface ProjectInfoDrawerProps {
  project: Project;
  includeTrigger?: boolean;
  openProject?: boolean;
  setOpenProject?: Dispatch<SetStateAction<boolean>>;
}

const ProjectInfoDrawer = (p: ProjectInfoDrawerProps) => {
  const [openProject, setOpenProject] = useState(false);
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
            header="JOHANNES ØRN DAGSSON ARKITEKT MNAL"
            items={[
              'Uelands gate 57E',
              'NO-0457 Oslo',
              'post@dagsson.no',
              'Org.nr: 922358141',
            ]}
          />
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};
export default ProjectInfoDrawer;
