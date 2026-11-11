"use client";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import {
  ArrowUpRight, Play, Moon, Sun, ChevronDown, ChevronLeft, ChevronRight, ArrowLeft, ArrowRight,
  Github, Linkedin, Instagram, Youtube, ExternalLink, Quote, Heart, Menu, X, Check, MoreHorizontal,
} from "lucide-react";
import { Tilt, Magnetic, S3D, Words, Count, CountText, Side, rv, useLite } from "./ui";
import { NAV, STATS, PROJECTS, SERVICES, STEPS, TEAM, TECH, REVIEWS, POSTS } from "../lib/data";

const ease = [0.2, 0.7, 0.2, 1];

export function Navbar({ dark, setDark, ready }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.header className="nav" initial={{ y: -80 }} animate={{ y: ready ? 0 : -80 }} transition={{ duration: 0.8, ease }}>
      <div className="wrap in">
        <a href="#home" className="logo"><b>N</b>Nonentity</a>
        <nav className={`links ${open ? "open" : ""}`}>
          {NAV.map((l, i) => (
            <a key={l} href={`#${l.toLowerCase()}`} className={i === 0 ? "on" : ""} onClick={() => setOpen(false)}>
              {l}{l === "Services" && <ChevronDown size={13} />}
            </a>
          ))}
        </nav>
        <div className="nav-r">
          <button className="icon-btn" aria-label="Toggle theme" onClick={() => setDark(!dark)}>
            <motion.span key={String(dark)} initial={{ rotate: -90, scale: 0 }} animate={{ rotate: 0, scale: 1 }} style={{ display: "grid" }}>
              {dark ? <Moon size={15} /> : <Sun size={15} />}
            </motion.span>
          </button>
          <Magnetic><a href="#contact" className="btn p">Start a Project <ArrowUpRight size={14} /></a></Magnetic>
          <button className="icon-btn burger" aria-label="Menu" onClick={() => setOpen(!open)}>{open ? <X size={16} /> : <Menu size={16} />}</button>
        </div>
      </div>
    </motion.header>
  );
}

function Logo3D() {
  return (
    <div className="float">
      <Tilt max={26} className="logo3d" glare={false}>
        {[5, 4, 3, 2, 1].map((i) => <i key={i} className="ly" style={{ transform: `translateZ(${-i * 7}px)` }} />)}
        <div className="face"><span>N</span></div>
      </Tilt>
    </div>
  );
}

export function Hero({ ready }) {
  const lite = useLite();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 700], [0, 140]);
  const rz = useTransform(scrollY, [0, 700], [0, 30]);
  const ry = useTransform(scrollY, [0, 700], [0, 55]);
  const st = ready ? "show" : "hidden";
  const line = { hidden: { y: "115%" }, show: { y: 0 } };
  return (
    <div className="hero-wrap" id="home">
      <div className="wrap hero">
        <div>
          <motion.div className="eyebrow" initial={{ opacity: 0, x: -20 }} animate={ready ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.1 }}>Independent Software Studio</motion.div>
          <motion.h1 className="serif" initial="hidden" animate={st} transition={{ staggerChildren: 0.14, delayChildren: 0.2 }}>
            {["Engineering digital", "products that create"].map((t) => (
              <span className="mask" key={t}><motion.span variants={line} transition={{ duration: 0.9, ease }}>{t}</motion.span></span>
            ))}
            <span className="mask"><motion.em variants={line} transition={{ duration: 0.9, ease }}>real impact.</motion.em></span>
          </motion.h1>
          <motion.p className="lead" initial={{ opacity: 0, y: 20 }} animate={ready ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.9 }}>
            We design, build and scale modern software products, AI systems and automation for education, business and growing teams.
          </motion.p>
          <motion.div className="cta-row" initial={{ opacity: 0, y: 20 }} animate={ready ? { opacity: 1, y: 0 } : {}} transition={{ delay: 1.05 }}>
            <Magnetic><a className="btn p" href="#contact">Start a Project <ArrowUpRight size={14} /></a></Magnetic>
            <Magnetic><a className="btn o" href="#work"><Play size={13} /> Watch Our Work</a></Magnetic>
          </motion.div>
          <motion.div className="chips" initial={{ opacity: 0 }} animate={ready ? { opacity: 1 } : {}} transition={{ delay: 1.3 }}>PRODUCTS &nbsp;•&nbsp; AI &nbsp;•&nbsp; AUTOMATION &nbsp;•&nbsp; SAAS</motion.div>
        </div>
        <motion.div className="stage" style={lite ? undefined : { y, rotateZ: rz, rotateY: ry }} initial={{ opacity: 0, scale: 0.6 }} animate={ready ? { opacity: 1, scale: 1 } : {}} transition={{ duration: 1.2, delay: 0.3, ease }}>
          <div className="orbit"><i /></div><div className="orbit b"><i /></div>
          <Logo3D />
        </motion.div>
      </div>
    </div>
  );
}

