"use client";

import { useState, useEffect } from "react";
import PressStart from "@/components/boot/PressStart";
import BiosScreen from "@/components/boot/BootSequence";
import CountUp from "@/components/boot/CountUp";
import VaraText from "@/components/boot/VaraText";

interface StartSequenceProps {
  onComplete: () => void;
}

const StartSequence: React.FC<StartSequenceProps> = ({ onComplete }) => {
  const [step, setStep] = useState<"start" | "boot" | "countup" | "wait" | "varatext">("start");
  const [showVaraText, setShowVaraText] = useState(false);

  useEffect(() => {
    if (step === "countup") {
      const timeout = setTimeout(() => {
        setStep("wait");
      }, 7000);
      return () => clearTimeout(timeout);
    }
  }, [step]);

  useEffect(() => {
    if (step === "wait") {
      const timeout = setTimeout(() => {
        setStep("varatext");
      }, 5000);
      return () => clearTimeout(timeout);
    }
  }, [step]);

  useEffect(() => {
    if (step === "varatext") {
      const fadeInTimeout = setTimeout(() => {
        setShowVaraText(true);
      }, 500);
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
          {!showVaraText && <div className="fixed inset-0 bg-black transition-opacity duration-500"></div>}
          <div className={`transition-opacity duration-1000 ${showVaraText ? "opacity-100" : "opacity-0"}`}>
            <VaraText onComplete={onComplete} />
          </div>
        </>
      )}
    </div>
  );
};

export default StartSequence;