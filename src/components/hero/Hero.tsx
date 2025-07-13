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
					className="w-[28rem] h-[28rem] sm:w-[24rem] sm:h-[24rem] mt-0 object-contain"
				/>
				<h2 className="text-base sm:text-lg md:text-xl text-gold max-w-xs sm:max-w-sm drop-shadow-md">
					Unique handcrafted malas,
					<br /> and beautiful Indian textiles.
				</h2>
			</div>
		</section>
	);
};

export default Hero;
