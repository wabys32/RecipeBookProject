import { FiBook, FiSun, FiMoon } from 'react-icons/fi'

export default function Header({ theme, setTheme, recipeCount }) {
    return (
        <header className="bg-white dark:bg-gray-900 shadow-sm border-b border-gray-200 dark:border-gray-800">
            <div className="max-w-7xl mx-auto px-4 py-6 flex justify-between items-center">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center">
                        <FiBook className="text-white text-2xl" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold">Recipe Book</h1>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Твоя коллекция вкусных рецептов</p>
                    </div>
                </div>

                <div className="flex items-center gap-6">
                    <div className="text-lg font-medium">
                        Всего рецептов: <span className="text-orange-600 font-bold">{recipeCount}</span>
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