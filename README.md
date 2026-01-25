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

Se pueden usar dos opciones. Ve a [VERCEL_SETUP.md](./VERCEL_SETUP.md) para instrucciones detalladas de Vercel.

### GitHub Pages ✅

```bash
# Build con base path para GitHub Pages
GITHUB_PAGES=true npm run build

# El contenido será automáticamente deployado por GitHub Actions a gh-pages
```

Configura GitHub Pages en Settings > Pages:
- **Source**: Deploy from a branch
- **Branch**: `gh-pages` / root

**URL**: https://xinzayr.github.io/MegaLinkGen/

**Ventajas:**
- ✅ Totalmente gratis
- ✅ Integración automática con GitHub Actions
- ✅ Sin configuración extra

**Limitaciones:**
- Sin backend serverless (usa API externa fallback)
- Posibles limitaciones de CORS

### Vercel 🚀

Conecta tu repositorio en Vercel para despliegue automático con serverless integrado.

**Pasos rápidos:**
1. Ve a https://vercel.com y regístrate
2. Haz clic en "Add New Project"
3. Selecciona tu repositorio `Xinzayr/MegaLinkGen`
4. ¡Vercel hace el resto automáticamente!

**URL**: https://mega-link-gen-xinzayr.vercel.app (o tu dominio custom)

**Ventajas:**
- ⚡ Función serverless `/api/mega-direct-link` automática
- 🌍 CDN global ultra-rápido
- 🔒 CORS manejado correctamente
- 🔄 Despliegue automático en cada push
- 📊 Analytics y monitoreo integrado

Ver [VERCEL_SETUP.md](./VERCEL_SETUP.md) para configuración completa y troubleshooting.

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
