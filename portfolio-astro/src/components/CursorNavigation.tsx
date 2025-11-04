import { cn } from '@/lib/utils';
import { Button } from './ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import './CursorNavigation.css';

interface CursorNavigationProps {
  scrollPrev: () => void;
  scrollNext: () => void;
}

const CursorNavigation = (p: CursorNavigationProps) => {
  return (
    <div className="fixed top-0 right-0 h-screen w-1/2 bg-white">
      <Button
        className={cn(
          'next-button absolute z-40 h-10 w-10 rounded-full bg-black mix-blend-difference'
        )}
        onClick={p.scrollNext}
      >
        <ArrowRight className="text-black" />
        <span className="sr-only">Next slide</span>
      </Button>
      {/* <Button
        className={cn(
          'next-button inverted-icon absolute right-4 -bottom-4 z-40 h-16 w-16 -translate-y-1/2 cursor-pointer rounded-full hover:bg-white focus:bg-white'
        )}
        onClick={p.scrollNext}
      >
        <ArrowRight className="text-black" />
        <span className="sr-only">Next slide</span>
      </Button> */}
      {/* <div className="next-button absolute right-4 -bottom-4 z-0 h-16 w-16 -translate-y-1/2 rounded-full bg-white" /> */}
    </div>
  );
};

export default CursorNavigation;
