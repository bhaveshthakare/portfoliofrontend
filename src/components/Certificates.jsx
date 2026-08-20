import { useEffect, useState } from "react";
import { Award, FileText, Loader2, Upload } from "lucide-react";
import toast from "react-hot-toast";
import { api } from "../api.js";
import { fallbackCertificates, profile } from "../data/portfolio.js";
import SectionHeading from "./SectionHeading.jsx";
import { useReveal } from "../hooks/useReveal.js";
import AdminPanel from "./AdminPanel.jsx";

export default function Certificates() {
  const ref = useReveal();
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [offline, setOffline] = useState(false);
  const [adminOpen, setAdminOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const data = await api.getCertificates();
        if (!cancelled) {
          setCertificates(data);
          setOffline(false);
        }
      } catch {
        if (!cancelled) {
          setCertificates(fallbackCertificates);
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

  const fileUrl = (cert) =>
    cert.fileUrl || (cert.id && !cert.id.toString().startsWith("static-") ? api.certificateFileUrl(cert.id) : "");

  return (
    <section id="certificates" className="py-24 relative">
      <div className="aurora w-[380px] h-[380px] bg-violet/40 -right-32 bottom-0" />
      <div className="relative mx-auto max-w-6xl px-5">
        <div ref={ref}>
          <div className="reveal flex flex-wrap items-end justify-between gap-4">
            <SectionHeading
              index="05"
              label="CERTIFICATES"
              title="Certifications"
              hint="Professional certifications earned through internships and training programs."
            />
            <button
              onClick={() => setAdminOpen(true)}
              className="inline-flex items-center gap-2 font-mono text-xs glass text-mute hover:text-cyan hover:border-cyan/40 px-4 py-2 rounded-md transition-colors mb-12"
            >
              <Upload size={13} />
              Admin — Upload Certificates
            </button>
          </div>

          {loading ? (
            <div className="flex items-center justify-center gap-2 py-16 text-mute font-mono text-sm">
              <Loader2 size={18} className="animate-spin text-cyan" />
              LOADING CERTIFICATES...
            </div>
          ) : certificates.length === 0 ? (
            <div className="border border-dashed border-line-bright rounded-lg py-16 text-center text-mute font-mono text-sm">
              NO CERTIFICATES YET — USE THE ADMIN PANEL TO UPLOAD.
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {certificates.map((cert) => (
                <article key={cert.id} className="reveal window-card rounded-xl overflow-hidden flex flex-col">
                  <div className="flex items-center gap-3 px-4 py-3 border-b border-primary/10 bg-primary/[0.02]">
                    <div className="window-dots">
                      <span />
                      <span />
                      <span />
                    </div>
                    <span className="font-mono text-[10px] text-mute truncate">cert/{cert.name.toLowerCase().replace(/\s+/g, "-")}.pdf</span>
                  </div>
                  <div className="p-5 flex flex-col grow">
                    <div className="w-11 h-11 rounded-lg border border-amber/50 bg-amber/10 flex items-center justify-center text-amber mb-4">
                      <Award size={22} />
                    </div>
                    <h3 className="font-display text-lg font-semibold leading-snug">{cert.name}</h3>
                    <p className="mt-1.5 text-sm text-mute">{cert.issuer}</p>
                    <div className="mt-4 flex items-center justify-between font-mono text-xs text-mute">
                      <span className="text-cyan">{cert.year || "—"}</span>
                      {offline && <span className="text-amber">backend offline</span>}
                    </div>
                    <div className="mt-5 pt-5 border-t border-primary/10 mt-auto flex gap-3">
                      <a
                        href={fileUrl(cert)}
                        target="_blank"
                        rel="noreferrer"
                        className={`flex-1 inline-flex items-center justify-center gap-2 border rounded-md px-4 py-2 text-sm transition-colors ${
                          fileUrl(cert)
                            ? "border-cyan/50 text-cyan hover:bg-cyan/10 hover:shadow-[0_0_20px_-6px_rgba(255,161,10,0.4)]"
                            : "border-line text-mute opacity-50 pointer-events-none"
                        }`}
                      >
                        <FileText size={15} />
                        {fileUrl(cert) ? "View Certificate" : "Not Uploaded"}
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
        tab="certificates"
        onChanged={() => {
          setRefreshKey((k) => k + 1);
          toast.success("Certificates refreshed");
        }}
        profileEmail={profile.email}
      />
    </section>
  );
}