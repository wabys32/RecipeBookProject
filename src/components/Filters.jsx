import { FiSearch, FiStar, FiX } from 'react-icons/fi'

export default function Filters({
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    sortBy,
    setSortBy,
    showFavorites,
    setShowFavorites
}) {
    const categories = ['All', 'Breakfast', 'Main Course', 'Dessert', 'Vegetarian', 'Soup', 'Salad']

    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 mt-8 border border-gray-200 dark:border-gray-700">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Поиск */}
                <div className="relative">
                    <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Поиск по названию..."
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                    {searchTerm && (
                        <button
                            onClick={() => setSearchTerm('')}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                        >
                            <FiX />
                        </button>
                    )}
                </div>

                {/* Категория */}
                <select
                    value={selectedCategory}
                    onChange={e => setSelectedCategory(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                    {categories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                    ))}
                </select>

                {/* Сортировка */}
                <select
                    value={sortBy}
                    onChange={e => setSortBy(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                    <option value="rating-desc">По рейтингу ↓</option>
                    <option value="rating-asc">По рейтингу ↑</option>
                    <option value="name-asc">По названию А→Я</option>
                    <option value="name-desc">По названию Я→А</option>
                </select>

                {/* Только избранное */}
                <button
                    onClick={() => setShowFavorites(!showFavorites)}
                    className={`flex items-center justify-center gap-2 px-4 py-2 rounded-lg border transition-colors ${showFavorites
                            ? 'bg-orange-100 border-orange-500 text-orange-700 dark:bg-orange-900/30 dark:border-orange-600 dark:text-orange-400'
                            : 'border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700'
                        }`}
                >
                    <FiStar className={showFavorites ? 'fill-current' : ''} />
                    Только избранное
                </button>
            </div>
        </div>
    )
}