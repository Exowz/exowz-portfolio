"use client";

import React from "react";
import { useParams } from "next/navigation";
import { FloatingDock, DockItem } from "@/components/ui/floating-dock";
import { IconHome, IconFolder, IconUser, IconMail, IconFileText, IconBrandGithub, IconBrandLinkedin } from "@tabler/icons-react";

export function Dock() {
  const params = useParams();
  const locale = params.locale as string;

  const links: DockItem[] = [
    {
      title: "Home",
      icon: (
        <IconHome className="h-full w-full" />
      ),
      href: `/${locale}`,
    },
    {
      title: "Projects",
      icon: (
        <IconFolder className="h-full w-full" />
      ),
      href: `/${locale}/projects`,
    },
    {
      title: "About",
      icon: (
        <IconUser className="h-full w-full" />
      ),
      href: `/${locale}/about`,
    },
    {
      title: "Contact",
      icon: (
        <IconMail className="h-full w-full" />
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
        <IconFileText className="h-full w-full" />
      ),
      href: `/resume-${locale}.pdf`,
    },
    {
      title: "GitHub",
      icon: (
        <IconBrandGithub className="h-full w-full" />
      ),
      href: "https://github.com/exowz",
    },
    {
      title: "LinkedIn",
      icon: (
        <IconBrandLinkedin className="h-full w-full" />
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
