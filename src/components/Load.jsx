/**
 * @file Load.jsx
 * @module Load
 * @description Loading component for displaying a progress bar.
 * @author Elizabeth Minty
 */

import { Progress } from "@/components/ui/progress";
import { useEffect, useState } from "react";

/**
 * Loading component for displaying a progress bar.
 * @returns {JSX.Element} Loading component JSX
 */
export default function Loading() {
  const [progress, setProgress] = useState(13);

  useEffect(() => {
    // Simulate loading progress with a setTimeout
    const timer = setTimeout(() => setProgress(66), 1000);
    return () => clearTimeout(timer); // Cleanup function to clear timeout
  }, []);

  return <Progress value={progress} className="w-[60%]" />;
}
