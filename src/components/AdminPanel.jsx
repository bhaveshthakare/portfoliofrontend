import { useEffect, useState } from "react";
import {
  X, Lock, Upload, Trash2, FolderGit2, Award, FileText, Loader2, ShieldCheck, FileUp, Pencil,
} from "lucide-react";
import toast from "react-hot-toast";
import { api } from "../api.js";

const inputCls =
  "input-glass w-full rounded-md px-3 py-2 text-sm text-ink placeholder:text-mute/50";
const labelCls = "font-mono text-[10px] tracking-widest text-mute block mb-1.5 uppercase";

function PinGate({ onUnlock }) {
  const [pin, setPin] = useState("");
  const [checking, setChecking] = useState(false);

  const unlock = async (event) => {
    event.preventDefault();
    setChecking(true);
    try {
      const form = new FormData();
      form.append("name", "__probe__");
      form.append("issuer", "__probe__");
      form.append("file", new Blob(["probe"], { type: "application/pdf" }), "probe.pdf");
      await api.uploadCertificate(form, pin.trim());
    } catch (err) {
      if (err.message === "Invalid admin PIN") {
        setChecking(false);
        toast.error("Wrong PIN");
        return;
      }
    }
    setChecking(false);
    onUnlock(pin.trim());
  };

  return (
    <form onSubmit={unlock} className="text-center py-10">
      <div className="mx-auto w-14 h-14 rounded-full border border-violet/50 bg-violet/15 flex items-center justify-center text-violet shadow-[0_0_24px_-6px_rgba(255,161,10,0.45)] mb-4">
        <Lock size={24} />
      </div>
      <p className="font-display text-lg font-semibold">Admin Access</p>
      <p className="mt-1 font-mono text-xs text-mute">Enter the admin PIN (portfolio.admin-pin in application.properties)</p>
      <input
        type="password"
        value={pin}
        onChange={(e) => setPin(e.target.value)}
        placeholder="â€¢â€¢â€¢â€¢"
        autoFocus
        className={`${inputCls} max-w-[220px] mx-auto mt-5 text-center tracking-[0.4em]`}
      />
      <button
        type="submit"
        disabled={!pin.trim() || checking}
        className="btn-primary mt-5 inline-flex items-center gap-2 font-semibold text-sm px-6 py-2.5 rounded-md disabled:opacity-50 disabled:pointer-events-none"
      >
        {checking ? <Loader2 size={15} className="animate-spin" /> : <ShieldCheck size={15} />}
        Verify PIN
      </button>
    </form>
  );
}

