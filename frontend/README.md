This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

# CAPSTONE Project API Frontend

## Getting Started

This frontend relies on the Capsteon Project API Backend.  It provides a user friendly responsive interface to the Casting Agency models as described in the capstone project instructions.  This front end application was designed to streamline a company that is responsible for creating movies and managing and assigning actors to those movies. 

## URL for Hosted Application

The backend and frontend are hosted with the free Tier on Heroku.

* Backend - https://capstone-backend-fsnd.herokuapp.com/  (Flask Python Backend)
* Frontend - https://capstone-frontend-fsnd.herokuapp.com/ (React Frontend)

## Permissions

Authentication is provide by Auth0 with the following Users created for this project:

Casting Assistant:  
 - Login: casting_assistant@email.com
 - Test Password:  test1234!
 - Permissions:    Can view actors and movies
 -  RBAC Permission:  ["get:actors","get:movies"]

Casting Director:  
 - Login: casting_director@email.com
 - Test Password:  test1234!
 - Permissions:    
        * All permissions a Casting Assistant has and…
        * Add or delete an actor from the database
        * Modify actors or movies
 - RBAC Permissions:  ["add:actor","delete:actor","get:actors","get:movies","modify:actors","modify:movies"]

Executive Producer:  
 - Login: executive_producer@email.com
 - Test Password:  test1234!
 - Permissions:    
        * All permissions a Casting Director has and…
        * Add or delete a movie from the database
 - RBAC Permissions:  ["add:actor","add:movie","delete:actor","delete:movie","get:actors","get:movies","modify:actors","modify:movies"]



## Running the server

From within the `frontend` directory, you can run the following commands: 

### `npm install`

This will install the required node dependencies.

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.
