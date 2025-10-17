"use client";

import { useEffect } from "react";
import Vara from "vara";
import { IconArrowRight } from "@tabler/icons-react";
import LiquidEther from "@/components/desktop/LiquidEther";

interface VaraTextProps {
  onComplete: () => void;
}

const VaraText: React.FC<VaraTextProps> = ({ onComplete }) => {
  const startAnimation = () => {
    const container = document.getElementById("container");
    if (!container) return;

    container.innerHTML = "";

    let fontSize = 72;
    if (window.innerWidth < 700) fontSize = 32;
    else if (window.innerWidth < 1200) fontSize = 56;

    const vara = new Vara(
      "#container",
      "https://cdn.jsdelivr.net/npm/vara@1.4.0/fonts/Parisienne/Parisienne.json",
      [
        { text: "hello", y: 150, fromCurrentPosition: { y: false }, duration: 3000 },
        { text: "salut", y: 150, fromCurrentPosition: { y: false }, delay: 3000, duration: 3000 },
        { text: "hola", y: 150, fromCurrentPosition: { y: false }, delay: 3000, duration: 3000 },
        { text: "ciao", y: 150, fromCurrentPosition: { y: false }, delay: 3000, duration: 3000 },
      ],
      {
        strokeWidth: 2,
        color: "#FFFFFF",
        fontSize: fontSize,
        textAlign: "center",
      }
    );

    vara.ready(() => {
      let erase = true;

      vara.animationEnd((i, o) => {
        if (erase) {
          o.container.style.transition = "opacity 1s 1s";
          o.container.style.opacity = "0";
        }

        if (i === 3) {
          setTimeout(() => startAnimation(), 2000);
        }
      });
    });
  };

  useEffect(() => {
    startAnimation();
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* LiquidEther Background */}
      <div className="absolute inset-0 z-0">
        <LiquidEther
          className="absolute inset-0 z-0 pointer-events-none"
          colors={['#1a1a1a', '#2a2a2a', '#64b5f6']}
          autoDemo={true}
          mouseForce={20}
          resolution={0.5}
          cursorSize={100}
        />
      </div>

      {/* Blur overlay */}
      <div className="absolute inset-0 z-[1] backdrop-blur-xl bg-black/50" />

      {/* Content */}
      <div className="relative flex flex-col items-center justify-center h-full z-10">
        <div
          id="container"
          className="vara-container"
          style={{
            width: "95vw",
            maxWidth: "1000px",
            height: "auto",
            whiteSpace: "nowrap",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            overflow: "hidden",
            margin: "0 auto",
          }}
        />
        <button onClick={onComplete} className="mt-10 cursor-pointer hover:opacity-75 transition-opacity duration-200">
          <IconArrowRight className="text-white" size={64} stroke={1.5} />
        </button>
      </div>
    </div>
  );
};

export default VaraText;