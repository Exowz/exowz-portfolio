import { cn } from "@/lib/utils";
import { IconLayoutNavbarCollapse } from "@tabler/icons-react";
import {
  AnimatePresence,
  MotionValue,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react";

import { useRef, useState } from "react";
import { useTheme } from "next-themes";
import { usePathname } from "next/navigation";

export type DockItem = {
  title: string;
  icon: React.ReactNode;
  href: string;
  isDivider?: boolean;
  color?: string; // Color for glow effect
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
  const { theme } = useTheme();

  const getItemStyle = (isHovered = false) => {
    if (theme === 'dark') {
      return {
        background: isHovered ? 'rgba(26, 26, 26, 0.8)' : 'rgba(26, 26, 26, 0.6)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        border: isHovered ? '1px solid rgba(100, 181, 246, 0.5)' : '1px solid rgba(255, 255, 255, 0.15)',
        boxShadow: isHovered
          ? '0 4px 16px rgba(100, 181, 246, 0.3), 0 0 20px rgba(100, 181, 246, 0.2)'
          : '0 2px 8px rgba(0, 0, 0, 0.3)',
      };
    }
    return {
      background: isHovered ? 'rgba(255, 255, 255, 0.4)' : 'rgba(255, 255, 255, 0.25)',
      backdropFilter: 'blur(10px)',
      WebkitBackdropFilter: 'blur(10px)',
      border: isHovered ? '1px solid rgba(100, 181, 246, 0.4)' : '1px solid rgba(0, 0, 0, 0.08)',
      boxShadow: isHovered
        ? '0 4px 16px rgba(100, 181, 246, 0.25), 0 0 20px rgba(100, 181, 246, 0.15)'
        : '0 2px 8px rgba(0, 0, 0, 0.1)',
    };
  };

  const getDividerGradient = () => {
    if (theme === 'dark') {
      return 'linear-gradient(to right, transparent, rgba(255, 255, 255, 0.2) 20%, rgba(255, 255, 255, 0.2) 80%, transparent)';
    }
    return 'linear-gradient(to right, transparent, rgba(0, 0, 0, 0.15) 20%, rgba(0, 0, 0, 0.15) 80%, transparent)';
  };

  return (
    <div className={cn("relative block md:hidden", className)}>
      <AnimatePresence>
        {open && (
          <motion.div
            layoutId="nav"
            className="absolute inset-x-0 bottom-full mb-2 flex flex-col gap-2"
          >
            {items.map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 10 }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                  y: 10,
                  transition: {
                    delay: idx * 0.05,
                  },
                }}
                transition={{ delay: (items.length - 1 - idx) * 0.05 }}
              >
                {item.isDivider ? (
                  <div
                    style={{
                      height: '1px',
                      width: '40px',
                      background: getDividerGradient(),
                    }}
                  />
                ) : (
                  <a
                    href={item.href}
                    key={item.title}
                    className="flex h-10 w-10 items-center justify-center rounded-2xl transition-all duration-300 hover:scale-105"
                    style={getItemStyle()}
                    target={item.href.startsWith('http') ? '_blank' : undefined}
                    rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  >
                    <div className={`h-4 w-4 ${theme === 'dark' ? 'text-white' : 'text-neutral-700'}`}>{item.icon}</div>
                  </a>
                )}
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
      <button
        onClick={() => setOpen(!open)}
        className="flex h-10 w-10 items-center justify-center rounded-2xl transition-all duration-300 hover:scale-105"
        style={getItemStyle()}
      >
        <IconLayoutNavbarCollapse className={`h-5 w-5 ${theme === 'dark' ? 'text-white' : 'text-neutral-700'}`} />
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
  let mouseX = useMotionValue(Infinity);
  const { theme } = useTheme();

  const getDockStyle = () => {
    if (theme === 'dark') {
      return {
        background: 'rgba(26, 26, 26, 0.7)',
        backdropFilter: 'blur(20px) saturate(180%)',
        WebkitBackdropFilter: 'blur(20px) saturate(180%)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.5)',
        overflow: 'visible' as const,
      };
    }
    return {
      background: 'rgba(255, 255, 255, 0.15)',
      backdropFilter: 'blur(20px) saturate(180%)',
      WebkitBackdropFilter: 'blur(20px) saturate(180%)',
      border: '1px solid rgba(0, 0, 0, 0.1)',
      boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
      overflow: 'visible' as const,
    };
  };

  const getDividerGradient = () => {
    if (theme === 'dark') {
      return 'linear-gradient(to bottom, transparent, rgba(255, 255, 255, 0.2) 20%, rgba(255, 255, 255, 0.2) 80%, transparent)';
    }
    return 'linear-gradient(to bottom, transparent, rgba(0, 0, 0, 0.15) 20%, rgba(0, 0, 0, 0.15) 80%, transparent)';
  };

  return (
    <motion.div
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className={cn(
        "mx-auto hidden h-16 items-end gap-4 rounded-2xl px-4 pb-3 md:flex transition-all duration-300",
        className,
      )}
      style={getDockStyle()}
    >
      {items.map((item, idx) =>
        item.isDivider ? (
          <div
            key={`divider-${idx}`}
            className="mb-2"
            style={{
              width: '1px',
              height: '32px',
              background: getDividerGradient(),
            }}
          />
        ) : (
          <IconContainer mouseX={mouseX} key={item.title} {...item} />
        )
      )}
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
  let ref = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  const pathname = usePathname();

  // Check if this icon is active (current page)
  // For external links or resume, never show active
  const isExternal = href.startsWith('http') || href.startsWith('/resume');

  // Exact match for current pathname
  const isActive = !isExternal && pathname === href;

  let distance = useTransform(mouseX, (val) => {
    let bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };

    return val - bounds.x - bounds.width / 2;
  });

  let widthTransform = useTransform(distance, [-150, 0, 150], [40, 80, 40]);
  let heightTransform = useTransform(distance, [-150, 0, 150], [40, 80, 40]);

  let widthTransformIcon = useTransform(distance, [-150, 0, 150], [20, 40, 20]);
  let heightTransformIcon = useTransform(
    distance,
    [-150, 0, 150],
    [20, 40, 20],
  );

  let width = useSpring(widthTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });
  let height = useSpring(heightTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  let widthIcon = useSpring(widthTransformIcon, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });
  let heightIcon = useSpring(heightTransformIcon, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  const [hovered, setHovered] = useState(false);

  const getIconBackgroundStyle = () => {
    if (theme === 'dark') {
      return {
        background: hovered ? 'rgba(26, 26, 26, 0.8)' : 'rgba(26, 26, 26, 0.6)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        border: hovered ? '1px solid rgba(100, 181, 246, 0.5)' : '1px solid rgba(255, 255, 255, 0.15)',
        boxShadow: hovered
          ? '0 4px 16px rgba(100, 181, 246, 0.3), 0 0 20px rgba(100, 181, 246, 0.2)'
          : '0 2px 8px rgba(0, 0, 0, 0.3)',
      };
    }
    return {
      background: hovered ? 'rgba(255, 255, 255, 0.4)' : 'rgba(255, 255, 255, 0.25)',
      backdropFilter: 'blur(10px)',
      WebkitBackdropFilter: 'blur(10px)',
      border: hovered ? '1px solid rgba(100, 181, 246, 0.4)' : '1px solid rgba(0, 0, 0, 0.08)',
      boxShadow: hovered
        ? '0 4px 16px rgba(100, 181, 246, 0.25), 0 0 20px rgba(100, 181, 246, 0.15)'
        : '0 2px 8px rgba(0, 0, 0, 0.1)',
    };
  };

  const getTooltipStyle = () => {
    if (theme === 'dark') {
      return {
        background: 'rgba(26, 26, 26, 0.6)',
        backdropFilter: 'blur(15px) saturate(150%)',
        WebkitBackdropFilter: 'blur(15px) saturate(150%)',
        border: '1px solid rgba(255, 255, 255, 0.12)',
        boxShadow: '0 4px 16px rgba(0, 0, 0, 0.4)',
      };
    }
    return {
      background: 'rgba(255, 255, 255, 0.2)',
      backdropFilter: 'blur(15px) saturate(150%)',
      WebkitBackdropFilter: 'blur(15px) saturate(150%)',
      border: '1px solid rgba(0, 0, 0, 0.08)',
      boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08)',
    };
  };

  const getActiveIndicatorColor = () => {
    // If hovered, the color is always the blue glow color (#64b5f6)
    if (hovered) return '#64b5f6';

    // If not hovered, use theme-specific subtle color
    if (theme === 'dark') {
      return 'rgba(255, 255, 255, 0.4)'; // Light dot for dark theme
    }
    return 'rgba(0, 0, 0, 0.4)'; // Dark dot for light theme
  };

  return (
    <a
      href={href}
      target={href.startsWith('http') ? '_blank' : undefined}
      rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
    >
      <motion.div
        ref={ref}
        style={{ width, height }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="relative flex aspect-square items-center justify-center rounded-full"
      >
        <div
          className="absolute inset-0 rounded-full transition-all duration-300"
          style={getIconBackgroundStyle()}
        />
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0, y: 10, x: "-50%" }}
              animate={{ opacity: 1, y: 0, x: "-50%" }}
              exit={{ opacity: 0, y: 2, x: "-50%" }}
              className={`absolute -top-8 left-1/2 w-fit whitespace-pre text-xs z-50 px-3 py-1.5 rounded-xl ${theme === 'dark' ? 'text-white' : 'text-neutral-700'}`}
              style={getTooltipStyle()}
            >
              {title}
            </motion.div>
          )}
        </AnimatePresence>
        <motion.div
          style={{
            width: widthIcon,
            height: heightIcon,
          }}
          className="relative z-10 flex items-center justify-center"
        >
          <div
            className={`transition-all duration-300 ${theme === 'dark' ? 'text-white' : 'text-neutral-700'}`}
            style={{
              filter: hovered ? 'drop-shadow(0 0 8px #64b5f6)' : 'none',
            }}
          >
            {icon}
          </div>
        </motion.div>
        {isActive && (
          <div
            className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full transition-all duration-300"
            style={{
              // FIX APPLIED HERE: Using getActiveIndicatorColor for theme consistency
              backgroundColor: getActiveIndicatorColor(),
              boxShadow: hovered ? '0 0 8px #64b5f6' : 'none',
            }}
          />
        )}
      </motion.div>
    </a>
  );
}