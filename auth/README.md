### Architecture of Auth Service

## Tech Used

-- Typescript, Node js, Mongoose
-- Using JWT token to authorization inside a cookie

** Cookies **
Transport Mechanism
Moves any kind of data between browser and server
automatically managed by brower

** JWT's **
Authentication/Authorization Mechanism
Stores any data we want
Have to manage manually

** Ideal Setup **

index.js -----> app.js --------> test file

code to start up the app and listen on port 3000
|
|
|

- Express App that is not listening on any port
  ^
  |
  |
  |
  Code to test app with supertest
