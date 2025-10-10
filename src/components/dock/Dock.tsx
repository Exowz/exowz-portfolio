"use client";

import React from "react";
import { useParams } from "next/navigation";
import { FloatingDock, DockItem } from "@/components/ui/floating-dock";
import { Home, Folder, User, Mail, FileText, Github, Linkedin } from "lucide-react";

export function Dock() {
  const params = useParams();
  const locale = params.locale as string;

  const links: DockItem[] = [
    {
      title: "Home",
      icon: (
        <Home className="h-full w-full" />
      ),
      href: `/${locale}`,
    },
    {
      title: "Projects",
      icon: (
        <Folder className="h-full w-full" />
      ),
      href: `/${locale}/projects`,
    },
    {
      title: "About",
      icon: (
        <User className="h-full w-full" />
      ),
      href: `/${locale}/about`,
    },
    {
      title: "Contact",
      icon: (
        <Mail className="h-full w-full" />
      ),
      href: `/${locale}/contact`,
    },
    // Divider
    {
      title: "divider",
      icon: null,
      href: "#",
      isDivider: true,
    },
    {
      title: "Resume",
      icon: (
        <FileText className="h-full w-full" />
      ),
      href: "/resume.pdf",
    },
    {
      title: "GitHub",
      icon: (
        <Github className="h-full w-full" />
      ),
      href: "https://github.com/exowz",
    },
    {
      title: "LinkedIn",
      icon: (
        <Linkedin className="h-full w-full" />
      ),
      href: "https://linkedin.com/in/mke-kapoor",
    },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 flex items-center justify-center pb-4 z-50">
      <FloatingDock items={links} />
    </div>
  );
}
