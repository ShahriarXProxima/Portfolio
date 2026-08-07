import { useState, useEffect, useRef, useCallback } from 'react';
import type { ComponentType } from 'react';
import { HoverButton } from './HoverButton';

export function eyesFollowCursor<P extends object>(Component: ComponentType<P>): ComponentType<P> {
  return (props: P) => {
    const ref = useRef<HTMLDivElement>(null);
    const [offset, setOffset] = useState({ x: 0, y: 0 });

    useEffect(() => {
      const handleMove = (e: MouseEvent) => {
        if (!ref.current) return;

        // Get center of pupil container
        const rect = ref.current.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;

        // Vector from pupil center to cursor
        const dx = e.clientX - cx;
        const dy = e.clientY - cy;

        // Limit movement radius
        const distance = Math.min(10, Math.hypot(dx, dy));
        const angle = Math.atan2(dy, dx);

        // Offset position relative to center
        setOffset({
          x: Math.cos(angle) * distance,
          y: Math.sin(angle) * distance,
        });
      };

      window.addEventListener('mousemove', handleMove);
      return () => window.removeEventListener('mousemove', handleMove);
    }, []);

    return (
      <div
        ref={ref}
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          pointerEvents: 'none',
          transform: `translate(${offset.x}px, ${offset.y}px)`,
        }}
      >
        <Component {...props} />
      </div>
    );
  };
}

const Pupil = () => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      width: '1px',
      height: '22px',
      position: 'relative',
      zIndex: 2,
    }}
  >
    <div
      style={{
        position: 'relative',
        width: '16px',
        height: '22px',
        backgroundColor: 'rgb(12, 12, 12)',
        borderRadius: '100%',
        flex: 'none',
      }}
    >
      <div
        style={{
          position: 'absolute',
          bottom: '3px',
          left: 'calc(50% - 1.5px)',
          width: '3px',
          height: '3px',
          backgroundColor: 'rgb(255, 254, 253)',
          borderRadius: '100%',
          zIndex: 1,
        }}
      />
    </div>
  </div>
);

const MovingPupil = eyesFollowCursor(Pupil);

