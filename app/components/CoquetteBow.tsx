import React from 'react';

interface CoquetteBowProps {
  className?: string;
  width?: number;
  height?: number;
  style?: React.CSSProperties;
}

export default function CoquetteBow({ className = '', width = 36, height = 24, style }: CoquetteBowProps) {
  return (
    <svg width={width} height={height} viewBox="0 0 48 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} style={style} aria-hidden="true">
      <path d="M24 16C18 8 6 6 4 14C2 22 14 24 24 16ZM24 16C30 8 42 6 44 14C46 22 34 24 24 16Z" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="rgba(253, 242, 245, 0.6)" />
      <path d="M24 16C21 22 15 28 10 30M24 16C27 22 33 28 38 30" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <circle cx="24" cy="16" r="3.5" fill="currentColor" />
    </svg>
  );
}