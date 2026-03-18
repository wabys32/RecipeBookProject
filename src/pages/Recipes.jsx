import { useState, useContext, useCallback } from 'react'
import { RecipeContext } from '../context/RecipeContext'
import RecipeForm from '../components/RecipeForm'
import Filters from '../components/Filters'
import RecipeModal from '../components/RecipeModal'
import PageContent from '../components/PageContent'

export default function Recipes() {
    const { isLoading, updateRecipe, deleteRecipe, toggleFavorite, incrementLikes } = useContext(RecipeContext)

    const [searchTerm, setSearchTerm] = useState('')
    const [selectedCategory, setSelectedCategory] = useState('All')
    const [sortBy, setSortBy] = useState('rating-desc')
    const [showFavorites, setShowFavorites] = useState(false)
    const [selectedRecipe, setSelectedRecipe] = useState(null)
    const [showAddModal, setShowAddModal] = useState(false)

    const handleRecipeClick = useCallback((recipe) => {
        setSelectedRecipe(recipe)
    }, [])

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            {/* Add Recipe Button */}
            <button
                onClick={() => setShowAddModal(true)}
                className="w-full mb-8 bg-orange-600 hover:bg-orange-700 text-white py-5 rounded-2xl font-medium text-xl flex items-center justify-center gap-3 shadow-lg transition-all active:scale-95"
            >
                ➕ Добавить новый рецепт
            </button>

            <Filters
                searchTerm={searchTerm} setSearchTerm={setSearchTerm}
                selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory}
                sortBy={sortBy} setSortBy={setSortBy}
                showFavorites={showFavorites} setShowFavorites={setShowFavorites}
            />

            {isLoading ? (
                <div className="text-center py-20">
                    <div className="animate-spin w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full mx-auto"></div>
                    <p className="mt-4 text-lg">Загружаем рецепты...</p>
                </div>
            ) : (
                <PageContent
                    searchTerm={searchTerm}
                    selectedCategory={selectedCategory}
                    sortBy={sortBy}
                    showFavorites={showFavorites}
                    onRecipeClick={handleRecipeClick}
                />
            )}

            {selectedRecipe && (
                <RecipeModal
                    recipe={selectedRecipe}
                    onClose={() => setSelectedRecipe(null)}
                    onUpdate={(updated) => {
                        updateRecipe(updated)
                        setSelectedRecipe(updated)
                    }}
                    onDelete={deleteRecipe}
                    onToggleFavorite={toggleFavorite}
                />
            )}

            {/* ADD RECIPE MODAL - now wider + scrollable */}
            {showAddModal && (
                <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-3xl w-full max-w-4xl max-h-[92vh] overflow-hidden shadow-2xl flex flex-col">
                        {/* Header */}
                        <div className="flex justify-between items-center border-b px-8 py-5">
                            <h2 className="text-2xl font-bold text-orange-600">Новый рецепт</h2>
                            <button
                                onClick={() => setShowAddModal(false)}
                                className="text-gray-400 hover:text-gray-600 text-3xl leading-none"
                            >
                                ✕
                            </button>
                        </div>

                        {/* Scrollable form area */}
                        <div className="p-8 overflow-y-auto flex-1">
                            <RecipeForm onSuccess={() => setShowAddModal(false)} />
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}