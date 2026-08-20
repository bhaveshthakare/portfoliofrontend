import { useState } from "react";
import { Mail, Phone, Send, Loader2 } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./BrandIcons.jsx";
import toast from "react-hot-toast";
import { api } from "../api.js";
import { profile } from "../data/portfolio.js";
import SectionHeading from "./SectionHeading.jsx";
import { useReveal } from "../hooks/useReveal.js";

const contactLinks = [
  {
    label: "Email",
    value: profile.email,
    href: `mailto:${profile.email}`,
    icon: Mail,
    color: "text-cyan border-cyan/50 bg-cyan/10",
    glow: "shadow-[0_0_20px_-8px_rgba(255,161,10,0.4)]",
  },
  {
    label: "Phone",
    value: profile.phone,
    href: `tel:${profile.phone.replace(/[^+\d]/g, "")}`,
    icon: Phone,
    color: "text-violet border-violet/50 bg-violet/10",
    glow: "shadow-[0_0_20px_-8px_rgba(75,143,34,0.5)]",
  },
  {
    label: "LinkedIn",
    value: profile.linkedinLabel,
    href: profile.linkedin,
    icon: LinkedinIcon,
    color: "text-pink border-pink/50 bg-pink/10",
    glow: "shadow-[0_0_20px_-8px_rgba(158,255,90,0.5)]",
  },
  {
    label: "GitHub",
    value: profile.githubLabel,
    href: profile.github,
    icon: GithubIcon,
    color: "text-amber border-amber/50 bg-amber/10",
    glow: "shadow-[0_0_20px_-8px_rgba(75,143,34,0.5)]",
  },
];

export default function Contact() {
  const ref = useReveal();
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sending, setSending] = useState(false);

  const update = (key) => (event) => setForm((f) => ({ ...f, [key]: event.target.value }));

  const submit = async (event) => {
    event.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      toast.error("Please fill in name, email and message");
      return;
    }
    setSending(true);
    try {
      await api.sendContact(form);
      toast.success("Message sent — thank you!");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      toast.error(err.message);
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      <div className="aurora w-[440px] h-[440px] bg-violet/40 -right-40 -top-20" />
      <div className="aurora w-[380px] h-[380px] bg-cyan/40 -left-40 bottom-0" style={{ animationDelay: "6s" }} />
      <div className="relative mx-auto max-w-6xl px-5">
        <div ref={ref}>
          <div className="reveal">
            <SectionHeading
              index="07"
              label="CONTACT"
              title="Let's Build Something Together"
              hint={[
                "Have an idea, a project, or an opportunity in mind?",
                "Send a message — I'll get back to you within a day.",
              ]}
            />
          </div>

          <div className="grid lg:grid-cols-5 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {contactLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    target={link.href.startsWith("http") ? "_blank" : undefined}
                    rel="noreferrer"
                    className="reveal window-card rounded-xl p-5 flex items-center gap-4 block"
                  >
                    <div
                      className={`w-11 h-11 rounded-lg border flex items-center justify-center shrink-0 ${link.color} ${link.glow}`}
                    >
                      <Icon size={20} />
                    </div>
                    <div>
                      <p className="font-mono text-[10px] tracking-widest text-mute uppercase">{link.label}</p>
                      <p className="text-sm text-ink mt-0.5 break-all">{link.value}</p>
                    </div>
                  </a>
                );
              })}
            </div>

            <form
              onSubmit={submit}
              className="reveal window-card rounded-xl p-6 md:p-8 lg:col-span-3"
            >
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="font-mono text-xs text-mute block mb-2">NAME *</label>
                  <input
                    value={form.name}
                    onChange={update("name")}
                    placeholder="Your name"
                    className="input-glass w-full rounded-md px-4 py-3 text-sm text-ink placeholder:text-mute/50"
                  />
                </div>
                <div>
                  <label className="font-mono text-xs text-mute block mb-2">EMAIL *</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={update("email")}
                    placeholder="you@example.com"
                    className="input-glass w-full rounded-md px-4 py-3 text-sm text-ink placeholder:text-mute/50"
                  />
                </div>
              </div>
              <div className="mt-5">
                <label className="font-mono text-xs text-mute block mb-2">SUBJECT</label>
                <input
                  value={form.subject}
                  onChange={update("subject")}
                  placeholder="Opportunity / collaboration"
                  className="input-glass w-full rounded-md px-4 py-3 text-sm text-ink placeholder:text-mute/50"
                />
              </div>
              <div className="mt-5">
                <label className="font-mono text-xs text-mute block mb-2">MESSAGE *</label>
                <textarea
                  value={form.message}
                  onChange={update("message")}
                  rows={5}
                  placeholder="Tell me about the role or project..."
                  className="input-glass w-full rounded-md px-4 py-3 text-sm text-ink placeholder:text-mute/50 resize-y"
                />
              </div>
              <button
                type="submit"
                disabled={sending}
                className="btn-primary mt-6 inline-flex items-center gap-2 font-semibold text-sm px-6 py-3 rounded-md disabled:opacity-60 disabled:pointer-events-none"
              >
                {sending ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
                {sending ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}