import { useState } from 'react'
import { FiX, FiTrash2, FiHeart } from 'react-icons/fi'

export default function RecipeModal({ recipe, onClose, onUpdate, onDelete }) {
    const [isEditing, setIsEditing] = useState(false)
    const [edited, setEdited] = useState({ ...recipe })

    const handleChange = (e) => {
        const { name, value } = e.target
        setEdited(prev => ({ ...prev, [name]: value }))
    }

    const saveChanges = () => {
        onUpdate(edited)
        setIsEditing(false)
    }

    return (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
                <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4 flex justify-between items-center z-10">
                    <h2 className="text-2xl font-bold">
                        {isEditing ? 'Редактирование рецепта' : recipe.title}
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition"
                    >
                        <FiX size={24} />
                    </button>
                </div>

                <div className="p-6">
                    {recipe.image && (
                        <img
                            src={recipe.image}
                            alt={recipe.title}
                            className="w-full h-64 object-cover rounded-xl mb-6"
                            onError={e => { e.target.style.display = 'none' }}
                        />
                    )}

                    {isEditing ? (
                        <div className="space-y-4">
                            <div>
                                <label className="block mb-1 font-medium">Название</label>
                                <input
                                    name="title"
                                    value={edited.title}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                                />
                            </div>

                            <div>
                                <label className="block mb-1 font-medium">Категория</label>
                                <select
                                    name="category"
                                    value={edited.category}
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
                                    value={edited.rating}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                                />
                            </div>

                            <div>
                                <label className="block mb-1 font-medium">Ссылка на фото</label>
                                <input
                                    name="image"
                                    value={edited.image}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                                />
                            </div>

                            <div>
                                <label className="block mb-1 font-medium">Ингредиенты</label>
                                <textarea
                                    name="ingredients"
                                    value={edited.ingredients}
                                    onChange={handleChange}
                                    rows={6}
                                    className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                                />
                            </div>

                            <div>
                                <label className="block mb-1 font-medium">Инструкция</label>
                                <textarea
                                    name="instructions"
                                    value={edited.instructions}
                                    onChange={handleChange}
                                    rows={8}
                                    className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                                />
                            </div>

                            <div className="flex gap-4 mt-6">
                                <button
                                    onClick={saveChanges}
                                    className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-lg font-bold"
                                >
                                    Сохранить изменения
                                </button>
                                <button
                                    onClick={() => setIsEditing(false)}
                                    className="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-3 px-6 rounded-lg font-bold"
                                >
                                    Отмена
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            <div className="flex flex-wrap gap-3">
                                <span className="px-4 py-1.5 bg-orange-100 dark:bg-orange-900/40 text-orange-800 dark:text-orange-300 rounded-full">
                                    {recipe.category}
                                </span>
                                <div className="flex items-center gap-1 px-4 py-1.5 bg-amber-100 dark:bg-amber-900/40 text-amber-800 dark:text-amber-300 rounded-full">
                                    <FiStar className="fill-current" /> {recipe.rating.toFixed(1)}
                                </div>
                                <div className="flex items-center gap-1 px-4 py-1.5 bg-gray-100 dark:bg-gray-700 rounded-full">
                                    Лайков: {recipe.likes}
                                </div>
                            </div>

                            <div>
                                <h3 className="font-bold text-xl mb-3">Ингредиенты</h3>
                                <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg whitespace-pre-line">
                                    {recipe.ingredients}
                                </div>
                            </div>

                            <div>
                                <h3 className="font-bold text-xl mb-3">Приготовление</h3>
                                <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg whitespace-pre-line">
                                    {recipe.instructions}
                                </div>
                            </div>

                            <div className="flex gap-4 mt-8">
                                <button
                                    onClick={() => setIsEditing(true)}
                                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-bold transition"
                                >
                                    Редактировать
                                </button>

                                <button
                                    onClick={() => onDelete(recipe.id)}
                                    className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white py-3 px-6 rounded-lg font-bold transition"
                                >
                                    <FiTrash2 /> Удалить
                                </button>

                                <button
                                    onClick={() => onToggleFavorite(recipe.id)}
                                    className={`flex items-center gap-2 py-3 px-6 rounded-lg font-bold transition border-2 ${recipe.isFavorite
                                            ? 'border-red-500 text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30'
                                            : 'border-gray-400 hover:border-red-500 hover:text-red-500'
                                        }`}
                                >
                                    <FiHeart className={recipe.isFavorite ? 'fill-red-500' : ''} />
                                    {recipe.isFavorite ? 'В избранном' : 'В избранное'}
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}