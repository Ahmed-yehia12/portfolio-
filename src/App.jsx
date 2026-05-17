import { useState, useEffect, useRef } from "react";

const NAV_LINKS = ["about", "skills", "projects", "experience"];

const SKILLS = [
  { category: "Frontend", items: ["React.js", "Next.js", "Redux Toolkit", "Redux-Saga", "TypeScript", "JavaScript ES6+", "HTML5", "CSS3", "SASS", "Tailwind CSS", "Bootstrap 5"] },
  { category: "Backend", items: ["Node.js", "Express.js", "NestJS", "REST APIs", "GraphQL", "Socket.io", "RabbitMQ", "JWT Auth", "OOP"] },
  { category: "Databases", items: ["MongoDB", "PostgreSQL", "MySQL", "Mongoose", "Prisma ORM", "Sequelize ORM"] },
  { category: "Tools & Practices", items: ["Git / GitHub", "Cloudinary", "Multer", "Joi", "Bcrypt.js", "CI/CD Basics", "Agile / Scrum"] },
];

const PROJECTS = [
  { name: "TPSS Trading Platform", desc: "Full trading system for clients to execute trades and track open positions in real time. Includes position reflection, order lifecycle, and exposure calculation.", tags: ["NestJS", "React.js", "PostgreSQL"], status: "Live", year: "2024" },
  { name: "Forex CRM System", desc: "CRM for brokerage companies to manage clients on MT4/MT5. Built automated commission & rebate engine for Introducing Broker hierarchies.", tags: ["NestJS", "React.js", "PostgreSQL", "MT4/MT5"], status: "Live", year: "2024" },
  { name: "Crypto Payment Gateway", desc: "Multi-currency crypto gateway enabling merchants to accept crypto, verify wallet transactions, and run automated reconciliation for crypto ↔ fiat tracking.", tags: ["NestJS", "Node.js", "RabbitMQ", "React.js"], status: "Live", year: "2024" },
  { name: "Crypto CRM System", desc: "CRM for crypto-fintech ops with KYC dashboards, client lifecycle management, and real-time transaction monitoring with full audit trails.", tags: ["NestJS", "React.js", "MongoDB"], status: "Live", year: "2024" },
  { name: "Dalelok Platform", desc: "Dubizzle-style classified marketplace with listings, categories, search, filters, and user profiles. Scalable backend APIs and responsive React UI.", tags: ["Node.js", "Express.js", "React.js", "MongoDB", "Socket.io"], status: "Live", year: "2024" },
  { name: "FreshCart E-Commerce", desc: "Full-stack e-commerce with product catalog, cart, checkout, orders, and Stripe payments. Optimized REST APIs and Redux Toolkit state management.", tags: ["React.js", "Redux Toolkit", "Node.js", "MongoDB", "Stripe"], status: "Open Source", year: "2023" },
  { name: "Tawseela Logistics", desc: "Delivery platform for Customers, Captains, and Operators with shipment dashboards, captain management, and cash reconciliation tools.", tags: ["Node.js", "MongoDB", "React.js", "Express.js"], status: "Live", year: "2023" },
  { name: "Saraha Anonymous Messaging", desc: "Anonymous messaging app with inbox management, message moderation, and secure user sessions — zero sender identity exposure.", tags: ["Node.js", "Express.js", "MongoDB", "React.js"], status: "Open Source", year: "2023" },
];

