import type { Category } from '../../../../types/product';
import type { NewProductFormData } from '../../ProductForm';
import { type FieldErrors, type UseFormRegister } from 'react-hook-form';
import {
	Checkbox,
	Card,
	List,
	ListItem,
	ListItemPrefix,
	Typography,
} from '@material-tailwind/react';

interface CategorySelectorProps {
	categories: Category[];
	register: UseFormRegister<NewProductFormData>;
	errors: FieldErrors<NewProductFormData>;
}

const CategorySelector = ({
	categories,
	register,
	errors,
}: CategorySelectorProps) => {
	return (
		<>
			<div className="space-y-2">
				<label className="text-base font-semibold mb-2 block">Categories</label>
				<Card className="border border-gray-300 rounded-xl max-h-64 overflow-y-auto">
					<List>
						{categories.map((category) => (
							<ListItem key={category.id} className="p-0">
								<label
									htmlFor={`category-${category.id}`}
									className="flex w-full cursor-pointer items-center px-3 py-2"
								>
									<ListItemPrefix className="mr-3">
										<Checkbox
											id={`category-${category.id}`}
											type="checkbox"
											value={category.id.toString()}
											{...register('categoryIds')}
											ripple={false}
											className="hover:before:opacity-0"
											containerProps={{
												className: 'p-0',
											}}
										/>
									</ListItemPrefix>
									<Typography color="blue-gray" className="font-medium">
										{category.categoryName}
									</Typography>
								</label>
							</ListItem>
						))}
					</List>
				</Card>

				{errors.categoryIds && (
					<p className="text-red-500 text-sm">{errors.categoryIds.message}</p>
				)}
			</div>
		</>
	);
};

export default CategorySelector;
