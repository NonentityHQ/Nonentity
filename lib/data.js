import {
  Code2, Users, Building2, Rocket, Layers, Sparkles, Zap, BarChart3, Box, GraduationCap,
  BookOpen, Globe, ShieldCheck, Coffee, Leaf, Atom, Terminal, Database, Cloud, Container,
  MoreHorizontal, Wind, Trophy, Award, Briefcase, School, Package, FlaskConical, Hand,
} from "lucide-react";

export const NAV = ["Home", "Services", "Work", "About", "Team", "Blog", "Contact"];

export const STATS = [
  [Code2, 10, "+", "Products & Projects"], [Users, 20000, "+", "Active Users"],
  [Building2, 5, "+", "Institutes Onboarded"], [Rocket, 100, "K+", "Lines of Code Shipped"],
];

export const PROJECTS = [
  {
    id: "campusinit", n: "Campusinit", i: GraduationCap, url: "#",
    d: "All-in-one school & institute management platform.", t: ["SaaS", "Education", "ERP"],
    thumb: "/projects/campusinit-thumb.jpg", full: "/projects/campusinit-full.jpg",
    tag: "Smart campuses. Connected communities.",
    about: "Manage academics, attendance, fees and communication in one powerful platform built for schools, colleges and coaching institutes.",
    stats: [["20,000+", "Students managed"], ["500+", "Institutes & campuses"], ["50–150", "Active staff users"], ["99.9%", "Uptime"]],
    pts: ["Fee collection with receipts, concessions and WhatsApp reminders", "Class & batch-wise attendance with auto notifications", "Academics: classes, subjects, timetable, exams and results", "Mini, Standard and Enterprise plans for every institute size"],
  },
  {
    id: "persona", n: "Persona English", i: BookOpen, url: "#",
    d: "A modern learning platform for English speaking & communication.", t: ["Education", "Web", "Learning"],
    thumb: "/projects/persona-full.jpg", full: "/projects/persona-full.jpg",
    tag: "Speak English with confidence.",
    about: "India’s trusted English learning platform with live and recorded classes, practice tests, a vocabulary booster, books and a mobile app.",
    stats: [["10,000+", "Happy learners"], ["500+", "Video lessons"], ["4.8/5", "Student rating"], ["25,000+", "Vocabulary words"]],
    pts: ["Live & recorded spoken English courses", "Practice tests, worksheets and exam-focused material", "Course store, offer countdowns and book store", "YouTube channel with free lessons for the community"],
  },
  {
    id: "empirical", n: "Empirical Shiksha", i: Globe, url: "#",
    d: "An initiative for accessible and impactful education.", t: ["Initiative", "Web", "Education"],
    thumb: "/projects/empirical-full.jpg", full: "/projects/empirical-full.jpg",
    tag: "Learning today, for a stronger tomorrow.",
    about: "A community-driven initiative in Khandwa working on education, cleanliness, environment and mental well-being, powered by 60+ volunteers.",
    stats: [["1,000+", "Students consulted"], ["80+", "Eklavya batch students"], ["60+", "Volunteers"], ["25+", "Cleanup visits & drives"]],
    pts: ["Four pillars: Shiksha, Swachhata, Paryavaran, Mansik Swasthya", "Eklavya Batch: free classes for low-income families", "Gallery, journey timeline and social reels in one site", "Officially registered as Empirical Shiksha Abhiyan Samiti"],
  },
  {
    id: "shadowspeak", n: "ShadowSpeak 2.0", i: ShieldCheck, url: "https://complaint-portal-2.vercel.app/",
    d: "AI-powered anonymous complaint portal for institutions.", t: ["AI", "Spring Boot", "React"],
    thumb: null, g: "linear-gradient(135deg,#2a1530,#6f3bd1)",
    tag: "Speak up. Stay anonymous.",
    about: "A production-grade grievance portal that keeps identities anonymous while institutions track and resolve complaints across four user roles.",
    stats: [["4", "User roles"], ["JWT", "Stateless auth"], ["Gemini", "AI moderation"], ["Text-to-SQL", "Admin AI search"]],
    pts: ["Spring AI + Gemini rewrites informal complaints into formal text", "Admin assistant turns plain English into SQL queries", "Spring Security & JWT role-based access", "Built with Spring Boot, React.js and MySQL"],
  },
];

