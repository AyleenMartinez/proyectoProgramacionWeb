# Imágenes NEKOBRELLA CORPORATION

## Descripción
Esta carpeta contiene placeholders SVG para el sitio NEKOBRELLA CORPORATION. Los placeholders son funcionales y se ven bien, pero puedes reemplazarlos con imágenes PNG, JPG o WebP reales.

## Archivos Placeholder SVG

### 1. laboratorio-felino.svg
- **Ubicación**: Página de inicio (index.html) - Hero section
- **Dimensiones**: 800x400px (responsivo)
- **Descripción**: Panel visual de laboratorio felino
- **Tema**: Corporación secreta, laboratorio biológico
- **Reemplazar con**: Imagen real de laboratorio, gatos en experimento, o visual futurista

### 2. investigacion-genetica.svg
- **Ubicación**: servicios.html
- **Dimensiones**: 600x400px (responsivo)
- **Descripción**: Servicio de investigación genética
- **Tema**: ADN, análisis genético, experimentos científicos
- **Reemplazar con**: Imagen de laboratorio genético, cadena de ADN, microscopio

### 3. contencion-biologica.svg
- **Ubicación**: servicios.html
- **Dimensiones**: 600x400px (responsivo)
- **Descripción**: Servicio de contención biológica
- **Tema**: Seguridad, bóveda, contención
- **Reemplazar con**: Imagen de bóveda segura, jaula, equipo de protección

### 4. neurocomportamiento.svg
- **Ubicación**: servicios.html
- **Dimensiones**: 600x400px (responsivo)
- **Descripción**: Servicio de neurocomportamiento
- **Tema**: Comportamiento animal, gatos, estudios de conducta
- **Reemplazar con**: Imagen de gato, análisis de comportamiento, experimento

### 5. sujeto-m01.svg
- **Ubicación**: sujetos.html - Card M-01 Naranjo
- **Dimensiones**: 400x300px (responsivo)
- **Color**: Rojo (#d32f2f) - Amenaza Alta
- **Descripción**: Subject M-01 Naranjo
- **Tema**: Gato naranja experimental, nivel de amenaza alto
- **Reemplazar con**: Foto de gato naranja o ilustración amenazante

### 6. sujeto-m07.svg
- **Ubicación**: sujetos.html - Card M-07 Michi Táctico
- **Dimensiones**: 400x300px (responsivo)
- **Color**: Naranja (#d1652f) - Amenaza Media
- **Descripción**: Subject M-07 Michi Táctico
- **Tema**: Gato táctico, nivel de amenaza medio
- **Reemplazar con**: Foto de gato o ilustración con pose táctica

### 7. sujeto-m13.svg
- **Ubicación**: sujetos.html - Card M-13 Entidad de Pasillo
- **Dimensiones**: 400x300px (responsivo)
- **Color**: Rojo Brillante (#ff0000) - Amenaza Crítica
- **Descripción**: Subject M-13 Entidad de Pasillo
- **Tema**: Criatura experimental paranormal, nivel crítico
- **Reemplazar con**: Imagen ominosa, entity-like, o gato distorsionado

### 8. biohazard-report.svg
- **Ubicación**: reporte.html - Banner de advertencia
- **Dimensiones**: 600x300px (responsivo)
- **Descripción**: Banner BIOHAZARD REPORT SYSTEM
- **Tema**: Advertencia, peligro biológico, incidentes clasificados
- **Reemplazar con**: Símbolo biohazard, advertencia de peligro, sistema de alertas

## Cómo reemplazar las imágenes

### Opción 1: Convertir SVG a PNG
Puedes usar una herramienta online o software local:
- Convertir cada .svg a .png con fondo transparente
- Renombrar manteniendo los nombres exactos
- Guardar en public/img/

### Opción 2: Usar imágenes propias
1. Obtén imágenes PNG, JPG o WebP
2. Renómbralas exactamente como los archivos SVG (sin la extensión .svg)
3. Añade la extensión correcta (.png, .jpg, .webp)
4. Reemplaza los archivos SVG en public/img/

Ej:
```
laboratorio-felino.svg  →  laboratorio-felino.png
sujeto-m01.svg          →  sujeto-m01.png
```

### Opción 3: Usar URLs externas (temporal)
Si quieres usar imágenes online mientras obtienes las locales:
1. Edita los archivos HTML
2. Cambia `src="img/archivo.svg"` a `src="https://ejemplo.com/imagen.jpg"`
3. Después reemplaza con archivos locales

## Recomendaciones de especificaciones

### Resolución
- Imágenes chicas (sujetos): 400x300px mínimo (recomendado: 600x450px)
- Imágenes medianas (servicios): 600x400px mínimo (recomendado: 900x600px)
- Imágenes grandes (hero): 800x400px mínimo (recomendado: 1200x600px)

### Formato
- PNG: Mejor para imágenes con transparencia
- JPG: Mejor para fotografías
- WebP: Más pequeño y moderno (recomendado)

### Estilo
- Mantener estética oscura (fondo oscuro)
- Bordes redondeados (border-radius: 20px)
- Glow rojo suave compatible
- Sin colores muy brillantes que desentonen

### Compresión
- Comprimir imágenes para web
- Máximo 200KB por imagen
- Usar tools como TinyPNG, ImageOptim, o Squoosh

## Testing
Después de reemplazar:
1. Abre el servidor: `npm start`
2. Accede a http://localhost:3000
3. Verifica todas las páginas
4. Prueba responsividad (mobile, tablet, desktop)
5. Verifica que las imágenes se cargan sin errores

## Notas
- Los SVG actuales son funcionales pero son placeholders
- No violes derechos de autor al usar imágenes
- Las rutas son relativas: public/img/nombre.ext
- Los estilos CSS ya incluyen border-radius, sombras y efectos
