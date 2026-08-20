import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { href: "#home", label: "Home" },
  { href: "#skills", label: "Skills" },
  { href: "#experience", label: "Experience" },
  { href: "#education", label: "Education" },
  { href: "#resume", label: "Resume" },
  { href: "#certificates", label: "Certificates" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("#home");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      const sections = links
        .map((link) => document.querySelector(link.href))
        .filter(Boolean);
      const current = sections.findLast((section) => section.getBoundingClientRect().top <= 120);
      if (current) setActive(`#${current.id}`);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const linkCls = (href) =>
    `px-3 py-2 text-sm transition-colors ${
      active === href ? "text-cyan" : "text-[#AAA6A0] hover:text-cyan"
    }`;

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? "py-2" : "py-4"
      }`}
    >
      <nav
        className={`mx-auto max-w-6xl px-5 flex items-center justify-between h-14 rounded-2xl bg-primary border border-white/10 transition-all duration-300 ${
          scrolled ? "mx-4 lg:mx-auto max-w-5xl" : ""
        }`}
      >
        <a href="#home" className="font-mono text-sm font-bold tracking-wider text-white">
          <span className="text-cyan">~/</span>
          <span>bhavesh</span>
          <span className="text-white/60">_thakare</span>
        </a>

        <ul className="hidden md:flex items-center gap-1">
          {links.map((link) => (
            <li key={link.href}>
              <a href={link.href} className={linkCls(link.href)}>
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <button
          className="md:hidden text-cyan p-2"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {open && (
        <div className="md:hidden bg-primary border border-white/10 mx-4 mt-2 rounded-2xl px-5 py-4">
          <ul className="flex flex-col gap-1">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`block px-2 py-2 text-sm transition-colors ${
                    active === link.href ? "text-cyan" : "text-white/80 hover:text-cyan"
                  }`}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}