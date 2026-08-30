import { useState, useEffect, useRef } from "react";

const LANGUAGES = {
  en: { code: "en", label: "English", short: "EN", dir: "ltr" },
  ar: { code: "ar", label: "العربية", short: "AR", dir: "rtl" },
};

const CONTENT = {
  en: {
    navLinks: [
      { id: "about", label: "about" },
      { id: "skills", label: "skills" },
      { id: "projects", label: "projects" },
      { id: "experience", label: "experience" },
    ],
    hero: {
      eyebrow: "// cairo, egypt · mern stack developer",
      typewriter: "Building fintech, crypto & logistics systems at scale",
      firstName: "Ahmed",
      lastName: "Yehia",
      bio: (
        <>
          MERN Stack Developer with <Accent>3+ years</Accent> building scalable, secure web applications. Delivered fintech trading platforms, crypto payment gateways, CRM systems, and logistics solutions across <Accent>UAE, Türkiye, and Egypt</Accent>.
        </>
      ),
      badges: ["🏆 Employee of Month × 4", "Fintech · Crypto · Logistics", "8+ Products Shipped"],
      ctaProjects: "View Projects",
      contact: "Get In Touch",
      github: "GitHub ↗",
      linkedin: "LinkedIn ↗",
      resume: "Resume",
    },
    skillsLabel: "// tech stack",
    skillsTitleStart: "Skills &",
    skillsTitleAccent: "Technologies",
    coreStack: "Core Stack",
    projectsLabel: "// portfolio",
    projectsTitleStart: "Key",
    projectsTitleAccent: "Projects",
    experienceLabel: "// career",
    experienceTitleStart: "Work",
    experienceTitleAccent: "Experience",
    educationLabel: "// education",
    footer: {
      github: "GitHub ↗",
      linkedin: "LinkedIn ↗",
      built: "Built with",
      deployed: "Deployed on",
    },
    skills: [
      { category: "Frontend", items: ["React.js", "Next.js", "Redux Toolkit", "Redux-Saga", "TypeScript", "JavaScript ES6+", "HTML5", "CSS3", "SASS", "Tailwind CSS", "Bootstrap 5"] },
      { category: "Backend", items: ["Node.js", "Express.js", "NestJS", "REST APIs", "GraphQL", "Socket.io", "RabbitMQ", "JWT Auth", "OOP"] },
      { category: "Databases", items: ["MongoDB", "PostgreSQL", "MySQL", "Mongoose", "Prisma ORM", "Sequelize ORM"] },
      { category: "Tools & Practices", items: ["Git / GitHub", "Cloudinary", "Multer", "Joi", "Bcrypt.js", "CI/CD Basics", "Agile / Scrum"] },
    ],
    projects: [
      {
        name: "Customer Support System",
        company: "Finitic",
        url: "https://merchant.cyrafa.net/login",
        desc: "Centralized customer support platform for managing tickets, customer communication, attachments, and reporting, backed by a scalable architecture.",
        highlights: ["Ticket lifecycle management", "Role-based permissions", "Real-time notifications", "Real-time chat"],
        tags: ["TypeScript", "React", "Node.js", "Express.js", "MongoDB", "Socket.io", "RabbitMQ", "RBAC", "REST APIs"],
        status: "Live",
        year: "",
      },
      { name: "Client Portal", url: "https://my-bugfree.exiniti.com/login", desc: "Client portal for managing trading accounts, monitoring portfolios, making deposits and withdrawals, and accessing account information. Integrated MT4/MT5 services and multiple payment gateways with secure authentication and a responsive, user-friendly interface.", highlights: ["Crypto gateway", "Hesaby gateway", "Cyrafa gateway", "Checkout gateway", "Wire transfer", "MT4/MT5"], tags: ["Node.js", "Express.js", "MongoDB", "Transaction Monitoring", "IT Integration", "Mongoose", "React.js", "JavaScript", "Redux-Saga"], status: "Live", year: "" },
      { name: "Forex CRM System", url: "https://crm-bugfree.exiniti.com/login", desc: "CRM for brokerage companies to manage clients on MT4/MT5. Built automated commission & rebate engine for Introducing Broker hierarchies.", highlights: ["MT4/MT5", "Crypto gateway", "Hesaby gateway", "Cyrafa gateway", "Checkout gateway", "Wire transfer"], tags: ["Node.js", "React.js", "Mongoose", "RabbitMQ", "Socket.io", "Express.js", "Engineering Leadership", "MongoDB", "MySQL", "IT Integration", "Redux-Saga"], status: "Live", year: "2024" },
      { name: "Crypto Payment Gateway", url: "https://merchant.cyrafa.com/login", desc: "Multi-currency crypto gateway enabling merchants to accept crypto, verify wallet transactions, and run automated reconciliation for crypto to fiat tracking.", tags: ["TypeScript", "React.js", "Material UI", "Redux-Saga", "MongoDB", "Mongoose", "Express.js"], status: "Live", year: "2024" },
      { name: "Crypto CRM System", url: "https://new-crm.cyrafa.net/login", desc: "CRM for crypto-fintech ops with KYC dashboards, client lifecycle management, and real-time transaction monitoring with full audit trails.", tags: ["JavaScript", "React.js", "Material UI", "Redux-Saga", "MongoDB", "Mongoose", "Express.js"], status: "Live", year: "2024" },
      { name: "TPSS Trading Platform", desc: "Full trading system for clients to execute trades and track open positions in real time. Includes position reflection, order lifecycle, and exposure calculation.", tags: ["React.js", "NestJS", "TypeScript", "Prisma", "PostgreSQL"], status: "Live", year: "2024" },
      { name: "FreshCart E-Commerce", url: "https://ahmed-yehia12.github.io/E-CommerceReactJs/#/login", desc: "Full-stack e-commerce with product catalog, cart, checkout, orders, and Stripe payments. Optimized REST APIs and Redux Toolkit state management.", tags: ["React.js", "Redux Toolkit", "Node.js", "MongoDB", "Stripe"], status: "Open Source", year: "2023" },
      { name: "Dalelok Platform", desc: "Dubizzle-style classified marketplace with listings, categories, search, filters, and user profiles. Scalable backend APIs and responsive React UI.", tags: ["Node.js", "PostgreSQL", "Express.js", "IT Strategy", "Web Chat", "IT Integration", "Sequelize.js", "I18n"], status: "Live", year: "2024" },
      { name: "Tawseela Logistics", desc: "Delivery platform for Customers, Captains, and Operators with shipment dashboards, captain management, and cash reconciliation tools.", tags: ["Node.js", "MongoDB", "React.js", "Express.js"], status: "Live", year: "2023" },
      { name: "Saraha Anonymous Messaging", desc: "Anonymous messaging app with inbox management, message moderation, and secure user sessions with zero sender identity exposure.", tags: ["Node.js", "Express.js", "MongoDB", "React.js"], status: "Open Source", year: "2023" },
    ],
    experience: [
      {
        role: "Senior MERN Stack Developer",
        company: "Finitic",
        type: "Fintech / Crypto · UAE (Hybrid)",
        period: "Sep 2024 - Present",
        highlight: "🏆 Employee of Month × 4",
        points: [
          "Promoted to Senior Developer after consistently delivering high-impact systems, leading a team of 6 developers for the past 5 months.",
          "Set technical direction, conducted code reviews, and mentored junior developers to maintain code quality and delivery speed.",
          "Designed core backend systems for a trading platform, crypto payment gateway, and subscription management services.",
          "Built secure trading and wallet APIs using NestJS with RBAC, strong validation, and JWT authentication.",
          "Integrated async transaction pipelines using RabbitMQ for reliable syncing across partner platforms.",
          "Implemented real-time tracking for client positions, orders, and transaction history.",
        ],
      },
      {
        role: "MERN Stack Developer",
        company: "Why Not Tech",
        type: "Türkiye (Remote)",
        period: "May 2024 - Sep 2024",
        highlight: null,
        points: [
          "Built a classified-ads marketplace enabling users to buy, sell, and trade products/services.",
          "Developed RESTful APIs for client features and a full admin management panel.",
          "Delivered real-time buyer/seller chat using Socket.io.",
          "Implemented secure JWT auth with role-based access and payment gateway integration.",
        ],
      },
      {
        role: "Software Developer (MERN)",
        company: "Tawseela Express",
        type: "Maadi, Cairo",
        period: "Feb 2023 - May 2024",
        highlight: null,
        points: [
          "Developed a delivery logistics platform for Customers, Captains, and Operators.",
          "Built responsive React dashboards for shipment creation, assignment, and real-time tracking.",
          "Implemented Node.js + MongoDB backend for shipments, roles, and cash reconciliation.",
          "Delivered operator tools: daily shipment sheets, captain management, and performance views.",
        ],
      },
    ],
    achievements: [
      { icon: "🏆", title: "Employee of Month × 4", desc: "Awarded 4 consecutive months at Finitic, promoted to Senior and leading a team of 6 developers." },
      { icon: "⚡", title: "Real-Time Trading Systems", desc: "Core backend for trading and crypto payment products with real-time positions via RabbitMQ pipelines." },
      { icon: "🔗", title: "MT4/MT5 Integration", desc: "Integrated TPSS and MT4/MT5 platforms ensuring accurate trade, position, and commission reflection." },
      { icon: "🤖", title: "Automated IB Engine", desc: "Developed IB commission and rebate engine eliminating manual processing across brokerage operations." },
    ],
    education: [
      { school: "Route Center", degree: "MERN Stack Track", period: "Mar 2022 - Dec 2022", loc: "Maadi, Cairo" },
      { school: "Helwan University", degree: "Bachelor of Law", period: "2016 - 2020", loc: "Cairo, Egypt" },
    ],
  },
  ar: {
    navLinks: [
      { id: "about", label: "نبذة" },
      { id: "skills", label: "المهارات" },
      { id: "projects", label: "المشاريع" },
      { id: "experience", label: "الخبرة" },
    ],
    hero: {
      eyebrow: "// القاهرة، مصر · مطور MERN Stack",
      typewriter: "أبني أنظمة Fintech وCrypto ولوجستيات قابلة للتوسع",
      firstName: "أحمد",
      lastName: "يحيى",
      bio: (
        <>
          مطور MERN Stack بخبرة تزيد عن <Accent>3 سنوات</Accent> في بناء تطبيقات ويب آمنة وقابلة للتوسع. أنجزت منصات تداول Fintech، بوابات دفع Crypto، أنظمة CRM، وحلول لوجستية في <Accent>الإمارات وتركيا ومصر</Accent>.
        </>
      ),
      badges: ["🏆 موظف الشهر × 4", "Fintech · Crypto · Logistics", "أكثر من 8 منتجات تم إطلاقها"],
      ctaProjects: "عرض المشاريع",
      contact: "تواصل معي",
      github: "GitHub ↗",
      linkedin: "LinkedIn ↗",
      resume: "السيرة الذاتية",
    },
    skillsLabel: "// التقنيات",
    skillsTitleStart: "المهارات",
    skillsTitleAccent: "والتقنيات",
    coreStack: "التقنيات الأساسية",
    projectsLabel: "// الأعمال",
    projectsTitleStart: "أهم",
    projectsTitleAccent: "المشاريع",
    experienceLabel: "// المسيرة",
    experienceTitleStart: "الخبرة",
    experienceTitleAccent: "العملية",
    educationLabel: "// التعليم",
    footer: {
      github: "GitHub ↗",
      linkedin: "LinkedIn ↗",
      built: "تم البناء باستخدام",
      deployed: "منشور على",
    },
    skills: [
      { category: "الواجهة الأمامية", items: ["React.js", "Next.js", "Redux Toolkit", "Redux-Saga", "TypeScript", "JavaScript ES6+", "HTML5", "CSS3", "SASS", "Tailwind CSS", "Bootstrap 5"] },
      { category: "الخلفية", items: ["Node.js", "Express.js", "NestJS", "REST APIs", "GraphQL", "Socket.io", "RabbitMQ", "JWT Auth", "OOP"] },
      { category: "قواعد البيانات", items: ["MongoDB", "PostgreSQL", "MySQL", "Mongoose", "Prisma ORM", "Sequelize ORM"] },
      { category: "الأدوات والممارسات", items: ["Git / GitHub", "Cloudinary", "Multer", "Joi", "Bcrypt.js", "أساسيات CI/CD", "Agile / Scrum"] },
    ],
    projects: [
      {
        name: "نظام دعم العملاء",
        company: "Finitic",
        url: "https://merchant.cyrafa.net/login",
        desc: "منصة مركزية لدعم العملاء وإدارة التذاكر والتواصل مع المستخدمين والمرفقات والتقارير، مدعومة ببنية خلفية قابلة للتوسع.",
        highlights: ["إدارة دورة حياة التذاكر", "صلاحيات مبنية على الأدوار", "إشعارات لحظية", "محادثات لحظية"],
        tags: ["TypeScript", "React", "Node.js", "NestJS", "MongoDB", "Socket.io", "RabbitMQ", "RBAC", "REST APIs"],
        status: "مباشر",
        year: "",
      },
      { name: "بوابة العملاء", url: "https://my-bugfree.exiniti.com/login", desc: "بوابة تتيح للعملاء إدارة حسابات التداول ومتابعة المحافظ وإجراء عمليات الإيداع والسحب والوصول إلى معلومات الحساب. تتكامل مع خدمات MT4/MT5 وبوابات دفع متعددة، مع مصادقة آمنة وواجهة متجاوبة وسهلة الاستخدام.", highlights: ["بوابة Crypto", "بوابة Hesaby", "بوابة Cyrafa", "بوابة Checkout", "تحويل بنكي", "MT4/MT5"], tags: ["Node.js", "Express.js", "MongoDB", "Transaction Monitoring", "IT Integration", "Mongoose", "React.js", "JavaScript", "Redux-Saga"], status: "خاص", year: "" },
      { name: "منصة TPSS للتداول", desc: "نظام تداول متكامل يتيح للعملاء تنفيذ الصفقات ومتابعة المراكز المفتوحة لحظيا، مع إدارة دورة حياة الأوامر وحساب التعرض.", tags: ["React.js", "NestJS", "TypeScript", "Prisma", "PostgreSQL"], status: "مباشر", year: "2024" },
      { name: "نظام Forex CRM", url: "https://crm-bugfree.exiniti.com/login", desc: "نظام CRM لشركات الوساطة لإدارة العملاء على MT4/MT5، مع محرك عمولات وRebate آلي لهياكل Introducing Broker.", highlights: ["MT4/MT5", "بوابة Crypto", "بوابة Hesaby", "بوابة Cyrafa", "بوابة Checkout", "تحويل بنكي"], tags: ["Node.js", "React.js", "Mongoose", "RabbitMQ", "Socket.io", "Express.js", "Engineering Leadership", "MongoDB", "MySQL", "IT Integration", "Redux-Saga"], status: "مباشر", year: "2024" },
      { name: "بوابة دفع Crypto", url: "https://merchant.cyrafa.com/login", desc: "بوابة دفع متعددة العملات تتيح للتجار قبول العملات الرقمية، التحقق من معاملات المحافظ، وتشغيل تسويات آلية بين Crypto وFiat.", tags: ["TypeScript", "React.js", "Material UI", "Redux-Saga", "MongoDB", "Mongoose", "Express.js"], status: "مباشر", year: "2024" },
      { name: "نظام Crypto CRM", url: "https://new-crm.cyrafa.net/login", desc: "نظام CRM لعمليات Crypto Fintech يضم لوحات KYC، إدارة دورة حياة العملاء، ومراقبة معاملات لحظية مع سجل تدقيق كامل.", tags: ["JavaScript", "React.js", "Material UI", "Redux-Saga", "MongoDB", "Mongoose", "Express.js"], status: "مباشر", year: "2024" },
      { name: "منصة Dalelok", desc: "سوق إعلانات مبوبة بأسلوب Dubizzle يضم الإعلانات والتصنيفات والبحث والفلاتر وملفات المستخدمين، مع APIs قابلة للتوسع وواجهة React متجاوبة.", tags: ["Node.js", "PostgreSQL", "Express.js", "IT Strategy", "Web Chat", "IT Integration", "Sequelize.js", "I18n"], status: "مباشر", year: "2024" },
      { name: "FreshCart E-Commerce", url: "https://ahmed-yehia12.github.io/E-CommerceReactJs/#/login", desc: "متجر إلكتروني Full Stack يشمل كتالوج المنتجات، السلة، الدفع، الطلبات، ومدفوعات Stripe مع REST APIs محسنة وإدارة حالة عبر Redux Toolkit.", tags: ["React.js", "Redux Toolkit", "Node.js", "MongoDB", "Stripe"], status: "مفتوح المصدر", year: "2023" },
      { name: "Tawseela Logistics", desc: "منصة توصيل للعملاء والكباتن والمشغلين مع لوحات شحنات، إدارة الكباتن، وأدوات تسوية نقدية.", tags: ["Node.js", "MongoDB", "React.js", "Express.js"], status: "مباشر", year: "2023" },
      { name: "Saraha Anonymous Messaging", desc: "تطبيق رسائل مجهولة يضم إدارة صندوق الوارد، مراجعة الرسائل، وجلسات مستخدم آمنة بدون كشف هوية المرسل.", tags: ["Node.js", "Express.js", "MongoDB", "React.js"], status: "مفتوح المصدر", year: "2023" },
    ],
    experience: [
      {
        role: "Senior MERN Stack Developer",
        company: "Finitic",
        type: "Fintech / Crypto · الإمارات (Hybrid)",
        period: "سبتمبر 2024 - حتى الآن",
        highlight: "🏆 موظف الشهر × 4",
        points: [
          "تمت ترقيتي إلى Senior Developer بعد تسليم أنظمة عالية التأثير باستمرار، مع قيادة فريق من 6 مطورين خلال آخر 5 أشهر.",
          "وضعت التوجهات التقنية، وراجعت الكود، ووجهت المطورين الجدد للحفاظ على جودة التنفيذ وسرعة التسليم.",
          "صممت أنظمة Backend أساسية لمنصة تداول، بوابة دفع Crypto، وخدمات إدارة الاشتراكات.",
          "بنيت APIs آمنة للتداول والمحافظ باستخدام NestJS مع RBAC، تحقق قوي، ومصادقة JWT.",
          "دمجت مسارات معاملات غير متزامنة باستخدام RabbitMQ لضمان مزامنة موثوقة بين المنصات الشريكة.",
          "نفذت تتبعا لحظيا لمراكز العملاء والأوامر وسجل المعاملات.",
        ],
      },
      {
        role: "MERN Stack Developer",
        company: "Why Not Tech",
        type: "تركيا (Remote)",
        period: "مايو 2024 - سبتمبر 2024",
        highlight: null,
        points: [
          "بنيت سوق إعلانات مبوبة يتيح للمستخدمين شراء وبيع وتبادل المنتجات والخدمات.",
          "طورت RESTful APIs لخصائص العملاء ولوحة إدارة كاملة.",
          "نفذت محادثة لحظية بين البائع والمشتري باستخدام Socket.io.",
          "طبقت مصادقة JWT آمنة بصلاحيات مبنية على الأدوار مع تكامل بوابة دفع.",
        ],
      },
      {
        role: "Software Developer (MERN)",
        company: "Tawseela Express",
        type: "المعادي، القاهرة",
        period: "فبراير 2023 - مايو 2024",
        highlight: null,
        points: [
          "طورت منصة لوجستية لإدارة عمليات العملاء والكباتن والمشغلين.",
          "بنيت لوحات React متجاوبة لإنشاء الشحنات وتعيينها وتتبعها لحظيا.",
          "نفذت Backend باستخدام Node.js وMongoDB للشحنات والصلاحيات والتسويات النقدية.",
          "سلمت أدوات للمشغلين تشمل كشوف الشحنات اليومية، إدارة الكباتن، وعروض الأداء.",
        ],
      },
    ],
    achievements: [
      { icon: "🏆", title: "موظف الشهر × 4", desc: "حصلت على الجائزة 4 أشهر متتالية في Finitic، مع الترقية إلى Senior وقيادة فريق من 6 مطورين." },
      { icon: "⚡", title: "أنظمة تداول لحظية", desc: "Backend أساسي لمنتجات التداول والدفع بالعملات الرقمية مع مراكز لحظية عبر RabbitMQ." },
      { icon: "🔗", title: "تكامل MT4/MT5", desc: "دمجت منصات TPSS وMT4/MT5 لضمان انعكاس دقيق للصفقات والمراكز والعمولات." },
      { icon: "🤖", title: "محرك IB آلي", desc: "طورت محرك عمولات وRebate للـ IB يقلل المعالجة اليدوية في عمليات شركات الوساطة." },
    ],
    education: [
      { school: "Route Center", degree: "مسار MERN Stack", period: "مارس 2022 - ديسمبر 2022", loc: "المعادي، القاهرة" },
      { school: "جامعة حلوان", degree: "ليسانس حقوق", period: "2016 - 2020", loc: "القاهرة، مصر" },
    ],
  },
};

