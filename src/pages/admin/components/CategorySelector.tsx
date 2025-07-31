import type { Category } from "../../../types/product"
import type { NewProductFormData } from "../ProductForm";
import { type FieldErrors, type UseFormRegister } from "react-hook-form";

interface CategorySelectorProps {
    categories: Category[];
    register: UseFormRegister<NewProductFormData>;
    errors: FieldErrors<NewProductFormData>;
}

const CategorySelector = ({ categories, register, errors }: CategorySelectorProps) => {
    return (
        <div>
            <label className="block font-medium mb-2">Category</label>
            <div className="space-y-2">
                {categories.map(category => (
                    <label key={category.id} className="flex items-center gap-2">
                        <input 
                            type="radio"
                            value={category.id}
                            {...register("categories.0")}
                        />
                        {category.categoryName}
                    </label>
                ))}
            </div>
            {errors.categories && (
                <p className="text-red-500 text-sm">{errors.categories.message}</p>
            )}
        </div>
    );
};

export default CategorySelector;