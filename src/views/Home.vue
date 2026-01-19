<script setup>
import { ref, onMounted, computed } from 'vue'

const recipes = ref([])
const loading = ref(true)
const searchTerm = ref('')

// Paginação simples para não travar o navegador com 8000 receitas na tela
const ITEMS_PER_PAGE = 12
const currentPage = ref(1)

const fetchRecipes = async () => {
  try {
    const response = await fetch('/receitas.json')
    const data = await response.json()
    // O JSON do Afrodite não tem IDs numéricos simples, vamos criar um index para usar de ID
    recipes.value = data.map((recipe, index) => ({
      ...recipe,
      id: index.toString(), // Cria um ID baseado na posição
      // Como esse JSON não tem fotos, vamos usar uma imagem padrão bonita
      imagem: 'https://images.unsplash.com/photo-1543353071-87d8928d8a3d?q=80&w=600&auto=format&fit=crop' 
    }))
  } catch (error) {
    console.error("Erro ao carregar receitas:", error)
  } finally {
    loading.value = false
  }
}

// Filtra E limita a quantidade para exibir
const filteredRecipes = computed(() => {
  let result = recipes.value
  
  // 1. Filtrar por nome
  if (searchTerm.value) {
    result = result.filter(recipe => 
      recipe.nome.toLowerCase().includes(searchTerm.value.toLowerCase())
    )
  }
  
  // 2. Pegar apenas os primeiros X itens (paginação infinita seria o ideal, mas isso resolve)
  return result.slice(0, ITEMS_PER_PAGE * currentPage.value)
})

const loadMore = () => {
  currentPage.value++
}

onMounted(() => {
  fetchRecipes()
})
</script>

<template>
  <div>
    <h1>Receitas Brasileiras ({{ recipes.length }}) 🇧🇷</h1>
    
    <input 
      v-model="searchTerm" 
      placeholder="Buscar entre 8.000 receitas (ex: Pudim)..." 
      class="search-input"
    />

    <div v-if="loading">Carregando banco de dados...</div>

    <div v-else>
      <div class="recipe-grid">
        <div v-for="recipe in filteredRecipes" :key="recipe.id" class="card">
          <img :src="recipe.imagem" alt="Prato" />
          <h3>{{ recipe.nome }}</h3>
          <p class="category">Ver detalhes para ingredientes</p>
          <RouterLink :to="`/recipe/${recipe.id}`" class="btn-details">
            Ver Receita
          </RouterLink>
        </div>
      </div>
      
      <div class="load-more-container" v-if="filteredRecipes.length < recipes.length">
        <button @click="loadMore" class="btn-load">Carregar Mais Receitas</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* (Mantenha o CSS anterior e adicione estes) */
.search-input { width: 100%; padding: 12px; margin-bottom: 20px; font-size: 1.1rem; border: 2px solid #42b983; border-radius: 8px; }
.category { font-size: 0.9rem; color: #666; margin-bottom: 10px; }
.load-more-container { text-align: center; margin-top: 30px; }
.btn-load { padding: 10px 30px; background: #2c3e50; color: white; border: none; border-radius: 5px; cursor: pointer; font-size: 1rem; }
.btn-load:hover { background: #34495e; }
/* Mantenha o .recipe-grid e .card do passo anterior */
.recipe-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 20px; }
.card { border: 1px solid #eee; border-radius: 8px; padding: 10px; text-align: center; transition: transform 0.2s; }
.card:hover { transform: translateY(-5px); box-shadow: 0 4px 12px rgba(0,0,0,0.1); }
.card img { width: 100%; height: 150px; object-fit: cover; border-radius: 5px; }
.btn-details { display: inline-block; margin-top: 10px; padding: 8px 16px; background: #42b983; color: white; text-decoration: none; border-radius: 4px; }
</style>