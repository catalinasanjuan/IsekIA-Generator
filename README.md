# 📜 IsekAI Generator

IsekAI Generator es una aplicación web que permite a los usuarios generar historias personalizadas de reencarnación en un mundo de fantasía, basadas en sus elecciones.

## 🌟 Características
- Generación de historias personalizadas con **Cohere AI**.
- Descarga de la historia generada como imagen.
- Compartir la historia en **X (Twitter), Facebook y WhatsApp**.
- Interfaz amigable y con animaciones utilizando **GSAP**.

## 🚀 Tecnologías Utilizadas
- **Vue.js 3 + Vite**
- **TypeScript**
- **Tailwind CSS**
- **Cohere AI API** para la generación de texto.
- **html2canvas** para la descarga de historias.
- **GSAP** para animaciones.

## 📦 Instalación
### 1️⃣ Clonar el repositorio
```sh
 git clone https://github.com/catalinasanjuan/IsekIA-Generator.git
 cd IsekAI-Generator
```

### 2️⃣ Instalar dependencias
```sh
 npm install
```

### 3️⃣ Configurar variables de entorno
Crea un archivo `.env` en la raíz del proyecto y agrega tu clave de la API de **Cohere AI**:
```env
VITE_COHERE_API_KEY=tu_api_key_aqui
```

### 4️⃣ Ejecutar el proyecto en modo desarrollo
```sh
 npm run dev
```
Luego, abre **http://localhost:5173/** en tu navegador.

## 🎨 Personalización
Si deseas modificar la apariencia del proyecto, puedes editar los estilos en **Tailwind CSS** ubicados en `src/style.css`.

## 📤 Compartir en Redes Sociales
Los usuarios pueden compartir su historia en **X (Twitter), Facebook y WhatsApp** mediante enlaces dinámicos. Estos botones están implementados en `Quiz.vue`.


## 👩‍💻 Autor
**Catalina San Juan**

