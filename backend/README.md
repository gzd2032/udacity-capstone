# CAPSTONE Project API Backend

## Getting Started

This backend API follows the Casting Agency models as described in the capstone project instructions.  This API was designed to streamline a company that is responsible for creating movies and managing and assigning actors to those movies. 

## Background

This project is the culminations of lessons learned in Udacity's Full Stack Nanodegree program.  This includes the use of flask sqlalchemy to manage data stored in a relational sql database, creating an API with routes based on the Model View Controller(MVC) design pattern, integrating the API with a 3rd party authentication application, and hosting the application on a cloud-based server.  

In addition, I used the feedback from previous project reviews and incorporated the application factory pattern and blueprints to create a scalable backend application.  

## URL for Hosted Application

The backend and frontend are hosted with the free Tier on Heroku.

Backend - https://capstone-backend-fsnd.herokuapp.com/  (Flask Python Backend)
Frontend - https://capstone-frontend-fsnd.herokuapp.com/ (React Frontend)

### Installing Dependencies

#### Python 3.8.2

This application was built on the latest version of python

#### Virtual Enviornment

Navigate to the `/backend` directory and create a virtual environment: 

example setup using virtual env
``` virtual env
source ~env/bin/activate
```

#### PIP Dependencies

Once the virtual environment is setup and running, install dependencies by  running:

```bash
pip install -r requirements.txt
```

This will install all of the required packages within the `requirements.txt` file.

##### Key Dependencies

