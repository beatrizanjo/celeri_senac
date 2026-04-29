import { useState, useEffect, useCallback } from 'react'
import type { RecipeCard } from '../types/recipes'
import { fetchMealsByCategory, fetchDrinksByCategory } from '../services/recipeService'

interface UseRecipesOptions {
    category: string
    isDrink?: boolean
    skip?: boolean
}

/**
 * Hook para buscar receitas com gerenciamento de estado
 * @param category - Categoria da receita (ex: 'Beef', 'Vegan', 'Cocktail')
 * @param isDrink - Se é bebida (usa TheCocktailDB) ou comida (usa TheMealDB)
 * @param skip - Se true, não executa o fetch
 * @returns { recipes, loading, error, retry }
 */
export function useRecipes({ category, isDrink = false, skip = false }: UseRecipesOptions) {
    const [recipes, setRecipes] = useState<RecipeCard[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const fetchRecipes = useCallback(async () => {
        if (skip || !category) return

        setLoading(true)
        setError(null)

        try {
            const data = isDrink
                ? await fetchDrinksByCategory(category)
                : await fetchMealsByCategory(category)

            setRecipes(data)
        } catch (err) {
            const message = err instanceof Error ? err.message : 'Erro ao carregar receitas'
            setError(message)
            console.error('Erro em useRecipes:', message)
        } finally {
            setLoading(false)
        }
    }, [category, isDrink, skip])

    useEffect(() => {
        fetchRecipes()
    }, [fetchRecipes])

    const retry = useCallback(() => {
        fetchRecipes()
    }, [fetchRecipes])

    return {
        recipes,
        loading,
        error,
        retry,
    } as const
}

export function useRecipesByCategories(categories: string[], isDrink: boolean = false) {
    const [allRecipes, setAllRecipes] = useState<Record<string, RecipeCard[]>>({})
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchAll = async () => {
            setLoading(true)
            setError(null)

            try {
                const results: Record<string, RecipeCard[]> = {}

                const promises = categories.map(async (category) => {
                    const data = isDrink
                        ? await fetchDrinksByCategory(category)
                        : await fetchMealsByCategory(category)
                    results[category] = data
                })

                await Promise.all(promises)
                setAllRecipes(results)
            } catch (err) {
                const message = err instanceof Error ? err.message : 'Erro ao carregar receitas'
                setError(message)
                console.error('Erro em useRecipesByCategories:', message)
            } finally {
                setLoading(false)
            }
        }

        if (categories.length > 0) {
            fetchAll()
        }
    }, [categories, isDrink])

    return { allRecipes, loading, error }
}
