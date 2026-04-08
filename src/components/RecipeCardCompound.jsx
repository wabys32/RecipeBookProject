import { createContext, useContext, useState } from 'react'
import { FiHeart, FiStar } from 'react-icons/fi'

const CardContext = createContext()

export default function RecipeCardCompound({ recipe, onClick, children }) {
    const [isFavorite, setIsFavorite] = useState(recipe.isFavorite)

    const toggleFavorite = () => setIsFavorite(!isFavorite)

    return (
        <CardContext.Provider value={{ recipe, isFavorite, toggleFavorite, onClick }}>
            <div
                onClick={onClick}
                className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all cursor-pointer group"
            >
                {children}
            </div>
        </CardContext.Provider>
    )
}

// Compound sub-components
RecipeCardCompound.Header = function Header() {
    const { recipe } = useContext(CardContext)
    return (
        <div className="relative h-48 overflow-hidden">
            {recipe.image ? (
                <img src={recipe.image} alt={recipe.title} className="w-full h-full object-cover group-hover:scale-105 transition" />
            ) : (
                <div className="w-full h-full bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center">
                    <span className="text-white text-6xl opacity-30">🍳</span>
                </div>
            )}
        </div>
    )
}

RecipeCardCompound.Body = function Body() {
    const { recipe } = useContext(CardContext)
    return (
        <div className="p-5">
            <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-lg">{recipe.title}</h3>
                <div className="flex items-center gap-1 text-amber-500">
                    <FiStar className="fill-current" />
                    {Number(recipe.rating).toFixed(1)}
                </div>
            </div>
            <span className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm">
                {recipe.category}
            </span>
        </div>
    )
}

RecipeCardCompound.Footer = function Footer({ onToggleFavorite, onIncrementLikes }) {
    const { recipe, isFavorite, toggleFavorite } = useContext(CardContext)
    return (
        <div className="px-5 pb-5 flex justify-between items-center text-sm">
            <span>Лайков: {recipe.likes}</span>
            <div className="flex gap-3">
                <button
                    onClick={(e) => { e.stopPropagation(); toggleFavorite(); onToggleFavorite(recipe.id) }}
                    className="text-red-500"
                >
                    <FiHeart className={isFavorite ? 'fill-current' : ''} />
                </button>
                <button
                    onClick={(e) => { e.stopPropagation(); onIncrementLikes(recipe.id) }}
                    className="text-orange-600"
                >
                    +1
                </button>
            </div>
        </div>
    )
}