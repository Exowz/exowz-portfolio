import React, { useState, useEffect } from 'react';
import useSound from "@/components/hooks/useSound";
import localFont from 'next/font/local';

const takenByVultures = localFont({
  src: '../../../public/fonts/TakenByVultures.otf',
});

const BIOS_TEXT = [
  "Ewan BIOS Version 1.0",
  "Copyright (C) 2025 Ewan Kapoor Ltd.",
  "CPU: Apple M2 Pro (10-core)",
  "Memory Test: 16GB Unified Memory OK",
  "Primary Storage: Apple NVMe SSD 1TB",
  "Display: Retina 3024x1964",
  "Audio: High-Fidelity 6-Speaker System",
  "Thunderbolt 4 / USB 4: 3 Ports Detected",
  "Wi-Fi 6 and Bluetooth 5.3: Enabled",
];

export const useDelayedState = (delay: number) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsVisible(true);
    }, delay);

    return () => clearTimeout(timeout);
  }, [delay]);

  return isVisible;
};

const SystemConfigurationsTable = () => {
  const showPCIDeviceMessage = useDelayedState(2000);
  const showPCIDeviceList = useDelayedState(2500);
  const showBootMessage = useDelayedState(5000);
  const showDMIMessage = useDelayedState(3000);

  return (
  <div className="flex flex-col h-full w-full text-xs md:text-base">
    <div className="text-sm md:text-xl mb-3 md:mb-6 text-center">System Configurations</div>

    <div className="border-2 border-gray-600 mx-auto w-full px-2 md:px-6 py-2 md:py-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-8 border-b border-gray-600 pb-2 md:pb-3">
        <div className="flex justify-between">
          <span>CPU Type :</span>
          <span>Apple M2 Pro</span>
        </div>
        <div className="flex justify-between">
          <span>Base Memory :</span>
          <span>16GB</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-8 border-b border-gray-600 py-2 md:py-3">
        <div className="flex justify-between">
          <span>Co-Processor :</span>
          <span>Installed</span>
        </div>
        <div className="flex justify-between">
          <span>Extended Memory :</span>
          <span>Unified</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-8 py-2 md:py-3">
        <div className="flex justify-between">
          <span>CPU Clock :</span>
          <span>3.49GHz</span>
        </div>
        <div className="flex justify-between">
          <span>Cache Memory :</span>
          <span>16MB</span>
        </div>
      </div>
    </div>

    <div className="border-2 border-gray-600 mx-auto w-full px-2 md:px-6 py-2 md:py-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-8 border-b border-gray-600 pb-2 md:pb-3">
        <div className="flex justify-between">
          <span>Storage Drive :</span>
          <span>Apple NVMe SSD 1TB</span>
        </div>
        <div className="flex justify-between">
          <span>Display Type :</span>
          <span>Retina 3024x1964</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-8 border-b border-gray-600 py-2 md:py-3">
        <div className="flex justify-between">
          <span>Thunderbolt Ports :</span>
          <span>3x USB4 / TB4</span>
        </div>
        <div className="flex justify-between">
          <span>Speakers :</span>
          <span>6-Speaker System</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-8 py-2 md:py-3">
        <div className="flex justify-between">
          <span>HDMI Output :</span>
          <span>1 (4K/8K)</span>
        </div>
        <div className="flex justify-between">
          <span>Bluetooth :</span>
          <span>5.3</span>
        </div>
      </div>
    </div>

    <div className="w-full mx-auto">
      {showPCIDeviceMessage && <div className="text-sm md:text-lg mt-2 md:mt-3 mb-2 md:mb-3">PCI device listing....</div>}
      {showPCIDeviceList && <div className="overflow-x-auto">
      <div className="w-full border-b border-gray-600 pb-1 md:pb-2 mb-2 md:mb-3 min-w-[500px]">
        <div className="grid grid-cols-7 gap-1 md:gap-3 text-left text-xs md:text-base">
          <span>Bus No.</span>
          <span>Device No.</span>
          <span>Func No.</span>
          <span>Vendor ID</span>
          <span>Device ID</span>
          <span>Device Class</span>
          <span>IRQ</span>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1 md:gap-3 text-left py-1 md:py-2 min-w-[500px]">
        <span>0</span>
        <span>7</span>
        <span>1</span>
        <span>APPLE</span>
        <span>3900</span>
        <span>SSD Controller</span>
        <span>14</span>
      </div>
      <div className="grid grid-cols-7 gap-1 md:gap-3 text-left py-1 md:py-2 min-w-[500px]">
        <span>0</span>
        <span>17</span>
        <span>0</span>
        <span>APPLE</span>
        <span>4760</span>
        <span>Thunderbolt</span>
        <span>11</span>
      </div>
      <div className="grid grid-cols-7 gap-1 md:gap-3 text-left py-1 md:py-2 min-w-[500px]">
        <span>0</span>
        <span>21</span>
        <span>2</span>
        <span>APPLE</span>
        <span>5500</span>
        <span>GPU (16-Core)</span>
        <span>10</span>
      </div>
      </div>}
    </div>

    {showDMIMessage && <div className="mt-3 md:mt-6 text-sm md:text-lg">Verifying DMI Pool Data .......</div>}
    {showBootMessage && <div className="text-sm md:text-lg">Booting from portfolio ......</div>}
  </div>
)};
 
const BiosScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [currentText, setCurrentText] = useState<string[]>([]);
  const [currentLine, setCurrentLine] = useState(0);
  const [showTable, setShowTable] = useState(false);
  const [blink, setBlink] = useState(true);

  useSound("/sounds/boot.mp3", true, 0.8);

  useEffect(() => {
    if (currentLine < BIOS_TEXT.length) {
      const timeout = setTimeout(() => {
        setCurrentText([...currentText, BIOS_TEXT[currentLine]]);
        setCurrentLine(currentLine + 1);
      }, 500);
      return () => clearTimeout(timeout);
    } else {
      setTimeout(() => setShowTable(true), 2000);
    }
  }, [currentLine, currentText]);

  useEffect(() => {
    const transitionTimeout = setTimeout(() => {
      onComplete();
    }, 17000);

    return () => clearTimeout(transitionTimeout);
  }, [onComplete]);

  useEffect(() => {
    const interval = setInterval(() => setBlink((prev) => !prev), 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-screen w-screen bg-black text-stone-300 font-mono p-4 md:p-12 flex flex-col justify-start relative overflow-hidden overflow-y-auto">
      {!showTable && (
        <>
          {/* Desktop watermark - top right */}
          <div className={`${takenByVultures.className} hidden md:block text-8xl text-stone-400`}
               style={{
                 position: 'absolute',
                 top: '5.5rem',
                 right: '8.5rem',
                 padding: '0.5rem 0.75rem',
                 transform: 'rotate(-15deg)'
               }}>
            EXOWZ
          </div>
          {/* Mobile watermark - bottom center */}
          <div className={`${takenByVultures.className} md:hidden text-4xl text-stone-400`}
               style={{
                 position: 'absolute',
                 bottom: '4rem',
                 left: '50%',
                 padding: '0.5rem 0.75rem',
                 transform: 'translateX(-50%) rotate(-15deg)'
               }}>
            EXOWZ
          </div>
        </>
      )}

      {!showTable ? (
        <div className="text-base md:text-3xl leading-tight">
          {currentText.map((line, index) => (
            <p key={index} className={`${index === 2 || index === 4 ? "mt-4 md:mt-10" : "mt-1"}`}>
              {line}
            </p>
          ))}
        </div>
      ) : (
        <SystemConfigurationsTable />
      )}

      <p className={`absolute bottom-4 left-4 md:bottom-8 md:left-12 text-base md:text-3xl ${blink ? "opacity-100" : "opacity-0"} transition-opacity`}>
        Press Enter to enter Setup
      </p>
    </div>
  );
};

export default BiosScreen;