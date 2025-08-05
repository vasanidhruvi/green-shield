import { Leaf } from 'lucide-react';

export function Logo() {
  return (
    <div className="flex items-center gap-2">
      <Leaf className="h-6 w-6 text-primary icon-3d" />
      <span className="text-lg font-bold">ClimateSync</span>
    </div>
  );
}
