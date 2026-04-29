import { useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { fetchMealById, fetchDrinkById } from '../services/recipeService'
import './recipeDetail.css'

interface RecipeDetail {
    id: string
    title: string
    image: string
    category?: string
    area?: string
    ingredients: Array<{ name: string; measure: string }>
    instructions: string
    tags?: string
}

function RecipeDetail() {
    const { id, isDrink } = useParams<{ id: string; isDrink: string }>()
    const navigate = useNavigate()
    const [recipe, setRecipe] = useState<RecipeDetail | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchRecipe = async () => {
            if (!id) return

            setLoading(true)
            setError(null)

            try {
                const isFromDrink = isDrink === 'true'
                const data = isFromDrink ? await fetchDrinkById(id) : await fetchMealById(id)

                if (!data) {
                    setError('Receita não encontrada')
                    return
                }

                // Normalizar dados
                let ingredients: Array<{ name: string; measure: string }> = []

                if (isFromDrink) {
                    // TheCocktailDB
                    for (let i = 1; i <= 15; i++) {
                        const ingredient = data[`strIngredient${i}`]
                        const measure = data[`strMeasure${i}`]
                        if (ingredient) {
                            ingredients.push({ name: ingredient, measure: measure || '' })
                        }
                    }
                } else {
                    // TheMealDB
                    for (let i = 1; i <= 20; i++) {
                        const ingredient = data[`strIngredient${i}`]
                        const measure = data[`strMeasure${i}`]
                        if (ingredient) {
                            ingredients.push({ name: ingredient, measure: measure || '' })
                        }
                    }
                }

                const normalizedRecipe: RecipeDetail = {
                    id: data.idMeal || data.idDrink,
                    title: data.strMeal || data.strDrink,
                    image: data.strMealThumb || data.strDrinkThumb,
                    category: data.strCategory,
                    area: data.strArea,
                    ingredients,
                    instructions: data.strInstructions || '',
                    tags: data.strTags,
                }

                setRecipe(normalizedRecipe)
            } catch (err) {
                const message = err instanceof Error ? err.message : 'Erro ao carregar receita'
                setError(message)
                console.error('Erro em fetchRecipe:', message)
            } finally {
                setLoading(false)
            }
        }

        fetchRecipe()
    }, [id, isDrink])

    if (loading) {
        return <div className="recipe-detail__loading">Carregando receita...</div>
    }

    if (error || !recipe) {
        return (
            <div className="recipe-detail__error">
                <p>{error || 'Receita não encontrada'}</p>
                <button onClick={() => navigate(-1)} className="recipe-detail__back-btn">
                    ← Voltar
                </button>
            </div>
        )
    }

    return (
        <div className="recipe-detail">
            <button onClick={() => navigate(-1)} className="recipe-detail__back-btn">
                ← Voltar
            </button>

            <div className="recipe-detail__header">
                <img src={recipe.image} alt={recipe.title} className="recipe-detail__image" />

                <div className="recipe-detail__info">
                    <h1>{recipe.title}</h1>

                    <div className="recipe-detail__meta">
                        {recipe.category && (
                            <span className="recipe-detail__meta-item">
                                <strong>Categoria:</strong> {recipe.category}
                            </span>
                        )}
                        {recipe.area && (
                            <span className="recipe-detail__meta-item">
                                <strong>Origem:</strong> {recipe.area}
                            </span>
                        )}
                        {recipe.tags && (
                            <span className="recipe-detail__meta-item">
                                <strong>Tags:</strong> {recipe.tags}
                            </span>
                        )}
                    </div>
                </div>
            </div>

            <div className="recipe-detail__content">
                <div className="recipe-detail__section">
                    <h2>Ingredientes</h2>
                    <ul className="recipe-detail__ingredients">
                        {recipe.ingredients.map((ing, idx) => (
                            <li key={idx} className="recipe-detail__ingredient-item">
                                <span className="recipe-detail__ingredient-name">{ing.name}</span>
                                {ing.measure && (
                                    <span className="recipe-detail__ingredient-measure">{ing.measure}</span>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="recipe-detail__section">
                    <h2>Modo de Preparo</h2>
                    <div className="recipe-detail__instructions">
                        {recipe.instructions.split('\r\n').map((line, idx) => (
                            line.trim() && <p key={idx}>{line.trim()}</p>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RecipeDetail
