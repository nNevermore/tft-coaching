"use client";

import { Link, usePathname } from "@/i18n/routing";

export default function SidebarNav({ role }: { role: string }) {
  const pathname = usePathname();

  const navLinks = [
    { name: "Command Center", href: "/dashboard", icon: "🏠", show: true },
    {
      name: "My Lessons",
      href: "/dashboard/lessons",
      icon: "📖",
      show: role === "user",
    },
    {
      name: "Initiate Booking",
      href: "/dashboard/book",
      icon: "📅",
      show: role === "user",
    },
    {
      name: "Tactical Schedule",
      href: "/dashboard/coach/schedule",
      icon: "📅",
      show: role === "coach",
    },
    {
      name: "Student Intel",
      href: "/dashboard/coach/lessons",
      icon: "👥",
      show: role === "coach",
    },
    {
      name: "Systems Manage",
      href: "/dashboard/admin/manage",
      icon: "🛠️",
      show: role === "admin",
    },
    {
      name: "System Logs",
      href: "/dashboard/admin/logs",
      icon: "📄",
      show: role === "admin",
    },
    {
      name: "Core Status",
      href: "/dashboard/admin/status",
      icon: "📊",
      show: role === "admin",
    },
  ];

  return (
    <nav className="space-y-1.5">
      <div className="text-[10px] font-black text-slate-600 uppercase tracking-[0.3em] mb-4 ml-4">
        Main Interface
      </div>
      {navLinks
        .filter((l) => l.show)
        .map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href as Parameters<typeof Link>[0]["href"]}
              className={`group relative flex items-center gap-3 px-5 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all duration-300 overflow-hidden ${
                isActive
                  ? "text-white bg-white/5 shadow-inner"
                  : "text-slate-500 hover:text-slate-200 hover:bg-white/[0.02]"
              }`}
            >
              {/* Active Highlight Border */}
              {isActive && (
                <div className="absolute left-0 top-1/4 bottom-1/4 w-1 bg-gradient-to-b from-blue-500 to-teal-500 rounded-r-full shadow-[0_0_12px_rgba(45,212,191,0.6)]"></div>
              )}

              <span
                className={`text-lg transition-transform duration-300 ${isActive ? "scale-110" : "group-hover:scale-110 opacity-60"}`}
              >
                {link.icon}
              </span>
              <span className="relative z-10">{link.name}</span>

              {/* Subtle glow on hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/0 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </Link>
          );
        })}
    </nav>
  );
}
