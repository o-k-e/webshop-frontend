import { useEffect, useState } from "react"
import ganeshaLogo from '../../assets/ganesha-logo-removebg.png';
import { heroImages } from "../../utils/heroImages";

const HeroCarousel = () => {

    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex(prevIndex => (prevIndex + 1) % heroImages.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section
          className="relative w-full min-h-[80vh] bg-cover bg-center bg-no-repeat transition-all duration-1000"
          style={{
            backgroundImage: `url(${heroImages[currentIndex]})`,
          }}
        >
          <div className="hero-overlay absolute inset-0 z-10" />

			<div className="absolute right-0 top-0 bottom-0 z-20 flex flex-col items-center justify-center w-[40%] px-4 text-white text-center gap-y-1 sm:gap-y-0">
				<img
					src={ganeshaLogo}
					alt="Ganesha logo"
					className="w-[80%] sm:w-[20rem] h-auto object-contain"
				/>
				<h2 className="text-base sm:text-lg md:text-xl lg:text-3xl text-gold max-w-xs sm:max-w-sm drop-shadow-md">
					Yoga Essentials
                    <br />&
					<br /> Holistic Goods
				</h2>
			</div>
        </section>
      );
    };

export default HeroCarousel