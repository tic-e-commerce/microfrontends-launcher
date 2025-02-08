# Etapa 1: Construcción
FROM node:18-alpine AS builder

ARG NEXT_PUBLIC_REMOTE_AUTH_URL
ARG NEXT_PUBLIC_REMOTE_PROFILE_URL
ARG NEXT_PUBLIC_REMOTE_USER_PREFERENCES_URL
ARG NEXT_PUBLIC_REMOTE_PRODUCTS_URL
ARG NEXT_PUBLIC_REMOTE_CART_URL
ARG NEXT_PUBLIC_REMOTE_ORDERS_URL
ARG NEXT_PUBLIC_REMOTE_PAYMENTS_URL

ENV NEXT_PUBLIC_REMOTE_AUTH_URL=$NEXT_PUBLIC_REMOTE_AUTH_URL
ENV NEXT_PUBLIC_REMOTE_PROFILE_URL=$NEXT_PUBLIC_REMOTE_PROFILE_URL
ENV NEXT_PUBLIC_REMOTE_USER_PREFERENCES_URL=$NEXT_PUBLIC_REMOTE_USER_PREFERENCES_URL
ENV NEXT_PUBLIC_REMOTE_PRODUCTS_URL=$NEXT_PUBLIC_REMOTE_PRODUCTS_URL
ENV NEXT_PUBLIC_REMOTE_CART_URL=$NEXT_PUBLIC_REMOTE_CART_URL
ENV NEXT_PUBLIC_REMOTE_ORDERS_URL=$NEXT_PUBLIC_REMOTE_ORDERS_URL
ENV NEXT_PUBLIC_REMOTE_PAYMENTS_URL=$NEXT_PUBLIC_REMOTE_PAYMENTS_URL

WORKDIR /app

# Instalar dependencias y compilar la aplicación
COPY package.json package-lock.json ./
RUN npm install --only=production && npm cache clean --force
COPY . .
RUN npm run build

# Etapa 2: Producción
FROM node:18-alpine AS production

WORKDIR /app

# Copiar los archivos compilados desde la etapa de construcción
COPY --from=builder /app/.next /app/.next
COPY --from=builder /app/public /app/public
COPY --from=builder /app/package.json /app/package.json

# Instalar dependencias necesarias para producción
RUN npm install --only=production && npm cache clean --force

# Exponer el puerto y ejecutar la aplicación en producción
EXPOSE 3000
CMD ["npm", "run", "start"]
