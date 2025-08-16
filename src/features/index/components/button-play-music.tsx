'use client';

import { Button } from '@/components/ui/button';
import { useTabVisibility } from '@/hooks/useTabVisibility';
import { Volume2, VolumeOff } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

export default function ButtonPlayMusic() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isMuted, setIsMuted] = useState(true);

  useTabVisibility(
		() => {
      // On Hide
      const audio = audioRef.current;
      if (audio) {
        audio.muted = true;
      }
		},
		() => {
      // On Show
      const audio = audioRef.current;
      if (audio) {
        audio.muted = isMuted;
      }
		}
	);
  
  const toggleMute = () => {
    const audio = audioRef.current;
    if (audio) {
      audio.muted = !audio.muted;
      setIsMuted(audio.muted);
    }
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // Event listener untuk interaksi pertama
    const enableSound = () => {
      if (audio && audio.muted) {
        audio.muted = false;
        setIsMuted(false);
      }

      // Hanya butuh sekali, jadi remove listener
      document.removeEventListener('click', enableSound);
      document.removeEventListener('touchstart', enableSound);
    };

    document.addEventListener('click', enableSound, { once: true });
    document.addEventListener('touchstart', enableSound, { once: true });

    return () => {
      document.removeEventListener('click', enableSound);
      document.removeEventListener('touchstart', enableSound);
    };
  }, []);

  return (
    <>
      <Button variant="default" size="icon" className="fixed size-8 rounded-full top-4 right-4 z-10" onClick={toggleMute}>
        {isMuted ? <VolumeOff /> : <Volume2 />}
      </Button>

      <audio ref={audioRef} src="/songs/I_Still_Love_You.mp3" loop autoPlay muted />
    </>
  );
}
