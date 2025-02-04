# 📝 Documentation de l'API - ChatApp

Cette API gère l'authentification des utilisateurs (inscription, connexion, vérification) et la récupération des informations utilisateur...

# 📌 .env exemple

```.env
    PORT=5500
    MONGODB_URL=mongodb://127.0.0.1:27017/chatapp
    JWT_KEY=SECRET_JWT_KEY
```

# 📌 Base URL

```bash
    http://localhost:<PORT>/api
```

Remplace `<PORT>` par le port sur lequel dans le `.env`.

# 🛠️ Endpoints

- ## 1.  **Inscription - `/signup`**
    - **Méthode** : `POST`
    - **Description** : Crée un compte utilisateur.
    - **Corps de la requête** (`body`):
  
        ```json
            {
                "firstname": "John",
                "lastname": "Doe",
                "email": "john.doe@example.com",
                "password": "securepassword"
            }
        ```
  - **Response réussie**(`200 ok`):
  
    ```json
        {
            "status": "OK",
            "message": {
                "id": "65f123abc456d"
            }
        }

    ```
  - **Réponse en cas d'erreur** (`400 BAD REQUEST`):
    
    ```json
        {
            "status": "BAD REQUEST",
            "message": "email already exist"
        }

    ```

- ## 2. **Connexion - `/login`**
    - **Méthode** : `POST`
    - **Description** : Connecte un utilisateur et génère un token de session.
    - **Corps de la requête** (`body`)
  
        ```json
            {
                "email": "john.doe@example.com",
                "password": "securepassword"
            }

        ```
    - **Réponse réussie** (`200 OK`) :
      - Un cookie `token_chat` est créé avec le token de session.
      - **Exemple de réponse**

        ```json
            {
                "status": "OK",
                "message": {
                    "id": "65f123abc456d"
                }
            }

        ```
    - **Réponse en cas d'erreur** (`400 BAD REQUEST`):

        ```json
            {
                "status": "BAD REQUEST",
                "message": "try to change the password and/or email"
            }

        ```

    
- ## 3. **Vérification d'authentification**  - `/auth`
    - **Méthode** : `POST`
    - **Description** : Vérifie si l'utilisateur est authentifié grâce au cookie de session.
    - **Requête** : Nécessite le cookie token_chat envoyé par le navigateur.
    - **Réponse réussie** (`200 OK`)

        ```json
            {
                "status": "OK",
                "message": "User Verified"
            }

        ```
    - **Réponse en cas d'erreur** (`404 NOT FOUND`)
  
        ```json
            {
                "status": "NOT FOUND",
                "message": "log first"
            }

        ```

- ## 4. **Récupération des informations utilisateur** - `/user/:email`
    - **Méthode** : `GET`
    - **Description** : Récupère les informations d'un utilisateur par son email.
    - **Paramètres d'URL** :

    ```url
        /user/john.doe@example.com
    ```
    - **Réponse réussie** (`200 OK`):
  
    ```json
        {
            "id": "65f123abc456d",
            "firstname": "John",
            "lastname": "Doe",
            "email": "john.doe@example.com"
        }

    ```
    - **Réponse en cas d'utilisateur non trouvé** (`404 NOT FOUND`)

    ```json
        {
            "status": "NOT FOUND",
            "message": "User not found"
        }

    ```


# 🛠️ Utilisation


