# Utiliser une image Node légère
FROM node:alpine

# Créer le répertoire de travail
WORKDIR /app

# Copier les fichiers de build
COPY build/ ./build

# Installer serve globalement
RUN npm install -g serve

# Exposer le port 3000
EXPOSE 3000

# Démarrer l'application avec serve
CMD ["serve", "-s", "build", "-l", "3000"]

