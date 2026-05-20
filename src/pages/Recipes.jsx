import { useState, useContext, useCallback, lazy, Suspense } from 'react'
import { RecipeContext } from '../context/RecipeContext'
import RecipeListRenderProps from '../components/RecipeListRenderProps'
import RecipeCardCompound from '../components/RecipeCardCompound'
import Filters from '../components/Filters'
import RecipeForm from '../components/RecipeForm'

const LazyRecipeModal = lazy(() => import('../components/RecipeModal'))

export default function Recipes() {
    const { recipes, isLoading, updateRecipe, deleteRecipe, toggleFavorite, incrementLikes } = useContext(RecipeContext)
    const [selectedRecipe, setSelectedRecipe] = useState(null)
    const [showAddModal, setShowAddModal] = useState(false)

    const handleRecipeClick = useCallback((recipe) => {
        setSelectedRecipe(recipe)
    }, [])

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <button
                type="button"
                onClick={() => setShowAddModal(true)}
                className="w-full mb-8 bg-orange-600 hover:bg-orange-700 text-white py-5 rounded-2xl font-medium text-xl flex items-center justify-center gap-3 shadow-lg transition-all active:scale-95"
            >
                Add new recipe
            </button>

            <RecipeListRenderProps recipes={recipes}>
                {({
                    filteredRecipes,
                    searchTerm, setSearchTerm,
                    selectedCategory, setSelectedCategory,
                    sortBy, setSortBy,
                    showFavorites, setShowFavorites
                }) => (
                    <>
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
                                <p className="mt-4 text-lg">Loading recipes...</p>
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

            {selectedRecipe && (
                <Suspense fallback={
                    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
                        <div className="text-white text-xl">Loading recipe...</div>
                    </div>
                }>
                    <LazyRecipeModal
                        recipe={selectedRecipe}
                        onClose={() => setSelectedRecipe(null)}
                        onUpdate={(updated) => {
                            updateRecipe(updated)
                            setSelectedRecipe(updated)
                        }}
                        onDelete={(id) => {
                            deleteRecipe(id)
                            setSelectedRecipe(null)
                        }}
                        onToggleFavorite={toggleFavorite}
                    />
                </Suspense>
            )}

            {showAddModal && (
                <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-3xl w-full max-w-4xl max-h-[92vh] overflow-hidden shadow-2xl flex flex-col">
                        <div className="flex justify-between items-center border-b px-8 py-5">
                            <h2 className="text-2xl font-bold text-orange-600">New recipe</h2>
                            <button
                                type="button"
                                onClick={() => setShowAddModal(false)}
                                className="text-gray-400 hover:text-gray-600 text-xl leading-none"
                            >
                                Close
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
