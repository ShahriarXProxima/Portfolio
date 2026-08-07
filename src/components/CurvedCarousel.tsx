import * as React from 'react';
import { useInView } from 'motion/react';

interface CurvedCarouselProps {
  items: React.ReactNode;
  background?: string;
  bottomFade?: boolean;
  autoplay?: boolean;
  autoplayMs?: number;
  radius?: number;
  angleStep?: number;
  dragThreshold?: number;
  arrowSize?: number;
  arrowInset?: number;
  arrowGap?: number;
  arrowBg?: string;
  arrowBorder?: string;
  arrowText?: string;
  sizeDecrease?: number;
  style?: React.CSSProperties;
}

export default function CurvedCarousel(props: CurvedCarouselProps) {
  const {
    items = (
      <>
        <div style={{ width: 340, height: 494, background: '#111' }} />
        <div style={{ width: 340, height: 494, background: '#222' }} />
        <div style={{ width: 340, height: 494, background: '#333' }} />
      </>
    ),
    background = 'transparent',
    bottomFade = true,
    autoplay = true,
    autoplayMs = 1000,
    radius = 1200,
    angleStep = 16,
    dragThreshold = 60,
    arrowSize = 48,
    arrowInset = 48,
    arrowGap = 12,
    arrowBg = '#FFFFFF',
    arrowBorder = 'rgba(229,231,235,0.8)',
    arrowText = '#4B5563',
    sizeDecrease = 0.06,
    style,
  } = props;

  const intervalRef = React.useRef<number | null>(null);

  const itemArray = React.useMemo(() => {
    return React.Children.toArray(items).filter(Boolean);
  }, [items]);

  const total = Math.max(0, itemArray.length);

  const rootRef = React.useRef<HTMLDivElement>(null);
  const inView = useInView(rootRef, { amount: 0.2 });

  const [activeIndex, setActiveIndex] = React.useState(0);
  const [isDragging, setIsDragging] = React.useState(false);
  const [hoverArrow, setHoverArrow] = React.useState<'left' | 'right' | null>(null);

  const startXRef = React.useRef(0);

  const resolvedBackground = background || 'transparent';

  // Compute intrinsic height based on curve geometry and card size
  const computedHeight = React.useMemo(() => {
    let cardHeight = 494;
    if (itemArray.length > 0) {
      const firstItem = itemArray[0] as React.ReactElement;
      if (firstItem?.props?.style?.height) {
        cardHeight =
          typeof firstItem.props.style.height === 'number'
            ? firstItem.props.style.height
            : parseInt(firstItem.props.style.height, 10) || 494;
      }
    }

    const maxVisibleAngle = angleStep * 2.5;
    const maxDrop = radius * (1 - Math.cos((maxVisibleAngle * Math.PI) / 180));

    return Math.max(
      cardHeight + 120,
      Math.round(cardHeight / 2 + maxDrop + arrowSize + arrowInset + 40)
    );
  }, [itemArray, radius, angleStep, arrowSize, arrowInset]);

  const containerHeight = style?.height
    ? parseInt(String(style.height), 10) || computedHeight
    : computedHeight;

  React.useEffect(() => {
    if (total <= 0) return;
    if (Math.abs(activeIndex) > 1000000) {
      React.startTransition(() =>
        setActiveIndex(((activeIndex % total) + total) % total)
      );
    }
  }, [activeIndex, total]);

  const clearAutoplay = React.useCallback(() => {
    if (intervalRef.current != null && typeof window !== 'undefined') {
      window.clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const startAutoplay = React.useCallback(() => {
    if (!autoplay) return;
    if (!inView) return;
    if (typeof window === 'undefined') return;
    if (total <= 1) return;
    clearAutoplay();
    intervalRef.current = window.setInterval(
      () => {
        React.startTransition(() => {
          setActiveIndex((v) => v + 1);
        });
      },
      Math.max(300, autoplayMs)
    );
  }, [autoplay, inView, total, autoplayMs, clearAutoplay]);

  React.useEffect(() => {
    startAutoplay();
    return () => clearAutoplay();
  }, [startAutoplay, clearAutoplay]);

  const resetAutoplay = React.useCallback(() => {
    clearAutoplay();
    startAutoplay();
  }, [clearAutoplay, startAutoplay]);

  const moveCarousel = React.useCallback(
    (direction: number) => {
      if (total <= 1) return;
      React.startTransition(() => {
        setActiveIndex((v) => v + direction);
      });
      resetAutoplay();
    },
    [resetAutoplay, total]
  );

  const onPointerDown = React.useCallback(
    (e: React.PointerEvent) => {
      if (total <= 1) return;
      startXRef.current = e.clientX;
      clearAutoplay();
      React.startTransition(() => setIsDragging(true));
    },
    [clearAutoplay, total]
  );

  const onPointerMove = React.useCallback(
    (e: React.PointerEvent) => {
      if (!isDragging) return;
      const diffX = e.clientX - startXRef.current;

      if (Math.abs(diffX) > 5) {
        try {
          (e.currentTarget as HTMLDivElement).setPointerCapture?.(e.pointerId);
        } catch (err) {}
      }

      if (Math.abs(diffX) > Math.max(10, dragThreshold)) {
        moveCarousel(diffX > 0 ? -1 : 1);
        React.startTransition(() => setIsDragging(false));
      }
    },
    [dragThreshold, isDragging, moveCarousel]
  );

  const onPointerUp = React.useCallback(() => {
    if (isDragging) React.startTransition(() => setIsDragging(false));
    resetAutoplay();
  }, [isDragging, resetAutoplay]);

  const onPointerCancel = React.useCallback(() => {
    if (isDragging) React.startTransition(() => setIsDragging(false));
    resetAutoplay();
  }, [isDragging, resetAutoplay]);

  const arrowCommon: React.CSSProperties = React.useMemo(
    () => ({
      width: arrowSize,
      height: arrowSize,
      borderRadius: 999,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      border: `1px solid ${arrowBorder}`,
      boxShadow: 'none',
      background: arrowBg,
      color: arrowText,
      cursor: total > 1 ? 'pointer' : 'default',
      userSelect: 'none' as const,
      WebkitUserSelect: 'none' as const,
      outline: 'none',
      transition: 'transform 300ms, background-color 300ms, color 300ms',
    }),
    [arrowBg, arrowBorder, arrowSize, arrowText, total]
  );

  const arrowHoverStyle: React.CSSProperties = React.useMemo(
    () => ({
      transform: 'scale(1.05)',
    }),
    []
  );

  const containerCursor = isDragging ? 'grabbing' : 'grab';

  const cards = React.useMemo(() => {
    if (total <= 0) return null;

    const renderCount = Math.max(total * 3, 9);
    const baseIndex = activeIndex - Math.floor(renderCount / 2);

    return new Array(renderCount).fill(0).map((_, j) => {
      const virtualIndex = baseIndex + j;
      const idx = ((virtualIndex % total) + total) % total;
      const child = itemArray[idx];

      const diff = virtualIndex - activeIndex;
      const absDiff = Math.abs(diff);
      const isCenter = diff === 0;

      const angleRad = -diff * angleStep * (Math.PI / 180);
      const translateX = radius * Math.sin(angleRad);
      const translateY = radius - radius * Math.cos(angleRad);
      const rotateZ = -diff * angleStep;

      const scale = Math.max(0, 1 - absDiff * sizeDecrease);
      const zIndex = 50 - absDiff * 10;

      const opacity = isCenter ? 1 : absDiff >= 3 ? 0 : 1 - absDiff * 0.4;
      const imgFilter = isCenter
        ? 'grayscale(0%) brightness(1.05)'
        : 'grayscale(100%) brightness(0.6)';

      const transform = `translate(calc(-50% + ${translateX}px), calc(-50% + ${translateY}px)) rotate(${rotateZ}deg) scale(${scale})`;

      return (
        <div
          key={`${virtualIndex}`}
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            display: 'inline-flex',
            width: 'fit-content',
            height: 'fit-content',
            borderRadius: 0,
            background: 'transparent',
            border: 'none',
            transformOrigin: 'center',
            transform,
            zIndex,
            opacity,
            pointerEvents: 'none',
            transitionProperty: 'transform, opacity',
            transitionDuration: '1000ms',
            transitionTimingFunction: 'cubic-bezier(0.32,0.72,0,1)',
          }}
          aria-hidden={!isCenter}
        >
          <div
            style={{
              position: 'relative',
              display: 'inline-flex',
              filter: imgFilter,
              transition: 'filter 1000ms',
              willChange: 'filter',
            }}
          >
            <div
              style={{
                pointerEvents: 'none',
                userSelect: 'none',
                WebkitUserSelect: 'none' as const,
                display: 'inline-flex',
              }}
            >
              {child}
            </div>
          </div>
        </div>
      );
    });
  }, [activeIndex, angleStep, itemArray, radius, sizeDecrease, total]);

  return (
    <div
      ref={rootRef}
      style={{
        position: 'relative',
        width: '100%',
        height: style?.height ?? containerHeight,
        minWidth: 5,
        minHeight: 5,
        overflow: 'visible',
        background: resolvedBackground,
        ...style,
      }}
    >
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: style?.height ?? containerHeight,
          minWidth: 5,
          minHeight: 5,
          maxWidth: 1400,
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          role="region"
          aria-label="Carousel"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerCancel}
          style={{
            position: 'relative',
            width: '100%',
            height: style?.height ?? containerHeight,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: total <= 1 ? 'default' : containerCursor,
            touchAction: 'pan-y',
            userSelect: 'none',
            WebkitUserSelect: 'none' as const,
            overflow: 'visible',
          }}
        >
          {cards}
        </div>

        <div
          style={{
            position: 'absolute',
            left: '50%',
            bottom: arrowInset,
            transform: 'translateX(-50%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: arrowGap,
            zIndex: 60,
            pointerEvents: total > 1 ? 'auto' : 'none',
          }}
        >
          <button
            type="button"
            aria-label="Previous"
            onClick={total > 1 ? () => moveCarousel(-1) : undefined}
            onMouseEnter={() =>
              React.startTransition(() => setHoverArrow('left'))
            }
            onMouseLeave={() =>
              React.startTransition(() => setHoverArrow(null))
            }
            style={{
              ...arrowCommon,
              ...(hoverArrow === 'left' && total > 1 ? arrowHoverStyle : null),
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
          </button>

          <button
            type="button"
            aria-label="Next"
            onClick={total > 1 ? () => moveCarousel(1) : undefined}
            onMouseEnter={() =>
              React.startTransition(() => setHoverArrow('right'))
            }
            onMouseLeave={() =>
              React.startTransition(() => setHoverArrow(null))
            }
            style={{
              ...arrowCommon,
              ...(hoverArrow === 'right' && total > 1 ? arrowHoverStyle : null),
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          </button>
        </div>
      </div>

      {bottomFade && (
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            height: 224,
            background: resolvedBackground,
            WebkitMaskImage:
              'linear-gradient(to top, rgba(0,0,0,1), rgba(0,0,0,0.80), rgba(0,0,0,0.00))',
            maskImage:
              'linear-gradient(to top, rgba(0,0,0,1), rgba(0,0,0,0.80), rgba(0,0,0,0.00))',
            pointerEvents: 'none',
            zIndex: 0,
          }}
        />
      )}
    </div>
  );
}
