import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';
import { UserService } from './user/user.service';
import { HotelModule } from './hotel/hotel.module';
import { FlightModule } from './flight/flight.module';
import { EventModule } from './event/event.module';
import { UsersOnTripsModule } from './users-on-trips/users-on-trips.module';
import { TripModule } from './trip/trip.module';
import { AuthzModule } from './authz/authz.module';
import { UsersOnHotelsModule } from './users-on-hotels/users-on-hotels.module';
import { UsersOnFlightModule } from './users-on-flights/users-on-flights.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    UserModule,
    HotelModule,
    FlightModule,
    EventModule,
    UsersOnTripsModule,
    TripModule,
    AuthzModule,
    UsersOnHotelsModule,
    UsersOnFlightModule,
  ],
  controllers: [AppController, UserController],
  providers: [AppService, UserService],
})
export class AppModule {}
