import { useEffect, useState } from 'react';
import ganeshaLogo from '../../assets/ganesha-logo-removebg.png';
import { heroImages } from '../../utils/heroImages';

const IMAGES_PER_SLIDE = 3;
const SLIDE_INTERVAL = 5000;

const HeroCarousel = () => {
  const [currentGroup, setCurrentGroup] = useState(0);

  const totalGroups = Math.ceil(heroImages.length / IMAGES_PER_SLIDE);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentGroup((prev) => (prev + 1) % totalGroups);
    }, SLIDE_INTERVAL);
    return () => clearInterval(interval);
  }, [totalGroups]);

  const currentImages = heroImages.slice(
    currentGroup * IMAGES_PER_SLIDE,
    currentGroup * IMAGES_PER_SLIDE + IMAGES_PER_SLIDE
  );

  return (
    <section className="relative w-full min-h-[70vh] h-[70vh] overflow-hidden">
      {/* Három kép egymás mellett */}
      <div className="flex w-full h-full">
        {currentImages.map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`Hero ${index}`}
            className={`w-full sm:w-1/3 h-full object-cover object-center ${index > 0 ? 'hidden sm:block' : ''}`}
          />
        ))}
      </div>

      {/* Overlay */}
      <div className="hero-overlay absolute inset-0 z-10" />
      
      {/* Jobb oldali tartalom */}
      <div className="absolute right-0 top-0 bottom-0 z-20 flex flex-col items-center justify-center w-[40%] px-4 text-center gap-y-1 sm:gap-y-0">
        <img
          src={ganeshaLogo}
          alt="Ganesha logo"
          className="w-[80%] sm:w-[20rem] h-auto object-contain"
        />
        <h2 className="text-base sm:text-lg md:text-xl lg:text-3xl text-gold max-w-xs sm:max-w-sm drop-shadow-md">
          Yoga Essentials
          <br />&<br /> Holistic Goods
        </h2>
      </div>
    </section>
  );
};

export default HeroCarousel;