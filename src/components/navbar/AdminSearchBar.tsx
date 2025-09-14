import { useState, useEffect, useRef } from 'react';
import apiClient from '../../services/api-client';
import { XMarkIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useAdminProductQueryStore } from '../../stores/useAdminProductQueryStore';

const AdminSearchBar = () => {
	const [searchInput, setSearchInput] = useState('');
	const [suggestions, setSuggestions] = useState<string[]>([]);
	const [isDropdownVisible, setIsDropdownVisible] = useState(false);
	const timeoutRef = useRef<number | null>(null);

	const setSearch = useAdminProductQueryStore((state) => state.setSearch);

	// Debounce API call
	useEffect(() => {
		if (searchInput.trim().length < 2) {
			setSuggestions([]);
			setIsDropdownVisible(false);
			return;
		}

		if (timeoutRef.current) clearTimeout(timeoutRef.current);

		timeoutRef.current = window.setTimeout(() => {
			apiClient
				.get<string[]>('/products/suggestions', {
					params: { query: searchInput.trim() },
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
	}, [searchInput]);

	// Frissítjük a search query-t a store-ban
	useEffect(() => {
		if (searchInput.trim().length >= 2) {
			setSearch(searchInput.trim());
		} else {
			setSearch('');
		}
	}, [searchInput]);

	const handleSelectSuggestion = (suggestion: string) => {
		setSearchInput(suggestion);
		setSearch(suggestion);
		setIsDropdownVisible(false);
	};

	return (
		<div className="relative w-full max-w-md pr-4">
			<div className="relative w-full">
				<MagnifyingGlassIcon className="h-5 w-5 text-gray-400 absolute left-2 top-1/2 -translate-y-1/2 pointer-events-none" />
				<input
					type="text"
					placeholder="Search products..."
					className="w-full p-2 pl-9 pr-10 border rounded"
					value={searchInput}
					onChange={(e) => setSearchInput(e.target.value)}
					onFocus={() => {
						if (suggestions.length > 0) setIsDropdownVisible(true);
					}}
					onBlur={() => {
						setTimeout(() => setIsDropdownVisible(false), 100);
					}}
				/>
				{searchInput.length > 0 && (
					<button
						onClick={() => {
							setSearchInput('');
							setSearch('');
						}}
						className="absolute right-2 top-1/2 -translate-y-1/2 text-[#953733] hover:text-[#953733]"
					>
						<XMarkIcon className="h-5 w-5" />
					</button>
				)}
			</div>

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

export default AdminSearchBar;