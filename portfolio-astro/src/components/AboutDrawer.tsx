import { useState, type Dispatch, type SetStateAction } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from './ui/sheet';
import TableList from './TableList';

interface AboutDrawerProps {
  openAbout?: boolean;
  setOpenAbout?: Dispatch<SetStateAction<boolean>>;
}

const AboutDrawer = (p: AboutDrawerProps) => {
  const [openAbout, setOpenAbout] = useState(false);
  return (
    <Sheet
      open={p.openAbout ?? openAbout}
      onOpenChange={p.setOpenAbout ?? setOpenAbout}
    >
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
export default AboutDrawer;
