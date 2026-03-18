import { useContext } from 'react'
import { RecipeContext } from '../context/RecipeContext'

export default function Profile() {
    const { recipes } = useContext(RecipeContext)

    const total = recipes.length
    const favorites = recipes.filter(r => r.isFavorite).length
    const avgRating = total ? (recipes.reduce((sum, r) => sum + r.rating, 0) / total).toFixed(1) : '—'
    const mostLiked = [...recipes].sort((a, b) => b.likes - a.likes)[0]

    return (
        <div className="max-w-4xl mx-auto px-4 py-12">
            <h1 className="text-4xl font-bold mb-10 text-center">Profile</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white light:bg-gray-800 p-8 rounded-2xl shadow text-center">
                    <div className="text-5xl mb-3">📊</div>
                    <div className="text-5xl font-bold text-orange-600">{total}</div>
                    <p className="text-gray-500 dark:text-gray-400 mt-2">Total recipes:</p>
                </div>
                <div className="bg-white light:bg-gray-800 p-8 rounded-2xl shadow text-center">
                    <div className="text-5xl mb-3">❤️</div>
                    <div className="text-5xl font-bold text-red-600">{favorites}</div>
                    <p className="text-gray-500 dark:text-gray-400 mt-2">Favorites</p>
                </div>
                <div className="bg-white light:bg-gray-800 p-8 rounded-2xl shadow text-center">
                    <div className="text-5xl mb-3">⭐</div>
                    <div className="text-5xl font-bold text-amber-600">{avgRating}</div>
                    <p className="text-gray-500 dark:text-gray-400 mt-2">Average rating</p>
                </div>
            </div>

            {mostLiked && (
                <div className="mt-12 bg-white light:bg-gray-800 p-8 rounded-2xl">
                    <h3 className="text-2xl font-bold mb-6">🔥 Most popular recipe</h3>
                    <div className="flex gap-6 items-center">
                        {mostLiked.image && <img src={mostLiked.image} alt="" className="w-40 h-40 object-cover rounded-xl" />}
                        <div>
                            <h4 className="text-2xl font-bold">{mostLiked.title}</h4>
                            <p className="text-3xl text-orange-600 mt-2">{mostLiked.likes} likes</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}