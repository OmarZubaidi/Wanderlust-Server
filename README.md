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
#Signing Algorithm RS256
```

## Routes

Following routes are available for the web and mobile application.

### User

Routes:

```bash
# find all users
GET /users
# find user by id
# includes Hotels, Flights, UsersOnTrips
GET /users/:id
# find user by email
GET /users/email/:email
# create new user -> look at CreateUserDto below for example
POST /users
# update user -> look at CreateUserDto for updatable properties
PATCH /users/:id
# delete user
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
}
```

### Hotel

Routes:

```bash
# find all hotels
GET /hotels
# find hotel by id
GET /hotels/:id
# create new hotel-> look at CreateHotelDto below for example
POST /hotels
# update hotel -> look at CreateHotelDto for updatable properties
PATCH /hotels/:id
# delete hotel
DELETE /hotels/:id
```

Data Transfer Objects:

```json
CreateHotelDto:
{
    "name": "Teds Plaza",
    "location": "Austria",
    "coordinates": "123, 5678",
    "arrival": "2032-05-09T14:15:18.532Z",
    "departure": "2022-05-09T14:15:18.532Z",
    "nights": 5,
    "priceTotal": "303 €",
    "hotelApiId": 142,
    "userId": 14,
    "tripId": 1
}
```

### Flight

Routes:

```bash
# find all flights
GET /flights
# find flight by id
GET /flights/:id
# create new flight -> look at CreateFlightDto below for example
POST /flights
# update flights -> look at CreateFlightDto below for updatable properties
PATCH /flights/:id
# Delete flight
DELETE /flights/:id
```

Data Transfer Objects:

```json
CreateFlightDto:
{
    "departure": "1970-01-01T00:00:00.000Z",
    "arrival": "1970-01-01T00:00:00.000Z",
    "gate": "B",
    "depAirport": "Barcelona",
    "arrAirport": "Berlin",
    "lengthOfFlight": "2:30 h",
    "price": "230 €",
    "flightApiId": 1234,
    "userId": 16,
    "tripId": 2,
}:
```

### Event

Routes:

```bash
# find all events
GET /events
# find event by id
GET /events/:id
# create new flight -> look at CreateEventDto below for example
POST /events
# update flights -> look at CreateEventDto below for updatable properties
PATCH /events/:id
# Delete event
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
    "coordinates": "123123123",
    "price": "free",
    "eventApiId": 12323,
    "bookingLink": "LINK",
    "type": "Activity",
    "pictures": "reeeeee",
    "rating": 3.2,
    "tripId": 2
}
```

### UsersOnTrips (m - n Bridge)

Routes:

```bash
# find all UsersOnTrips
GET /users-on-trips
# find UsersOnTrips by id
GET /users-on-trips/:id
# create new UsersOnTrips -> look at CreateUsersOnTripDto below for example
POST /users-on-trips
# create many trips with single tripId and multiple userIds
POST /users-on-trips/many
# update UsersOnTrips -> look at CreateUsersOnTripDto below for updatable properties
PATCH /users-on-trips/:id
# Delete UsersOnTrips
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

### Trip

Routes:

```bash
# find all trips
GET /trips
# find trip by id, 
# includes Hotels, Flights, Events, UsersOnTrips
GET /trips/:id
# create new trip-> look at CreateUsersOnTripDto below for example
POST /trips
# update trip-> look at CreateUsersOnTripDto below for updatable properties
PATCH /trips/:id
# Delete trip
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
