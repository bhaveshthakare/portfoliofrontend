import { useEffect, useState } from "react";
import { ExternalLink, Loader2, Plus, FolderGit2 } from "lucide-react";
import toast from "react-hot-toast";
import { api } from "../api.js";
import { fallbackProjects } from "../data/portfolio.js";
import SectionHeading from "./SectionHeading.jsx";
import { useReveal } from "../hooks/useReveal.js";
import AdminPanel from "./AdminPanel.jsx";
import { GithubIcon } from "./BrandIcons.jsx";

export default function Projects() {
  const ref = useReveal();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [offline, setOffline] = useState(false);
  const [adminOpen, setAdminOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const data = await api.getProjects();
        if (!cancelled) {
          setProjects(data);
          setOffline(false);
        }
      } catch {
        if (!cancelled) {
          setProjects(fallbackProjects);
          setOffline(true);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [refreshKey]);

  const chips = (techStack) =>
    (techStack || "")
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

  const chipColor = (i) => {
    const colors = [
      "text-cyan border-cyan/40 bg-cyan/10",
      "text-violet border-violet/40 bg-violet/10",
      "text-pink border-pink/40 bg-pink/10",
      "text-amber border-amber/40 bg-amber/10",
    ];
    return colors[i % colors.length];
  };

  return (
    <section id="projects" className="py-24 relative">
      <div className="aurora w-[420px] h-[420px] bg-cyan/40 -left-40 top-10" />
      <div className="relative mx-auto max-w-6xl px-5">
        <div ref={ref}>
          <div className="reveal flex flex-wrap items-end justify-between gap-4">
            <SectionHeading
              index="06"
              label="PROJECTS"
              title="Featured Projects"
              hint="Full-stack applications built with Java, Spring Boot, React.js and data-driven tooling. Click Live Demo to open each project directly."
            />
            <button
              onClick={() => setAdminOpen(true)}
              className="inline-flex items-center gap-2 font-mono text-xs glass text-mute hover:text-cyan hover:border-cyan/40 px-4 py-2 rounded-md transition-colors mb-12"
            >
              <Plus size={13} />
              Admin — Add Project
            </button>
          </div>

          {loading ? (
            <div className="flex items-center justify-center gap-2 py-16 text-mute font-mono text-sm">
              <Loader2 size={18} className="animate-spin text-cyan" />
              LOADING PROJECTS...
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {projects.map((project) => (
                <article key={project.id} className="reveal window-card rounded-xl overflow-hidden flex flex-col">
                  <div className="flex items-center gap-3 px-4 py-3 border-b border-primary/10 bg-primary/[0.02]">
                    <div className="window-dots">
                      <span />
                      <span />
                      <span />
                    </div>
                    <span className="font-mono text-[10px] text-mute truncate">
                      ~/projects/{project.title.toLowerCase().replace(/\s+/g, "-")}
                    </span>
                    {offline && (
                      <span className="ml-auto font-mono text-[9px] text-amber border border-amber/40 px-1.5 py-0.5 rounded shrink-0">
                        OFFLINE
                      </span>
                    )}
                  </div>

                  <div className="relative aspect-video bg-primary/[0.04] border-b border-primary/10 overflow-hidden">
                    {project.hasImage ? (
                      <img
                        src={api.projectImageUrl(project.id)}
                        alt={project.title}
                        loading="lazy"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-primary/10 to-primary/[0.03]">
                        <FolderGit2 size={36} className="text-cyan/50" />
                        <span className="font-mono text-[10px] tracking-widest text-mute">
                          NO SCREENSHOT
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="p-5 flex flex-col grow">
                    <h3 className="font-display text-lg font-semibold leading-snug">
                      {project.title}
                    </h3>

                    {project.description && (
                      <p className="mt-3 text-sm text-mute leading-relaxed">{project.description}</p>
                    )}

                    {project.techStack && (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {chips(project.techStack).map((tech, i) => (
                          <span
                            key={tech}
                            className={`font-mono text-[10px] px-2 py-1 rounded border ${chipColor(i)}`}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="mt-6 pt-5 border-t border-primary/10 flex flex-wrap gap-3 mt-auto">
                      <a
                        href={project.liveDemoUrl || "#"}
                        target="_blank"
                        rel="noreferrer"
                        className="btn-primary inline-flex items-center gap-2 font-semibold text-sm px-5 py-2.5 rounded-md"
                      >
                        <ExternalLink size={15} />
                        Live Demo
                      </a>
                      <a
                        href={project.githubUrl || "#"}
                        target="_blank"
                        rel="noreferrer"
                        className="btn-ghost inline-flex items-center gap-2 text-sm px-5 py-2.5 rounded-md"
                      >
                        <GithubIcon size={15} />
                        GitHub
                      </a>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>

      <AdminPanel
        open={adminOpen}
        onClose={() => setAdminOpen(false)}
        tab="projects"
        onChanged={() => {
          setRefreshKey((k) => k + 1);
          toast.success("Projects refreshed");
        }}
      />
    </section>
  );
}