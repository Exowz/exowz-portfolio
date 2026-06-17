'use client';

import { motion } from 'framer-motion';
import { CvBento } from './CvBento';
import { CvSidebar } from './CvSidebar';
import { useTailor } from './useTailor';

export function CvWindow() {
  const tailor = useTailor();

  return (
    <div className="min-h-screen p-4 md:p-8">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mx-auto flex w-full max-w-5xl flex-col gap-6 md:flex-row md:gap-8"
      >
        <CvSidebar />
        <CvBento tailor={tailor} />
      </motion.div>
    </div>
  );
}
