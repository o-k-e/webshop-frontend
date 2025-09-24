import type { Category } from '../../../../types/product';
import type { UpdateProductFormData } from '../../ProductUpdateForm';
import { type FieldErrors, type UseFormRegister } from 'react-hook-form';
import {
	Checkbox,
	Card,
	List,
	ListItem,
	ListItemPrefix,
	Typography,
} from '@material-tailwind/react';

interface CategorySelectorUpdateProps {
	categories: Category[];
	register: UseFormRegister<UpdateProductFormData>;
	errors: FieldErrors<UpdateProductFormData>;
}

const CategorySelectorUpdate = ({
	categories,
	register,
	errors,
}: CategorySelectorUpdateProps) => {
	return (
		<div className="space-y-2">
			<label className="text-base font-semibold mb-2 block">Categories</label>
			<Card className="border border-gray-300 rounded-xl max-h-64 overflow-y-auto hover:bg-[#fafafacc]">
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
										containerProps={{ className: 'p-0' }}
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
	);
};

export default CategorySelectorUpdate;
