import { useState } from "react";
import { Mail, Download, Lock } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./BrandIcons.jsx";
import { useResume } from "../hooks/useResume.js";
import { profile } from "../data/portfolio.js";
import AdminPanel from "./AdminPanel.jsx";

export default function Footer() {
  const year = new Date().getFullYear();
  const resumeUrl = useResume();
  const [adminOpen, setAdminOpen] = useState(false);

  return (
    <footer className="bg-primary border-t border-white/10">
      <div className="mx-auto max-w-6xl px-5 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <p className="font-mono text-xs text-[#AAA6A0]">
          <span className="text-cyan">~/</span>
          <span className="text-cyan">bhavesh_thakare</span> — full stack developer © {year}
        </p>

        <div className="flex items-center gap-3">
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            className="p-2 rounded-md border border-white/15 text-[#AAA6A0] hover:text-cyan hover:border-cyan/50 transition-colors"
            aria-label="GitHub"
          >
            <GithubIcon size={16} />
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noreferrer"
            className="p-2 rounded-md border border-white/15 text-[#AAA6A0] hover:text-cyan hover:border-cyan/50 transition-colors"
            aria-label="LinkedIn"
          >
            <LinkedinIcon size={16} />
          </a>
          <a
            href={`mailto:${profile.email}`}
            className="p-2 rounded-md border border-white/15 text-[#AAA6A0] hover:text-cyan hover:border-cyan/50 transition-colors"
            aria-label="Email"
          >
            <Mail size={16} />
          </a>
          <a
            href={resumeUrl}
            download="Bhavesh_Thakare_Resume.pdf"
            className="btn-ghost inline-flex items-center gap-2 font-mono text-xs px-3 py-2 rounded-md"
          >
            <Download size={14} />
            Resume
          </a>
          <button
            onClick={() => setAdminOpen(true)}
            className="inline-flex items-center gap-2 font-mono text-xs border border-white/15 text-[#AAA6A0] px-3 py-2 rounded-md hover:text-cyan hover:border-cyan/50 transition-colors"
            title="Admin — upload resume, certificates, projects"
          >
            <Lock size={14} />
            Admin
          </button>
        </div>
      </div>

      <AdminPanel
        open={adminOpen}
        onClose={() => setAdminOpen(false)}
        tab="resume"
        onChanged={() => {}}
      />
    </footer>
  );
}