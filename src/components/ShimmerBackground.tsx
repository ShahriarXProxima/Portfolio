import { useEffect, useRef, useMemo, useState } from 'react';

// Perlin noise implementation
const p = new Array(512);
for (let i = 0; i < 256; i++) p[i] = p[i + 256] = Math.floor(Math.random() * 256);

function fade(t: number) { return t * t * t * (t * (t * 6 - 15) + 10); }
function lerp(t: number, a: number, b: number) { return a + t * (b - a); }
function grad(hash: number, x: number, y: number) {
  const h = hash & 15; const u = h < 8 ? x : y; const v = h < 4 ? y : h === 12 || h === 14 ? x : 0;
  return ((h & 1) === 0 ? u : -u) + ((h & 2) === 0 ? v : -v);
}
function noise(x: number, y: number) {
  const X = Math.floor(x) & 255; const Y = Math.floor(y) & 255;
  x -= Math.floor(x); y -= Math.floor(y);
  const u = fade(x); const v = fade(y);
  const A = p[X] + Y, B = p[X + 1] + Y;
  return lerp(v, lerp(u, grad(p[A], x, y), grad(p[B], x - 1, y)),
    lerp(u, grad(p[A + 1], x, y - 1), grad(p[B + 1], x - 1, y - 1)));
}

function generatePerlinNoise(width: number, height: number, cellSize: number) {
  const canvas = document.createElement("canvas");
  canvas.width = width; canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) return canvas;
  const imageData = ctx.createImageData(width, height);
  const data = imageData.data;
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const value = (noise(x / cellSize, y / cellSize) + 1) / 2 * 255;
      const cell = (x + y * width) * 4;
      data[cell] = data[cell + 1] = data[cell + 2] = value;
      data[cell + 3] = 255;
    }
  }
  ctx.putImageData(imageData, 0, 0);
  return canvas;
}

function createSeamlessPerlinNoise(width: number, height: number, cellSize: number) {
  const singleNoise = generatePerlinNoise(width, height, cellSize);
  const canvas = document.createElement("canvas");
  canvas.width = width * 4; canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) return "";

  ctx.drawImage(singleNoise, 0, 0);
  ctx.save();
  ctx.translate(width * 2, 0);
  ctx.scale(-1, 1);
  ctx.drawImage(singleNoise, 0, 0);
  ctx.restore();
  ctx.drawImage(singleNoise, width * 2, 0);
  ctx.save();
  ctx.translate(width * 4, 0);
  ctx.scale(-1, 1);
  ctx.drawImage(singleNoise, 0, 0);
  ctx.restore();

  return canvas.toDataURL();
}

interface ShimmerBackgroundProps {
  isDark: boolean;
}

