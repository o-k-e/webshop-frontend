import { motion, AnimatePresence } from 'framer-motion';

interface ConfirmModalProps {
	isOpen: boolean;
	title?: string;
	message: string;
	onConfirm: () => void;
	onCancel: () => void;
}

const ConfirmModal = ({
	isOpen,
	title = 'Confirm',
	message,
	onConfirm,
	onCancel,
}: ConfirmModalProps) => {
	return (
		<AnimatePresence>
			{isOpen && (
				<motion.div
                className="fixed inset-0 bg-black/50 backdrop-blur-[1px] flex items-center justify-center z-50"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
              
					<motion.div
						className="bg-white p-6 rounded-xl shadow-lg max-w-sm w-full"
						initial={{ scale: 0.9 }}
						animate={{ scale: 1 }}
						exit={{ scale: 0.9 }}
					>
						<h2 className="text-lg font-bold mb-4">{title}</h2>
						<p className="text-gray-700 mb-6">{message}</p>
						<div className="flex justify-end gap-3">
							<button
								type="button"
								className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
								onClick={(e) => {
									e.preventDefault();
									e.stopPropagation();
									onConfirm();
								}}
							>
								Delete
							</button>

                            <button
								type="button"
								className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition"
								onClick={(e) => {
									e.preventDefault();
									e.stopPropagation();
									onCancel();
								}}
							>
								Cancel
							</button>
						</div>
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>
	);
};

export default ConfirmModal;
