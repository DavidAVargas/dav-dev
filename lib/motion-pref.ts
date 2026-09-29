"use client";

import { useEffect, useState } from "react";

const KEY = "dav_motion";
const EVENT = "dav:motionchange";
const QUERY = "(prefers-reduced-motion: reduce)";

/**
 * Inline script for <head>: applies a saved "motion off" choice before first paint,
 * so animations never flash on for someone who turned them off.
 */
export const motionPrefScript = `try{if(localStorage.getItem("${KEY}")==="off")document.documentElement.dataset.motion="off"}catch(e){}`;

function readReduced() {
  if (typeof window === "undefined") return false;
  return (
    document.documentElement.dataset.motion === "off" ||
    window.matchMedia(QUERY).matches
  );
}

/** True when the user asked for less motion — via the OS setting or the site's MOTION toggle. */
export function useReducedMotionPref() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const update = () => setReduced(readReduced());
    update();
    const mq = window.matchMedia(QUERY);
    mq.addEventListener("change", update);
    window.addEventListener(EVENT, update);
    return () => {
      mq.removeEventListener("change", update);
      window.removeEventListener(EVENT, update);
    };
  }, []);

  return reduced;
}

/** The site-level toggle only (ignores the OS setting), for the MOTION button's pressed state. */
export function useMotionToggle() {
  const [off, setOff] = useState(false);

  useEffect(() => {
    const update = () => setOff(document.documentElement.dataset.motion === "off");
    update();
    window.addEventListener(EVENT, update);
    return () => window.removeEventListener(EVENT, update);
  }, []);

  const toggle = () => {
    const next = !off;
    if (next) document.documentElement.dataset.motion = "off";
    else delete document.documentElement.dataset.motion;
    try {
      localStorage.setItem(KEY, next ? "off" : "on");
    } catch {}
    window.dispatchEvent(new Event(EVENT));
  };

  return { off, toggle };
}
