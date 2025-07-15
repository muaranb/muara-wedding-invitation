'use client';

import { Button } from '@/components/ui/button';
import { Volume2, VolumeOff } from 'lucide-react';
import { useRef, useState } from 'react';

export default function ButtonPlayMusic() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isMuted, setIsMuted] = useState(false);

  const toggleMute = () => {
    const audio = audioRef.current;
    if (audio) {
      audio.muted = !audio.muted;
      setIsMuted(audio.muted);
    }
  };

  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 flex justify-center">
      <div className='min-w-[440px] flex justify-end pt-4 pe-4'>
        <Button variant="default" size="icon" className="size-8 rounded-full" onClick={toggleMute}>
          {isMuted ? <VolumeOff /> : <Volume2 />}
        </Button>
      </div>   

      <audio ref={audioRef} src="/songs/I_Still_Love_You.mp3" loop autoPlay />
    </div>
  );
}
