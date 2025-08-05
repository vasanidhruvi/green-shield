import { Leaf } from 'lucide-react';

export function Logo() {
  return (
    <div className="flex items-center gap-2">
      <Leaf className="h-6 w-6 text-primary" />
      <span className="text-lg font-bold">Carbon Nexus</span>
    </div>
  );
}
