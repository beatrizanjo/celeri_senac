/**
 * Interface normalizada para receitas
 * Padroniza dados de diferentes APIs (TheMealDB, TheCocktailDB)
 */
export interface RecipeCard {
  id: string
  title: string
  image: string
}

/**
 * Response normalizado da API de receitas
 */
export interface RecipesResponse {
  recipes: RecipeCard[]
  loading: boolean
  error: string | null
}

/**
 * Tipo para categorias de receitas
 */
export type RecipeCategory = 'beef' | 'chicken' | 'vegan' | 'vegetarian' | 'dessert' | 'pasta' | 'starter' | 'side' | 'cocktail'

/**
 * Mapeamento de categorias para labels em português
 */
export const categoryLabels: Record<RecipeCategory, string> = {
  beef: 'MEET',
  chicken: 'MEET',
  vegan: 'VEGAN',
  vegetarian: 'VEGGIE',
  dessert: 'SWEET',
  pasta: 'PASTA',
  starter: 'SALAD',
  side: 'SNACK',
  cocktail: 'DRINK',
}

/**
 * Tipos internos da TheMealDB API
 */
export interface TheMealDBMeal {
  idMeal: string
  strMeal: string
  strMealThumb: string
}

/**
 * Tipos internos da TheCocktailDB API
 */
export interface TheCocktailDBDrink {
  idDrink: string
  strDrink: string
  strDrinkThumb: string
}
