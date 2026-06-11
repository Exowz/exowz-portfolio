"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import PressStart from "@/components/boot/PressStart";
import BiosScreen from "@/components/boot/BootSequence";
import CountUp from "@/components/boot/CountUp";

// Lazy-load TegakiText so the Tegaki runtime + parisienne font bundle (~260KB)
// stay out of the initial JS and load during the boot instead.
const TegakiText = dynamic(() => import("@/components/boot/TegakiText"), { ssr: false });

interface DesktopStartSequenceProps {
  onComplete: () => void;
}

const DesktopStartSequence: React.FC<DesktopStartSequenceProps> = ({ onComplete }) => {
  const [step, setStep] = useState<"start" | "boot" | "countup" | "wait" | "varatext">("start");
  const [showGreeting, setShowGreeting] = useState(false);

  useEffect(() => {
    if (step === "countup") {
      const timeout = setTimeout(() => setStep("wait"), 7000);
      return () => clearTimeout(timeout);
    }
  }, [step]);

  useEffect(() => {
    if (step === "wait") {
      const timeout = setTimeout(() => setStep("varatext"), 5000);
      return () => clearTimeout(timeout);
    }
  }, [step]);

  useEffect(() => {
    if (step === "varatext") {
      const fadeInTimeout = setTimeout(() => setShowGreeting(true), 500);
      return () => clearTimeout(fadeInTimeout);
    }
  }, [step]);

  return (
    <div className="relative">
      {step === "start" && <PressStart onStart={() => setStep("boot")} />}
      {step === "boot" && <BiosScreen onComplete={() => setStep("countup")} />}
      {step === "countup" && <CountUp to={100} duration={3} />}
      {step === "wait" && <div className="fixed inset-0 bg-black"></div>}
      {step === "varatext" && (
        <>
          {!showGreeting && <div className="fixed inset-0 bg-black transition-opacity duration-500"></div>}
          <div className={`transition-opacity duration-1000 ${showGreeting ? "opacity-100" : "opacity-0"}`}>
            <TegakiText mode="loop" onComplete={onComplete} />
          </div>
        </>
      )}
    </div>
  );
};

export default DesktopStartSequence;
