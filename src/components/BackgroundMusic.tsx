import { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import bgmFile from '../../resources/assets/bgm.webm';

export default function BackgroundMusic() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.5;
      audioRef.current.muted = false;
      audioRef.current.play().catch(e => {
        console.log("Autoplay prevented:", e);
        setIsMuted(true);
      });
    }
  }, []);

  const toggleMute = () => {
    if (audioRef.current) {
      const newMuted = !isMuted;
      audioRef.current.muted = newMuted;
      setIsMuted(newMuted);
      if (audioRef.current.paused) {
        audioRef.current.play().catch(e => console.log("Play prevented:", e));
      }
    }
  };

  return (
    <>
      <audio ref={audioRef} src={bgmFile} loop />
      <button
        onClick={toggleMute}
        className="w-12 h-12 md:w-[60px] md:h-[60px] rounded-full bg-black/10 dark:bg-white/10 backdrop-blur-md transition-transform hover:scale-110 flex items-center justify-center border-none shadow-none text-black dark:text-white shrink-0"
        aria-label="Toggle Background Music"
      >
        {isMuted ? <VolumeX className="w-5 h-5 md:w-6 md:h-6" /> : <Volume2 className="w-5 h-5 md:w-6 md:h-6" />}
      </button>
    </>
  );
}
