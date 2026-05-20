import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import RecipeListRenderProps from './RecipeListRenderProps'

const mockRecipes = [
    { id: 1, title: 'Pancakes', category: 'Breakfast', rating: 4.5, likes: 10, isFavorite: false },
    { id: 2, title: 'Carbonara', category: 'Main Course', rating: 4.9, likes: 12, isFavorite: true }
]

describe('RecipeListRenderProps', () => {
    it('passes filtered recipes to children', async () => {
        const user = userEvent.setup()

        render(
            <RecipeListRenderProps recipes={mockRecipes}>
                {({ filteredRecipes, searchTerm, setSearchTerm }) => (
                    <div>
                        <input
                            aria-label="Search"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <div data-testid="list">{filteredRecipes.map(recipe => recipe.title).join(', ')}</div>
                    </div>
                )}
            </RecipeListRenderProps>
        )

        expect(screen.getByTestId('list')).toHaveTextContent('Carbonara, Pancakes')

        await user.type(screen.getByLabelText('Search'), 'pan')

        expect(screen.getByTestId('list')).toHaveTextContent('Pancakes')
        expect(screen.getByTestId('list')).not.toHaveTextContent('Carbonara')
    })
})
