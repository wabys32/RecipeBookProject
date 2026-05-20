import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest'
import RecipeCardCompound from './RecipeCardCompound'

const recipe = {
    id: 7,
    title: 'Apple Pie',
    category: 'Dessert',
    rating: 4.6,
    likes: 14,
    isFavorite: false,
    image: ''
}

const renderCard = (props = {}) => {
    const onClick = vi.fn()
    const onToggleFavorite = vi.fn()
    const onIncrementLikes = vi.fn()

    render(
        <RecipeCardCompound recipe={{ ...recipe, ...props }} onClick={onClick}>
            <RecipeCardCompound.Header />
            <RecipeCardCompound.Body />
            <RecipeCardCompound.Footer
                onToggleFavorite={onToggleFavorite}
                onIncrementLikes={onIncrementLikes}
            />
        </RecipeCardCompound>
    )

    return { onClick, onToggleFavorite, onIncrementLikes }
}

describe('RecipeCardCompound', () => {
    it('renders recipe details', () => {
        renderCard()

        expect(screen.getByText('Apple Pie')).toBeInTheDocument()
        expect(screen.getByText('Dessert')).toBeInTheDocument()
        expect(screen.getByText('4.6')).toBeInTheDocument()
        expect(screen.getByText('Likes: 14')).toBeInTheDocument()
    })

    it('calls action handlers without opening the card', async () => {
        const user = userEvent.setup()
        const { onClick, onToggleFavorite, onIncrementLikes } = renderCard()

        await user.click(screen.getByLabelText('Add to favorites'))
        await user.click(screen.getByLabelText('Like recipe'))

        expect(onToggleFavorite).toHaveBeenCalledWith(7)
        expect(onIncrementLikes).toHaveBeenCalledWith(7)
        expect(onClick).not.toHaveBeenCalled()
    })
})
