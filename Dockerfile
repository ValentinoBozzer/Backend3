# Utiliza una imagen oficial de Node.js
FROM node:20

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos de dependencias
COPY package*.json ./

# Instala las dependencias
RUN npm install --production

# Copia el resto del código de la aplicación
COPY . .

# Expone el puerto de la app
EXPOSE 8080

# Comando para iniciar la app
CMD ["node", "src/app.js"] 