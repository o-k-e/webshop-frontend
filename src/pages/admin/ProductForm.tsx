import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import useCategories from '../../hooks/useCategories';
import CategorySelector from './components/CategorySelector';
import ImageUploader from './components/ImageUploader';
import apiClient from '../../services/api-client';
import DescriptionEditor from './components/DescriptionEditor';

const newProductSchema = z.object({
	productName: z.string().min(1, 'Product name is required'),
	description: z.string().min(1, 'Description is required'),
	price: z.number().positive('Price must be greater than 0'),
	categoryIds: z.array(z.string()).nonempty('Select at least one category'),
	imageFileNames: z
		.array(z.string())
		.min(1, 'Please upload at least one image'),
});

export type NewProductFormData = z.infer<typeof newProductSchema>;

const ProductForm = () => {
	const { data: categories, isLoading } = useCategories();

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
		setValue,
		watch,
		reset,
	} = useForm<NewProductFormData>({
		resolver: zodResolver(newProductSchema),
		defaultValues: {
			productName: '',
			description: '',
			price: 0,
			categoryIds: [],
			imageFileNames: [],
		},
	});

	const onSubmit = async (data: NewProductFormData) => {
		try {
			console.log('HTML:', data.description);
			const token = localStorage.getItem('token');
			if (!token) {
				console.error('No token found');
				return;
			}

			const payload = {
				productName: data.productName,
				description: data.description,
				price: data.price,
				categoryIds: data.categoryIds.map(Number),
				imageFileNames: data.imageFileNames,
			};

			const response = await apiClient.post('/products', payload, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});

			console.log('Product created:', response.data);
			reset();
		} catch (error) {
			console.error('Error saving product:', error);
		}
	};

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className="max-w-3xl mx-auto bg-white shadow-md rounded-xl p-8 space-y-6"
		>
			{/* Product name */}
			<div>
				<label className="block font-medium mb-2">Product Name</label>
				<input type="text" {...register('productName')} className="input" />
				{errors.productName && (
					<p className="text-red-500 text-sm">{errors.productName.message}</p>
				)}
			</div>

			{/* Description */}
			<DescriptionEditor
				value={watch('description')}
				onChange={(val) => setValue('description', val)}
			/>
			{errors.description && (
				<p className="text-red-500 text-sm mt-1">
					{errors.description.message}
				</p>
			)}

			{/* Price */}
			<div>
				<label className="block font-medium mb-2">Price (Ft)</label>
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

			{/* Categories */}
			{isLoading && <p>Loading categories...</p>}
			{categories && (
				<CategorySelector
					categories={categories}
					register={register}
					errors={errors}
				/>
			)}

			{/* Image uploader */}
			<ImageUploader setValue={setValue} errors={errors} watch={watch} onReset={() => {}}/>

			{/* Submit */}
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
