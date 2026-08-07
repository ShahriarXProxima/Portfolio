import { useEffect, useRef, useMemo, useState } from 'react';


interface ShimmerBackgroundProps {
  isDark: boolean;
}

// Target ~30fps instead of uncapped 60fps for background effect
const FRAME_INTERVAL = 1000 / 30;

export default function ShimmerBackground({ isDark }: ShimmerBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRefBright = useRef<HTMLCanvasElement>(null);
  const [isClient, setIsClient] = useState(false);
  const mousePosRef = useRef({ x: -1000, y: -1000 });
  const animationFrameRef = useRef<number>();

  // Grid configuration
  const size = 1.5;
  const gap = 28;
  const speed = 15;

  useEffect(() => {
    setIsClient(true);
    const handleMouseMove = (e: MouseEvent) => {
      mousePosRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);


  useEffect(() => {
    if (!isClient) return;
    const container = containerRef.current;
    const canvasBright = canvasRefBright.current;
    if (!container || !canvasBright) return;

    const ctxBright = canvasBright.getContext("2d");
    if (!ctxBright) return;

    // Pseudo-random opacity function so dots don't flicker on redraw
    const getOpacity = (x: number, y: number) => {
      return Math.abs(Math.sin(x * 12.9898 + y * 78.233)) * 1.0;
    };

    let interpolatedX = -1000;
    let interpolatedY = -1000;
    let lastFrameTime = 0;



    const interactionRadius = 150;
    const interactionRadiusSq = interactionRadius * interactionRadius;

    const drawShapes = (timestamp: number) => {
      // Throttle to ~30fps
      const delta = timestamp - lastFrameTime;
      if (delta < FRAME_INTERVAL) {
        animationFrameRef.current = requestAnimationFrame(drawShapes);
        return;
      }
      lastFrameTime = timestamp - (delta % FRAME_INTERVAL);

      const targetMx = mousePosRef.current.x;
      const targetMy = mousePosRef.current.y;

      if (interpolatedX === -1000) {
        interpolatedX = targetMx;
        interpolatedY = targetMy;
      } else {
        interpolatedX += (targetMx - interpolatedX) * 0.1;
        interpolatedY += (targetMy - interpolatedY) * 0.1;
      }

      // Update CSS variables for the radial masks (zero React re-renders)
      container.style.setProperty('--mouse-x', `${interpolatedX}px`);
      container.style.setProperty('--mouse-y', `${interpolatedY}px`);



      // --- Bright layer: only draw dots in interaction zone ---
      ctxBright.clearRect(0, 0, canvasBright.width, canvasBright.height);
      ctxBright.fillStyle = isDark ? "#ffffff" : "#000000";

      for (let i = 0; i < cachedPoints.length; i++) {
        const { x, y, opacity } = cachedPoints[i];

        // Cheap bounding-box pre-check
        const dx = x - interpolatedX;
        const dy = y - interpolatedY;
        const distSq = dx * dx + dy * dy;

        // Only draw bright dots within a reasonable range of the spotlight
        // (the spotlight radial gradient handles fade, but we skip distant dots entirely)
        if (distSq > 640000) continue; // 800px radius squared

        let drawX = x;
        let drawY = y;
        let drawSize = size;

        if (distSq < interactionRadiusSq) {
          const dist = Math.sqrt(distSq);
          const force = (interactionRadius - dist) / interactionRadius;
          drawX += (dx / dist) * force * 15;
          drawY += (dy / dist) * force * 15;
          drawSize += force * 1.5;
        }

        const brightOpacity = isDark ? opacity * 0.8 : opacity * 1.0 + 0.3;
        ctxBright.globalAlpha = Math.min(1, brightOpacity);
        ctxBright.fillRect(drawX, drawY, drawSize, drawSize);
      }

      animationFrameRef.current = requestAnimationFrame(drawShapes);
    };

    let cachedPoints: { x: number; y: number; opacity: number }[] = [];

    const resizeCanvas = () => {
      canvasBright.width = container.offsetWidth;
      canvasBright.height = container.offsetHeight;
      
      cachedPoints = [];
      for (let y = 0; y < canvasBright.height; y += size + gap) {
        for (let x = 0; x < canvasBright.width; x += size + gap) {
          cachedPoints.push({ x, y, opacity: getOpacity(x, y) });
        }
      }
    };

    resizeCanvas();

    // Start animation loop
    if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    animationFrameRef.current = requestAnimationFrame(drawShapes);

    const resizeObserver = new ResizeObserver(() => {
      resizeCanvas();
    });

    resizeObserver.observe(container);
    return () => {
      resizeObserver.disconnect();
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, [size, gap, isDark, isClient]);

  if (!isClient) {
    return <div className="fixed inset-0 z-50 pointer-events-none w-full h-full" />;
  }

  // Mouse spotlight mask for bright foreground using CSS variables
  const spotlightStyle = {
    maskImage: `radial-gradient(800px circle at var(--mouse-x, -1000px) var(--mouse-y, -1000px), black 0%, transparent 100%)`,
    WebkitMaskImage: `radial-gradient(800px circle at var(--mouse-x, -1000px) var(--mouse-y, -1000px), black 0%, transparent 100%)`,
  };

  return (
    <div ref={containerRef} className="fixed inset-0 z-50 pointer-events-none w-full h-full overflow-hidden transition-colors duration-500">
      {/* Bright interactive spotlight grid */}
      <canvas ref={canvasRefBright} style={{ ...spotlightStyle, width: "100%", height: "100%", position: "absolute" }} />

      {/* Soft gradient glow on the background itself */}
      <div
        className="absolute inset-0 z-0 transition-opacity duration-300 pointer-events-none"
        style={{
          background: isDark
            ? `radial-gradient(1000px circle at var(--mouse-x, -1000px) var(--mouse-y, -1000px), rgba(255,255,255,0.03), transparent 60%)`
            : `radial-gradient(1000px circle at var(--mouse-x, -1000px) var(--mouse-y, -1000px), rgba(0,0,0,0.03), transparent 60%)`
        }}
      />
    </div>
  );
}
