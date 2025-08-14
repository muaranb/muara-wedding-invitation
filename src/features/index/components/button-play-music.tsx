'use client';

import { Button } from '@/components/ui/button';
import { useTabVisibility } from '@/hooks/useTabVisibility';
import { Volume2, VolumeOff } from 'lucide-react';
import { useRef, useState } from 'react';

export default function ButtonPlayMusic() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isMuted, setIsMuted] = useState(false);

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

  return (
    <>
      <Button variant="default" size="icon" className="fixed size-8 rounded-full top-4 right-4 z-10" onClick={toggleMute}>
        {isMuted ? <VolumeOff /> : <Volume2 />}
      </Button>

      <audio ref={audioRef} src="/songs/I_Still_Love_You.mp3" loop autoPlay />
    </>
  );
}
