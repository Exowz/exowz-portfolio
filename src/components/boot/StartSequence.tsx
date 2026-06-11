"use client";

import dynamic from "next/dynamic";
import { useIsMobile } from "@/components/hooks/useIsMobile";
import DesktopStartSequence from "@/components/boot/DesktopStartSequence";

const MobileStartSequence = dynamic(
  () => import("@/components/boot/MobileStartSequence"),
  { ssr: false },
);

interface StartSequenceProps {
  onComplete: () => void;
}

const StartSequence: React.FC<StartSequenceProps> = ({ onComplete }) => {
  const isMobile = useIsMobile();

  // Undetermined viewport: render black to avoid flashing the desktop BIOS on mobile.
  if (isMobile === null) {
    return <div className="fixed inset-0 bg-black" />;
  }

  return isMobile ? (
    <MobileStartSequence onComplete={onComplete} />
  ) : (
    <DesktopStartSequence onComplete={onComplete} />
  );
};

export default StartSequence;