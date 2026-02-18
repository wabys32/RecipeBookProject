import { useState } from 'react'
import { FiX, FiTrash2, FiHeart, FiEdit, FiSave, FiArrowLeft, FiStar } from 'react-icons/fi'

export default function RecipeModal({
    recipe,
    onClose,
    onUpdate,
    onDelete,
    onToggleFavorite,
}) {
    const [isEditing, setIsEditing] = useState(false)
    const [editedRecipe, setEditedRecipe] = useState({ ...recipe })

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setEditedRecipe((prev) => ({ ...prev, [name]: value }))
    }

    const handleSave = () => {
        // Basic client-side validation (you can expand it)
        if (!editedRecipe.title.trim() || !editedRecipe.instructions.trim()) {
            alert('Название и инструкция обязательны')
            return
        }

        onUpdate({
            ...editedRecipe,
            rating: Number(editedRecipe.rating) || 4.0,
        })
        setIsEditing(false)
    }

    const handleCancel = () => {
        setEditedRecipe({ ...recipe }) // reset to original
        setIsEditing(false)
    }

    return (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-900 rounded-2xl w-full max-w-4xl max-h-[92vh] overflow-y-auto shadow-2xl border border-gray-200 dark:border-gray-700">

                {/* Header bar */}
                <div className="sticky top-0 z-10 bg-white dark:bg-gray-900 px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        {isEditing ? (
                            <>
                                <FiEdit className="text-blue-600 dark:text-blue-400" size={24} />
                                <h2 className="text-xl md:text-2xl font-bold">Редактирование рецепта</h2>
                            </>
                        ) : (
                            <h2 className="text-xl md:text-2xl font-bold truncate max-w-[70vw]">
                                {recipe.title}
                            </h2>
                        )}
                    </div>

                    <button
                        onClick={onClose}
                        className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                        aria-label="Закрыть"
                    >
                        <FiX size={24} />
                    </button>
                </div>

                <div className="p-6 md:p-8">
                    {/* Image */}
                    {recipe.image && (
                        <div className="mb-6 rounded-xl overflow-hidden shadow-md">
                            <img
                                src={recipe.image}
                                alt={recipe.title}
                                className="w-full h-64 md:h-80 object-cover"
                                onError={(e) => {
                                    e.target.src = 'https://images.unsplash.com/photo-1556911220-b0b895fafb40'
                                }}
                            />
                        </div>
                    )}

                    {isEditing ? (
                        /* ── EDIT MODE ── */
                        <div className="space-y-5">
                            <div>
                                <label className="block mb-1.5 font-medium">Название *</label>
                                <input
                                    name="title"
                                    value={editedRecipe.title}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2.5 border rounded-lg dark:bg-gray-800 dark:border-gray-600 focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div>
                                    <label className="block mb-1.5 font-medium">Категория</label>
                                    <select
                                        name="category"
                                        value={editedRecipe.category}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2.5 border rounded-lg dark:bg-gray-800 dark:border-gray-600"
                                    >
                                        <option value="Breakfast">Breakfast</option>
                                        <option value="Main Course">Main Course</option>
                                        <option value="Dessert">Dessert</option>
                                        <option value="Vegetarian">Vegetarian</option>
                                        <option value="Soup">Soup</option>
                                        <option value="Salad">Salad</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block mb-1.5 font-medium">Рейтинг (1–5)</label>
                                    <input
                                        type="number"
                                        name="rating"
                                        min="1"
                                        max="5"
                                        step="0.1"
                                        value={editedRecipe.rating}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2.5 border rounded-lg dark:bg-gray-800 dark:border-gray-600"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block mb-1.5 font-medium">Ссылка на фото</label>
                                <input
                                    name="image"
                                    value={editedRecipe.image || ''}
                                    onChange={handleInputChange}
                                    placeholder="https://..."
                                    className="w-full px-4 py-2.5 border rounded-lg dark:bg-gray-800 dark:border-gray-600"
                                />
                            </div>

                            <div>
                                <label className="block mb-1.5 font-medium">Ингредиенты (каждый с новой строки) *</label>
                                <textarea
                                    name="ingredients"
                                    value={editedRecipe.ingredients}
                                    onChange={handleInputChange}
                                    rows={5}
                                    className="w-full px-4 py-2.5 border rounded-lg dark:bg-gray-800 dark:border-gray-600 whitespace-pre-line"
                                />
                            </div>

                            <div>
                                <label className="block mb-1.5 font-medium">Инструкция *</label>
                                <textarea
                                    name="instructions"
                                    value={editedRecipe.instructions}
                                    onChange={handleInputChange}
                                    rows={7}
                                    className="w-full px-4 py-2.5 border rounded-lg dark:bg-gray-800 dark:border-gray-600 whitespace-pre-line"
                                />
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4 mt-8">
                                <button
                                    onClick={handleSave}
                                    className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-lg font-medium flex items-center justify-center gap-2"
                                >
                                    <FiSave /> Сохранить
                                </button>
                                <button
                                    onClick={handleCancel}
                                    className="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-3 px-6 rounded-lg font-medium flex items-center justify-center gap-2"
                                >
                                    <FiArrowLeft /> Отмена
                                </button>
                            </div>
                        </div>
                    ) : (
                        /* ── VIEW MODE ── */
                        <div className="space-y-6">
                            <div className="flex flex-wrap gap-3">
                                <span className="px-4 py-1.5 bg-orange-100 dark:bg-orange-900/40 text-orange-800 dark:text-orange-300 rounded-full font-medium">
                                    {recipe.category}
                                </span>
                                <span className="px-4 py-1.5 bg-amber-100 dark:bg-amber-900/40 text-amber-800 dark:text-amber-300 rounded-full flex items-center gap-1">
                                    <FiHeart className="fill-current" /> {recipe.likes}
                                </span>
                                <span className="px-4 py-1.5 bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-300 rounded-full flex items-center gap-1">
                                    <FiStar className="fill-current" /> {recipe.rating.toFixed(1)}
                                </span>
                            </div>

                            <div>
                                <h3 className="text-xl font-bold mb-3">Ингредиенты</h3>
                                <div className="bg-gray-50 dark:bg-gray-800/60 p-5 rounded-xl whitespace-pre-line leading-relaxed">
                                    {recipe.ingredients}
                                </div>
                            </div>

                            <div>
                                <h3 className="text-xl font-bold mb-3">Приготовление</h3>
                                <div className="bg-gray-50 dark:bg-gray-800/60 p-5 rounded-xl whitespace-pre-line leading-relaxed">
                                    {recipe.instructions}
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-4 mt-10">
                                <button
                                    onClick={() => setIsEditing(true)}
                                    className="flex-1 min-w-[140px] bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-medium flex items-center justify-center gap-2 transition"
                                >
                                    <FiEdit /> Редактировать
                                </button>

                                <button
                                    onClick={() => onToggleFavorite(recipe.id)}
                                    className={`flex-1 min-w-[140px] py-3 px-6 rounded-lg font-medium flex items-center justify-center gap-2 transition border-2 ${recipe.isFavorite
                                            ? 'border-red-500 text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30'
                                            : 'border-gray-400 hover:border-red-500 hover:text-red-600'
                                        }`}
                                >
                                    <FiHeart className={recipe.isFavorite ? 'fill-red-500' : ''} size={20} />
                                    {recipe.isFavorite ? 'В избранном' : 'В избранное'}
                                </button>

                                <button
                                    onClick={() => {
                                        if (window.confirm('Удалить рецепт навсегда?')) {
                                            onDelete(recipe.id)
                                            onClose()
                                        }
                                    }}
                                    className="flex-1 min-w-[140px] bg-red-600 hover:bg-red-700 text-white py-3 px-6 rounded-lg font-medium flex items-center justify-center gap-2 transition"
                                >
                                    <FiTrash2 /> Удалить
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}