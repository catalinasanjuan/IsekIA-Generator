<script setup lang="ts">
import { ref } from 'vue'
import html2canvas from 'html2canvas'

interface Answers {
  personality: string
  death: string
  power: string
}

const answers = ref<Answers>({
  personality: '',
  death: '',
  power: ''
})

const result = ref<string>('')

const generateStory = () => {
  const { personality, death, power } = answers.value
  result.value = `Has sido reencarnado en un nuevo mundo como un aventurero ${personality}. 
    Tu muerte en el mundo real (${death}) te ha otorgado la habilidad única de ${power}.
    Ahora, estás destinado a cambiar el destino de este mundo y convertirte en una leyenda.`
}

const downloadStory = async () => {
  const element = document.querySelector('.story')
  if (element) {
    const canvas = await html2canvas(element)
    const link = document.createElement('a')
    link.download = 'isekai_story.png'
    link.href = canvas.toDataURL()
    link.click()
  }
}
</script>

<template>
  <div class="min-h-screen bg-gradient-to-b from-gray-900 to-indigo-900 py-12 px-4">
    <div class="max-w-2xl mx-auto">
      <div class="quiz-container text-center text-white">
        <h1 class="text-4xl font-bold mb-6">🌎 Simulador de Reencarnación Isekai</h1>
        <p class="mb-8">Responde algunas preguntas y descubre tu destino en otro mundo...</p>
        
        <form v-if="!result" @submit.prevent="generateStory" class="space-y-6">
          <div class="space-y-2">
            <label class="block text-lg">📌 ¿Qué tipo de personalidad tienes?</label>
            <select v-model="answers.personality" 
                    class="w-full p-2 rounded bg-white/10 border border-white/20 text-white">
              <option value="">Selecciona una opción</option>
              <option>Valiente y aventurero</option>
              <option>Misterioso e inteligente</option>
              <option>Relajado y despreocupado</option>
              <option>Carismático y líder nato</option>
            </select>
          </div>

          <div class="space-y-2">
            <label class="block text-lg">🌀 ¿Cómo moriste en el mundo real?</label>
            <select v-model="answers.death"
                    class="w-full p-2 rounded bg-white/10 border border-white/20 text-white">
              <option value="">Selecciona una opción</option>
              <option>Atropellado por un camión</option>
              <option>Murió de viejo y reencarnó</option>
              <option>Un error de los dioses</option>
              <option>Murió salvando a alguien</option>
            </select>
          </div>

          <div class="space-y-2">
            <label class="block text-lg">✨ ¿Qué tipo de poder especial recibirás?</label>
            <select v-model="answers.power"
                    class="w-full p-2 rounded bg-white/10 border border-white/20 text-white">
              <option value="">Selecciona una opción</option>
              <option>Control del tiempo</option>
              <option>Magia prohibida</option>
              <option>Habilidades de un héroe legendario</option>
              <option>Dominar criaturas místicas</option>
            </select>
          </div>

          <button type="submit" 
                  class="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 px-6 rounded-lg transition-colors">
            🔮 Generar Historia
          </button>
        </form>

        <div v-if="result" class="story mt-8 p-6 bg-white/10 rounded-lg backdrop-blur-sm">
          <h2 class="text-2xl font-bold mb-4">📜 ¡Bienvenido a tu nueva vida!</h2>
          <p class="text-lg mb-6">{{ result }}</p>
          <button @click="downloadStory"
                  class="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 px-6 rounded-lg transition-colors">
            📥 Descargar como imagen
          </button>
        </div>
      </div>
    </div>
  </div>
</template>