function CertificateUpload({ pin, onUploaded }) {
  const [form, setForm] = useState({ name: "", issuer: "", year: "" });
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const submit = async (event) => {
    event.preventDefault();
    if (!form.name.trim() || !form.issuer.trim() || !file) {
      toast.error("Name, issuer and file are required");
      return;
    }
    const data = new FormData();
    data.append("name", form.name.trim());
    data.append("issuer", form.issuer.trim());
    data.append("year", form.year.trim());
    data.append("file", file);
    setUploading(true);
    try {
      await api.uploadCertificate(data, pin);
      toast.success("Certificate uploaded");
      setForm({ name: "", issuer: "", year: "" });
      setFile(null);
      onUploaded();
    } catch (err) {
      toast.error(err.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <form onSubmit={submit} className="space-y-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className={labelCls}>Certificate name *</label>
          <input
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            placeholder="e.g. Full Stack Java Internship"
            className={inputCls}
          />
        </div>
        <div>
          <label className={labelCls}>Issuer *</label>
          <input
            value={form.issuer}
            onChange={(e) => setForm((f) => ({ ...f, issuer: e.target.value }))}
            placeholder="e.g. Soham Global"
            className={inputCls}
          />
        </div>
      </div>
      <div>
        <label className={labelCls}>Year</label>
        <input
          value={form.year}
          onChange={(e) => setForm((f) => ({ ...f, year: e.target.value }))}
          placeholder="e.g. 2025"
          className={inputCls}
        />
      </div>
      <div>
        <label className={labelCls}>File (PDF or image, max 5 MB) *</label>
        <input
          type="file"
          accept=".pdf,image/*"
          onChange={(e) => setFile(e.target.files[0] || null)}
          className={`${inputCls} file:mr-3 file:border-0 file:bg-cyan/15 file:text-cyan file:font-mono file:text-xs file:px-3 file:py-1.5 file:rounded cursor-pointer`}
        />
      </div>
      <button
        type="submit"
        disabled={uploading}
        className="btn-primary inline-flex items-center gap-2 font-semibold text-sm px-5 py-2.5 rounded-md disabled:opacity-60 disabled:pointer-events-none"
      >
        {uploading ? <Loader2 size={15} className="animate-spin" /> : <Upload size={15} />}
        {uploading ? "Uploading..." : "Upload Certificate"}
      </button>
    </form>
  );
}

function ResumeUpload({ pin, resume, onUploaded }) {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const submit = async (event) => {
    event.preventDefault();
    if (!file) {
      toast.error("Choose a PDF file first");
      return;
    }
    const data = new FormData();
    data.append("file", file);
    setUploading(true);
    try {
      await api.uploadResume(data, pin);
      toast.success("Resume uploaded â€” Download Resume now serves it");
      setFile(null);
      onUploaded();
    } catch (err) {
      toast.error(err.message);
    } finally {
      setUploading(false);
    }
  };

  const kb = (bytes) => (bytes / 1024).toFixed(1);

  return (
    <div>
      {resume && resume.exists ? (
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3 glass border-cyan/30 rounded-md px-4 py-3">
          <div className="flex items-center gap-3 min-w-0">
            <FileText size={18} className="text-cyan shrink-0" />
            <div className="min-w-0">
              <p className="text-sm text-ink truncate">{resume.fileName}</p>
              <p className="font-mono text-[11px] text-mute">
                {kb(resume.size)} KB Â· updated {resume.updatedAt}
              </p>
            </div>
          </div>
          <a
            href={api.resumeFileUrl()}
            target="_blank"
            rel="noreferrer"
            className="font-mono text-xs text-cyan border border-cyan/50 px-3 py-1.5 rounded-md hover:bg-cyan/10 transition-colors"
          >
            preview
          </a>
        </div>
      ) : (
        <p className="mb-5 font-mono text-xs text-mute border border-dashed border-line-bright rounded-md px-4 py-3">
          No resume uploaded yet â€” visitors currently download the static public/resume.pdf.
        </p>
      )}

      <form onSubmit={submit} className="space-y-4">
        <div>
          <label className={labelCls}>Resume PDF (max 10 MB) *</label>
          <input
            type="file"
            accept=".pdf,application/pdf"
            onChange={(e) => setFile(e.target.files[0] || null)}
            className={`${inputCls} file:mr-3 file:border-0 file:bg-cyan/15 file:text-cyan file:font-mono file:text-xs file:px-3 file:py-1.5 file:rounded cursor-pointer`}
          />
        </div>
        <button
          type="submit"
          disabled={uploading}
          className="btn-primary inline-flex items-center gap-2 font-semibold text-sm px-5 py-2.5 rounded-md disabled:opacity-60 disabled:pointer-events-none"
        >
          {uploading ? <Loader2 size={15} className="animate-spin" /> : <FileUp size={15} />}
          {uploading ? "Uploading..." : "Upload Resume"}
        </button>
      </form>
    </div>
  );
}

function ProjectForm({ pin, editing, onAdded, onCancelEdit }) {
  const empty = { title: "", description: "", techStack: "", liveDemoUrl: "", githubUrl: "" };
  const [form, setForm] = useState(empty);
  const [image, setImage] = useState(null);
  const [removeImage, setRemoveImage] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (editing) {
      setForm({
        title: editing.title,
        description: editing.description,
        techStack: editing.techStack || "",
        liveDemoUrl: editing.liveDemoUrl || "",
        githubUrl: editing.githubUrl || "",
      });
      setImage(null);
      setRemoveImage(false);
    } else {
      setForm(empty);
      setImage(null);
      setRemoveImage(false);
    }
  }, [editing]);

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));
  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const submit = async (event) => {
    event.preventDefault();
    if (!form.title.trim() || !form.description.trim()) {
      toast.error("Title and description are required");
      return;
    }
    const data = new FormData();
    data.append("title", form.title.trim());
    data.append("description", form.description.trim());
    data.append("techStack", form.techStack.trim());
    data.append("liveDemoUrl", form.liveDemoUrl.trim());
    data.append("githubUrl", form.githubUrl.trim());
    if (image) data.append("image", image);
    if (editing && removeImage) data.append("removeImage", "true");
    setSaving(true);
    try {
      if (editing) {
        await api.updateProject(editing.id, data, pin);
        toast.success("Project updated");
      } else {
        await api.addProject(data, pin);
        toast.success("Project added");
      }
      onAdded();
    } catch (err) {
      toast.error(err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={submit} className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="font-display text-lg font-semibold">{editing ? "Edit Project" : "Add Project"}</p>
        {editing && (
          <button
            type="button"
            onClick={onCancelEdit}
            className="font-mono text-xs text-mute hover:text-amber transition-colors"
          >
            cancel edit
          </button>
        )}
      </div>
      <div>
        <label className={labelCls}>Title *</label>
        <input value={form.title} onChange={update("title")} placeholder="e.g. Task Manager App" className={inputCls} />
      </div>
      <div>
        <label className={labelCls}>Description *</label>
        <textarea
          value={form.description}
          onChange={update("description")}
          rows={3}
          placeholder="What does it do? What problem does it solve?"
          className={`${inputCls} resize-y`}
        />
      </div>
      <div>
        <label className={labelCls}>Tech stack (comma separated)</label>
        <input
          value={form.techStack}
          onChange={update("techStack")}
          placeholder="Java, Spring Boot, React.js, MySQL"
          className={inputCls}
        />
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className={labelCls}>Live demo URL</label>
          <input value={form.liveDemoUrl} onChange={set("liveDemoUrl")} placeholder="https://..." className={inputCls} />
        </div>
        <div>
          <label className={labelCls}>GitHub URL</label>
          <input value={form.githubUrl} onChange={set("githubUrl")} placeholder="https://github.com/..." className={inputCls} />
        </div>
      </div>
      <div>
        <label className={labelCls}>Screenshot (image file, max 5 MB)</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0] || null)}
          className={`${inputCls} file:mr-3 file:border-0 file:bg-cyan/15 file:text-cyan file:font-mono file:text-xs file:px-3 file:py-1.5 file:rounded cursor-pointer`}
        />
        {editing && editing.hasImage && !image && (
          <label className="mt-2 flex items-center gap-2 font-mono text-xs text-mute cursor-pointer">
            <input
              type="checkbox"
              checked={removeImage}
              onChange={(e) => setRemoveImage(e.target.checked)}
              className="accent-cyan"
            />
            Remove current screenshot
          </label>
        )}
      </div>
      <button
        type="submit"
        disabled={saving}
        className="btn-primary inline-flex items-center gap-2 font-semibold text-sm px-5 py-2.5 rounded-md disabled:opacity-60 disabled:pointer-events-none"
      >
        {saving ? <Loader2 size={15} className="animate-spin" /> : <FolderGit2 size={15} />}
        {saving ? "Saving..." : editing ? "Save Changes" : "Add Project"}
      </button>
    </form>
  );
}

