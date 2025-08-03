import {
	type FieldErrors,
	type UseFormSetValue,
	type UseFormWatch,
} from 'react-hook-form';
import type { NewProductFormData } from '../ProductForm';
import { useState, type ChangeEvent } from 'react';
import fileUploaderClient from '../../../services/file-uploader-client';

interface ImageUploaderProps {
	setValue: UseFormSetValue<NewProductFormData>;
	errors: FieldErrors<NewProductFormData>;
	watch: UseFormWatch<NewProductFormData>;
}

const ImageUploader = ({ setValue, errors, watch }: ImageUploaderProps) => {
	const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
	const [previewUrls, setPreviewUrls] = useState<string[]>([]);
	const [isUploading, setIsUploading] = useState(false);

	const uploadedImages = watch('imageFileNames') || [];

	const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
		const files = e.target.files;
		if (files) {
			const fileArray = Array.from(files);
			setSelectedFiles(fileArray);
			setPreviewUrls(fileArray.map(file => URL.createObjectURL(file))); // előnézet feltöltés előtt
		}
	};

	const handleUpload = async () => {
		if (selectedFiles.length === 0) return;
		setIsUploading(true);

		const uploadedFilenames: string[] = [];

		for (const file of selectedFiles) {
			const reader = new FileReader();

			const fileBase64 = await new Promise<string | null>((resolve) => {
				reader.onloadend = () => {
					const base64 = reader.result?.toString().split(',')[1] || null;
					resolve(base64);
				};
				reader.readAsDataURL(file);
			});

			if (!fileBase64) continue;

			try {
				const response = await fileUploaderClient.post('/upload-image', {
					filename: file.name,
					base64: fileBase64,
				});
				uploadedFilenames.push(response.data.filename);
			} catch (error) {
				console.error('Upload failed for', file.name, error);
			}
		}

		if (uploadedFilenames.length > 0) {
			setValue('imageFileNames', [...uploadedImages, ...uploadedFilenames]);
		}

		setIsUploading(false);
	};

	return (
		<div>
			<label htmlFor="imageUpload" className="block font-medium mb-2">
				Upload Images
			</label>
			<input
				id="imageUpload"
				type="file"
				accept="image/*"
				multiple
				onChange={handleFileChange}
				className="input"
			/>

			{/* Preview all selected images */}
			{previewUrls.length > 0 && (
				<div className="flex gap-2 mt-4 flex-wrap">
					{previewUrls.map((url, index) => (
						<img
							key={index}
							src={url}
							alt={`Preview ${index}`}
							className="max-w-[120px] rounded shadow"
						/>
					))}
				</div>
			)}

			<button
				type="button"
				onClick={handleUpload}
				disabled={selectedFiles.length === 0 || isUploading}
				className="mt-2 bg-[#953733] text-white px-4 py-2 rounded hover:opacity-90 disabled:opacity-50"
			>
				{isUploading ? 'Uploading...' : 'Upload'}
			</button>

			{/* Validation error */}
			{errors.imageFileNames && (
				<p className="text-red-500 text-sm mt-1">{errors.imageFileNames.message}</p>
			)}
		</div>
	);
};

export default ImageUploader;