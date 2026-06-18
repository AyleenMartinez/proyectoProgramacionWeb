# NEKOBRELLA CORPORATION

## Nombre del proyecto

NEKOBRELLA CORPORATION — Sistema de monitoreo e investigación felina avanzada

## Descripción

NEKOBRELLA CORPORATION es una aplicación web desarrollada con Node.js y Express que simula una organización especializada en investigación, contención y monitoreo de sujetos felinos experimentales.

El sistema permite acceder a distintas áreas de la organización mediante una interfaz temática inspirada en laboratorios de investigación y protocolos de bioseguridad. Incluye autenticación básica, gestión de reportes biológicos, registro de propuestas experimentales y validaciones personalizadas implementadas mediante middlewares.

## Objetivo académico

Aplicar conceptos fundamentales de Programación Web utilizando Express, rutas, controladores, middlewares, servicios, manejo de formularios, validaciones, cookies y organización modular del proyecto.

---

## Arquitectura del proyecto

### public/

Contiene todos los recursos públicos del sitio.

* `pages/` → páginas HTML del sistema.
* `css/` → hojas de estilo.
* `js/` → scripts del lado cliente.
* `img/` → imágenes e ilustraciones SVG.

### routes/

Define las rutas HTTP y delega el procesamiento a los controladores correspondientes.

### controllers/

Contiene la lógica encargada de procesar formularios y generar respuestas.

### middlewares/

Incluye validaciones y componentes reutilizables ejecutados antes de llegar a los controladores.

### services/

Contiene lógica de negocio reutilizable y generación de respuestas HTML dinámicas.

### server.js

Punto de entrada de la aplicación Express.

### README.md

Documentación del proyecto.

---

## Tecnologías utilizadas

* Node.js
* Express
* cookie-parser
* HTML5
* CSS3
* JavaScript
* SVG

---

## Instalación

Instalar dependencias:

```bash
npm install
```

Ejecutar servidor:

```bash
npm start
```

Abrir en navegador:

```text
http://localhost:3000
```

---

## Páginas disponibles

### Inicio

```text
/pages/index.html
```

Panel principal de la organización.

### Servicios

```text
/pages/servicios.html
```

Presentación de las áreas de investigación.

### Sujetos

```text
/pages/sujetos.html
```

Monitoreo de sujetos experimentales.

### Login

```text
/pages/login.html
```

Formulario de autenticación.

### Reporte

```text
/pages/reporte.html
```

Registro de incidentes biológicos.

### Registro

```text
/pages/registro.html
```

Ingreso de propuestas experimentales.

### Chat

```text
/pages/chat.html
```

Página de chat en tiempo real con Socket.IO para comunicación interna entre salas temáticas.

- Eventos implementados:
  - `joinRoom`
  - `chatMessage`
  - `message`
  - `disconnect`
- Salas disponibles:
  - Bioingeniería
  - Contención
  - Incidentes
- Funcionalidades:
  - mensajes en tiempo real
  - salas temáticas
  - emojis
  - archivo simulado por nombre
  - historial en localStorage
  - búsqueda de mensajes
  - notificación visual
  - scroll/historial

Las páginas modificadas para incluir la navegación al chat son:
- `/pages/index.html`
- `/pages/servicios.html`
- `/pages/sujetos.html`
- `/pages/login.html`
- `/pages/reporte.html`
- `/pages/registro.html`
- `/pages/chat.html`

---

## Rutas principales

### POST /login

Valida las credenciales ingresadas.

Campos:

* usuario
* clave

Genera respuestas de acceso autorizado o acceso denegado.

---

### POST /enviar

Registra reportes biológicos.

Campos:

* nombre
* apellido
* email
* comentario

Incluye validación de longitud mínima para el comentario.

---

### POST /registrar-idea

Registra propuestas experimentales.

Campos:

* nombre
* departamento
* idea

Las propuestas válidas generan una cookie de sesión simulada.

---

## Middlewares implementados

### validarIdea

Verifica que las propuestas del departamento Informática tengan al menos 20 caracteres.

Mensaje de error:

```text
Las propuestas técnicas requieren más detalle.
```

### validarReporte

Verifica que el comentario del reporte tenga al menos 10 caracteres.

Mensaje de error:

```text
El reporte biológico debe tener al menos 10 caracteres de descripción.
```

---

## Cookies utilizadas

### tokenSesion

Cookie creada al registrar una propuesta correctamente.

Valor:

```text
ST-777
```

Finalidad:

* Simular persistencia de sesión.
* Demostrar uso de cookies mediante cookie-parser.

---

## Funcionalidades implementadas

* Servidor Express.
* Organización MVC simplificada.
* Formularios HTML.
* Procesamiento de formularios mediante POST.
* Middleware personalizado.
* Validación de datos.
* Generación dinámica de respuestas HTML.
* Uso de cookies.
* Contador visual de caracteres.
* Navegación multipágina.
* Separación modular de responsabilidades.
* Recursos gráficos SVG personalizados.

---

## Consideraciones

* No existe base de datos.
* La información enviada se registra en consola mediante servicios simulados.
* El proyecto tiene fines académicos y demostrativos.
* Todas las validaciones principales se realizan en el servidor para evitar omisiones desde el cliente.

---

## Actividad académica

Asignatura: Programación Web

Actividad: Semana 8

Proyecto: NEKOBRELLA CORPORATION
