"use client";

import React, { useEffect, useState } from "react";
import { Command } from "cmdk";
import { useRouter } from "next/navigation";
import {
  FileText,
  Home,
  User,
  Briefcase,
  PenTool,
  Mail,
  Github,
  Linkedin,
  Copy,
  Download,
  Search,
  ExternalLink,
  Terminal,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { PROJECTS_DATA } from "@/data/projects";
import { BLOG_POSTS } from "@/data/blog";

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  // Toggle the menu when ⌘K is pressed
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const runCommand = (command: () => void) => {
    setOpen(false);
    command();
  };

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[9999] flex items-start justify-center pt-[20vh] px-4 pointer-events-none">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="w-full max-w-[640px] pointer-events-auto"
          >
            <Command
              label="Command Menu"
              className="glass-premium rounded-2xl overflow-hidden shadow-2xl border border-white/10"
              onKeyDown={(e) => {
                if (e.key === "Escape") setOpen(false);
              }}
            >
              <div className="flex items-center border-b border-white/5 px-4">
                <Search className="w-5 h-5 text-muted mr-3" />
                <Command.Input
                  autoFocus
                  placeholder="Type a command or search..."
                  className="w-full h-14 bg-transparent border-none outline-none text-white placeholder-white/30 text-base font-mori"
                />
                <div className="flex items-center gap-1 ml-auto">
                    <kbd className="px-2 py-1 bg-white/5 border border-white/10 rounded text-[10px] text-muted font-mono leading-none">ESC</kbd>
                </div>
              </div>

              <Command.List className="max-h-[400px] overflow-y-auto p-2 custom-scrollbar">
                <Command.Empty className="px-4 py-8 text-center text-muted text-sm font-light">
                  No results found for your search.
                </Command.Empty>

                <Command.Group heading="Navigation" className="px-2 py-2 text-[10px] uppercase tracking-widest font-bold text-brand-accent/60">
                  <Item onSelect={() => runCommand(() => router.push("/"))}>
                    <Home className="w-4 h-4 mr-3" />
                    <span>Home</span>
                  </Item>
                  <Item onSelect={() => runCommand(() => router.push("/about"))}>
                    <User className="w-4 h-4 mr-3" />
                    <span>About Me</span>
                  </Item>
                  <Item onSelect={() => runCommand(() => router.push("/projects"))}>
                    <Briefcase className="w-4 h-4 mr-3" />
                    <span>Projects Archive</span>
                  </Item>
                  <Item onSelect={() => runCommand(() => router.push("/blog"))}>
                    <PenTool className="w-4 h-4 mr-3" />
                    <span>Insights & Blog</span>
                  </Item>
                </Command.Group>

                <Command.Group heading="Projects" className="px-2 py-2 mt-2 text-[10px] uppercase tracking-widest font-bold text-brand-accent/60">
                  {PROJECTS_DATA.map((project) => (
                    <Item 
                      key={project.id} 
                      value={`${project.title} ${project.tagline} ${project.stack.join(" ")}`}
                      onSelect={() => runCommand(() => router.push(`/projects/${project.slug}`))}
                    >
                      <Terminal className="w-4 h-4 mr-3 text-brand-accent/80" />
                      <div className="flex flex-col">
                        <span className="text-white">{project.title}</span>
                        <span className="text-[11px] text-muted font-light truncate max-w-[300px]">{project.tagline}</span>
                      </div>
                      <kbd className="ml-auto px-1.5 py-0.5 bg-white/5 border border-white/10 rounded text-[9px] text-muted font-mono uppercase">{project.category}</kbd>
                    </Item>
                  ))}
                </Command.Group>

                <Command.Group heading="Blog Posts" className="px-2 py-2 mt-2 text-[10px] uppercase tracking-widest font-bold text-brand-accent/60">
                  {BLOG_POSTS.map((post) => (
                    <Item 
                      key={post.slug} 
                      value={`${post.title} ${post.excerpt} ${post.category}`}
                      onSelect={() => runCommand(() => router.push(`/blog/${post.slug}`))}
                    >
                      <FileText className="w-4 h-4 mr-3 text-brand-blue/80" />
                      <div className="flex flex-col">
                        <span className="text-white">{post.title}</span>
                        <span className="text-[11px] text-muted font-light truncate max-w-[300px]">{post.excerpt}</span>
                      </div>
                    </Item>
                  ))}
                </Command.Group>

                <Command.Group heading="Quick Actions" className="px-2 py-2 mt-2 text-[10px] uppercase tracking-widest font-bold text-brand-accent/60">
                  <Item onSelect={() => runCommand(() => window.open("/assets/gav-resume.pdf", "_blank"))} value="download resume cv pdf">
                    <Download className="w-4 h-4 mr-3" />
                    <span>Download CV / Resume</span>
                    <kbd className="ml-auto px-1.5 py-0.5 bg-white/5 border border-white/10 rounded text-[10px] text-muted font-mono">PDF</kbd>
                  </Item>
                  <Item onSelect={() => runCommand(() => {
                    navigator.clipboard.writeText("vlsqz.gabrielle@gmail.com");
                  })} value="copy email address contact">
                    <Copy className="w-4 h-4 mr-3" />
                    <span>Copy Email Address</span>
                  </Item>
                </Command.Group>

                <Command.Group heading="Socials" className="px-2 py-2 mt-2 text-[10px] uppercase tracking-widest font-bold text-brand-accent/60">
                  <Item onSelect={() => runCommand(() => window.open("https://github.com/gabewebd", "_blank"))} value="github profile code repository">
                    <Github className="w-4 h-4 mr-3" />
                    <span>GitHub Profile</span>
                  </Item>
                  <Item onSelect={() => runCommand(() => window.open("https://linkedin.com/in/gabrielle-velasquez-gav", "_blank"))} value="linkedin connection professional">
                    <Linkedin className="w-4 h-4 mr-3" />
                    <span>LinkedIn Connection</span>
                  </Item>
                </Command.Group>
              </Command.List>

              <div className="px-4 py-3 border-t border-white/5 bg-white/1 flex items-center justify-between pointer-events-none">
                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1 text-[10px] text-muted">
                        <kbd className="px-1.5 py-0.5 bg-white/5 border border-white/10 rounded font-mono">↑↓</kbd>
                        <span>to navigate</span>
                    </div>
                    <div className="flex items-center gap-1 text-[10px] text-muted">
                        <kbd className="px-1.5 py-0.5 bg-white/5 border border-white/10 rounded font-mono">ENTER</kbd>
                        <span>to select</span>
                    </div>
                </div>
                <div className="text-[10px] text-brand-accent font-mori font-bold italic opacity-60">GAV.DEV</div>
              </div>
            </Command>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[-1] pointer-events-auto"
          />
        </div>
      )}
    </AnimatePresence>
  );
}

function Item({ children, onSelect, value }: { children: React.ReactNode; onSelect?: () => void; value?: string }) {
  return (
    <Command.Item
      onSelect={onSelect}
      value={value}
      className="flex items-center px-4 py-3 rounded-xl text-sm font-mori font-medium text-white/70 aria-selected:text-white aria-selected:bg-white/10 transition-all cursor-pointer select-none group"
    >
      {children}
    </Command.Item>
  );
}
