import { useState, useEffect, useMemo } from 'react'
import Header from './components/Header'
import Filters from './components/Filters'
import RecipeForm from './components/RecipeForm'
import RecipeCard from './components/RecipeCard'
import RecipeModal from './components/RecipeModal'

const initialRecipes = [
  {
    id: 1,
    title: "Классические панкейки",
    category: "Breakfast",
    ingredients: "Мука\nМолоко\nЯйца\nСахар\nРазрыхлитель",
    instructions: "Смешать сухие ингредиенты. Добавить молоко и яйца. Жарить на сковороде.",
    rating: 4.8,
    likes: 42,
    isFavorite: false,
    image: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445"
  },
  {
    id: 2,
    title: "Спагетти Карбонара",
    category: "Main Course",
    ingredients: "Спагетти\nГуанчиале\nЯйца\nПармезан\nПерец",
    instructions: "Обжарить гуанчиале. Сварить пасту. Смешать с яйцами и сыром.",
    rating: 4.9,
    likes: 38,
    isFavorite: true,
    image: "https://images.unsplash.com/photo-1551892374-ecf2eedf1d6a"
  },
  {
    id: 3,
    title: "Шоколадный лавовый кейк",
    category: "Dessert",
    ingredients: "Шоколад\nМасло\nЯйца\nСахар\nМука",
    instructions: "Растопить шоколад с маслом. Добавить яйца и муку. Запекать 10 минут.",
    rating: 4.7,
    likes: 51,
    isFavorite: false,
    image: "https://images.unsplash.com/photo-1606313564200-e75d5e0c5b3c"
  },
  {
    id: 4,
    title: "Боул с киноа",
    category: "Vegetarian",
    ingredients: "Киноа\nАвокадо\nПомидоры\nОгурцы\nФета",
    instructions: "Сварить киноа. Нарезать овощи. Собрать боул.",
    rating: 4.6,
    likes: 27,
    isFavorite: false,
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd"
  }
]

function App() {
  const [recipes, setRecipes] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [sortBy, setSortBy] = useState('rating-desc')
  const [showFavorites, setShowFavorites] = useState(false)
  const [theme, setTheme] = useState('light')
  const [selectedRecipe, setSelectedRecipe] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  // Загрузка данных (useEffect + mock API)
  useEffect(() => {
    setIsLoading(true)
    const timer = setTimeout(() => {
      const saved = localStorage.getItem('recipes')
      if (saved) {
        setRecipes(JSON.parse(saved))
      } else {
        setRecipes(initialRecipes)
        localStorage.setItem('recipes', JSON.stringify(initialRecipes))
      }
      setIsLoading(false)
    }, 800)

    return () => clearTimeout(timer)
  }, [])

  // Сохранение в localStorage при изменении рецептов
  useEffect(() => {
    if (recipes.length > 0) {
      localStorage.setItem('recipes', JSON.stringify(recipes))
    }
  }, [recipes])

  // Сохранение темы
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    localStorage.setItem('theme', theme)
  }, [theme])

  // Загрузка темы из localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light'
    setTheme(savedTheme)
  }, [])

  const addRecipe = (newRecipe) => {
    const recipeWithId = {
      ...newRecipe,
      id: Date.now(),
      likes: 0,
      isFavorite: false
    }
    setRecipes(prev => [recipeWithId, ...prev])
  }

  const updateRecipe = (updatedRecipe) => {
    setRecipes(prev => prev.map(r => r.id === updatedRecipe.id ? updatedRecipe : r))
    setSelectedRecipe(updatedRecipe)
  }

  const deleteRecipe = (id) => {
    if (window.confirm('Удалить рецепт?')) {
      setRecipes(prev => prev.filter(r => r.id !== id))
      setSelectedRecipe(null)
    }
  }

  const toggleFavorite = (id) => {
    setRecipes(prev => prev.map(r =>
      r.id === id ? { ...r, isFavorite: !r.isFavorite } : r
    ))
  }

  const incrementLikes = (id) => {
    setRecipes(prev => prev.map(r =>
      r.id === id ? { ...r, likes: r.likes + 1 } : r
    ))
  }

  // Фильтрация и сортировка (useMemo)
  const filteredRecipes = useMemo(() => {
    let filtered = recipes.filter(recipe => {
      const matchesSearch = recipe.title.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = selectedCategory === 'All' || recipe.category === selectedCategory
      const matchesFavorite = !showFavorites || recipe.isFavorite
      return matchesSearch && matchesCategory && matchesFavorite
    })

    // Сортировка
    filtered.sort((a, b) => {
      if (sortBy === 'name-asc') return a.title.localeCompare(b.title)
      if (sortBy === 'name-desc') return b.title.localeCompare(a.title)
      if (sortBy === 'rating-desc') return b.rating - a.rating
      if (sortBy === 'rating-asc') return a.rating - b.rating
      return 0
    })

    return filtered
  }, [recipes, searchTerm, selectedCategory, sortBy, showFavorites])

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'dark bg-gray-950 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <Header theme={theme} setTheme={setTheme} recipeCount={recipes.length} />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <RecipeForm onAddRecipe={addRecipe} />

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
              <RecipeCard
                key={recipe.id}
                recipe={recipe}
                onClick={() => setSelectedRecipe(recipe)}
                onToggleFavorite={toggleFavorite}
                onIncrementLikes={incrementLikes}
              />
            ))}
          </div>
        )}

        {filteredRecipes.length === 0 && !isLoading && (
          <p className="text-center text-xl py-20 text-gray-500">Рецепты не найдены</p>
        )}
      </div>

      {selectedRecipe && (
        <RecipeModal
          recipe={selectedRecipe}
          onClose={() => setSelectedRecipe(null)}
          onUpdate={updateRecipe}
          onDelete={deleteRecipe}
          onToggleFavorite={toggleFavorite}   // ← this line is critical!
        />
      )}
    </div>
  )
}

export default App