## Dashdoc Interview

Truckfinder is an app that allows you to see gifs related to trucks. It displays gifs that are preloaded in database.

Your goal is to add new features to this small app:

-   1. Implement the login page. It should enable users to use their already existing credentials (username + password) to log in to the app.
-   2. When the user is logged in, show its username in the header and add a link in this header that will call the API to add more gifs in the DB.
-   3. Add a search bar to search for gifs with text

You can of course change any code that you see fit to make those changes.

Some pointers:

#### Setup

You need Python >=3.6, Node >=10 installed.

#### API
In the `api/` folder (we recommend setting up a virtual environment):
-   Run `pip install -r requirements.txt` to install the python dependencies.
-   Run `python manage.py migrate` to setup the db
-   Run `python manage.py runserver` to start the backend server
-   Run `python manage.py createsuperuser` to create a user

#### Frontend
In the `frontend/` folder:
-   Run `yarn` or `npm install` to install the node dependencies
-   Run `yarn start` `npm run start` to start the frontend server

#### Authentication

POST `{"username": "YOUR_USERNAME", "password": "YOUR_PASSWORD"}` to `/api-token-auth/` with the credentials you entered in the createsuperuser command to get the auth token back.
You can then use the token to make logged-in requests to the API by adding the `Authorization: Token YOUR_TOKEN` header to them.

#### Adding gifs to the database

POST to `/api/fetch/` to fetch gifs from the API and store them in the DB.


[:truck: Happy coding! :truck:](http://media1.giphy.com/media/2G4flVpbo6RmE/giphy.gif)

## Timing des features : 

- [ ] 0m: Set up environment
- [ ] 5m: Problème avec les migrations
- [ ] 7m: Au fait c'est un problème de Python, je change le aversion de python 3.7 à python 3.6
- [ ] 17m: done, Re-pip install
- [ ] 19m: ✨ install done
- [ ] 21m: created user and got token
- [ ] 23m: validé la 403 sans autorisation sur /users {“detail":"Authentication credentials were not provided."}
- [ ] 24m: résultat OK avec le token 
    - [ ] curl -H "Authorization: Token 9859714d5084231e28c4e71dbb3351ff8ed7f459" http://localhost:8000/api/users/
    - [ ] {"count":1,"next":null,"previous":null,"results":[{"url":"http://localhost:8000/api/users/1/","username":"thib","email":"thib@thib.com","is_staff":true}]}
- [ ] 26m: Gif fetched, bdd opérationnelle
- [ ] 27m: ✨ Start working
- [ ] 27m: Petite refato sur le code
- [ ] 36m: prettier set ups tools
- [ ] 50m: fin refacto set up tools et tests manuels
- [ ] 51m: Check solution routing 
- [ ] 53m: Adding react-router
- [ ] 59m: react router done, + 2 routes + link avec le bouton
- [ ] 1h: Mutualisation de l’appbar
- [ ] 1h02m: Ajout de champs sur la page login
- [ ] 1h45m: Requête qui log in OK dans le front
- [ ] 1h50m: On démarre le username
- [ ] 2h10m: route ok
- [ ] 2h20m: username dans le header
- [ ] 2h25m: bouton add more gifs
- [ ] 2h30m: searchbar
