"use client";

import { useEffect, useRef, useState } from "react";

export function CursorTrail() {
  const [isTouch, setIsTouch] = useState(true);
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: -999, y: -999 });
  const outer = useRef({ x: -999, y: -999 });
  const inner = useRef({ x: -999, y: -999 });
  const hasMoved = useRef(false);

  useEffect(() => {
    setIsTouch(!window.matchMedia("(pointer: fine)").matches);
  }, []);

  useEffect(() => {
    if (isTouch) return;

    document.body.style.cursor = "none";

    // Start hidden — only show after first mouse move
    if (outerRef.current) outerRef.current.style.opacity = "0";
    if (innerRef.current) innerRef.current.style.opacity = "0";

    const onMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      if (!hasMoved.current) {
        // Snap to position on first move so they don't slide in from corner
        outer.current = { x: e.clientX, y: e.clientY };
        inner.current = { x: e.clientX, y: e.clientY };
        hasMoved.current = true;
        if (outerRef.current) outerRef.current.style.opacity = "1";
        if (innerRef.current) innerRef.current.style.opacity = "1";
      }
    };

    const onLeave = () => {
      if (outerRef.current) outerRef.current.style.opacity = "0";
      if (innerRef.current) innerRef.current.style.opacity = "0";
    };

    const onEnter = () => {
      if (hasMoved.current) {
        if (outerRef.current) outerRef.current.style.opacity = "1";
        if (innerRef.current) innerRef.current.style.opacity = "1";
      }
    };

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);

    let frame: number;
    const animate = () => {
      outer.current.x += (mouse.current.x - outer.current.x) * 0.1;
      outer.current.y += (mouse.current.y - outer.current.y) * 0.1;
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
  }, [isTouch]);

  if (isTouch) return null;

  return (
    <>
      <div
        ref={outerRef}
        className="fixed top-0 left-0 pointer-events-none z-[9998]"
        style={{
          width: 36,
          height: 36,
          borderRadius: "50%",
          opacity: 0,
          transition: "opacity 0.2s ease",
          border: "1px solid rgba(0, 212, 255, 0.5)",
          boxShadow: "0 0 10px rgba(0, 212, 255, 0.2), inset 0 0 6px rgba(0, 212, 255, 0.1)",
        }}
      >
        <span className="absolute top-0 left-0 w-1.5 h-1.5 border-t border-l border-hud-cyan" />
        <span className="absolute top-0 right-0 w-1.5 h-1.5 border-t border-r border-hud-cyan" />
        <span className="absolute bottom-0 left-0 w-1.5 h-1.5 border-b border-l border-hud-cyan" />
        <span className="absolute bottom-0 right-0 w-1.5 h-1.5 border-b border-r border-hud-cyan" />
      </div>

      <div
        ref={innerRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{
          width: 6,
          height: 6,
          opacity: 0,
          borderRadius: "50%",
          transition: "opacity 0.2s ease",
          backgroundColor: "#00d4ff",
          boxShadow: "0 0 8px rgba(0, 212, 255, 0.9)",
        }}
      />
    </>
  );
}
