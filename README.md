## Dashdoc Interview

Truckfinder is an app that allows you to see gifs related to trucks.

Your goal is to add new features to this small app:

-   1. Add a link to the home page to log in
-   2. When the user is logged in, show its username in the header and add a link in this header to fetch more gifs from the API
-   3. Add a search bar to search for gifs

You can of course change any code that you see fit to make those changes.

Some pointers:

#### Setup

You need Python >=3.6, Node >=10 installed.

-   Run `pip install -r requirements.txt` to install the python dependencies.
-   Run `yarn` to install the node dependencies
-   Run `python manage.py migrate` to setup the db
-   Run `python manage.py createsuperuser` to create a user
-   Run `python manage.py shell_plus` to start the backend server
-   Run `yarn start` in `frontend/` to start the frontend server

#### Authentication

POST `{"username": "user", "password": "pass1234"}` to `/api-token-auth/` to get the auth token back.
You can then use the token to make logged-in requests to the backend by adding the `Authorization: Token asdfho3h029j30kdfjsj3082` header to them.

#### Fetching more gifs

POST to `/api/fetch/` to fetch gifs from the API and store them in the DB.

[:truck: Happy coding! :truck:](http://media1.giphy.com/media/2G4flVpbo6RmE/giphy.gif)
