# Despliegue en Vercel 🚀

Esta guía te ayudará a desplegar **MegaLinkGen** en Vercel con soporte para funciones serverless.

## Ventajas de Vercel

- ✅ Funciones serverless automáticas (`/api/**`)
- ✅ CORS manejado correctamente
- ✅ Despliegue automático desde GitHub
- ✅ Variables de entorno seguras
- ✅ SSL/HTTPS automático
- ✅ CDN global

## Pasos de Configuración

### 1. Conectar repositorio en Vercel

1. Ve a https://vercel.com y regístrate/inicia sesión
2. Haz clic en **"Add New..."** → **"Project"**
3. Selecciona **"Import Git Repository"**
4. Busca y selecciona `Xinzayr/MegaLinkGen`
5. Haz clic en **"Import"**

### 2. Configurar proyecto

En la pantalla de configuración:

- **Framework Preset**: Selecciona **"Vite"**
- **Build Command**: `npm run build` (dejarlo por defecto)
- **Output Directory**: `dist` (dejarlo por defecto)
- **Install Command**: `npm install` (dejarlo por defecto)

Haz clic en **"Deploy"**

### 3. Variables de entorno (Opcional)

Si quieres usar una URL específica para `VITE_API_BASE`:

1. Ve a **Settings** → **Environment Variables**
2. Agrega una nueva variable:
   - **Name:** `VITE_API_BASE`
   - **Value:** Deja vacío o usa tu dominio custom `https://tu-dominio.com`
   - **Environments:** Todas (Production, Preview, Development)
3. Haz clic en **"Save"**
4. Vuelve a deployar (Settings → Deployments → Redeploy latest)

> **Nota**: Si dejas `VITE_API_BASE` vacío, la app usará automáticamente `https://<tu-proyecto>.vercel.app`

### 4. Dominio custom (Opcional)

Si tienes un dominio personalizado:

1. Ve a **Settings** → **Domains**
2. Agrega tu dominio
3. Sigue los pasos para configurar los DNS records

## Verificar despliegue

1. Ve a tu proyecto en Vercel
2. Copia la URL del deployment (ej: `https://mega-link-gen.vercel.app`)
3. Abre en navegador y:
   - Pega un link de archivo Mega
   - Deberías ver: nombre, tamaño, enlace directo, código QR
   - Haz clic en **"Download Now"** para verificar que funciona

## Testing local con serverless

Para probar las funciones serverless localmente:

```bash
# Instala Vercel CLI
npm i -g vercel

# Desarrolla con serverless local
vercel dev

# Luego abre http://localhost:3000
```

## Solución de problemas

### Error: "Cannot find module '@vercel/node'"

```bash
npm install --save-dev @vercel/node
```

### Error: CORS bloqueado

Las funciones serverless de Vercel manejan CORS automáticamente. Si aún ves el error:
- Limpia caché del navegador (DevTools → Application → Clear storage)
- Refresco duro: Ctrl+Shift+R

### Error: "VITE_API_BASE no definida"

La app usa fallback a API externa de forma automática. No debería haber error.

## Estructura de archivos esperada

```
/
├── dist/                  # Build de Vite (estático)
├── api/
│   └── mega-direct-link.js   # Función serverless
├── src/                   # Código fuente Vue
├── vercel.json            # Configuración de Vercel
├── vite.config.js
└── package.json
```

## URLs finales

- **Vercel default**: `https://mega-link-gen-xinzayr.vercel.app`
- **GitHub Pages**: `https://xinzayr.github.io/MegaLinkGen/`

Ambas funcionan con la misma base de código. La diferencia:
- **Vercel**: Usa `/api/mega-direct-link` (serverless)
- **GH Pages**: Usa `mega.wldbs.workers.dev` (fallback externo)

## Despliegues automáticos

Cada push a `master` trigger automáticamente un nuevo deploy en Vercel.

Para ver histórico de deploys: Ve a Vercel → Tu proyecto → **Deployments**

---

¿Necesitas ayuda? Revisa los logs en Vercel: **Settings** → **Build & Development Settings** → mira los **Build Logs**.
