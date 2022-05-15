# Wanderlust Back End

<!-- TODO update logo when we decide on one -->
<div align='center'>
  <img
    height='150'
    src='./Logo.png'
    alt='Logo'
  />
</div>

<p align='center'>
  The back-end for the <a href='https://github.com/OmarZubaidi/Wanderlust'>
    Wanderlust
  </a> project.
</p>

<hr>

<details>
  <summary>Table of Contents</summary>
  <ul>
    <li>
      <a href='#about-the-project'>
        About the Project
      </a>
      <ul>
        <li>
          <a href='#built-with'>
            Built With
          </a>
        </li>
      </ul>
    </li>
    <li>
      <a href='#getting-started'>
        Getting Started
      </a>
      <ul>
        <li>
          <a href='#prerequisites'>
            Prerequisites
          </a>
        </li>
        <li>
          <a href='#installation'>
            Installation
          </a>
        </li>
      </ul>
    </li>
    <li>
      <a href='#routes'>
        Routes
      </a>
      <ul>
        <li>
          <a href='#user'>
            User
          </a>
        </li>
      </ul>
      <ul>
        <li>
          <a href='#hotel'>
            Hotel
          </a>
        </li>
      </ul>
      <ul>
        <li>
          <a href='#flight'>
            Flight
          </a>
        </li>
      </ul>
      <ul>
        <li>
          <a href='#event'>
            Event
          </a>
        </li>
      </ul>
      <ul>
        <li>
          <a href='#trip'>
            Trip
          </a>
        </li>
      </ul>
      <ul>
        <li>
          <a href='#usersontrips-m---n-bridge'>
            UsersOnTrips (m - n Bridge)
          </a>
        </li>
      </ul>
      <ul>
        <li>
          <a href='#usersonhotels-m---n-bridge'>
            UsersOnHotels (m - n Bridge)
          </a>
        </li>
      </ul>
      <ul>
        <li>
          <a href='#usersonflights-m---n-bridge'>
            UsersOnFlights (m - n Bridge)
          </a>
        </li>
      </ul>
    </li>
    <li>
      <a href='#contributing'>
        Contributing
      </a>
    </li>
    <li>
      <a href='#contact'>
        Contact
      </a>
    </li>
    <li>
      <a href='#acknowledgements'>
        Acknowledgements
      </a>
    </li>
  </ul>
</details>

## About the Project

This is where all the data necessary to make the project work is stored. This comprises users, flights, hotels, events, and much more.

### Built With

