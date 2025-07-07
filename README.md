# Proyecto de Sitio Estático con Formulario para Netlify

Este proyecto es una página web estática simple que incluye un formulario de contacto diseñado para funcionar automáticamente con Netlify Forms.

## Características

- **index.html**: Página principal con el formulario de contacto.
- **gracias.html**: Página de agradecimiento que se muestra después de enviar el formulario.
- **style.css**: Hoja de estilos para dar un diseño responsive y agradable a la página.
- **main.js**: Archivo JavaScript para validaciones del lado del cliente antes de enviar el formulario.

## Despliegue en Netlify

Este sitio está listo para ser desplegado en Netlify.

1.  **Conecta tu Repositorio**: Ve a tu panel de Netlify y crea un nuevo sitio a partir de Git. Selecciona este repositorio.
2.  **Configuración de Build**:
    -   **Build command**: Deja este campo vacío (o el que Netlify sugiera por defecto para sitios estáticos, usualmente no se necesita un comando de build).
    -   **Publish directory**: `.` (o la raíz de tu repositorio, ya que los archivos HTML están en la raíz).
3.  **Deploy**: Netlify construirá y desplegará tu sitio.

## Funcionalidad del Formulario

El formulario en `index.html` está configurado para usar Netlify Forms. Simplemente desplegando el sitio en Netlify activará la recepción de envíos del formulario.

El formulario incluye:
- `data-netlify="true"` para que Netlify lo reconozca.
- Un campo oculto `<input type="hidden" name="form-name" value="contacto">` para identificar el formulario en Netlify.
- `action="/gracias.html"` para redirigir al usuario a una página de agradecimiento personalizada después del envío.

## Activar Notificaciones por Correo Electrónico en Netlify

Para recibir notificaciones por correo electrónico cada vez que alguien envíe el formulario:

1.  Ve a tu sitio en el panel de Netlify.
2.  Navega a la sección **Forms** (puede estar bajo "Site configuration" o similar).
3.  Deberías ver tu formulario listado (por ejemplo, "contacto", que es el `value` del campo `form-name`).
4.  Haz clic en el nombre del formulario para ir a su página de configuración.
5.  En la sección **Notifications** (o "Form notifications"), busca una opción como "Add notification" o "Set up notifications".
6.  Selecciona **Email notification** (o una opción similar como "Send email alerts").
7.  Configura la dirección de correo electrónico donde deseas recibir las notificaciones y guarda los cambios.

Con esto, cada vez que se envíe un formulario, Netlify te enviará un correo electrónico con los detalles.

## Requisitos del Proyecto

- No se utilizan frameworks ni librerías externas.
- No se utiliza ningún sistema de build (como React, Vite, Webpack, etc.).
- Todo el código (HTML, CSS, JavaScript) está escrito para funcionar directamente en el navegador una vez desplegado en Netlify.
