import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from 'motion/react';

type RevealTheme = 'dark' | 'light' | 'auto';
type ScrollOffsetOption = NonNullable<Parameters<typeof useScroll>[0]>['offset'];

interface ScrollRevealParagraphProps {
  children: string;
  className?: string;
  as?: 'p' | 'h3' | 'div' | 'span';
  theme?: RevealTheme;
  fromColor?: string;
  toColor?: string;
  offset?: ScrollOffsetOption;
}

interface RevealCharProps {
  char: string;
  progress: MotionValue<number>;
  start: number;
  end: number;
  fromColor: string;
  toColor: string;
}

function useIsDarkMode(enabled: boolean) {
  const [isDark, setIsDark] = useState(() =>
    typeof document !== 'undefined' &&
    document.documentElement.classList.contains('dark')
  );

  useEffect(() => {
    if (!enabled || typeof document === 'undefined') return;
    const root = document.documentElement;
    const sync = () => setIsDark(root.classList.contains('dark'));
    sync();

    const observer = new MutationObserver(sync);
    observer.observe(root, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, [enabled]);

  return isDark;
}

const RevealChar = ({
  char,
  progress,
  start,
  end,
  fromColor,
  toColor,
}: RevealCharProps) => {
  const color = useTransform(progress, [start, end], [fromColor, toColor]);
  return <motion.span style={{ color }}>{char}</motion.span>;
};

export default function ScrollRevealParagraph({
  children,
  className = '',
  as = 'p',
  theme = 'dark',
  fromColor,
  toColor,
  offset = ['start 0.85', 'end 0.45'],
}: ScrollRevealParagraphProps) {
  const containerRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const isSystemDark = useIsDarkMode(theme === 'auto');

  const resolvedTheme: 'dark' | 'light' =
    theme === 'auto' ? (isSystemDark ? 'dark' : 'light') : theme;

  const resolvedFromColor =
    fromColor ??
    (resolvedTheme === 'dark'
      ? theme === 'auto'
        ? '#8a8a96'
        : '#6e6e6e'
      : theme === 'auto'
        ? '#6e737d'
        : '#8f8f8f');

  const resolvedToColor =
    toColor ?? (resolvedTheme === 'dark' ? '#ffffff' : '#0a0a0a');

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset,
  });

  const tagColor = useTransform(
    scrollYProgress,
    [0.55, 0.9],
    [resolvedFromColor, resolvedToColor]
  );

  const text = typeof children === 'string' ? children.trim() : '';

  const { lines, totalChars } = useMemo(() => {
    let charCounter = 0;
    const parsedLines = text.split('\n').map((line) => {
      const words = line.trim().split(/\s+/).filter(Boolean);
      return words.map((word) => {
        const chars = Array.from(word).map((char) => ({
          char,
          index: charCounter++,
        }));
        return { chars };
      });
    });
    return { lines: parsedLines, totalChars: charCounter };
  }, [text]);

  if (prefersReducedMotion || totalChars === 0) {
    const StaticTag = as;
    return (
      <StaticTag className={className} style={{ color: resolvedToColor }}>
        {children}
      </StaticTag>
    );
  }

  const charWindow = Math.min(0.16, Math.max(0.045, 4 / Math.max(1, totalChars)));
  const MotionTag = motion[as];

  return (
    <MotionTag
      ref={containerRef as React.RefObject<never>}
      className={className}
      style={{ color: tagColor }}
      aria-label={text}
    >
      <span aria-hidden="true">
        {lines.map((words, lineIdx) => (
          <React.Fragment key={lineIdx}>
            {lineIdx > 0 && <br />}
            {words.map((word, wordIdx) => (
              <React.Fragment key={`${lineIdx}-${wordIdx}`}>
                <span
                  className={
                    word.chars.length > 18 ? 'break-words' : 'whitespace-nowrap'
                  }
                >
                  {word.chars.map((item) => {
                    const start =
                      totalChars <= 1
                        ? 0
                        : (item.index / (totalChars - 1)) * (1 - charWindow);
                    const end = totalChars <= 1 ? 1 : start + charWindow;
                    return (
                      <RevealChar
                        key={item.index}
                        char={item.char}
                        progress={scrollYProgress}
                        start={start}
                        end={end}
                        fromColor={resolvedFromColor}
                        toColor={resolvedToColor}
                      />
                    );
                  })}
                </span>
                {wordIdx < words.length - 1 ? ' ' : null}
              </React.Fragment>
            ))}
          </React.Fragment>
        ))}
      </span>
    </MotionTag>
  );
}
