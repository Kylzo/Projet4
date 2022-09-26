Backend
--------

Tout d'abord :

Créez un fichier .env contenant :

```sh
IMAGE_DIRNAME=images
```

```sh
MONGODB_CONNECT_URL="Votre base de données" ou "La base de données fournit pour la soutenance"
```

Ensuite :

```sh
npm install 
```

Et :

```sh
nodemon server.js (Si ça ne fonctionne pas, supprimer le dossier node_module et relancer npm install).
```


Front end
---------

Tout d'abord faites un :

Créez un fichier .env contenant :

VITE_API_URL="http://localhost:3000/api" ou autre port selon vos habitudes.


Ensuite :

npm install 


Et :

npm run dev 


