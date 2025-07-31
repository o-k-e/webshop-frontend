import {
	type FieldErrors,
	type UseFormSetValue,
	type UseFormWatch,
} from 'react-hook-form';
import type { NewProductFormData } from '../ProductForm';
import { useState, type ChangeEvent } from 'react';
import apiClient from '../../../services/api-client';

interface ImageUploaderProps {
	setValue: UseFormSetValue<NewProductFormData>;
	errors: FieldErrors<NewProductFormData>;
	watch: UseFormWatch<NewProductFormData>;
}

const ImageUploader = ({ setValue, errors, watch }: ImageUploaderProps) => {
	const [selectedFile, setSelectedFile] = useState<File | null>(null);
	const [previewUrl, setPreviewUrl] = useState<string | null>(null);
	const [isUploading, setIsUploading] = useState(false);

	const uploadedImage = watch('images')?.[0];

	const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			setSelectedFile(file);
			setPreviewUrl(URL.createObjectURL(file)); // előnézet feltöltés előtt
		}
	};

	const handleUpload = async () => {
		if (!selectedFile) return;
		setIsUploading(true);

		const reader = new FileReader();
		reader.onloadend = async () => {
			const base64 = reader.result?.toString().split(',')[1];
			if (!base64) return;

			try {
				const response = await apiClient.post('/upload-image', {
					filename: selectedFile.name,
					base64: base64,
				});
				const uploadedFilename = response.data.filename;
				setValue('images', [uploadedFilename]); // backend nev kerül a formState-be
				setPreviewUrl(import.meta.env.VITE_IMAGEAPI_URL + uploadedFilename);
				console.log('Upload response:', response);
			} catch (error) {
				console.error('Image upload failed:', error);
			} finally {
				setIsUploading(false);
			}
		};
		reader.readAsDataURL(selectedFile);
	};

	return (
		<div>
			<label htmlFor="imageUpload" className="block font-medium mb-2">
				Upload Image
			</label>
			<input
				id="imageUpload"
				type="file"
				accept="image/*"
				onChange={handleFileChange}
				className="input"
			/>

			{previewUrl && (
				<img
					src={previewUrl}
					alt="Preview"
					className="mt-4 max-w-xs rounded shadow"
				/>
			)}

			<button
				type="button"
				onClick={handleUpload}
				disabled={!selectedFile || isUploading}
				className="mt-2 bg-[#953733] text-white px-4 py-2 rounded hover:opacity-90 disabled:opacity-50"
			>
				{isUploading ? 'Uploading...' : 'Upload'}
			</button>

			{errors.images && (
				<p className="text-red-500 text-sm mt-1">{errors.images.message}</p>
			)}
		</div>
	);
};

export default ImageUploader;