- [Flask](http://flask.pocoo.org/)  is a lightweight backend microservices framework. Flask is required to handle requests and responses.

- [SQLAlchemy](https://www.sqlalchemy.org/) is the Python SQL toolkit and ORM we'll use handle the lightweight sqlite database. You'll primarily work in app.py and can reference models.py. 

- [Flask-CORS](https://flask-cors.readthedocs.io/en/latest/#) is the extension we'll use to handle cross origin requests from our frontend server. 

- [Flask OAuth Client](https://docs.authlib.org/en/latest/client/flask.html)

## Database Setup
With Postgres running, create a database name capstone, then restore a database using the capstone.psql file provided. From the backend folder in terminal run:
```bash
createdb capstone
psql capstone < capstone.psql
```

## Running the server

From within the `backend` directory first ensure you are working using your created virtual environment.
To run the server, execute:

```bash
export FLASK_APP=app.py

flask run
```

## Permissions

The following users were setup with permissions to restrict access to certain routes:  

Casting Assistant:  
 - Login: casting_assistant@email.com
 - Test Password:  test1234!
 - Permissions:    Can view actors and movies
 - RBAC Permission:  ["get:actors","get:movies"]

Casting Director:  
 - Login: casting_director@email.com
 - Test Password:  test1234!
 - Permissions:    
        -- All permissions a Casting Assistant has and…
        -- Add or delete an actor from the database
        -- Modify actors or movies
 - RBAC Permissions:  ["add:actor","delete:actor","get:actors","get:movies","modify:actors","modify:movies"]

Executive Producer:  
 - Login: executive_producer@email.com
 - Test Password:  test1234!
 - Permissions:    
        -- All permissions a Casting Director has and…
        -- Add or delete a movie from the database
 - RBAC Permissions:  ["add:actor","add:movie","delete:actor","delete:movie","get:actors","get:movies","modify:actors","modify:movies"]
 
# Endpoint

```
GET '/'
GET '/movies'
GET '/actors'
GET '/moves/<int>'
GET '/actors/<int>'
POST '/movies'
POST '/actors'
POST '/actors/<int>/movie'
PATCH '/movies/<int>'
PATCH '/actors/<int>'
DELETE '/movies/<int>'
DELETE '/actors/<int>'

GET '/login'
GET '/callback'
GET '/logout'
```

GET '/'
- Provides a Test webpage to get the user token
- Request Arguments: None
- Returns: an HTML webpage with a login button. After the user logs, the user token will appear, and a link to the React frontend app, which is hosted on Heroku, will also appear.  

GET '/movies'
- Fetches an array of all movies with their id, title and release date.
- Request Arguments: None
- Returns: A dictionary with a "success" boolean and an array of dictionaries called "movies", which includes the properties: id(integer), release_date(date), and title(string).
- An example return:
```
{
    "movies": [
        {
            "id": 5,
            "release_date": "Tue, 15 Sep 2020 00:00:00 GMT",
            "title": "Fast and the Furious 5"
        },
        {
            "id": 4,
            "release_date": "Thu, 10 Mar 2005 00:00:00 GMT",
            "title": "Spiderman"
        }
    ],
    "success": true
}

```

GET '/actors'
- Fetches an array of all actors with their name, age, gender, id, movie title and movie id.
- Request Arguments: None
- Returns: A dictionary with a "success" boolean and an "actors" array of dictionaries.  The "actor" dictionary includes the properties: age, gender, id, movie, movie_id, and name. 
- An example return:
```
{
    "actors": [
        {
            "age": 45,
            "gender": "male",
            "id": 9,
            "movie": "Fast and the Furious 5",
            "movie_id": 5,
            "name": "Jason Statham"
        },
        {
            "age": 28,
            "gender": "male",
            "id": 6,
            "movie": "Spiderman",
            "movie_id": 4,
            "name": "Peter Parker"
        }
    ],
    "success": true
}

```

GET '/movies/<int>'
- Fetches the detailed information of a single movie include the id, movie title, release date, and an array of all actors associated with the movie.  
- Request Arguments: Include the id of the movie by passing an integer value after the '/movies/' route.  For example:  '/movies/3'.  
- Returns: A dictionary with a "success" boolean and a "movies" dictionary.  The "movies" dictionary includes properties: id(integer), release_date(date), titled(string), and an "actor" array of dictionaries.  The "actor" dictionary includes the properties: age(integer), gender(string), id(integer), and a movie dictionary.  The "movie" dictionary includes the properties: movie_id(integer), and name(string). 
- An example return:
```
{
    "movies": {
        "actors": [
            {
                "age": 69,
                "gender": "male",
                "id": 9,
                "movie": {
                    "id": 3,
                    "title": "The Other Guys"
                },
                "name": "Michael Keaton"
            },
            {
                "age": 66,
                "gender": "female",
                "id": 10,
                "movie": {
                    "id": 3,
                    "title": "The Other Guys"
                },
                "name": "Kim Basinger"
            }
        ],
        "id": 3,
        "release_date": "Mon, 08 Feb 2010 00:00:00 GMT",
        "title": "The Other Guys"
    },
    "success": true
}
```

GET '/actors/<int>'
- Fetches the detailed information of a single actors with his/her name, age, gender, id, movie title and movie id.
- Request Arguments: Include the id of the actor by passing an integer value after the '/actors/' route.  For example:  '/actors/3'.  
- Returns: A dictionary with a "success" boolean and an "actors" dictionary.  The "actors" dictionary includes the properties: name(string), age(integer), gender(string), id(integer), and a "movie" dictionary.  The "movie" dictionary include the movie associated with the actor and includes the movie properties:  id(integer) and title(string). 
- An example return:
```
{
    "actors": {
        "age": 41,
        "gender": "female",
        "id": 3,
        "movie": {
            "id": 1,
            "title": "Dr Strange"
        },
        "name": "Rachel McAdams"
    },
    "success": true
}
```

POST '/movies'
- Adds a new movie to the database and returns an array of all movies.
- Request Arguments: Send a post request to the endpoint with the required properties in a json body.  The required properties include a title(string) and a release date(date).  
```
{
    "title": "Gretel and Hansel",
    "release_date": "1/10/2020"
}
```
- Returns: A dictionary with a "success" boolean and a "movies" array of all movies.  The "movies" array includes a dictionary of each movie with the properties: id(integer), release_date(date), and title(string). 
- An example return:
```
{
    "movies": [
        {
            "id": 7,
            "release_date": "Thu, 01 Oct 2020 00:00:00 GMT",
            "title": "Gretel and Hansel"
        },
        {
            "id": 3,
            "release_date": "Mon, 08 Feb 2010 00:00:00 GMT",
            "title": "The Other Guys"
        },
        {
            "id": 1,
            "release_date": "Fri, 04 Nov 2016 00:00:00 GMT",
            "title": "Dr Strange"
        }
    ],
    "success": true
}

```
POST '/actors'
- Adds an actor to the data and returns an array of all actors.  
- Request Arguments: Send a POST request to the endpoint with the required properties in a json body.  The required properties in the json body must include a "name"(string), "age"(integer), "gender"(string), and a "movie_id"(integer).  The movie_id is required to be a valid movie in the database. 
```
{
    "name": "John Newman",
    "age": 32,
    "gender": "male",
    "movie_id": 1
}

```
- Returns: A dictionary with a "success" boolean and an "actors" array of all actors.  The "actors" array includes a dictionary of each actor with the properties: id(integer), movie(string), and name(string). 
- An example return:
```
{
    "actors": [
        {
            "id": 17,
            "movie": "Dr Strange",
            "name": "John Newman"
        },
        {
            "id": 12,
            "movie": "Thor",
            "name": "Natalie Portman"
        },
        {
            "id": 1,
            "movie": "Dr Strange",
            "name": "Benedict Cumberbatch"
        }
    ],
    "success": true
}

```
POST '/actors/<int>/movie'
- Adds an actor to the database and returns an array of all actors, including the new actor.  
- Request Arguments: Send a POST request to the endpoint with the id of movie in the endpoint, and the required properties in a json body.  The required properties in the json body must include a name(string), age(integer), and gender(string).  The id of the movie requires a valid movie id in the database. Entering a movie id that is not in the database will result in an error.  
- Example endpoint for a movie with an id of 3:  '/actors/3/movie'
- Example body data:
```
{
    "name": "John Doe",
    "age": 32,
    "gender": "male"
}

```
- Example error if the movie_id is not a valid movie in the database:
```
{
    "error": 400,
    "message": "bad request",
    "success": false
}
```
- Returns: A dictionary with a "success" boolean and an "actors" array of all actors.  The actors array includes a dictionary of each actor with the properties: id(integer), name(string), age(integer), gender(string), and a "movie" dictionary.  The "movie" dictionary has the following properties of the movie associated with the actor:  id(integer) and title(string).
- An example return for a movie with id 3:

```
{
    "actors": [
        {
            "age": 32,
            "gender": "male",
            "id": 21,
            "movie": {
                "id": 3,
                "title": "The Other Guys"
            },
            "name": "John Doe"
        },
        {
            "age": 69,
            "gender": "male",
            "id": 9,
            "movie": {
                "id": 3,
                "title": "The Other Guys"
            },
            "name": "Michael Keaton"
        }
    ],
    "success": true
}
```

PATCH '/movies/<int>'
- Updates the information for a single movie and returns the information of the movie added.
- Request Arguments: Send a PATCH request to the endpoint with the required properties in a json body.  Include the movie id in the endpoint.  The required properties in the json body is a title(string) and release_date(date).  The movie_id requires a valid movie listed in the database. Entering a movie_id that is not in the database will result in an error. 
- Example endpoint for updating a movie with an id of 3:  '/movies/3'
- Example body data:
```
{
    "title": "Gretel and Hansel",
    "release_date": "1/10/2020"
}

```
- Returns: A dictionary with a "success" boolean and an "actors" array of all actors.  The actors array includes a dictionary of each actor with the properties: id(integer), name(string), age(integer), gender(string), and a "movie" dictionary.  The "movie" dictionary has the following properties of the movie associated with the actor:  id(integer) and title(string).
- An example return after updating a movie with an id of 3:
```
{
    "movies": [
        {
            "id": 3,
            "release_date": "Thu, 01 Oct 2020 00:00:00 GMT",
            "title": "Gretel and Hansel"
        }
    ],
    "success": true
}
```

PATCH '/actors/<int>'
- Updates the information for a single actor and returns a dictionary of the new actor's information.
- Request Arguments: Send a PATCH request to the endpoint with the required properties in a json body.  Include the actor's id in the endpoint.  The required properties in the json body must include a name(string), age(integer), gender(string) and movie_id(integer).  The movie_id requires a valid movie listed in the database. Entering a movie_id that is not in the database will result in an error. 
- Example endpoint for updating an actor with an id of 20:  '/actors/20'
- Example body data:
```
{
    "name": "John Doe",
    "age": 32,
    "gender": "male",
    "movie_id":3
}

```
- Returns: A dictionary with a "success" boolean and "actors" dictionary of the new actor's property.  The "actors" dictionary includes the following properties: id(integer), name(string), "movie"(string).  
- An example return after updating an actor with an id of 20:
```
{
    "actors": {
        "id": 20,
        "movie": "Gretel and Hansel",
        "name": "John Doe"
    },
    "success": true
}

```

DELETE '/movies/<int>'
- Removes a single movie from the database and all the associated actors in the movie.
- Request Arguments: Send a PATCH request to the endpoint with the required properties in a json body.  Include the actor's id in the endpoint.  The required properties in the json body must include a name(string), age(integer), gender(string) and movie_id(integer).  The movie_id requires a valid movie listed in the database. Entering a movie_id that is not in the database will result in an error. 
- Example endpoint for updating an actor with an id of 20:  '/actors/20'
- Returns: A dictionary with a "success" boolean and "actors" dictionary of the new actor's property.  The "actors" dictionary includes the following properties: id(integer), name(string), "movie"(string).  
- An example return after deleting a movie with an id of 7:
```
{
    "delete": 7,
    "success": true
}
```

DELETE '/actors/<int>'
- Removes a single actor from the database.
- Request Arguments: Send a PATCH request to the endpoint with the required properties in a json body.  Include the actor's id in the endpoint.  The required properties in the json body must include a name(string), age(integer), gender(string) and movie_id(integer).  The movie_id requires a valid movie listed in the database. Entering a movie_id that is not in the database will result in an error. 
- Example endpoint for updating an actor with an id of 20:  '/actors/20'
- Returns: A dictionary with a "success" boolean and "actors" dictionary of the new actor's property.  The "actors" dictionary includes the following properties: id(integer), name(string), "movie"(string).  
- An example return after deleting an actor with an id of 20:
```
{
    "delete": 20,
    "success": true
}
```

ADDITIONAL AUTH0 routes

GET '/login'
- Redirects the user to the Auth0 login screen for authentication.
- Request Arguments: None
- Returns: After a successful login, the code response from Auth0 is sent to the '/callback' route.

GET '/callback'
- Callback handler after successfully authenticating with Auth0.  Uses the user's returned access token to retrieve the user's profile from Auth0.
- Request Arguments: None.
- Returns: The user is redirected back to '/' with the user's token information and an HTML default page showing the user's token is returned. 

GET '/logout'
- Clears the current user's Auth0 session.
- Request Arguments: None.
- Returns: The user is redirected back to '/' where the default HTML page is returned.


## Error Handlers

End point operations that result in an error will return the standard HTML error response codes:  4xx for client submission error and 5xx for server function error.

Error codes

Error Code: 400
- There was an error in the client request to perform a function on the server.  e.g. malformed json objects submitted to endpoints.
- Message: Bad Request
- Response: Json object
```
{
      "success": False,
      "error": 400,
      "message": "bad request"
}
```

Error Code: 401
- There user did not have the proper permissions to access the route.
- Message: Permissions error
- Response: Json object
```
{
        "success": False,
        "error": 401,
        "message": "permissions error"
}
```


Error Code: 404
- The server was not able to find the requested data on the server.  e.g. Client tried to query database items taht did not exist.
- Message: Resource Not Found
- Response: Json object
```
{
      "success": False,
      "error": 404,
      "message": "Resource Not Found"
}
```

Error Code: 405
- The client attempted an invalid method on the endpoint.  e.g. Attempted POST method on a GET only endpoint.
- Message: Method Not Allowed
- Response: Json object
```
{
      "success": False,
      "error": 405,
      "message": "Method Not Allowed"
}
```

Error Code: 422
- The server was not able to process the data submitted by the client even though the syntax and format was correct.  e.g. The client submitted invalid data types when adding a new question to the database.
- Message: Unable to process data
- Response: Json object
```
{
        "success": False,
        "error": 422,
        "message": "unprocessable data" 
}
```

Error Code: 500
- There was an error in the server when it attempted to process the client's request.  e.g. Client tried to query an endpoint that does not exist, and the server didn't know how to handle it.
- Message: Server Error
- Response: Json object
```
{
      "success": False,
      "error": 500,
      "message": "Server Error"
}
```


## Testing
To run the tests, run
```
dropdb capstone
createdb capstone
psql capstone < capstone.psql
python test_app.py
```