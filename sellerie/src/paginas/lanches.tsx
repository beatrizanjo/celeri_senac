import { useRecipes } from '../hooks/useRecipes'
import RecipeCard from '../componentes/recipeCard/RecipeCard'
import './recipes-page.css'

function Lanches() {
    const { recipes, loading, error, retry } = useRecipes({ category: 'Side', isDrink: false })

    return (
        <div className="recipes-page">
            <h1>Lanches</h1>

            {loading && <div className="recipes-loading">Carregando receitas...</div>}

            {error && (
                <div className="recipes-error">
                    <p>Erro ao carregar receitas: {error}</p>
                    <button onClick={retry} className="recipes-retry-btn">
                        Tentar Novamente
                    </button>
                </div>
            )}

            {!loading && !error && recipes.length === 0 && (
                <div className="recipes-empty">Nenhuma receita encontrada.</div>
            )}

            {!loading && !error && recipes.length > 0 && (
                <div className="recipes-grid">
                    {recipes.map((recipe) => (
                        <RecipeCard key={recipe.id} recipe={recipe} isDrink={false} />
                    ))}
                </div>
            )}
        </div>
    )
}

export default Lanches
