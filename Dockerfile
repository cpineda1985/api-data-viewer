# Etapa de build
FROM node:16.20.2-alpine AS builder

# Crear directorio de trabajo
WORKDIR /app

# Copiar dependencias e instalar
COPY package*.json ./
RUN npm install

# Copiar código fuente y ejecutar pruebas + build
COPY . .
RUN npm run test:all
RUN npm run build

# Etapa de producción: usar Nginx para servir archivos estáticos
FROM nginx:stable-alpine

# Copiar archivos del build al directorio por defecto de Nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Copiar configuración personalizada de Nginx si es necesario
# COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
