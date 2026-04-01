import { createContext, useState, useEffect } from 'react'
import { useFetch } from '../hooks/useFetch'

const initialRecipes = [
    {
        id: 1, title: "Классические панкейки", category: "Breakfast",
        ingredients: "Мука\nМолоко\nЯйца\nСахар\nРазрыхлитель",
        instructions: "Смешать сухие ингредиенты. Добавить молоко и яйца. Жарить на сковороде.",
        rating: 4.8, likes: 42, isFavorite: false,
        image: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445"
    },
    {
        id: 2, title: "Спагетти Карбонара", category: "Main Course",
        ingredients: "Спагетти\nГуанчиале\nЯйца\nПармезан\nПерец",
        instructions: "Обжарить гуанчиале. Сварить пасту. Смешать с яйцами и сыром.",
        rating: 4.9, likes: 38, isFavorite: true,
        image: "https://images.unsplash.com/photo-1551892374-ecf2eedf1d6a"
    },
    {
        id: 3, title: "Шоколадный лавовый кейк", category: "Dessert",
        ingredients: "Шоколад\nМасло\nЯйца\nСахар\nМука",
        instructions: "Растопить шоколад с маслом. Добавить яйца и муку. Запекать 10 минут.",
        rating: 4.7, likes: 51, isFavorite: false,
        image: "https://images.unsplash.com/photo-1606313564200-e75d5e0c5b3c"
    },
    {
        id: 4, title: "Боул с киноа", category: "Vegetarian",
        ingredients: "Киноа\nАвокадо\nПомидоры\nОгурцы\nФета",
        instructions: "Сварить киноа. Нарезать овощи. Собрать боул.",
        rating: 4.6, likes: 27, isFavorite: false,
        image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd"
    }
]

export const RecipeContext = createContext()

export const RecipeProvider = ({ children }) => {
    const [recipes, setRecipes] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    // ===== TASK 2 + TASK 5: Real API integration =====
    const API_URL = 'https://www.themealdb.com/api/json/v1/1/search.php?f=a'
    const { data: apiData, isLoading: fetchLoading, error: fetchError } = useFetch(API_URL)

    useEffect(() => {
        const saved = localStorage.getItem('recipes')
        let currentRecipes = saved ? JSON.parse(saved) : initialRecipes

        // If we have fresh data from TheMealDB API → merge it with user's recipes
        if (apiData?.meals) {
            const apiRecipes = apiData.meals.map((meal) => ({
                id: Number(meal.idMeal),
                title: meal.strMeal,
                category: meal.strCategory || 'Main Course',
                ingredients: Array.from({ length: 20 }, (_, i) => meal[`strIngredient${i + 1}`])
                    .filter(Boolean)
                    .join('\n'),
                instructions: meal.strInstructions || 'Инструкции не указаны.',
                rating: 4 + Math.random(),
                likes: Math.floor(Math.random() * 60) + 10,
                isFavorite: false,
                image: meal.strMealThumb || ''
            }))

            // Merge: keep all user recipes + add API recipes that don't exist yet
            const existingTitles = new Set(currentRecipes.map(r => r.title.toLowerCase()))
            const newApiRecipes = apiRecipes.filter(r => !existingTitles.has(r.title.toLowerCase()))

            currentRecipes = [...currentRecipes, ...newApiRecipes]
        }
        // If API failed, keep user's recipes (or initial ones)

        setRecipes(currentRecipes)
        setIsLoading(fetchLoading)

        // Save merged list back to localStorage
        localStorage.setItem('recipes', JSON.stringify(currentRecipes))
    }, [apiData, fetchError, fetchLoading])

    // Save changes when user adds/edits/deletes
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