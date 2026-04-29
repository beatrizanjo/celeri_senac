import { useState } from 'react'
import { useRecipes } from '../hooks/useRecipes'
import RecipeCard from '../componentes/recipeCard/RecipeCard'
import './recipes-page.css'

function Principal() {
    const [selectedCategory, setSelectedCategory] = useState('Beef')

    const { recipes, loading, error, retry } = useRecipes({ category: selectedCategory, isDrink: false })

    const categories = [
        { value: 'Beef', label: 'CARNES' },
        { value: 'Vegan', label: 'VEGANO' },
        { value: 'Vegetarian', label: 'VEGETARIANO' },
        { value: 'Dessert', label: 'DOCES' },
        { value: 'Pasta', label: 'MASSAS' },
        { value: 'Starter', label: 'SALADA' },
        { value: 'Side', label: 'LANCHES' },
    ]

    return (
        <div className="recipes-page">
            <h1>Principal</h1>

            <div className="principal__filter">
                <label htmlFor="category-select">Selecione uma categoria:</label>
                <select
                    id="category-select"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="principal__select"
                >
                    {categories.map((cat) => (
                        <option key={cat.value} value={cat.value}>
                            {cat.label}
                        </option>
                    ))}
                </select>
            </div>

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

export default Principal
