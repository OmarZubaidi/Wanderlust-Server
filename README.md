## Description

Nest.js backend for our Full Stack Travel Planning Application.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Setup Database

```bash
# setup database
npx prisma migrate dev --name init

# open db web view
npx prisma studio
```

## Setup Environmental Variables

```bash
PORT = 1234
# add your db username and password
DATABASE_URL=postgresql://user:password@localhost:5432/wanderlust?schema=public

# Auth0 Tenant Name and Region (us, eu...)
AUTH0_ISSUER_URL=https://tenant-name.region.auth0.com/
# Auth0 Custom Api Identifier 
AUTH0_AUDIENCE=https://yourapiidentifier.com
```

## Setup Heroku

```bash
# Prisma and Heroku setup from scratch
# https://www.prisma.io/docs/guides/deployment/deployment-guides/deploying-to-heroku

# add remote heroku repo
heroku git:remote -a your-app-name
# push changes to heroku remote server
# this will run npm start and npx prisma migrate deploy to set up the db
git push heroku main
# to see live logs of the server run
heroku log --tail
```

## API URL

```bash
https://api-wanderlust-dogs.herokuapp.com/
```

## Routes

Following routes are available for the web and mobile application.

### User

Routes:

```javascript
// find all users
GET /users
// find user by id
// includes Hotels, Flights, Trips
GET /users/:id
// find user by email
GET /users/email/:email
// create new user -> look at CreateUserDto below for example
POST /users
// login mobile users with bcrypt password -> look at LoginMobileUserDto
POST /users/login/mobile
// update user -> look at CreateUserDto for updatable properties
PATCH /users/:id
// delete user
DELETE /users/:id
```

Data Transfer Objects:

```json
CreateUserDto:
{
    "email": "test@test.at",
    "username": "test",
    "sub": "2ssqwe123asd23",
    "emailVerified": false,
    "pictureUrl": "urltoimage",
    "origin": "milano", // optional
    "mobilePassword": "password" // optional
}
LoginMobileUserDto:
{
    "email": "test@test.at",
    "mobilePassword": "password"
}
```

### Hotel

Routes:

```javascript
// find all hotels
GET /hotels
// find hotel by id
GET /hotels/:id
// find hotel by apiId
GET /hotels/api/:apiId
// create new hotel-> look at CreateHotelDto below for example
POST /hotels
// update hotel -> look at CreateHotelDto for updatable properties
PATCH /hotels/:id
// delete hotel
DELETE /hotels/:id
```

Data Transfer Objects:

```json
CreateHotelDto:
{
    "name": "Teds Plaza",
    "location": "Austria",
    "longitude": 12378,
    "latitude": 1235678,
    "arrival": "2032-05-09T14:15:18.532Z",
    "departure": "2022-05-09T14:15:18.532Z",
    "nights": 5,
    "priceTotal": "303 €",
    "hotelApiId": 142,
    "description": "Hotel is located near the beach",
    "type": "hotel",
    "rating": "5",
}
```

### Flight

Routes:

```javascript
// find all flights
GET /flights
// find flight by id
GET /flights/:id
// find flight by apiId
GET /flights/api/:apiId
// create new flight -> look at CreateFlightDto below for example
POST /flights
// update flights -> look at CreateFlightDto below for updatable properties
PATCH /flights/:id
// Delete flight
DELETE /flights/:id
```

Data Transfer Objects:

```json
CreateFlightDto:
{

    "departureCity": "Barcelona",
    "arrivalCity": "Berlin",
    "lengthOfFlight": "2:30 h",
    "price": "230 €",
    "itineraries": [ // array of flight objects
        {
            "depAirport": "Barcelona",
            "arrAirport": "Athen",
            "depTerminal": "C", // optional
            "arrTerminal": "G", // optional
            "departure": "2022-05-12T13:06:11.358Z",
            "arrival": "2022-05-12T13:06:11.358Z"
        }
    ]
}:
```

### Event

Routes:

```javascript
// find all events
GET /events
// find event by id
GET /events/:id
// create new flight -> look at CreateEventDto below for example
POST /events
// update flights -> look at CreateEventDto below for updatable properties
PATCH /events/:id
// Delete event
DELETE /events/:id
```

Data Transfer Objects:

```json
CreateEventDto:
{
    "title": "Lorem ipsum dolor",
    "start": "1970-01-01T00:00:00.000Z",
    "end": "1970-01-01T00:00:00.000Z",
    "allDay": true,
    "description": "test",
    "location": "barcelona",
    "longitude": 12378,
    "latitude": 1235678,
    "price": "free",
    "eventApiId": 12323,
    "bookingLink": "LINK",
    "type": "Activity",
    "pictures": "reeeeee",
    "rating": 3.2,
    "tripId": 2
}
```

### Trip

Routes:

```javascript
// find all trips
GET /trips
// find trip by id,
// includes Hotels, Flights, Events, and Users
GET /trips/:id
// create new trip-> look at CreateUsersOnTripDto below for example
POST /trips
// update trip-> look at CreateUsersOnTripDto below for updatable properties
PATCH /trips/:id
// Delete trip
DELETE /trips/:id
```

Data Transfer Objects:

```json
CreateTripDto:
{
    "start": "1970-01-01T00:00:00.000Z",
    "end": "1970-01-01T00:00:00.000Z",
    "destination": "Senegal"
}
```

### UsersOnTrips (m - n Bridge)

Routes:

```javascript
// find all UsersOnTrips
GET /users-on-trips
// find UsersOnTrips by id
GET /users-on-trips/:id
// create new UsersOnTrips -> look at CreateUsersOnTripDto below for example
POST /users-on-trips
// create many trips with single tripId and multiple userIds
POST /users-on-trips/many
// update UsersOnTrips -> look at CreateUsersOnTripDto below for updatable properties
PATCH /users-on-trips/:id
// Delete UsersOnTrips
DELETE /users-on-trips/:id
```

Data Transfer Objects:

```json
CreateUsersOnTripDto:
{
    "userId": 10,
    "tripId": 2
}
CreateManyUsersOnTripDto:
{
    "tripId": 2,
    "userIds": [
        14,
        10,
        15,
        22
    ]
}
```

### UsersOnHotels (m - n Bridge)

Routes:

```javascript
// find all UsersOnHotels
GET /users-on-hotels
// find UsersOnHotels by id
GET /users-on-hotels/:id
// create new UsersOnHotels -> look at CreateUsersOnHotelsDto below for example
POST /users-on-hotels
// create many trips with single tripId and multiple userIds
POST /users-on-hotels/many
// update UsersOnHotels -> look at CreateUsersOnHotelsDto below for updatable properties
PATCH /users-on-hotels/:id
// Delete UsersOnHotels
DELETE /users-on-hotels/:id
```

Data Transfer Objects:

```json
CreateUsersOnHotelsDto:
{
    "userId": 10,
    "tripId": 2,
    "hotelId": 2
}
```

### UsersOnFlights (m - n Bridge)

Routes:

```javascript
// find all UsersOnFlights
GET /users-on-flights
// find UsersOnFlights by id
GET /users-on-flights/:id
// create new UsersOnFlights -> look at CreateUsersOnFlightsDto below for example
POST /users-on-flights
// create many trips with single tripId and multiple userIds
POST /users-on-flights/many
// update UsersOnFlights -> look at CreateUsersOnFlightsDto below for updatable properties
PATCH /users-on-flights/:id
// Delete UsersOnFlights
DELETE /users-on-flights/:id
```

Data Transfer Objects:

```json
CreateUsersOnHotelsDto:
{
    "userId": 10,
    "tripId": 2,
    "flightId": 2
}
```
