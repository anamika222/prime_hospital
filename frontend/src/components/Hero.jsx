import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation, EffectFade } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';

// Vite-safe Environment Variable Access
// Brug relative stier i produktion
const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';
const MEDIA_BASE_URL = import.meta.env.VITE_MEDIA_URL || '';
const DEFAULT_SLIDES = [
    {
        id: 1,
        imageUrl: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=1600"
    }
];

export default function Hero() {
    const [slides, setSlides] = useState(DEFAULT_SLIDES);

    // Dynamic Image URL Generator
    const getImageUrl = (imagePath) => {
        if (!imagePath) return '';
        if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
            return imagePath;
        }
        return `${MEDIA_BASE_URL}${imagePath}`;
    };

    useEffect(() => {
        const fetchSliders = async () => {
            try {
                // Django endpoint-er sheshe trailing slash (/) thaka baadhutamulok
                const res = await fetch(`${API_BASE_URL}/hero-sliders/`);
                if (res.ok) {
                    const data = await res.json();
                    if (data && data.length > 0) {
                        setSlides(data);
                    }
                }
            } catch (err) {
                console.log("Using default fallback banner image");
            }
        };

        fetchSliders();
    }, []);

    return (
        <div className="w-full relative bg-slate-950 overflow-hidden">
            <Swiper
                spaceBetween={0}
                effect={'fade'}
                centeredSlides={true}
                autoplay={{
                    delay: 4500,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                navigation={true}
                modules={[Autoplay, Pagination, Navigation, EffectFade]}
                className="mySwiper w-full h-[220px] sm:h-[380px] md:h-[480px] lg:h-[520px]"
            >
                {slides.map((slide) => {
                    const srcUrl = getImageUrl(slide.imageUrl || slide.image);
                    return (
                        <SwiperSlide key={slide.id} className="relative w-full h-full">
                            <img 
                                src={srcUrl} 
                                alt="Hospital Hero Banner"
                                className="w-full h-full object-cover object-center"
                            />
                        </SwiperSlide>
                    );
                })}
            </Swiper>
        </div>
    );
}