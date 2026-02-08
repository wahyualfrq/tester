import React from "react";
import { motion } from "framer-motion";
import { FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: <FaInstagram />, href: "https://instagram.com/wahyualfrq", label: "Instagram" },
    { icon: <FaLinkedin />, href: "https://linkedin.com/in/wahyualfrq", label: "LinkedIn" },
  ];

  const quickLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <footer className="bg-white dark:bg-dark py-8 md:py-12 relative overflow-hidden border-t border-slate-200 dark:border-white/5 transition-colors duration-300">
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div className="col-span-2 md:col-span-1 lg:col-span-1 space-y-4 text-center md:text-left">
            <h2 className="text-xl font-display font-bold text-slate-900 dark:text-white tracking-tighter">
              W4YOU<span className="text-primary">.</span>
            </h2>
            <p className="text-slate-600 dark:text-gray-400 text-[11px] leading-relaxed max-w-xs mx-auto md:mx-0 font-light px-4 md:px-0">
              Membangun pengalaman digital yang fungsional melalui kode yang rapi dan desain yang terarah.
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-span-1 space-y-4 text-left md:text-left pl-4 md:pl-0">
            <h3 className="text-slate-900 dark:text-white font-semibold uppercase tracking-widest text-[9px] opacity-50">Navigation</h3>
            <ul className="space-y-2 text-[11px]">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href} 
                    className="text-slate-600 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white transition-colors duration-300"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div className="col-span-1 space-y-4 text-left md:text-left">
            <h3 className="text-slate-900 dark:text-white font-semibold uppercase tracking-widest text-[9px] opacity-50">Follow Me</h3>
            <div className="flex gap-4 justify-start md:justify-start">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  whileHover={{ y: -2, scale: 1.05 }}
                  className="w-9 h-9 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-500 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white transition-all duration-300"
                  aria-label={social.label}
                >
                  <span className="text-sm">{social.icon}</span>
                </motion.a>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div className="col-span-2 md:col-span-1 lg:col-span-1 space-y-4 text-center md:text-left">
            <h3 className="text-slate-900 dark:text-white font-semibold uppercase tracking-widest text-[9px] opacity-50">Get in Touch</h3>
            <a 
              href="mailto:wahyudialfurqon109@gmail.com" 
              className="text-slate-900 dark:text-white text-xs font-medium hover:text-primary transition-colors duration-300 block break-all px-4 md:px-0"
            >
              wahyudialfurqon109@gmail.com
            </a>
            <p className="text-slate-500 dark:text-gray-500 text-[10px] uppercase tracking-widest font-light pt-2">
              &copy; {currentYear} by W4YOU.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