const CORE_STACK = ["MongoDB", "Express.js", "React.js", "Node.js", "NestJS"];

function Accent({ children }) {
  return <span data-accent>{children}</span>;
}

const DARK = {
  bg: "#080c10",
  bgCard: "#0d1318",
  bgCardHov: "#111820",
  nav: "rgba(8,12,16,.90)",
  border: "#1a2530",
  borderHov: "rgba(0,255,157,.35)",
  text: "#e8f4f0",
  textMid: "#c8d8e8",
  textMuted: "#8fa3b0",
  textFaint: "#5d7280",
  accent: "#00ff9d",
  accentRgb: "0,255,157",
  accentSoft: "rgba(0,255,157,.06)",
  accentBorder: "rgba(0,255,157,.18)",
  link: "#38bdf8",
  tagBg: "#0a1520",
  tagBorder: "#1e3040",
  tagText: "#89b89e",
  pillBg: "rgba(0,255,157,.05)",
  pillBorder: "rgba(0,255,157,.14)",
  pillText: "#9bc9ad",
  gridColor: "rgba(0,255,157,.04)",
  scanline: true,
  cursor: true,
};

const LIGHT = {
  bg: "#f5f7fa",
  bgCard: "#ffffff",
  bgCardHov: "#f0f4ff",
  nav: "rgba(245,247,250,.92)",
  border: "#dde4ef",
  borderHov: "#4f46e5",
  text: "#0f172a",
  textMid: "#1e293b",
  textMuted: "#64748b",
  textFaint: "#94a3b8",
  accent: "#4f46e5",
  accentRgb: "79,70,229",
  accentSoft: "rgba(79,70,229,.06)",
  accentBorder: "rgba(79,70,229,.22)",
  link: "#0ea5e9",
  tagBg: "#eef2ff",
  tagBorder: "#c7d2fe",
  tagText: "#4338ca",
  pillBg: "rgba(79,70,229,.07)",
  pillBorder: "rgba(79,70,229,.2)",
  pillText: "#4338ca",
  gridColor: "rgba(79,70,229,.04)",
  scanline: false,
  cursor: false,
};

