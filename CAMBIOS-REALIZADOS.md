# NEKOBRELLA CORPORATION - CAMBIOS REALIZADOS

Fecha: 31 de Mayo, 2026
Actualización: Separación en múltiples páginas + Imágenes visuales

---

## CAMBIO 1: ESTRUCTURA DE MÚLTIPLES PÁGINAS

### Archivos HTML creados en `public/`:

1. **index.html** (modificado)
   - Página de inicio / Hero
   - Panel de monitoreo
   - Dashboard con estadísticas
   - Enlaces rápidos a otras secciones
   - Muestra: img/laboratorio-felino.svg

2. **servicios.html** (nuevo)
   - Sección de servicios de la corporación
   - 3 cards con imágenes:
     - Investigación genética felina → img/investigacion-genetica.svg
     - Contención biológica → img/contencion-biologica.svg
     - Neurocomportamiento michi → img/neurocomportamiento.svg

3. **sujetos.html** (nuevo)
   - Sección de sujetos experimentales
   - 3 cards de sujetos con imágenes:
     - M-01 Naranjo (Alto) → img/sujeto-m01.svg
     - M-07 Michi Táctico (Medio) → img/sujeto-m07.svg
     - M-13 Entidad de Pasillo (Crítico) → img/sujeto-m13.svg

4. **registro.html** (nuevo)
   - Formulario de propuesta experimental
   - Ruta POST: /registrar-idea
   - Campos: nombre, departamento, idea
   - Todos los `name` conservan sus nombres originales

5. **login.html** (nuevo)
   - Formulario de acceso seguro
   - Ruta POST: /login
   - Campos: usuario, clave
   - Todos los `name` conservan sus nombres originales

6. **reporte.html** (nuevo)
   - Formulario de reporte de incidente biológico
   - Imagen de advertencia BIOHAZARD → img/biohazard-report.svg
   - Ruta POST: /enviar
   - Campos: nombre, apellido, email, comentario
   - Todos los `name` conservan sus nombres originales

### Navegación actualizada en todas las páginas:
```html
<nav class="nav-principal" aria-label="Navegación principal">
    <ul>
        <li><a href="index.html">Inicio</a></li>
        <li><a href="servicios.html">Servicios</a></li>
        <li><a href="sujetos.html">Sujetos</a></li>
        <li><a href="login.html">Login</a></li>
        <li><a href="reporte.html">Reporte</a></li>
    </ul>
</nav>
```

### Estructura compartida:
- Header idéntico en todas las páginas
- Footer idéntico en todas las páginas
- Style.css unificado
- app.js compartido

### Verificación de integridad:

✅ Rutas POST conservadas:
  - POST /login → login.html
  - POST /enviar → reporte.html
  - POST /registrar-idea → registro.html

✅ Names de inputs conservados:
  - Login: usuario, clave
  - Reporte: nombre, apellido, email, comentario
  - Registro: nombre, departamento, idea

✅ Server.js sin cambios:
  - Express sigue sirviendo `public/` como carpeta estática
  - Las nuevas páginas se sirven automáticamente
  - No rompe compatibilidad con rutas POST

---

## CAMBIO 2: IMÁGENES VISUALES

### Carpeta `public/img/` creada con archivos SVG:

**Placeholders funcionales:**
- laboratorio-felino.svg (800x400px) → Página de inicio
- investigacion-genetica.svg (600x400px) → Servicios
- contencion-biologica.svg (600x400px) → Servicios
- neurocomportamiento.svg (600x400px) → Servicios
- sujeto-m01.svg (400x300px) → Sujetos (color rojo, amenaza alta)
- sujeto-m07.svg (400x300px) → Sujetos (color naranja, amenaza media)
- sujeto-m13.svg (400x300px) → Sujetos (color rojo crítico, amenaza crítica)
- biohazard-report.svg (600x300px) → Reporte de incidentes

### Estilos CSS añadidos:

```css
.hero-imagen, .servicio-imagen, .sujeto-imagen, .reporte-imagen {
    margin-bottom: 16px;
}

.hero-img, .servicio-img, .sujeto-img, .reporte-img {
    width: 100%;
    max-width: 100%;
    height: auto;
    border-radius: 20px;
    border: 1px solid rgba(255, 255, 255, 0.12);
    box-shadow: 0 0 24px rgba(211, 47, 47, 0.16), inset 0 0 0 1px rgba(255, 255, 255, 0.08);
    object-fit: cover;
    display: block;
}
```

