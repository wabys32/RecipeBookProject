import { Link } from 'react-router-dom'

export default function NotFound() {
    return (
        <div className="min-h-[80vh] flex items-center justify-center text-center px-4">
            <div>
                <h1 className="text-[120px] font-bold text-gray-200 dark:text-gray-800 leading-none">404</h1>
                <h2 className="text-4xl font-semibold mt-4">Страница не найдена</h2>
                <p className="text-xl text-gray-500 mt-4">Упс... такой страницы нет</p>
                <Link
                    to="/"
                    className="mt-10 inline-block bg-orange-600 hover:bg-orange-700 text-white px-10 py-4 rounded-2xl text-lg font-medium transition"
                >
                    ← Вернуться на главную
                </Link>
            </div>
        </div>
    )
}