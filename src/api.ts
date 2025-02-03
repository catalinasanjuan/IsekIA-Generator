import { CohereClient } from "cohere-ai";

const cohere = new CohereClient({
  token: import.meta.env.VITE_COHERE_API_KEY, // Usa la API Key desde .env
});

export const generateIsekaiStory = async (personality: string, death: string, power: string) => {
  const prompt = `Has sido reencarnado en un nuevo mundo como un aventurero ${personality}. 
    Tu muerte en el mundo real (${death}) te ha otorgado la habilidad única de ${power}.
    Ahora, estás destinado a cambiar el destino de este mundo y convertirte en una leyenda.`;

  try {
    const response = await cohere.generate({
        model: "command-r-plus",
      prompt: prompt,
      maxTokens: 300, // ✅ Corrección aplicada
      temperature: 0.7,
    });

    return response.generations[0].text.trim();
  } catch (error) {
    console.error("Error al generar la historia con Cohere:", error);
    return "❌ Hubo un error al generar la historia. Inténtalo de nuevo.";
  }
};
