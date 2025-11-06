import { useStore } from '@nanostores/react';
import { SheetTitle } from './ui/sheet';
import { currentProject } from '@/lib/store';

interface ListItem {
  name: string;
  handleClick: () => void;
}

interface TableListProps {
  header?: string;
  items: (string | ListItem)[];
}

const TableList = (p: TableListProps) => {
  const $currentProject = useStore(currentProject);

  return (
    <ul className="mt-8">
      {p.header && (
        <li className="border-t-1 border-black pt-2 pb-5 dark:border-white">
          <SheetTitle className="text-2xl">{p.header}</SheetTitle>
        </li>
      )}
      {p.items?.map((item) => (
        <li
          key={typeof item === 'string' ? item : item.name}
          className="border-b-1 border-black py-1 dark:border-white"
        >
          {typeof item === 'string' ? (
            <SheetTitle className="text-lg">{item}</SheetTitle>
          ) : (
            <button onClick={item.handleClick} className="cursor-pointer">
              <SheetTitle
                className={`text-left text-lg ${$currentProject?.title === item.name ? 'text-slate-500' : 'text-black'}`}
              >
                {item.name}
              </SheetTitle>
            </button>
          )}
        </li>
      ))}
    </ul>
  );
};

export default TableList;
