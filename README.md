# AstroLab HTML

Laboratorio visual para practicar HTML y CSS con una temática espacial.
Incluye secciones semánticas, tablas, formularios, multimedia y un `iframe` de YouTube.

## Objetivo

Este proyecto está pensado para clases de introducción a desarrollo web, donde se practican:

- Estructura semántica (`header`, `main`, `section`, `article`, `footer`)
- Elementos de texto y listas (`h1-h4`, `p`, `ul`, `ol`, `dl`)
- Tablas (`table`, `thead`, `tbody`, `caption`)
- Formularios (`form`, `fieldset`, `input`, `select`, `output`)
- Contenido multimedia (`img`, `iframe`)

## Estructura del proyecto

- `index.html`: contenido y estructura del laboratorio
- `styles.css`: diseño visual, paleta, tipografía y responsive layout
- `README.md`: documentación del proyecto

## Cómo ejecutar

1. Abre la carpeta del proyecto en VS Code.
2. Evita abrir el archivo con ruta `file:///...` en el navegador.
3. Inicia la página desde una extensión de servidor/desarrollo compartido.

## Recomendación: usar Live Share para el iframe de YouTube

Si quieres que el `iframe` de YouTube se renderice con menos problemas, usa **Live Share** en lugar de abrir solo el archivo local.

### ¿Por qué ayuda Live Share?

El error del embed de YouTube (por ejemplo, `Error 153`) suele aparecer cuando:

- La página se carga desde `file://` (sin origen web válido).
- El entorno no envía un `origin/referrer` consistente.
- Hay políticas de red, navegador o privacidad que bloquean iframes de terceros.

Con Live Share, la página se sirve desde una URL HTTP/HTTPS compartida (no `file://`), lo que mejora compatibilidad con políticas de seguridad del reproductor de YouTube.

## Nota importante

Aunque uses Live Share, si la red institucional o un bloqueador de contenido restringe YouTube, el `iframe` puede seguir fallando.
En ese caso, usa el enlace alternativo en la página para abrir el video directamente en YouTube.

## Sugerencias para clase

- Pide a estudiantes modificar textos, colores y tipografías.
- Agrega nuevas tarjetas de módulos para practicar más etiquetas.
- Crea una segunda tabla y valida el formulario con JavaScript como siguiente ejercicio.