const EXPERIENCE = [
  {
    role: "Senior MERN Stack Developer", company: "Finitic", type: "Fintech / Crypto · UAE (Hybrid)", period: "Sep 2024 — Present", highlight: "🏆 Employee of Month × 4",
    points: [
      "Promoted to Senior Developer after consistently delivering high-impact systems — leading a team of 6 developers for the past 5 months.",
      "Set technical direction, conducted code reviews, and mentored junior developers to maintain code quality and delivery speed.",
      "Designed core backend systems for a trading platform, crypto payment gateway, and subscription management services.",
      "Built secure trading & wallet APIs using NestJS with RBAC, strong validation, and JWT authentication.",
      "Integrated async transaction pipelines using RabbitMQ for reliable syncing across partner platforms.",
      "Implemented real-time tracking for client positions, orders, and transaction history.",
    ],
  },
  {
    role: "MERN Stack Developer", company: "Why Not Tech", type: "Türkiye (Remote)", period: "May 2024 — Sep 2024", highlight: null,
    points: [
      "Built a classified-ads marketplace enabling users to buy, sell, and trade products/services.",
      "Developed RESTful APIs for client features and a full admin management panel.",
      "Delivered real-time buyer/seller chat using Socket.io.",
      "Implemented secure JWT auth with role-based access and payment gateway integration.",
    ],
  },
  {
    role: "Software Developer (MERN)", company: "Tawseela Express", type: "Maadi, Cairo", period: "Feb 2023 — May 2024", highlight: null,
    points: [
      "Developed a delivery logistics platform for Customers, Captains, and Operators.",
      "Built responsive React dashboards for shipment creation, assignment, and real-time tracking.",
      "Implemented Node.js + MongoDB backend for shipments, roles, and cash reconciliation.",
      "Delivered operator tools: daily shipment sheets, captain management, and performance views.",
    ],
  },
];

const ACHIEVEMENTS = [
  { icon: "🏆", title: "Employee of Month × 4", desc: "Awarded 4 consecutive months at Finitic — promoted to Senior & leading a team of 6 developers." },
  { icon: "⚡", title: "Real-Time Trading Systems", desc: "Core backend for trading and crypto payment products — real-time positions via RabbitMQ pipelines." },
  { icon: "🔗", title: "MT4/MT5 Integration", desc: "Integrated TPSS & MT4/MT5 platforms ensuring accurate trade, position, and commission reflection." },
  { icon: "🤖", title: "Automated IB Engine", desc: "Developed IB commission & rebate engine eliminating manual processing across brokerage operations." },
];

// ─── THEME TOKENS ─────────────────────────────────────────────────────────────
const DARK = {
  bg:         "#080c10",
  bgCard:     "#0d1318",
  bgCardHov:  "#111820",
  nav:        "rgba(8,12,16,.90)",
  border:     "#1a2530",
  borderHov:  "rgba(0,255,157,.35)",
  text:       "#e8f4f0",
  textMid:    "#c8d8e8",
  textMuted:  "#4a6a7a",
  textFaint:  "#1e3040",
  accent:     "#00ff9d",
  accentRgb:  "0,255,157",
  accentSoft: "rgba(0,255,157,.06)",
  accentBorder:"rgba(0,255,157,.18)",
  link:       "#38bdf8",
  tagBg:      "#0a1520",
  tagBorder:  "#1e3040",
  tagText:    "#3a6a50",
  pillBg:     "rgba(0,255,157,.05)",
  pillBorder: "rgba(0,255,157,.14)",
  pillText:   "#7faf90",
  gridColor:  "rgba(0,255,157,.04)",
  scanline:   true,
  cursor:     true,
};

const LIGHT = {
  bg:         "#f5f7fa",
  bgCard:     "#ffffff",
  bgCardHov:  "#f0f4ff",
  nav:        "rgba(245,247,250,.92)",
  border:     "#dde4ef",
  borderHov:  "#4f46e5",
  text:       "#0f172a",
  textMid:    "#1e293b",
  textMuted:  "#64748b",
  textFaint:  "#94a3b8",
  accent:     "#4f46e5",
  accentRgb:  "79,70,229",
  accentSoft: "rgba(79,70,229,.06)",
  accentBorder:"rgba(79,70,229,.22)",
  link:       "#0ea5e9",
  tagBg:      "#eef2ff",
  tagBorder:  "#c7d2fe",
  tagText:    "#4338ca",
  pillBg:     "rgba(79,70,229,.07)",
  pillBorder: "rgba(79,70,229,.2)",
  pillText:   "#4338ca",
  gridColor:  "rgba(79,70,229,.04)",
  scanline:   false,
  cursor:     false,
};

