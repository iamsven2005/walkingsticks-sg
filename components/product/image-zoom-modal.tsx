'use client';

import { ZoomInIcon, ZoomOutIcon } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

import { Button } from '../ui/button';
import { Dialog, DialogContent } from '../ui/dialog';

type ImageZoomModalProps = {
  isOpen: boolean;
  onClose: () => void;
  image: {
    src: string;
    altText: string;
  };
};

export function ImageZoomModal({ isOpen, onClose, image }: ImageZoomModalProps) {
  const [zoom, setZoom] = useState(100);

  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev + 20, 300));
  };

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(prev - 20, 50));
  };

  const handleReset = () => {
    setZoom(100);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-h-screen max-w-4xl border-0 bg-black/95 p-2 sm:p-4">
        <div className="flex flex-col items-center gap-4">
          {/* Image Container */}
          <div className="relative max-h-[70vh] w-full overflow-auto rounded-lg bg-black">
            <div className="flex items-center justify-center min-h-[400px] w-full">
              <div style={{ transform: `scale(${zoom / 100})`, transformOrigin: 'center center' }}>
                <Image
                  src={image.src}
                  alt={image.altText}
                  width={800}
                  height={800}
                  className="h-auto w-full"
                  priority
                />
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleZoomOut}
              disabled={zoom <= 50}
              aria-label="Zoom out"
            >
              <ZoomOutIcon className="h-4 w-4" />
            </Button>
            <span className="min-w-12 text-center text-sm font-medium text-white">{zoom}%</span>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleZoomIn}
              disabled={zoom >= 300}
              aria-label="Zoom in"
            >
              <ZoomInIcon className="h-4 w-4" />
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleReset}
              className="ml-2"
            >
              Reset
            </Button>
          </div>

          {/* Close Info */}
          <p className="text-xs text-gray-400">Click outside or press ESC to close</p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
