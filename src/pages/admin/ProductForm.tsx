import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import useCategories from '../../hooks/useCategories';
import CategorySelector from './components/CategorySelector';
import ImageUploader from './components/ImageUploader';
import apiClient from '../../services/api-client';

// Zod séma
const newProductSchema = z.object({
	productName: z.string().min(1, 'Product name is required'),
	productDescription: z.string().min(1, 'Description is required'),
	price: z.number().positive('Price must be greater than 0'),
	categories: z.array(z.string()).nonempty('Select at least one category'),
	images: z.array(z.string()).min(1, 'Please upload at least one image'),
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

	const onSubmit = async (data: NewProductFormData) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                console.error('No token found');
                return;
            }
    
            const payload = {
                productName: data.productName,
                description: data.productDescription,
                price: data.price,
                categoryId: parseInt(data.categories[0]),
                imageFileName: data.images[0],
            };
    
            const response = await apiClient.post('/products', payload, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
    
            console.log('Product created:', response.data);
        } catch (error) {
            console.error('Error saving product:', error);
        }
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

			{/* categories */}
			{isLoading && <p>Loading categories...</p>}
			{categories && (
				<CategorySelector
					categories={categories}
					register={register}
					errors={errors}
				/>
			)}

			{/* image uploader */}
			<ImageUploader setValue={setValue} errors={errors} watch={watch} />

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
