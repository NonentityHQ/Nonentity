"use client";
import { useEffect, useRef, useState } from "react";
import {
  motion, useMotionValue, useSpring, useTransform, useScroll, useInView, animate, useMotionTemplate,
} from "framer-motion";

/* lightweight mode for phones / touch: no 3D, no springs, no heavy scroll transforms */
export function useLite() {
  const [l, setL] = useState(false);
  useEffect(() => {
    const q = window.matchMedia("(max-width: 900px), (hover: none)");
    const f = () => setL(q.matches);
    f(); q.addEventListener("change", f);
    return () => q.removeEventListener("change", f);
  }, []);
  return l;
}
const E = [0.2, 0.7, 0.2, 1];
export const rv = (lite, from, i = 0) => lite
  ? { initial: { opacity: 0, y: 28 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: "-30px" }, transition: { duration: 0.5, delay: Math.min(i, 3) * 0.06 } }
  : { initial: from, whileInView: { opacity: 1, x: 0, y: 0, rotateX: 0, rotateY: 0 }, viewport: { once: true }, transition: { duration: 0.8, delay: i * 0.1, ease: E }, style: { transformPerspective: 1000 } };

/* 3D tilt card with mouse-following glare */
export function Tilt({ children, className = "", max = 10, glare = true, ...rest }) {
  const lite = useLite();
  const x = useMotionValue(0), y = useMotionValue(0);
  const px = useMotionValue(-300), py = useMotionValue(-300);
  const cfg = { stiffness: 180, damping: 18 };
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [max, -max]), cfg);
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-max, max]), cfg);
  const bg = useMotionTemplate`radial-gradient(240px circle at ${px}px ${py}px, rgba(255,200,170,.12), transparent 65%)`;
  const move = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - r.left) / r.width - 0.5);
    y.set((e.clientY - r.top) / r.height - 0.5);
    px.set(e.clientX - r.left); py.set(e.clientY - r.top);
  };
  if (lite) return <div className={`tilt ${className}`} {...rest}>{children}</div>;
  return (
    <motion.div className={`tilt ${className}`} style={{ rotateX, rotateY, transformPerspective: 900 }}
      onMouseMove={move} onMouseLeave={() => { x.set(0); y.set(0); }} whileHover={{ scale: 1.03 }} {...rest}>
      {children}
      {glare && <motion.span className="glare" style={{ background: bg }} />}
    </motion.div>
  );
}

/* magnetic hover: element is pulled toward the cursor */
export function Magnetic({ children, s = 0.3 }) {
  const lite = useLite();
  const x = useMotionValue(0), y = useMotionValue(0);
  const cfg = { stiffness: 220, damping: 14 };
  const sx = useSpring(x, cfg), sy = useSpring(y, cfg);
  if (lite) return <span style={{ display: "inline-block" }}>{children}</span>;
  return (
    <motion.span style={{ x: sx, y: sy, display: "inline-block" }}
      onMouseMove={(e) => { const r = e.currentTarget.getBoundingClientRect(); x.set((e.clientX - r.left - r.width / 2) * s); y.set((e.clientY - r.top - r.height / 2) * s); }}
      onMouseLeave={() => { x.set(0); y.set(0); }}>
      {children}
    </motion.span>
  );
}

/* 3D scroll: section rises from the floor into place */
export function S3D(props) {
  const lite = useLite();
  return lite ? <S3DLite {...props} /> : <S3DFull {...props} />;
}
function S3DLite({ id, className = "", children }) {
  return (
    <div className="persp">
      <motion.section id={id} className={className} initial={{ opacity: 0, y: 36 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.6, ease: E }}>{children}</motion.section>
    </div>
  );
}
function S3DFull({ id, className = "", children }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "start 0.5"] });
  const rotateX = useTransform(scrollYProgress, [0, 1], [22, 0]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0.05, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [90, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.94, 1]);
  return (
    <div className="persp">
      <motion.section id={id} ref={ref} className={className} style={{ rotateX, opacity, y, scale, transformOrigin: "50% 100%" }}>
        {children}
      </motion.section>
    </div>
  );
}

/* masked word-by-word headline reveal */
export function Words({ text, delay = 0 }) {
  const lite = useLite();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -8% 0px" });
  if (lite) return <span>{text}</span>;
  return (
    <span ref={ref} aria-label={text}>
      {text.split(" ").map((w, i) => (
        <span key={i} style={{ display: "inline-block", overflow: "hidden", verticalAlign: "top", paddingBottom: ".14em", marginRight: ".24em" }}>
          <motion.span style={{ display: "inline-block" }} initial={{ y: "115%", rotate: 4 }} animate={inView ? { y: 0, rotate: 0 } : { y: "115%", rotate: 4 }}
            transition={{ duration: 0.8, delay: delay + i * 0.07, ease: E }}>{w}</motion.span>
        </span>
      ))}
    </span>
  );
}

export function Count({ to, suffix = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const c = animate(0, to, { duration: 2, ease: [0.2, 0.7, 0.2, 1], onUpdate: (l) => setV(Math.round(l)) });
    return () => c.stop();
  }, [inView, to]);
  return <span ref={ref}>{v.toLocaleString("en-US")}{suffix}</span>;
}

export const Side = ({ label, title, text, children }) => (
  <div className="side">
    <div className="eyebrow">{label}</div>
    {title && <h2 className="serif"><Words text={title} /></h2>}
    {text && <p>{text}</p>}
    {children}
  </div>
);

/* animates every number inside a string: "20,000+", "4.8/5", "50–150", "99.9%" */
export function CountText({ s }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [t, setT] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const c = animate(0, 1, { duration: 1.8, ease: E, onUpdate: setT });
    return () => c.stop();
  }, [inView]);
  return (
    <span ref={ref} style={{ fontVariantNumeric: "tabular-nums" }}>
      {s.split(/(\d[\d,]*\.?\d*)/).map((p, i) => {
        if (!/^\d/.test(p)) return p;
        const dec = (p.split(".")[1] || "").length;
        return <span key={i}>{(parseFloat(p.replace(/,/g, "")) * t).toLocaleString("en-US", { minimumFractionDigits: dec, maximumFractionDigits: dec })}</span>;
      })}
    </span>
  );
}
