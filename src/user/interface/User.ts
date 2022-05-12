import { Hotel } from '../../hotel/interface/Hotel';
import { Flight } from '../../flight/interface/Flight';
import { UsersOnTrips } from 'src/users-on-trips/interface/UsersOnTrips';
import { Trip } from 'src/trip/interface/Trip';
import { UsersOnHotels } from 'src/users-on-hotels/interface/UsersOnHotels';
import { UsersOnFlights } from 'src/users-on-flights/interface/UsersOnFlights';

export interface User {
  id: number;
  email: string;
  username: string;
  sub: string;
  emailVerified: boolean;
  pictureUrl: string;
  mobilePassword?: string;
  origin?: string;
  createdAt: Date;
  Hotels?: Hotel[];
  Flights?: Flight[];
  Trips?: Trip[];
  UsersOnTrips?: UsersOnTrips[];
  UsersOnHotels?: UsersOnHotels[];
  UsersOnFlights?: UsersOnFlights[];
}