- [NodeJS](https://nodejs.org/en/)
- [NestJS](https://nestjs.com/)
- [PostgreSQL](https://www.postgresql.org/)
- [Prisma](https://www.prisma.io/)
- [Heroku](https://www.heroku.com/)

## Getting Started

To get a local copy up and running, follow these steps.

### Prerequisites

You need to have:

- An [Auth0](https://auth0.com/) account, with a Single Page Application application (weird naming but okay).
- Installed Node Version Manager
- Installed the latest LTS version of Node

```shell
nvm install npm@lts -g
```

### Installation

- Clone the repo

```shell
git clone https://github.com/OmarZubaidi/Wanderlust-Server.git
```

- Install NPM packages

```shell
npm i
```

- Create your `.env` file in the root folder as below.

```
PORT = YOUR_PORT_NUMBER
# add your db username and password
DATABASE_URL=postgresql://YOUR_PSQL_USERNAME:YOUR_PSQL_PASSWORD@localhost:5432/wanderlust?schema=public

# Auth0 Tenant Name and Region (us, eu...)
AUTH0_ISSUER_URL=https://tenant-name.region.auth0.com/
# Auth0 Custom Api Identifier 
AUTH0_AUDIENCE=https://YOUR_API_IDENTIFIER.com
```

- Set up the database

```shell
npx prisma migrate dev --YOUR_DB_NAME init
# Open DB web view
npx prisma studio
```

- Run the app using

```shell
# Development
npm run start
# Watch mode
npm run start:dev
# Production mode
npm run start:prod
```

- Set up Heroku

```shell
# Prisma and Heroku setup from scratch
# https://www.prisma.io/docs/guides/deployment/deployment-guides/deploying-to-heroku

# Add remote Heroku repo
heroku git:remote -a YOUR_APP_NAME
# Push changes to Heroku remote server.
# This will run `npm start` and `npx prisma migrate deploy` to set up the DB.
git push heroku main
# To see live logs of the server
heroku log --tail
```

- Testing

```shell
# Unit tests
$ npm run test
# End-to-end tests
$ npm run test:e2e
# Test coverage
$ npm run test:cov
```

## Routes

The following routes are available for the web and mobile application.

### User

Routes:

```js
// Find all users
GET /users
// Find user by id
// Includes Hotels, Flights, Trips
GET /users/:id
// Find user by email
GET /users/email/:email
// Create new user. Refer to 'CreateUserDto' for an example.
POST /users
// Log in mobile users with bcrypt password. Refer to 'LoginMobileUserDto' for an example.
POST /users/login/mobile
// Update user. Refer to 'CreateUserDto' for updatable properties.
PATCH /users/:id
// Delete user
DELETE /users/:id
```

Data Transfer Objects:

```ts
CreateUserDto:
{
    email: string,              // e.g. 'email@domain.tld',
    username: string,
    sub: string,
    emailVerified: boolean,
    pictureUrl: string,         // URL
    origin?: string,            // Full city name
    mobilePassword?: string,
}
LoginMobileUserDto:
{
    email: string,              // e.g. 'email@domain.tld',
    mobilePassword: string,
}
```

### Hotel

Routes:

```js
// Find all hotels
GET /hotels
// Find hotel by id
GET /hotels/:id
// Find hotel by apiId
GET /hotels/api/:apiId
// Create new hotel. Refer to CreateHotelDto for an example.
POST /hotels
// Update hotel. Refer to CreateHotelDto for updatable properties.
PATCH /hotels/:id
// Delete hotel
DELETE /hotels/:id
```

Data Transfer Objects:

```ts
CreateHotelDto:
{
    name: string,
    location: string,       // Full city name
    latitude: number,
    longitude: number,
    arrival: string,        // '2022-05-19T19:00:00.000Z'
    departure: string,      // '2022-05-19T19:00:00.000Z'
    nights: number,
    priceTotal: number,
    hotelApiId: string,
    description: string,
    type: string,
    rating: string,         // '5'
}
```

### Flight

Routes:

```js
// Find all flights
GET /flights
// Find flight by id
GET /flights/:id
// Find flight by apiId
GET /flights/api/:apiId
// Create new flight. Refer to CreateFlightDto for an example.
POST /flights
// Update flights. Refer to CreateFlightDto for updatable properties.
PATCH /flights/:id
// Delete flight
DELETE /flights/:id
```

Data Transfer Objects:

```ts
CreateFlightDto:
{
    departureCity: string,          // Full city name
    arrivalCity: string,            // Full city name
    lengthOfFlight: string,         // '2:30 h'
    price: number,
    flightApiId: number,
    itineraries: [
        {
            depAirport: string,     // Full city name
            arrAirport: string,     // Full city name
            depTerminal: string,
            arrTerminal: string,
            departure: string,      // '2022-05-19T19:00:00.000Z'
            arrival: string,        // '2022-05-19T19:00:00.000Z'
        },
    ];
}:
```

### Event

Routes:

```js
// Find all events
GET /events
// Find event by id
GET /events/:id
// Create new flight. Refer to CreateEventDto for an example.
POST /events
// Update flights. Refer to CreateEventDto for updatable properties.
PATCH /events/:id
// Delete event
DELETE /events/:id
```

Data Transfer Objects:

```ts
CreateEventDto:
{
    title: string,
    start: string,          // '2022-05-19T19:00:00.000Z'
    end: string,            // '2022-05-19T19:00:00.000Z'
    allDay: boolean,
    description: string,
    location: string,       // Full city name
    latitude: number,
    longitude: number,
    price: number,
    eventApiId: number,
    bookingLink: string,    // URL
    type: string,
    pictures: string,
    rating: number,
    tripId: number,
}
```

### Trip

Routes:

```js
// Find all trips
GET /trips
// Find trip by id,
// Includes Hotels, Flights, Events, and Users
GET /trips/:id
// Create new trip. Refer to 'CreateUsersOnTripDto' for an example.
POST /trips
// Update trip. Refer to 'CreateUsersOnTripDto' for updatable properties.
PATCH /trips/:id
// Delete trip
DELETE /trips/:id
```

Data Transfer Objects:

```ts
CreateTripDto:
{
    start: string,          // '2022-05-19T19:00:00.000Z'
    end: string,            // '2022-05-19T19:00:00.000Z'
    destination: string,    // Full city name
    latitude: number,
    longitude: number,
}
```

### UsersOnTrips (m - n Bridge)

Routes:

```js
// Find all UsersOnTrips
GET /users-on-trips
// Find UsersOnTrips by id
GET /users-on-trips/:id
// Create new UsersOnTrips. Refer to CreateUsersOnTripDto for an example.
POST /users-on-trips
// Create many trips with single tripId and multiple userIds
POST /users-on-trips/many
// Update UsersOnTrips. Refer to CreateUsersOnTripDto for updatable properties.
PATCH /users-on-trips/:id
// Delete UsersOnTrips
DELETE /users-on-trips/:id
```

Data Transfer Objects:

```ts
CreateUsersOnTripDto:
{
    userId: number,
    tripId: number,
}
CreateManyUsersOnTripDto:
{
    tripId: number,
    userIds: number[],
}
```

### UsersOnHotels (m - n Bridge)

Routes:

```js
// Find all UsersOnHotels
GET /users-on-hotels
// Find UsersOnHotels by id
GET /users-on-hotels/:id
// Create new UsersOnHotels. Refer to CreateUsersOnHotelsDto for an example.
POST /users-on-hotels
// Create many trips with single tripId and multiple userIds
POST /users-on-hotels/many
// Update UsersOnHotels. Refer to CreateUsersOnHotelsDto for updatable properties.
PATCH /users-on-hotels/:id
// Delete UsersOnHotels
DELETE /users-on-hotels/:id
```

Data Transfer Objects:

```ts
CreateUsersOnHotelsDto:
{
    userId: number,
    tripId: number,
    hotelId: number,
}
```

### UsersOnFlights (m - n Bridge)

Routes:

```js
// Find all UsersOnFlights
GET /users-on-flights
// Find UsersOnFlights by id
GET /users-on-flights/:id
// Create new UsersOnFlights. Refer to CreateUsersOnFlightsDto for an example.
POST /users-on-flights
// Create many trips with single tripId and multiple userIds
POST /users-on-flights/many
// Update UsersOnFlights. Refer to CreateUsersOnFlightsDto for updatable properties.
PATCH /users-on-flights/:id
// Delete UsersOnFlights
DELETE /users-on-flights/:id
```

Data Transfer Objects:

```ts
CreateUsersOnHotelsDto:
{
    userId: number,
    tripId: number,
    flightId: number,
}
```

## Contributing

Contributions are welcome!

If you have a suggestion that would make this better:

- [Fork the project](https://github.com/OmarZubaidi/Wanderlust-Server/fork).
- Create a branch using `git checkout -b feat-YOUR_FEATURE_NAME`.
- Work on it and commit changes using `npx cz` (you'll get an interactive prompt for the commit message).
- Push to your branch using `git push origin feat-YOUR_FEATURE_NAME`.
- [Open a pull request](https://github.com/OmarZubaidi/Wanderlust-Server/compare).

## Contact

Creators: [Daniele Capano](https://github.com/daniele24134/), [Gabriele Zannini](https://github.com/CosmicZanna/), [Omar Zubaidi](https://github.com/OmarZubaidi/), and [Stefan Feldner](https://github.com/stefanfeldner/).

Project Link: [on GitHub](https://github.com/OmarZubaidi/Wanderlust/).

## Acknowledgements

- [Auth0](https://auth0.com/)
