import { useState } from 'react';
import { Package } from 'lucide-react';

interface ItemThumbnailProps {
  src?: string;
  alt: string;
}

export function ItemThumbnail({ src, alt }: ItemThumbnailProps) {
  const [falhou, setFalhou] = useState(false);

  return (
    <div className="h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-gray-100">
      {src && !falhou ? (
        <img src={src} alt={alt} className="h-full w-full object-cover" onError={() => setFalhou(true)} />
      ) : (
        <div data-testid="thumb-placeholder" aria-hidden="true" className="flex h-full w-full items-center justify-center text-gray-300">
          <Package size={24} />
        </div>
      )}
    </div>
  );
}
