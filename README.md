# Express.js Docker Project

Ce projet met en place une application Express.js simple, avec des instructions pour l'exécuter hors Docker et avec Docker.

---

## 🚀 Installation et exécution sans Docker

### 1. **Initialisation du projet**  

Exécutez la commande suivante pour initialiser un projet Node.js :
```
npm init -y
```
\

### 2. Installation des dépendances

Installez Express.js :

```
npm install express
```
\

### 3. Exécution de l'application

Lancez votre application à l'aide de Node.js :

        node app.js

\

---

## 🐳 Installation et exécution avec Docker

### 1. Création d'un volume Docker

Créez un volume Docker pour le projet :

docker volume create expressjs-volume

\

### 2. Construction de l'image Docker

Construisez l'image Docker à partir de votre Dockerfile :
```
docker build -t expressjs .
```
\

### 3. Lancement du conteneur Docker

Exécutez le conteneur avec la commande suivante :
```
docker run -p 4000:3000 expressjs
```
Ou avec un volume monté et un nom spécifique :
```
docker run -p 4000:3000 --name expressjs -v ${PWD}:/usr/src/app expressjs
```
\

---

## 📂 Structure du projet

📁 project-root \
├── 📄 Dockerfile \
├── 📄 app.js \
├── 📄 package.json \
└── 📄 package-lock.json

- Dockerfile : Contient la configuration pour créer l'image Docker.
- app.js : Point d'entrée principal de l'application Express.js.
- package.json et package-lock.json : Fichiers Node.js pour gérer les dépendances.

\

---

## 📌 Notes

L'application est exposée sur le port 4000. Vous pouvez y accéder via http://localhost:4000.
Si vous modifiez le code, relancez l'image Docker pour appliquer les changements.

\

---

## 🛠 Technologies utilisées

- Node.js avec Express.js pour le backend.
- Docker pour la conteneurisation.

## Technologies
***
Une liste complète des technologies sur le projet :
* [Node JS](https://nodejs.org/en/download/package-manager): Version 22
