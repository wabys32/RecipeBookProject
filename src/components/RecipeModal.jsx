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
        if (!editedRecipe.title.trim() || !editedRecipe.instructions.trim()) {
            alert('Title and instructions are required')
            return
        }

        onUpdate({
            ...editedRecipe,
            rating: Number(editedRecipe.rating) || 4.0,
        })
        setIsEditing(false)
    }

    const handleCancel = () => {
        setEditedRecipe({ ...recipe })
        setIsEditing(false)
    }

    const handleToggleFavorite = () => {
        const nextRecipe = { ...editedRecipe, isFavorite: !editedRecipe.isFavorite }
        setEditedRecipe(nextRecipe)
        onToggleFavorite(recipe.id)
    }

    return (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[92vh] overflow-y-auto shadow-2xl border border-gray-200">
                <div className="sticky top-0 z-10 bg-white px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        {isEditing ? (
                            <>
                                <FiEdit className="text-blue-600" size={24} />
                                <h2 className="text-xl md:text-2xl font-bold">Edit recipe</h2>
                            </>
                        ) : (
                            <h2 className="text-xl md:text-2xl font-bold truncate max-w-[70vw]">
                                {editedRecipe.title}
                            </h2>
                        )}
                    </div>

                    <button
                        type="button"
                        aria-label="Close recipe"
                        onClick={onClose}
                        className="p-2 rounded-full hover:bg-gray-100 transition"
                    >
                        <FiX size={24} />
                    </button>
                </div>

                <div className="p-6 md:p-8">
                    {editedRecipe.image && (
                        <div className="mb-6 rounded-xl overflow-hidden shadow-md">
                            <img
                                src={editedRecipe.image}
                                alt={editedRecipe.title}
                                className="w-full h-64 md:h-80 object-cover"
                                onError={(e) => {
                                    e.target.src = 'https://images.unsplash.com/photo-1556911220-b0b895fafb40'
                                }}
                            />
                        </div>
                    )}

                    {isEditing ? (
                        <div className="space-y-5">
                            <input
                                name="title"
                                value={editedRecipe.title}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500"
                            />

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <select
                                    name="category"
                                    value={editedRecipe.category}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2.5 border rounded-lg"
                                >
                                    <option>Breakfast</option>
                                    <option>Main Course</option>
                                    <option>Dessert</option>
                                    <option>Vegetarian</option>
                                    <option>Soup</option>
                                    <option>Salad</option>
                                </select>

                                <input
                                    type="number"
                                    name="rating"
                                    min="1"
                                    max="5"
                                    step="0.1"
                                    value={editedRecipe.rating}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2.5 border rounded-lg"
                                />
                            </div>

                            <input
                                name="image"
                                value={editedRecipe.image || ''}
                                onChange={handleInputChange}
                                placeholder="https://..."
                                className="w-full px-4 py-2.5 border rounded-lg"
                            />

                            <textarea
                                name="ingredients"
                                value={editedRecipe.ingredients}
                                onChange={handleInputChange}
                                rows={5}
                                className="w-full px-4 py-2.5 border rounded-lg whitespace-pre-line"
                            />

                            <textarea
                                name="instructions"
                                value={editedRecipe.instructions}
                                onChange={handleInputChange}
                                rows={7}
                                className="w-full px-4 py-2.5 border rounded-lg whitespace-pre-line"
                            />

                            <div className="flex gap-4 mt-8">
                                <button
                                    type="button"
                                    onClick={handleSave}
                                    className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg flex items-center justify-center gap-2"
                                >
                                    <FiSave /> Save
                                </button>
                                <button
                                    type="button"
                                    onClick={handleCancel}
                                    className="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-3 rounded-lg flex items-center justify-center gap-2"
                                >
                                    <FiArrowLeft /> Cancel
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            <div className="flex flex-wrap gap-3">
                                <span className="px-4 py-1.5 bg-orange-100 text-orange-800 rounded-full">
                                    {editedRecipe.category}
                                </span>
                                <span className="px-4 py-1.5 bg-amber-100 text-amber-800 rounded-full flex items-center gap-1">
                                    <FiHeart className="fill-current" /> {editedRecipe.likes}
                                </span>
                                <span className="px-4 py-1.5 bg-blue-100 text-blue-800 rounded-full flex items-center gap-1">
                                    <FiStar className="fill-current" />
                                    {Number(editedRecipe.rating).toFixed(1)}
                                </span>
                            </div>

                            <div className="bg-gray-50 p-5 rounded-xl whitespace-pre-line">
                                {editedRecipe.ingredients}
                            </div>

                            <div className="bg-gray-50 p-5 rounded-xl whitespace-pre-line">
                                {editedRecipe.instructions}
                            </div>

                            <div className="flex flex-wrap gap-4 mt-10">
                                <button
                                    type="button"
                                    onClick={() => setIsEditing(true)}
                                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg flex items-center justify-center gap-2"
                                >
                                    <FiEdit /> Edit
                                </button>

                                <button
                                    type="button"
                                    onClick={handleToggleFavorite}
                                    className={`flex-1 py-3 rounded-lg flex items-center justify-center gap-2 border-2 ${editedRecipe.isFavorite
                                        ? 'border-red-500 text-red-600 hover:bg-red-50'
                                        : 'border-gray-400 hover:border-red-500 hover:text-red-600'
                                        }`}
                                >
                                    <FiHeart className={editedRecipe.isFavorite ? 'fill-red-500' : ''} />
                                    {editedRecipe.isFavorite ? 'Favorite' : 'Add to favorites'}
                                </button>

                                <button
                                    type="button"
                                    onClick={() => {
                                        if (window.confirm('Delete this recipe permanently?')) {
                                            onDelete(recipe.id)
                                            onClose()
                                        }
                                    }}
                                    className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg flex items-center justify-center gap-2"
                                >
                                    <FiTrash2 /> Delete
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
