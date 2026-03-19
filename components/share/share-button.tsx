'use client';

import { Share2Icon } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

import { Button } from '../ui/button';

type ShareButtonProps = {
  title: string;
  url: string;
  text?: string;
  label?: string;
  className?: string;
};

export function ShareButton({ title, url, text, label = 'Share', className }: ShareButtonProps) {
  const [isSharing, setIsSharing] = useState(false);

  const handleShare = async () => {
    if (isSharing) {
      return;
    }

    try {
      setIsSharing(true);

      if (typeof navigator !== 'undefined' && navigator.share) {
        await navigator.share({
          title,
          text,
          url
        });
        return;
      }

      if (typeof navigator !== 'undefined' && navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(url);
        toast.success('Link copied to clipboard');
        return;
      }

      toast.error('Sharing is not supported on this device');
    } catch (error) {
      // Ignore user-cancelled native share dialogs and only show actionable failures.
      if (!(error instanceof DOMException && error.name === 'AbortError')) {
        toast.error('Unable to share right now');
      }
    } finally {
      setIsSharing(false);
    }
  };

  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      onClick={handleShare}
      disabled={isSharing}
      className={className}
      aria-label={`Share ${title}`}
    >
      <Share2Icon className="mr-2 h-4 w-4" />
      {label}
    </Button>
  );
}
