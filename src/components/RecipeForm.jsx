import { useState } from 'react'

const initialForm = {
    title: '',
    category: 'Main Course',
    ingredients: '',
    instructions: '',
    rating: 4.5,
    image: ''
}

export default function RecipeForm({ onAddRecipe }) {
    const [form, setForm] = useState(initialForm)
    const [errors, setErrors] = useState({})

    const handleChange = (e) => {
        const { name, value } = e.target
        setForm(prev => ({ ...prev, [name]: value }))
        if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }))
    }

    const validate = () => {
        const newErrors = {}
        if (!form.title.trim()) newErrors.title = 'Название обязательно'
        if (!form.ingredients.trim()) newErrors.ingredients = 'Ингредиенты обязательны'
        if (!form.instructions.trim()) newErrors.instructions = 'Инструкция обязательна'
        if (form.rating < 1 || form.rating > 5) newErrors.rating = 'Рейтинг от 1 до 5'
        return newErrors
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const validationErrors = validate()
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors)
            return
        }

        onAddRecipe({
            ...form,
            ingredients: form.ingredients.trim(),
            instructions: form.instructions.trim(),
            rating: Number(form.rating)
        })

        setForm(initialForm)
        setErrors({})
    }

    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-bold mb-6">Добавить новый рецепт</h2>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                    <label className="block mb-1 font-medium">Название блюда *</label>
                    <input
                        name="title"
                        value={form.title}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                        placeholder="Например: Шоколадный брауни"
                    />
                    {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
                </div>

                <div>
                    <label className="block mb-1 font-medium">Категория</label>
                    <select
                        name="category"
                        value={form.category}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                    >
                        <option>Main Course</option>
                        <option>Breakfast</option>
                        <option>Dessert</option>
                        <option>Vegetarian</option>
                        <option>Soup</option>
                        <option>Salad</option>
                    </select>
                </div>

                <div>
                    <label className="block mb-1 font-medium">Рейтинг (1–5)</label>
                    <input
                        type="number"
                        name="rating"
                        min="1"
                        max="5"
                        step="0.1"
                        value={form.rating}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                    />
                    {errors.rating && <p className="text-red-500 text-sm mt-1">{errors.rating}</p>}
                </div>

                <div className="md:col-span-2">
                    <label className="block mb-1 font-medium">Ссылка на фото (опционально)</label>
                    <input
                        name="image"
                        value={form.image}
                        onChange={handleChange}
                        placeholder="https://images.unsplash.com/..."
                        className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                    />
                </div>

                <div className="md:col-span-2">
                    <label className="block mb-1 font-medium">Ингредиенты (каждый с новой строки) *</label>
                    <textarea
                        name="ingredients"
                        value={form.ingredients}
                        onChange={handleChange}
                        rows={4}
                        className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                        placeholder="Мука 200 г&#10;Молоко 300 мл&#10;Яйца 2 шт."
                    />
                    {errors.ingredients && <p className="text-red-500 text-sm mt-1">{errors.ingredients}</p>}
                </div>

                <div className="md:col-span-2">
                    <label className="block mb-1 font-medium">Инструкция приготовления *</label>
                    <textarea
                        name="instructions"
                        value={form.instructions}
                        onChange={handleChange}
                        rows={5}
                        className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                        placeholder="Смешать все ингредиенты...&#10;Выпекать 25 минут при 180°C..."
                    />
                    {errors.instructions && <p className="text-red-500 text-sm mt-1">{errors.instructions}</p>}
                </div>

                <div className="md:col-span-2">
                    <button
                        type="submit"
                        className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-6 rounded-lg transition shadow-md"
                    >
                        Добавить рецепт
                    </button>
                </div>
            </form>
        </div>
    )
}