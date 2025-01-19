# 1. Dependencies Stage: Instala las dependencias
FROM node:21-alpine3.19 AS deps

WORKDIR /usr/src/app

# Copiar archivos de dependencias
COPY ./package.json ./  
COPY ./package-lock.json ./  

# Instalar solo las dependencias necesarias
RUN npm install

# 2. Build Stage: Construye la aplicación
FROM node:21-alpine3.19 AS build

# Argumento para las variables de entorno públicas de Next.js
ARG NEXT_PUBLIC_BACKEND_URL
ENV NEXT_PUBLIC_BACKEND_URL=$NEXT_PUBLIC_BACKEND_URL

WORKDIR /usr/src/app

# Copiar node_modules desde la etapa anterior
COPY --from=deps /usr/src/app/node_modules ./node_modules

# Copiar el código fuente de la aplicación
COPY . .

# Construir la aplicación para producción
RUN npm run build

# 3. Production Stage: Crea la imagen final para ejecución
FROM node:21-alpine3.19 AS prod

WORKDIR /usr/src/app

# Copiar los node_modules y la aplicación construida desde la etapa build
COPY --from=build /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/.next ./.next
COPY --from=build /usr/src/app/public ./public
COPY --from=build /usr/src/app/package.json ./package.json
COPY --from=build /usr/src/app/next.config.js ./next.config.js

# Configuración de entorno para producción
ENV NODE_ENV=production

# Puerto dinámico para Cloud Run
ENV PORT=3000
EXPOSE 3001

# Cambiar al usuario node por seguridad
USER node

# Comando para ejecutar la aplicación
CMD ["npm", "start"]
