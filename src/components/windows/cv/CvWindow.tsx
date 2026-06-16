'use client';

import { motion } from 'framer-motion';
import { CvEducation } from './CvEducation';
import { CvExperience } from './CvExperience';
import { CvProjects } from './CvProjects';
import { CvSidebar } from './CvSidebar';
import { CvSkills } from './CvSkills';
import { CvSummary } from './CvSummary';

export function CvWindow() {
  return (
    <div className="min-h-screen p-4 md:p-8">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mx-auto flex w-full max-w-5xl flex-col gap-8 md:flex-row md:gap-10"
      >
        <CvSidebar />
        <div className="flex-1 space-y-10">
          <CvSummary />
          <CvSkills />
          <CvExperience />
          <CvEducation />
          <CvProjects />
        </div>
      </motion.div>
    </div>
  );
}
