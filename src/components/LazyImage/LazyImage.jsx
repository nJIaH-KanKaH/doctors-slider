import React, { useEffect, useRef, useState } from 'react';

export default function LazyImage({ src, placeholder = '', alt = '', className = '' }) {
    const imgRef = useRef(null);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        const imgEl = imgRef.current;
        if (!imgEl) return;

        const onLoad = () => setLoaded(true);
        imgEl.addEventListener('load', onLoad);
        return () => imgEl.removeEventListener('load', onLoad);
    }, []);

    useEffect(() => {
        const imgEl = imgRef.current;
        if (!imgEl) return;

        if ('IntersectionObserver' in window) {
            const io = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        imgEl.src = src;
                        io.unobserve(entry.target);
                        io.disconnect();
                    }
                });
            }, { rootMargin: '200px' });
            io.observe(imgEl);
            return () => io.disconnect();
        } else {
            // Fallback: load immediately
            imgEl.src = src;
        }
    }, [src]);

    return (
        <img
            ref={imgRef}
            src={placeholder || src}
            alt={alt}
            className={`${className} ${loaded ? 'is-loaded' : 'is-loading'}`.trim()}
        />
    );
}


