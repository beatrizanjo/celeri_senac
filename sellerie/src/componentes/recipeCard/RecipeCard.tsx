import { useNavigate } from 'react-router-dom'
import type { RecipeCard as RecipeCardType } from '../../types/recipes'
import './recipeCard.css'

interface RecipeCardProps {
    recipe: RecipeCardType
    isDrink?: boolean
}

export default function RecipeCard({ recipe, isDrink = false }: RecipeCardProps) {
    const navigate = useNavigate()

    const handleClick = () => {
        navigate(`/recipe/${recipe.id}/${isDrink}`)
    }

    return (
        <div className="recipe-card" onClick={handleClick} role="button" tabIndex={0}>
            <div className="recipe-card__image-container">
                <img
                    src={recipe.image}
                    alt={recipe.title}
                    className="recipe-card__image"
                    onError={(e) => {
                        const target = e.target as HTMLImageElement
                        target.src = 'https://via.placeholder.com/300x300?text=Imagem+não+disponível'
                    }}
                />
            </div>
            <div className="recipe-card__content">
                <h3 className="recipe-card__title">{recipe.title}</h3>
            </div>
        </div>
    )
}
