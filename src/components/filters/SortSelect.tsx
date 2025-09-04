import type { ChangeEvent } from 'react';
import { useProductQueryStore } from '../../stores/useProductQueryStore';
import type { SortField, SortDir } from '../../types/sort';

// helpers a biztonságos parse-hoz
const isField = (v: string): v is SortField =>
	v === 'id' || v === 'price' || v === 'productName';

const isDir = (v: string): v is SortDir => v === 'asc' || v === 'desc';

export default function SortSelect() {
	const sort = useProductQueryStore((s) => s.sort);
	const setSort = useProductQueryStore((s) => s.setSort);

	const value = `${sort.field},${sort.direction}`;

	const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
		const [rawField, rawDir] = e.target.value.split(',');
		const field = isField(rawField) ? rawField : 'id';
		const direction = isDir(rawDir) ? rawDir : 'asc';

		if (field === sort.field && direction === sort.direction) return;

		setSort({ field, direction });
	};

	return (
		<label className="text-sm text-gray-600">
			Sort by:{' '}
			<select
				value={value}
				onChange={handleChange}
				className="border rounded px-2 py-1"
			>
				<option value="id,asc">Newest</option>
				<option value="price,asc">Price: Low → High</option>
				<option value="price,desc">Price: High → Low</option>
				<option value="productName,asc">Name: A → Z</option>
				<option value="productName,desc">Name: Z → A</option>
			</select>
		</label>
	);
}
