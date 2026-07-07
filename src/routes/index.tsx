import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  Mail, Linkedin, Phone, MapPin, ArrowRight, Printer, Sparkles, X, Play,
  TrendingUp, Bot, Calendar, GraduationCap, Download, Menu, Camera,
} from "lucide-react";
import carolinaPortrait from "@/assets/carolina-portrait.png.asset.json";

export const Route = createFileRoute("/")({ component: Index });

/* ---------------- DATA ---------------- */

const SKILLS = [
  { title: "Estrategia B2B2C & Growth", tags: ["Inbound Marketing", "Social Selling", "Email Marketing", "WhatsApp Business", "Customer Journey Mapping"] },
  { title: "Paid Media & SEO", tags: ["Meta Ads", "Google Ads", "SEO Técnico", "Google Analytics", "Keyword Research"] },
  { title: "Automatización & IA (Hands-On)", tags: ["n8n", "Chatbots de IA", "Prompt Engineering", "WhatsApp Business API", "Lead Scoring", "OpenAI API"] },
  { title: "Desarrollo, Análisis & Herramientas", tags: ["Lovable", "GitHub", "Python", "Power BI", "WordPress", "Canva", "CapCut", "Notion"] },
];

type Cat = "Marketing & Estrategia" | "Automatización, IA & Data";

const PROJECTS: { title: string; year: string; desc: string; cat: Cat; kind: "academic" | "job" }[] = [
  { title: "Portafolio Web Interactivo con Lovable & GitHub", year: "2026", cat: "Automatización, IA & Data", kind: "academic",
    desc: "Prototipado ágil y desarrollo web front-end con generación de código por IA, despliegue automatizado y control de versiones vía GitHub Pages." },
  { title: "Orquestador de Leads Automatizado con n8n", year: "2026", cat: "Automatización, IA & Data", kind: "academic",
    desc: "Flujo lógico automatizado que captura leads entrantes, los segmenta por perfil de negocio y los notifica de forma inmediata vía API de WhatsApp." },
  { title: "Dashboard de Análisis de Tráfico (Python + Power BI)", year: "2026", cat: "Automatización, IA & Data", kind: "academic",
    desc: "Procesamiento de datasets masivos con Pandas para limpiar datos de tráfico de un ecommerce y estructurar un informe interactivo enfocado en ROI." },
  { title: "Optimización de Customer Journey con IA", year: "2026", cat: "Marketing & Estrategia", kind: "academic",
    desc: "Diseño predictivo de flujos de interacción con IA generativa para identificar cuellos de botella y proponer copys persuasivos automáticos." },
];

