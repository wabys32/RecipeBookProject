import { useState, useEffect } from 'react'

export const useFetch = (url) => {
    const [data, setData] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const controller = new AbortController()

        const fetchData = async () => {
            setIsLoading(true)
            setError(null)

            try {
                const response = await fetch(url, { signal: controller.signal })
                if (!response.ok) throw new Error('Could not load recipe data')

                const result = await response.json()
                setData(result)
            } catch (err) {
                if (err.name !== 'AbortError') {
                    setError(err.message)
                }
            } finally {
                if (!controller.signal.aborted) {
                    setIsLoading(false)
                }
            }
        }

        if (url) fetchData()

        return () => controller.abort()
    }, [url])

    return { data, isLoading, error }
}
