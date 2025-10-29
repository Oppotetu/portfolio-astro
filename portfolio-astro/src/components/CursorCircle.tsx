import { useEffect, useRef } from 'react';

interface CursorCircleProps {
  scrollPrev: () => void;
  scrollNext: () => void;
  visibleOnMoveOnly: boolean;
}

export default function CursorCircle(p: CursorCircleProps) {
  const elRef = useRef(null);
  const idleTimeout = useRef(null);

  useEffect(() => {
    const el = elRef.current;
    if (!el) return;

    // Start hidden if requested
    if (p.visibleOnMoveOnly) el.style.opacity = '0';

    // Center the circle on the pointer
    const handleMove = (e) => {
      // Use pageX/Y to work with page scroll; clientX/Y also works if you want viewport coords
      const x = e.clientX;
      const y = e.clientY;
      // Set left/top directly for pixel-perfect placement
      // translate(-50%, -50%) in CSS keeps the element centered
      el.style.left = x + 'px';
      el.style.top = y + 'px';

      if (p.visibleOnMoveOnly) {
        el.style.opacity = '1';
        // hide after 1200ms of inactivity
        if (idleTimeout.current) clearTimeout(idleTimeout.current);
        idleTimeout.current = setTimeout(() => {
          el.style.opacity = '0';
        }, 1200);
      }
    };

    const handleLeave = () => {
      if (p.visibleOnMoveOnly) el.style.opacity = '0';
    };

    window.addEventListener('mousemove', handleMove);
    window.addEventListener('mouseout', handleLeave);

    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseout', handleLeave);
      if (idleTimeout.current) clearTimeout(idleTimeout.current);
    };
  }, [p.visibleOnMoveOnly]);

  // Inline style for customizable size and background color.
  // Tailwind handles positioning, shape, pointer-events and mix-blend.
  const style = {
    width: '28px',
    height: '28px',
    background: 'white',
    // keep on top but allow normal page interactions (pointer-events-none)
    zIndex: 9999,
    // center using transform; left/top are set directly in JS
    transform: 'translate(-50%, -50%)',
    transition: 'opacity 160ms linear',
    willChange: 'left, top, opacity',
  };

  return (
    // The wrapper covers whole viewport so mix-blend has something to compare against.
    // Note: The circle itself is fixed so it moves relative to viewport.
    <>
      <div aria-hidden="true">
        <div
          ref={elRef}
          className={
            'pointer-events-none fixed rounded-full mix-blend-difference shadow-sm select-none'
          }
          style={style}
        />
      </div>
      <button
        onClick={p.scrollPrev}
        className="fixed top-0 left-0 z-50 h-screen w-1/2 bg-transparent"
      />
      <button
        onClick={p.scrollNext}
        className="fixed top-0 right-0 z-50 h-screen w-1/2 bg-transparent"
      />

      <div className="fixed top-0 left-0 z-0 h-screen bg-slate-800" />
    </>
  );
}

/* Usage:

1. Install and enable Tailwind CSS in your project (Tailwind is used for utility classes here).
2. Import and render <CursorCircle /> near the root of your app (e.g. in App.jsx or layout file):

   import CursorCircle from './CursorCircle';
   function App(){
     return (
       <>
         <CursorCircle size={36} bg="white" />
         <MainApp />
       </>
     )
   }

3. If you want the default system cursor hidden, add this CSS somewhere global (e.g. in index.css):

   /* hide native cursor so our circle "replaces" it */
//    body, * {
//      cursor: none;
//    }

/* If you'd rather only hide on non-form controls, use: */
/* :not(input):not(textarea):not(select) { cursor: none; } */

// 4. Notes & tweaks:
//    - mix-blend-difference works best on colorful or photographic backgrounds; adjust `bg` (white/black)
//      for different visual effects.
//    - `visibleOnMoveOnly` will fade the circle out after a short idle period.
//    - We update the DOM directly (style.left/top) to achieve pixel-by-pixel movement without React
//      re-renders or smoothing.
// */
