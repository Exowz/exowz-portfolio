"use client";

import React from "react";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { FloatingDock, DockItem } from "@/components/ui/floating-dock";
import {
  IconHome,
  IconFolder,
  IconUser,
  IconMail,
  IconFileText,
  IconBrandGithub,
  IconBrandLinkedin,
} from "@tabler/icons-react";

export function Dock() {
  const params = useParams();
  const locale = params.locale as string;
  const t = useTranslations("nav");

  const links: DockItem[] = [
    {
      title: t("home"),
      icon: (
        <IconHome className="h-full w-full" />
      ),
      href: `/${locale}`,
    },
    {
      title: t("projects"),
      icon: (
        <IconFolder className="h-full w-full" />
      ),
      href: `/${locale}/projects`,
    },
    {
      title: t("about"),
      icon: (
        <IconUser className="h-full w-full" />
      ),
      href: `/${locale}/about`,
    },
    {
      title: t("contact"),
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
      title: t("resume"),
      icon: (
        <IconFileText className="h-full w-full" />
      ),
      href: `/${locale}/cv`,
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
    <div className="fixed bottom-0 left-0 right-0 hidden md:flex items-center justify-center pb-4 z-50">
      <FloatingDock items={links} mobileToggleLabel={t("menu")} />
    </div>
  );
}
