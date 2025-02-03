<script setup lang="ts">

import { ref, onMounted, nextTick } from 'vue'
import gsap from 'gsap'
import html2canvas from 'html2canvas'
import { generateIsekaiStory } from '../api'

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
const loading = ref<boolean>(false)

const generateStory = async () => {
  if (loading.value) return; // Evita múltiples clics seguidos
  loading.value = true
  const { personality, death, power } = answers.value

  try {
    result.value = await generateIsekaiStory(personality, death, power) // Asegurar que la IA responde antes de continuar
  } catch (error) {
    console.error('Error al generar la historia:', error)
    result.value = 'Hubo un error generando la historia. Inténtalo de nuevo.'
  }

  loading.value = false

  nextTick(() => {
    gsap.fromTo('.story', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1 })
  })
}

const downloadStory = async () => {
  const element = document.querySelector('.story') as HTMLElement | null
  if (element) {
    try {
      const canvas = await html2canvas(element, {
        backgroundColor: '#1a1a2e',
        scale: 2,
        useCORS: true
      })
      const link = document.createElement('a')
      link.download = 'isekai_story.png'
      link.href = canvas.toDataURL('image/png')
      link.click()
    } catch (error) {
      console.error('Error al capturar la historia:', error)
    }
  } else {
    console.warn('Elemento .story no encontrado.')
  }
}
const compartirEnTwitter = () => {
  if (!result.value) return; 
  const texto = encodeURIComponent(`¡Mira la historia isekai que generé! ${result.value}`);
  const url = `https://twitter.com/intent/tweet?text=${texto}`;
  window.open(url, "_blank");
};

const compartirEnFacebook = () => {
  if (!result.value) return;
  const texto = encodeURIComponent(`¡Mira la historia isekai que generé!`);
  const url = `https://www.facebook.com/sharer/sharer.php?u=https://isekai.com&quote=${texto}`;
  window.open(url, "_blank");
};

const compartirEnWhatsApp = () => {
  if (!result.value) return;
  const texto = encodeURIComponent(`¡Mira la historia isekai que generé! ${result.value}`);
  const url = `https://wa.me/?text=${texto}`;
  window.open(url, "_blank");
};

onMounted(() => {
  gsap.fromTo('.quiz-container', { opacity: 0, y: -50 }, { opacity: 1, y: 0, duration: 1.5 })
})
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
        <div class="flex flex-wrap justify-center gap-4 mt-4">
          <button @click="compartirEnTwitter"
              class="bg-gray-500 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-lg">
              ✖ Compartir en X
          </button>


            <button @click="compartirEnFacebook"
                class="bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded-lg">
                📘 Compartir en Facebook
            </button>

            <button @click="compartirEnWhatsApp"
                class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg">
                💬 Compartir en WhatsApp
            </button>
        </div>

      </div>
    </div>
  </div>
</template>