export default function ShimmerBackground({ isDark }: ShimmerBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasRefBright = useRef<HTMLCanvasElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [isClient, setIsClient] = useState(false);
  const mousePosRef = useRef({ x: -1000, y: -1000 });
  const animationFrameRef = useRef<number>();

  // Grid configuration
  const size = 1.5;
  const gap = 28;
  const speed = 15;
  const colors = isDark ? ["rgb(255, 255, 255)"] : ["rgb(0, 0, 0)"];

  useEffect(() => {
    setIsClient(true);
    const handleMouseMove = (e: MouseEvent) => {
      mousePosRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const perlinNoiseDataUrl = useMemo(() => {
    const { height, width } = dimensions;
    if (!isClient || height === 0 || width === 0) return "";
    const cellSize = Math.max(30, size * 5);
    return createSeamlessPerlinNoise(width, height, cellSize);
  }, [size, isClient, dimensions]);

  const animationDuration = useMemo(() => {
    const { height, width } = dimensions;
    if (height !== 0 && width !== 0) {
      const maxSpeed = 100;
      const baseValue = width * 2250;
      const powerFactor = Math.log(baseValue / (baseValue / 100)) / Math.log(maxSpeed);
      return Math.round(baseValue / Math.pow(speed, powerFactor));
    }
    return 10000;
  }, [speed, size, dimensions]);

  useEffect(() => {
    if (!isClient) return;
    const container = containerRef.current;
    const canvas = canvasRef.current;
    const canvasBright = canvasRefBright.current;
    if (!container || !canvas || !canvasBright) return;

    const ctx = canvas.getContext("2d");
    const ctxBright = canvasBright.getContext("2d");
    if (!ctx || !ctxBright) return;

    // Pseudo-random opacity function so dots don't flicker on redraw
    const getOpacity = (x: number, y: number) => {
      return Math.abs(Math.sin(x * 12.9898 + y * 78.233)) * 1.0;
    };

    let interpolatedX = -1000;
    let interpolatedY = -1000;

    const drawShapes = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctxBright.clearRect(0, 0, canvasBright.width, canvasBright.height);

      const colorString = colors[0];
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

      ctx.fillStyle = isDark ? "#ffffff" : "#000000";
      ctxBright.fillStyle = isDark ? "#ffffff" : "#000000";

      for (let i = 0; i < cachedPoints.length; i++) {
        const { x, y, opacity } = cachedPoints[i];

          // Calculate distance to smoothly interpolated mouse for buttery interaction
          const dx = x - interpolatedX;
          const dy = y - interpolatedY;
          const dist = Math.sqrt(dx * dx + dy * dy);

          // Repel dots and increase scale slightly if near mouse
          let drawX = x;
          let drawY = y;
          let drawSize = size;

          const interactionRadius = 150;
          if (dist < interactionRadius) {
            const force = (interactionRadius - dist) / interactionRadius;
            drawX += (dx / dist) * force * 15; // Push away up to 15px
            drawY += (dy / dist) * force * 15;
            drawSize += force * 1.5; // Grow slightly
          }

          // Draw dim background dot
          const dimOpacity = opacity * (isDark ? 0.25 : 0.35);
          ctx.globalAlpha = dimOpacity;
          ctx.beginPath();
          ctx.rect(drawX, drawY, drawSize, drawSize);
          ctx.fill();

          // Draw bright foreground dot
          const brightOpacity = isDark ? opacity * 0.8 : opacity * 1.0 + 0.3;
          ctxBright.globalAlpha = Math.min(1, brightOpacity);
          ctxBright.beginPath();
          ctxBright.rect(drawX, drawY, drawSize, drawSize);
          ctxBright.fill();
        }

      animationFrameRef.current = requestAnimationFrame(drawShapes);
    };

    let cachedPoints: { x: number; y: number; opacity: number }[] = [];

    const resizeCanvas = () => {
      canvas.width = container.offsetWidth;
      canvas.height = container.offsetHeight;
      canvasBright.width = container.offsetWidth;
      canvasBright.height = container.offsetHeight;
      
      cachedPoints = [];
      for (let y = 0; y < canvas.height; y += size + gap) {
        for (let x = 0; x < canvas.width; x += size + gap) {
          cachedPoints.push({ x, y, opacity: getOpacity(x, y) });
        }
      }
    };

    resizeCanvas();

    // Start animation loop
    if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    animationFrameRef.current = requestAnimationFrame(drawShapes);

    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const { width, height } = entry.contentRect;
        setDimensions({ width, height });
      }
      resizeCanvas();
    });

    resizeObserver.observe(container);
    return () => {
      resizeObserver.disconnect();
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, [size, gap, isDark, isClient]);

  if (!isClient) {
    return <div className="fixed inset-0 z-0 pointer-events-none w-full h-full bg-white dark:bg-[#050505]" />;
  }

  // Animated Perlin Mask for dim background
  const animationStyles = {
    mask: `url(${perlinNoiseDataUrl}) luminance`,
    WebkitMask: `url(${perlinNoiseDataUrl}) luminance`,
    maskImage: `url(${perlinNoiseDataUrl})`,
    maskMode: "luminance",
    WebkitMaskImage: `url(${perlinNoiseDataUrl})`,
    WebkitMaskMode: "luminance",
    maskSize: "300% 100%",
    WebkitMaskSize: "300% 100%",
    maskRepeat: "repeat-x",
    WebkitMaskRepeat: "repeat-x",
    animation: `moveMask ${animationDuration}ms linear infinite`,
    willChange: "mask-position"
  } as React.CSSProperties;

  // Mouse spotlight mask for bright foreground using CSS variables
  const spotlightStyle = {
    maskImage: `radial-gradient(800px circle at var(--mouse-x, -1000px) var(--mouse-y, -1000px), black 0%, transparent 100%)`,
    WebkitMaskImage: `radial-gradient(800px circle at var(--mouse-x, -1000px) var(--mouse-y, -1000px), black 0%, transparent 100%)`,
    ...animationStyles,
  };

  return (
    <div ref={containerRef} className="fixed inset-0 z-[-1] pointer-events-none w-full h-full overflow-hidden transition-colors duration-500 bg-[#f0f0f0] dark:bg-[#050505]">
      {/* Dim shimmering base grid */}
      <canvas ref={canvasRef} style={{ ...animationStyles, width: "100%", height: "100%", position: "absolute" }} />

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

      <style>
        {`
          @keyframes moveMask {
            0% { mask-position: 0% 0%; -webkit-mask-position: 0% 0%; }
            100% { mask-position: -300% 0%; -webkit-mask-position: -300% 0%; }
          }
        `}
      </style>
    </div>
  );
}
