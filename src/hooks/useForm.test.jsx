import { renderHook, act } from '@testing-library/react'
import { vi } from 'vitest'
import { useForm } from './useForm'

describe('useForm custom hook', () => {
    const initialForm = {
        title: '',
        category: 'Breakfast',
        rating: '',
        ingredients: '',
        instructions: ''
    }

    it('initializes the form with initial values', () => {
        const { result } = renderHook(() => useForm(initialForm))

        expect(result.current.form).toEqual(initialForm)
    })

    it('updates fields with handleChange', () => {
        const { result } = renderHook(() => useForm(initialForm))

        act(() => {
            result.current.handleChange({ target: { name: 'title', value: 'New recipe' } })
        })

        expect(result.current.form.title).toBe('New recipe')
    })

    it('resets the form to the initial state', () => {
        const { result } = renderHook(() => useForm(initialForm))

        act(() => {
            result.current.setField('title', 'Pancakes')
            result.current.resetForm()
        })

        expect(result.current.form).toEqual(initialForm)
    })

    it('passes current form data to a submit callback', () => {
        const mockSubmit = vi.fn()
        const { result } = renderHook(() => useForm(initialForm))

        act(() => {
            result.current.setField('title', 'Pancakes')
            result.current.setField('rating', '4.8')
        })

        act(() => {
            const submitHandler = result.current.handleSubmit(mockSubmit)
            submitHandler({ preventDefault: vi.fn() })
        })

        expect(mockSubmit).toHaveBeenCalledWith({
            title: 'Pancakes',
            category: 'Breakfast',
            rating: '4.8',
            ingredients: '',
            instructions: ''
        })
    })
})
