import ganeshaLogo from '../../assets/ganesha-logo-removebg.png';

const Hero = () => {
	return (
		<section className="relative w-full min-h-[80vh] bg-cover bg-center bg-no-repeat bg-[url('/src/assets/malas-textile-bg.png')]">
			{/* Ferde overlay – jobb oldalra igazítva */}
			<div
				className="absolute inset-0 z-10"
				style={{
					clipPath: 'polygon(100% 100%, 70% 100%, 50% 0%, 100% 0%)',
					backgroundColor: '#953733cc',
				}}
			/>

			{/* Tartalom */}
			<div className="absolute right-0 top-0 bottom-0 z-20 flex flex-col items-center justify-center w-[40%] px-4 text-white text-center gap-y-3 sm:gap-y-2 md:gap-y-1">
				<img
					src={ganeshaLogo}
					alt="Ganesha logo"
					className="w-[16rem] h-[16rem] sm:w-[14rem] sm:h-[14rem] mt-6 sm:mt-10 md:mt-4 object-contain"
				/>
				<h1 className="text-1xl sm:text-2xl md:text-3xl text-gold font-bold drop-shadow-lg leading-tight">
					Ganesha Shop
				</h1>
				<p className="text-base sm:text-lg md:text-xl text-gold max-w-xs sm:max-w-sm drop-shadow-md">
					Unique handcrafted malas,<br /> and beautiful Indian textiles.
				</p>
			</div>
		</section>
	);
};

export default Hero;