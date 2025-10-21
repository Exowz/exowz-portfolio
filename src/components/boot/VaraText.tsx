"use client";

import { useEffect, useRef } from "react";
import { IconArrowRight } from "@tabler/icons-react";
import LiquidEther from "@/components/desktop/LiquidEther";

interface VaraTextProps {
  onComplete: () => void;
}

const VaraText: React.FC<VaraTextProps> = ({ onComplete }) => {
  const animationTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isAnimatingRef = useRef(false);
  const wordIndexRef = useRef(0);

  useEffect(() => {
    let mounted = true;
    const words = ["hello", "salut", "hola", "ciao"];

    const animateWord = async () => {
      if (!mounted || isAnimatingRef.current) return;

      isAnimatingRef.current = true;

      const container = document.getElementById("container");
      if (!container) {
        isAnimatingRef.current = false;
        return;
      }

      // Clear container completely
      container.innerHTML = "";
      container.style.opacity = "1";
      container.style.transition = "";

      let fontSize = 72;
      if (window.innerWidth < 700) fontSize = 32;
      else if (window.innerWidth < 1200) fontSize = 56;

      const { default: Vara } = await import("vara");

      // Small delay to ensure container is ready
      await new Promise(resolve => setTimeout(resolve, 50));

      if (!mounted) {
        isAnimatingRef.current = false;
        return;
      }

      const currentWord = words[wordIndexRef.current];

      const vara = new Vara(
        "#container",
        "https://cdn.jsdelivr.net/npm/vara@1.4.0/fonts/Parisienne/Parisienne.json",
        [
          { text: currentWord, y: 150, fromCurrentPosition: { y: false }, duration: 3000 },
        ],
        {
          strokeWidth: 2,
          color: "#FFFFFF",
          fontSize: fontSize,
          textAlign: "center",
        }
      );

      vara.ready(() => {
        if (!mounted) return;

        vara.animationEnd((_i, o) => {
          if (!mounted) return;

          // Fade out current text
          o.container.style.transition = "opacity 1s";
          o.container.style.opacity = "0";

          // Wait for fade out, then prepare next word
          animationTimeoutRef.current = setTimeout(() => {
            if (!mounted) return;

            // Move to next word
            wordIndexRef.current = (wordIndexRef.current + 1) % words.length;

            // Reset animation flag and start next word
            isAnimatingRef.current = false;
            animateWord();
          }, 1500);
        });
      });
    };

    animateWord();

    return () => {
      mounted = false;
      isAnimatingRef.current = false;
      if (animationTimeoutRef.current) {
        clearTimeout(animationTimeoutRef.current);
      }
      const container = document.getElementById("container");
      if (container) {
        container.innerHTML = "";
      }
    };
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