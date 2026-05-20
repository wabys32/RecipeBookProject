import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest'
import RecipeForm from './RecipeForm'
import { RecipeContext } from '../context/RecipeContext'

const renderForm = () => {
    const addRecipe = vi.fn()
    const onSuccess = vi.fn()

    render(
        <RecipeContext.Provider value={{ addRecipe }}>
            <RecipeForm onSuccess={onSuccess} />
        </RecipeContext.Provider>
    )

    return { addRecipe, onSuccess }
}

describe('RecipeForm', () => {
    it('shows validation errors for empty required fields', async () => {
        const user = userEvent.setup()
        renderForm()

        await user.click(screen.getByRole('button', { name: 'Add recipe' }))

        expect(screen.getByText('Title is required')).toBeInTheDocument()
        expect(screen.getByText('Rating must be from 1 to 5')).toBeInTheDocument()
        expect(screen.getByText('Ingredients are required')).toBeInTheDocument()
        expect(screen.getByText('Instructions are required')).toBeInTheDocument()
    })

    it('submits a valid recipe', async () => {
        const user = userEvent.setup()
        const { addRecipe, onSuccess } = renderForm()

        fireEvent.input(screen.getByLabelText('Title *'), { target: { value: 'Tomato Soup' } })
        fireEvent.input(screen.getByLabelText('Rating (1-5) *'), { target: { value: '4' } })
        fireEvent.input(screen.getByLabelText('Photo URL (uncontrolled)'), { target: { value: 'https://example.com/soup.jpg' } })
        fireEvent.input(screen.getByLabelText('Ingredients (one per line) *'), { target: { value: 'Tomatoes\nWater' } })
        fireEvent.input(screen.getByLabelText('Instructions *'), { target: { value: 'Cook until warm.' } })
        await user.click(screen.getByLabelText('Quick'))
        fireEvent.submit(screen.getByRole('button', { name: 'Add recipe' }).closest('form'))

        expect(addRecipe).toHaveBeenCalledWith(expect.objectContaining({
            title: 'Tomato Soup',
            rating: 4,
            image: 'https://example.com/soup.jpg',
            ingredients: 'Tomatoes\nWater',
            instructions: 'Cook until warm.',
            tags: ['Quick']
        }))
        expect(onSuccess).toHaveBeenCalled()
    })
})