function ThemeToggle({ dark, toggle }) {
  return (
    <button
      onClick={toggle}
      aria-label="Toggle theme"
      title="Toggle theme"
      style={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        width: 52,
        height: 28,
        borderRadius: 14,
        background: dark ? "rgba(0,255,157,.15)" : "rgba(79,70,229,.12)",
        border: `1px solid ${dark ? "rgba(0,255,157,.3)" : "rgba(79,70,229,.3)"}`,
        cursor: "pointer",
        padding: "0 4px",
        transition: "background .3s, border .3s",
        flexShrink: 0,
      }}
    >
      <span style={{ position: "absolute", left: 7, fontSize: 13, opacity: dark ? 0.3 : 1, transition: "opacity .3s", userSelect: "none" }}>☀</span>
      <span style={{ position: "absolute", right: 7, fontSize: 12, opacity: dark ? 1 : 0.3, transition: "opacity .3s", userSelect: "none" }}>☾</span>
      <span
        style={{
          position: "absolute",
          left: dark ? 26 : 4,
          width: 20,
          height: 20,
          borderRadius: "50%",
          background: dark ? "#00ff9d" : "#4f46e5",
          transition: "left .3s, background .3s",
          boxShadow: dark ? "0 0 8px rgba(0,255,157,.5)" : "0 0 8px rgba(79,70,229,.4)",
        }}
      />
    </button>
  );
}

