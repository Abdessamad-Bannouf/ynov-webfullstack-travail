# Express.js Docker Project

Ce projet met en place une application Express.js de tâches collaboratives.
chaque personne peut créer / modifier / supprimer des tâches avec des instructions pour l'exécuter hors Docker et avec Docker.

---

## 📂 Configuration du dossier config pour la database

### - Créer un dossier "config" à la racine du projet.

#### - Ensuite dans ce dossier créer un fichier .env et rajouter les lignes suivantes :

```
POSTGRES_USER=postgres
POSTGRES_DB=db
PGADMIN_DEFAULT_EMAIL=admin@domain.com
#DATABASE_URL="postgresql://postgres:postgres@postgres:5432/db?schema=public"
```

### Créer un autre .env mais cette fois-ci à la racine du projet (primordial pour que Prisma s'exécute correctement)
- Copier cette ligne avec les bonnes valeurs :

```
DATABASE_URL="postgresql://username:password@host:5432/db?schema=public"
```

### - Créer un fichier "db_password.txt" à la racine du projet.

#### - Ensuite dans ce fichier ajouter la mot de passe de la base de données suivant :

```
postgreSQL
```

### - Créer un fichier "pgadmin_password.txt" à la racine du projet.

#### - Ensuite dans ce fichier ajouter le mot de passe de pg admin suivant :

```
postgreSQL
```


## 🐳 Installation et exécution avec Docker

### 1. Build des containers express / postgreSQL / pgAdmin

```
docker-compose build
```

### 2. Lancement des containers en détaché

```
docker-compose up -d
```
\

---
## 🗃️ Base de données

### Connexion au sein de pgAdmin

Aller sur l'url :

    http://localhost:5050

Mettre comme login :

    admin@domain.com

Mettre le password correspondant.

### Création de la database au sein de pgAdmin

Ensuite sur l'interface pgAdmin cliquer sur Add New Server

- Dans l'onglet général mettre un nom pour le serveur

- Après cliquer sur l'onglet connection puis dans Host name mettre : postgres

- Dans le champ port mettre : 5432

- Dans le champ username mettre : postgres

- Dans le champ password mettre le password correspondant

### PRISMA ORM : migrations

- Se connecter au container express js via la commande : docker exec -it expressjs bash
- lancer la commande : npx prisma migrate dev --name init

### Inscription

- Aller sur l'url localhost:3000/signup et s'inscrire
- Se connecter via l'url localhost:3000/login

## 📂 Structure du projet

>&nbsp; project/ \
&nbsp; &nbsp; &nbsp; ├── controllers/ \
&nbsp; &nbsp; &nbsp; │    ├── auth.js \
&nbsp; &nbsp; &nbsp; │    ├── chat.js \
&nbsp; &nbsp; &nbsp; │    ├── error.js \
&nbsp; &nbsp; &nbsp; │    ├── home.js \
&nbsp; &nbsp; &nbsp; │    ├── list.js \
&nbsp; &nbsp; &nbsp; │    └── task.js \
&nbsp; &nbsp; &nbsp; ├── middlewares/ \
&nbsp; &nbsp; &nbsp; │   └── check-role.js \
&nbsp; &nbsp; &nbsp; │   └── is-auth.js \
&nbsp; &nbsp; &nbsp; │    └── validation.js \
&nbsp; &nbsp; &nbsp; ├── routes/ \
&nbsp; &nbsp; &nbsp; │   ├── auth.js \
&nbsp; &nbsp; &nbsp; │   ├── chat.js \
&nbsp; &nbsp; &nbsp; │   ├── home.js \
&nbsp; &nbsp; &nbsp; │   ├── list.js \
&nbsp; &nbsp; &nbsp; │   └── task.js \
&nbsp; &nbsp; &nbsp; ├── views/ \
&nbsp; &nbsp; &nbsp; │   ├── auth.ejs \
&nbsp; &nbsp; &nbsp; │   ├── chat.ejs \
&nbsp; &nbsp; &nbsp; │   ├── includes.ejs \
&nbsp; &nbsp; &nbsp; │   ├── list.ejs \
&nbsp; &nbsp; &nbsp; │   └── task.ejs \
&nbsp; &nbsp; &nbsp; ├── 404.ejs \
&nbsp; &nbsp; &nbsp; ├── home.ejs \
&nbsp; &nbsp; &nbsp; ├── app.js \
&nbsp; &nbsp; &nbsp; └── package.json \
&nbsp; &nbsp; &nbsp; ├──- index.js : Point d'entrée principal de l'application Express.js. \
- package.json et package-lock.json : Fichiers Node.js pour gérer les dépendances. \

\

---

## 📌 Notes

L'application est exposée sur le port 3000. Vous pouvez y accéder via http://localhost:3000.
Si vous modifiez le code, techniquement les changements seront raffraichis automatiquement grâce à Nodemon.

\

---

## 🛠 Technologies utilisées

- Node.js avec Express.js pour le backend.
- PostgreSQL pour le SGBDR
- pgAdmin pour l'interface de postgreSQL
- PrismaORM pour tout ce qui est communication avec la base de données
- EJS pour le front
- Docker pour la conteneurisation.

## Technologies
***
Une liste complète des technologies sur le projet :
* [Node JS](https://nodejs.org/en/download/package-manager): Version 22
