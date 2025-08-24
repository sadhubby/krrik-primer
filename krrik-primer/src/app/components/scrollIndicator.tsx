'use client';

import { useEffect, useState } from 'react';

export default function ScrollIndicator() {
  const [showScrollIndicator, setShowScrollIndicator] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Show scroll indicator after a brief delay
    const showTimer = setTimeout(() => {
      setShowScrollIndicator(true);
    }, 2000);

    // Hide indicator when user starts scrolling
    const handleScroll = () => {
      setIsVisible(false);
      window.removeEventListener('scroll', handleScroll);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // Cleanup
    return () => {
      clearTimeout(showTimer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  if (!showScrollIndicator || !isVisible) return null;

  return (
    <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
      <div className="flex flex-col items-center">
        <span className="text-white text-sm mb-2 animate-pulse">
          <p>Start reading below</p>
        </span>
        <svg
          className="w-6 h-6 text-white animate-bounce"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </div>
    </div>
  );
}
