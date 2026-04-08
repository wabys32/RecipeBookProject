import { render, screen } from '@testing-library/react'
import RecipeListRenderProps from './RecipeListRenderProps'

const mockRecipes = [{ id: 1, title: 'Test', category: 'Breakfast', rating: 4.5, likes: 10, isFavorite: false }]

test('Render Props передаёт отфильтрованные рецепты', () => {
    render(
        <RecipeListRenderProps recipes={mockRecipes}>
            {({ filteredRecipes }) => (
                <div data-testid="list">{filteredRecipes.length} рецептов</div>
            )}
        </RecipeListRenderProps>
    )
    expect(screen.getByTestId('list')).toHaveTextContent('1 рецептов')
})