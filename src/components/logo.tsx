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
        <path d="M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z" />
        <path d="M12 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10z" />
        <path d="M12 12c-3.333 3.333-5 5-5 5a5 5 0 0 0 10 0s-1.667-1.667-5-5z" />
        <path d="M7 17c3.333-3.333 5-5 5-5" />
      </svg>
      <span className="text-lg font-bold">Carbon Nexus</span>
    </div>
  );
}
