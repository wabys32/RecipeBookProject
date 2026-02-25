import { FiHeart, FiStar } from 'react-icons/fi'

export default function RecipeCard({ recipe, onClick, onToggleFavorite, onIncrementLikes }) {
    const { title, category, rating, likes, isFavorite, image } = recipe

    return (
        <div
            onClick={onClick}
            className="bg-white light:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer group"
        >
            <div className="relative h-48 overflow-hidden">
                {image ? (
                    <img
                        src={image}
                        alt={title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        onError={e => { e.target.src = 'https://images.unsplash.com/photo-1556911220-b0b895fafb40?w=800' }}
                    />
                ) : (
                    <div className="w-full h-full bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center">
                        <span className="text-white text-6xl opacity-30">🍳</span>
                    </div>
                )}
                <div className="absolute top-3 right-3">
                    <button
                        onClick={e => {
                            e.stopPropagation()
                            onToggleFavorite(recipe.id)
                        }}
                        className="p-2 bg-white/80 light:bg-gray-900/80 rounded-full hover:bg-white dark:hover:bg-gray-800 transition"
                    >
                        <FiHeart className={isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600 dark:text-gray-300'} />
                    </button>
                </div>
            </div>

            <div className="p-5">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-lg line-clamp-2">{title}</h3>
                    <div className="flex items-center gap-1 text-amber-500 font-medium">
                        <FiStar className="fill-current" />
                        {rating.toFixed(1)}
                    </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-3">
                    <span className="px-3 py-1 bg-orange-100 dark:bg-orange-900/40 text-orange-800 dark:text-orange-300 rounded-full text-sm">
                        {category}
                    </span>
                </div>

                <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400">
                    <span>Лайков: {likes}</span>
                    <button
                        onClick={e => {
                            e.stopPropagation()
                            onIncrementLikes(recipe.id)
                        }}
                        className="text-orange-600 hover:text-orange-800 dark:text-orange-400 dark:hover:text-orange-300 font-medium"
                    >
                        +1
                    </button>
                </div>
            </div>
        </div>
    )
}