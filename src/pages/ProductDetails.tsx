import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import useProduct from '../hooks/useProduct';

const ProductDetails = () => {
	const imageAPI = import.meta.env.VITE_IMAGEAPI_URL;

	const { id } = useParams();

	const {
		data: product,
		isLoading,
		error,
	} = useProduct(id);

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
		<section className="max-w-6xl mx-auto px-4 pt-10 pb-70">
			<div className="flex flex-col md:grid md:grid-cols-2 gap-10">
				{/* Bal oszlop: fő kép + thumbnail képek */}
				<div className="flex flex-col items-center md:items-start">
					<div className="w-full max-w-sm md:max-w-full">
						<img
							src={selectedImageUrl}
							alt={product.productName}
							className="w-full h-auto object-contain rounded-xl shadow-md mb-4"
						/>

						<div className="flex gap-4 flex-wrap justify-start">
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
