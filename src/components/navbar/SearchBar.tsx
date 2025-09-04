import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProductQueryStore } from '../../stores/productQueryStore';
import apiClient from '../../services/api-client';
import { XMarkIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';

const SearchBar = () => {
	const [searchTerm, setSearchTerm] = useState('');
	const [suggestions, setSuggestions] = useState<string[]>([]);
	const [isDropdownVisible, setIsDropdownVisible] = useState(false);
	const timeoutRef = useRef<number | null>(null);

	const navigate = useNavigate();
	const setSearch = useProductQueryStore((state) => state.setSearch);

	// Debounce API call
	useEffect(() => {
		if (searchTerm.trim().length < 2) {
			setSuggestions([]);
			setIsDropdownVisible(false);
			return;
		}

		if (timeoutRef.current) clearTimeout(timeoutRef.current);

		timeoutRef.current = window.setTimeout(() => {
			apiClient
				.get<string[]>('/products/suggestions', {
					params: { query: searchTerm.trim() },
				})
				.then((response) => {
					setSuggestions(response.data);
					setIsDropdownVisible(true);
				})
				.catch(() => {
					setSuggestions([]);
					setIsDropdownVisible(false);
				});
		}, 300);

		return () => {
			if (timeoutRef.current) clearTimeout(timeoutRef.current);
		};
	}, [searchTerm]);

  // Zustand search reset figyelése
const search = useProductQueryStore((state) => state.search);

useEffect(() => {
	if (search === '') {
		setSearchTerm('');
	}
}, [search]);

	const handleSearch = () => {
		setSearch(searchTerm);
		navigate('/search');
		setIsDropdownVisible(false);
	};

	const handleSelectSuggestion = (suggestion: string) => {
		setSearchTerm(suggestion);
		setIsDropdownVisible(false);
		setSearch(suggestion);
		navigate('/search');
	};

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			handleSearch();
		}
	};

	return (
		<div className="relative w-full max-w-md">
			{/* Input + ikonok container */}
			<div className="relative w-full">
				{/* 🔍 Ikon – bal oldalon */}
				<MagnifyingGlassIcon className="h-5 w-5 text-gray-400 absolute left-2 top-1/2 -translate-y-1/2 pointer-events-none" />

				{/* Input mező */}
				<input
					type="text"
					placeholder="Search products..."
					className="w-full p-2 pl-9 pr-10 border rounded"
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
					onKeyDown={handleKeyDown}
					onFocus={() => {
						if (suggestions.length > 0) setIsDropdownVisible(true);
					}}
					onBlur={() => {
						setTimeout(() => setIsDropdownVisible(false), 100);
					}}
				/>

				{/* Törlés ikon – jobb oldalon */}
				{searchTerm.length > 0 && (
					<button
						onClick={() => {
							setSearchTerm('');
							setSearch('');
						}}
						className="absolute right-2 top-1/2 -translate-y-1/2 text-[#953733] hover:text-[#953733]"
					>
						<XMarkIcon className="h-5 w-5" />
					</button>
				)}
			</div>

			{/* Lenyíló javaslatok – az input alatt, ugyanakkora szélességben */}
			{isDropdownVisible && suggestions.length > 0 && (
				<ul className="absolute z-10 bg-white border w-full shadow-md rounded mt-1 max-h-60 overflow-y-auto">
					{suggestions.map((s, idx) => (
						<li
							key={idx}
							className="p-2 hover:bg-gray-100 cursor-pointer"
							onMouseDown={() => handleSelectSuggestion(s)}
						>
							{s}
						</li>
					))}
				</ul>
			)}
		</div>
	);
};

export default SearchBar;