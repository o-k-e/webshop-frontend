import { BsTrash } from 'react-icons/bs';
import {
	type FieldErrors,
	type UseFormSetValue,
	type UseFormWatch,
} from 'react-hook-form';
import { useRef, useState, type ChangeEvent, type DragEvent } from 'react';
import fileUploaderClient from '../../../../services/file-uploader-client';
import type { UpdateProductFormData } from '../../ProductUpdateForm';
import { toast } from 'react-hot-toast';
import ConfirmModal from './ConfirmModal';

type UploadedImage = {
	id: number; // local id, only used on frontend for rendering / delete logic
	url: string;
};

interface ImageUploaderProps {
	setValue: UseFormSetValue<UpdateProductFormData>;
	errors: FieldErrors<UpdateProductFormData>;
	watch: UseFormWatch<UpdateProductFormData>;
}

const ImageUploaderUpdate = ({
	setValue,
	errors,
	watch,
}: ImageUploaderProps) => {
	const api = import.meta.env.VITE_IMAGEAPI_URL;
	const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
	const [previewUrls, setPreviewUrls] = useState<string[]>([]);
	const [isUploading, setIsUploading] = useState(false);
	const [confirmingImageId, setConfirmingImageId] = useState<number | null>(
		null
	);

	const watchedImages = watch('images') ?? [];
	const uploadedImages: UploadedImage[] = [...watchedImages];
	const fileInputRef = useRef<HTMLInputElement | null>(null);

	const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
		const files = e.target.files;
		if (files) {
			const fileArray = Array.from(files);
			setSelectedFiles(fileArray);
			setPreviewUrls(fileArray.map((file) => URL.createObjectURL(file)));
		}
	};

	const handleDrop = (e: DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		const files = e.dataTransfer.files;
		if (files) {
			const fileArray = Array.from(files);
			setSelectedFiles(fileArray);
			setPreviewUrls(fileArray.map((file) => URL.createObjectURL(file)));
		}
	};

	const handleUpload = async () => {
		if (selectedFiles.length === 0) return;
		setIsUploading(true);

		const uploadedFilenames: string[] = [];
		const failedFilenames: string[] = [];

		for (const file of selectedFiles) {
			const reader = new FileReader();

			const fileBase64 = await new Promise<string | null>((resolve) => {
				reader.onloadend = () => {
					const base64 = reader.result?.toString().split(',')[1] || null;
					resolve(base64);
				};
				reader.readAsDataURL(file);
			});

			if (!fileBase64) {
				failedFilenames.push(file.name);
				continue;
			}

			try {
				const response = await fileUploaderClient.post('/upload-image', {
					filename: file.name,
					base64: fileBase64,
				});
				uploadedFilenames.push(response.data.filename);
			} catch (error) {
				console.error('Upload failed for', file.name, error);
				failedFilenames.push(file.name);
			}
		}

		if (uploadedFilenames.length > 0) {
			const newImages: UploadedImage[] = uploadedFilenames.map(
				(url, index) => ({
					id: Date.now() + index,
					url,
				})
			);

			setValue('images', [...uploadedImages, ...newImages], {
				shouldValidate: true,
				shouldDirty: true,
			});
			toast.success(`${uploadedFilenames.length} images uploaded successfully`);
		}

		if (failedFilenames.length > 0) {
			toast.error(`${failedFilenames.length} images failed`);
		}

		setIsUploading(false);
		setSelectedFiles([]);
		setPreviewUrls([]);
	};

	const handleDelete = async (imageId: number) => {
		console.log('Trying to delete image with ID:', imageId);
		try {
			await fileUploaderClient.delete(`/images/${imageId}`);
			const updatedImages = uploadedImages.filter((img) => img.id !== imageId);
			setValue('images', updatedImages, {
				shouldValidate: true,
				shouldDirty: true,
			});
			toast.success('Image deleted successfully!');
		} catch (error) {
			console.error('Failed to delete image:', error);
			toast.error('Failed to delete image');
		}
	};

	return (
		<div className="space-y-2">
			<label className="block font-medium mb-2">Images</label>

			<div
				onDrop={handleDrop}
				onDragOver={(e) => e.preventDefault()}
				onClick={() => fileInputRef.current?.click()}
				className="w-full border-2 border-dashed border-gray-300 bg-white p-6 rounded-xl text-center cursor-pointer hover:bg-[#fbf8f8cc] focus:outline-none focus:ring-2 hover:border-[#953733cc] transition"
			>
				<p className="text-gray-500">
					Drag & drop images here, or click to select
				</p>
				<input
					type="file"
					multiple
					accept="image/*"
					onChange={handleFileChange}
					ref={fileInputRef}
					className="hidden"
				/>
			</div>

			{previewUrls.length > 0 && (
				<div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4">
					{previewUrls.map((url, i) => (
						<img
							key={i}
							src={url}
							alt={`Preview ${i}`}
							className="rounded shadow-md max-h-40 object-cover"
						/>
					))}
				</div>
			)}

			<p className="block font-medium mb-2 mt-6">Already existing images</p>

			{uploadedImages.length > 0 && (
				<div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4">
					{uploadedImages.map((img, i) => (
						<div key={img.id} className="relative">
							<img
								src={`${api}${img.url}`}
								alt={`Uploaded product image ${i}`}
								className="rounded shadow-md max-h-40 object-cover w-full"
							/>
							<button
								type="button"
								onClick={() => setConfirmingImageId(img.id)}
								className="absolute top-1 right-1 bg-white rounded-full w-9 h-9 border-2 border-gray-600 flex items-center justify-center shadow cursor-pointer hover:font-bold hover:bg-red-700 hover:border-red-700 hover:text-white"
							>
								<BsTrash size={20} />
							</button>
						</div>
					))}
				</div>
			)}

			{selectedFiles.length > 0 && !isUploading && (
				<button
					type="button"
					onClick={handleUpload}
					className="mt-4 bg-[#953733] text-white px-4 py-2 cursor-pointer rounded hover:opacity-90"
				>
					Upload
				</button>
			)}

			{errors.images && (
				<p className="text-red-500 text-sm mt-1">{errors.images.message}</p>
			)}

			<ConfirmModal
				isOpen={confirmingImageId !== null}
				title="Delete Image"
				message="Are you sure you want to delete this image? This action cannot be undone."
				onConfirm={() => {
					if (confirmingImageId !== null) handleDelete(confirmingImageId);
					setConfirmingImageId(null);
				}}
				onCancel={() => setConfirmingImageId(null)}
			/>
		</div>
	);
};

export default ImageUploaderUpdate;
