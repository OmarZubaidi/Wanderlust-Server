import { EventType } from 'src/event/interface/Event';
import { Flight } from 'src/flight/interface/Flight';
import { Hotel } from 'src/hotel/interface/Hotel';
import { User } from 'src/user/interface/User';
import { UsersOnFlights } from 'src/users-on-flights/interface/UsersOnFlights';
import { UsersOnHotels } from 'src/users-on-hotels/interface/UsersOnHotels';
import { UsersOnTrips } from 'src/users-on-trips/interface/UsersOnTrips';

export interface Trip {
  id: number;
  start: Date;
  end: Date;
  destination: string;
  Hotels?: Hotel[];
  Flights?: Flight[];
  Events?: EventType[]; // ts didn't like Event as a name
  UsersOnTrips?: UsersOnTrips[];
  UsersOnHotels?: UsersOnHotels[];
  UsersOnFlights?: UsersOnFlights[];
  createdAt: Date;
  Users?: User[];
}
