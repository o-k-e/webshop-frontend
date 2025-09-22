import { useAdminProductQueryStore } from '../../../../stores/useAdminProductQueryStore';

const PriceSortDropdown = () => {
	const sort = useAdminProductQueryStore((s) => s.sort);
	const setSort = useAdminProductQueryStore((s) => s.setSort);

	const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const value = e.target.value;
		switch (value) {
			case 'asc':
				setSort({ field: 'price', direction: 'asc' });
				break;
			case 'desc':
				setSort({ field: 'price', direction: 'desc' });
				break;
			default:
				setSort({ field: 'id', direction: 'desc' }); // default sorting
		}
	};

	const currentValue =
		sort.field === 'price' ? sort.direction : 'default';

	return (
		<select
			value={currentValue}
			onChange={handleChange}
			className="text-sm border border-gray-300 rounded px-2 py-1 bg-[#f0dadacc] text-gray-700 font-medium focus:outline-none focus:ring-1 focus:ring-amber-800"
		>
			<option value="default">Default</option>
			<option value="asc">Low to High</option>
			<option value="desc">High to Low</option>
		</select>
	);
};

export default PriceSortDropdown;