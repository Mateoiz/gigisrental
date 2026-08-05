"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_LINKS = [
  { label: "About", href: "/about" },
  { label: "Collections", href: "/collections" },
  { label: "Guidelines", href: "/guidelines" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileMenuOpen]);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const isActive = (href: string) =>
    href !== "/#terms" && href !== "/" && pathname?.startsWith(href);

 if (pathname?.startsWith('/admin') || pathname?.startsWith('/dshbrdlogin')) {
    return null
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b ${
        isScrolled
          ? "bg-[#FFF5F8]/95 backdrop-blur-md shadow-[0_2px_20px_rgba(194,84,122,0.08)] border-[#F2C4D4]"
          : "bg-[#FFF5F8] border-[#F2C4D4]"
      }`}
    >
      <div className="flex items-center justify-between h-[72px] lg:h-[82px] px-6 lg:px-20">

        {/* LEFT — Logo */}
        <Link
          href="/"
          className="transition-transform duration-300 hover:scale-105 active:scale-95 inline-block shrink-0"
          onClick={() => setMobileMenuOpen(false)}
        >
          <span className="whitespace-nowrap">
            <span
              className="font-[family-name:var(--font-parisienne)] text-[2.2rem] lg:text-[3rem] text-[#C2547A]"
              style={{ WebkitTextStroke: "0.6px #C2547A" }}
            >
              Gigi&apos;s{" "}
            </span>
            <span
              className="font-[family-name:var(--font-parisienne)] text-[2.2rem] lg:text-[3rem] text-[#E8A0B8]"
            >
              Rentals
            </span>
          </span>
        </Link>

        {/* CENTER — Nav links */}
        <nav className="hidden lg:flex items-center gap-9">
          {NAV_LINKS.map(({ label, href }) => {
            const active = isActive(href);
            return (
              <Link
                key={label}
                href={href}
                className={`group relative text-[11px] font-semibold tracking-widest uppercase transition-colors duration-300 whitespace-nowrap py-2 ${
                  active ? "text-[#C2547A]" : "text-[#B06080] hover:text-[#C2547A]"
                }`}
              >
                {label}
                <span
                  className={`absolute -bottom-0.5 left-0 h-px bg-[#E8A0B8] transition-all duration-300 ${
                    active ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </Link>
            );
          })}
        </nav>

        {/* RIGHT — CTA */}
        <div className="hidden lg:flex items-center shrink-0">
          <Link
            href="/collections"
            className="rounded-full border border-[#E8A0B8] bg-gradient-to-r from-[#F9E4EE] to-[#F2D0E4] px-8 py-3.5 text-[13px] font-bold tracking-widest uppercase text-[#C2547A] transition-all duration-300 hover:scale-105 hover:shadow-[0_4px_20px_rgba(194,84,122,0.2)] hover:from-[#F2D0E4] hover:to-[#EAB8D0] active:scale-95 flex items-center gap-2 whitespace-nowrap"
          >
            Rent a Dress
            <span aria-hidden="true">→</span>
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="lg:hidden text-[#C2547A] z-50 p-2 -mr-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="w-6 h-6">
              <path d="M5 5l14 14M19 5L5 19" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="w-6 h-6">
              <path d="M3.5 6.5h17M3.5 12h17M3.5 17.5h17" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 min-h-[calc(100vh-72px)] bg-[#FFF5F8] px-6 py-6 flex flex-col gap-1 lg:hidden border-t border-[#F2C4D4] z-40">
          {NAV_LINKS.map(({ label, href }) => {
            const active = isActive(href);
            return (
              <Link
                key={label}
                href={href}
                onClick={() => setMobileMenuOpen(false)}
                className={`text-[14px] font-bold tracking-widest uppercase border-b border-[#F2C4D4] py-5 transition-colors flex items-center justify-between ${
                  active ? "text-[#C2547A]" : "text-[#B06080] hover:text-[#C2547A]"
                }`}
              >
                {label}
              </Link>
            );
          })}

          <Link
            href="/collections"
            onClick={() => setMobileMenuOpen(false)}
            className="mt-8 mx-auto w-full max-w-sm rounded-full border border-[#E8A0B8] bg-gradient-to-r from-[#F9E4EE] to-[#F2D0E4] px-6 py-4 text-center text-[13px] font-bold tracking-widest uppercase text-[#C2547A] active:scale-95 transition-transform flex items-center justify-center gap-2"
          >
            Rent a Dress
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      )}
    </header>
  );
}