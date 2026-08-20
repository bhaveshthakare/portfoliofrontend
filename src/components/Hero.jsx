import { ArrowRight, Download, Mail, Phone } from "lucide-react";
import { profile, heroDiagram } from "../data/portfolio.js";
import { useResume } from "../hooks/useResume.js";

const layerMeta = {
  frontend: { label: "FRONTEND", color: "text-cyan" },
  api: { label: "API LAYER", color: "text-pink" },
  backend: { label: "BACKEND", color: "text-violet" },
  data: { label: "DATA", color: "text-amber" },
};

function StackDiagram() {
  const layers = Object.keys(heroDiagram);
  return (
    <div className="hidden lg:flex items-center justify-center gap-2">
      {layers.map((layer, i) => {
        const meta = layerMeta[layer];
        return (
          <div key={layer} className="flex items-center gap-2">
            <div className="glass rounded-lg px-4 py-3 w-40">
              <p className={`font-mono text-[9px] tracking-widest ${meta.color} mb-2`}>
                {meta.label}
              </p>
              <div className="flex flex-col gap-1">
                {heroDiagram[layer].map((tech) => (
                  <span
                    key={tech}
                    className="font-mono text-[10.5px] bg-primary/[0.06] border border-primary/10 rounded px-2 py-0.5 text-ink"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
            {i < layers.length - 1 && (
              <svg className="w-9 text-primary/30 shrink-0" viewBox="0 0 40 20" fill="none" aria-hidden>
                <path
                  d="M4 10 H30"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeDasharray="4 4"
                  className="connector-line"
                />
                <path d="M30 4 L37 10 L30 16" stroke="currentColor" strokeWidth="1.5" fill="none" />
              </svg>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default function Hero() {
  const resumeUrl = useResume();

  return (
    <section id="home" className="relative min-h-screen grid-bg flex items-center pt-28 pb-20 overflow-hidden">
      <div className="aurora w-[480px] h-[480px] bg-cyan/60 -top-40 -right-32" />
      <div className="aurora w-[520px] h-[520px] bg-violet/60 top-1/3 -left-44" style={{ animationDelay: "4s" }} />
      <div className="aurora w-[420px] h-[420px] bg-pink/50 bottom-0 right-1/4" style={{ animationDelay: "8s" }} />

      <div className="relative mx-auto max-w-6xl px-5 w-full">
        <div className="max-w-3xl">
          <p className="font-mono text-xs tracking-widest mb-4">
            <span className="text-violet">&lt;</span>
            <span className="text-cyan">developer</span>
            <span className="text-violet"> /&gt;</span>
          </p>
          <h1 className="font-display text-5xl md:text-6xl font-bold leading-[1.08]">
            Hi, I&apos;m <span className="text-gradient">Bhavesh</span>
            <br />
            <span className="text-gradient">Thakare</span>
          </h1>
          <p className="mt-4 font-mono text-sm text-amber tracking-wide">{profile.role}</p>
          <p className="mt-5 text-mute text-lg max-w-lg leading-relaxed">{profile.tagline}</p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#projects"
              className="btn-primary group inline-flex items-center gap-2 font-semibold px-6 py-3 rounded-lg text-sm"
            >
              View Projects
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href={resumeUrl}
              download="Bhavesh_Thakare_Resume.pdf"
              className="btn-ghost inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-medium"
            >
              <Download size={16} />
              Download Resume
            </a>
          </div>

          <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-xs text-mute">
            <span className="inline-flex items-center gap-2">
              <Mail size={13} className="text-cyan" />
              {profile.email}
            </span>
            <span className="inline-flex items-center gap-2">
              <Phone size={13} className="text-violet" />
              {profile.phone}
            </span>
          </div>
        </div>

        <div className="mt-16">
          <StackDiagram />
        </div>
      </div>
    </section>
  );
}