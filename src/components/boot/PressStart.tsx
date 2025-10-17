import { useEffect } from 'react';
import { motion } from 'framer-motion';
import localFont from 'next/font/local';

interface PressStartProps {
  onStart: () => void;
}

const ArrayFont = localFont({
  src: '../../../public/fonts/Array-Bold.woff2',
});

const PressStart: React.FC<PressStartProps> = ({ onStart }) => {
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key) {
        onStart();
      }
    };

    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [onStart]);

  return (
    <div className={`${ArrayFont.className} flex flex-col items-center justify-center min-h-screen bg-black text-white`}>
      <motion.div
        className="text-2xl cursor-pointer blink"
        onClick={onStart}
      >
        Press Start to Continue
      </motion.div>
    </div>
  );
};

export default PressStart;