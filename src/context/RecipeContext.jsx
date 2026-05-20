import { createContext, useState, useEffect } from 'react'
import { useFetch } from '../hooks/useFetch'
import { initialRecipes, mapMealsToRecipes, MEALDB_SEARCH_URL } from '../services/recipeApi'

export const RecipeContext = createContext()

export const RecipeProvider = ({ children }) => {
    const [recipes, setRecipes] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const { data: apiData, isLoading: fetchLoading } = useFetch(MEALDB_SEARCH_URL)

    useEffect(() => {
        const saved = localStorage.getItem('recipes')
        let currentRecipes = saved ? JSON.parse(saved) : initialRecipes

        if (apiData?.meals) {
            const apiRecipes = mapMealsToRecipes(apiData.meals)
            const existingTitles = new Set(currentRecipes.map(r => r.title.toLowerCase()))
            const newApiRecipes = apiRecipes.filter(r => !existingTitles.has(r.title.toLowerCase()))

            currentRecipes = [...currentRecipes, ...newApiRecipes]
        }

        setRecipes(currentRecipes)
        setIsLoading(fetchLoading)
        localStorage.setItem('recipes', JSON.stringify(currentRecipes))
    }, [apiData, fetchLoading])

    useEffect(() => {
        if (recipes.length > 0) {
            localStorage.setItem('recipes', JSON.stringify(recipes))
        }
    }, [recipes])

    const addRecipe = (newRecipe) => {
        const recipeWithId = { ...newRecipe, id: Date.now(), likes: 0, isFavorite: false }
        setRecipes(prev => [recipeWithId, ...prev])
    }

    const updateRecipe = (updatedRecipe) => {
        setRecipes(prev => prev.map(r => r.id === updatedRecipe.id ? updatedRecipe : r))
    }

    const deleteRecipe = (id) => {
        setRecipes(prev => prev.filter(r => r.id !== id))
    }

    const toggleFavorite = (id) => {
        setRecipes(prev => prev.map(r => r.id === id ? { ...r, isFavorite: !r.isFavorite } : r))
    }

    const incrementLikes = (id) => {
        setRecipes(prev => prev.map(r => r.id === id ? { ...r, likes: r.likes + 1 } : r))
    }

    return (
        <RecipeContext.Provider value={{
            recipes,
            isLoading,
            addRecipe,
            updateRecipe,
            deleteRecipe,
            toggleFavorite,
            incrementLikes
        }}>
            {children}
        </RecipeContext.Provider>
    )
}
