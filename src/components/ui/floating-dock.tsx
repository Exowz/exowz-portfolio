'use client';

import { cn } from "@/lib/utils";
import { IconLayoutNavbarCollapse } from "@tabler/icons-react";
import {
  AnimatePresence,
  MotionValue,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion"; // Changed to framer-motion, your 'motion/react' import is also fine.
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useRef, useState } from "react";

export type DockItem = {
  title: string;
  icon: React.ReactNode;
  href: string;
  isDivider?: boolean;
  color?: string;
};

export const FloatingDock = ({
  items,
  desktopClassName,
  mobileClassName,
}: {
  items: DockItem[];
  desktopClassName?: string;
  mobileClassName?: string;
}) => {
  return (
    <>
      <FloatingDockDesktop items={items} className={desktopClassName} />
      <FloatingDockMobile items={items} className={mobileClassName} />
    </>
  );
};

const FloatingDockMobile = ({
  items,
  className,
}: {
  items: DockItem[];
  className?: string;
}) => {
  const [open, setOpen] = useState(false);

  return (
    <div className={cn("relative block md:hidden", className)}>
      <AnimatePresence>
        {open && (
          <motion.div
            layoutId="nav"
            className="absolute inset-x-0 bottom-full mb-2 flex flex-col gap-2"
          >
            {items.map((item, idx) => {
              if (item.isDivider) return null;

              const isExternal = item.href.startsWith('http') || item.href.startsWith('/resume');
              const linkContent = (
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-2xl transition-all duration-300"
                  style={{
                    background: 'var(--dock-item-bg)',
                    backdropFilter: 'blur(20px) saturate(180%)',
                    WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                    border: '1px solid var(--dock-item-border)',
                    boxShadow: 'var(--dock-item-shadow)',
                    color: 'var(--dock-text)'
                  }}
                >
                  <div className="h-4 w-4">
                    {item.icon}
                  </div>
                </div>
              );

              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{
                    opacity: 0,
                    y: 10,
                    transition: { delay: idx * 0.05 },
                  }}
                  transition={{ delay: (items.length - 1 - idx) * 0.05 }}
                >
                  {isExternal ? (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {linkContent}
                    </a>
                  ) : (
                    <Link href={item.href}>
                      {linkContent}
                    </Link>
                  )}
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
      <button
        onClick={() => setOpen(!open)}
        className="flex h-10 w-10 items-center justify-center rounded-2xl transition-all duration-300"
        style={{
          background: 'var(--dock-item-bg)',
          backdropFilter: 'blur(20px) saturate(180%)',
          WebkitBackdropFilter: 'blur(20px) saturate(180%)',
          border: '1px solid var(--dock-item-border)',
          boxShadow: 'var(--dock-item-shadow)',
          color: 'var(--dock-text)'
        }}
      >
        <IconLayoutNavbarCollapse className="h-5 w-5" />
      </button>
    </div>
  );
};

const FloatingDockDesktop = ({
  items,
  className,
}: {
  items: DockItem[];
  className?: string;
}) => {
  // ✅ FIX: Changed 'let' to 'const'
  const mouseX = useMotionValue(Infinity);

  return (
    <motion.div
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className={cn(
        "mx-auto hidden h-16 items-end gap-4 rounded-2xl px-4 pb-3 md:flex transition-colors duration-300",
        className
      )}
      style={{
        background: 'var(--dock-bg)',
        backdropFilter: 'blur(20px) saturate(180%)',
        WebkitBackdropFilter: 'blur(20px) saturate(180%)',
        border: '1px solid var(--dock-border)',
        boxShadow: 'var(--dock-shadow)'
      }}
    >
      {items.map((item, index) => {
        if (item.isDivider) {
          return (
            <div
              key={`divider-${index}`}
              className="w-px h-10 mx-1"
              style={{
                background: 'var(--dock-divider)'
              }}
            />
          );
        }

        return <IconContainer mouseX={mouseX} key={item.title} {...item} />;
      })}
    </motion.div>
  );
};

function IconContainer({
  mouseX,
  title,
  icon,
  href,
}: {
  mouseX: MotionValue;
  title: string;
  icon: React.ReactNode;
  href: string;
}) {
  // ✅ FIX: Changed 'let' to 'const'
  const ref = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const [hovered, setHovered] = useState(false);

  const isExternal = href.startsWith('http') || href.startsWith('/resume');
  const isActive = !isExternal && pathname === href;

  // ✅ FIX: Changed 'let' to 'const'
  const distance = useTransform(mouseX, (val) => {
    // ✅ FIX: Changed 'let' to 'const'
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  // ✅ FIX: Changed all 'let' to 'const'
  const widthTransform = useTransform(distance, [-150, 0, 150], [40, 80, 40]);
  const heightTransform = useTransform(distance, [-150, 0, 150], [40, 80, 40]);
  const widthTransformIcon = useTransform(distance, [-150, 0, 150], [20, 40, 20]);
  const heightTransformIcon = useTransform(distance, [-150, 0, 150], [20, 40, 20]);

  const width = useSpring(widthTransform, { mass: 0.1, stiffness: 150, damping: 12 });
  const height = useSpring(heightTransform, { mass: 0.1, stiffness: 150, damping: 12 });
  const widthIcon = useSpring(widthTransformIcon, { mass: 0.1, stiffness: 150, damping: 12 });
  const heightIcon = useSpring(heightTransformIcon, { mass: 0.1, stiffness: 150, damping: 12 });

  const iconContent = (
    <motion.div
      ref={ref}
      style={{ width, height }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative flex aspect-square items-center justify-center rounded-full"
    >
      <div
        className="absolute inset-0 rounded-full transition-all duration-300"
        style={{
          background: hovered ? 'var(--dock-item-hover-bg)' : 'var(--dock-item-bg)',
          backdropFilter: 'blur(20px) saturate(180%)',
          WebkitBackdropFilter: 'blur(20px) saturate(180%)',
          border: hovered
            ? '1px solid var(--dock-item-hover-border)'
            : '1px solid var(--dock-item-border)',
          boxShadow: hovered
            ? 'var(--dock-item-hover-shadow)'
            : 'var(--dock-item-shadow)'
        }}
      />
      {/* Tooltip */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, y: 10, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: 2, x: "-50%" }}
            className="absolute -top-8 left-1/2 w-fit rounded-xl px-3 py-1.5 text-xs whitespace-pre z-50"
            style={{
              background: 'var(--dock-item-bg)',
              backdropFilter: 'blur(15px) saturate(150%)',
              WebkitBackdropFilter: 'blur(15px) saturate(150%)',
              border: '1px solid var(--dock-item-border)',
              boxShadow: 'var(--dock-item-shadow)',
              color: 'var(--dock-text)'
            }}
          >
            {title}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Icon */}
      <motion.div
        style={{
          width: widthIcon,
          height: heightIcon,
        }}
        className="flex items-center justify-center"
      >
        <div
          className="transition-colors duration-300"
          style={{
            color: hovered ? 'var(--accent)' : 'var(--dock-text)',
            filter: hovered ? 'drop-shadow(0 0 8px var(--accent))' : 'none'
          }}
        >
          {icon}
        </div>
      </motion.div>

      {/* Active indicator dot */}
      {isActive && (
        <div
          className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full transition-all duration-300"
          style={{
            backgroundColor: hovered ? 'var(--accent)' : 'var(--dock-text)',
            opacity: hovered ? 1 : 0.4,
            boxShadow: hovered ? '0 0 8px var(--accent)' : 'none'
          }}
        />
      )}
    </motion.div>
  );

  return isExternal ? (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
    >
      {iconContent}
    </a>
  ) : (
    <Link href={href}>
      {iconContent}
    </Link>
  );
}