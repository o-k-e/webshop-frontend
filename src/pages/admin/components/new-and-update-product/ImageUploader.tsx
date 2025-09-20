import {
	type FieldErrors,
	type UseFormSetValue,
	type UseFormWatch,
} from 'react-hook-form';
import type { NewProductFormData } from '../../ProductForm';
import { useRef, useState, type ChangeEvent, type DragEvent } from 'react';
import fileUploaderClient from '../../../../services/file-uploader-client';
import { toast } from 'react-hot-toast';

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
			setValue('imageFileNames', [...uploadedImages, ...uploadedFilenames]);
			toast.success(`${uploadedFilenames.length} images uploaded successfully`);
		}

		if (failedFilenames.length > 0) {
			toast.error(`Failed to upload ${failedFilenames.length} images`);
		}

		setIsUploading(false);
	};

	return (
		<div className="space-y-2">
			<label className="block font-medium mb-2">Images</label>

			<div
				onDrop={handleDrop}
				onDragOver={(e) => e.preventDefault()}
				onClick={() => fileInputRef.current?.click()}
				className="w-full border-2 border-dashed border-gray-300 bg-white p-6 rounded-xl text-center cursor-pointer hover:bg-[#fff4eb] transition"
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

			<button
				type="button"
				onClick={handleUpload}
				disabled={selectedFiles.length === 0 || isUploading}
				className="mt-4 bg-[#953733] text-white px-4 py-2 rounded hover:opacity-90 disabled:opacity-50"
			>
				{isUploading ? 'Uploading...' : 'Upload'}
			</button>

			{errors.imageFileNames && (
				<p className="text-red-500 text-sm mt-1">
					{errors.imageFileNames.message}
				</p>
			)}
		</div>
	);
};

export default ImageUploader;
