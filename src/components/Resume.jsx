import { Download, FileText, GraduationCap, Briefcase, Code2 } from "lucide-react";
import { profile, education, experience } from "../data/portfolio.js";
import SectionHeading from "./SectionHeading.jsx";
import { useResume } from "../hooks/useResume.js";
import { useReveal } from "../hooks/useReveal.js";

export default function Resume() {
  const ref = useReveal();
  const resumeUrl = useResume();

  const highlights = [
    { icon: Briefcase, label: "INTERNSHIPS", value: `${experience.length} full-stack internships` },
    { icon: GraduationCap, label: "DEGREE", value: `${education[0].degree} ${education[0].period}` },
    { icon: Code2, label: "FOCUS", value: "Java · Spring Boot · React · MySQL" },
  ];

  return (
    <section id="resume" className="py-24 relative">
      <div className="aurora w-[380px] h-[380px] bg-cyan/40 -right-40 bottom-0" />
      <div className="relative mx-auto max-w-6xl px-5">
        <div ref={ref}>
          <div className="reveal">
            <SectionHeading
              index="04"
              label="RESUME"
              title="Resume"
              hint="Career objective and a quick summary of my profile."
            />
          </div>

          <div className="reveal window-card rounded-xl p-6 md:p-8">
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <div className="w-11 h-11 rounded-lg border border-violet/50 bg-violet/15 flex items-center justify-center text-violet shadow-[0_0_20px_rgba(255,161,10,0.3)]">
                <FileText size={22} />
              </div>
              <div>
                <h3 className="font-display text-lg font-semibold">{profile.name}</h3>
                <p className="font-mono text-xs text-mute">{profile.role}</p>
              </div>
            </div>

            <p className="text-sm md:text-base text-mute leading-relaxed">{profile.objective}</p>

            <div className="mt-7 grid sm:grid-cols-3 gap-4">
              {highlights.map((item) => (
                <div key={item.label} className="glass rounded-lg p-4">
                  <item.icon size={16} className="text-cyan" />
                  <p className="mt-2 font-mono text-[10px] tracking-widest text-mute">{item.label}</p>
                  <p className="mt-1 text-sm text-ink">{item.value}</p>
                </div>
              ))}
            </div>

            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href={resumeUrl}
                download="Bhavesh_Thakare_Resume.pdf"
                className="btn-primary inline-flex items-center gap-2 font-semibold text-sm px-6 py-3 rounded-lg"
              >
                <Download size={16} />
                Download Resume
              </a>
              <a
                href="#contact"
                className="btn-ghost inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-medium"
              >
                Get in touch
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}