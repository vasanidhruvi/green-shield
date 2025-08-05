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
      >
        <path d="M12 2a10 10 0 1 0 10 10" />
        <path d="m12 18-6-6" />
        <path d="m12 12 6-6" />
        <path d="M6 12h12" />
        <path d="M12 2v20" />
      </svg>
      <span className="text-lg font-bold">Carbon Nexus</span>
    </div>
  );
}
