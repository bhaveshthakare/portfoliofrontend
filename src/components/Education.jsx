import { GraduationCap, MapPin } from "lucide-react";
import { education } from "../data/portfolio.js";
import SectionHeading from "./SectionHeading.jsx";
import { useReveal } from "../hooks/useReveal.js";

export default function Education() {
  const ref = useReveal();

  return (
    <section id="education" className="py-24 relative">
      <div className="aurora w-[360px] h-[360px] bg-pink/40 left-1/3 -top-20" />
      <div className="relative mx-auto max-w-6xl px-5">
        <div ref={ref}>
          <div className="reveal">
            <SectionHeading
              index="03"
              label="EDUCATION"
              title="Education"
              hint="Academic background in computer science and engineering."
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {education.map((item) => (
              <article key={item.school} className="reveal window-card rounded-xl p-6">
                <div className="flex items-start gap-4">
                  <div className="shrink-0 w-11 h-11 rounded-lg border border-violet/50 bg-violet/15 flex items-center justify-center text-violet shadow-[0_0_20px_rgba(255,161,10,0.3)]">
                    <GraduationCap size={22} />
                  </div>
                  <div>
                    <p className="font-mono text-[11px] text-amber tracking-widest">{item.type}</p>
                    <h3 className="mt-1 font-display text-lg font-semibold">{item.degree}</h3>
                    <p className="mt-1 text-mute text-sm">{item.school}</p>
                    <p className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-xs text-mute">
                      <span className="inline-flex items-center gap-1.5">
                        <MapPin size={12} className="text-cyan" />
                        {item.location}
                      </span>
                      <span className="text-cyan">{item.period}</span>
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}