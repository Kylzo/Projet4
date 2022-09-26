Backend
--------

Tout d'abord :

Créez un fichier .env contenant :

```sh
IMAGE_DIRNAME=images
```

```sh
MONGODB_CONNECT_URL="Votre base de données" ou "La base de données fournie pour la soutenance"
```


Ouvrez la console de vscode avec ctrl+ù et changez la direction avec la commande suivante :

```sh
cd backend 
```


Ensuite :

```sh
npm install 
```

Attendez que tout s'intalle.

Et lancez nodemon server dans la console :

```sh
nodemon server
```


Front end
---------

Tout d'abord créez un fichier .env contenant :

```sh
VITE_API_URL="http://localhost:3000/api"
```
Ou autre port selon vos habitudes.


Ouvrez une seconde fenêtre dans votre console avec le "+" en haut à droite de celle-ci et changez la direction avec la commande suivante :

```sh
cd frontend
```


Faites :

```sh
npm install 
```

Et :

```sh
npm run dev 
```

(Relancez nodemon server si vous avez déjà une DB avec des post et des utilisateurs enregistrés.)