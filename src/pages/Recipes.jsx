import { useState, useContext } from 'react'
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

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <RecipeForm />

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
                    onRecipeClick={setSelectedRecipe}
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
        </div>
    )
}