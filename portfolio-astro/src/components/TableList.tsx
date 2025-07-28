import { SheetTitle } from './ui/sheet';

interface ListItem {
  name: string;
  handleClick: () => void;
}

interface TableListProps {
  header: string;
  items: (string | ListItem)[];
}

const TableList = (p: TableListProps) => {
  return (
    <ul className="mt-8">
      <li className="border-t-primary border-t-1 pt-2 pb-5">
        <SheetTitle className="text-2xl">{p.header}</SheetTitle>
      </li>
      {p.items?.map((item, index) => (
        <li
          key={typeof item === 'string' ? item : item.name}
          className="border-b-primary border-b-1 py-1"
        >
          {typeof item === 'string' ? (
            <SheetTitle className="text-lg">{item}</SheetTitle>
          ) : (
            <button onClick={item.handleClick} className="cursor-pointer">
              <SheetTitle
                className="text-left text-lg"
                // className={`text-left text-lg ${
                //   $currentProject === item.name ? 'text-slate-500' : 'black'
                // }`}
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
