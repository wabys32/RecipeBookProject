import { useState } from 'react'

export const useForm = (initialForm = {}) => {
    const [form, setForm] = useState(initialForm)

    const handleChange = (e) => {
        const { name, value } = e.target
        setForm((prev) => ({ ...prev, [name]: value }))
    }

    const setField = (name, value) => {
        setForm((prev) => ({ ...prev, [name]: value }))
    }

    const resetForm = () => {
        setForm(initialForm)
    }

    return { form, handleChange, setField, resetForm }
}