# Etapa 1: Construcción
FROM node:18-alpine AS builder

ARG NEXT_PUBLIC_BACKEND_URL
ENV NEXT_PUBLIC_BACKEND_URL=$NEXT_PUBLIC_BACKEND_URL

WORKDIR /app

# Instala dependencias necesarias para construir
COPY package.json package-lock.json ./
RUN npm install --only=production && npm cache clean --force

# Copia el código fuente y construye la app
COPY . .
RUN npm run build

# Etapa 2: Producción
FROM node:18-alpine AS production

WORKDIR /app

# Copia solo los archivos necesarios desde la etapa de construcción
COPY --from=builder /app/.next /app/.next
COPY --from=builder /app/public /app/public
COPY --from=builder /app/package.json /app/package.json

# Instala solo dependencias de producción
RUN npm install --only=production && npm cache clean --force

# Exponer el puerto y ejecutar la aplicación
EXPOSE 3008
CMD ["npm", "run", "start"]
