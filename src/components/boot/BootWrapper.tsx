"use client";

import { useState, useEffect } from "react";
import StartSequence from "@/components/boot/StartSequence";

interface BootWrapperProps {
  children: React.ReactNode;
}

const BootWrapper: React.FC<BootWrapperProps> = ({ children }) => {
  const [bootComplete, setBootComplete] = useState<boolean | null>(null);

  useEffect(() => {
    // Check if user has already seen the boot sequence
    const hasSeenBoot = localStorage.getItem("hasSeenBoot");
    
    if (hasSeenBoot === "true") {
      setBootComplete(true);
    } else {
      setBootComplete(false);
    }
  }, []);

  const handleBootComplete = () => {
    // Mark boot sequence as seen
    localStorage.setItem("hasSeenBoot", "true");
    setBootComplete(true);
  };

  // Show nothing while checking localStorage (prevents flash)
  if (bootComplete === null) {
    return <div className="fixed inset-0 bg-black" />;
  }

  // Show boot sequence if not completed
  if (!bootComplete) {
    return <StartSequence onComplete={handleBootComplete} />;
  }

  // Show the actual portfolio content
  return <>{children}</>;
};

export default BootWrapper;