const EXPERIENCE = [
  {
    role: "Coordinadora de Marketing y Comunicación",
    company: "Grupo San Pio",
    period: "Mar. 2023 — Mar. 2026",
    cat: "Marketing & Estrategia" as Cat,
    highlights: [
      "Crecimiento orgánico de +2.100% en redes (5k a +100k en Instagram/Facebook; 100 a 12k en YouTube).",
      "Campaña de lanzamiento de nueva línea importada (orgánico, reels, podcasts, landings, activaciones).",
      "Expansión de punto de venta físico en otra ciudad con cobertura in situ de filmación y difusión.",
      "Integración de chatbot de IA entrenado con catálogo de productos para filtrado de leads calificados (SQL).",
      "Gestión integral de stand y logística en la feria internacional Expocamacol (+54k visitantes).",
      "Coordinación de 4-8 activaciones mensuales en PDV con proveedores y control de presupuesto ROI.",
      "Producción de contenido audiovisual íntegro (guion, rodaje en obra, edición, testimoniales).",
      "Administración de Ecommerce corporativo (WordPress, plugins, sliders, arquitectura de información).",
      "Creación de la Comunidad de Profesionales de la Construcción mediante capacitaciones y canales de WhatsApp.",
      "Liderazgo de equipo interno de 4-5 personas (diseñadores, filmmakers, community managers) y proveedores.",
      "Dirección de comunicación interna (boletines en vídeo, comunicados corporativos).",
    ],
  },
  {
    role: "Coordinadora de Comunicaciones — Bienestar Universitario",
    company: "Universidad de Pamplona",
    period: "Ene. 2022 — Dic. 2022",
    cat: "Marketing & Estrategia" as Cat,
    highlights: [
      "Coordinación de pasantes del área y planificación del calendario editorial mensual de la dependencia.",
      "Producción de contenido educativo en múltiples formatos para Facebook institucional.",
      "Redacción SEO para noticias, comunicados y blog oficial de la universidad.",
      "Administración de portal web de Bienestar Universitario.",
      "Formación en comunicación digital para docentes y administrativos.",
    ],
  },
  {
    role: "Practicante de Comunicación Social",
    company: "Instituto de Cultura y Turismo de Pamplona",
    period: "Jul. 2021 — Dic. 2021",
    cat: "Marketing & Estrategia" as Cat,
    highlights: [
      "Autonomía total ejecutando plan mensual de más de 16 tareas recurrentes en un equipo de 3 personas.",
      "Creación de 'Fanzines Culturales' en formato tríptico: entrevistas, redacción, diagramación y difusión.",
      "Cobertura de eventos turísticos (Semana Santa) y redacción de crónicas periodísticas.",
    ],
  },
];

const EDUCATION = [
  { title: "Máster en Marketing Digital e Inteligencia Artificial", place: "Inesdi Business Techschool, Barcelona", year: "2026 · En curso" },
  { title: "Grado en Comunicación Social", place: "Universidad de Pamplona, Colombia", year: "2017 — 2022" },
  { title: "Diplomado en Comunicación Organizacional", place: "Politécnico Superior de Colombia", year: "2020" },
  { title: "Técnico en Diseño e Integración de Multimedia", place: "SENA, Colombia", year: "2015 — 2016" },
];

type MediaItem = {
  title: string; cat: string; role: string; goal: string; ratio: string; stat: string;
  kind: "video" | "photo"; embed?: string; imageUrl?: string;
};
const VIDEOS: MediaItem[] = [
  { kind: "video", title: "Registro de obra & Testimoniales", cat: "Instagram Reel", role: "Directora / Guion", goal: "Producción íntegra en obra con permisos y entrevistas a usuarios finales.", ratio: "aspect-[9/16]", stat: "+1.2M views", embed: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
  { kind: "photo", title: "Expocamacol — Feria Internacional", cat: "Fotografía On-Site", role: "Coordinadora de Stand & Marca", goal: "Gestión integral de stand y logística de marca en la feria internacional con más de 54k visitantes.", ratio: "aspect-[4/5]", stat: "+54k visitantes" },
  { kind: "video", title: "Expoconstrucción — Cobertura Audiovisual", cat: "YouTube / Reel", role: "Dirección / Edición", goal: "Cobertura audiovisual de la feria Expoconstrucción: entrevistas, ambiente y activaciones de marca.", ratio: "aspect-video", stat: "Feria Sectorial", embed: "" },
];

/* ---------------- HOOKS ---------------- */

function useCounter(target: number, start: boolean, duration = 1800) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!start) return;
    let raf = 0;
    const t0 = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.floor(eased * target));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [start, target, duration]);
  return val;
}

function useInView<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    if (!ref.current || seen) return;
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setSeen(true), { threshold: 0.3 });
    io.observe(ref.current);
    return () => io.disconnect();
  }, [seen]);
  return { ref, seen };
}

/* ---------------- INDEX ---------------- */

