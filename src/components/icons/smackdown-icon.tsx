import * as React from "react";

export const SmackDownIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <rect width={24} height={24} fill="#003366" rx={4} />
    <text
      x="50%"
      y="50%"
      dy=".3em"
      fill="white"
      textAnchor="middle"
      fontSize={10}
      fontWeight="bold"
      fontFamily="sans-serif"
    >
      SD
    </text>
  </svg>
);
