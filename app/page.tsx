'use client';
import { useEffect, useState, useRef } from 'react';

export default function Home() {
    const [color, setColor] = useState('black');
    const [highlightedId, setHighlightedId] = useState<string | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            let nearestDiv = target;
            const computedStyle = window.getComputedStyle(nearestDiv);
            while (
                nearestDiv &&
                nearestDiv.tagName !== 'DIV' &&
                nearestDiv !== containerRef.current
            ) {
                nearestDiv = nearestDiv.parentElement;
            }
            if (nearestDiv && nearestDiv !== containerRef.current) {
                setHighlightedId(nearestDiv.id);

                const targetInfo = {
                    id: nearestDiv.id,
                    className: nearestDiv.className,
                    tagName: nearestDiv.tagName,
                    backgroundColor:computedStyle.backgroundColor,
                    x: e.clientX,
                    y: e.clientY,
                };
                window.parent.postMessage(JSON.stringify(targetInfo), '*');
            }
        };

        const handleMessage = (event: MessageEvent) => {
            if (event.origin === 'http://localhost:3000') {
                if (event.data && event.data.color) {
                    setColor(event.data.color);
                }
            }
        };

        window.addEventListener('click', handleClick);
        window.addEventListener('message', handleMessage);

        return () => {
            window.removeEventListener('click', handleClick);
            window.removeEventListener('message', handleMessage);
        };
    }, []);

    return (
        <main
            ref={containerRef}
            className="flex min-h-screen flex-col items-center justify-between p-24"
        >
            <div
                className='test-background1'
                id="div1"
                style={{
                    color: highlightedId === 'div1' ? 'blue' : 'black',
                    border:
                        highlightedId === 'div1' ? '4px solid blue' : 'none',
                }}
            >
                Div 1
            </div>
            <div
                id="div2"
                style={{
                    color: color,
                    border:
                        highlightedId === 'div2' ? '4px solid blue' : 'none',
                }}
            >
                Div 2
            </div>
            <div
                id="text-content"
                style={{
                    color: highlightedId === 'text-content' ? 'blue' : 'black',
                    border:
                        highlightedId === 'text-content'
                            ? '4px solid blue'
                            : 'none',
                }}
            >
                This is div with id text-coadad
            </div>
        </main>
    );
}
