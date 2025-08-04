import { Editor } from '@tinymce/tinymce-react';
import { useRef } from 'react';

interface DescriptionEditorProps {
	value: string;
	onChange: (value: string) => void;
}

const DescriptionEditor = ({ value, onChange }: DescriptionEditorProps) => {
	const editorRef = useRef<any>(null);

	return (
		<div className="space-y-2">
			<label className="block font-medium mb-2">Description</label>

			<Editor
				apiKey={import.meta.env.VITE_TINYMCE_API_KEY}
				value={value}
				onEditorChange={(newValue) => onChange(newValue)}
				init={{
					height: 300,
					menubar: false,
					plugins: [
						'lists',
						'link',
						'paste',
						'help',
						'code',
						'media',
					],
					toolbar:
						'undo redo | formatselect | bold italic | bullist numlist | outdent indent | media | removeformat | help',
					content_style:
						'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
				}}
			/>
		</div>
	);
};

export default DescriptionEditor;