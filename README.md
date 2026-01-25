# Mega Link Generator v2.0

🚀 Generador avanzado de enlaces directos de Mega.nz con soporte PWA, multi-idioma y procesamiento por lotes.

## ✨ Características

- 📱 **PWA Instalable**: Instala la app y úsala offline
- ⚡ **Procesamiento por Lotes**: Procesa múltiples enlaces simultáneamente
- 📚 **Historial Local**: Guarda automáticamente tus enlaces
- 🌍 **Multi-idioma**: Español, Inglés, Portugués y Francés
- 📱 **Códigos QR**: Genera y descarga códigos QR
- ✅ **Verificación de Enlaces**: Comprueba si los enlaces funcionan
- 🎨 **UI Moderna**: Construida con Vue 3 + Tailwind CSS
- 👨‍💻 **Modo Desarrollador**: Información detallada de API y rendimiento

## 🛠️ Stack Tecnológico

- **Framework**: Vue 3 (Composition API)
- **Build Tool**: Vite
- **Estilos**: Tailwind CSS
- **Estado**: Pinia
- **Routing**: Vue Router
- **i18n**: vue-i18n
- **PWA**: vite-plugin-pwa (Workbox)
- **QR**: qrcode.js

## 📦 Instalación

```bash
# Instalar dependencias
npm install

# Desarrollo
npm run dev

# Build para producción
npm run build

# Preview del build
npm run preview
```

## 🚀 Despliegue

### GitHub Pages

```bash
# Build con base path para GitHub Pages
GITHUB_PAGES=true npm run build

# El contenido de dist/ debe subirse a la rama gh-pages
```

Configura GitHub Pages en Settings > Pages:
- Source: Deploy from a branch
- Branch: gh-pages / root

URL esperado (cuando Pages esté activo):

- https://xinzayr.github.io/MegaLinkGen/

### Vercel

```bash
# Build normal
npm run build

# O usando el script
npm run deploy:vercel
```

Conecta tu repositorio en Vercel y despliega automáticamente.

Para habilitar enlaces directos confiables, este proyecto incluye una función serverless:

- Endpoint: `/api/mega-direct-link` (Vercel)
- Uso: el frontend llama este endpoint si defines `VITE_API_BASE` en variables de entorno (por ejemplo, `https://tu-proyecto.vercel.app`).

Variables de entorno (Vercel → Project Settings → Environment Variables):

```
VITE_API_BASE=https://tu-proyecto.vercel.app
```

Nota: En GitHub Pages no hay backend; el frontend usa un fallback y podría estar limitado por CORS del API de Mega.

También puedes copiar `.env.example` a `.env` para desarrollo local y definir `VITE_API_BASE` si ejecutas un proxy o pruebas contra tu dominio de Vercel.

### Configuración Manual

1. **GitHub Pages**: Asegúrate de que `base` en vite.config.js coincida con tu repo name
2. **Vercel**: El archivo `vercel.json` ya está configurado

## 🌐 Uso

1. Pega una URL de Mega.nz (formato file)
2. Haz clic en "Generar Enlace"
3. Copia el enlace directo o descarga el QR
4. Para múltiples enlaces, cambia a "Modo Múltiple"

## 🔧 Desarrollo

```bash
# Instalar dependencias
npm install

# Servidor de desarrollo
npm run dev

# Build
npm run build

# Preview
npm run preview
```

## 📁 Estructura del Proyecto

```
mega/
├── src/
│   ├── components/      # Componentes Vue reutilizables
│   ├── views/           # Páginas/vistas
│   ├── stores/          # Stores de Pinia
│   ├── composables/     # Lógica reutilizable
│   ├── locales/         # Archivos de traducción
│   ├── router/          # Configuración del router
│   ├── i18n/            # Configuración i18n
│   ├── App.vue          # Componente raíz
│   ├── main.js          # Punto de entrada
│   └── style.css        # Estilos globales
├── public/              # Assets estáticos
├── index.html           # Template HTML
├── vite.config.js       # Configuración de Vite
├── tailwind.config.js   # Configuración de Tailwind
└── package.json         # Dependencias
```

## 🤝 Contribuir

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

MIT License - siéntete libre de usar este proyecto como desees.

## 🔗 Enlaces

- [Mega.nz](https://mega.nz)
- [Vue 3](https://vuejs.org)
- [Vite](https://vitejs.dev)
- [Tailwind CSS](https://tailwindcss.com)

---

⭐ Si te gusta este proyecto, dale una estrella en GitHub!
