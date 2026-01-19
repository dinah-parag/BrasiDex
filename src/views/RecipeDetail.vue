<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const recipe = ref(null)
const loading = ref(true)

onMounted(async () => {
  const recipeId = route.params.id // Lembre-se: agora o ID é o índice (0, 1, 2...)
  
  try {
    const res = await fetch('/receitas.json')
    const data = await res.json()
    
    // Pegamos a receita pelo índice numérico
    recipe.value = data[parseInt(recipeId)]
    
    // Adicionamos a imagem fake caso precise
    if(recipe.value) {
        recipe.value.imagem = 'https://images.unsplash.com/photo-1543353071-87d8928d8a3d?q=80&w=600&auto=format&fit=crop'
    }

  } catch (error) {
    console.error(error)
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div v-if="loading">Carregando...</div>
  
  <div v-else-if="recipe" class="detail-container">
    <h1>{{ recipe.nome }}</h1>
    <img :src="recipe.imagem" class="detail-img" />

    <div class="ingredients">
      <h3>Ingredientes</h3>
      <ul>
        <li v-for="(item, index) in recipe.ingredientes" :key="index">
          {{ item }}
        </li>
      </ul>
    </div>

    <div class="instructions">
      <h3>Modo de Preparo</h3>
      
      <div v-for="(secao, index) in recipe.secao" :key="index" class="step-section">
        <h4>{{ secao.nome }}</h4>
        <ul>
            <li v-for="(passo, i) in secao.conteudo" :key="i">
                {{ passo }}
            </li>
        </ul>
      </div>
    </div>
    
    <RouterLink to="/" class="btn-back">Voltar</RouterLink>
  </div>
</template>

<style scoped>
.detail-container { max-width: 800px; margin: 0 auto; padding-bottom: 50px; }
.detail-img { width: 100%; height: 300px; object-fit: cover; border-radius: 8px; }
.step-section { margin-bottom: 20px; background: #f9f9f9; padding: 15px; border-radius: 8px; }
.step-section h4 { margin-top: 0; color: #42b983; }
.btn-back { display: inline-block; margin-top: 20px; padding: 10px 20px; background: #666; color: white; text-decoration: none; border-radius: 5px; }
</style>