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
    <Sheet open={openAbout} onOpenChange={setOpenAbout}>
      <SheetTrigger className="absolute" asChild>
        <button
          className="inverted-text title title-left title-size absolute z-30 cursor-none transition-all duration-300 ease-in-out hover:-skew-x-4"
          aria-hidden={true}
        >
          Dagsson
        </button>
      </SheetTrigger>
      <SheetContent
        side="left"
        className="dark:bg-black"
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