function LanguageToggle({ language, setLanguage, t }) {
  return (
    <div
      role="group"
      aria-label="Select language"
      style={{
        display: "inline-flex",
        alignItems: "center",
        border: `1px solid ${t.border}`,
        background: t.accentSoft,
        borderRadius: 999,
        padding: 3,
        gap: 3,
        flexShrink: 0,
      }}
    >
      {Object.values(LANGUAGES).map((lang) => {
        const selected = language === lang.code;
        return (
          <button
            key={lang.code}
            onClick={() => setLanguage(lang.code)}
            aria-pressed={selected}
            title={`Switch to ${lang.label}`}
            style={{
              border: "none",
              background: selected ? t.accent : "transparent",
              color: selected ? (t === DARK ? "#080c10" : "#fff") : t.textMuted,
              borderRadius: 999,
              cursor: "pointer",
              fontFamily: "inherit",
              fontWeight: 700,
              fontSize: 10,
              letterSpacing: ".08em",
              minWidth: 34,
              height: 22,
              transition: "background .2s, color .2s",
            }}
          >
            {lang.short}
          </button>
        );
      })}
    </div>
  );
}

function Cursor({ t }) {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [hov, setHov] = useState(false);

  useEffect(() => {
    const mv = (e) => setPos({ x: e.clientX, y: e.clientY });
    const ov = (e) => setHov(!!e.target.closest("a,button,[data-hover]"));
    window.addEventListener("mousemove", mv);
    window.addEventListener("mouseover", ov);
    return () => {
      window.removeEventListener("mousemove", mv);
      window.removeEventListener("mouseover", ov);
    };
  }, []);

  if (!t.cursor) return null;

  return (
    <>
      <div style={{ position: "fixed", left: pos.x - 4, top: pos.y - 4, width: 8, height: 8, borderRadius: "50%", background: t.accent, pointerEvents: "none", zIndex: 9999, transform: hov ? "scale(2.5)" : "scale(1)", transition: "transform .1s" }} />
      <div style={{ position: "fixed", left: pos.x - 18, top: pos.y - 18, width: 36, height: 36, borderRadius: "50%", border: `1px solid rgba(${t.accentRgb},.35)`, pointerEvents: "none", zIndex: 9998, transition: "left .12s,top .12s,transform .2s", transform: hov ? "scale(1.5)" : "scale(1)" }} />
    </>
  );
}