export const SERVICES = [
  [Layers, "Product Engineering", "Design, build and scale reliable software products."],
  [Sparkles, "AI Systems & Agents", "Custom AI solutions, agents and intelligent workflows."],
  [Zap, "Automation", "Eliminate repetitive work with smart automation."],
  [Code2, "Software Development", "Web, mobile and full-stack application development."],
  [BarChart3, "Data & Intelligence", "Turn data into actionable insights and decisions."],
  [Box, "Consulting & R&D", "Research, prototype and validate new ideas."],
];

export const STEPS = [
  ["Discover", "Understand the problem, users and real needs."], ["Design", "Shape the solution with clarity and intent."],
  ["Build", "Develop, test and iterate quickly."], ["Scale", "Deploy, monitor and grow with confidence."],
];

/* Team */
export const TEAM = [
  {
    n: "Tushar Upadhyay", r: "Co-Founder & AI/Backend Lead", img: "/team/tushar.jpg",
    d: "Builds end-to-end AI applications, Python libraries and FastAPI backends — from NLP and machine learning to computer vision and explainable AI.",
    t: ["Python", "FastAPI", "PyTorch", "NLP", "LangChain", "PostgreSQL"],
    gh: "https://github.com/TheAutocrat", li: "https://linkedin.com/in/tusharupadhyay-ai",
    ach: [
      [Package, "CausaLog — explainable log analysis, on PyPI"],
      [FlaskConical, "InspectML — open-source ML evaluation library"],
      [Hand, "Real-time hand gesture recognition (OpenCV, MediaPipe)"],
      [GraduationCap, "B.Tech CSE (Data Science) · RGPV · 2027"],
    ],
  },
  {
    n: "Jatin Mourya", r: "Java Full-Stack Developer", img: "/team/jatin.jpg",
    d: "Builds secure Spring Boot backends and React frontends, and integrates AI (Spring AI, Gemini) for content moderation and natural-language data search.",
    t: ["Java", "Spring Boot", "Spring AI", "React", "MySQL", "JWT"],
    gh: "https://github.com/jatinmourya24932", li: "https://linkedin.com/in/jatinmourya24932/",
    ach: [
      [Trophy, "Smart India Hackathon — Internal Round Winner"],
      [Award, "Flipkart GRiD 6.0 — National Qualifier"],
      [Briefcase, "Java Full-Stack Intern · Fealty Technologies"],
      [School, "B.Tech CSE · SDITS Khandwa · 2027"],
    ],
  },
];

const T = (n, f, inv) => [`/tech/${f}.svg`, n, inv];
export const TECH = [
  T("Java", "java"), T("Spring", "spring"), T("React", "react"), T("Next.js", "nextjs", 1), T("Flutter", "flutter"),
  T("Python", "python"), T("FastAPI", "fastapi"), T("PyTorch", "pytorch"), T("scikit-learn", "scikitlearn"), T("PostgreSQL", "postgresql"),
  T("MongoDB", "mongodb"), T("MySQL", "mysql"), T("Node.js", "nodejs"), T("Tailwind", "tailwindcss"), T("Git", "git"),
  T("GitHub", "github", 1), T("AWS", "aws", 1), T("Docker", "docker"), T("Rust", "rust", 1), [null, "More"],
];

export const REVIEWS = [
  { q: "The Nonentity team understood our requirements deeply and delivered a robust, easy-to-use platform. The product quality and support have been excellent.", n: "Persona English", c: "Client · Education" },
  { q: "Replace this with another real client review — the slider supports as many as you add.", n: "Client Name", c: "Company" },
  { q: "Clear communication, fast iterations and clean engineering from start to finish.", n: "Client Name", c: "Company" },
];

export const POSTS = [
  ["Building a Multi-Tenant SaaS for Education", "Nov 02, 2026 · 8 min read"],
  ["How We Structure Scalable Spring Boot Applications", "Oct 26, 2026 · 6 min read"],
  ["From Idea to Product: Our Development Workflow", "Oct 18, 2026 · 7 min read"],
];