function Index() {
  const [isPrintMode, setPrintMode] = useState(false);
  const [filter, setFilter] = useState<"Todos" | Cat>("Todos");
  const [openVideo, setOpenVideo] = useState<number | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("print-mode", isPrintMode);
  }, [isPrintMode]);

  if (isPrintMode) return <PrintMode onExit={() => setPrintMode(false)} />;

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-500">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-40 backdrop-blur-xl bg-background/70 border-b border-border/50 no-print">
        <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
          <a href="#top" className="font-display font-bold tracking-tight text-lg">
            Carolina<span className="text-olive">.</span>
          </a>
          <div className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
            <a href="#impacto" className="hover:text-foreground transition-colors">Impacto</a>
            <a href="#skills" className="hover:text-foreground transition-colors">Skills</a>
            <a href="#experiencia" className="hover:text-foreground transition-colors">Experiencia</a>
            <a href="#showroom" className="hover:text-foreground transition-colors">Showroom</a>
            <a href="#contacto" className="hover:text-foreground transition-colors">Contacto</a>
          </div>
          <button onClick={() => setPrintMode(true)} className="hidden md:inline-flex items-center gap-2 px-4 py-2 rounded-full border border-sand/30 text-sand hover:bg-sand hover:text-background transition-all text-xs font-medium">
            <Printer className="w-4 h-4" /> Modo Ejecutivo
          </button>
          <button className="md:hidden text-foreground" onClick={() => setMenuOpen(v => !v)} aria-label="menu">
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
        {menuOpen && (
          <div className="md:hidden border-t border-border/50 bg-background/95 px-6 py-4 flex flex-col gap-3 text-sm">
            {["impacto","skills","experiencia","showroom","contacto"].map(id => (
              <a key={id} href={`#${id}`} onClick={() => setMenuOpen(false)} className="capitalize text-muted-foreground hover:text-foreground">{id}</a>
            ))}
            <button onClick={() => { setPrintMode(true); setMenuOpen(false); }} className="mt-2 inline-flex items-center gap-2 justify-center px-4 py-2 rounded-full border border-sand/30 text-sand text-xs">
              <Printer className="w-4 h-4" /> Modo Ejecutivo
            </button>
          </div>
        )}
      </nav>

      {/* Hero */}
      <section id="top" className="relative pt-40 pb-24 px-6 overflow-hidden">
        <div className="absolute inset-0 -z-10 opacity-40">
          <div className="absolute top-20 left-10 w-96 h-96 rounded-full blur-3xl" style={{background:"radial-gradient(circle,var(--olive),transparent 70%)"}}/>
          <div className="absolute bottom-0 right-10 w-[30rem] h-[30rem] rounded-full blur-3xl" style={{background:"radial-gradient(circle,var(--sand),transparent 70%)"}}/>
        </div>
        <div className="mx-auto max-w-6xl grid gap-10 md:gap-14 md:grid-cols-[minmax(0,1fr)_auto] md:items-center">
          <div className="min-w-0 order-2 md:order-1">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-olive/30 bg-olive/5 text-olive text-xs font-medium mb-8 animate-fade-in">
              <span className="w-2 h-2 rounded-full bg-olive animate-pulse"/>
              Disponible para Proyectos · Barcelona
            </div>
            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-extrabold leading-[0.95] tracking-tight animate-fade-in">
              ¡Hola, soy<br/>
              <span className="text-gradient-warm">Carolina Cuadros!</span>
            </h1>
            <p className="mt-8 max-w-3xl text-base md:text-xl text-muted-foreground leading-relaxed">
              <span className="text-foreground font-medium">Marketing Digital & Comunicación Corporativa.</span> Conecto marcas
              con audiencias a través de la estrategia digital B2B2C y optimizo el futuro de la comunicación integrando
              <span className="text-sand"> Inteligencia Artificial</span>,
              <span className="text-olive"> Automatización de Procesos (no-code)</span> y
              <span className="text-sand"> Análisis de Datos</span>.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <a href="#impacto" className="group inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-olive text-background font-medium hover:scale-[1.03] transition-transform">
                Explorar mi trayectoria
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform"/>
              </a>
              <button onClick={() => setPrintMode(true)} className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full border border-sand/40 text-sand hover:bg-sand hover:text-background transition-all font-medium">
                <Printer className="w-4 h-4"/> Modo Ejecutivo (ATS / PDF)
              </button>
            </div>
          </div>
          <div className="order-1 md:order-2 flex justify-center md:justify-end animate-fade-in">
            <div className="relative">
              <div className="absolute -inset-6 rounded-[2rem] blur-3xl opacity-30" style={{background:"radial-gradient(circle,var(--sand),transparent 70%)"}}/>
              <div className="relative overflow-hidden rounded-2xl border border-sand/30 shadow-2xl bg-gradient-to-br from-muted/40 to-card/40 backdrop-blur">
                <img
                  src={carolinaPortrait.url}
                  alt="Retrato de Carolina Cuadros Bustamante"
                  className="h-[360px] sm:h-[420px] md:h-[500px] w-auto object-contain object-top"
                  loading="eager"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bento */}
      <BentoSection />

      {/* Skills */}
      <section id="skills" className="py-24 px-6">
        <div className="mx-auto max-w-6xl">
          <SectionHeading eyebrow="03 · Stack" title="El universo de habilidades" />
          <div className="mt-14 grid gap-6 md:grid-cols-2">
            {SKILLS.map(g => (
              <div key={g.title} className="glass-card rounded-2xl p-8 hover:-translate-y-1 transition-transform">
                <h3 className="text-lg font-semibold mb-6 text-sand">{g.title}</h3>
                <div className="flex flex-wrap gap-2">
                  {g.tags.map(t => (
                    <span key={t} className="px-3 py-1.5 rounded-full text-xs border border-border bg-muted/40 hover:bg-olive hover:text-background hover:border-olive transition-all cursor-default">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience */}
      <section id="experiencia" className="py-24 px-6">
        <div className="mx-auto max-w-6xl">
          <SectionHeading eyebrow="04 · Trayectoria" title="Experiencia & Proyectos" />
          <div className="mt-10 flex flex-wrap gap-2">
            {(["Todos","Marketing & Estrategia","Automatización, IA & Data"] as const).map(f => (
              <button key={f} onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-full text-sm border transition-all ${filter===f ? "bg-sand text-background border-sand" : "border-border text-muted-foreground hover:text-foreground hover:border-sand/50"}`}>
                {f}
              </button>
            ))}
          </div>

          <div className="mt-12 space-y-6">
            <h3 className="text-xs uppercase tracking-widest text-olive mb-2">Experiencia Profesional</h3>
            <div className="relative space-y-6 border-l border-border/60 pl-6 md:pl-8">
              {EXPERIENCE.filter(e => filter==="Todos" || filter==="Marketing & Estrategia").map(e => (
                <div key={e.company} className="relative glass-card rounded-2xl p-6 md:p-8 hover:-translate-y-1 transition-transform">
                  <span className="absolute -left-[34px] md:-left-[42px] top-8 w-3 h-3 rounded-full bg-olive ring-4 ring-background"/>
                  <div className="flex flex-wrap items-baseline justify-between gap-2 mb-2">
                    <h4 className="font-semibold text-lg">{e.role}</h4>
                    <span className="text-xs text-sand">{e.period}</span>
                  </div>
                  <p className="text-sand/80 text-sm mb-4">{e.company}</p>
                  <ul className="space-y-2">
                    {e.highlights.slice(0,4).map(h => (
                      <li key={h} className="text-sm text-muted-foreground flex gap-3">
                        <span className="text-olive mt-1.5">▸</span><span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <h3 className="text-xs uppercase tracking-widest text-olive mt-12 mb-2">Proyectos Académicos · Inesdi Barcelona</h3>
            <div className="grid gap-4 md:grid-cols-2">
              {PROJECTS.filter(p => filter==="Todos" || p.cat===filter).map(p => (
                <div key={p.title} className="glass-card rounded-2xl p-6 hover:-translate-y-1 transition-transform">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <h4 className="font-semibold text-base">{p.title}</h4>
                    <span className="text-xs text-sand shrink-0">{p.year}</span>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
                  <span className="mt-4 inline-block text-[10px] uppercase tracking-widest text-olive">{p.cat}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Showroom */}
      <section id="showroom" className="py-24 px-6">
        <div className="mx-auto max-w-6xl">
          <SectionHeading eyebrow="05 · Multimedia" title="Showroom audiovisual" />
          <p className="mt-4 text-muted-foreground max-w-2xl">Dirección, guion y edición — reels de obra, cobertura de ferias y fotografía on-site.</p>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {VIDEOS.map((v, i) => {
              const isPhoto = v.kind === "photo";
              const clickable = isPhoto ? false : Boolean(v.embed);
              return (
                <button
                  key={v.title}
                  onClick={() => clickable && setOpenVideo(i)}
                  disabled={!clickable}
                  className={`group text-left glass-card rounded-3xl overflow-hidden transition-all ${clickable ? "hover:-translate-y-2 cursor-pointer" : "cursor-default"}`}
                >
                  <div className={`relative ${v.ratio} bg-gradient-to-br from-muted to-card overflow-hidden ${isPhoto ? "p-3" : ""}`}>
                    {isPhoto ? (
                      <div className="relative w-full h-full rounded-2xl border border-sand/30 bg-background/40 flex flex-col items-center justify-center overflow-hidden">
                        <div className="absolute inset-3 border border-dashed border-sand/25 rounded-xl pointer-events-none"/>
                        <Camera className="w-10 h-10 text-sand/80"/>
                        <p className="mt-3 text-xs uppercase tracking-widest text-olive">Espacio reservado</p>
                        <p className="mt-1 text-xs text-muted-foreground px-6 text-center">Foto de Expocamacol — próximamente</p>
                      </div>
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className={`w-16 h-16 rounded-full bg-sand/90 flex items-center justify-center transition-transform ${clickable ? "group-hover:scale-110" : "opacity-60"}`}>
                          <Play className="w-6 h-6 text-background ml-1" fill="currentColor"/>
                        </div>
                        {!v.embed && (
                          <span className="absolute bottom-4 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-widest text-muted-foreground bg-background/70 px-3 py-1 rounded-full backdrop-blur">
                            Reproductor listo · pega el enlace
                          </span>
                        )}
                      </div>
                    )}
                    <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-background/80 backdrop-blur text-[10px] uppercase tracking-widest text-sand">{v.stat}</div>
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-background/85 backdrop-blur transition-opacity p-6 flex flex-col justify-end pointer-events-none">
                      <span className="text-xs text-olive uppercase tracking-widest">{v.cat}</span>
                      <p className="mt-1 text-sm text-sand">{v.role}</p>
                      <p className="mt-3 text-xs text-muted-foreground">{v.goal}</p>
                    </div>
                  </div>
                  <div className="p-5">
                    <h4 className="font-semibold">{v.title}</h4>
                    <p className="text-xs text-muted-foreground mt-1">{v.cat}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Footer / Contact */}
      <footer id="contacto" className="py-24 px-6 border-t border-border/50">
        <div className="mx-auto max-w-6xl grid gap-16 md:grid-cols-2">
          <div>
            <SectionHeading eyebrow="06 · Contacto" title="Trabajemos juntos" />
            <p className="mt-6 text-muted-foreground max-w-md">¿Un proyecto de growth, IA aplicada o comunicación audiovisual? Escríbeme y lo conversamos.</p>
            <div className="mt-8 space-y-3 text-sm">
              <a href="mailto:soycaro.990@gmail.com" className="flex items-center gap-3 text-foreground hover:text-sand transition-colors"><Mail className="w-4 h-4 text-olive"/>soycaro.990@gmail.com</a>
              <a href="tel:+34604267945" className="flex items-center gap-3 text-foreground hover:text-sand transition-colors"><Phone className="w-4 h-4 text-olive"/>+34 604 267 945</a>
              <a href="https://linkedin.com/in/carolina-cuadros-bustamante-/" target="_blank" rel="noreferrer" className="flex items-center gap-3 text-foreground hover:text-sand transition-colors"><Linkedin className="w-4 h-4 text-olive"/>linkedin.com/in/carolina-cuadros-bustamante-/</a>
              <div className="flex items-center gap-3 text-muted-foreground"><MapPin className="w-4 h-4 text-olive"/>Barcelona, España</div>
            </div>
          </div>
          <form onSubmit={(e)=>{e.preventDefault(); alert("¡Gracias! Te responderé pronto.");}} className="glass-card rounded-3xl p-8 space-y-4">
            <div>
              <label className="text-xs text-muted-foreground">Nombre</label>
              <input required className="mt-1 w-full bg-transparent border-b border-border py-2 outline-none focus:border-olive transition-colors"/>
            </div>
            <div>
              <label className="text-xs text-muted-foreground">Email</label>
              <input required type="email" className="mt-1 w-full bg-transparent border-b border-border py-2 outline-none focus:border-olive transition-colors"/>
            </div>
            <div>
              <label className="text-xs text-muted-foreground">Mensaje</label>
              <textarea required rows={4} className="mt-1 w-full bg-transparent border-b border-border py-2 outline-none focus:border-olive transition-colors resize-none"/>
            </div>
            <button className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-olive text-background font-medium hover:scale-[1.02] transition-transform">
              Enviar mensaje <ArrowRight className="w-4 h-4"/>
            </button>
          </form>
        </div>
        <div className="mx-auto max-w-6xl mt-16 pt-8 border-t border-border/40 flex flex-wrap justify-between gap-4 text-xs text-muted-foreground">
          <span>© 2026 Carolina Cuadros Bustamante</span>
          <span>Diseñado con obsesión por el detalle · Barcelona</span>
        </div>
      </footer>

      {/* Floating print btn */}
      <button onClick={() => setPrintMode(true)}
        className="no-print fixed bottom-6 right-6 z-50 inline-flex items-center gap-2 px-5 py-3 rounded-full bg-sand text-background font-medium shadow-2xl hover:scale-105 transition-transform">
        <Printer className="w-4 h-4"/> <span className="hidden sm:inline">Modo Ejecutivo ATS / Print</span>
      </button>

      {openVideo !== null && (
        <div className="fixed inset-0 z-[60] bg-background/95 backdrop-blur-lg flex items-center justify-center p-4 animate-fade-in" onClick={()=>setOpenVideo(null)}>
          <div className="relative w-full max-w-4xl" onClick={e=>e.stopPropagation()}>
            <button onClick={()=>setOpenVideo(null)} className="absolute -top-12 right-0 text-sand hover:text-foreground"><X className="w-6 h-6"/></button>
            <div className="aspect-video rounded-2xl overflow-hidden border border-border">
              <iframe src={VIDEOS[openVideo].embed} title={VIDEOS[openVideo].title} className="w-full h-full" allow="autoplay; encrypted-media" allowFullScreen/>
            </div>
            <div className="mt-4 flex items-baseline justify-between">
              <h4 className="text-lg font-semibold">{VIDEOS[openVideo].title}</h4>
              <span className="text-xs text-sand">{VIDEOS[openVideo].cat}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ---------------- SUBCOMPONENTS ---------------- */

function SectionHeading({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div>
      <span className="text-xs uppercase tracking-[0.3em] text-olive">{eyebrow}</span>
      <h2 className="mt-3 font-display text-4xl md:text-6xl font-extrabold tracking-tight">{title}</h2>
    </div>
  );
}

function BentoSection() {
  const { ref, seen } = useInView<HTMLDivElement>();
  const growth = useCounter(2100, seen);
  const followers = useCounter(100, seen);
  return (
    <section id="impacto" ref={ref} className="py-24 px-6">
      <div className="mx-auto max-w-6xl">
        <SectionHeading eyebrow="02 · Impacto" title="Métricas & Innovación activa" />
        <div className="mt-14 grid gap-5 md:grid-cols-3 md:auto-rows-[minmax(220px,auto)]">
          {/* Big card */}
          <div className="md:col-span-2 md:row-span-2 glass-card rounded-3xl p-8 md:p-10 hover:-translate-y-1 transition-transform relative overflow-hidden">
            <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full blur-3xl opacity-30" style={{background:"radial-gradient(circle,var(--olive),transparent)"}}/>
            <div className="flex items-center gap-2 text-olive text-xs uppercase tracking-widest mb-6">
              <TrendingUp className="w-4 h-4"/> Growth Orgánico
            </div>
            <div className="flex flex-wrap items-baseline gap-x-8 gap-y-2">
              <div>
                <div className="font-display text-6xl md:text-8xl font-extrabold text-gradient-warm">+{growth.toLocaleString()}%</div>
                <div className="text-xs text-muted-foreground mt-2">Crecimiento en redes</div>
              </div>
              <div>
                <div className="font-display text-4xl md:text-5xl font-extrabold text-sand">+{followers}k</div>
                <div className="text-xs text-muted-foreground mt-2">Seguidores</div>
              </div>
            </div>
            <p className="mt-8 text-muted-foreground max-w-xl leading-relaxed">
              Escalé comunidades digitales de menos de 5,000 a más de 100,000 seguidores en solo 8 meses liderando
              estrategias de contenido y Social Selling.
            </p>
          </div>

          <BentoCard icon={<GraduationCap className="w-4 h-4"/>} label="Innovación Activa" title="Máster IA & Marketing Digital"
            body="Cursando en Inesdi Business Techschool, Barcelona (2026). Creando proyectos prácticos basados en Python, n8n y Lovable."/>
          <BentoCard icon={<Bot className="w-4 h-4"/>} label="Automatización & Leads" title="Chatbots comerciales"
            body="Asistentes con IA entrenados con catálogos complejos para filtrar leads SQL y agilizar ventas."/>
          <BentoCard icon={<Calendar className="w-4 h-4"/>} label="Impacto Físico & Eventos" title="Expocamacol +54k"
            body="Coordinación de marca en la feria internacional y liderazgo de 4 a 8 activaciones de trade marketing mensuales."
            className="md:col-span-2"/>
        </div>
      </div>
    </section>
  );
}

function BentoCard({ icon, label, title, body, className="" }: { icon: React.ReactNode; label: string; title: string; body: string; className?: string }) {
  return (
    <div className={`glass-card rounded-3xl p-6 md:p-7 hover:-translate-y-1 transition-transform ${className}`}>
      <div className="flex items-center gap-2 text-olive text-xs uppercase tracking-widest mb-4">{icon}{label}</div>
      <h3 className="font-display text-2xl font-bold mb-3">{title}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed">{body}</p>
    </div>
  );
}

/* ---------------- PRINT MODE ---------------- */

function PrintMode({ onExit }: { onExit: () => void }) {
  return (
    <div className="min-h-screen bg-white text-black">
      <div className="no-print sticky top-0 z-40 border-b border-neutral-200 bg-white/95 backdrop-blur">
        <div className="mx-auto max-w-3xl px-6 py-3 flex items-center justify-between text-sm">
          <span className="font-medium">Modo Ejecutivo — ATS / Print</span>
          <div className="flex gap-2">
            <button onClick={() => window.print()} className="inline-flex items-center gap-2 px-4 py-2 rounded border border-neutral-300 hover:bg-neutral-100">
              <Download className="w-4 h-4"/> Imprimir / PDF
            </button>
            <button onClick={onExit} className="inline-flex items-center gap-2 px-4 py-2 rounded bg-black text-white hover:bg-neutral-800">
              <Sparkles className="w-4 h-4"/> Modo Creativo
            </button>
          </div>
        </div>
      </div>

      <article className="mx-auto max-w-3xl px-8 py-12 leading-relaxed">
        <header className="border-b border-neutral-300 pb-6">
          <h1 className="text-4xl font-bold tracking-tight">Carolina Cuadros Bustamante</h1>
          <p className="mt-2 text-neutral-700">Marketing Digital & Comunicación Corporativa · IA & Automatización</p>
          <div className="mt-4 flex flex-wrap gap-x-6 gap-y-1 text-sm text-neutral-800">
            <span>Barcelona, España</span>
            <span>+34 604 267 945</span>
            <a href="mailto:soycaro.990@gmail.com" className="underline">soycaro.990@gmail.com</a>
            <a href="https://linkedin.com/in/carolina-cuadros-bustamante-/" className="underline">linkedin.com/in/carolina-cuadros-bustamante-/</a>
          </div>
        </header>

        <Section title="Perfil Profesional">
          <p className="text-sm">
            Profesional en Marketing Digital y Comunicación Corporativa con trayectoria liderando estrategias B2B2C,
            growth orgánico y producción audiovisual. Especializada en integrar Inteligencia Artificial, automatización
            no-code (n8n, chatbots) y análisis de datos (Python, Power BI) para optimizar la captación y conversión de leads.
          </p>
        </Section>

        <Section title="Experiencia Profesional">
          {EXPERIENCE.map(e => (
            <div key={e.company} className="mb-6">
              <div className="flex flex-wrap justify-between gap-2 text-sm">
                <h3 className="font-semibold">{e.role} — <span className="font-normal">{e.company}</span></h3>
                <span className="text-neutral-700">{e.period}</span>
              </div>
              <ul className="mt-2 list-disc pl-5 text-sm space-y-1">
                {e.highlights.map(h => <li key={h}>{h}</li>)}
              </ul>
            </div>
          ))}
        </Section>

        <Section title="Proyectos Académicos — Máster IA & Marketing Digital (Inesdi)">
          <ul className="list-disc pl-5 text-sm space-y-2">
            {PROJECTS.map(p => (
              <li key={p.title}><span className="font-semibold">{p.title} ({p.year}):</span> {p.desc}</li>
            ))}
          </ul>
        </Section>

        <Section title="Producción Audiovisual & Contenido">
          <ul className="list-disc pl-5 text-sm space-y-1">
            <li>Dirección, guion y edición de reels de obra y testimoniales para redes (Instagram/TikTok).</li>
            <li>Producción de podcast corporativo en YouTube para lanzamiento de nueva línea importada.</li>
            <li>Cobertura audiovisual on-site de la feria internacional Expocamacol (behind the scenes, reels).</li>
            <li>Liderazgo del canal de YouTube corporativo: crecimiento de 100 a 12.000 suscriptores.</li>
            <li>Portfolio de vídeos disponible bajo petición y en <a className="underline" href="https://linkedin.com/in/carolina-cuadros-bustamante-/">LinkedIn</a>.</li>
          </ul>
        </Section>

        <Section title="Educación">
          {EDUCATION.map(e => (
            <div key={e.title} className="mb-3 text-sm">
              <div className="flex flex-wrap justify-between gap-2">
                <span className="font-semibold">{e.title}</span>
                <span className="text-neutral-700">{e.year}</span>
              </div>
              <div className="text-neutral-700">{e.place}</div>
            </div>
          ))}
        </Section>

        <Section title="Habilidades & Herramientas">
          {SKILLS.map(g => (
            <div key={g.title} className="mb-2 text-sm">
              <span className="font-semibold">{g.title}: </span>
              <span>{g.tags.join(" · ")}</span>
            </div>
          ))}
        </Section>

        <Section title="Idiomas">
          <p className="text-sm">Español (nativo) · Inglés (profesional)</p>
        </Section>
      </article>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-8">
      <h2 className="text-sm font-bold uppercase tracking-widest border-b border-neutral-300 pb-2 mb-4">{title}</h2>
      {children}
    </section>
  );
}
