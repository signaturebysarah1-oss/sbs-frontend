"use client";

import {
  SearchIcon,
  HeartIcon,
  MenuIcon,
  XIcon,
  ShoppingBagIcon,
} from "lucide-react";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [cartCount] = useState(2);

  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Shop", href: "/shop" },
    { label: "Custom Order", href: "/custom" },
    { label: "About", href: "/about" },
    { label: "Size Guide", href: "/size-guide" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <>
      <nav
        className={`
          fixed top-0 left-0 right-0 z-50
          bg-[#0B0B0B]
          transition-all duration-300
          ${
            scrolled
              ? "border-b border-[#FAD90C]/15 shadow-[0_2px_30px_rgba(0,0,0,0.4)]"
              : "border-b border-transparent"
          }
        `}
      >
        <div className="max-w-350 mx-auto h-18 px-8 flex items-center justify-between">
          {/* Logo */}
          <button className="flex items-center gap-3">
          <Image
  src="/sarah-logo.jpg"
  alt="SBS Logo"
  width={42}
  height={42}
  className="rounded"
/>
            <div className="flex flex-col leading-none">
              <span className="text-gold text-[13px] font-bold tracking-[0.06em]">
                SIGNATURE
              </span>

              <span className="text-white/55 text-[9px] font-normal tracking-[0.2em] uppercase">
                by sarah
              </span>
            </div>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-9">
            {navLinks.map(({ label, href }) => {
              const active =
                pathname === href ||
                (href !== "/" && pathname.startsWith(href));

              return (
                <a
                  key={href}
                  href={href}
                  className={`
                    text-[11px]
                    font-medium
                    tracking-[0.12em]
                    uppercase
                    transition-colors
                    ${active ? "text-gold" : "text-white/75 hover:text-gold"}
                  `}
                >
                  {label}
                </a>
              );
            })}
          </div>

          {/* Icons */}
          <div className="flex items-center gap-5">
            <button className="hidden md:block text-white/70 hover:text-gold transition">
              <SearchIcon size={20} />
            </button>

            <button className="hidden md:block text-white/70 hover:text-gold transition">
              <HeartIcon size={20} />
            </button>

            <button className="relative text-white/70 hover:text-gold transition">
              <ShoppingBagIcon size={20} />

              {cartCount > 0 && (
                <span
                  className="
                    absolute -top-2 -right-2
                    h-4 w-4
                    rounded-full
                    bg-gold
                    text-[#0B0B0B]
                    text-[9px]
                    font-bold
                    flex items-center justify-center
                  "
                >
                  {cartCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setMobileOpen(true)}
              className="md:hidden text-white/80"
            >
              <MenuIcon size={24} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div
          className="
          fixed inset-0 z-100
          bg-[#0B0B0B]
          px-8 py-6
          flex flex-col
        "
        >
          <div className="flex justify-between items-center mb-12">
            <span className="text-gold font-bold tracking-widest">
              SIGNATURE
            </span>

            <button onClick={() => setMobileOpen(false)} className="text-white">
              <XIcon />
            </button>
          </div>

          <div className="flex flex-col">
            {navLinks.map(({ label, href }) => {
              const active =
                pathname === href ||
                (href !== "/" && pathname.startsWith(href));

              return (
                <a
                  key={href}
                  href={href}
                  onClick={() => setMobileOpen(false)}
                  className={`
                    text-3xl
                    py-3
                    border-b border-white/10
                    ${active ? "text-gold" : "text-white"}
                  `}
                >
                  {label}
                </a>
              );
            })}
          </div>

          <div className="mt-auto flex gap-6">
            <a className="text-white/50 text-xs uppercase tracking-widest">
              Instagram
            </a>

            <a className="text-white/50 text-xs uppercase tracking-widest">
              WhatsApp
            </a>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
