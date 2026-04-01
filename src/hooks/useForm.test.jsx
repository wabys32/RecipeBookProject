import { renderHook, act } from '@testing-library/react'
import { useForm } from './useForm'
import { vi } from 'vitest'

describe('useForm custom hook', () => {
    const initialForm = {
        title: '',
        category: 'Breakfast',
        rating: '',
        ingredients: '',
        instructions: ''
    }

    it('должен инициализировать форму с начальными значениями', () => {
        const { result } = renderHook(() => useForm(initialForm))
        expect(result.current.form).toEqual(initialForm)
    })

    it('должен обновлять поля при handleChange', () => {
        const { result } = renderHook(() => useForm(initialForm))

        act(() => {
            const fakeEvent = { target: { name: 'title', value: 'Новый рецепт' } }
            result.current.handleChange(fakeEvent)
        })

        expect(result.current.form.title).toBe('Новый рецепт')
    })

    it('должен сбрасывать форму в начальное состояние', () => {
        const { result } = renderHook(() => useForm(initialForm))

        act(() => {
            const fakeEvent = { target: { name: 'title', value: 'Тест' } }
            result.current.handleChange(fakeEvent)
        })

        act(() => {
            result.current.resetForm()
        })

        expect(result.current.form).toEqual(initialForm)
    })

    it('должен вызывать onSubmit с текущими данными формы', () => {
        

        const mockSubmit = vi.fn()
        const { result } = renderHook(() => useForm(initialForm))

        act(() => {
            result.current.setField('title', 'Панкейки')
            result.current.setField('rating', '4.8')
        })

        act(() => {
            const submitHandler = result.current.handleSubmit(mockSubmit)
            submitHandler({ preventDefault: jest.fn() })
        })

        expect(mockSubmit).toHaveBeenCalledWith({
            title: 'Панкейки',
            category: 'Breakfast',
            rating: '4.8',
            ingredients: '',
            instructions: ''
        })
    })
})