function TypeWriter({ text, speed = 55, accentColor }) {
  const [out, setOut] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    setOut("");
    setDone(false);
    let i = 0;
    const ti = setInterval(() => {
      setOut(text.slice(0, ++i));
      if (i >= text.length) {
        clearInterval(ti);
        setDone(true);
      }
    }, speed);
    return () => clearInterval(ti);
  }, [text, speed]);

  return <span>{out}{!done && <span style={{ animation: "blink 1s step-end infinite", color: accentColor }}>|</span>}</span>;
}

export default function Portfolio() {
  const [dark, setDark] = useState(true);
  const [language, setLanguage] = useState("en");
  const [active, setActive] = useState("about");
  const refs = useRef({});
  const t = dark ? DARK : LIGHT;
  const copy = CONTENT[language];
  const isArabic = language === "ar";

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = LANGUAGES[language].dir;
  }, [language]);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); }),
      { threshold: 0.3 }
    );
    Object.values(refs.current).forEach((el) => el && obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const go = (id) => refs.current[id]?.scrollIntoView({ behavior: "smooth" });

  const buttonTextColor = dark ? "#080c10" : "#fff";
  const rtlTextAlign = isArabic ? "right" : "left";
  const timelineBorder = isArabic ? "borderRight" : "borderLeft";
  const timelinePadding = isArabic ? "paddingRight" : "paddingLeft";
  const dotSide = isArabic ? { right: -6 } : { left: -6 };

  return (
    <div dir={LANGUAGES[language].dir} style={{ background: t.bg, color: t.textMid, fontFamily: isArabic ? "'Tajawal','JetBrains Mono','Fira Code','Courier New',monospace" : "'JetBrains Mono','Fira Code','Courier New',monospace", minHeight: "100vh", overflowX: "hidden", transition: "background .4s, color .4s" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;700&family=Syne:wght@700;800&family=Tajawal:wght@300;400;500;700;800&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;}
        ::selection{background:rgba(${t.accentRgb},.2);color:${t.accent};}
        html{scroll-behavior:smooth;}
        [data-accent]{color:${t.accent};}
        @keyframes blink{50%{opacity:0;}}
        @keyframes fadeUp{from{opacity:0;transform:translateY(28px);}to{opacity:1;transform:translateY(0);}}
        @keyframes gridPulse{0%,100%{opacity:.04}50%{opacity:.09}}
        a{color:${t.link};text-decoration:none;transition:color .2s;}
        a:hover{color:${t.accent};}
        .hero-layout{display:grid;grid-template-columns:minmax(0,1fr) minmax(240px,300px);align-items:center;gap:clamp(32px,6vw,72px);}
        .hero-portrait{width:100%;max-width:300px;justify-self:center;animation:fadeUp .8s .15s ease both;}
        .hero-portrait img{display:block;width:100%;aspect-ratio:1;object-fit:cover;object-position:center top;}
        @media(max-width:800px){
          .hero-layout{grid-template-columns:1fr;}
          .hero-portrait{max-width:230px;margin-top:40px;}
        }
      `}</style>

      <Cursor t={t} />

      {t.scanline && (
        <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 9990, background: "repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,.06) 2px,rgba(0,0,0,.06) 4px)" }} />
      )}

      <div style={{ position: "fixed", inset: 0, pointerEvents: "none", backgroundImage: `linear-gradient(${t.gridColor} 1px,transparent 1px),linear-gradient(90deg,${t.gridColor} 1px,transparent 1px)`, backgroundSize: "60px 60px", animation: "gridPulse 6s ease-in-out infinite", transition: "background-image .4s" }} />

      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, background: t.nav, backdropFilter: "blur(14px)", borderBottom: `1px solid ${t.border}`, padding: "0 5vw", transition: "background .4s,border .4s" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", minHeight: 58, gap: 14, flexWrap: "wrap", padding: "8px 0" }}>
          <span style={{ fontFamily: "Syne,sans-serif", fontWeight: 800, fontSize: 16, color: t.accent, transition: "color .4s", direction: "ltr" }}>
            <span style={{ color: t.textFaint }}>&lt;</span>ahmed.dev<span style={{ color: t.textFaint }}>/&gt;</span>
          </span>
          <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", justifyContent: isArabic ? "flex-start" : "flex-end" }}>
            {copy.navLinks.map((l) => (
              <button
                key={l.id}
                onClick={() => go(l.id)}
                style={{
                  background: active === l.id ? t.accentSoft : "none",
                  border: "none",
                  fontFamily: "inherit",
                  fontSize: 11,
                  letterSpacing: isArabic ? 0 : ".14em",
                  textTransform: isArabic ? "none" : "uppercase",
                  color: active === l.id ? t.accent : t.textMuted,
                  cursor: "pointer",
                  padding: "6px 12px",
                  borderRadius: 2,
                  transition: "color .2s,background .2s",
                }}
                onMouseOver={(e) => { e.currentTarget.style.color = t.accent; e.currentTarget.style.background = t.accentSoft; }}
                onMouseOut={(e) => { e.currentTarget.style.color = active === l.id ? t.accent : t.textMuted; e.currentTarget.style.background = active === l.id ? t.accentSoft : "none"; }}
              >
                {l.label}
              </button>
            ))}
            <LanguageToggle language={language} setLanguage={setLanguage} t={t} />
            <ThemeToggle dark={dark} toggle={() => setDark((d) => !d)} />
          </div>
        </div>
      </nav>

      <main style={{ maxWidth: 1100, margin: "0 auto", padding: "0 5vw", position: "relative" }}>
        <section id="about" ref={(el) => { refs.current.about = el; }} style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", paddingTop: 120, textAlign: rtlTextAlign }}>
          <div className="hero-layout">
            <div style={{ animation: "fadeUp .8s ease both" }}>
              <span style={{ fontSize: 10, letterSpacing: isArabic ? ".04em" : ".25em", textTransform: isArabic ? "none" : "uppercase", color: t.accent, marginBottom: 8, display: "block", transition: "color .4s" }}>{copy.hero.eyebrow}</span>
              <div style={{ fontSize: "clamp(12px,1.6vw,14px)", color: t.textMuted, marginBottom: 14, fontWeight: 300, transition: "color .4s" }}>
                <TypeWriter text={copy.hero.typewriter} speed={48} accentColor={t.accent} />
              </div>
              <h1 style={{ fontFamily: isArabic ? "Tajawal,sans-serif" : "Syne,sans-serif", fontWeight: 800, fontSize: "clamp(46px,8.5vw,96px)", lineHeight: 1.02, color: t.text, letterSpacing: 0, marginBottom: 20, transition: "color .4s" }}>
                {copy.hero.firstName}<br /><span style={{ color: t.accent, textShadow: dark ? "0 0 28px rgba(0,255,157,.35)" : "none", transition: "color .4s,text-shadow .4s" }}>{copy.hero.lastName}</span>
              </h1>
              <p style={{ maxWidth: 610, fontSize: 14, lineHeight: 1.9, color: t.textMuted, marginBottom: 18, fontWeight: 300, transition: "color .4s", marginInlineEnd: isArabic ? 0 : "auto" }}>
                {copy.hero.bio}
              </p>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 36, justifyContent: isArabic ? "flex-end" : "flex-start" }}>
                {copy.hero.badges.map((label, index) => {
                  const badgeColors = [
                    { rgb: t.accentRgb, c: t.accent },
                    { rgb: "56,189,248", c: "#38bdf8" },
                    { rgb: "251,191,36", c: "#fbbf24" },
                  ];
                  const b = badgeColors[index];
                  return (
                    <span key={label} style={{ background: `rgba(${b.rgb},.1)`, border: `1px solid rgba(${b.rgb},.3)`, color: b.c, fontSize: 11, padding: "4px 14px", borderRadius: 20, letterSpacing: isArabic ? 0 : ".07em" }}>
                      {label}
                    </span>
                  );
                })}
              </div>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: isArabic ? "flex-end" : "flex-start" }}>
              <button data-hover onClick={() => go("projects")} style={{ background: t.accent, color: buttonTextColor, border: "none", padding: "12px 28px", borderRadius: 2, fontFamily: "inherit", fontWeight: 700, fontSize: 11, letterSpacing: isArabic ? 0 : ".12em", textTransform: isArabic ? "none" : "uppercase", cursor: "pointer", transition: "opacity .2s,background .4s,color .4s" }} onMouseOver={(e) => { e.currentTarget.style.opacity = .82; }} onMouseOut={(e) => { e.currentTarget.style.opacity = 1; }}>{copy.hero.ctaProjects}</button>
              {[
                { label: copy.hero.contact, href: "mailto:ahmed.yehia.abdulgawad@gmail.com" },
                { label: copy.hero.github, href: "https://github.com/Ahmed-yehia12" },
                { label: copy.hero.linkedin, href: "https://linkedin.com/in/ahmed-yehia-95a75420b/" },
              ].map((btn) => (
                <a
                  key={btn.label}
                  href={btn.href}
                  target={btn.href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                  data-hover
                  style={{ display: "inline-block", border: `1px solid ${t.border}`, color: t.textMuted, padding: "12px 20px", borderRadius: 2, fontSize: 11, letterSpacing: isArabic ? 0 : ".1em", textTransform: isArabic ? "none" : "uppercase", transition: "border-color .2s,color .2s,border .4s" }}
                  onMouseOver={(e) => { e.currentTarget.style.borderColor = t.accent; e.currentTarget.style.color = t.accent; }}
                  onMouseOut={(e) => { e.currentTarget.style.borderColor = t.border; e.currentTarget.style.color = t.textMuted; }}
                >
                  {btn.label}
                </a>
              ))}
              <a
                href="/Ahmed_Yehia_Resume.pdf"
                download="Ahmed_Yehia_Resume.pdf"
                data-hover
                style={{ display: "inline-flex", alignItems: "center", gap: 7, border: `1px solid rgba(${t.accentRgb},.4)`, background: `rgba(${t.accentRgb},.07)`, color: t.accent, padding: "12px 20px", borderRadius: 2, fontSize: 11, letterSpacing: isArabic ? 0 : ".1em", textTransform: isArabic ? "none" : "uppercase", transition: "background .2s,border-color .2s,color .4s,border .4s", fontFamily: "inherit" }}
                onMouseOver={(e) => { e.currentTarget.style.background = `rgba(${t.accentRgb},.16)`; e.currentTarget.style.borderColor = t.accent; }}
                onMouseOut={(e) => { e.currentTarget.style.background = `rgba(${t.accentRgb},.07)`; e.currentTarget.style.borderColor = `rgba(${t.accentRgb},.4)`; }}
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 3v13M6 11l6 6 6-6" /><path d="M3 20h18" />
                </svg>
                {copy.hero.resume}
              </a>
              </div>
            </div>
            <div className="hero-portrait" aria-label="Ahmed Yehia portrait">
              <div style={{ position: "relative", padding: 9, background: t.bgCard, border: `1px solid rgba(${t.accentRgb},.55)`, borderRadius: 4, boxShadow: dark ? `0 0 40px rgba(${t.accentRgb},.12)` : "0 18px 45px rgba(15,23,42,.14)", transition: "background .4s,border .4s,box-shadow .4s" }}>
                <img src="/ahmed-yehia-profile.jpg" alt="Ahmed Yehia" width="400" height="400" loading="eager" fetchPriority="high" style={{ borderRadius: 2 }} />
                <span aria-hidden="true" style={{ position: "absolute", top: -5, insetInlineStart: -5, width: 24, height: 24, borderTop: `2px solid ${t.accent}`, borderInlineStart: `2px solid ${t.accent}` }} />
                <span aria-hidden="true" style={{ position: "absolute", bottom: -5, insetInlineEnd: -5, width: 24, height: 24, borderBottom: `2px solid ${t.accent}`, borderInlineEnd: `2px solid ${t.accent}` }} />
              </div>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 14, marginTop: 60, animation: "fadeUp .8s .25s ease both", textAlign: rtlTextAlign }}>
            {copy.achievements.map((a) => (
              <div key={a.title} style={{ background: t.bgCard, border: `1px solid ${t.border}`, borderRadius: 4, padding: 22, transition: "border-color .25s,background .4s,border .4s" }} onMouseOver={(e) => { e.currentTarget.style.borderColor = t.accent; }} onMouseOut={(e) => { e.currentTarget.style.borderColor = t.border; }}>
                <div style={{ fontSize: 20, marginBottom: 10 }}>{a.icon}</div>
                <div style={{ fontFamily: isArabic ? "Tajawal,sans-serif" : "Syne,sans-serif", fontWeight: 700, fontSize: 13, color: t.text, marginBottom: 6, transition: "color .4s" }}>{a.title}</div>
                <div style={{ fontSize: 12, color: t.textMuted, lineHeight: 1.75, fontWeight: 300, transition: "color .4s" }}>{a.desc}</div>
              </div>
            ))}
          </div>
        </section>

        <section id="skills" ref={(el) => { refs.current.skills = el; }} style={{ minHeight: "60vh", paddingTop: 120, paddingBottom: 80, textAlign: rtlTextAlign }}>
          <SectionTitle label={copy.skillsLabel} start={copy.skillsTitleStart} accent={copy.skillsTitleAccent} t={t} dark={dark} isArabic={isArabic} />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(230px,1fr))", gap: 18 }}>
            {copy.skills.map((g, i) => (
              <div key={g.category} style={{ background: t.bgCard, border: `1px solid ${t.border}`, borderRadius: 4, padding: 22, animation: `fadeUp .6s ${i * .1}s ease both`, transition: "background .4s,border .4s" }}>
                <div style={{ fontSize: 10, color: t.accent, letterSpacing: isArabic ? 0 : ".2em", textTransform: isArabic ? "none" : "uppercase", marginBottom: 14, transition: "color .4s" }}>{g.category}</div>
                <div>
                  {g.items.map((item) => (
                    <span key={item} style={{ display: "inline-block", background: t.pillBg, border: `1px solid ${t.pillBorder}`, color: t.pillText, fontSize: 11, padding: "4px 10px", borderRadius: 2, letterSpacing: ".03em", margin: 3, transition: "background .2s,color .2s,background .4s,border .4s,color .4s", cursor: "default", direction: "ltr" }} onMouseOver={(e) => { e.currentTarget.style.background = `rgba(${t.accentRgb},.13)`; e.currentTarget.style.color = t.accent; }} onMouseOut={(e) => { e.currentTarget.style.background = t.pillBg; e.currentTarget.style.color = t.pillText; }}>
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 28, background: t.accentSoft, border: `1px solid ${t.accentBorder}`, borderRadius: 4, padding: "18px 24px", display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap", transition: "background .4s,border .4s", justifyContent: isArabic ? "flex-end" : "flex-start" }}>
            <span style={{ fontSize: 10, color: t.accent, letterSpacing: isArabic ? 0 : ".2em", textTransform: isArabic ? "none" : "uppercase" }}>{copy.coreStack}</span>
            {CORE_STACK.map((tech, i, arr) => (
              <span key={tech} style={{ display: "flex", alignItems: "center", gap: 10, direction: "ltr" }}>
                <span style={{ fontFamily: "Syne,sans-serif", fontWeight: 700, fontSize: 14, color: t.text, transition: "color .4s" }}>{tech}</span>
                {i < arr.length - 1 && <span style={{ color: t.textFaint }}>·</span>}
              </span>
            ))}
          </div>
        </section>

        <section id="projects" ref={(el) => { refs.current.projects = el; }} style={{ paddingTop: 80, paddingBottom: 80, textAlign: rtlTextAlign }}>
          <SectionTitle label={copy.projectsLabel} start={copy.projectsTitleStart} accent={copy.projectsTitleAccent} t={t} dark={dark} isArabic={isArabic} />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(285px,1fr))", gap: 16 }}>
            {copy.projects.map((p, i) => (
              <a key={p.name} href={p.url || undefined} target={p.url ? "_blank" : undefined} rel={p.url ? "noopener noreferrer" : undefined} aria-label={p.url ? `${p.name} — open project` : undefined} style={{ display: "block", background: t.bgCard, border: `1px solid ${t.border}`, padding: 24, borderRadius: 4, transition: "border-color .25s,transform .25s,background .4s,border .4s", animation: `fadeUp .6s ${i * .09}s ease both`, cursor: p.url ? "pointer" : "default" }} onMouseOver={(e) => { e.currentTarget.style.borderColor = t.accent; e.currentTarget.style.transform = "translateY(-4px)"; }} onMouseOut={(e) => { e.currentTarget.style.borderColor = t.border; e.currentTarget.style.transform = "translateY(0)"; }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 10, marginBottom: 10, flexDirection: isArabic ? "row-reverse" : "row" }}>
                  <span style={{ fontFamily: isArabic ? "Tajawal,sans-serif" : "Syne,sans-serif", fontWeight: 700, fontSize: 15, color: t.text, lineHeight: 1.3, transition: "color .4s" }}>{p.name}</span>
                  <span style={{ fontSize: 10, padding: "3px 10px", borderRadius: 20, letterSpacing: isArabic ? 0 : ".07em", whiteSpace: "nowrap", background: p.status === "Live" || p.status === "مباشر" ? `rgba(${t.accentRgb},.1)` : "rgba(56,189,248,.1)", color: p.status === "Live" || p.status === "مباشر" ? t.accent : "#38bdf8", border: `1px solid ${p.status === "Live" || p.status === "مباشر" ? `rgba(${t.accentRgb},.3)` : "rgba(56,189,248,.3)"}` }}>
                    {p.status}
                  </span>
                </div>
                {p.company && (
                  <div style={{ fontSize: 10, color: t.accent, letterSpacing: isArabic ? 0 : ".08em", marginBottom: 10, transition: "color .4s" }}>
                    {isArabic ? "مرتبط بـ" : "Associated with"} {p.company}
                  </div>
                )}
                <p style={{ fontSize: 12, color: t.textMuted, lineHeight: 1.82, marginBottom: 16, fontWeight: 300, transition: "color .4s" }}>{p.desc}</p>
                {p.highlights && (
                  <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 6, margin: "0 0 16px", padding: 0 }}>
                    {p.highlights.map((highlight) => (
                      <li key={highlight} style={{ display: "flex", gap: 8, alignItems: "flex-start", flexDirection: isArabic ? "row-reverse" : "row", fontSize: 11, color: t.textMuted, lineHeight: 1.55 }}>
                        <span aria-hidden="true" style={{ color: t.accent }}>›</span>
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                )}
                <div style={{ marginBottom: 14 }}>
                  {p.tags.map((tag) => (
                    <span key={tag} style={{ display: "inline-block", background: t.tagBg, border: `1px solid ${t.tagBorder}`, color: t.tagText, fontSize: 10, padding: "3px 8px", borderRadius: 2, letterSpacing: ".05em", margin: 2, transition: "background .4s,border .4s,color .4s", direction: "ltr" }}>{tag}</span>
                  ))}
                </div>
                <div style={{ fontSize: 10, color: t.textFaint, letterSpacing: ".1em", textAlign: isArabic ? "left" : "right", transition: "color .4s" }}>{p.year}</div>
              </a>
            ))}
          </div>
        </section>

        <section id="experience" ref={(el) => { refs.current.experience = el; }} style={{ paddingTop: 80, paddingBottom: 120, textAlign: rtlTextAlign }}>
          <SectionTitle label={copy.experienceLabel} start={copy.experienceTitleStart} accent={copy.experienceTitleAccent} t={t} dark={dark} isArabic={isArabic} />
          <div style={{ display: "flex", flexDirection: "column", gap: 44 }}>
            {copy.experience.map((exp, i) => (
              <div
                key={exp.company}
                style={{ [timelineBorder]: `2px solid ${t.border}`, [timelinePadding]: 24, position: "relative", transition: "border-color .3s,border .4s", animation: `fadeUp .6s ${i * .15}s ease both` }}
                onMouseOver={(e) => { e.currentTarget.style[isArabic ? "borderRightColor" : "borderLeftColor"] = t.accent; }}
                onMouseOut={(e) => { e.currentTarget.style[isArabic ? "borderRightColor" : "borderLeftColor"] = t.border; }}
              >
                <div style={{ position: "absolute", ...dotSide, top: 4, width: 10, height: 10, borderRadius: "50%", background: t.accent, boxShadow: dark ? `0 0 12px rgba(${t.accentRgb},.6)` : "none", transition: "background .4s" }} />
                <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 8, marginBottom: 4, flexDirection: isArabic ? "row-reverse" : "row" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap", justifyContent: isArabic ? "flex-end" : "flex-start" }}>
                    <span style={{ fontFamily: isArabic ? "Tajawal,sans-serif" : "Syne,sans-serif", fontWeight: 700, fontSize: 17, color: t.text, transition: "color .4s" }}>{exp.role}</span>
                    <span style={{ fontSize: 13, color: t.accent, transition: "color .4s" }}>@ {exp.company}</span>
                    {exp.highlight && (
                      <span style={{ background: `rgba(${t.accentRgb},.1)`, border: `1px solid rgba(${t.accentRgb},.28)`, color: t.accent, fontSize: 10, padding: "2px 10px", borderRadius: 20 }}>{exp.highlight}</span>
                    )}
                  </div>
                  <span style={{ fontSize: 11, color: t.textFaint, letterSpacing: isArabic ? 0 : ".1em", alignSelf: "center", transition: "color .4s" }}>{exp.period}</span>
                </div>
                <div style={{ fontSize: 11, color: t.textMuted, marginBottom: 14, letterSpacing: isArabic ? 0 : ".05em", transition: "color .4s" }}>{exp.type}</div>
                <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 9 }}>
                  {exp.points.map((pt, j) => (
                    <li key={j} style={{ fontSize: 13, color: t.textMuted, lineHeight: 1.78, display: "flex", gap: 10, fontWeight: 300, transition: "color .4s", flexDirection: isArabic ? "row-reverse" : "row" }}>
                      <span style={{ color: t.accent, flexShrink: 0, marginTop: 1, transition: "color .4s", transform: isArabic ? "rotate(180deg)" : "none" }}>▸</span>{pt}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 60, borderTop: `1px solid ${t.border}`, paddingTop: 48, transition: "border .4s" }}>
            <span style={{ fontSize: 10, letterSpacing: isArabic ? 0 : ".25em", textTransform: isArabic ? "none" : "uppercase", color: t.accent, marginBottom: 8, display: "block" }}>{copy.educationLabel}</span>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 16, marginTop: 22 }}>
              {copy.education.map((edu) => (
                <div key={edu.school} style={{ background: t.bgCard, border: `1px solid ${t.border}`, borderRadius: 4, padding: 22, transition: "background .4s,border .4s" }}>
                  <div style={{ fontFamily: isArabic ? "Tajawal,sans-serif" : "Syne,sans-serif", fontWeight: 700, fontSize: 15, color: t.text, marginBottom: 6, transition: "color .4s" }}>{edu.school}</div>
                  <div style={{ fontSize: 12, color: t.accent, marginBottom: 6, transition: "color .4s" }}>{edu.degree}</div>
                  <div style={{ fontSize: 11, color: t.textMuted, letterSpacing: isArabic ? 0 : ".05em", transition: "color .4s" }}>{edu.period} · {edu.loc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer style={{ borderTop: `1px solid ${t.border}`, padding: "30px 5vw", textAlign: "center", transition: "border .4s", position: "relative" }}>
        <div style={{ display: "flex", justifyContent: "center", gap: 24, marginBottom: 14, flexWrap: "wrap" }}>
          {[
            { label: "ahmed.yehia.abdulgawad@gmail.com", href: "mailto:ahmed.yehia.abdulgawad@gmail.com" },
            { label: "+20 111 327 1757", href: "tel:+201113271757" },
            { label: copy.footer.github, href: "https://github.com/Ahmed-yehia12" },
            { label: copy.footer.linkedin, href: "https://linkedin.com/in/ahmed-yehia-95a75420b/" },
          ].map((l) => (
            <a key={l.label} href={l.href} target={l.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" style={{ fontSize: 11, color: t.textMuted, letterSpacing: isArabic ? 0 : ".07em", transition: "color .2s", direction: "ltr" }} onMouseOver={(e) => { e.currentTarget.style.color = t.accent; }} onMouseOut={(e) => { e.currentTarget.style.color = t.textMuted; }}>
              {l.label}
            </a>
          ))}
        </div>
        <p style={{ fontSize: 11, color: t.textFaint, letterSpacing: isArabic ? 0 : ".1em", transition: "color .4s" }}>
          {copy.footer.built} <span style={{ color: t.accent }}>React</span> · {copy.footer.deployed} <span style={{ color: t.accent }}>Vercel</span> · © 2025 Ahmed Yehia
        </p>
      </footer>
    </div>
  );
}

function SectionTitle({ label, start, accent, t, dark, isArabic }) {
  return (
    <>
      <span style={{ fontSize: 10, letterSpacing: isArabic ? 0 : ".25em", textTransform: isArabic ? "none" : "uppercase", color: t.accent, marginBottom: 8, display: "block" }}>{label}</span>
      <h2 style={{ fontFamily: isArabic ? "Tajawal,sans-serif" : "Syne,sans-serif", fontWeight: 800, fontSize: "clamp(28px,5vw,50px)", color: t.text, marginBottom: 44, letterSpacing: 0, transition: "color .4s" }}>
        {start} <span style={{ color: t.accent, textShadow: dark ? "0 0 28px rgba(0,255,157,.35)" : "none" }}>{accent}</span>
      </h2>
    </>
  );
}
