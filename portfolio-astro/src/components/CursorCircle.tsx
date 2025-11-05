import { useEffect, useRef, useState } from 'react';

interface CursorCircleProps {
  scrollPrev: () => void;
  scrollNext: () => void;
}

export default function CursorCircle(p: CursorCircleProps) {
  const elRef = useRef(null);
  const idleTimeout = useRef(null);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const handleEnter = () => setHidden(true);
    const handleLeave = () => setHidden(false);

    // Custom global events
    window.addEventListener('cursor:hide', handleEnter);
    window.addEventListener('cursor:show', handleLeave);

    return () => {
      window.removeEventListener('cursor:hide', handleEnter);
      window.removeEventListener('cursor:show', handleLeave);
    };
  }, []);

  useEffect(() => {
    const el = elRef.current;
    if (!el) return;

    // Start hidden
    el.style.opacity = '0';

    // Center the circle on the pointer
    const handleMove = (e) => {
      // Use pageX/Y to work with page scroll; clientX/Y also works if you want viewport coords
      const x = e.clientX;
      const y = e.clientY;
      // Set left/top directly for pixel-perfect placement
      // translate(-50%, -50%) in CSS keeps the element centered
      el.style.left = x + 'px';
      el.style.top = y + 'px';

      el.style.opacity = '1';
      // hide after 1200ms of inactivity
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
    opacity: hidden ? 0 : 1,
  };

  return (
    <>
      <div aria-hidden="true">
        <div
          ref={elRef}
          className="pointer-events-none fixed z-[9999] h-7 w-7 rounded-full bg-white mix-blend-difference shadow-sm select-none"
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

      <div
        style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'black',
          zIndex: -1,
        }}
      />
    </>
  );
}
