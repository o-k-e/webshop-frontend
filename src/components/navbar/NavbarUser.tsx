const NavbarUser = () => {
	return (
	  <nav className="w-full h-14 bg-ganesha text-white shadow-sm px-4 flex items-center justify-center">
		<div className="flex items-center gap-2 sm:gap-5 md:gap-20 flex-wrap justify-center">
		  {/* helyfoglaló gombok – később kategóriákkal töltjük fel Zustandból */}
		  <div className="px-3 py-1.5 text-sm rounded  hover:bg-white/10 transition">
			All
		  </div>
		  <div className="px-3 py-1.5 text-sm rounded  hover:bg-white/10 transition">
			Incense
		  </div>
		  <div className="px-3 py-1.5 text-sm rounded  hover:bg-white/10 transition">
			Yoga
		  </div>
		  <div className="px-3 py-1.5 text-sm rounded  hover:bg-white/10 transition">
			Clothes
		  </div>
		  <div className="px-3 py-1.5 text-sm rounded  hover:bg-white/10 transition">
			Ayurveda
		  </div>
		  {/* később: ezeket dinamikusan rendereljük a store-ból */}
		</div>
	  </nav>
	);
  };
  
  export default NavbarUser;