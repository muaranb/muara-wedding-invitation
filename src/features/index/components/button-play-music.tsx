'use client';

import { Button } from '@/components/ui/button';
import { useTabVisibility } from '@/hooks/useTabVisibility';
import { RootState } from '@/redux-store/store';
import { Volume2, VolumeOff } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';

export default function ButtonPlayMusic() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isMuted, setMuted] = useState(true);
  const isOpen = useSelector((state: RootState) => state.initial.isInvitationOpen);

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
      setMuted(audio.muted);
    }
  };

  // 🎵 Auto play ketika undangan dibuka
  useEffect(() => {
    if (isOpen && audioRef.current) {
      audioRef.current.muted = false;
      setMuted(false);
      audioRef.current.play().catch(() => {
        // Safari/iOS kadang butuh interaksi user → fallback ke tombol manual
        setMuted(true);
      });
    }
  }, [isOpen]);

  return (
    <>
      {isOpen && (
        <Button
          variant="default"
          size="icon"
          className="fixed size-8 rounded-full top-4 right-4 z-10"
          onClick={toggleMute}
        >
          {isMuted ? <VolumeOff /> : <Volume2 />}
        </Button>
      )}

      <audio ref={audioRef} src="/songs/I_Still_Love_You.mp3" loop muted />
    </>
  );
}
