import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import useCategories from '../../hooks/useCategories';

// Zod séma
const newProductSchema = z.object({
	productName: z.string().min(1, 'Product name is required'),
	productDescription: z.string().min(1, 'Description is required'),
	price: z.number().positive('Price must be greater than 0'),
	categories: z.array(z.string()).nonempty('Select at least one category'),
	images: z
		.array(z.instanceof(File))
		.min(1, 'Please upload at least one image'),
});

type NewProductFormData = z.infer<typeof newProductSchema>;

const ProductForm = () => {
	const { data: categories, isLoading } = useCategories();

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
		setValue,
		watch,
	} = useForm<NewProductFormData>({
		resolver: zodResolver(newProductSchema),
		defaultValues: {
			productName: '',
			productDescription: '',
			price: 0,
			categories: [],
			images: [],
		},
	});

	const onSubmit = (data: NewProductFormData) => {
		console.log(data); // később API hívás lesz
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
			<div>
				<label className="block font-medium">Product Name</label>
				<input type="text" {...register('productName')} className="input" />
				{errors.productName && (
					<p className="text-red-500 text-sm">{errors.productName.message}</p>
				)}
			</div>

			<div>
				<label className="block font-medium">Description</label>
				<textarea {...register('productDescription')} className="input h-32" />
				{errors.productDescription && (
					<p className="text-red-500 text-sm">
						{errors.productDescription.message}
					</p>
				)}
			</div>

			<div>
				<label className="block font-medium">Price (Ft)</label>
				<input
					type="number"
					step="0.01"
					{...register('price', { valueAsNumber: true })}
					className="input"
				/>
				{errors.price && (
					<p className="text-red-500 text-sm">{errors.price.message}</p>
				)}
			</div>

			{/* További mezők: categories, images később */}
			<button
				type="submit"
				className="bg-[#953733] text-white px-6 py-2 rounded hover:opacity-90"
				disabled={isSubmitting}
			>
				Save Product
			</button>
		</form>
	);
};

export default ProductForm;
