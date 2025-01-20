# Usa una imagen base oficial de Node.js
FROM node:18-alpine

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia package.json y package-lock.json
COPY package.json package-lock.json ./

# Instala las dependencias del proyecto
RUN npm install

# Expone el puerto por defecto de Next.js
EXPOSE 3001

# Comando para ejecutar el servidor de desarrollo
CMD ["npm", "run", "dev"]
