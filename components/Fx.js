"use client";
import { useEffect } from "react";
import { motion } from "framer-motion";
import Lenis from "lenis";

/* buttery smooth inertia scrolling */
export function Smooth() {
  useEffect(() => {
    if (window.matchMedia("(hover: none), (max-width: 900px)").matches) return; /* native scroll on phones */
    const l = new Lenis({ lerp: 0.085, anchors: true });
    window.__lenis = l;
    let id;
    const raf = (t) => { l.raf(t); id = requestAnimationFrame(raf); };
    id = requestAnimationFrame(raf);
    return () => { cancelAnimationFrame(id); l.destroy(); window.__lenis = null; };
  }, []);
  return null;
}

/* short brand intro */
export function Preloader({ onDone }) {
  useEffect(() => { const t = setTimeout(onDone, 1100); return () => clearTimeout(t); }, [onDone]);
  return (
    <motion.div className="pre" exit={{ y: "-100%" }} transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}>
      <motion.div className="pre-logo" initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.7, ease: "easeOut" }}>N</motion.div>
      <div className="pre-bar"><motion.i initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 1, ease: [0.65, 0.05, 0.2, 1] }} /></div>
    </motion.div>
  );
}
