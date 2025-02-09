# 📝 Documentation de API Login, SignUp, Forgot Password

Cette API gère l'authentification des utilisateurs (inscription, connexion, vérification, changepassword) et la récupération des informations utilisateur...

# 📌 .env exemple

```.env
    PORT=5500
    MONGODB_URL=mongodb://127.0.0.1:27017/chatapp
    JWT_KEY=SECRET_JWT_KEY
    DOMAIN_NAME=http://localhost:5117
```

# 📌 Base URL

```bash
    http://localhost:<PORT>/api
```

Remplace `<PORT>` par le port sur lequel dans le `.env`.

# 🛠️ Endpoints

- ## 1.  **Inscription - `/signup`**
    - **Méthode** : `POST`
    - **Description** : Crée un compte utilisateur et un token de session
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
    ou
    ```json
        {
            "status": "BAD REQUEST",
            "message": "all propriety is required"
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
        or
        ```json
            {
                "status": "BAD REQUEST",
                "message": "all property is required"
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
                "message": "log or signup first"
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
- ## 5. **Envoi d'un OTP** - `/sendotp`

    - **Méthode** : `POST`
    - **Description** : Envoie un **OTP (One-Time Password)** à l'email fourni en paramètre.
    - **Paramètres de requête** :
      - `email` (query param) : Adresse email de l'utilisateur
    - **Exemple de requête** :
    ```url
        /sendotp?email=john.doe@example.com
    ```
    - **Réponse réussie** (`200 OK`):
    ```json
        {
            "status": "OK",
            "message": "OTP sent successfully"
        }
    ```
    - **Réponse en cas d'erreur** (`400 BAD REQUEST`):
    ```json
        {
            "status": "BAD REQUEST",
            "message": "try query key=email and value=value of email"
        }
    ``` 
- ## 6.**Vérification d'un OTP** - `/verify-otp`

    - **Méthode** : `POST`
    - **Description** : Vérifie si l'**OTP** fourni est valide pour un email donné.
    - **Paramètres de requête** :
      - **email** (`query param`) : Adresse email de l'utilisateur
      - **otp** (`query param`) : Code OTP reçu
    - **Exemple de requête** :
    ```url
        /verifyotp?email=john.doe@example.com&otp=123456
    ``` 
    - **Réponse réussie (`200 OK`)**:
    ```json
        {
            "status": "OK",
            "message": "OTP verification successful"
        }
    ``` 
    - **Réponse en cas d'erreur** (`400 BAD REQUEST`):
    ```json
        {
            "status": "BAD REQUEST",
            "message": "Invalid OTP"
        }
    ```

- ## 7. **Changer le mot passe avec un OTP vérifier** - `/verify-otp`

    - **Méthode**: `POST`
    - **Déscription**: Changer le mot de passe d'un utilisateur à l'aide d'un `OTP` qui est déjà verifier.
    - **Paramètres de requête** :
      - **email** (`query param`) : Adresse email de l'utilisateur
      - **otp** (`query param`) : Code OTP déjà vérifier
      - **Corps de la requête** (`body`):
     
        ```json
            {
                "newPassword": "votre nouveau mot de passe"
            }
        ```

    - **Exemple de requête** :
        - **url**: 
    ```url
        /verify-otp?email=john.doe@example.com&otp=345987
    ``` 
    avec `body` ou corp:
    ```json
        {
            "newPassword": "Ajf&#frpPiç"
        }
    ```
    
    - **Réponse réussie (`200 OK`)**:
    ```json
        {
            "status": "ok",
            "message": "password change with success"
        }
    ``` 
    - **Réponse en cas d'erreur** (`400 BAD REQUEST`):
    ```json
        {
            "status": "bad request",
            "message": "Invalid OTP"
        }
    ```
    or 
    ```json
        {
            "status": "internal server error", 
            "message": "contact the admnistrator" 
        }
    ```

- ## 8. **Changer le mot passe avec l'encient mot de passe** - `/verify-otp`

    - **Méthode**: `PUT`
    - **Déscription**: Changer le mot de passe d'un utilisateur à l'aide de l'enciens mot de passe.
    - **Paramètres de requête** :
      - **email** (`query param`) : Adresse email de l'utilisateur
      - **Corps de la requête** (`body`):
     
        ```json
            {
                "oldPassword": "azerty", 
                "newPassword": "Pmrf&#f!"
            }
        ```
    
    - **Réponse réussie (`200 OK`)**:
    ```json
        {
            "status": "ok",
            "message": "password change with success"
        }
    ``` 
    - **Réponse en cas d'erreur** (`400 BAD REQUEST`):
    ```json
        {
            "status": "bad request",
            "message": "try body 'oldPassword','newPassword' and query 'email' "
        }
    ```
    or 
    ```json
        {
            "status": "internal server error", 
            "message": "incorrect password"
        }
    ```

# 🛠️ Utilisation

- **Clonez le dépôt**

```shell
    git clone https://github.com/TsitouhRanjafy/ChatApp_Web.git
```

- **Entrer dans le dépôt et installé les dependances**
```shell
    cd <nom_dossier> 
    npm install
```

- **Lancer le serveur**
  
```shell
    npm run build
```

> Créer le fichier .env en premier

