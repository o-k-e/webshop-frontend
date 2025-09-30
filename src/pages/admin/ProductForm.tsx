import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import DescriptionEditor from './components/new-and-update-product/DescriptionEditor';
import useCategories from '../../hooks/useCategories';
import CategorySelector from './components/new-and-update-product/CategorySelector';
import ImageUploader from './components/new-and-update-product/ImageUploader';
import apiClient from '../../services/api-client';
import { toast } from 'react-hot-toast';
import formPageBg from '../../assets/form-page-bg.jpeg';

const newProductSchema = z.object({
	productName: z.string().min(1, '* Product name is required'),
	description: z.string().min(1, '* Description is required'),
	price: z.number().positive('* Price must be greater than 0'),
	categoryIds: z.array(z.string()).nonempty('* Select at least one category'),
	imageFileNames: z
		.array(z.string())
		.min(1, '* Please upload at least one image'),
});

export type NewProductFormData = z.infer<typeof newProductSchema>;

const ProductForm = () => {
	const navigate = useNavigate();
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

			await apiClient.post('/products', payload, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});

			reset();
			
			toast.success('✔ New product added successfully!');
			navigate('/admin/products');
		} catch (err) {
			console.error('❌ Failed to add product:', err);
			toast.error('❌ Failed to add product.');
		}
	};

	return (
		<div className="bg-[#ede3e3cc] min-h-screen py-30 overflow-hidden bg-fixed"
		style={{ backgroundImage: `url(${formPageBg})` }}

		>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="max-w-3xl mx-auto bg-white shadow-md rounded-xl p-8 space-y-6"
			>
				{/* Product Name */}
				<div>
					<label className="block font-medium mb-2 ">Product Name</label>
					<input
						type="text"
						{...register('productName')}
						className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#fdc57b] hover:bg-[#fbf8f8cc]"
					/>
					{errors.productName && (
						<p className="text-red-500 text-sm mt-1">
							{errors.productName.message}
						</p>
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
						className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#fdc57b] hover:bg-[#fbf8f8cc]"
					/>
					{errors.price && (
						<p className="text-red-500 text-sm mt-1">{errors.price.message}</p>
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
				<ImageUploader setValue={setValue} errors={errors} watch={watch} />

				{/* Buttons */}
				<div className="flex gap-4">
					<button
						type="submit"
						disabled={isSubmitting}
						className="bg-[#953733] text-white px-6 py-2 rounded hover:opacity-90 disabled:opacity-50 cursor-pointer"
					>
						Save Product
					</button>
					<button
						type="button"
						onClick={() => navigate('/admin/products')}
						className="bg-gray-300 text-gray-800 px-6 py-2 rounded hover:bg-gray-400 transition cursor-pointer"
					>
						Cancel
					</button>
				</div>
			</form>
		</div>
	);
};

export default ProductForm;
