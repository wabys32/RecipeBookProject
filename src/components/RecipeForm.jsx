import { useState } from 'react'
import { useContext } from 'react'
import { RecipeContext } from '../context/RecipeContext'

const initialForm = { /* твой старый initialForm */ }

export default function RecipeForm() {   // ← убрали onAddRecipe
    const { addRecipe } = useContext(RecipeContext)
    // ... весь твой код state, handleChange, validate ...

    const handleSubmit = (e) => {
        e.preventDefault()
        const validationErrors = validate()
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors)
            return
        }

        addRecipe({
            ...form,
            ingredients: form.ingredients.trim(),
            instructions: form.instructions.trim(),
            rating: Number(form.rating)
        })

        setForm(initialForm)
        setErrors({})
    }

    // весь JSX формы остаётся без изменений
}