// ─── THEME TOGGLE BUTTON ──────────────────────────────────────────────────────
function ThemeToggle({ dark, toggle, t }) {
  return (
    <button
      onClick={toggle}
      aria-label="Toggle theme"
      style={{
        position: "relative", display: "flex", alignItems: "center",
        width: 52, height: 28, borderRadius: 14,
        background: dark ? "rgba(0,255,157,.15)" : "rgba(79,70,229,.12)",
        border: `1px solid ${dark ? "rgba(0,255,157,.3)" : "rgba(79,70,229,.3)"}`,
        cursor: "pointer", padding: "0 4px",
        transition: "background .3s, border .3s", flexShrink: 0,
      }}
    >
      {/* Sun icon */}
      <span style={{
        position: "absolute", left: 7, fontSize: 13, opacity: dark ? 0.3 : 1,
        transition: "opacity .3s", userSelect: "none",
      }}>☀️</span>
      {/* Moon icon */}
      <span style={{
        position: "absolute", right: 7, fontSize: 12, opacity: dark ? 1 : 0.3,
        transition: "opacity .3s", userSelect: "none",
      }}>🌙</span>
      {/* Knob */}
      <span style={{
        position: "absolute",
        left: dark ? 26 : 4,
        width: 20, height: 20, borderRadius: "50%",
        background: dark ? "#00ff9d" : "#4f46e5",
        transition: "left .3s, background .3s",
        boxShadow: dark ? "0 0 8px rgba(0,255,157,.5)" : "0 0 8px rgba(79,70,229,.4)",
      }} />
    </button>
  );
}

// ─── CUSTOM CURSOR (dark mode only) ──────────────────────────────────────────
function Cursor({ t }) {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [hov, setHov] = useState(false);
  useEffect(() => {
    const mv = (e) => setPos({ x: e.clientX, y: e.clientY });
    const ov = (e) => setHov(!!e.target.closest("a,button,[data-hover]"));
    window.addEventListener("mousemove", mv);
    window.addEventListener("mouseover", ov);
    return () => { window.removeEventListener("mousemove", mv); window.removeEventListener("mouseover", ov); };
  }, []);
  if (!t.cursor) return null;
  return (
    <>
      <div style={{ position:"fixed", left:pos.x-4, top:pos.y-4, width:8, height:8, borderRadius:"50%", background:t.accent, pointerEvents:"none", zIndex:9999, transform:hov?"scale(2.5)":"scale(1)", transition:"transform .1s" }} />
      <div style={{ position:"fixed", left:pos.x-18, top:pos.y-18, width:36, height:36, borderRadius:"50%", border:`1px solid rgba(${t.accentRgb},.35)`, pointerEvents:"none", zIndex:9998, transition:"left .12s,top .12s,transform .2s", transform:hov?"scale(1.5)":"scale(1)" }} />
    </>
  );
}

// ─── TYPEWRITER ───────────────────────────────────────────────────────────────
function TypeWriter({ text, speed = 55, accentColor }) {
  const [out, setOut] = useState("");
  const [done, setDone] = useState(false);
  useEffect(() => {
    setOut(""); setDone(false);
    let i = 0;
    const ti = setInterval(() => { setOut(text.slice(0, ++i)); if (i >= text.length) { clearInterval(ti); setDone(true); } }, speed);
    return () => clearInterval(ti);
  }, [text, speed]);
  return <span>{out}{!done && <span style={{ animation:"blink 1s step-end infinite", color:accentColor }}>|</span>}</span>;
}

