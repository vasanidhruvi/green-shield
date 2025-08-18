import { Leaf } from 'lucide-react';

export function Logo() {
  return (
    <div className="flex items-center gap-2">
       <svg
        className="h-7 w-7 text-primary"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="M9.5 9.5c.94-1 2.5-1.5 3.5-1.5 2.5 0 4.5 2 4.5 4.5c0 1.93-1.18 3.57-2.88 4.29" />
        <path d="M14.5 14.5c-.94 1-2.5 1.5-3.5 1.5-2.5 0-4.5-2-4.5-4.5 0-1.93 1.18-3.57 2.88-4.29" />
      </svg>
      <span className="text-lg font-bold">Green Shield</span>
    </div>
  );
}
