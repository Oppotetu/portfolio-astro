import { useEffect, useRef } from 'react';

interface CursorCircleProps {
  scrollPrev: () => void;
  scrollNext: () => void;
}

export default function CursorCircle(p: CursorCircleProps) {
  const elRef = useRef(null);
  const idleTimeout = useRef(null);

  useEffect(() => {
    const el = elRef.current;
    if (!el) return;

    // hack for at cursorcircle skal gå over shadcn dark mode button
    if (el.parentElement !== document.body) {
      document.body.appendChild(el);
    }

    el.style.opacity = '0';

    const handleMove = (e) => {
      const x = e.clientX;
      const y = e.clientY;

      el.style.left = x + 'px';
      el.style.top = y + 'px';

      el.style.opacity = '1';

      // gjem cursorcircle etter 1200 ms
      if (idleTimeout.current) clearTimeout(idleTimeout.current);
      idleTimeout.current = setTimeout(() => {
        el.style.opacity = '0';
      }, 1200);
    };

    const handleLeave = () => {
      el.style.opacity = '0';
    };

    window.addEventListener('mousemove', handleMove);
    window.addEventListener('mouseout', handleLeave);

    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseout', handleLeave);
      if (idleTimeout.current) clearTimeout(idleTimeout.current);
    };
  }, []);

  // Inline style for customizable size and background color.
  // Tailwind handles positioning, shape, pointer-events and mix-blend.
  const style = {
    transform: 'translate(-50%, -50%)',
    transition: 'opacity 160ms linear',
    willChange: 'left, top, opacity',
  };

  return (
    <>
      <div aria-hidden="true">
        <div
          ref={elRef}
          className="pointer-events-none fixed z-[9999] hidden h-7 w-7 rounded-full bg-white mix-blend-difference shadow-sm select-none sm:block"
          style={style}
        />
      </div>
      <button
        onClick={p.scrollPrev}
        className="fixed top-0 left-0 z-50 hidden h-screen w-1/2 cursor-none bg-transparent focus:ring-0 focus:outline-none sm:block"
      />
      <button
        onClick={p.scrollNext}
        className="fixed top-0 right-0 z-50 hidden h-screen w-1/2 cursor-none bg-transparent focus:ring-0 focus:outline-none sm:block"
      />

      <div className="fixed inset-0 -z-10 bg-white dark:bg-black" />
    </>
  );
}
