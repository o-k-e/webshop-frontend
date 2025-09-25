import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import DescriptionEditor from './components/new-and-update-product/DescriptionEditor';
import CategorySelectorUpdate from './components/new-and-update-product/CategorySelectorUpdate';
import useCategories from '../../hooks/useCategories';
import apiClient from '../../services/api-client';
import ImageUploaderUpdate from './components/new-and-update-product/ImageUploaderUpdate';

const updateProductSchema = z.object({
	productId: z.number(),
	productName: z.string().min(1, '* Product name is required'),
	description: z.string().min(1, '* Description is required'),
	price: z.number().positive('* Price must be greater than 0'),
	categoryIds: z.array(z.string()).nonempty('* Select at least one category'),
	images: z
		.array(
			z.object({
				id: z.number(),
				url: z.string(),
			})
		)
		.min(1, '* Please upload at least one image'),
});

export type UpdateProductFormData = z.infer<typeof updateProductSchema>;

const ProductUpdateForm = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const { data: categories, isLoading } = useCategories();
	const [loadingProduct, setLoadingProduct] = useState(true);
	const [error, setError] = useState('');

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
		setValue,
		watch,
		reset,
	} = useForm<UpdateProductFormData>({
		resolver: zodResolver(updateProductSchema),
	});

	console.log('📛 Form errors:', errors); // ⬅️ IDE!

	useEffect(() => {
		const fetchProduct = async () => {
			try {
				const response = await apiClient.get(`/products/${id}`);
				const product = response.data;

				console.log('📦 Loaded product:', product);

				reset({
					productId: product.id,
					productName: product.productName,
					description: product.productDescription,
					price: product.price,
					categoryIds: product.categories.map((c: any) => c.id.toString()),
					images: product.images.map((img: any) => ({
						id: img.id,
						url: img.url,
					})),
				});
			} catch (err) {
				setError('Failed to load product.');
			} finally {
				setLoadingProduct(false);
			}
		};

		fetchProduct();
	}, [id, reset]);

	const onSubmit = async (data: UpdateProductFormData) => {
		console.log('✅ onSubmit triggered', data);

		try {
			const token = localStorage.getItem('token');
			if (!token) return;

			const payload = {
				productId: data.productId,
				productName: data.productName,
				productDescription: data.description,
				price: data.price,
				categoryIds: data.categoryIds.map(Number),
				imageFileNames: data.images.map((img) => img.url),
			};

			await apiClient.put(`/products/${id}`, payload, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});

			toast.success('✔ Product updated successfully!');
			navigate('/admin/products');
		} catch (err) {
			console.error('❌ Update failed:', err);
			toast.error('❌ Failed to update product.');
		}
	};

	if (loadingProduct) return <p className="p-6">Loading product...</p>;
	if (error) return <p className="p-6 text-red-500">{error}</p>;

	return (
		<div className="bg-[#ede3e3cc] min-h-screen py-10 overflow-hidden">
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="max-w-3xl mx-auto bg-white shadow-md rounded-xl p-8 space-y-6"
			>
				<div>
					<label className="block font-medium mb-2">Product Name</label>
					<input
						type="text"
						{...register('productName')}
						className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 hover:bg-[#fbf8f8cc]"
					/>
					{errors.productName && (
						<p className="text-red-500 text-sm mt-1">
							{errors.productName.message}
						</p>
					)}
				</div>

				<DescriptionEditor
					value={watch('description')}
					onChange={(val) => setValue('description', val)}
				/>
				{errors.description && (
					<p className="text-red-500 text-sm mt-1">
						{errors.description.message}
					</p>
				)}

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

				{isLoading && <p>Loading categories...</p>}
				{categories && (
					<CategorySelectorUpdate
						categories={categories}
						register={register}
						errors={errors}
					/>
				)}

				<ImageUploaderUpdate
					setValue={setValue}
					errors={errors}
					watch={watch}
				/>

				{/* Buttons */}
				<div className="flex gap-4">
					<button
						type="submit"
						disabled={isSubmitting}
						className="bg-[#953733] text-white px-6 py-2 rounded hover:opacity-90 disabled:opacity-50 cursor-pointer"
					>
						Update Product
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

export default ProductUpdateForm;
