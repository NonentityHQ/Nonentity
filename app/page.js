"use client";
import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll } from "framer-motion";
import { Smooth, Cursor, Preloader } from "../components/Fx";
import { Navbar, Hero, Stats, Work, Services, Approach, Team, Tech, Reviews, Blog, Contact, Footer } from "../components/sections";

export default function Page() {
  const [dark, setDark] = useState(true);
  const [ready, setReady] = useState(false);
  const { scrollYProgress } = useScroll();
  const done = useCallback(() => setReady(true), []);
  useEffect(() => { document.documentElement.dataset.theme = dark ? "dark" : "light"; }, [dark]);
  return (
    <>
      <Smooth /><Cursor />
      <AnimatePresence>{!ready && <Preloader onDone={done} />}</AnimatePresence>
      <motion.div className="progress" style={{ scaleX: scrollYProgress }} />
      <Navbar dark={dark} setDark={setDark} ready={ready} />
      <main>
        <Hero ready={ready} /><Stats /><Work /><Services /><Approach /><Team /><Tech /><Reviews /><Blog /><Contact />
      </main>
      <Footer />
    </>
  );
}
