import { useContext, useMemo } from 'react'
import { RecipeContext } from '../context/RecipeContext'
import RecipeCard from './RecipeCard'

export default function PageContent({
    searchTerm,
    selectedCategory,
    sortBy,
    showFavorites,
    onRecipeClick
}) {
    const { recipes, toggleFavorite, incrementLikes } = useContext(RecipeContext)

    const filteredRecipes = useMemo(() => {
        let filtered = recipes.filter(recipe => {
            const matchesSearch = recipe.title.toLowerCase().includes(searchTerm.toLowerCase())
            const matchesCategory = selectedCategory === 'All' || recipe.category === selectedCategory
            const matchesFavorite = !showFavorites || recipe.isFavorite
            return matchesSearch && matchesCategory && matchesFavorite
        })

        filtered.sort((a, b) => {
            if (sortBy === 'name-asc') return a.title.localeCompare(b.title)
            if (sortBy === 'name-desc') return b.title.localeCompare(a.title)
            if (sortBy === 'rating-desc') return b.rating - a.rating
            if (sortBy === 'rating-asc') return a.rating - b.rating
            return 0
        })

        return filtered
    }, [recipes, searchTerm, selectedCategory, sortBy, showFavorites])

    if (filteredRecipes.length === 0) {
        return <p className="text-center text-xl py-20 text-gray-500">Рецепты не найдены 😔</p>
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {filteredRecipes.map(recipe => (
                <RecipeCard
                    key={recipe.id}
                    recipe={recipe}
                    onClick={() => onRecipeClick(recipe)}
                    onToggleFavorite={toggleFavorite}
                    onIncrementLikes={incrementLikes}
                />
            ))}
        </div>
    )
}