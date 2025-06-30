"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

import { Menu, X } from "lucide-react";
import { siteData } from "@/data/site-data";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-gray-900/95 backdrop-blur-sm shadow-lg border-b border-gray-800"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div
            className="flex items-center space-x-3"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              {/* <span className="text-white font-bold text-lg">S</span> */}
              <Image src={"/logo.png"} width={900} height={900} alt="logo" />
            </div>
            <div>
              <div className="hidden sm:block">
                <span className="text-xl font-bold text-white">
                  {siteData.company.name}
                </span>
                <div className="text-xs text-gray-400">
                  {siteData.company.tagline}
                </div>
              </div>
              <div className="sm:hidden">
                <span className="text-lg font-bold text-white">
                  {siteData.company.name}
                </span>
              </div>
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            {siteData.navigation.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  href={item.href}
                  className="text-gray-300 hover:text-white transition-colors font-medium relative group"
                >
                  {item.name}
                  <motion.div
                    className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 group-hover:w-full transition-all duration-300"
                    whileHover={{ width: "100%" }}
                  />
                </Link>
              </motion.div>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center space-x-3 xl:space-x-4">
            <div className="hidden xl:flex items-center space-x-2 text-gray-400 text-sm">
              {/* <Users className="w-4 h-4" />
              <span>12K+ Live</span>
            </div>
            <ThemeToggle /> */}
              {/* <Button variant="ghost" className="text-gray-300 hover:text-white">
              Sign In
            </Button> */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {/* <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  Join Live
                </Button> */}
              </motion.div>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center space-x-3 lg:hidden">
              <div className="flex items-center space-x-1 text-gray-400 text-xs">
                {/* <Users className="w-3 h-3" />
              <span>12K+</span> */}
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-300"
              >
                {isMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </Button>
            </div>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="lg:hidden mt-4 pb-4 border-t border-gray-800 overflow-hidden"
              >
                <nav className="flex flex-col space-y-3 mt-4">
                  {siteData.navigation.map((item, index) => (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Link
                        href={item.href}
                        className="text-gray-300 hover:text-white transition-colors font-medium py-2 block"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                    </motion.div>
                  ))}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="flex flex-col space-y-3 pt-4 border-t border-gray-800"
                  >
                    {/* <Button variant="ghost" className="justify-start">
                    Sign In
                  </Button> */}
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                      Join Live Webinar
                    </Button>
                  </motion.div>
                </nav>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.header>
  );
}
