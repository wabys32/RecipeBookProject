export const initialRecipes = [
    {
        id: 1,
        title: 'Classic Pancakes',
        category: 'Breakfast',
        ingredients: 'Flour\nMilk\nEggs\nSugar\nBaking powder',
        instructions: 'Mix dry ingredients. Add milk and eggs. Fry on a warm pan until golden.',
        rating: 4.8,
        likes: 42,
        isFavorite: false,
        image: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445'
    },
    {
        id: 2,
        title: 'Spaghetti Carbonara',
        category: 'Main Course',
        ingredients: 'Spaghetti\nGuanciale\nEggs\nParmesan\nBlack pepper',
        instructions: 'Fry the guanciale. Boil pasta. Toss with eggs, cheese, and pepper off the heat.',
        rating: 4.9,
        likes: 38,
        isFavorite: true,
        image: 'https://images.unsplash.com/photo-1551892374-ecf2eedf1d6a'
    },
    {
        id: 3,
        title: 'Chocolate Lava Cake',
        category: 'Dessert',
        ingredients: 'Chocolate\nButter\nEggs\nSugar\nFlour',
        instructions: 'Melt chocolate with butter. Add eggs, sugar, and flour. Bake for 10 minutes.',
        rating: 4.7,
        likes: 51,
        isFavorite: false,
        image: 'https://images.unsplash.com/photo-1606313564200-e75d5e0c5b3c'
    },
    {
        id: 4,
        title: 'Quinoa Power Bowl',
        category: 'Vegetarian',
        ingredients: 'Quinoa\nAvocado\nTomatoes\nCucumber\nFeta',
        instructions: 'Cook quinoa. Slice vegetables. Assemble the bowl and season to taste.',
        rating: 4.6,
        likes: 27,
        isFavorite: false,
        image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd'
    }
]

export const MEALDB_SEARCH_URL = 'https://www.themealdb.com/api/json/v1/1/search.php?f=a'

export const mapMealsToRecipes = (meals = []) =>
    meals.map((meal, index) => ({
        id: Number(meal.idMeal),
        title: meal.strMeal,
        category: meal.strCategory || 'Main Course',
        ingredients: Array.from({ length: 20 }, (_, i) => meal[`strIngredient${i + 1}`])
            .filter(Boolean)
            .join('\n'),
        instructions: meal.strInstructions || 'Instructions are not provided.',
        rating: Number((4.1 + (index % 8) * 0.1).toFixed(1)),
        likes: 12 + index * 4,
        isFavorite: false,
        image: meal.strMealThumb || ''
    }))
