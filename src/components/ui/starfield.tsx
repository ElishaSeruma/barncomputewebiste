"use client";

/**
 * Starfield (vendored) — a canvas field of slowly orbiting, drifting particles.
 * Each "star" is a small square tracked by its own polar position, so the canvas is never
 * fully cleared: only the previous square per star is erased before the next is drawn.
 */
import { useEffect, useRef } from "react";

export interface StarfieldProps {
  starCount?: number;
  waveFrequency?: number;
  starEscapeWidth?: number;
  voidWidth?: number;
  starColor?: { r: number; g: number; b: number };
  maxOpacity?: number;
  rotationSpeed?: number;
  waveSpeed?: number;
  /** Side length in pixels of each particle. A single pixel reads as noise; 2-3 reads as a dot. */
  particleSize?: number;
  className?: string;
}

interface Star {
  orbital: number;
  opacity: number;
  position: { x: number; y: number };
  originPosition: { x: number; y: number };
  rotation: number;
  realPosition: { x: number; y: number };
  rSpeed: number;
  waveSpeed1: number;
  waveSpeed2: number;
  wave1: number;
  wave2: number;
  id: number;
}

const Starfield = ({
  starCount = 4000,
  waveFrequency = 12,
  starEscapeWidth = 320,
  voidWidth = 100,
  starColor = { r: 33, g: 33, b: 33 },
  maxOpacity = 130,
  rotationSpeed = 0.0002,
  waveSpeed = 0.004,
  particleSize = 2,
  className,
}: StarfieldProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const starsRef = useRef<Star[]>([]);
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const size = { x: 0, y: 0 };
    // Placeholders replaced by setSize() below; TS can't see that closure-assignment, so seed them.
    let imagedata: ImageData = context.createImageData(1, 1);
    // Aliases imagedata's own backing buffer, so writes here show up directly in the image.
    let data: Uint32Array = new Uint32Array(imagedata.data.buffer);
    const startTime = Date.now();
    let currentTime = 0;

    const setSize = () => {
      size.x = Math.max(1, container.clientWidth);
      size.y = Math.max(1, container.clientHeight);
      canvas.width = size.x;
      canvas.height = size.y;

      imagedata = context.createImageData(size.x, size.y);
      data = new Uint32Array(imagedata.data.buffer);
      starsRef.current = [];
    };

    const rotate = (cx: number, cy: number, x: number, y: number, radians: number) => {
      const cos = Math.cos(radians);
      const sin = Math.sin(radians);
      const nx = cos * (x - cx) + sin * (y - cy) + cx;
      const ny = cos * (y - cy) - sin * (x - cx) + cy;
      return { x: nx, y: ny };
    };

    const createStar = () => {
      const rands = [Math.random() * (starEscapeWidth / 2) + 1, Math.random() * (starEscapeWidth / 2) + starEscapeWidth];
      const orbital = rands.reduce((p, c) => p + c, 0) / rands.length;
      const position = { x: size.x / 2, y: size.y / 2 + orbital };
      const rotation = Math.PI * (Math.random() * 2);
      const rotated = rotate(size.x / 2, size.y / 2, position.x, position.y, rotation);
      const opacity = Math.floor((1 - orbital / starEscapeWidth) * maxOpacity + Math.random() * (maxOpacity * 0.3));
      const star: Star = {
        orbital,
        opacity,
        position: rotated,
        originPosition: { ...position },
        rotation,
        realPosition: { ...rotated },
        rSpeed: Math.random() * rotationSpeed + opacity / 20000,
        waveSpeed1: Math.random() * waveSpeed,
        waveSpeed2: Math.random() * waveSpeed,
        wave1: 0,
        wave2: 0,
        id: starsRef.current.length,
      };
      starsRef.current.push(star);
    };

    // Stamps or clears a `particleSize` square whose top-left is (px, py), clipped to the canvas
    // and never wrapping across a row edge.
    const plotBlock = (px: number, py: number, value: number) => {
      const x0 = Math.floor(px);
      const y0 = Math.floor(py);
      for (let dy = 0; dy < particleSize; dy++) {
        const y = y0 + dy;
        if (y < 0 || y >= size.y) continue;
        const rowStart = y * size.x;
        for (let dx = 0; dx < particleSize; dx++) {
          const x = x0 + dx;
          if (x < 0 || x >= size.x) continue;
          data[rowStart + x] = value;
        }
      }
    };

    const drawStar = (star: Star) => {
      plotBlock(star.realPosition.x + star.wave2, star.realPosition.y + star.wave1, 0);

      star.wave1 = Math.sin(currentTime * star.waveSpeed1) * waveFrequency;
      star.wave2 = Math.sin(currentTime * star.waveSpeed2) * waveFrequency;
      star.realPosition = rotate(size.x / 2, size.y / 2, star.position.x, star.position.y, star.rSpeed * currentTime);
      star.opacity = Math.floor((1 - star.orbital / starEscapeWidth) * maxOpacity + Math.random() * (maxOpacity * 0.3));

      const pixel = (star.opacity << 24) | (starColor.b << 16) | (starColor.g << 8) | starColor.r;
      plotBlock(star.realPosition.x + star.wave2, star.realPosition.y + star.wave1, pixel);
    };

    const render = () => {
      currentTime = (Date.now() - startTime) / 10;

      if (starsRef.current.length < starCount) {
        for (let i = 0; i < Math.min(150, starCount - starsRef.current.length); i++) createStar();
      }
      for (const star of starsRef.current) drawStar(star);

      context.putImageData(imagedata, 0, 0);
      animationFrameRef.current = requestAnimationFrame(render);
    };

    setSize();
    if (reduceMotion) {
      // Draw one settled frame and stop, rather than animating indefinitely.
      for (let i = 0; i < starCount; i++) createStar();
      for (const star of starsRef.current) drawStar(star);
      context.putImageData(imagedata, 0, 0);
    } else {
      render();
    }

    const resizeObserver = new ResizeObserver(() => setSize());
    resizeObserver.observe(container);

    return () => {
      resizeObserver.disconnect();
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, [starCount, waveFrequency, starEscapeWidth, voidWidth, starColor, maxOpacity, rotationSpeed, waveSpeed, particleSize]);

  return (
    <div ref={containerRef} className={className} aria-hidden style={{ width: "100%", height: "100%" }}>
      <canvas ref={canvasRef} />
    </div>
  );
};

export { Starfield };
