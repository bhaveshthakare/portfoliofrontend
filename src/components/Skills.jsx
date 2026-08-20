import { Wrench, Code2 } from "lucide-react";
import { skills, skillChips } from "../data/portfolio.js";
import SectionHeading from "./SectionHeading.jsx";
import { useReveal } from "../hooks/useReveal.js";

export default function Skills() {
  const ref = useReveal();

  return (
    <section id="skills" className="py-24 relative">
      <div className="aurora w-[380px] h-[380px] bg-violet/40 -left-40 top-10" />
      <div className="relative mx-auto max-w-6xl px-5">
        <div ref={ref}>
          <div className="reveal">
            <SectionHeading
              index="01"
              label="SKILLS"
              title="Technical Skills"
              hint="Core competencies matched to full-stack developer role requirements."
            />
          </div>

          <div className="grid md:grid-cols-2 gap-x-12 gap-y-7">
            {skills.map((skill) => (
              <div key={skill.name} className="reveal">
                <div className="flex items-baseline justify-between mb-2">
                  <span className="font-mono text-sm text-ink">{skill.name}</span>
                  <span className="font-mono text-xs text-cyan">{skill.level}%</span>
                </div>
                <div className="h-2 rounded-full bg-primary/[0.08] border border-primary/10 overflow-hidden">
                  <div
                    className="skill-fill bar-gradient h-full rounded-full shadow-[0_0_12px_rgba(255,161,10,0.45)]"
                    style={{ "--level": `${skill.level}%` }}
                  />
                </div>
                <p className="mt-1.5 font-mono text-[11px] text-mute">{skill.note}</p>
              </div>
            ))}
          </div>

          <div className="reveal mt-12">
            <p className="flex items-center gap-2 font-mono text-xs tracking-widest mb-4">
              <Wrench size={14} className="text-amber" />
              <span className="text-amber">ADDITIONAL TOOLS & CONCEPTS</span>
            </p>
            <div className="flex flex-wrap gap-2">
              {skillChips.map((chip, i) => (
                <span
                  key={chip}
                  className={`chip-shimmer inline-flex items-center gap-1.5 font-mono text-xs px-3 py-1.5 rounded-md glass text-mute hover:text-cyan hover:border-cyan/40 transition-colors ${
                    i % 3 === 0 ? "float-chip" : ""
                  }`}
                  style={{ "--shimmer-delay": `${(i % 6) * 0.3}s` }}
                >
                  <Code2 size={12} />
                  {chip}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}