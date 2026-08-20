import { MapPin, Briefcase } from "lucide-react";
import { experience } from "../data/portfolio.js";
import SectionHeading from "./SectionHeading.jsx";
import { useReveal } from "../hooks/useReveal.js";

export default function Experience() {
  const ref = useReveal();

  return (
    <section id="experience" className="py-24 relative">
      <div className="aurora w-[400px] h-[400px] bg-cyan/40 -right-40 top-1/3" />
      <div className="relative mx-auto max-w-6xl px-5">
        <div ref={ref}>
          <div className="reveal">
            <SectionHeading
              index="02"
              label="EXPERIENCE"
              title="Internship Experience"
              hint="Hands-on industry exposure across the full stack."
            />
          </div>

          <div className="relative pl-8 md:pl-10">
            <div className="absolute left-[7px] md:left-[9px] top-2 bottom-2 w-px bg-gradient-to-b from-cyan via-violet to-transparent" />

            {experience.map((job) => (
              <article key={job.company} className="reveal relative mb-12 last:mb-0">
                <span
                  className={`absolute -left-8 md:-left-10 top-1.5 w-4 h-4 rounded-full border-2 ${
                    job.current
                      ? "bg-cyan border-primary shadow-[0_0_16px_rgba(255,161,10,0.7)]"
                      : "bg-navy-700 border-line-bright"
                  }`}
                />
                <div className="window-card rounded-xl p-6">
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                    <h3 className="font-display text-xl font-semibold">
                      {job.role}
                      <span className="text-gradient"> @ {job.company}</span>
                    </h3>
                    {job.current && (
                      <span className="font-mono text-[10px] text-primary bg-gradient-to-r from-cyan to-violet px-2 py-0.5 rounded tracking-widest font-bold">
                        CURRENT
                      </span>
                    )}
                  </div>
                  <p className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-xs text-mute">
                    <span className="inline-flex items-center gap-1.5">
                      <Briefcase size={12} />
                      {job.role}
                    </span>
                    {job.location && (
                      <span className="inline-flex items-center gap-1.5">
                        <MapPin size={12} />
                        {job.location}
                      </span>
                    )}
                    <span className="text-cyan">{job.period}</span>
                  </p>
                  <ul className="mt-4 space-y-2">
                    {job.points.map((point) => (
                      <li key={point} className="flex gap-2.5 text-sm text-mute leading-relaxed">
                        <span className="text-violet mt-0.5">▸</span>
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}