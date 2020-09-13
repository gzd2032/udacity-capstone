This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

# CAPSTONE Project API Frontend

## Getting Started

This frontend relies on the Capsteon Project API Backend.  It provides a user friendly responsive interface to the Casting Agency models as described in the capstone project instructions.  This front end application was designed to streamline a company that is responsible for creating movies and managing and assigning actors to those movies. 

## URL for Hosted Application

The backend and frontend are hosted with the free Tier on Heroku.

Backend - https://capstone-backend-fsnd.herokuapp.com/  (Flask Python Backend)
Frontend - https://capstone-frontend-fsnd.herokuapp.com/ (React Frontend)

## Permissions

Authentication is provide by Auth0 with the following Users created for this project:

Casting Assistant:  
  Login: casting_assistant@email.com
  Test Password:  test1234!
  Permissions:    Can view actors and movies
  RBAC Permission:  ["get:actors","get:movies"]

Casting Director:  
  Login: casting_director@email.com
  Test Password:  test1234!
  Permissions:    All permissions a Casting Assistant has and…
                  Add or delete an actor from the database
                  Modify actors or movies
  RBAC Permissions:  ["add:actor","delete:actor","get:actors","get:movies","modify:actors","modify:movies"]

Executive Producer:  
  Login: executive_producer@email.com
  Test Password:  test1234!
  Permissions:    All permissions a Casting Director has and…
                  Add or delete a movie from the database
  RBAC Permissions:  ["add:actor","add:movie","delete:actor","delete:movie","get:actors","get:movies","modify:actors","modify:movies"]



## Running the server

From within the `frontend` directory, you can run the following commands: 

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).


