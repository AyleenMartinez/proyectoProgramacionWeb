# NEKOBRELLA CORPORATION

## Nombre del proyecto

NEKOBRELLA CORPORATION — Sistema de monitoreo, investigación felina avanzada y comunicación interna en tiempo real.

## Descripción

NEKOBRELLA CORPORATION es una aplicación web desarrollada con Node.js y Express que simula una organización especializada en investigación, contención y monitoreo de sujetos felinos experimentales.

El sistema permite acceder a distintas áreas de la organización mediante una interfaz temática inspirada en laboratorios de investigación y protocolos de bioseguridad. Incluye autenticación básica, gestión de reportes biológicos, registro de propuestas experimentales, página 404 personalizada y un chat en tiempo real con salas temáticas mediante Socket.IO.

## Objetivo académico

Aplicar los contenidos de la Unidad 3 de Programación Web mediante una aplicación desarrollada con Node.js, Express y JavaScript, incorporando rutas, controladores, servicios, middlewares, formularios, validaciones y comunicación en tiempo real mediante Socket.IO.

El proyecto busca demostrar la integración entre frontend y backend, además del uso de bibliotecas y APIs de JavaScript para mejorar la interacción del usuario, especialmente a través del chat en tiempo real, historial de mensajes, búsqueda, emojis, notificaciones y sonido.

---

## Arquitectura del proyecto

### public/

Contiene todos los recursos públicos del sitio.

- `pages/` → páginas HTML del sistema.
- `css/` → hojas de estilo.
- `js/` → scripts del lado cliente.
- `img/` → imágenes e ilustraciones.

### routes/

Define las rutas HTTP y delega el procesamiento a los controladores correspondientes.

### controllers/

Contiene la lógica encargada de procesar formularios y generar respuestas.

### middlewares/

Incluye validaciones y componentes reutilizables ejecutados antes de llegar a los controladores.

### services/

Contiene lógica reutilizable y generación de respuestas HTML dinámicas.

### socket/

Contiene la configuración del chat en tiempo real con Socket.IO.

### server.js

Punto de entrada de la aplicación. Configura Express, rutas, archivos estáticos, Socket.IO y el puerto del servidor.

---

## Tecnologías utilizadas

- Node.js
- Express
- Socket.IO
- cookie-parser
- HTML5
- CSS3
- JavaScript
- localStorage
- Web Audio API
- SVG / PNG
- Git y GitHub
- Render

---

## Instalación y ejecución

Instalar dependencias:

npm install

Ejecutar servidor:

npm start

Abrir en navegador:

http://localhost:3000

En caso de bloqueo de PowerShell, se puede ejecutar con:

npm.cmd start

o directamente:

node server.js

---

## Páginas disponibles

### Inicio

/pages/index.html

Panel principal de la organización.

### Servicios

/pages/servicios.html

Presentación de las áreas de investigación.

### Sujetos

/pages/sujetos.html

Monitoreo de sujetos experimentales.

### Login

/pages/login.html

Formulario de autenticación.

### Reporte

/pages/reporte.html

Registro de incidentes biológicos.

### Registro

/pages/registro.html

Ingreso de propuestas experimentales.

### Comunicaciones

/pages/chat.html

Página de chat en tiempo real para comunicación interna entre salas temáticas.

### Página 404

/pages/404.html

Página personalizada para rutas no encontradas.

---

## Chat en tiempo real

El chat fue implementado con Socket.IO para permitir comunicación en tiempo real entre usuarios conectados a una misma sala.

### Salas disponibles

- Bioingeniería
- Contención
- Incidentes

### Eventos implementados

- `connection` → detecta cuando un usuario se conecta.
- `joinRoom` → permite que un usuario entre a una sala.
- `chatMessage` → envía mensajes al servidor.
- `message` → recibe mensajes desde el servidor.
- `disconnect` → detecta cuando un usuario se desconecta.

### Funcionalidades del chat

- Mensajes en tiempo real.
- Salas temáticas.
- Historial de mensajes con localStorage.
- Búsqueda dentro del historial.
- Envío rápido de emojis.
- Simulación de archivo adjunto mostrando el nombre del archivo seleccionado.
- Notificaciones visuales.
- Sonido generado mediante Web Audio API.
- Carga de mensajes anteriores desde el historial.

---

## Rutas principales

### GET /

Muestra la página principal del sistema.

### POST /login

Valida las credenciales ingresadas.

Campos:

- usuario
- clave

Genera respuestas de acceso autorizado o acceso denegado.

### POST /enviar

Registra reportes biológicos.

Campos:

- nombre
- apellido
- email
- comentario

Incluye validación de longitud mínima para el comentario.

### POST /registrar-idea

Registra propuestas experimentales.

Campos:

- nombre
- departamento
- idea

Las propuestas válidas generan una cookie de sesión simulada.

---

## Middlewares implementados

### logger

Registra en consola las solicitudes realizadas al servidor.

### validarIdea

Verifica que las propuestas tengan el contenido mínimo solicitado.

Mensaje de error:

Las propuestas técnicas requieren más detalle.

### validarReporte

Verifica que el comentario del reporte tenga al menos 10 caracteres.

Mensaje de error:

El reporte biológico debe tener al menos 10 caracteres de descripción.

---

## Cookies utilizadas

### tokenSesion

Cookie creada al registrar una propuesta correctamente.

Valor:

ST-777

Finalidad:

- Simular persistencia de sesión.
- Demostrar uso de cookies mediante cookie-parser.

### nekoSesion

Cookie creada al realizar un acceso autorizado.

Valor:

active

Finalidad:

- Simular una sesión de usuario autorizada.

---

## Funcionalidades implementadas

- Servidor Express.
- Organización modular del proyecto.
- Formularios HTML.
- Procesamiento de formularios mediante POST.
- Middlewares personalizados.
- Validación de datos.
- Generación dinámica de respuestas HTML.
- Uso de cookies.
- Contador visual de caracteres.
- Navegación multipágina.
- Página 404 personalizada.
- Chat en tiempo real mediante Socket.IO.
- Comunicación por salas temáticas.
- Historial de mensajes con localStorage.
- Búsqueda de mensajes.
- Envío rápido de emojis.
- Simulación de archivo adjunto mediante nombre de archivo.
- Notificaciones visuales.
- Sonido generado con Web Audio API.
- Recursos gráficos personalizados.
- Despliegue en Render.

---

## Consideraciones

- No existe base de datos.
- La información enviada se registra en consola mediante servicios simulados.
- El historial del chat se guarda en el navegador mediante localStorage.
- El envío de archivos se implementó como simulación, mostrando el nombre del archivo seleccionado.
- Para un envío real de archivos sería necesario implementar almacenamiento en servidor.
- El proyecto tiene fines académicos y demostrativos.
- Las validaciones principales se realizan en el servidor para evitar omisiones desde el cliente.

---

## Recursos del proyecto

Repositorio GitHub:

https://github.com/AyleenMartinez/proyectoProgramacionWeb

Aplicación publicada en Render:

https://proyectoprogramacionweb.onrender.com

---

## Actividad académica

Asignatura: Programación Web

Unidad: Unidad 3

Actividad: Actividad Final

Proyecto: NEKOBRELLA CORPORATION