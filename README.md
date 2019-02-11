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
