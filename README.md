# API Challenge - Frontend (React + Vite)

El  proyecto representa la solución al frontend del API Challenge. Utiliza React con Vite, tiene además testing automatizado.

## Características principales

- Renderizado de tabla con resultados obtenidos desde el backend (`/files/data`).
- Soporte de filtros por nombre de archivo (`fileName`).
- Paginación controlada por parámetros `offset` y `limit`.
- Opción de incluir líneas vacías (`includeEmpty=true`).
- Indicadores de carga y manejo de errores.
- Tests con Jest y React Testing Library.
- Mock de `fetch` condicional para facilitar pruebas sin conexión a backend.

---

## Stack utilizado

- **React** 18
- **Vite** como bundler
- **JavaScript ES6+**
- **React Bootstrap** para UI
- **Jest** y **React Testing Library** para pruebas
- **ESLint** `v8.56.0`
- **Node.js** `v16.20.2`

---

## Scripts

```bash
npm run dev       # Levanta el proyecto en modo desarrollo
npm run build     # Construye para producción
npm run preview   # Previsualiza el build
npm run test      # Ejecuta pruebas con Jest
npm run test:all  # Ejecuta pruebas con cobertura
npm run lint      # Ejecuta ESLint para validar estilos y errores
```

---

## Tests con y sin mock

Por defecto, los tests usan un `useMock=true` que hace  llamadas a `fetch` con valores simulados desde mockData.json

Para probar contra el backend (`http://localhost:3000/files/data`), se cambia `useMock=false` en `FileDataTable.test.jsx`:

```js
const useMock = false;
```

Esto permite probar conectividad real al backend desde los tests.

---

El proyecto usa ESLint `v8.56.0`, compatible con Node.js 16. Para su ejecución:

```bash
npm run lint
```

---
## Estructura del proyecto

```
src/
├── components/
│   ├── FileDataTable.jsx
│   └── FileDataTable.test.jsx
├── __mocks__/
│   └── mockData.json
├── App.jsx
├── main.jsx
```

---
## Cobertura y pruebas unitarias

Incluye pruebas unitarias que cubren:

- Renderizado de componentes
- Filtrado por nombre
- Activación de "incluir vacíos"
- Comportamiento ante errores 404
- Limpieza de inputs
- Indicadores visuales durante la carga

Para ejecutarlas:

```bash
npm run test:all
```

---

## 👤 Autor

Cesar Daniel Pineda  
📧 cesardanielpineda@gmail.com  
🔗 [Repositorio GitHub frontEnd](https://github.com/cpineda1985/api-challenge-frontend)