import { useState, useContext, useCallback, lazy, Suspense } from 'react'
import { RecipeContext } from '../context/RecipeContext'

// Render Props (Задача 1)
import RecipeListRenderProps from '../components/RecipeListRenderProps'

// Compound Card (Задача 3)
import RecipeCardCompound from '../components/RecipeCardCompound'

// Фильтры (ваш существующий компонент)
import Filters from '../components/Filters'

// Ленивая модалка (Задача 5)
const LazyRecipeModal = lazy(() => import('../components/RecipeModal'))

// Форма добавления
import RecipeForm from '../components/RecipeForm'

export default function Recipes() {
    const { recipes, isLoading, toggleFavorite, incrementLikes } = useContext(RecipeContext)

    const [selectedRecipe, setSelectedRecipe] = useState(null)
    const [showAddModal, setShowAddModal] = useState(false)

    const handleRecipeClick = useCallback((recipe) => {
        setSelectedRecipe(recipe)
    }, [])

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            {/* Кнопка добавления рецепта */}
            <button
                onClick={() => setShowAddModal(true)}
                className="w-full mb-8 bg-orange-600 hover:bg-orange-700 text-white py-5 rounded-2xl font-medium text-xl flex items-center justify-center gap-3 shadow-lg transition-all active:scale-95"
            >
                ➕ Добавить новый рецепт
            </button>

            {/* ===== TASK 1: RENDER PROPS ===== */}
            <RecipeListRenderProps recipes={recipes}>
                {({
                    filteredRecipes,
                    searchTerm, setSearchTerm,
                    selectedCategory, setSelectedCategory,
                    sortBy, setSortBy,
                    showFavorites, setShowFavorites
                }) => (
                    <>
                        {/* Фильтры */}
                        <Filters
                            searchTerm={searchTerm}
                            setSearchTerm={setSearchTerm}
                            selectedCategory={selectedCategory}
                            setSelectedCategory={setSelectedCategory}
                            sortBy={sortBy}
                            setSortBy={setSortBy}
                            showFavorites={showFavorites}
                            setShowFavorites={setShowFavorites}
                        />

                        {isLoading ? (
                            <div className="text-center py-20">
                                <div className="animate-spin w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full mx-auto"></div>
                                <p className="mt-4 text-lg">Загружаем рецепты...</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                                {filteredRecipes.map(recipe => (
                                    <RecipeCardCompound
                                        key={recipe.id}
                                        recipe={recipe}
                                        onClick={() => handleRecipeClick(recipe)}
                                    >
                                        <RecipeCardCompound.Header />
                                        <RecipeCardCompound.Body />
                                        <RecipeCardCompound.Footer
                                            onToggleFavorite={toggleFavorite}
                                            onIncrementLikes={incrementLikes}
                                        />
                                    </RecipeCardCompound>
                                ))}
                            </div>
                        )}
                    </>
                )}
            </RecipeListRenderProps>

            {/* ===== TASK 5: LAZY MODAL ===== */}
            {selectedRecipe && (
                <Suspense fallback={
                    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
                        <div className="text-white text-xl">Загрузка рецепта...</div>
                    </div>
                }>
                    <LazyRecipeModal
                        recipe={selectedRecipe}
                        onClose={() => setSelectedRecipe(null)}
                        onUpdate={(updated) => setSelectedRecipe(updated)}
                        onDelete={() => setSelectedRecipe(null)}
                        onToggleFavorite={toggleFavorite}
                    />
                </Suspense>
            )}

            {/* Модалка добавления рецепта */}
            {showAddModal && (
                <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-3xl w-full max-w-4xl max-h-[92vh] overflow-hidden shadow-2xl flex flex-col">
                        <div className="flex justify-between items-center border-b px-8 py-5">
                            <h2 className="text-2xl font-bold text-orange-600">Новый рецепт</h2>
                            <button
                                onClick={() => setShowAddModal(false)}
                                className="text-gray-400 hover:text-gray-600 text-3xl leading-none"
                            >
                                ✕
                            </button>
                        </div>

                        <div className="p-8 overflow-y-auto flex-1">
                            <RecipeForm onSuccess={() => setShowAddModal(false)} />
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}