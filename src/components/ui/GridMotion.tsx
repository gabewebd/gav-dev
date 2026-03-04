"use client";

import { useEffect, useRef, useState, FC, ReactNode } from 'react';
import { gsap } from 'gsap';

interface GridMotionProps {
    items?: (string | ReactNode)[];
    gradientColor?: string;
}

const GridMotion: FC<GridMotionProps> = ({ items = [], gradientColor = 'black' }) => {
    const gridRef = useRef<HTMLDivElement>(null);
    const rowRefs = useRef<(HTMLDivElement | null)[]>([]);

    // State for responsive rows/cols
    const [gridConfig, setGridConfig] = useState({ rows: 3, cols: 4 });

    // Initialize to 0 instead of window.innerWidth to prevent SSR errors
    const mouseXRef = useRef<number>(0);

    useEffect(() => {
        const updateConfig = () => {
            const width = window.innerWidth;
            if (width < 640) {
                setGridConfig({ rows: 2, cols: 2 });
            } else if (width < 1024) {
                setGridConfig({ rows: 3, cols: 3 });
            } else {
                setGridConfig({ rows: 3, cols: 4 });
            }
        };

        updateConfig();
        window.addEventListener('resize', updateConfig);
        return () => window.removeEventListener('resize', updateConfig);
    }, []);

    const { rows, cols } = gridConfig;
    const totalItems = rows * cols;
    const combinedItems = items.length > 0
        ? Array.from({ length: totalItems }, (_, i) => items[i % items.length])
        : Array.from({ length: totalItems }, (_, index) => `Item ${index + 1}`);

    useEffect(() => {
        mouseXRef.current = window.innerWidth / 2;
        gsap.ticker.lagSmoothing(0);

        const handleMouseMove = (e: MouseEvent): void => {
            mouseXRef.current = e.clientX;
        };

        const updateMotion = (): void => {
            const maxMoveAmount = 300;
            const baseDuration = 0.8;
            const inertiaFactors = [0.6, 0.4, 0.3];

            rowRefs.current.forEach((row, index) => {
                if (row) {
                    const direction = index % 2 === 0 ? 1 : -1;
                    const moveAmount = ((mouseXRef.current / window.innerWidth) * maxMoveAmount - maxMoveAmount / 2) * direction;

                    gsap.to(row, {
                        x: moveAmount,
                        duration: baseDuration + inertiaFactors[index % inertiaFactors.length] || 0.5,
                        ease: 'power3.out',
                        overwrite: 'auto'
                    });
                }
            });
        };

        const removeAnimationLoop = gsap.ticker.add(updateMotion);
        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            removeAnimationLoop();
        };
    }, [rows]); // Re-run if rows change to ensure refs are handled

    return (
        <div ref={gridRef} className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
            <section
                className="w-full h-full overflow-hidden relative flex items-center justify-center pointer-events-none"
                style={{
                    background: `radial-gradient(circle, ${gradientColor} 0%, transparent 100%)`
                }}
            >
                <div className="gap-4 md:gap-6 flex-none relative w-[150vw] sm:w-[200vw] h-[150vh] sm:h-[200vh] grid grid-cols-1 rotate-[-15deg] origin-center z-[2]"
                    style={{ gridTemplateRows: `repeat(${rows}, 1fr)` }}
                >
                    {Array.from({ length: rows }, (_, rowIndex) => (
                        <div
                            key={`${rowIndex}-${rows}`} // Unique key when rows change
                            className="grid gap-4 md:gap-6"
                            style={{ willChange: 'transform, filter', gridTemplateColumns: `repeat(${cols}, 1fr)` }}
                            ref={el => {
                                if (el) rowRefs.current[rowIndex] = el;
                            }}
                        >
                            {Array.from({ length: cols }, (_, itemIndex) => {
                                const content = combinedItems[rowIndex * cols + itemIndex];
                                return (
                                    <div key={itemIndex} className="relative aspect-[16/10]">
                                        <div className="relative w-full h-full overflow-hidden rounded-xl md:rounded-2xl bg-[#e8e8e8] dark:bg-[#111] shadow-lg shadow-brand-ink/10 dark:shadow-black/30 border border-brand-ink/10 dark:border-white/5 flex items-center justify-center text-white text-[1rem] md:text-[1.5rem]">
                                            {typeof content === 'string' && (content.startsWith('http') || content.startsWith('/')) ? (
                                                <div
                                                    className="w-full h-full bg-cover bg-center absolute top-0 left-0"
                                                    style={{ backgroundImage: `url(${content})` }}
                                                ></div>
                                            ) : (
                                                <div className="p-4 text-center z-[1]">{content}</div>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default GridMotion;