export function Stats() {
  const lite = useLite();
  return (
    <div className="wrap">
      <motion.div className="stats glow-b" {...rv(lite, { opacity: 0, y: 50, rotateX: 20 })}>
        {STATS.map(([Icon, n, s, l], i) => (
          <motion.div className="stat" key={l} whileHover={{ y: -4 }}>
            <motion.span initial={{ scale: 0, rotate: -90 }} whileInView={{ scale: 1, rotate: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 + i * 0.1, type: "spring" }}><Icon size={34} strokeWidth={1.4} /></motion.span>
            <div><b><Count to={n} suffix={s} /></b><span>{l}</span></div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

function Mock({ g }) {
  return <div className="mock" style={{ background: g }}><i /><i /><i /><div className="g"><u /><u /><u /></div></div>;
}

function Modal({ p, onClose }) {
  useEffect(() => {
    const k = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", k);
    window.__lenis?.stop(); document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", k); window.__lenis?.start(); document.body.style.overflow = ""; };
  }, [onClose]);
  return (
    <motion.div className="modal-bg" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
      <motion.div className="modal" role="dialog" aria-label={p.n} onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, scale: 0.85, rotateX: 28, y: 90 }} animate={{ opacity: 1, scale: 1, rotateX: 0, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, rotateX: -14, y: 60 }} transition={{ type: "spring", damping: 24, stiffness: 210 }} style={{ transformPerspective: 1400 }}>
        <button className="m-x" onClick={onClose} aria-label="Close"><X size={16} /></button>
        <div className="m-info" data-lenis-prevent>
          <div className="eyebrow">Case study</div>
          <h3 className="serif">{p.n}</h3>
          <em className="m-tag serif">{p.tag}</em>
          <p>{p.about}</p>
          <div className="m-stats">{p.stats.map(([a, b]) => <div key={b}><b><CountText s={a} /></b><span>{b}</span></div>)}</div>
          <ul>{p.pts.map((x) => <li key={x}><Check size={14} />{x}</li>)}</ul>
          <div className="tags">{p.t.map((t) => <span className="tag" key={t}>{t}</span>)}</div>
          {p.url !== "#" && <a className="btn p" href={p.url} target="_blank" rel="noreferrer">Open live demo <ArrowUpRight size={14} /></a>}
        </div>
        <div className="m-shot" data-lenis-prevent>
          {p.full ? <img src={p.full} alt={`${p.n} website preview`} /> : <Mock g={p.g} />}
        </div>
      </motion.div>
    </motion.div>
  );
}

export function Work() {
  const lite = useLite();
  const track = useRef(null);
  const [sel, setSel] = useState(null);
  const scroll = (d) => track.current.scrollBy({ left: d * 340, behavior: "smooth" });
  return (
    <>
      <S3D id="work" className="wrap row">
        <Side label="Our Work" title="Products we’ve built." text="Real-world solutions that solve education, learning and operational challenges at scale.">
          <Magnetic><a className="btn o" href="#work">View All Projects <ArrowUpRight size={13} /></a></Magnetic>
        </Side>
        <div className="car">
          <div className="track" ref={track} data-lenis-prevent-wheel>
            {PROJECTS.map((p, i) => (
              <motion.div key={p.id} {...rv(lite, { opacity: 0, x: 80, rotateY: -35 }, i)} className="proj-w">
                <Tilt className="card proj" max={12} role="button" tabIndex={0} onClick={() => setSel(p)} onKeyDown={(e) => e.key === "Enter" && setSel(p)}>
                  <div className="thumb pop2">
                    {p.thumb ? <img src={p.thumb} alt={`${p.n} preview`} loading="lazy" /> : <Mock g={p.g} />}
                    <span className="view">View case study <ArrowUpRight size={12} /></span>
                  </div>
                  <h3 className="pop2"><b><p.i size={14} /></b>{p.n}<ExternalLink size={12} /></h3>
                  <p className="pop2">{p.d}</p>
                  <div className="tags pop2">{p.t.map((t) => <span className="tag" key={t}>{t}</span>)}</div>
                </Tilt>
              </motion.div>
            ))}
          </div>
          <div className="arrows">
            <button className="arr" aria-label="Previous" onClick={() => scroll(-1)}><ArrowLeft size={15} /></button>
            <button className="arr f" aria-label="Next" onClick={() => scroll(1)}><ArrowRight size={15} /></button>
          </div>
        </div>
      </S3D>
      <AnimatePresence>{sel && <Modal p={sel} onClose={() => setSel(null)} />}</AnimatePresence>
    </>
  );
}

export function Services() {
  const lite = useLite();
  return (
    <S3D id="services" className="wrap row">
      <Side label="Our Services" title="What we do." text="End-to-end product engineering, from idea to scale." />
      <div className="svc">
        {SERVICES.map(([Icon, t, d], i) => (
          <motion.div key={t} {...rv(lite, { opacity: 0, y: 40, rotateX: -30 }, i)}>
            <Tilt className="card" max={14}>
              <Icon className="ic pop" size={30} strokeWidth={1.4} />
              <div className="pop2"><h4>{t}</h4><p>{d}</p></div>
              <ArrowUpRight className="go" size={14} />
            </Tilt>
          </motion.div>
        ))}
      </div>
    </S3D>
  );
}

export function Approach() {
  const lite = useLite();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.55"] });
  return (
    <S3D id="about" className="wrap row">
      <Side label="Our Approach" title="A simple, focused way to build." />
      <div className="steps" ref={ref}>
        <motion.i className="fill" style={{ scaleX: scrollYProgress }} />
        {STEPS.map(([t, d], i) => (
          <motion.div className="step" key={t} {...rv(lite, { opacity: 0, y: 30, rotateY: 40 }, i * 1.5)}>
            <b>{String(i + 1).padStart(2, "0")}</b><h4>{t}</h4><p>{d}</p>
          </motion.div>
        ))}
      </div>
    </S3D>
  );
}

function Avatar({ src, name }) {
  const [ok, setOk] = useState(!!src);
  const ref = useRef(null);
  useEffect(() => { if (ref.current && ref.current.complete && ref.current.naturalWidth === 0) setOk(false); }, []);
  return <div className="av pop">{ok ? <img ref={ref} src={src} alt={name} onError={() => setOk(false)} /> : name[0]}</div>;
}

const Soc = ({ gh = "#", li = "#" }) => (
  <div className="soc">
    <a href={gh} target="_blank" rel="noreferrer" aria-label="GitHub"><Github size={13} /></a>
    <a href={li} target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin size={13} /></a>
    <a href="#" aria-label="Website"><ExternalLink size={13} /></a>
  </div>
);

export function Team() {
  const lite = useLite();
  const card = (f, wide) => (
    <motion.div key={f.n} className={wide ? "wide" : ""} {...rv(lite, { opacity: 0, y: 60, rotateX: 25 })}>
      <Tilt className="card fd" max={wide ? 4 : 9}>
        <Avatar src={f.img} name={f.n} />
        <div className="pop2 fd-b">
          <h4>{f.n}<ExternalLink size={12} /></h4><small>{f.r}</small>
          <p>{f.d}</p>
          <div className="tags">{f.t.map((t) => <span className="tag" key={t}>{t}</span>)}</div>
          {f.ach && <ul className="ach">{f.ach.map(([I, x]) => <li key={x}><I size={14} />{x}</li>)}</ul>}
          <Soc gh={f.gh} li={f.li} />
        </div>
      </Tilt>
    </motion.div>
  );
  return (
    <S3D id="team" className="wrap row">
      <Side label="The Team" title="The minds behind Nonentity." text="A builder duo with a shared vision — to create products that solve real-world problems." />
      <div className="founders">
        {TEAM.map((f) => card(f, true))}
      </div>
    </S3D>
  );
}

export function Tech() {
  const lite = useLite();
  return (
    <S3D className="wrap row">
      <Side label="Our Tech Stack" text="Tools and technologies we use to build reliable, scalable products." />
      <div className="tech">
        {TECH.map(([src, n, inv], i) => (
          <motion.div key={n} {...rv(lite, { opacity: 0, rotateX: -80, y: 30 }, i * 0.4)}>
            <Tilt className="tk" max={22}>
              {src ? <img className={`pop ${inv ? "inv" : ""}`} src={src} alt={n} loading="lazy" /> : <MoreHorizontal className="pop" />}
              <em>{n}</em>
            </Tilt>
          </motion.div>
        ))}
      </div>
    </S3D>
  );
}

export function Reviews() {
  const [i, setI] = useState(0);
  const r = REVIEWS[i];
  const go = (d) => setI((i + d + REVIEWS.length) % REVIEWS.length);
  return (
    <S3D className="wrap row">
      <Side label="What People Say" title="Feedback from our clients." />
      <div className={`tst ${REVIEWS.length < 2 ? "one" : ""}`}>
        <Tilt className="card quote" max={5}>
          <Quote className="pop" size={30} fill="currentColor" />
          <AnimatePresence mode="wait">
            <motion.div key={i} className="pop2" initial={{ opacity: 0, rotateY: 40, x: 30 }} animate={{ opacity: 1, rotateY: 0, x: 0 }} exit={{ opacity: 0, rotateY: -40, x: -30 }} transition={{ duration: 0.35 }}>
              <p>“{r.q}”</p>
              <div className="who"><b>{r.n[0]}</b><div>{r.n}<span>{r.c}</span></div></div>
            </motion.div>
          </AnimatePresence>
        </Tilt>
        {REVIEWS.length > 1 && (
          <div className="arrows h">
            <button className="arr" aria-label="Previous" onClick={() => go(-1)}><ChevronLeft size={15} /></button>
            <button className="arr" aria-label="Next" onClick={() => go(1)}><ChevronRight size={15} /></button>
          </div>
        )}
      </div>
    </S3D>
  );
}

export function Blog() {
  return (
    <S3D id="blog" className="wrap row">
      <Side label="From Our Blog" title="Ideas, builds and learnings." />
      <div className="blog">
        {POSTS.map(([t, m]) => (
          <Tilt key={t} className="card post" max={12}>
            <div className="cv pop2" />
            <div className="b pop2">{t}<small>{m}</small><ArrowUpRight className="go" size={13} /></div>
          </Tilt>
        ))}
        <a className="btn o" href="#blog">View All Articles <ArrowUpRight size={13} /></a>
      </div>
    </S3D>
  );
}

export function Contact() {
  const lite = useLite();
  return (
    <div className="wrap" id="contact">
      <motion.div className="cta glow-b" {...rv(lite, { opacity: 0, rotateX: 25, y: 60 })}>
        <div>
          <div className="eyebrow">Let’s build together</div>
          <h3 className="serif"><Words text="Have a project in mind?" /></h3>
          <p>Let’s turn your idea into a reliable, scalable and impactful product.</p>
        </div>
        <Magnetic s={0.4}><a className="btn p" href="mailto:hello@nonentity.dev">Start a Conversation <ArrowUpRight size={14} /></a></Magnetic>
      </motion.div>
    </div>
  );
}

export function Footer() {
  const cols = [
    ["Services", ["Product Engineering", "AI Systems & Agents", "Automation", "Data & Intelligence"]],
    ["Company", ["About", "Team", "Work", "Blog"]],
    ["Resources", ["Contact", "Privacy Policy", "Terms of Service"]],
  ];
  return (
    <footer>
      <div className="wrap">
        <div className="fgrid">
          <div><a href="#home" className="logo"><b>N</b>Nonentity</a><p style={{ color: "var(--muted)", marginTop: 12 }}>Independent Software Studio for Education, AI and Automation.</p></div>
          {cols.map(([h, l]) => <div key={h}><h5>{h}</h5>{l.map((x) => <a href="#" key={x}>{x}</a>)}</div>)}
          <div><h5>Follow Us</h5>
            <div className="soc">{[Github, Linkedin, Instagram, Youtube].map((I, k) => <a href="#" key={k} aria-label="social"><I size={16} /></a>)}</div>
          </div>
        </div>
        <div className="water" aria-hidden>Nonentity</div>
        <div className="copy"><span>© 2026 Nonentity. All rights reserved.</span><span>Built with <Heart size={11} color="#d9795f" fill="#d9795f" style={{ verticalAlign: "middle" }} /> by Nonentity</span></div>
      </div>
    </footer>
  );
}
