# Integração de Receitas - Documentação

## 📋 Estrutura Implementada

### 1. **Tipos TypeScript** (`src/types/recipes.ts`)
- `RecipeCard`: Interface normalizada para receitas
- `TheMealDBMeal` / `TheCocktailDBDrink`: Tipos das APIs externas
- Mapeamento de categorias para labels em português

### 2. **Serviço de API** (`src/services/recipeService.ts`)
Funções disponíveis:
- `fetchMealsByCategory(category)` - Buscar refeições por categoria
- `fetchDrinksByCategory(category)` - Buscar bebidas por categoria
- `fetchMealsByIngredient(ingredient)` - Buscar por ingrediente
- `fetchMealById(id)` / `fetchDrinkById(id)` - Detalhes completos
- `fetchRandomMeals(count)` - Receitas aleatórias

### 3. **Hook Customizado** (`src/hooks/useRecipes.ts`)
```tsx
const { recipes, loading, error, retry } = useRecipes({ 
  category: 'Beef',
  isDrink: false 
})
```

### 4. **Componente Card** (`src/componentes/recipeCard/RecipeCard.tsx`)
Card responsivo com:
- Imagem em aspectratio 1:1
- Título com ellipsis em 2 linhas
- Hover animado
- Fallback para imagens quebradas

---

## 🎯 Mapeamento de Categorias

| Aba | Categoria TheMealDB | isDrink |
|-----|-------------------|---------|
| MEET | `Beef` ou `Chicken` | false |
| VEGAN | `Vegan` | false |
| VEGGIE | `Vegetarian` | false |
| SWEET | `Dessert` | false |
| PASTA | `Pasta` | false |
| SALAD | `Starter` | false |
| SNACK | `Side` | false |
| DRINK | `Cocktail` ou `Ordinary Drink` | true |

---

## 💻 Como Usar em Outras Páginas

### Exemplo 1: Página Simples
```tsx
import { useRecipes } from '../hooks/useRecipes'
import RecipeCard from '../componentes/recipeCard/RecipeCard'
import './recipes-page.css'

function Vegano() {
  const { recipes, loading, error, retry } = useRecipes({ 
    category: 'Vegan',
    isDrink: false 
  })

  if (loading) return <div>Carregando...</div>
  if (error) return <div>Erro: {error}</div>

  return (
    <div className="recipes-page">
      <h1>Vegano</h1>
      <div className="recipes-grid">
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>
    </div>
  )
}

export default Vegano
```

### Exemplo 2: Bebidas
```tsx
function Bebidas() {
  const { recipes, loading, error } = useRecipes({ 
    category: 'Cocktail',
    isDrink: true  // ← Usar TheCocktailDB
  })

  // ... resto do código igual
}
```

### Exemplo 3: Múltiplas Categorias
```tsx
import { useRecipesByCategories } from '../hooks/useRecipes'

function Home() {
  const { allRecipes, loading, error } = useRecipesByCategories(
    ['Beef', 'Vegan', 'Vegetarian'],
    false
  )

  // allRecipes['Beef'] contém as receitas de carne
  // allRecipes['Vegan'] contém as receitas veganas
}
```

---

## 🎨 Personalizações Possíveis

### Adicionar onclick ao Card
```tsx
<RecipeCard 
  recipe={recipe}
  onClick={(id) => {
    // Abrir modal com detalhes
    // Redirecionar para página de detalhes
  }}
/>
```

### Alterar Grid
No arquivo `recipes-page.css`:
```css
.recipes-grid {
  grid-template-columns: repeat(4, 1fr); /* 4 colunas */
  gap: 20px;
}
```

### Estilizar Loading
```tsx
<div className="recipes-loading">
  <div className="spinner">Loading...</div>
  <p>Por favor aguarde...</p>
</div>
```

---

## 🔗 APIs Utilizadas

- **TheMealDB**: https://www.themealdb.com/api.php
- **TheCocktailDB**: https://www.thecocktaildb.com/api.php

Ambas são gratuitas e não exigem chave de API!

---

## ✅ Próximos Passos

1. ✅ Implementar em página de exemplo (Carnes) 
2. ⬜ Copiar padrão para todas as outras páginas
3. ⬜ Adicionar página de detalhes da receita
4. ⬜ Implementar busca por ingrediente
5. ⬜ Adicionar favoritos com localStorage
