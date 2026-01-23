# UI/UX DESIGN SYSTEM GUIDELINES & CONTEXT

## 1. Contexto del Proyecto
Estás asistiendo en el desarrollo de un software de gestión para **Mineras y Proveedores**.

* **Misión:** Crear una interfaz profesional, limpia y coherente que transmita seguridad industrial y confianza.
* **Usuario Objetivo:** Operarios, administrativos y gerentes. Valoran la eficiencia y la claridad sobre la decoración.
* **Prioridad:** Evitar la fatiga visual y prevenir errores humanos en la entrada de datos.
* **Stack Tecnológico:** MERN Stack, TypeScript, React Native (Expo).

## 2. Reglas de Diseño (Design Tokens)
Debes utilizar **estrictamente** las variables CSS definidas a continuación como la "Fuente de la Verdad". No inventes valores hexadecimales nuevos.

### Paleta de Colores y Tipografía (Source of Truth)

Esto se encuentra en el archivo `src/index.css`.

## 3. Directrices de Implementación de UI

Al generar código, componentes o proponer diseños, debes adherirte a los siguientes patrones de aceptación:

### A. Botones (Buttons)

Deben ser componentes reutilizables con estados visuales claros.

* **Primario:** Fondo sólido `primary-900` (o el definido por el sistema de diseño actual), Texto `on-primary`. Transmite la acción principal.
* **Secundario (Outline):** Borde visible, fondo transparente. Para acciones como "Cancelar" o "Volver".
* **Estados Obligatorios:**
* **Normal:** Estado por defecto.
* **Hover/Pressed:** Feedback visual al interactuar.
* **Loading:** Debe ocultar el texto, mostrar un spinner y bloquear la interacción (propiedad `disabled`).
* **Disabled:** Opacidad reducida, cursor `not-allowed`, sin interacción.



### B. Campos de Entrada (Inputs)

Prioridad absoluta en la claridad y prevención de errores.

* **Label:** Siempre visible arriba del campo.
* **Feedback de Error:** Borde `color-error`, mensaje explicativo debajo del input en `color-error` y `text-caption`.
* **Estados:** Default, Focus (resalte con color primario), Error, Disabled.

### C. Modales (Ventanas Emergentes)

Uso restringido para confirmaciones críticas o formularios breves.

* **Overlay:** Fondo oscuro semitransparente que cubre toda la aplicación para enfocar la atención.
* **Contenedor:** Fondo `color-surface`, bordes redondeados, sombra elevada.
* **Acciones:** Botones claros de "Confirmar" y "Cancelar".

### D. Sistema de Espaciado & Iconografía

* **Grilla:** Usa múltiplos de **4px** o **8px** para todos los márgenes y paddings.
* **Iconos:** Preferencia por librerías limpias y de trazo firme como **Lucide React**, **Material Icons** o **Phosphor**. Evitar estilos "cartoon".
* **Mobile First:** En vistas móviles, transformar tablas complejas en componentes tipo **Card** (Tarjetas) para mejorar la legibilidad.

## 4. Tono de Comunicación (Copywriting)

* **Profesional:** Lenguaje directo, sin tutear excesivamente, enfocado en la tarea.
* **Claro:** Mensajes de error que expliquen *qué* pasó y *cómo* solucionarlo.
* **Vocabulario:** Usar términos de la industria (Proveedor, Minera, Licitación, Cotización) donde corresponda.