### Características de las imágenes:
✅ Responsivas (max-width: 100%)
✅ Bordes redondeados (border-radius: 20px)
✅ Borde rojo oscuro coherente
✅ Glow rojo suave compatible
✅ No se deforman (object-fit: cover)
✅ Sombras CSS para integración visual
✅ Mantienen estética oscura NEKOBRELLA

### Cómo reemplazar placeholders SVG:

1. **Opción A: Convertir SVG a PNG**
   - Usar herramienta online o local para convertir
   - Renombrar con mismo nombre (extensión .png)
   - Guardar en public/img/

2. **Opción B: Usar imágenes propias**
   - Obtener imágenes PNG/JPG/WebP
   - Renombrar exactamente: laboratorio-felino.png, sujeto-m01.png, etc.
   - Reemplazar archivos SVG en public/img/

3. **Opciones C: URLs externas (temporal)**
   - Editar HTML y cambiar src a URL externa
   - Después migrar a archivos locales

### Especificaciones recomendadas:
- Resolución: 600x450px mínimo (sujetos), 900x600px (servicios)
- Formato: PNG (transparencia), JPG (fotos), WebP (moderno)
- Compresión: Máximo 200KB por imagen
- Tema: Oscuro, con bordes redondeados, compatible con estilo NEKOBRELLA

### Documentación incluida:
- `public/img/README.md` con instrucciones detalladas
- Especificaciones de cada imagen
- Cómo reemplazar y migrar

---

## VERIFICACIÓN FINAL

### Archivos modificados:
```
public/
├── index.html (modificado: ahora solo página de inicio)
├── servicios.html (nuevo)
├── sujetos.html (nuevo)
├── registro.html (nuevo)
├── login.html (nuevo)
├── reporte.html (nuevo)
├── style.css (actualizado: +estilos para imágenes)
├── app.js (sin cambios)
├── img/ (nueva carpeta)
│   ├── laboratorio-felino.svg
│   ├── investigacion-genetica.svg
│   ├── contencion-biologica.svg
│   ├── neurocomportamiento.svg
│   ├── sujeto-m01.svg
│   ├── sujeto-m07.svg
│   ├── sujeto-m13.svg
│   ├── biohazard-report.svg
│   └── README.md
└── ... (otros archivos sin cambios)

server.js (sin cambios)
routes/ (sin cambios)
controllers/ (sin cambios)
middlewares/ (sin cambios)
services/ (sin cambios)
```

### Pruebas completadas:
✅ Nombres de inputs conservados
✅ Rutas POST conservadas
✅ Navegación actualizada
✅ Header/Footer compartido
✅ CSS responsivo
✅ Imágenes funcionales (SVG)
✅ Server Express sin cambios
✅ Estructura Semana 8 intacta

### Para ejecutar:
```bash
cd proyectoProgramacionWeb
npm start
# Servidor activo en http://localhost:3000
```

Accedible:
- http://localhost:3000 → index.html (página de inicio)
- http://localhost:3000/servicios.html → Servicios
- http://localhost:3000/sujetos.html → Sujetos
- http://localhost:3000/registro.html → Registro de propuesta
- http://localhost:3000/login.html → Login
- http://localhost:3000/reporte.html → Reporte de incidentes

---

## NOTAS IMPORTANTES

1. **Compatibilidad Backend:**
   - Las rutas POST (/login, /enviar, /registrar-idea) se mantienen igual
   - Express serve las nuevas páginas como archivos estáticos
   - No rompe el servidor ni los controladores

2. **Migración de imágenes:**
   - Los placeholders SVG funcionan perfectamente en todos los navegadores modernos
   - Se pueden reemplazar gradualmente sin romper nada
   - Instrucciones completas en public/img/README.md

3. **Estructura del proyecto:**
   - Mantiene la estructura Semana 8
   - Cumple con todos los requisitos
   - README ya actualizado

4. **Responsividad:**
   - Todas las páginas son responsivas
   - CSS media queries funcionan para mobile/tablet/desktop
   - Imágenes escalan proporcionalmente
