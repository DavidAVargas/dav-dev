"use client";

import { useEffect, useRef } from "react";

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

function getFocusable(root: HTMLElement) {
  return Array.from(root.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
    (el) => !el.closest("[inert]") && el.getClientRects().length > 0,
  );
}

/**
 * Accessible overlay behavior for custom modals and menus:
 * - makes everything outside the container inert (not tabbable / hidden from screen readers)
 * - moves focus into the container ([data-autofocus] element, else the container itself)
 * - traps Tab / Shift+Tab inside the container
 * - calls onClose on Escape
 * - returns focus to the element that opened it once `open` goes false
 *
 * Attach the returned ref to the container. Give it tabIndex={-1} so it can receive focus.
 */
export function useDialog<T extends HTMLElement = HTMLDivElement>(
  open: boolean,
  onClose: () => void,
) {
  const ref = useRef<T>(null);
  const onCloseRef = useRef(onClose);

  useEffect(() => {
    onCloseRef.current = onClose;
  });

  useEffect(() => {
    if (!open) return;
    const container = ref.current;
    if (!container) return;

    const trigger = document.activeElement as HTMLElement | null;

    // Inert every sibling along the path from the container up to <body>.
    // Previous values are restored on cleanup so nested overlays unwind correctly.
    const inerted: [HTMLElement, boolean][] = [];
    for (
      let node: HTMLElement = container;
      node.parentElement && node !== document.body;
      node = node.parentElement
    ) {
      for (const sibling of Array.from(node.parentElement.children)) {
        if (
          sibling === node ||
          !(sibling instanceof HTMLElement) ||
          sibling.tagName === "SCRIPT"
        )
          continue;
        inerted.push([sibling, sibling.inert]);
        sibling.inert = true;
      }
    }

    (
      container.querySelector<HTMLElement>("[data-autofocus]") ?? container
    ).focus();

    const onKeyDown = (e: KeyboardEvent) => {
      const active = document.activeElement;
      // Ignore keys meant for a nested overlay that currently holds focus
      if (active && active !== document.body && !container.contains(active))
        return;

      if (e.key === "Escape") {
        e.preventDefault();
        onCloseRef.current();
        return;
      }
      if (e.key !== "Tab") return;

      const items = getFocusable(container);
      if (items.length === 0) {
        e.preventDefault();
        container.focus();
        return;
      }
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && (active === first || active === container)) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      for (const [el, wasInert] of inerted.reverse()) el.inert = wasInert;
      if (trigger && trigger !== document.body && document.contains(trigger)) {
        trigger.focus({ preventScroll: true });
      }
    };
  }, [open]);

  return ref;
}

/** Move keyboard / screen reader focus to a page section after nav-driven scrolling. */
export function focusSection(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  if (!el.hasAttribute("tabindex")) el.setAttribute("tabindex", "-1");
  el.focus({ preventScroll: true });
  const still =
    document.documentElement.dataset.motion === "off" ||
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  el.scrollIntoView({ behavior: still ? "auto" : "smooth" });
}