function ManagedList({ kind, items, pin, onDeleted, onChanged, onEdit }) {
  const [busyId, setBusyId] = useState(null);

  const remove = async (item) => {
    setBusyId(item.id);
    try {
      if (kind === "certificates") {
        await api.deleteCertificate(item.id, pin);
        toast.success("Certificate deleted");
      } else {
        await api.deleteProject(item.id, pin);
        toast.success("Project deleted");
      }
      onDeleted(item.id);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setBusyId(null);
    }
  };

  const refresh = async () => {
    try {
      if (kind === "certificates") {
        const data = await api.getCertificates();
        onChanged(data);
      } else {
        const data = await api.getProjects();
        onChanged(data);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="mt-6 pt-5 border-t border-line">
      <div className="flex items-center justify-between mb-3">
        <p className="font-mono text-[10px] tracking-widest text-mute uppercase">
          Existing {kind} ({items.length})
        </p>
        <button onClick={refresh} className="font-mono text-[11px] text-cyan hover:underline">
          refresh
        </button>
      </div>
      <ul className="space-y-2 max-h-56 overflow-y-auto pr-1">
        {items.map((item) => (
          <li key={item.id} className="flex items-center justify-between gap-3 glass rounded-md px-3 py-2">
            <div className="min-w-0">
              <p className="text-sm text-ink truncate">{item.name || item.title}</p>
              {kind === "certificates" && (
                <p className="font-mono text-[11px] text-mute truncate">{item.issuer}</p>
              )}
            </div>
            <div className="flex items-center gap-2 shrink-0">
              {kind === "certificates" && (
                <a
                  href={api.certificateFileUrl(item.id)}
                  target="_blank"
                  rel="noreferrer"
                  className="text-cyan hover:text-amber transition-colors"
                  title="View file"
                >
                  <FileText size={15} />
                </a>
              )}
              {kind === "projects" && (
                <button
                  onClick={() => onEdit(item)}
                  className="text-cyan/80 hover:text-cyan transition-colors"
                  title="Edit"
                >
                  <Pencil size={15} />
                </button>
              )}
              <button
                onClick={() => remove(item)}
                disabled={busyId === item.id}
                className="text-red-400/80 hover:text-red-400 transition-colors disabled:opacity-50"
                title="Delete"
              >
                {busyId === item.id ? <Loader2 size={15} className="animate-spin" /> : <Trash2 size={15} />}
              </button>
            </div>
          </li>
        ))}
        {items.length === 0 && (
          <li className="text-sm text-mute font-mono text-xs py-3 text-center border border-dashed border-line rounded-md">
            nothing here yet
          </li>
        )}
      </ul>
    </div>
  );
}

export default function AdminPanel({ open, onClose, tab: initialTab, onChanged }) {
  const [pin, setPin] = useState(null);
  const [tab, setTab] = useState(initialTab);
  const [certificates, setCertificates] = useState([]);
  const [projects, setProjects] = useState([]);
  const [resume, setResume] = useState(null);
  const [editingProject, setEditingProject] = useState(null);

  useEffect(() => {
    if (open) {
      setTab(initialTab);
      setEditingProject(null);
    }
  }, [open, initialTab]);

  const startEdit = async (item) => {
    try {
      setEditingProject(await api.getProject(item.id));
    } catch (err) {
      toast.error(err.message);
    }
  };

  useEffect(() => {
    if (!open || !pin) return;
    let cancelled = false;
    (async () => {
      try {
        const [certs, projs, res] = await Promise.all([api.getCertificates(), api.getProjects(), api.getResume()]);
        if (!cancelled) {
          setCertificates(certs);
          setProjects(projs);
          setResume(res);
        }
      } catch (err) {
        if (!cancelled) toast.error(err.message);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [open, pin]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-primary/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bracket window-card w-full max-w-2xl rounded-2xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-primary/10 bg-primary/[0.02] sticky top-0 z-10 backdrop-blur-xl">
          <p className="font-mono text-xs tracking-widest">
            <span className="text-gradient font-bold">[admin]</span>
            <span className="text-cyan ml-1">PORTFOLIO MANAGER</span>
          </p>
          <button onClick={onClose} className="text-mute hover:text-cyan transition-colors" aria-label="Close">
            <X size={18} />
          </button>
        </div>

        <div className="px-6 py-5">
          {!pin ? (
            <PinGate onUnlock={setPin} />
          ) : (
            <>
              <div className="flex gap-2 mb-5">
                <button
                  onClick={() => {
                    setTab("certificates");
                    setEditingProject(null);
                  }}
                  className={`flex items-center gap-2 font-mono text-xs px-4 py-2 rounded-md border transition-colors ${
                    tab === "certificates"
                      ? "border-cyan/60 text-cyan bg-cyan/10"
                      : "border-line text-mute hover:text-cyan"
                  }`}
                >
                  <Award size={13} />
                  Certificates
                </button>
                <button
                  onClick={() => {
                    setTab("projects");
                    setEditingProject(null);
                  }}
                  className={`flex items-center gap-2 font-mono text-xs px-4 py-2 rounded-md border transition-colors ${
                    tab === "projects"
                      ? "border-cyan/60 text-cyan bg-cyan/10"
                      : "border-line text-mute hover:text-cyan"
                  }`}
                >
                  <FolderGit2 size={13} />
                  Projects
                </button>
                <button
                  onClick={() => {
                    setTab("resume");
                    setEditingProject(null);
                  }}
                  className={`flex items-center gap-2 font-mono text-xs px-4 py-2 rounded-md border transition-colors ${
                    tab === "resume"
                      ? "border-cyan/60 text-cyan bg-cyan/10"
                      : "border-line text-mute hover:text-cyan"
                  }`}
                >
                  <FileUp size={13} />
                  Resume
                </button>
                <button
                  onClick={() => setPin(null)}
                  className="ml-auto font-mono text-xs text-mute hover:text-amber transition-colors"
                >
                  lock
                </button>
              </div>

              {tab === "certificates" ? (
                <>
                  <CertificateUpload pin={pin} onUploaded={async () => {
                    try {
                      setCertificates(await api.getCertificates());
                      onChanged();
                    } catch {
                      /* toast handled by onChanged */
                    }
                  }} />
                  <ManagedList
                    kind="certificates"
                    items={certificates}
                    pin={pin}
                    onDeleted={(id) => {
                      setCertificates((c) => c.filter((x) => x.id !== id));
                      onChanged();
                    }}
                    onChanged={setCertificates}
                  />
                </>
              ) : tab === "resume" ? (
                <ResumeUpload pin={pin} resume={resume} onUploaded={async () => {
                  try {
                    setResume(await api.getResume());
                    onChanged();
                  } catch {
                    /* handled below */
                  }
                }} />
              ) : (
                <>
                  <ProjectForm
                    pin={pin}
                    editing={editingProject}
                    onAdded={async () => {
                      setEditingProject(null);
                      try {
                        setProjects(await api.getProjects());
                        onChanged();
                      } catch {
                        /* handled below */
                      }
                    }}
                    onCancelEdit={() => setEditingProject(null)}
                  />
                  <ManagedList
                    kind="projects"
                    items={projects}
                    pin={pin}
                    onEdit={startEdit}
                    onDeleted={(id) => {
                      if (editingProject && editingProject.id === id) setEditingProject(null);
                      setProjects((p) => p.filter((x) => x.id !== id));
                      onChanged();
                    }}
                    onChanged={setProjects}
                  />
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
