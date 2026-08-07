import React, { useRef, useState } from 'react';

type HoverButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  as?: React.ElementType;
  href?: string;
  target?: string;
  rel?: string;
};

export const HoverButton = React.forwardRef<HTMLElement, HoverButtonProps>(
  ({ children, className, as: Component = 'button', style, ...props }, ref) => {
    const buttonRef = useRef<HTMLElement | null>(null);
    const circleRef = useRef<HTMLDivElement | null>(null);
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
      if (buttonRef.current && circleRef.current) {
        const rect = buttonRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        circleRef.current.style.left = `${x}px`;
        circleRef.current.style.top = `${y}px`;
      }
      if (props.onMouseMove) props.onMouseMove(e as any);
    };

    const handleMouseEnter = (e: React.MouseEvent<HTMLElement>) => {
      setIsHovered(true);
      if (buttonRef.current && circleRef.current) {
        const rect = buttonRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        circleRef.current.style.left = `${x}px`;
        circleRef.current.style.top = `${y}px`;
      }
      if (props.onMouseEnter) props.onMouseEnter(e as any);
    };

    const handleMouseLeave = (e: React.MouseEvent<HTMLElement>) => {
      setIsHovered(false);
      if (props.onMouseLeave) props.onMouseLeave(e as any);
    };

    return (
      <Component
        ref={(node: HTMLElement) => {
          buttonRef.current = node;
          if (typeof ref === 'function') {
            ref(node);
          } else if (ref) {
            (ref as React.MutableRefObject<HTMLElement | null>).current = node;
          }
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={`relative overflow-hidden group ${className || ''}`}
        style={{ border: 'none', ...style }}
        {...props}
      >
        <div
          ref={circleRef}
          className="absolute w-[800px] h-[800px] rounded-full pointer-events-none transition-transform duration-500 ease-out"
          style={{
            backgroundColor: 'rgb(34, 36, 37)',
            transform: isHovered ? 'translate(-50%, -50%) scale(1)' : 'translate(-50%, -50%) scale(0)',
            left: '50%',
            top: '50%',
            zIndex: 0,
          }}
        />
        {React.Children.map(children, (child) => {
          if (React.isValidElement(child)) {
            // If the child is already an element, we don't want to necessarily wrap it in a span if it ruins flex layout.
            // But we need z-index: 10 to put it above the circle.
            return (
              <span className="relative z-10 pointer-events-none" style={{ color: isHovered ? 'white' : 'inherit', transition: 'color 0.3s ease' }}>
                {child}
              </span>
            );
          }
          return <span className="relative z-10 pointer-events-none" style={{ color: isHovered ? 'white' : 'inherit', transition: 'color 0.3s ease' }}>{child}</span>;
        })}
      </Component>
    );
  }
);

HoverButton.displayName = 'HoverButton';
