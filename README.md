# AstroLab HTML

Laboratorio visual para practicar HTML, CSS y JavaScript con una temática espacial.
Incluye secciones semánticas, tablas, formularios, multimedia y ahora una academia interactiva.

## Objetivo

Este proyecto está pensado para clases de introducción a desarrollo web, donde se practican:

- Estructura semántica (`header`, `main`, `section`, `article`, `footer`)
- Elementos de texto y listas (`h1-h4`, `p`, `ul`, `ol`, `dl`)
- Tablas (`table`, `thead`, `tbody`, `caption`)
- Formularios (`form`, `fieldset`, `input`, `select`, `output`)
- Contenido multimedia (`img`, `iframe`)
- Interacción didáctica con JavaScript (`iframe srcdoc`, validación y evaluación)

## Novedades didácticas (Academia interactiva)

- Editor en línea con pestañas para HTML, CSS y JS.
- Vista previa en tiempo real dentro de un `iframe`.
- Botón de reinicio para volver a una plantilla base.
- Checklist automática para validar criterios HTML esenciales.
- Mini quiz de repaso con calificación instantánea.
- Barra de progreso que combina resultados de checklist + quiz.

## Estructura del proyecto

- `index.html`: contenido y estructura del laboratorio
- `styles.css`: diseño visual, paleta, tipografía, responsive y paneles interactivos
- `main.js`: lógica del editor en línea, evaluación y panel de progreso
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

- Pide a estudiantes resolver la checklist antes de abrir el quiz.
- Asigna retos de modificación sobre la plantilla base del editor.
- Usa el puntaje de progreso como indicador de práctica semanal.
