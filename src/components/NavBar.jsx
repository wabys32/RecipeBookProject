import { NavLink } from 'react-router-dom'
import { FiHome, FiBook, FiUser } from 'react-icons/fi'

export default function NavBar() {
    return (
        <nav className="bg-white light:bg-gray-900">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex items-center h-16 gap-10 text-lg font-medium">
                    <NavLink to="/" className={({ isActive }) => isActive ? 'text-orange-600 border-b-2 border-orange-600 pb-1' : 'text-gray-600 dark:text-gray-400 hover:text-orange-600'}>
                        <div className="flex items-center gap-2"><FiHome />Home</div>
                    </NavLink>
                    <NavLink to="/recipes" className={({ isActive }) => isActive ? 'text-orange-600 border-b-2 border-orange-600 pb-1' : 'text-gray-600 dark:text-gray-400 hover:text-orange-600'}>
                        <div className="flex items-center gap-2"><FiBook />Recipes</div>
                    </NavLink>
                    <NavLink to="/profile" className={({ isActive }) => isActive ? 'text-orange-600 border-b-2 border-orange-600 pb-1' : 'text-gray-600 dark:text-gray-400 hover:text-orange-600'}>
                        <div className="flex items-center gap-2"><FiUser />Profile</div>
                    </NavLink>
                </div>
            </div>
        </nav>
    )
}