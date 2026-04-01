import { useMemo } from 'react'

export const useFilter = (recipes, { searchTerm = '', selectedCategory = 'All', sortBy = 'rating-desc', showFavorites = false }) => {
    return useMemo(() => {
        let filtered = recipes.filter((recipe) => {
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
}