// ─── MAIN PORTFOLIO ───────────────────────────────────────────────────────────
export default function Portfolio() {
  const [dark, setDark] = useState(true);
  const [active, setActive] = useState("about");
  const refs = useRef({});
  const t = dark ? DARK : LIGHT;

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id); }),
      { threshold: 0.3 }
    );
    Object.values(refs.current).forEach(el => el && obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const go = (id) => refs.current[id]?.scrollIntoView({ behavior: "smooth" });

  return (
    <div style={{ background:t.bg, color:t.textMid, fontFamily:"'JetBrains Mono','Fira Code','Courier New',monospace", minHeight:"100vh", overflowX:"hidden", transition:"background .4s, color .4s" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;700&family=Syne:wght@700;800&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;}
        ::selection{background:rgba(${t.accentRgb},.2);color:${t.accent};}
        html{scroll-behavior:smooth;}
        @keyframes blink{50%{opacity:0;}}
        @keyframes fadeUp{from{opacity:0;transform:translateY(28px);}to{opacity:1;transform:translateY(0);}}
        @keyframes gridPulse{0%,100%{opacity:.04}50%{opacity:.09}}
        a{color:${t.link};text-decoration:none;transition:color .2s;}
        a:hover{color:${t.accent};}
      `}</style>

      <Cursor t={t} />

      {/* SCANLINE — dark only */}
      {t.scanline && (
        <div style={{ position:"fixed", inset:0, pointerEvents:"none", zIndex:9990, background:"repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,.06) 2px,rgba(0,0,0,.06) 4px)" }} />
      )}

      {/* GRID BG */}
      <div style={{ position:"fixed", inset:0, pointerEvents:"none", backgroundImage:`linear-gradient(${t.gridColor} 1px,transparent 1px),linear-gradient(90deg,${t.gridColor} 1px,transparent 1px)`, backgroundSize:"60px 60px", animation:"gridPulse 6s ease-in-out infinite", transition:"background-image .4s" }} />

      {/* ── NAV ── */}
      <nav style={{ position:"fixed", top:0, left:0, right:0, zIndex:100, background:t.nav, backdropFilter:"blur(14px)", borderBottom:`1px solid ${t.border}`, padding:"0 5vw", transition:"background .4s,border .4s" }}>
        <div style={{ maxWidth:1100, margin:"0 auto", display:"flex", alignItems:"center", justifyContent:"space-between", height:58 }}>
          <span style={{ fontFamily:"Syne,sans-serif", fontWeight:800, fontSize:16, color:t.accent, transition:"color .4s" }}>
            <span style={{ color:t.textFaint }}>&lt;</span>ahmed.dev<span style={{ color:t.textFaint }}>/&gt;</span>
          </span>
          <div style={{ display:"flex", alignItems:"center", gap:8 }}>
            {NAV_LINKS.map(l => (
              <button key={l} onClick={() => go(l)} style={{
                background: active===l ? t.accentSoft : "none",
                border: "none", fontFamily:"inherit", fontSize:11,
                letterSpacing:".14em", textTransform:"uppercase",
                color: active===l ? t.accent : t.textMuted,
                cursor:"pointer", padding:"6px 12px", borderRadius:2,
                transition:"color .2s,background .2s",
              }}
              onMouseOver={e=>{e.currentTarget.style.color=t.accent;e.currentTarget.style.background=t.accentSoft;}}
              onMouseOut={e=>{e.currentTarget.style.color=active===l?t.accent:t.textMuted;e.currentTarget.style.background=active===l?t.accentSoft:"none";}}
              >{l}</button>
            ))}
            <ThemeToggle dark={dark} toggle={() => setDark(d => !d)} t={t} />
          </div>
        </div>
      </nav>

      <main style={{ maxWidth:1100, margin:"0 auto", padding:"0 5vw" }}>

        {/* ── HERO ── */}
        <section id="about" ref={el => refs.current.about = el} style={{ minHeight:"100vh", display:"flex", flexDirection:"column", justifyContent:"center", paddingTop:100 }}>
          <div style={{ animation:"fadeUp .8s ease both" }}>
            <span style={{ fontSize:10, letterSpacing:".25em", textTransform:"uppercase", color:t.accent, marginBottom:8, display:"block", transition:"color .4s" }}>// cairo, egypt · mern stack developer</span>
            <div style={{ fontSize:"clamp(12px,1.6vw,14px)", color:t.textMuted, marginBottom:14, fontWeight:300, transition:"color .4s" }}>
              <TypeWriter text="Building fintech, crypto & logistics systems at scale" speed={48} accentColor={t.accent} />
            </div>
            <h1 style={{ fontFamily:"Syne,sans-serif", fontWeight:800, fontSize:"clamp(46px,8.5vw,96px)", lineHeight:.98, color:t.text, letterSpacing:"-.025em", marginBottom:20, transition:"color .4s" }}>
              Ahmed<br /><span style={{ color:t.accent, textShadow: dark?"0 0 28px rgba(0,255,157,.35)":"none", transition:"color .4s,text-shadow .4s" }}>Yehia</span>
            </h1>
            <p style={{ maxWidth:560, fontSize:14, lineHeight:1.85, color:t.textMuted, marginBottom:18, fontWeight:300, transition:"color .4s" }}>
              MERN Stack Developer with <span style={{ color:t.accent }}>3+ years</span> building scalable, secure web applications. Delivered fintech trading platforms, crypto payment gateways, CRM systems, and logistics solutions across <span style={{ color:t.accent }}>UAE, Türkiye, and Egypt</span>.
            </p>
            <div style={{ display:"flex", gap:10, flexWrap:"wrap", marginBottom:36 }}>
              {[
                { label:"🏆 Employee of Month × 4", rgb:t.accentRgb, c:t.accent },
                { label:"Fintech · Crypto · Logistics", rgb:"56,189,248", c:"#38bdf8" },
                { label:"8+ Products Shipped", rgb:"251,191,36", c:"#fbbf24" },
              ].map(b => (
                <span key={b.label} style={{ background:`rgba(${b.rgb},.1)`, border:`1px solid rgba(${b.rgb},.3)`, color:b.c, fontSize:11, padding:"4px 14px", borderRadius:20, letterSpacing:".07em" }}>{b.label}</span>
              ))}
            </div>
            <div style={{ display:"flex", gap:12, flexWrap:"wrap" }}>
              <button data-hover onClick={() => go("projects")} style={{ background:t.accent, color: dark?"#080c10":"#fff", border:"none", padding:"12px 28px", borderRadius:2, fontFamily:"inherit", fontWeight:700, fontSize:11, letterSpacing:".12em", textTransform:"uppercase", cursor:"pointer", transition:"opacity .2s,background .4s,color .4s" }} onMouseOver={e=>e.currentTarget.style.opacity=.82} onMouseOut={e=>e.currentTarget.style.opacity=1}>View Projects</button>
              {[
                { label:"Get In Touch", href:"mailto:ahmed.yehia.abdulgawad@gmail.com" },
                { label:"GitHub ↗", href:"https://github.com/Ahmed-yehia12" },
                { label:"LinkedIn ↗", href:"https://linkedin.com/in/ahmed-yehia-95a75420b/" },
              ].map(btn => (
                <a key={btn.label} href={btn.href} target={btn.href.startsWith("http")?"_blank":undefined} rel="noreferrer" data-hover
                  style={{ display:"inline-block", border:`1px solid ${t.border}`, color:t.textMuted, padding:"12px 20px", borderRadius:2, fontSize:11, letterSpacing:".1em", textTransform:"uppercase", transition:"border-color .2s,color .2s,border .4s" }}
                  onMouseOver={e=>{e.currentTarget.style.borderColor=t.accent;e.currentTarget.style.color=t.accent;}}
                  onMouseOut={e=>{e.currentTarget.style.borderColor=t.border;e.currentTarget.style.color=t.textMuted;}}
                >{btn.label}</a>
              ))}
              {/* Download Resume */}
              <a
                href="/Ahmed_Yehia_Resume.pdf"
                download="Ahmed_Yehia_Resume.pdf"
                data-hover
                style={{
                  display:"inline-flex", alignItems:"center", gap:7,
                  border:`1px solid rgba(${t.accentRgb},.4)`,
                  background:`rgba(${t.accentRgb},.07)`,
                  color:t.accent,
                  padding:"12px 20px", borderRadius:2,
                  fontSize:11, letterSpacing:".1em", textTransform:"uppercase",
                  transition:"background .2s,border-color .2s,color .4s,border .4s",
                  fontFamily:"inherit",
                }}
                onMouseOver={e=>{e.currentTarget.style.background=`rgba(${t.accentRgb},.16)`;e.currentTarget.style.borderColor=t.accent;}}
                onMouseOut={e=>{e.currentTarget.style.background=`rgba(${t.accentRgb},.07)`;e.currentTarget.style.borderColor=`rgba(${t.accentRgb},.4)`;}}
              >
                {/* download icon */}
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 3v13M6 11l6 6 6-6"/><path d="M3 20h18"/>
                </svg>
                Resume
              </a>
            </div>
          </div>

          {/* Achievement cards */}
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))", gap:14, marginTop:60, animation:"fadeUp .8s .25s ease both" }}>
            {ACHIEVEMENTS.map(a => (
              <div key={a.title} style={{ background:t.bgCard, border:`1px solid ${t.border}`, borderRadius:4, padding:22, transition:"border-color .25s,background .4s,border .4s" }}
                onMouseOver={e=>e.currentTarget.style.borderColor=t.accent}
                onMouseOut={e=>e.currentTarget.style.borderColor=t.border}
              >
                <div style={{ fontSize:20, marginBottom:10 }}>{a.icon}</div>
                <div style={{ fontFamily:"Syne,sans-serif", fontWeight:700, fontSize:13, color:t.text, marginBottom:6, transition:"color .4s" }}>{a.title}</div>
                <div style={{ fontSize:12, color:t.textMuted, lineHeight:1.75, fontWeight:300, transition:"color .4s" }}>{a.desc}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ── SKILLS ── */}
        <section id="skills" ref={el => refs.current.skills = el} style={{ minHeight:"60vh", paddingTop:120, paddingBottom:80 }}>
          <span style={{ fontSize:10, letterSpacing:".25em", textTransform:"uppercase", color:t.accent, marginBottom:8, display:"block" }}>// tech stack</span>
          <h2 style={{ fontFamily:"Syne,sans-serif", fontWeight:800, fontSize:"clamp(28px,5vw,50px)", color:t.text, marginBottom:44, letterSpacing:"-.02em", transition:"color .4s" }}>
            Skills & <span style={{ color:t.accent, textShadow:dark?"0 0 28px rgba(0,255,157,.35)":"none" }}>Technologies</span>
          </h2>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(230px,1fr))", gap:18 }}>
            {SKILLS.map((g, i) => (
              <div key={g.category} style={{ background:t.bgCard, border:`1px solid ${t.border}`, borderRadius:4, padding:22, animation:`fadeUp .6s ${i*.1}s ease both`, transition:"background .4s,border .4s" }}>
                <div style={{ fontSize:10, color:t.accent, letterSpacing:".2em", textTransform:"uppercase", marginBottom:14, transition:"color .4s" }}>{g.category}</div>
                <div>{g.items.map(item => (
                  <span key={item} style={{ display:"inline-block", background:t.pillBg, border:`1px solid ${t.pillBorder}`, color:t.pillText, fontSize:11, padding:"4px 10px", borderRadius:2, letterSpacing:".03em", margin:3, transition:"background .2s,color .2s,background .4s,border .4s,color .4s", cursor:"default" }}
                    onMouseOver={e=>{e.currentTarget.style.background=`rgba(${t.accentRgb},.13)`;e.currentTarget.style.color=t.accent;}}
                    onMouseOut={e=>{e.currentTarget.style.background=t.pillBg;e.currentTarget.style.color=t.pillText;}}
                  >{item}</span>
                ))}</div>
              </div>
            ))}
          </div>
          <div style={{ marginTop:28, background:t.accentSoft, border:`1px solid ${t.accentBorder}`, borderRadius:4, padding:"18px 24px", display:"flex", alignItems:"center", gap:12, flexWrap:"wrap", transition:"background .4s,border .4s" }}>
            <span style={{ fontSize:10, color:t.accent, letterSpacing:".2em", textTransform:"uppercase" }}>Core Stack</span>
            {["MongoDB","Express.js","React.js","Node.js","NestJS"].map((tech, i, arr) => (
              <span key={tech} style={{ display:"flex", alignItems:"center", gap:10 }}>
                <span style={{ fontFamily:"Syne,sans-serif", fontWeight:700, fontSize:14, color:t.text, transition:"color .4s" }}>{tech}</span>
                {i < arr.length-1 && <span style={{ color:t.textFaint }}>·</span>}
              </span>
            ))}
          </div>
        </section>

        {/* ── PROJECTS ── */}
        <section id="projects" ref={el => refs.current.projects = el} style={{ paddingTop:80, paddingBottom:80 }}>
          <span style={{ fontSize:10, letterSpacing:".25em", textTransform:"uppercase", color:t.accent, marginBottom:8, display:"block" }}>// portfolio</span>
          <h2 style={{ fontFamily:"Syne,sans-serif", fontWeight:800, fontSize:"clamp(28px,5vw,50px)", color:t.text, marginBottom:44, letterSpacing:"-.02em", transition:"color .4s" }}>
            Key <span style={{ color:t.accent, textShadow:dark?"0 0 28px rgba(0,255,157,.35)":"none" }}>Projects</span>
          </h2>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(285px,1fr))", gap:16 }}>
            {PROJECTS.map((p, i) => (
              <div key={p.name} style={{ background:t.bgCard, border:`1px solid ${t.border}`, padding:24, borderRadius:4, transition:"border-color .25s,transform .25s,background .4s,border .4s", animation:`fadeUp .6s ${i*.09}s ease both`, cursor:"default" }}
                onMouseOver={e=>{e.currentTarget.style.borderColor=t.accent;e.currentTarget.style.transform="translateY(-4px)";}}
                onMouseOut={e=>{e.currentTarget.style.borderColor=t.border;e.currentTarget.style.transform="translateY(0)";}}
              >
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", gap:10, marginBottom:10 }}>
                  <span style={{ fontFamily:"Syne,sans-serif", fontWeight:700, fontSize:15, color:t.text, lineHeight:1.3, transition:"color .4s" }}>{p.name}</span>
                  <span style={{
                    fontSize:10, padding:"3px 10px", borderRadius:20, letterSpacing:".07em", whiteSpace:"nowrap",
                    background: p.status==="Live" ? `rgba(${t.accentRgb},.1)` : "rgba(56,189,248,.1)",
                    color: p.status==="Live" ? t.accent : "#38bdf8",
                    border: `1px solid ${p.status==="Live" ? `rgba(${t.accentRgb},.3)` : "rgba(56,189,248,.3)"}`,
                  }}>{p.status}</span>
                </div>
                <p style={{ fontSize:12, color:t.textMuted, lineHeight:1.82, marginBottom:16, fontWeight:300, transition:"color .4s" }}>{p.desc}</p>
                <div style={{ marginBottom:14 }}>
                  {p.tags.map(tag => (
                    <span key={tag} style={{ display:"inline-block", background:t.tagBg, border:`1px solid ${t.tagBorder}`, color:t.tagText, fontSize:10, padding:"3px 8px", borderRadius:2, letterSpacing:".05em", margin:2, transition:"background .4s,border .4s,color .4s" }}>{tag}</span>
                  ))}
                </div>
                <div style={{ fontSize:10, color:t.textFaint, letterSpacing:".1em", textAlign:"right", transition:"color .4s" }}>{p.year}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ── EXPERIENCE ── */}
        <section id="experience" ref={el => refs.current.experience = el} style={{ paddingTop:80, paddingBottom:120 }}>
          <span style={{ fontSize:10, letterSpacing:".25em", textTransform:"uppercase", color:t.accent, marginBottom:8, display:"block" }}>// career</span>
          <h2 style={{ fontFamily:"Syne,sans-serif", fontWeight:800, fontSize:"clamp(28px,5vw,50px)", color:t.text, marginBottom:44, letterSpacing:"-.02em", transition:"color .4s" }}>
            Work <span style={{ color:t.accent, textShadow:dark?"0 0 28px rgba(0,255,157,.35)":"none" }}>Experience</span>
          </h2>
          <div style={{ display:"flex", flexDirection:"column", gap:44 }}>
            {EXPERIENCE.map((exp, i) => (
              <div key={exp.company} style={{ borderLeft:`2px solid ${t.border}`, paddingLeft:24, position:"relative", transition:"border-color .3s,border .4s", animation:`fadeUp .6s ${i*.15}s ease both` }}
                onMouseOver={e=>e.currentTarget.style.borderLeftColor=t.accent}
                onMouseOut={e=>e.currentTarget.style.borderLeftColor=t.border}
              >
                {/* dot */}
                <div style={{ position:"absolute", left:-6, top:4, width:10, height:10, borderRadius:"50%", background:t.accent, boxShadow:dark?`0 0 12px rgba(${t.accentRgb},.6)`:"none", transition:"background .4s" }} />
                <div style={{ display:"flex", justifyContent:"space-between", flexWrap:"wrap", gap:8, marginBottom:4 }}>
                  <div style={{ display:"flex", alignItems:"center", gap:10, flexWrap:"wrap" }}>
                    <span style={{ fontFamily:"Syne,sans-serif", fontWeight:700, fontSize:17, color:t.text, transition:"color .4s" }}>{exp.role}</span>
                    <span style={{ fontSize:13, color:t.accent, transition:"color .4s" }}>@ {exp.company}</span>
                    {exp.highlight && (
                      <span style={{ background:`rgba(${t.accentRgb},.1)`, border:`1px solid rgba(${t.accentRgb},.28)`, color:t.accent, fontSize:10, padding:"2px 10px", borderRadius:20 }}>{exp.highlight}</span>
                    )}
                  </div>
                  <span style={{ fontSize:11, color:t.textFaint, letterSpacing:".1em", alignSelf:"center", transition:"color .4s" }}>{exp.period}</span>
                </div>
                <div style={{ fontSize:11, color:t.textMuted, marginBottom:14, letterSpacing:".05em", transition:"color .4s" }}>{exp.type}</div>
                <ul style={{ listStyle:"none", display:"flex", flexDirection:"column", gap:9 }}>
                  {exp.points.map((pt, j) => (
                    <li key={j} style={{ fontSize:13, color:t.textMuted, lineHeight:1.78, display:"flex", gap:10, fontWeight:300, transition:"color .4s" }}>
                      <span style={{ color:t.accent, flexShrink:0, marginTop:1, transition:"color .4s" }}>▸</span>{pt}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Education */}
          <div style={{ marginTop:60, borderTop:`1px solid ${t.border}`, paddingTop:48, transition:"border .4s" }}>
            <span style={{ fontSize:10, letterSpacing:".25em", textTransform:"uppercase", color:t.accent, marginBottom:8, display:"block" }}>// education</span>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))", gap:16, marginTop:22 }}>
              {[
                { school:"Route Center", degree:"MERN Stack Track", period:"Mar 2022 — Dec 2022", loc:"Maadi, Cairo" },
                { school:"Helwan University", degree:"Bachelor of Law", period:"2016 — 2020", loc:"Cairo, Egypt" },
              ].map(edu => (
                <div key={edu.school} style={{ background:t.bgCard, border:`1px solid ${t.border}`, borderRadius:4, padding:22, transition:"background .4s,border .4s" }}>
                  <div style={{ fontFamily:"Syne,sans-serif", fontWeight:700, fontSize:15, color:t.text, marginBottom:6, transition:"color .4s" }}>{edu.school}</div>
                  <div style={{ fontSize:12, color:t.accent, marginBottom:6, transition:"color .4s" }}>{edu.degree}</div>
                  <div style={{ fontSize:11, color:t.textMuted, letterSpacing:".05em", transition:"color .4s" }}>{edu.period} · {edu.loc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* ── FOOTER ── */}
      <footer style={{ borderTop:`1px solid ${t.border}`, padding:"30px 5vw", textAlign:"center", transition:"border .4s" }}>
        <div style={{ display:"flex", justifyContent:"center", gap:24, marginBottom:14, flexWrap:"wrap" }}>
          {[
            { label:"ahmed.yehia.abdulgawad@gmail.com", href:"mailto:ahmed.yehia.abdulgawad@gmail.com" },
            { label:"+20 111 327 1757", href:"tel:+201113271757" },
            { label:"GitHub ↗", href:"https://github.com/Ahmed-yehia12" },
            { label:"LinkedIn ↗", href:"https://linkedin.com/in/ahmed-yehia-95a75420b/" },
          ].map(l => (
            <a key={l.label} href={l.href} target={l.href.startsWith("http")?"_blank":undefined} rel="noreferrer"
              style={{ fontSize:11, color:t.textMuted, letterSpacing:".07em", transition:"color .2s" }}
              onMouseOver={e=>e.currentTarget.style.color=t.accent}
              onMouseOut={e=>e.currentTarget.style.color=t.textMuted}
            >{l.label}</a>
          ))}
        </div>
        <p style={{ fontSize:11, color:t.textFaint, letterSpacing:".1em", transition:"color .4s" }}>
          Built with <span style={{ color:t.accent }}>React</span> · Deployed on <span style={{ color:t.accent }}>Vercel</span> · © 2025 Ahmed Yehia
        </p>
      </footer>
    </div>
  );
}
