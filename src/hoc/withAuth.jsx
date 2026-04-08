import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

export const withAuth = (WrappedComponent) => {
    const WithAuthComponent = (props) => {
        const { isAuthenticated, login } = useContext(AuthContext)

        if (!isAuthenticated) {
            return (
                <div className="max-w-4xl mx-auto px-4 py-20 text-center">
                    <h2 className="text-4xl font-bold text-red-600 mb-4">Доступ ограничен</h2>
                    <p className="text-xl text-gray-500 mb-8">Только авторизованные пользователи могут просматривать профиль.</p>
                    <button
                        onClick={login}
                        className="bg-orange-600 hover:bg-orange-700 text-white px-10 py-4 rounded-2xl text-lg font-medium"
                    >
                        Войти в аккаунт
                    </button>
                </div>
            )
        }
        return <WrappedComponent {...props} />
    }
    return WithAuthComponent
}