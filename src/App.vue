<script setup>
</script>

<template>
  <header>
    <nav>
      <RouterLink to="/" class="logo">🥗 VeggieDex 🥗</RouterLink>
    </nav>
  </header>

  <main>
    <RouterView />
  </main>
</template>

<style scoped>
header {
  background: #49b794;
  padding: 1rem;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
}
.logo {
  font-size: 1.5rem;
  font-weight: bold;
  color: white;
  text-decoration: none;
}
main {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}
</style>