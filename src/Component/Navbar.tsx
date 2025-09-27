"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  // Detect scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 overflow-hidden ${
        scrolled ? "bg-black/90 shadow-xl h-16" : "h-20"
      }`}
    >
      {/* Parallax Gradient Background */}
      <div
        className="absolute inset-0 -z-10 transition-all duration-700"
        style={{
          background: `linear-gradient(90deg, #8B0000, #f7bf08ff, #c0c0c0)`,
          backgroundPosition: `${scrollY / 5}% center`,
          backgroundSize: "200% 200%",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-full relative z-20">
        {/* Logo + Brand */}
        <div className="flex items-center space-x-3 transition-all duration-500">
          <Image
            src="/bree.png" // place logo inside /public
            alt="Billionaire Bree Logo"
            width={scrolled ? 40 : 52}
            height={scrolled ? 40 : 52}
            className="object-contain transition-all duration-700"
          />
          <span
            className={`brand-name relative overflow-hidden cursor-pointer ${
              scrolled ? "text-xl" : "text-2xl"
            }`}
          >
            <span className="relative z-10">Billionaire Bre</span>
            {/* Auto shimmer effect */}
            <span className="absolute inset-0 shimmer" />
          </span>
        </div>

        {/* Desktop Menu */}
        <nav className="hidden md:flex space-x-10 text-lg font-medium">
          {["Home", "Services", "Gallery", "About", "Contact"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="relative text-white hover:text-[#FFD700] transition duration-300 group"
            >
              {item}
              <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-[#FFD700] transition-all group-hover:w-full"></span>
            </a>
          ))}
        </nav>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-white"
          onClick={() => setOpen(!open)}
          aria-label="Toggle Menu"
        >
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-black/95 text-white flex flex-col items-center space-y-6 py-8 animate-slide-down">
          {["Home", "Services", "Gallery", "About", "Contact"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-xl font-semibold hover:text-[#FFD700] transition duration-300"
              onClick={() => setOpen(false)}
            >
              {item}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
