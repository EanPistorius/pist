"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const links = [
    { name: "Home", href: "/" },
    { name: "Beplanning", href: "/beplanning" },
    { name: "Program", href: "/program" },
    { name: "RSVP", href: "/rsvp" },
    { name: "Venue", href: "/venue" },
  ];

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {links.map((link) => {
          const isActive =
            link.href === "/"
              ? pathname === "/"
              : pathname.startsWith(link.href);

          return (
            <Link
              key={link.href}
              href={link.href}
              className={`nav-link ${
                isActive ? "nav-link-active" : ""
              }`}
            >
              {link.name}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}