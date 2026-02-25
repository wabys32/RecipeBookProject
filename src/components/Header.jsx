import { FiBook, FiSun, FiMoon } from 'react-icons/fi'
import { useContext } from 'react'
import { RecipeContext } from '../context/RecipeContext'

export default function Header({ theme, setTheme }) {
    const { recipes } = useContext(RecipeContext)

    return (
        <header className="bg-white light:bg-gray-900 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 py-6 flex justify-between items-center">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center">
                        <FiBook className="text-white text-2xl" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold text-black">Recipe Book</h1>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Your collection of delicious recipes</p>
                    </div>
                </div>

                <div className="flex items-center gap-6">
                    <div className="text-lg font-medium text-black">
                        Total Recipes: <span className="text-orange-600 font-bold">{recipes.length}</span>
                    </div>

                    <button
                        onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
                        className="p-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                    >
                        {theme === 'light' ? <FiMoon size={24} /> : <FiSun size={24} />}
                    </button>
                </div>
            </div>
        </header>
    )
}