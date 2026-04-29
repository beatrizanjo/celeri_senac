/**
 * Serviço de integração com APIs de receitas
 * Normaliza dados de TheMealDB e TheCocktailDB
 */

import type { RecipeCard, TheMealDBMeal, TheCocktailDBDrink } from '../types/recipes'

const MEALDB_BASE = 'https://www.themealdb.com/api/json/v1/1'
const COCKTAILDB_BASE = 'https://www.thecocktaildb.com/api/json/v1/1'

/**
 * Normaliza dados da TheMealDB para o formato padrão RecipeCard
 */
const normalizeMeal = (meal: TheMealDBMeal): RecipeCard => ({
  id: meal.idMeal,
  title: meal.strMeal,
  image: meal.strMealThumb,
})

/**
 * Normaliza dados da TheCocktailDB para o formato padrão RecipeCard
 */
const normalizeDrink = (drink: TheCocktailDBDrink): RecipeCard => ({
  id: drink.idDrink,
  title: drink.strDrink,
  image: drink.strDrinkThumb,
})

/**
 * Busca receitas por categoria na TheMealDB
 * @param category - Categoria da receita (ex: 'Beef', 'Vegan', 'Vegetarian')
 * @returns Array de receitas normalizadas
 */
export const fetchMealsByCategory = async (category: string): Promise<RecipeCard[]> => {
  try {
    const response = await fetch(`${MEALDB_BASE}/filter.php?c=${category}`)
    if (!response.ok) throw new Error(`Erro ao buscar refeições: ${response.statusText}`)
    
    const data = await response.json()
    
    if (!data.meals) {
      console.warn(`Nenhuma refeição encontrada para a categoria: ${category}`)
      return []
    }
    
    return data.meals.map(normalizeMeal)
  } catch (error) {
    console.error('Erro em fetchMealsByCategory:', error)
    throw error
  }
}

/**
 * Busca bebidas por categoria na TheCocktailDB
 * @param category - Categoria da bebida (ex: 'Ordinary Drink', 'Cocktail')
 * @returns Array de bebidas normalizadas
 */
export const fetchDrinksByCategory = async (category: string): Promise<RecipeCard[]> => {
  try {
    const response = await fetch(`${COCKTAILDB_BASE}/filter.php?c=${category}`)
    if (!response.ok) throw new Error(`Erro ao buscar bebidas: ${response.statusText}`)
    
    const data = await response.json()
    
    if (!data.drinks) {
      console.warn(`Nenhuma bebida encontrada para a categoria: ${category}`)
      return []
    }
    
    return data.drinks.map(normalizeDrink)
  } catch (error) {
    console.error('Erro em fetchDrinksByCategory:', error)
    throw error
  }
}

/**
 * Busca receitas por nome na TheMealDB
 * Útil para buscas por nome de receita
 */
export const fetchMealsByName = async (name: string): Promise<RecipeCard[]> => {
  try {
    const response = await fetch(`${MEALDB_BASE}/search.php?s=${name}`)
    if (!response.ok) throw new Error(`Erro ao buscar por nome: ${response.statusText}`)
    
    const data = await response.json()
    
    if (!data.meals) return []
    
    return data.meals.map(normalizeMeal)
  } catch (error) {
    console.error('Erro em fetchMealsByName:', error)
    throw error
  }
}

/**
 * Busca bebidas por nome na TheCocktailDB
 */
export const fetchDrinksByName = async (name: string): Promise<RecipeCard[]> => {
  try {
    const response = await fetch(`${COCKTAILDB_BASE}/search.php?s=${name}`)
    if (!response.ok) throw new Error(`Erro ao buscar bebida por nome: ${response.statusText}`)
    
    const data = await response.json()
    
    if (!data.drinks) return []
    
    return data.drinks.map(normalizeDrink)
  } catch (error) {
    console.error('Erro em fetchDrinksByName:', error)
    throw error
  }
}

/**
 * Busca receitas por ingrediente na TheMealDB
 * Útil para buscas personalizadas
 */
export const fetchMealsByIngredient = async (ingredient: string): Promise<RecipeCard[]> => {
  try {
    const response = await fetch(`${MEALDB_BASE}/filter.php?i=${ingredient}`)
    if (!response.ok) throw new Error(`Erro ao buscar por ingrediente: ${response.statusText}`)
    
    const data = await response.json()
    
    if (!data.meals) return []
    
    return data.meals.map(normalizeMeal)
  } catch (error) {
    console.error('Erro em fetchMealsByIngredient:', error)
    throw error
  }
}

/**
 * Busca receita completa por ID (com ingredientes e modo de preparo)
 */
export const fetchMealById = async (id: string) => {
  try {
    const response = await fetch(`${MEALDB_BASE}/lookup.php?i=${id}`)
    if (!response.ok) throw new Error(`Erro ao buscar receita: ${response.statusText}`)
    
    const data = await response.json()
    return data.meals ? data.meals[0] : null
  } catch (error) {
    console.error('Erro em fetchMealById:', error)
    throw error
  }
}

/**
 * Busca bebida completa por ID
 */
export const fetchDrinkById = async (id: string) => {
  try {
    const response = await fetch(`${COCKTAILDB_BASE}/lookup.php?i=${id}`)
    if (!response.ok) throw new Error(`Erro ao buscar bebida: ${response.statusText}`)
    
    const data = await response.json()
    return data.drinks ? data.drinks[0] : null
  } catch (error) {
    console.error('Erro em fetchDrinkById:', error)
    throw error
  }
}

/**
 * Busca receitas aleatórias da TheMealDB
 */
export const fetchRandomMeals = async (count: number = 10): Promise<RecipeCard[]> => {
  const recipes: RecipeCard[] = []
  
  try {
    for (let i = 0; i < count; i++) {
      const response = await fetch(`${MEALDB_BASE}/random.php`)
      if (response.ok) {
        const data = await response.json()
        if (data.meals) {
          recipes.push(normalizeMeal(data.meals[0]))
        }
      }
    }
    return recipes
  } catch (error) {
    console.error('Erro em fetchRandomMeals:', error)
    throw error
  }
}
