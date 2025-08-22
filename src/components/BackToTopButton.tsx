import { useEffect, useState } from 'react';
import { FiArrowUp } from 'react-icons/fi';

const BackToTopButton = () => {
	const [isVisible, setIsVisible] = useState(false);

	// figyeljuk a scroll pozíciót
	useEffect(() => {
		const toggleVisibility = () => {
			setIsVisible(window.scrollY > 300);
		};

		window.addEventListener('scroll', toggleVisibility);

		return () => window.removeEventListener('scroll', toggleVisibility);
	}, []);

	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		});
	};

	if (!isVisible) return null;

	return (
		<div
			onClick={scrollToTop}
			className="fixed bottom-6 right-6 z-40 p-3 rounded-full bg-gray-200 text-gray-700 shadow hover:bg-gray-300 hover:shadow-md transition-all duration-300"
			title="Back to Top"
		>
			<FiArrowUp size={20} />
		</div>
	);
};

export default BackToTopButton;
