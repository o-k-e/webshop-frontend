import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import apiClient from '../services/api-client';
import type { Product } from '../types/product';
import DOMPurify from 'dompurify';
import { useEffect, useState } from 'react';

const ProductDetails = () => {
	const imageAPI = import.meta.env.VITE_IMAGEAPI_URL;
	const { id } = useParams();

	const {
		data: product,
		isLoading,
		error,
	} = useQuery<Product>({
		queryKey: ['product', id],
		queryFn: () => apiClient.get(`/products/${id}`).then((res) => res.data),
		enabled: !!id,
	});

	const [selectedImageUrl, setSelectedImageUrl] = useState(
		imageAPI + product?.images[0]?.url
	);

  useEffect(() => {
		if (product && product.images?.[0]) {
			setSelectedImageUrl(imageAPI + product.images[0].url);
		}
	}, [product, imageAPI]);

	if (isLoading) return <p className="p-6">Loading product...</p>;
	if (error) return <p className="p-6 text-red-600">Error loading product.</p>;
	if (!product) return <p className="p-6">Product not found.</p>;

	return (
		<section className="max-w-6xl mx-auto px-4 py-10">
			<div className="grid grid-cols-1 md:grid-cols-2 gap-10">
				{/* Bal oszlop: képek */}
				<div>
					<img
						src={selectedImageUrl}
						alt={product.productName}
						className="w-full h-auto object-contain rounded-xl shadow-md mb-4"
					/>

					{/* Kis képek alul */}
					<div className="flex gap-4">
						{product.images.map((img) => (
							<img
								key={img.id}
								src={imageAPI + img.url}
								alt={`Product image ${img.id + 1}`}
								className={`w-20 h-20 object-cover rounded-lg cursor-pointer border transition ${
									selectedImageUrl === imageAPI + img.url
										? 'border-[#cf6b59]'
										: 'border-gray-300 hover:border-[#cf6b59]'
								}`}
								onClick={() => setSelectedImageUrl(imageAPI + img.url)}
							/>
						))}
					</div>
				</div>

				{/* Jobb oszlop: szöveg */}
				<div>
					<h1 className="text-2xl font-bold mb-2">{product.productName}</h1>
					<p className="text-xl font-semibold text-[#230e5f] mb-4">
						{product.price} Ft
					</p>

					<div
						className="text-gray-800 text-sm leading-relaxed [&_h4]:text-lg [&_h4]:font-semibold [&_ul]:list-disc [&_ul]:ml-5 [&_li]:mb-1 [&_br]:block [&_br]:mt-2"
						dangerouslySetInnerHTML={{ __html: product.productDescription }}
					/>
				</div>
			</div>
		</section>
	);
};

export default ProductDetails;
