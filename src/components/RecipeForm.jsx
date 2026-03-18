import { useState } from 'react'
import { useContext } from 'react'
import { RecipeContext } from '../context/RecipeContext'

const initialForm = {
    title: '',
    category: 'Breakfast',
    rating: '',
    image: '',
    ingredients: '',
    instructions: '',
    tags: []
}

const categories = ['Breakfast', 'Main Course', 'Dessert', 'Vegetarian', 'Soup', 'Salad']
const possibleTags = ['Quick', 'Healthy', 'Spicy', 'Easy', 'Family', 'Party']

export default function RecipeForm({ onSuccess }) {
    const { addRecipe } = useContext(RecipeContext)
    const [form, setForm] = useState(initialForm)
    const [errors, setErrors] = useState({})

    const validateField = (name, value) => {
        switch (name) {
            case 'title':
                if (!value.trim()) return 'Название обязательно'
                if (value.trim().length < 3) return 'Название слишком короткое (минимум 3 символа)'
                return ''
            case 'rating':
                const num = parseFloat(value)
                if (isNaN(num) || num < 1 || num > 5) return 'Рейтинг должен быть от 1 до 5'
                return ''
            case 'ingredients':
                if (!value.trim()) return 'Ингредиенты обязательны'
                return ''
            case 'instructions':
                if (!value.trim()) return 'Инструкции обязательны'
                return ''
            default:
                return ''
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setForm(prev => ({ ...prev, [name]: value }))
        const errorMsg = validateField(name, value)
        setErrors(prev => ({ ...prev, [name]: errorMsg }))
    }

    const handleTagToggle = (tag) => {
        setForm(prev => {
            const current = prev.tags || []
            const newTags = current.includes(tag)
                ? current.filter(t => t !== tag)
                : [...current, tag]
            return { ...prev, tags: newTags }
        })
    }

    const validate = () => {
        const errs = {}
            ;['title', 'rating', 'ingredients', 'instructions'].forEach(key => {
                errs[key] = validateField(key, form[key])
            })
        return errs
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const validationErrors = validate()
        setErrors(validationErrors)
        if (Object.values(validationErrors).some(err => err !== '')) return

        addRecipe({
            ...form,
            ingredients: form.ingredients.trim(),
            instructions: form.instructions.trim(),
            rating: Number(form.rating),
            tags: form.tags
        })

        setForm(initialForm)
        setErrors({})
        if (onSuccess) onSuccess()
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title - full width */}
            <div>
                <label className="block mb-1.5 font-medium">Название *</label>
                <input name="title" value={form.title} onChange={handleChange}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500" />
                {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
            </div>

            {/* Row 1: Category + Rating */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block mb-1.5 font-medium">Категория</label>
                    <select name="category" value={form.category} onChange={handleChange}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500">
                        {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                    </select>
                </div>

                <div>
                    <label className="block mb-1.5 font-medium">Рейтинг (1–5) *</label>
                    <input type="number" name="rating" min="1" max="5" step="0.1" value={form.rating} onChange={handleChange}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500" />
                    {errors.rating && <p className="text-red-500 text-sm mt-1">{errors.rating}</p>}
                </div>
            </div>

            {/* Image - full width */}
            <div>
                <label className="block mb-1.5 font-medium">Ссылка на фото</label>
                <input name="image" value={form.image} onChange={handleChange} placeholder="https://..."
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500" />
            </div>

            {/* Row 2: Ingredients + Instructions side-by-side */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                    <label className="block mb-1.5 font-medium">Ингредиенты (каждый с новой строки) *</label>
                    <textarea name="ingredients" value={form.ingredients} onChange={handleChange} rows={5}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg whitespace-pre-line focus:ring-2 focus:ring-orange-500" />
                    {errors.ingredients && <p className="text-red-500 text-sm mt-1">{errors.ingredients}</p>}
                </div>

                <div>
                    <label className="block mb-1.5 font-medium">Инструкция *</label>
                    <textarea name="instructions" value={form.instructions} onChange={handleChange} rows={5}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg whitespace-pre-line focus:ring-2 focus:ring-orange-500" />
                    {errors.instructions && <p className="text-red-500 text-sm mt-1">{errors.instructions}</p>}
                </div>
            </div>

            {/* Tags - compact */}
            <div>
                <label className="block mb-1.5 font-medium">Теги (можно несколько)</label>
                <div className="flex flex-wrap gap-4 p-4 border border-gray-300 rounded-lg bg-gray-50">
                    {possibleTags.map(tag => (
                        <label key={tag} className="flex items-center gap-2 cursor-pointer">
                            <input type="checkbox" checked={form.tags.includes(tag)} onChange={() => handleTagToggle(tag)} />
                            <span>{tag}</span>
                        </label>
                    ))}
                </div>
            </div>

            <button type="submit"
                className="w-full bg-orange-600 hover:bg-orange-700 text-white py-4 rounded-xl font-medium text-lg transition">
                Добавить рецепт
            </button>
        </form>
    )
}