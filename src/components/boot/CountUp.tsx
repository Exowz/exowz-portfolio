import { useEffect, useRef } from "react";
import { useInView, useMotionValue, useSpring } from "framer-motion";
import GradientText from "@/components/GradientText";
import LiquidEther from "@/components/desktop/LiquidEther";

interface CountUpProps {
    to: number;
    from?: number;
    direction?: "up" | "down";
    delay?: number;
    duration?: number;
    className?: string;
    startWhen?: boolean;
    separator?: string;
    onStart?: () => void;
}

export default function CountUp({
    to,
    from = 0,
    direction = "up",
    delay = 0,
    duration = 2,
    className = "",
    startWhen = true,
    separator = "",
    onStart,
}: CountUpProps) {
    const ref = useRef<HTMLSpanElement>(null);
    const motionValue = useMotionValue(direction === "down" ? to : from);

    const damping = 20 + 40 * (1 / duration);
    const stiffness = 100 * (1 / duration);

    const springValue = useSpring(motionValue, {
        damping,
        stiffness,
    });

    const isInView = useInView(ref, { once: true, margin: "0px" });

    useEffect(() => {
        if (ref.current) {
            ref.current.textContent = String(direction === "down" ? to : from);
        }
    }, [from, to, direction]);

    useEffect(() => {
        if (isInView && startWhen) {
            if (typeof onStart === "function") {
                onStart();
            }

            const timeoutId = setTimeout(() => {
                motionValue.set(direction === "down" ? from : to);
            }, delay * 1000);

            return () => {
                clearTimeout(timeoutId);
            };
        }
    }, [isInView, startWhen, motionValue, direction, from, to, delay, onStart, duration]);

    useEffect(() => {
        const unsubscribe = springValue.on("change", (latest) => {
            if (ref.current) {
                const options = {
                    useGrouping: !!separator,
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0,
                };

                const formattedNumber = Intl.NumberFormat("en-US", options).format(
                    Number(latest.toFixed(0))
                );

                ref.current.textContent = separator
                    ? formattedNumber.replace(/,/g, separator)
                    : formattedNumber;
            }
        });

        return () => unsubscribe();
    }, [springValue, separator]);

    return (
        <div className="relative h-screen w-screen overflow-hidden">
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
            <div className="relative h-full w-full flex items-center justify-center z-10">
                <GradientText className="text-9xl font-bold">
                    <span ref={ref} />
                </GradientText>
            </div>
        </div>
    );
}