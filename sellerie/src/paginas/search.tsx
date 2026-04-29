import { useSearchParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { fetchMealsByIngredient, fetchMealsByName, fetchDrinksByName } from '../services/recipeService'
import RecipeCard from '../componentes/recipeCard/RecipeCard'
import type { RecipeCard as RecipeCardType } from '../types/recipes'
import './recipes-page.css'

function Search() {
    const [searchParams] = useSearchParams()
    const query = searchParams.get('query') || ''

    const [recipes, setRecipes] = useState<RecipeCardType[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        if (!query.trim()) {
            setRecipes([])
            return
        }

        const searchRecipes = async () => {
            setLoading(true)
            setError(null)

            try {
                // Tenta buscar por nome primeiro (mais específico)
                let results = await fetchMealsByName(query)

                // Se não encontrou por nome, tenta por ingrediente
                if (results.length === 0) {
                    results = await fetchMealsByIngredient(query)
                }

                // Se ainda não encontrou, tenta bebidas
                if (results.length === 0) {
                    results = await fetchDrinksByName(query)
                }

                setRecipes(results)

                if (results.length === 0) {
                    setError(`Nenhuma receita encontrada para "${query}"`)
                }
            } catch (err) {
                const message = err instanceof Error ? err.message : 'Erro ao buscar receitas'
                setError(message)
                console.error('Erro em searchRecipes:', message)
            } finally {
                setLoading(false)
            }
        }

        searchRecipes()
    }, [query])

    return (
        <div className="recipes-page">
            <h1>Resultados da Busca</h1>

            {query && (
                <div className="search-info">
                    <p>
                        Buscando por: <strong>"{query}"</strong>
                    </p>
                </div>
            )}

            {loading && <div className="recipes-loading">Buscando receitas...</div>}

            {error && !loading && (
                <div className="recipes-error">
                    <p>{error}</p>
                </div>
            )}

            {!loading && !error && recipes.length === 0 && !query && (
                <div className="recipes-empty">Digite algo para buscar receitas.</div>
            )}

            {!loading && recipes.length > 0 && (
                <div className="recipes-grid">
                    {recipes.map((recipe) => (
                        <RecipeCard key={recipe.id} recipe={recipe} isDrink={false} />
                    ))}
                </div>
            )}

            {!loading && !error && recipes.length > 0 && (
                <div className="search-results-count">
                    <p>Encontradas {recipes.length} receita(s)</p>
                </div>
            )}
        </div>
    )
}

export default Search
