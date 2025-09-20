import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../../../../services/api-client';
import { useAdminProductQueryStore } from '../../../../stores/useAdminProductQueryStore';
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline';

const AdminSearchBar = () => {
	const [searchInput, setSearchInput] = useState('');
	const [suggestions, setSuggestions] = useState<string[]>([]);
	const [isDropdownVisible, setIsDropdownVisible] = useState(false);
	const timeoutRef = useRef<number | null>(null);

	const navigate = useNavigate();
	const setSearch = useAdminProductQueryStore((s) => s.setSearch);
	const search = useAdminProductQueryStore((s) => s.search);

	// Suggestion fetching (debounced)
	useEffect(() => {
		if (searchInput.trim().length < 3) {
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
				.then((res) => {
					setSuggestions(res.data);
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

	// Update query param and Zustand store
	useEffect(() => {
		const trimmed = searchInput.trim();
		if (trimmed.length >= 2) {
			const encoded = encodeURIComponent(trimmed);
			navigate(`/admin/products?query=${encoded}`, { replace: true });
			setSearch(trimmed);
		}
	}, [searchInput]);

	// Clear input if Zustand search is reset externally
	useEffect(() => {
		if (search === '') {
			setSearchInput('');
		}
	}, [search]);

	const handleSearch = () => {
		setSearch(searchInput);
		navigate(
			`/admin/products?query=${encodeURIComponent(searchInput.trim())}`,
			{ replace: true }
		);
		setIsDropdownVisible(false);
	};

	const handleSelectSuggestion = (suggestion: string) => {
		setSearchInput(suggestion);
		setSearch(suggestion);
		setIsDropdownVisible(false);
		navigate(`/admin/products?query=${encodeURIComponent(suggestion.trim())}`, {
			replace: true,
		});
	};

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			handleSearch();
		}
	};

	return (
		<div className="relative w-full max-w-md">
			{/* Input + ikonok */}
			<div className="relative w-full">
				<MagnifyingGlassIcon className="h-5 w-5 text-gray-400 absolute left-2 top-1/2 -translate-y-1/2 pointer-events-none" />

				<input
					type="text"
					placeholder="Search products..."
					className="w-full p-2 pl-9 pr-10 border rounded"
					value={searchInput}
					onChange={(e) => setSearchInput(e.target.value)}
					onKeyDown={handleKeyDown}
					onFocus={() => {
						if (suggestions.length > 0) setIsDropdownVisible(true);
					}}
					onBlur={() => {
						setTimeout(() => setIsDropdownVisible(false), 100);
					}}
				/>

				{/* Törlés ikon */}
				{searchInput.length > 0 && (
					<button
						onClick={() => {
							setSearchInput('');
							setSearch('');
							navigate('/admin/products', { replace: true });
						}}
						className="absolute right-2 top-1/2 -translate-y-1/2 text-[#953733] hover:text-[#953733] cursor-pointer"
					>
						<XMarkIcon className="h-5 w-5" />
					</button>
				)}
			</div>

			{/* Suggestion dropdown */}
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
