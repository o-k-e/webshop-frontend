import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

interface DescriptionEditorProps {
	value: string;
	onChange: (value: string) => void;
}

const DescriptionEditor = ({ value, onChange }: DescriptionEditorProps) => {
	const editor = useEditor({
		extensions: [StarterKit], // ne configure-öljük le semmit
		content: value || '<p></p>',
		onUpdate: ({ editor }) => {
			onChange(editor.getHTML());
		},
	});

	if (!editor) return <p>Loading editor...</p>;

	return (
		<div className="space-y-2">
			<label className="block font-medium mb-2">Description</label>

			{/* Toolbar */}
			<div className="flex gap-2 flex-wrap border border-[#fdc57b] rounded-t-md p-2">
				<button
					type="button"
					onClick={() => editor.chain().focus().toggleBold().run()}
					className={editor.isActive('bold') ? 'font-bold text-[#953733]' : ''}
				>
					B
				</button>
				<button
					type="button"
					onClick={() => editor.chain().focus().toggleItalic().run()}
					className={editor.isActive('italic') ? 'italic text-[#953733]' : ''}
				>
					I
				</button>
				<button
					type="button"
					onClick={() => editor.chain().focus().toggleBulletList().run()}
					className={editor.isActive('bulletList') ? 'text-[#953733]' : ''}
				>
					• List
				</button>
				<button
					type="button"
					onClick={() =>
						editor.chain().focus().toggleHeading({ level: 2 }).run()
					}
					className={
						editor.isActive('heading', { level: 2 })
							? 'text-[#953733] font-semibold'
							: ''
					}
				>
					H2
				</button>
				<button
					type="button"
					onClick={() =>
						editor.chain().focus().unsetAllMarks().clearNodes().run()
					}
					className="text-gray-500"
				>
					Clear
				</button>
			</div>

			{/* Editor */}
			<div className="border border-[#fdc57b] rounded-b-md bg-white min-h-[150px]">
				<EditorContent editor={editor} className="p-4 whitespace-pre-wrap" />{' '}
			</div>
		</div>
	);
};

export default DescriptionEditor;
