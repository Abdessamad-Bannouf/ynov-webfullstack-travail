# Étape 1 : Utiliser une image Node.js comme base
FROM node:22

# Étape 2 : Définir le répertoire de travail dans le conteneur
WORKDIR /usr/src/app

# Étape 3 : Copier les fichiers package.json et package-lock.json
COPY package*.json ./

COPY . .

# Étape 4 : Installer les dépendances
RUN npm install

RUN npm install nodemon

RUN npm install ejs

# Étape 5 : Copier le reste du code de l'application
COPY . .

# Étape 6 : Exposer le port sur lequel l'application tourne
EXPOSE 3000

# Étape 7 : Commande pour lancer l'application
CMD ["npm", "run", "dev"]