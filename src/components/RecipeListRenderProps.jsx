import { useState } from 'react'
import { useFilter } from '../hooks/useFilter'

export default function RecipeListRenderProps({ recipes, children }) {
    const [searchTerm, setSearchTerm] = useState('')
    const [selectedCategory, setSelectedCategory] = useState('All')
    const [sortBy, setSortBy] = useState('rating-desc')
    const [showFavorites, setShowFavorites] = useState(false)

    const filteredRecipes = useFilter(recipes, {
        searchTerm,
        selectedCategory,
        sortBy,
        showFavorites
    })

    return children({
        filteredRecipes,
        searchTerm, setSearchTerm,
        selectedCategory, setSelectedCategory,
        sortBy, setSortBy,
        showFavorites, setShowFavorites
    })
}