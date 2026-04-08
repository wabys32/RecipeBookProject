import { useContext } from 'react'
import { RecipeContext } from '../context/RecipeContext'
import { useFilter } from '../hooks/useFilter' 
import RecipeCard from './RecipeCard'
import RecipeCardCompound from './RecipeCardCompound'

export default function PageContent({
    searchTerm, selectedCategory, sortBy, showFavorites, onRecipeClick
}) {
    const { recipes, toggleFavorite, incrementLikes } = useContext(RecipeContext)

    // ===== TASK 3: useFilter custom hook =====
    const filteredRecipes = useFilter(recipes, {
        searchTerm,
        selectedCategory,
        sortBy,
        showFavorites
    })

    if (filteredRecipes.length === 0) {
        return <p className="text-center text-xl py-20 text-gray-500">Рецепты не найдены 😔</p>
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {filteredRecipes.map(recipe => (
                // <RecipeCard
                //     key={recipe.id}
                //     recipe={recipe}
                //     onClick={() => onRecipeClick(recipe)}
                //     onToggleFavorite={toggleFavorite}
                //     onIncrementLikes={incrementLikes}
                // />
                <RecipeCardCompound
                    key={recipe.id}
                    recipe={recipe}
                    onClick={() => onRecipeClick(recipe)}
                >
                    <RecipeCardCompound.Header />
                    <RecipeCardCompound.Body />
                    <RecipeCardCompound.Footer
                        onToggleFavorite={onToggleFavorite}
                        onIncrementLikes={onIncrementLikes}
                    />
                </RecipeCardCompound>
            ))}
        </div>
    )
}