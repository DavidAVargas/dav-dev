"use client";

import { useEffect, useRef } from "react";

export function CursorTrail() {
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: -100, y: -100 });
  const outer = useRef({ x: -100, y: -100 });
  const inner = useRef({ x: -100, y: -100 });
  const visible = useRef(false);

  useEffect(() => {
    // Hide default cursor on desktop
    document.body.style.cursor = "none";

    const onMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      if (!visible.current) {
        outer.current = { x: e.clientX, y: e.clientY };
        inner.current = { x: e.clientX, y: e.clientY };
        visible.current = true;
      }
    };

    const onLeave = () => {
      visible.current = false;
      if (outerRef.current) outerRef.current.style.opacity = "0";
      if (innerRef.current) innerRef.current.style.opacity = "0";
    };

    const onEnter = () => {
      visible.current = true;
      if (outerRef.current) outerRef.current.style.opacity = "1";
      if (innerRef.current) innerRef.current.style.opacity = "1";
    };

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);

    let frame: number;

    const animate = () => {
      // Outer ring — lazy follow
      outer.current.x += (mouse.current.x - outer.current.x) * 0.1;
      outer.current.y += (mouse.current.y - outer.current.y) * 0.1;

      // Inner dot — snappy follow
      inner.current.x += (mouse.current.x - inner.current.x) * 0.3;
      inner.current.y += (mouse.current.y - inner.current.y) * 0.3;

      if (outerRef.current) {
        outerRef.current.style.transform = `translate(${outer.current.x - 18}px, ${outer.current.y - 18}px)`;
      }
      if (innerRef.current) {
        innerRef.current.style.transform = `translate(${inner.current.x - 3}px, ${inner.current.y - 3}px)`;
      }

      frame = requestAnimationFrame(animate);
    };

    frame = requestAnimationFrame(animate);

    return () => {
      document.body.style.cursor = "";
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <>
      {/* Outer targeting ring */}
      <div
        ref={outerRef}
        className="fixed top-0 left-0 pointer-events-none z-[9998] transition-opacity duration-200"
        style={{
          width: 36,
          height: 36,
          borderRadius: "50%",
          border: "1px solid rgba(0, 212, 255, 0.5)",
          boxShadow: "0 0 10px rgba(0, 212, 255, 0.2), inset 0 0 6px rgba(0, 212, 255, 0.1)",
        }}
      >
        {/* Corner ticks */}
        <span className="absolute top-0 left-0 w-1.5 h-1.5 border-t border-l border-hud-cyan" />
        <span className="absolute top-0 right-0 w-1.5 h-1.5 border-t border-r border-hud-cyan" />
        <span className="absolute bottom-0 left-0 w-1.5 h-1.5 border-b border-l border-hud-cyan" />
        <span className="absolute bottom-0 right-0 w-1.5 h-1.5 border-b border-r border-hud-cyan" />
      </div>

      {/* Inner dot */}
      <div
        ref={innerRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{
          width: 6,
          height: 6,
          borderRadius: "50%",
          backgroundColor: "#00d4ff",
          boxShadow: "0 0 8px rgba(0, 212, 255, 0.9)",
        }}
      />
    </>
  );
}
