"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, animate } from "framer-motion";
import Lenis from "lenis";

/* buttery smooth inertia scrolling */
export function Smooth() {
  useEffect(() => {
    const l = new Lenis({ lerp: 0.085, anchors: true });
    window.__lenis = l;
    let id;
    const raf = (t) => { l.raf(t); id = requestAnimationFrame(raf); };
    id = requestAnimationFrame(raf);
    return () => { cancelAnimationFrame(id); l.destroy(); window.__lenis = null; };
  }, []);
  return null;
}

/* glowing cursor follower (desktop only) */
export function Cursor() {
  const x = useMotionValue(-100), y = useMotionValue(-100);
  const dx = useSpring(x, { stiffness: 900, damping: 45 }), dy = useSpring(y, { stiffness: 900, damping: 45 });
  const rx = useSpring(x, { stiffness: 140, damping: 18 }), ry = useSpring(y, { stiffness: 140, damping: 18 });
  const [hot, setHot] = useState(false);
  const [on, setOn] = useState(false);
  useEffect(() => {
    if (!window.matchMedia("(pointer:fine)").matches) return;
    setOn(true);
    const m = (e) => { x.set(e.clientX); y.set(e.clientY); setHot(!!e.target.closest?.("a,button,[role=button]")); };
    window.addEventListener("mousemove", m);
    return () => window.removeEventListener("mousemove", m);
  }, [x, y]);
  if (!on) return null;
  return (
    <>
      <motion.div className="cur-ring" style={{ x: rx, y: ry }} animate={{ scale: hot ? 1.9 : 1, opacity: hot ? 0.9 : 0.55 }} />
      <motion.div className="cur-dot" style={{ x: dx, y: dy }} />
    </>
  );
}

/* intro curtain with counter */
export function Preloader({ onDone }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    const c = animate(0, 100, { duration: 1.6, ease: [0.65, 0.05, 0.2, 1], onUpdate: (v) => setN(Math.round(v)), onComplete: () => setTimeout(onDone, 200) });
    return () => c.stop();
  }, [onDone]);
  return (
    <motion.div className="pre" exit={{ y: "-100%" }} transition={{ duration: 0.95, ease: [0.76, 0, 0.24, 1] }}>
      <motion.div className="pre-logo" initial={{ scale: 0.4, rotateY: -90, opacity: 0 }} animate={{ scale: 1, rotateY: 0, opacity: 1 }} transition={{ duration: 0.9, ease: "easeOut" }}>N</motion.div>
      <div className="pre-bar"><motion.i style={{ scaleX: n / 100 }} /></div>
      <div className="pre-n">{String(n).padStart(3, "0")}</div>
    </motion.div>
  );
}

/* drifting ember particles */
export function Particles() {
  const ref = useRef(null);
  useEffect(() => {
    const c = ref.current, ctx = c.getContext("2d");
    let w, h, raf; const P = [];
    const size = () => { w = c.width = c.offsetWidth; h = c.height = c.offsetHeight; };
    size();
    for (let i = 0; i < 70; i++) P.push({ x: Math.random() * w, y: Math.random() * h, r: Math.random() * 1.6 + 0.4, vx: (Math.random() - 0.5) * 0.25, vy: -Math.random() * 0.45 - 0.08, a: Math.random() * 6 });
    const loop = () => {
      ctx.clearRect(0, 0, w, h);
      for (const p of P) {
        p.x += p.vx; p.y += p.vy; p.a += 0.012;
        if (p.y < -5) { p.y = h + 5; p.x = Math.random() * w; }
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, 7);
        ctx.fillStyle = `rgba(224,138,111,${0.12 + 0.5 * Math.abs(Math.sin(p.a))})`; ctx.fill();
      }
      raf = requestAnimationFrame(loop);
    };
    loop();
    window.addEventListener("resize", size);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", size); };
  }, []);
  return <canvas ref={ref} className="particles" aria-hidden />;
}