const Eyes = () => (
  <div
    style={{
      width: '56px',
      height: '36px',
      display: 'block',
      overflow: 'visible',
      gap: '0px',
      position: 'absolute',
      borderRadius: '0px 0px 0px 0px',
      top: '-60px',
      left: '50%',
      transform: 'translateX(-50%)',
    }}
  >
    {/* Left Eye */}
    <div style={{ position: 'absolute', top: 0, left: 0, width: '24px', height: '36px' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, width: '24px', height: '36px', backgroundColor: 'rgb(255, 254, 253)', borderRadius: '40px' }} />
      <div style={{ position: 'absolute', top: '7px', bottom: '7px', left: 0, right: 0, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <MovingPupil />
      </div>
    </div>
    
    {/* Right Eye */}
    <div style={{ position: 'absolute', top: 0, right: 0, width: '24px', height: '36px' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, width: '24px', height: '36px', backgroundColor: 'rgb(255, 254, 253)', borderRadius: '40px' }} />
      <div style={{ position: 'absolute', top: '7px', bottom: '7px', left: 0, right: 0, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <MovingPupil />
      </div>
    </div>
  </div>
);

const FIRST_NAME = "Shahriar's ";
const LAST_NAME = 'Studio';
const FULL_NAME = FIRST_NAME + LAST_NAME;
const LOADING_DURATION = 2000; // Total time for loading in ms
const TYPEWRITER_INTERVAL = LOADING_DURATION / FULL_NAME.length;

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [loadCount, setLoadCount] = useState(0);
  const [displayedChars, setDisplayedChars] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [loadingComplete, setLoadingComplete] = useState(false);
  const startTimeRef = useRef<number>(0);
  const rafRef = useRef<number>(0);
  const typewriterRef = useRef<ReturnType<typeof setInterval>>();

  // Smooth loading counter using requestAnimationFrame
  const animateCounter = useCallback((timestamp: number) => {
    if (!startTimeRef.current) startTimeRef.current = timestamp;
    const elapsed = timestamp - startTimeRef.current;
    const progress = Math.min(elapsed / LOADING_DURATION, 1);

    // Ease-out cubic for a satisfying deceleration
    const eased = 1 - Math.pow(1 - progress, 3);
    setLoadCount(Math.floor(eased * 100));

    if (progress < 1) {
      rafRef.current = requestAnimationFrame(animateCounter);
    } else {
      setLoadCount(100);
      setLoadingComplete(true);
    }
  }, []);

  // Start loading animation
  useEffect(() => {
    rafRef.current = requestAnimationFrame(animateCounter);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [animateCounter]);

  // Typewriter effect synced with loading
  useEffect(() => {
    let charIndex = 0;
    typewriterRef.current = setInterval(() => {
      charIndex++;
      setDisplayedChars(charIndex);
      if (charIndex >= FULL_NAME.length) {
        clearInterval(typewriterRef.current);
      }
    }, TYPEWRITER_INTERVAL);

    return () => {
      if (typewriterRef.current) clearInterval(typewriterRef.current);
    };
  }, []);

  const handleWelcomeClick = () => {
    setIsExiting(true);
    // Wait for the exit animation to complete
    setTimeout(() => {
      onComplete();
    }, 1200);
  };

  // Split displayed text into first name and last name portions
  const firstNameDisplay = FULL_NAME.substring(0, Math.min(displayedChars, FIRST_NAME.length));
  const lastNameDisplay = displayedChars > FIRST_NAME.length
    ? FULL_NAME.substring(FIRST_NAME.length, displayedChars)
    : '';

  return (
    <div
      className={`loading-screen ${isExiting ? 'loading-screen--exit' : ''}`}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: '#000000',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'transform 1.2s cubic-bezier(0.76, 0, 0.24, 1)',
        transform: isExiting ? 'translateY(-100%)' : 'translateY(0)',
        willChange: 'transform',
      }}
    >
      {/* Center content: Name + Welcome button */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '32px',
          position: 'relative',
        }}
      >
        <Eyes />
        
        {/* Name with typewriter effect */}
        <div
          className="loading-name"
          style={{
            fontSize: 'clamp(1.5rem, 4.5vw, 3.5rem)',
            letterSpacing: '-0.02em',
            lineHeight: 1,
            color: '#ffffff',
            minHeight: '1.2em',
            userSelect: 'none',
          }}
        >
          <span
            style={{
              fontStyle: 'italic',
              fontWeight: 400,
              fontFamily: "'Playfair Display', Georgia, serif",
            }}
          >
            {firstNameDisplay}
          </span>
          <span
            style={{
              fontStyle: 'normal',
              fontWeight: 800,
              fontFamily: "'Playfair Display', Georgia, serif",
              color: 'gray',
            }}
          >
            {lastNameDisplay}
          </span>
          {/* Blinking cursor */}
          <span
            className="typewriter-cursor"
            style={{
              display: displayedChars < FULL_NAME.length ? 'inline-block' : 'none',
              width: '2px',
              height: '0.85em',
              background: '#ffffff',
              marginLeft: '4px',
              verticalAlign: 'baseline',
              position: 'relative',
              top: '0.05em',
            }}
          />
        </div>

        {/* Welcome button — fades in when loading is complete */}
        <HoverButton
          onClick={handleWelcomeClick}
          disabled={!loadingComplete}
          className={`welcome-btn ${loadingComplete ? 'welcome-btn--float' : ''}`}
          style={{
            background: 'linear-gradient(135deg, #ff6a00 0%, #f75b04 50%, #e04e00 100%)',
            border: 'none',
            outline: 'none',
            color: '#ffffff',
            padding: '14px 44px',
            fontSize: '12px',
            fontFamily: "'Fira Code', monospace",
            fontWeight: 600,
            letterSpacing: '0.15em',
            textTransform: 'uppercase' as const,
            borderRadius: '50px',
            cursor: loadingComplete ? 'pointer' : 'default',
            boxShadow: '0 4px 24px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.15), inset 0 -1px 0 rgba(255,255,255,0.05)',
            transition: 'opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1), letter-spacing 0.4s ease',
            opacity: loadingComplete ? 1 : 0,
            pointerEvents: loadingComplete ? 'auto' as const : 'none' as const,
          }}
        >
          Welcome
        </HoverButton>
      </div>

      {/* Loading counter — bottom right */}
      <div
        style={{
          position: 'absolute',
          bottom: '20px',
          right: '24px',
          fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
          fontSize: '14px',
          fontWeight: 500,
          color: 'rgba(255,255,255,0.5)',
          letterSpacing: '0.05em',
          fontVariantNumeric: 'tabular-nums',
          transition: 'opacity 0.4s ease',
          opacity: loadingComplete ? 0.3 : 0.5,
        }}
      >
        {String(loadCount).padStart(3, '0')}
      </div>
    </div>
  );
}
